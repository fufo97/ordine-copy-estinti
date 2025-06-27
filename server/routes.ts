import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDiagnosisSchema, 
  insertContactSchema, 
  adminLoginSchema,
  insertAdminContentSchema,
  insertAdminStylingSchema
} from "@shared/schema";
import { z } from "zod";
import crypto from "crypto";

// Admin authentication middleware
const ADMIN_PASSWORD = "Fufo@SITO";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Non autorizzato" });
    }

    const token = authHeader.substring(7);
    const session = await storage.getAdminSession(token);
    
    if (!session) {
      return res.status(401).json({ success: false, message: "Sessione non valida" });
    }

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

  const httpServer = createServer(app);
  return httpServer;
}
