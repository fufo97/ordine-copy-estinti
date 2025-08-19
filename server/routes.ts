import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDiagnosisSchema, 
  insertContactSchema, 
  adminLoginSchema,
  insertAdminContentSchema,
  insertAdminStylingSchema,
  insertBlogPostSchema,
  updateBlogPostSchema,
  insertSiteUpdateSchema,
  updateSiteUpdateSchema
} from "@shared/schema";
import { z } from "zod";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import yauzl from "yauzl";

// MailerLite integration
const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN;
const MAILERLITE_BASE_URL = 'https://connect.mailerlite.com/api';

// MailerLite Groups (Lists) IDs
const MAILERLITE_GROUPS = {
  DIAGNOSIS: '161995988358137754', // Diagnosi Gratuita
  CONTACT: '161997820598945374'   // Contatti - Ordine Copywriter Estinti
};

async function addToMailerLiteGroup(email: string, formData: any, groupId: string) {
  if (!MAILERLITE_API_TOKEN) {
    console.warn('MailerLite API token not configured');
    return;
  }

  try {
    // Map form data to MailerLite custom fields
    const fields: any = {
      name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      company: formData.company,
      settore_di_attivita: formData.sector,
      fatturato_annuo: formData.revenue,
      mailing_list_utente: formData.hasEmailList
    };

    // Add form-specific fields
    if (formData.description) {
      fields.descrivi_la_tua_situazione_attuale = formData.description;
    }
    if (formData.goals) {
      fields.descrivi_la_tua_situazione_attuale = formData.goals;
    }

    // Add subscriber to the group using direct group ID
    const subscriberData = {
      email,
      fields,
      groups: [groupId]
    };

    const subscribeResponse = await fetch(`${MAILERLITE_BASE_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscriberData)
    });

    if (subscribeResponse.ok) {
      console.log(`Successfully added ${email} to MailerLite group ID: ${groupId}`);
    } else {
      const errorText = await subscribeResponse.text();
      console.error(`Failed to add ${email} to MailerLite:`, errorText);
    }
  } catch (error) {
    console.error('MailerLite integration error:', error);
  }
}

// JWT Secret for additional security
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.warn('⚠️  WARNING: JWT_SECRET not set. Using random secret (will invalidate sessions on restart).');
}

// Admin password with bcrypt hashing
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Fufo@SITO";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

// CSRF Token generation and validation
const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const csrfTokens = new Map<string, { token: string; expires: number }>();

const cleanupExpiredCSRFTokens = () => {
  const now = Date.now();
  const entries = Array.from(csrfTokens.entries());
  for (const [sessionId, tokenData] of entries) {
    if (tokenData.expires < now) {
      csrfTokens.delete(sessionId);
    }
  }
};

// Run cleanup every 10 minutes
setInterval(cleanupExpiredCSRFTokens, 10 * 60 * 1000);

// Utility function to hash passwords (for admin setup)
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Development endpoint to generate password hash (disable in production)
const addPasswordHashingEndpoint = (app: Express) => {
  if (process.env.NODE_ENV === 'development') {
    app.post('/api/dev/hash-password', async (req, res) => {
      try {
        const { password } = req.body;
        if (!password) {
          return res.status(400).json({ error: 'Password required' });
        }
        
        const hash = await hashPassword(password);
        console.log(`\n🔐 PASSWORD HASH GENERATED:`);
        console.log(`Set this as ADMIN_PASSWORD_HASH environment variable:`);
        console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
        
        res.json({ 
          success: true, 
          hash,
          message: 'Hash generated successfully. Set ADMIN_PASSWORD_HASH environment variable.' 
        });
      } catch (error) {
        res.status(500).json({ error: 'Failed to generate hash' });
      }
    });
  }
};

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage_multer,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allowed image MIME types (SVG REMOVED for security)
    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    // Allowed file extensions (SVG REMOVED for security)
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    // Check MIME type and file extension
    if (allowedTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
      // Additional security: check file size is reasonable
      if (file.size && file.size > 5 * 1024 * 1024) {
        const error = new Error('File troppo grande. Massimo 5MB permessi.') as any;
        cb(error, false);
        return;
      }
      cb(null, true);
    } else {
      const error = new Error('Solo file immagine sono permessi (JPG, PNG, GIF, WebP). SVG bloccati per sicurezza!') as any;
      cb(error, false);
    }
  }
});

// Audit logging for security events
const auditLog = (action: string, userId: string | null, details: string, success: boolean) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    action,
    userId: userId || 'anonymous',
    details,
    success,
    ip: 'masked' // IP will be masked for privacy
  };
  console.log('[SECURITY AUDIT]', JSON.stringify(logEntry));
};

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      auditLog('AUTH_ATTEMPT', null, 'Invalid or missing authorization header', false);
      return res.status(401).json({ success: false, message: "Non autorizzato" });
    }

    const token = authHeader.substring(7);
    
    const session = await storage.getAdminSession(token);
    
    if (!session) {
      auditLog('AUTH_ATTEMPT', null, 'Invalid session token', false);
      return res.status(401).json({ 
        success: false, 
        message: "Sessione non valida. Effettua nuovamente il login." 
      });
    }

    // Check if session has expired
    if (session.expiresAt < new Date()) {
      auditLog('AUTH_ATTEMPT', session.id.toString(), 'Session expired', false);
      await storage.deleteAdminSession(token);
      return res.status(401).json({ success: false, message: "Sessione scaduta" });
    }

    auditLog('AUTH_SUCCESS', session.id.toString(), 'Admin authentication successful', true);
    // Session is valid, continue
    next();
  } catch (error) {
    auditLog('AUTH_ERROR', null, 'Authentication system error', false);
    res.status(500).json({ success: false, message: "Errore di autenticazione" });
  }
};

// Site update processing function
async function processSiteUpdate(siteUpdate: any): Promise<{ success: boolean; error?: string; backupPath?: string }> {
  try {
    const projectRoot = process.cwd();
    const backupDir = path.join(projectRoot, 'backups', `backup_${Date.now()}`);
    const tempDir = path.join(projectRoot, 'temp_update', `update_${Date.now()}`);
    
    // Create backup and temp directories
    if (!fs.existsSync(path.dirname(backupDir))) {
      fs.mkdirSync(path.dirname(backupDir), { recursive: true });
    }
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Create backup of current files (excluding blog content and database)
    await createBackup(projectRoot, backupDir);

    // Extract ZIP file
    await extractZipFile(siteUpdate.filePath, tempDir);

    // Apply updates while preserving blog content
    await applyUpdates(tempDir, projectRoot);

    return { success: true, backupPath: backupDir };
  } catch (error) {
    console.error('Site update processing error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Errore sconosciuto' };
  }
}

// Create backup of current site
async function createBackup(sourceDir: string, backupDir: string): Promise<void> {
  const excludePatterns = [
    'node_modules',
    '.git',
    'backups',
    'updates',
    'temp_update',
    'uploads',
    '.replit',
    'attached_assets'
  ];

  const copyRecursive = (src: string, dest: string) => {
    const stats = fs.lstatSync(src);
    
    if (stats.isDirectory()) {
      const dirName = path.basename(src);
      if (excludePatterns.includes(dirName)) {
        return;
      }
      
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      
      const items = fs.readdirSync(src);
      for (const item of items) {
        copyRecursive(path.join(src, item), path.join(dest, item));
      }
    } else {
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
    }
  };

  copyRecursive(sourceDir, backupDir);
}

// Extract ZIP file
async function extractZipFile(zipPath: string, extractDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
      if (err) return reject(err);
      
      zipfile.readEntry();
      
      zipfile.on('entry', (entry) => {
        // Prevent path traversal (Zip Slip) attacks
        if (entry.fileName.includes('..') || 
            entry.fileName.includes('/..') || 
            entry.fileName.includes('..\\') ||
            path.isAbsolute(entry.fileName)) {
          console.warn('Skipping potentially dangerous file:', entry.fileName);
          zipfile.readEntry();
          return;
        }
        
        if (/\/$/.test(entry.fileName)) {
          // Directory entry
          const dirPath = path.join(extractDir, entry.fileName);
          // Ensure the resolved path is still within extractDir
          if (!path.resolve(dirPath).startsWith(path.resolve(extractDir))) {
            console.warn('Skipping directory outside extraction path:', entry.fileName);
            zipfile.readEntry();
            return;
          }
          fs.mkdirSync(dirPath, { recursive: true });
          zipfile.readEntry();
        } else {
          // File entry
          const filePath = path.join(extractDir, entry.fileName);
          // Ensure the resolved path is still within extractDir
          if (!path.resolve(filePath).startsWith(path.resolve(extractDir))) {
            console.warn('Skipping file outside extraction path:', entry.fileName);
            zipfile.readEntry();
            return;
          }
          const fileDir = path.dirname(filePath);
          
          if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true });
          }
          
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) return reject(err);
            
            const writeStream = fs.createWriteStream(filePath);
            readStream.pipe(writeStream);
            
            writeStream.on('close', () => {
              zipfile.readEntry();
            });
            
            writeStream.on('error', reject);
          });
        }
      });
      
      zipfile.on('end', () => {
        resolve();
      });
      
      zipfile.on('error', reject);
    });
  });
}

// Apply updates while preserving blog content
async function applyUpdates(sourceDir: string, targetDir: string): Promise<void> {
  const preservePaths = [
    'shared/schema.ts', // Preserve database schema
    'server/storage.ts', // Preserve storage with blog data
    'uploads' // Preserve uploaded files
  ];

  const copyRecursive = (src: string, dest: string, relativePath: string = '') => {
    if (!fs.existsSync(src)) return;
    
    const stats = fs.lstatSync(src);
    
    if (stats.isDirectory()) {
      // Skip certain directories
      const dirName = path.basename(src);
      if (['node_modules', '.git', 'backups', 'updates', 'temp_update'].includes(dirName)) {
        return;
      }
      
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      
      const items = fs.readdirSync(src);
      for (const item of items) {
        const newRelativePath = relativePath ? path.join(relativePath, item) : item;
        copyRecursive(path.join(src, item), path.join(dest, item), newRelativePath);
      }
    } else {
      // Check if this file should be preserved
      const shouldPreserve = preservePaths.some(preservePath => 
        relativePath === preservePath || relativePath.startsWith(preservePath + '/')
      );
      
      if (!shouldPreserve) {
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(src, dest);
      }
    }
  };

  copyRecursive(sourceDir, targetDir);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Add development password hashing endpoint
  addPasswordHashingEndpoint(app);
  
  // Security audit log endpoint (admin only)
  app.get("/api/admin/audit-logs", adminAuth, async (req, res) => {
    try {
      // Return last 100 security events (in production, this should be from a proper audit log storage)
      auditLog('AUDIT_ACCESS', null, 'Admin accessed audit logs', true);
      res.json({
        success: true,
        message: "Audit logs are being written to server console. In production, implement proper log storage.",
        notice: "Check server console for [SECURITY AUDIT] entries"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Errore nel recupero dei log di audit"
      });
    }
  });
  
  // Diagnosis request endpoint
  app.post("/api/diagnosis", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertDiagnosisSchema.parse(req.body);
      
      // Create the diagnosis request
      const diagnosisRequest = await storage.createDiagnosisRequest(validatedData);
      
      // Add to MailerLite
      await addToMailerLiteGroup(
        validatedData.email,
        validatedData,
        MAILERLITE_GROUPS.DIAGNOSIS
      );
      
      auditLog('DIAGNOSIS_REQUEST', diagnosisRequest.id.toString(), `New diagnosis request from ${validatedData.email}`, true);
      
      res.status(201).json({ 
        success: true, 
        message: "Richiesta di diagnosi ricevuta con successo",
        id: diagnosisRequest.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dati non validi",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        console.error("Error creating diagnosis request:", error);
        res.status(500).json({
          success: false,
          message: "Errore interno del server"
        });
      }
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Create the contact submission
      const contactSubmission = await storage.createContactSubmission(validatedData);
      
      // Add to MailerLite
      await addToMailerLiteGroup(
        validatedData.email,
        validatedData,
        MAILERLITE_GROUPS.CONTACT
      );
      
      auditLog('CONTACT_REQUEST', contactSubmission.id.toString(), `New contact request from ${validatedData.company} (${validatedData.email})`, true);
      
      res.status(201).json({ 
        success: true, 
        message: "Richiesta di contatto ricevuta con successo",
        id: contactSubmission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dati non validi",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        console.error("Error creating contact submission:", error);
        res.status(500).json({
          success: false,
          message: "Errore interno del server"
        });
      }
    }
  });

  // Get all diagnosis requests (for admin purposes)
  app.get("/api/diagnosis", async (req, res) => {
    try {
      const requests = await storage.getDiagnosisRequests();
      res.json({ success: true, data: requests });
    } catch (error) {
      console.error("Error fetching diagnosis requests:", error);
      res.status(500).json({
        success: false,
        message: "Errore interno del server"
      });
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ success: true, data: submissions });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({
        success: false,
        message: "Errore interno del server"
      });
    }
  });

  // Get specific diagnosis request
  app.get("/api/diagnosis/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID non valido"
        });
      }

      const request = await storage.getDiagnosisRequest(id);
      if (!request) {
        return res.status(404).json({
          success: false,
          message: "Richiesta di diagnosi non trovata"
        });
      }

      res.json({ success: true, data: request });
    } catch (error) {
      console.error("Error fetching diagnosis request:", error);
      res.status(500).json({
        success: false,
        message: "Errore interno del server"
      });
    }
  });

  // Get specific contact submission
  app.get("/api/contact/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID non valido"
        });
      }

      const submission = await storage.getContactSubmission(id);
      if (!submission) {
        return res.status(404).json({
          success: false,
          message: "Richiesta di contatto non trovata"
        });
      }

      res.json({ success: true, data: submission });
    } catch (error) {
      console.error("Error fetching contact submission:", error);
      res.status(500).json({
        success: false,
        message: "Errore interno del server"
      });
    }
  });

  // Admin login endpoint
  // CSRF Token endpoint
  app.get("/api/csrf-token", (req, res) => {
    const sessionId = crypto.randomBytes(16).toString('hex');
    const csrfToken = generateCSRFToken();
    const expires = Date.now() + (15 * 60 * 1000); // 15 minutes
    
    csrfTokens.set(sessionId, { token: csrfToken, expires });
    
    res.json({
      success: true,
      sessionId,
      csrfToken,
      expires
    });
  });

  // Enhanced secure admin login
  app.post("/api/admin/login", async (req, res) => {
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    
    try {
      const validatedData = adminLoginSchema.parse(req.body);
      
      // Enhanced password verification
      let passwordValid = false;
      
      if (ADMIN_PASSWORD_HASH) {
        // Use bcrypt if hash is provided
        passwordValid = await bcrypt.compare(validatedData.password, ADMIN_PASSWORD_HASH);
      } else {
        // Fallback to plain text (log warning)
        passwordValid = validatedData.password === ADMIN_PASSWORD;
        if (passwordValid && process.env.NODE_ENV === 'production') {
          console.warn('⚠️  WARNING: Using plain text password in production. Set ADMIN_PASSWORD_HASH!');
        }
      }
      
      if (!passwordValid) {
        auditLog('LOGIN_FAILED', null, `Failed login attempt from ${clientIp}`, false);
        
        // Add artificial delay to prevent brute force
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return res.status(401).json({
          success: false,
          message: "Credenziali non valide"
        });
      }

      // Create secure session with JWT
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      // Create JWT with session info
      const jwtPayload = {
        sessionId: sessionToken,
        isAdmin: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(expiresAt.getTime() / 1000)
      };
      
      const jwtToken = jwt.sign(jwtPayload, JWT_SECRET);

      const session = await storage.createAdminSession({
        sessionToken,
        expiresAt
      });
      
      auditLog('LOGIN_SUCCESS', session.id.toString(), `Successful admin login from ${clientIp}`, true);

      // Set secure HTTP-only cookie (optional, keeping token response for compatibility)
      res.cookie('admin_session', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({
        success: true,
        token: session.sessionToken,
        jwtToken,
        expiresAt: session.expiresAt
      });
      
    } catch (error) {
      auditLog('LOGIN_ERROR', null, `Login system error: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dati di accesso non validi"
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Errore temporaneo del sistema. Riprova."
        });
      }
    }
  });

  // Admin logout endpoint
  // Enhanced secure logout with audit logging
  app.post("/api/admin/logout", adminAuth, async (req, res) => {
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const session = await storage.getAdminSession(token);
        
        if (session) {
          auditLog('LOGOUT', session.id.toString(), `Admin logout from ${clientIp}`, true);
        }
        
        await storage.deleteAdminSession(token);
      }
      
      // Clear HTTP-only cookie
      res.clearCookie('admin_session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      res.json({ success: true, message: "Logout effettuato con successo" });
    } catch (error) {
      auditLog('LOGOUT_ERROR', null, `Logout error from ${clientIp}`, false);
      res.status(500).json({
        success: false,
        message: "Errore durante il logout"
      });
    }
  });

  // Get all admin content
  app.get("/api/admin/content", adminAuth, async (req, res) => {
    try {
      const page = req.query.page as string;
      let content;
      
      if (page) {
        content = await storage.getAdminContentByPage(page);
      } else {
        content = await storage.getAllAdminContent();
      }
      
      res.json({ success: true, data: content });
    } catch (error) {
      console.error("Error fetching admin content:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero dei contenuti"
      });
    }
  });

  // Get specific content (PUBLIC - for frontend display)
  app.get("/api/content/:key", async (req, res) => {
    try {
      const content = await storage.getAdminContent(req.params.key);
      if (!content) {
        return res.status(404).json({
          success: false,
          message: "Contenuto non trovato"
        });
      }
      
      res.json({ success: true, data: content });
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero del contenuto"
      });
    }
  });

  // Get specific admin content
  app.get("/api/admin/content/:key", adminAuth, async (req, res) => {
    try {
      const content = await storage.getAdminContent(req.params.key);
      if (!content) {
        return res.status(404).json({
          success: false,
          message: "Contenuto non trovato"
        });
      }
      
      res.json({ success: true, data: content });
    } catch (error) {
      console.error("Error fetching admin content:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero del contenuto"
      });
    }
  });

  // Update admin content
  app.put("/api/admin/content/:key", adminAuth, async (req, res) => {
    try {
      const { value } = req.body;
      if (!value) {
        return res.status(400).json({
          success: false,
          message: "Valore richiesto"
        });
      }

      const content = await storage.updateAdminContent(req.params.key, value);
      res.json({ success: true, data: content });
    } catch (error) {
      console.error("Error updating admin content:", error);
      res.status(500).json({
        success: false,
        message: "Errore nell'aggiornamento del contenuto"
      });
    }
  });

  // Create new admin content
  app.post("/api/admin/content", adminAuth, async (req, res) => {
    try {
      const validatedData = insertAdminContentSchema.parse(req.body);
      const content = await storage.createAdminContent(validatedData);
      res.status(201).json({ success: true, data: content });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dati non validi",
          errors: error.errors
        });
      } else {
        console.error("Error creating admin content:", error);
        res.status(500).json({
          success: false,
          message: "Errore nella creazione del contenuto"
        });
      }
    }
  });

  // Get all admin styling
  app.get("/api/admin/styling", adminAuth, async (req, res) => {
    try {
      const page = req.query.page as string;
      let styling;
      
      if (page) {
        styling = await storage.getAdminStylingByPage(page);
      } else {
        styling = await storage.getAllAdminStyling();
      }
      
      res.json({ success: true, data: styling });
    } catch (error) {
      console.error("Error fetching admin styling:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero degli stili"
      });
    }
  });

  // Get specific admin styling
  app.get("/api/admin/styling/:elementId", adminAuth, async (req, res) => {
    try {
      const styling = await storage.getAdminStyling(req.params.elementId);
      if (!styling) {
        return res.status(404).json({
          success: false,
          message: "Stile non trovato"
        });
      }
      
      res.json({ success: true, data: styling });
    } catch (error) {
      console.error("Error fetching admin styling:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero dello stile"
      });
    }
  });

  // Update admin styling
  app.put("/api/admin/styling/:elementId", adminAuth, async (req, res) => {
    try {
      const { styles } = req.body;
      if (!styles) {
        return res.status(400).json({
          success: false,
          message: "Stili richiesti"
        });
      }

      const styling = await storage.updateAdminStyling(req.params.elementId, styles);
      res.json({ success: true, data: styling });
    } catch (error) {
      console.error("Error updating admin styling:", error);
      res.status(500).json({
        success: false,
        message: "Errore nell'aggiornamento dello stile"
      });
    }
  });

  // Create new admin styling
  app.post("/api/admin/styling", adminAuth, async (req, res) => {
    try {
      const validatedData = insertAdminStylingSchema.parse(req.body);
      const styling = await storage.createAdminStyling(validatedData);
      res.status(201).json({ success: true, data: styling });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dati non validi",
          errors: error.errors
        });
      } else {
        console.error("Error creating admin styling:", error);
        res.status(500).json({
          success: false,
          message: "Errore nella creazione dello stile"
        });
      }
    }
  });

  // ===== BLOG API ROUTES =====

  // Get all published blog posts (public endpoint)
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json({ success: true, data: posts });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero degli articoli"
      });
    }
  });

  // Get single blog post by slug (public endpoint)
  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Articolo non trovato"
        });
      }
      
      // Only return published posts to public
      if (post.status !== "published") {
        return res.status(404).json({
          success: false,
          message: "Articolo non trovato"
        });
      }
      
      res.json({ success: true, data: post });
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero dell'articolo"
      });
    }
  });

  // Search blog posts (public endpoint)
  app.get("/api/blog/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({
          success: false,
          message: "Query di ricerca richiesta"
        });
      }
      
      const posts = await storage.searchBlogPosts(query);
      // Filter only published posts for public search
      const publishedPosts = posts.filter(post => post.status === "published");
      
      res.json({ success: true, data: publishedPosts });
    } catch (error) {
      console.error("Error searching blog posts:", error);
      res.status(500).json({
        success: false,
        message: "Errore nella ricerca"
      });
    }
  });

  // ===== ADMIN BLOG ROUTES =====

  // Get all blog posts (admin only)
  app.get("/api/admin/blog/posts", adminAuth, async (req, res) => {
    try {
      const status = req.query.status as string;
      let posts;
      
      if (status) {
        posts = await storage.getBlogPostsByStatus(status);
      } else {
        posts = await storage.getAllBlogPosts();
      }
      
      res.json({ success: true, data: posts });
    } catch (error) {
      console.error("Error fetching admin blog posts:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero degli articoli"
      });
    }
  });

  // Get single blog post by ID (admin only)
  app.get("/api/admin/blog/posts/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID non valido"
        });
      }
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Articolo non trovato"
        });
      }
      
      res.json({ success: true, data: post });
    } catch (error) {
      console.error("Error fetching admin blog post:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero dell'articolo"
      });
    }
  });

  // Create new blog post (admin only)
  app.post("/api/admin/blog/posts", adminAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dati non validi",
          errors: error.errors
        });
      } else {
        console.error("Error creating blog post:", error);
        res.status(500).json({
          success: false,
          message: "Errore nella creazione dell'articolo"
        });
      }
    }
  });

  // Update blog post (admin only)
  app.put("/api/admin/blog/posts/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID non valido"
        });
      }
      
      const validatedData = updateBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      res.json({ success: true, data: post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dati non validi",
          errors: error.errors
        });
      } else {
        console.error("Error updating blog post:", error);
        res.status(500).json({
          success: false,
          message: "Errore nell'aggiornamento dell'articolo"
        });
      }
    }
  });

  // Delete blog post (admin only)
  app.delete("/api/admin/blog/posts/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID non valido"
        });
      }
      
      await storage.deleteBlogPost(id);
      res.json({ success: true, message: "Articolo eliminato con successo" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({
        success: false,
        message: "Errore nell'eliminazione dell'articolo"
      });
    }
  });

  // Upload image endpoint (admin only)
  app.post("/api/admin/upload", adminAuth, upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Nessun file caricato"
        });
      }

      // Return the file URL
      const fileUrl = `/uploads/${req.file.filename}`;
      
      res.json({
        success: true,
        data: {
          url: fileUrl,
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size
        }
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({
        success: false,
        message: "Errore durante il caricamento del file"
      });
    }
  });

  // Download sample ZIP file endpoint
  app.get("/download/sample-update", (req, res) => {
    const filePath = path.join(process.cwd(), 'uploads', 'ordine_copywriters_v2.0.0.zip');
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File non trovato" });
    }

    res.setHeader('Content-Disposition', 'attachment; filename="ordine_copywriters_v2.0.0.zip"');
    res.setHeader('Content-Type', 'application/zip');
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });

  // Serve uploaded images statically
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    next();
  });

  // ===== SITE UPDATE ROUTES =====

  // Configure multer for zip file uploads
  const siteUpdateStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'updates');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
      cb(null, `update_${timestamp}_${safeName}`);
    }
  });

  const siteUpdateUpload = multer({
    storage: siteUpdateStorage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/zip' || 
          file.originalname.toLowerCase().endsWith('.zip')) {
        cb(null, true);
      } else {
        const error = new Error('Solo file ZIP sono consentiti') as any;
        cb(error, false);
      }
    },
    limits: {
      fileSize: 50 * 1024 * 1024 // 50MB max
    }
  });

  // Get all site updates (admin only)
  app.get("/api/admin/site-updates", adminAuth, async (req, res) => {
    try {
      const updates = await storage.getAllSiteUpdates();
      res.json({ success: true, data: updates });
    } catch (error) {
      console.error("Error fetching site updates:", error);
      res.status(500).json({
        success: false,
        message: "Errore nel recupero degli aggiornamenti"
      });
    }
  });

  // Upload new site update (admin only)
  app.post("/api/admin/site-updates/upload", adminAuth, siteUpdateUpload.single('zipFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Nessun file ZIP caricato"
        });
      }

      const { version, description } = req.body;
      
      const updateData = {
        version: version || `v${Date.now()}`,
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size.toString(),
        description: description || '',
        status: 'pending',
        errorMessage: null,
        backupPath: null,
      };

      const siteUpdate = await storage.createSiteUpdate(updateData);
      
      res.status(201).json({ 
        success: true, 
        data: siteUpdate,
        message: "File ZIP caricato con successo. L'aggiornamento può essere applicato dal pannello admin."
      });
    } catch (error) {
      console.error("Error uploading site update:", error);
      res.status(500).json({
        success: false,
        message: "Errore durante il caricamento del file ZIP"
      });
    }
  });

  // Apply site update (admin only)
  app.post("/api/admin/site-updates/:id/apply", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID non valido"
        });
      }

      const siteUpdate = await storage.getSiteUpdate(id);
      if (!siteUpdate) {
        return res.status(404).json({
          success: false,
          message: "Aggiornamento non trovato"
        });
      }

      if (siteUpdate.status !== 'pending') {
        return res.status(400).json({
          success: false,
          message: "L'aggiornamento non è in stato pending"
        });
      }

      // Update status to processing
      await storage.updateSiteUpdate(id, { status: 'processing' });

      // Process the site update
      const result = await processSiteUpdate(siteUpdate);
      
      if (result.success) {
        await storage.updateSiteUpdate(id, { 
          status: 'completed',
          backupPath: result.backupPath 
        });
        res.json({ 
          success: true, 
          message: "Aggiornamento applicato con successo",
          data: result
        });
      } else {
        await storage.updateSiteUpdate(id, { 
          status: 'failed', 
          errorMessage: result.error 
        });
        res.status(500).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error("Error applying site update:", error);
      res.status(500).json({
        success: false,
        message: "Errore durante l'applicazione dell'aggiornamento"
      });
    }
  });

  // Delete site update (admin only)
  app.delete("/api/admin/site-updates/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID non valido"
        });
      }

      const siteUpdate = await storage.getSiteUpdate(id);
      if (siteUpdate) {
        // Delete the ZIP file
        if (fs.existsSync(siteUpdate.filePath)) {
          fs.unlinkSync(siteUpdate.filePath);
        }
        // Delete backup if exists
        if (siteUpdate.backupPath && fs.existsSync(siteUpdate.backupPath)) {
          fs.rmSync(siteUpdate.backupPath, { recursive: true, force: true });
        }
      }

      await storage.deleteSiteUpdate(id);
      res.json({ success: true, message: "Aggiornamento eliminato con successo" });
    } catch (error) {
      console.error("Error deleting site update:", error);
      res.status(500).json({
        success: false,
        message: "Errore nell'eliminazione dell'aggiornamento"
      });
    }
  });

  // Rollback to previous version (admin only)
  app.post("/api/admin/site-updates/rollback", adminAuth, async (req, res) => {
    try {
      console.log("Starting rollback to previous version...");
      
      // Find the most recent completed update that has a backup
      const allUpdates = await storage.getAllSiteUpdates();
      const completedUpdates = allUpdates
        .filter(update => update.status === 'completed' && update.backupPath)
        .sort((a, b) => new Date(b.completedAt || b.createdAt).getTime() - new Date(a.completedAt || a.createdAt).getTime());
      
      if (completedUpdates.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Nessun backup disponibile per il rollback"
        });
      }

      const latestUpdate = completedUpdates[0];
      const backupPath = latestUpdate.backupPath;
      
      if (!backupPath || !fs.existsSync(backupPath)) {
        return res.status(400).json({
          success: false,
          message: "Backup non trovato o corrotto"
        });
      }

      console.log(`Rolling back using backup: ${backupPath}`);

      // Create a new backup of current state before rollback
      const rollbackBackupDir = path.join(process.cwd(), 'backups', `rollback_backup_${Date.now()}`);
      await fs.mkdirSync(rollbackBackupDir, { recursive: true });
      
      // Files and directories to backup
      const itemsToBackup = ['client', 'server', 'shared', 'package.json'];
      
      for (const item of itemsToBackup) {
        const srcPath = path.join(process.cwd(), item);
        const destPath = path.join(rollbackBackupDir, item);
        
        if (fs.existsSync(srcPath)) {
          if (fs.statSync(srcPath).isDirectory()) {
            await fs.cpSync(srcPath, destPath, { recursive: true });
          } else {
            await fs.copyFileSync(srcPath, destPath);
          }
        }
      }

      // Restore from backup
      for (const item of itemsToBackup) {
        const backupItemPath = path.join(backupPath, item);
        const targetPath = path.join(process.cwd(), item);
        
        if (fs.existsSync(backupItemPath)) {
          // Remove current version
          if (fs.existsSync(targetPath)) {
            if (fs.statSync(targetPath).isDirectory()) {
              fs.rmSync(targetPath, { recursive: true, force: true });
            } else {
              fs.unlinkSync(targetPath);
            }
          }
          
          // Restore from backup
          if (fs.statSync(backupItemPath).isDirectory()) {
            await fs.cpSync(backupItemPath, targetPath, { recursive: true });
          } else {
            await fs.copyFileSync(backupItemPath, targetPath);
          }
        }
      }

      console.log("Rollback completed successfully");
      
      res.json({
        success: true,
        message: `Rollback completato. Ripristinata versione: ${latestUpdate.version || 'Senza versione'}`
      });
    } catch (error) {
      console.error("Error during rollback:", error);
      res.status(500).json({
        success: false,
        message: "Errore durante il rollback"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
