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
  updateBlogPostSchema
} from "@shared/schema";
import { z } from "zod";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs";

// MailerLite integration
const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN;
const MAILERLITE_BASE_URL = 'https://connect.mailerlite.com/api';

// MailerLite Groups (Lists) IDs
const MAILERLITE_GROUPS = {
  DIAGNOSIS: '161995988358137754', // Diagnosi Gratuita
  CONTACT: '161997820598945374'   // Contatti - Ordine Copywriter Estinti
};

async function addToMailerLiteGroup(email: string, firstName: string, lastName: string, groupId: string) {
  if (!MAILERLITE_API_TOKEN) {
    console.warn('MailerLite API token not configured');
    return;
  }

  try {
    // Add subscriber to the group using direct group ID
    const subscriberData = {
      email,
      fields: {
        name: `${firstName} ${lastName}`,
        last_name: lastName
      },
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

// Admin authentication middleware
const ADMIN_PASSWORD = "Fufo@SITO";

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
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo i file immagine sono permessi!'));
    }
  }
});

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth header received:", authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("No auth header or invalid format");
      return res.status(401).json({ success: false, message: "Non autorizzato" });
    }

    const token = authHeader.substring(7);
    console.log("Token extracted:", token.substring(0, 10) + "...");
    
    // Debug: Show all active sessions
    const allSessions = await storage.getAllAdminSessions();
    console.log("Active sessions count:", allSessions.length);
    allSessions.forEach(session => {
      console.log("Session token prefix:", session.sessionToken.substring(0, 10) + "...", "expires:", session.expiresAt);
    });
    
    const session = await storage.getAdminSession(token);
    console.log("Session found:", !!session);
    
    if (!session) {
      console.log("Session not found for token");
      return res.status(401).json({ 
        success: false, 
        message: "Sessione non valida. Effettua nuovamente il login." 
      });
    }

    // Check if session has expired
    if (session.expiresAt < new Date()) {
      console.log("Session expired");
      await storage.deleteAdminSession(token);
      return res.status(401).json({ success: false, message: "Sessione scaduta" });
    }

    console.log("Session is valid, proceeding");
    // Session is valid, continue
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    res.status(500).json({ success: false, message: "Errore di autenticazione" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
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
        validatedData.firstName,
        validatedData.lastName,
        MAILERLITE_GROUPS.DIAGNOSIS
      );
      
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
        validatedData.firstName,
        validatedData.lastName,
        MAILERLITE_GROUPS.CONTACT
      );
      
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
  app.post("/api/admin/login", async (req, res) => {
    try {
      const validatedData = adminLoginSchema.parse(req.body);
      
      if (validatedData.password !== ADMIN_PASSWORD) {
        return res.status(401).json({
          success: false,
          message: "Password non corretta"
        });
      }

      // Create admin session
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      const session = await storage.createAdminSession({
        sessionToken,
        expiresAt
      });

      res.json({
        success: true,
        token: session.sessionToken,
        expiresAt: session.expiresAt
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dati non validi",
          errors: error.errors
        });
      } else {
        console.error("Admin login error:", error);
        res.status(500).json({
          success: false,
          message: "Errore interno del server"
        });
      }
    }
  });

  // Admin logout endpoint
  app.post("/api/admin/logout", adminAuth, async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        await storage.deleteAdminSession(token);
      }
      
      res.json({ success: true, message: "Logout effettuato con successo" });
    } catch (error) {
      console.error("Admin logout error:", error);
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

  // Serve uploaded images statically
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    next();
  });

  const httpServer = createServer(app);
  return httpServer;
}
