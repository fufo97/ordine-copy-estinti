import { 
  users, 
  diagnosisRequests, 
  contactSubmissions,
  adminContent,
  adminStyling,
  adminSessions,
  blogPosts,
  siteUpdates,
  type User, 
  type InsertUser,
  type DiagnosisRequest,
  type InsertDiagnosisRequest,
  type ContactSubmission,
  type InsertContactSubmission,
  type AdminContent,
  type InsertAdminContent,
  type AdminStyling,
  type InsertAdminStyling,
  type AdminSession,
  type InsertAdminSession,
  type BlogPost,
  type InsertBlogPost,
  type UpdateBlogPost,
  type SiteUpdate,
  type InsertSiteUpdate,
  type UpdateSiteUpdate
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, like, lt } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Diagnosis request methods
  createDiagnosisRequest(request: InsertDiagnosisRequest): Promise<DiagnosisRequest>;
  getDiagnosisRequests(): Promise<DiagnosisRequest[]>;
  getDiagnosisRequest(id: number): Promise<DiagnosisRequest | undefined>;
  
  // Contact submission methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  
  // Admin content methods
  getAdminContent(key: string): Promise<AdminContent | undefined>;
  getAllAdminContent(): Promise<AdminContent[]>;
  getAdminContentByPage(page: string): Promise<AdminContent[]>;
  createAdminContent(content: InsertAdminContent): Promise<AdminContent>;
  updateAdminContent(key: string, value: string): Promise<AdminContent>;
  
  // Admin styling methods
  getAdminStyling(elementId: string): Promise<AdminStyling | undefined>;
  getAllAdminStyling(): Promise<AdminStyling[]>;
  getAdminStylingByPage(page: string): Promise<AdminStyling[]>;
  createAdminStyling(styling: InsertAdminStyling): Promise<AdminStyling>;
  updateAdminStyling(elementId: string, styles: any): Promise<AdminStyling>;
  
  // Admin session methods
  createAdminSession(session: InsertAdminSession): Promise<AdminSession>;
  getAdminSession(sessionToken: string): Promise<AdminSession | undefined>;
  getAllAdminSessions(): Promise<AdminSession[]>;
  deleteAdminSession(sessionToken: string): Promise<void>;
  cleanupExpiredSessions(): Promise<void>;
  
  // Blog post methods
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, updates: UpdateBlogPost): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostsByStatus(status: string): Promise<BlogPost[]>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;
  
  // Site update methods
  createSiteUpdate(update: InsertSiteUpdate): Promise<SiteUpdate>;
  updateSiteUpdate(id: number, updates: UpdateSiteUpdate): Promise<SiteUpdate>;
  deleteSiteUpdate(id: number): Promise<void>;
  getSiteUpdate(id: number): Promise<SiteUpdate | undefined>;
  getAllSiteUpdates(): Promise<SiteUpdate[]>;
  getSiteUpdatesByStatus(status: string): Promise<SiteUpdate[]>;
  getLatestSiteUpdate(): Promise<SiteUpdate | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private diagnosisRequests: Map<number, DiagnosisRequest>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private adminContent: Map<string, AdminContent>;
  private adminStyling: Map<string, AdminStyling>;
  private adminSessions: Map<string, AdminSession>;
  private blogPosts: Map<number, BlogPost>;
  private siteUpdates: Map<number, SiteUpdate>;
  private currentUserId: number;
  private currentDiagnosisId: number;
  private currentContactId: number;
  private currentAdminContentId: number;
  private currentAdminStylingId: number;
  private currentAdminSessionId: number;
  private currentBlogPostId: number;
  private currentSiteUpdateId: number;

  constructor() {
    this.users = new Map();
    this.diagnosisRequests = new Map();
    this.contactSubmissions = new Map();
    this.adminContent = new Map();
    this.adminStyling = new Map();
    this.adminSessions = new Map();
    this.blogPosts = new Map();
    this.siteUpdates = new Map();
    this.currentUserId = 1;
    this.currentDiagnosisId = 1;
    this.currentContactId = 1;
    this.currentAdminContentId = 1;
    this.currentAdminStylingId = 1;
    this.currentAdminSessionId = 1;
    this.currentBlogPostId = 1;
    this.currentSiteUpdateId = 1;
  }

  async initialize() {
    // Initialize default content and styling
    await this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    // Initialize default content for all pages
    await this.createDefaultContent();
    await this.createDefaultStyling();
  }

  private async createDefaultContent() {
    // Navigation content
    const navigationContent = [
      { key: "nav_title", value: "ORDINE DEI COPYWRITER ESTINTI", page: "all", section: "navigation" },
      { key: "nav_home", value: "Home", page: "all", section: "navigation" },
      { key: "nav_services", value: "Servizi", page: "all", section: "navigation" },
      { key: "nav_contacts", value: "Contatti", page: "all", section: "navigation" },
      { key: "nav_diagnosis", value: "Diagnosi", page: "all", section: "navigation" },
    ];

    // Hero section content
    const heroContent = [
      { key: "hero_main_title", value: "RIVOLUZIONA IL TUO EMAIL MARKETING", page: "home", section: "hero" },
      { key: "hero_subtitle", value: "L'Ordine dei Copywriter Estinti - Gli unici specialisti in Italia che trasformano l'Email Marketing in una macchina da guerra commerciale", page: "home", section: "hero" },
      { key: "hero_button_services", value: "SCOPRI I NOSTRI SERVIZI", page: "home", section: "hero" },
      { key: "hero_button_diagnosis", value: "DIAGNOSI GRATUITA", page: "home", section: "hero" },
    ];

    // Home page content
    const homeContent = [
      { key: "home_hero_title", value: "ORDINE DEI COPYWRITER ESTINTI", page: "home", section: "hero" },
      { key: "home_hero_subtitle", value: "L'Elite del Marketing Digitale", page: "home", section: "hero" },
      { key: "home_main_title", value: "Il potere della parola scritta che converte", page: "home", section: "main" },
      { key: "home_description", value: "Trasformiamo le tue parole in risultati concreti attraverso strategie di copywriting avanzate e tecniche di persuasione scientificamente provate.", page: "home", section: "main" },
      { key: "home_cta_title", value: "PRONTO A RIVOLUZIONARE IL TUO EMAIL MARKETING?", page: "home", section: "cta" },
      { key: "home_cta_description", value: "Trasforma le tue liste di contatti in una macchina da guerra commerciale con l'aiuto dei nostri specialisti", page: "home", section: "cta" },
      { key: "home_services_button", value: "SCOPRI I NOSTRI SERVIZI", page: "home", section: "cta" },
      { key: "home_diagnosis_button", value: "DIAGNOSI GRATUITA", page: "home", section: "cta" },
    ];

    // Combine all content arrays
    const allContent = [...navigationContent, ...heroContent, ...homeContent];

    for (const content of allContent) {
      try {
        await this.createAdminContent(content);
      } catch (error) {
        // Content might already exist
      }
    }

    // Services page content
    const servicesContent = [
      { key: "services_title", value: "I NOSTRI SERVIZI", page: "servizi", section: "header" },
      { key: "services_hero_title", value: "Caro Professionista, Consulente o Imprenditore", page: "servizi", section: "opening" },
      { key: "services_opening_text", value: "Hai mai considerato quanto vale realmente ogni contatto nella tua lista email?", page: "servizi", section: "opening" },
      { key: "services_problem_title", value: "IL PROBLEMA DEI \"TESORI SEPOLTI\"", page: "servizi", section: "problem" },
      { key: "services_solution_title", value: "LA SOLUZIONE CHIRURGICA DELL'ORDINE DEI COPYWRITER ESTINTI", page: "servizi", section: "solution" },
    ];

    for (const content of servicesContent) {
      try {
        await this.createAdminContent(content);
      } catch (error) {
        // Content might already exist
      }
    }

    // Contact page content
    const contactContent = [
      { key: "contact_title", value: "CONTATTACI", page: "contatti", section: "header" },
      { key: "contact_description", value: "Siamo qui per trasformare la tua comunicazione in un'arma di conversione potente.", page: "contatti", section: "main" },
    ];

    for (const content of contactContent) {
      try {
        await this.createAdminContent(content);
      } catch (error) {
        // Content might already exist
      }
    }

    // Footer content
    const footerContent = [
      { key: "footer_company_title", value: "ORDINE DEI COPYWRITER ESTINTI", page: "all", section: "footer" },
      { key: "footer_company_description", value: "L'agenzia di Email Marketing che riporta in vita le tue liste dormienti e trasforma ogni email in un'arma di vendita letale.", page: "all", section: "footer" },
      { key: "footer_vat_number", value: "P.IVA: IT03042210348", page: "all", section: "footer" },
      { key: "footer_contact_email", value: "Email: info@ordinedeiextinti.com", page: "all", section: "footer" },
      { key: "footer_contact_phone", value: "Tel: +39 XXX XXX XXXX", page: "all", section: "footer" },
      { key: "footer_nav_title", value: "Navigazione", page: "all", section: "footer" },
      { key: "footer_services_title", value: "I Nostri Servizi", page: "all", section: "footer" },
      { key: "footer_service_1", value: "Chirurgia Email Marketing", page: "all", section: "footer" },
      { key: "footer_service_2", value: "Rianimazione Liste Dormienti", page: "all", section: "footer" },
      { key: "footer_service_3", value: "Copywriting Persuasivo", page: "all", section: "footer" },
      { key: "footer_service_4", value: "Automazioni Avanzate", page: "all", section: "footer" },
      { key: "footer_service_5", value: "Consulenza Strategica", page: "all", section: "footer" },
      { key: "footer_copyright", value: "© 2025 Ordine dei Copywriter Estinti. Tutti i diritti riservati.", page: "all", section: "footer" },
      { key: "footer_privacy_link", value: "Privacy Policy", page: "all", section: "footer" },
      { key: "footer_terms_link", value: "Termini di Servizio", page: "all", section: "footer" },
      { key: "footer_cookies_link", value: "Cookie Policy", page: "all", section: "footer" },
    ];

    for (const content of footerContent) {
      try {
        await this.createAdminContent(content);
      } catch (error) {
        // Content might already exist
      }
    }
  }

  private async createDefaultStyling() {
    // Default styling configurations
    const defaultStyles = [
      { elementId: "hero_section", page: "home", styles: { padding: "4rem 2rem", margin: "2rem auto", maxWidth: "1200px", textAlign: "center" } },
      { elementId: "main_container", page: "home", styles: { padding: "2rem", margin: "0 auto", maxWidth: "1400px", backgroundColor: "transparent" } },
      { elementId: "navigation_bar", page: "all", styles: { padding: "1rem 2rem", backgroundColor: "rgba(0,0,0,0.9)", borderBottom: "1px solid rgba(255,255,255,0.1)" } },
      { elementId: "services_opening_section", page: "servizi", styles: { padding: "2.5rem", margin: "1.25rem auto", maxWidth: "1500px", borderRadius: "1.5rem" } },
      { elementId: "services_problem_section", page: "servizi", styles: { padding: "2.5rem", margin: "1.25rem auto", maxWidth: "1750px", borderRadius: "1.5rem" } },
      { elementId: "contact_form", page: "contatti", styles: { padding: "2rem", margin: "1rem auto", maxWidth: "800px", borderRadius: "1rem" } },
    ];

    for (const style of defaultStyles) {
      try {
        await this.createAdminStyling(style);
      } catch (error) {
        // Style might already exist
      }
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Diagnosis request methods
  async createDiagnosisRequest(insertRequest: InsertDiagnosisRequest): Promise<DiagnosisRequest> {
    const id = this.currentDiagnosisId++;
    const request: DiagnosisRequest = {
      id,
      firstName: insertRequest.firstName,
      lastName: insertRequest.lastName,
      email: insertRequest.email,
      phone: insertRequest.phone,
      company: insertRequest.company,
      sector: insertRequest.sector,
      revenue: insertRequest.revenue || null,
      hasEmailList: insertRequest.hasEmailList,
      description: insertRequest.description,
      createdAt: new Date(),
    };
    this.diagnosisRequests.set(id, request);
    return request;
  }

  async getDiagnosisRequests(): Promise<DiagnosisRequest[]> {
    return Array.from(this.diagnosisRequests.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getDiagnosisRequest(id: number): Promise<DiagnosisRequest | undefined> {
    return this.diagnosisRequests.get(id);
  }

  // Contact submission methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const submission: ContactSubmission = {
      id,
      firstName: insertSubmission.firstName,
      lastName: insertSubmission.lastName,
      email: insertSubmission.email,
      phone: insertSubmission.phone || null,
      company: insertSubmission.company,
      sector: insertSubmission.sector,
      revenue: insertSubmission.revenue || null,
      hasEmailList: insertSubmission.hasEmailList,
      goals: insertSubmission.goals,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }

  // Admin content methods
  async getAdminContent(key: string): Promise<AdminContent | undefined> {
    return this.adminContent.get(key);
  }

  async getAllAdminContent(): Promise<AdminContent[]> {
    return Array.from(this.adminContent.values());
  }

  async getAdminContentByPage(page: string): Promise<AdminContent[]> {
    return Array.from(this.adminContent.values()).filter(content => content.page === page);
  }

  async createAdminContent(insertContent: InsertAdminContent): Promise<AdminContent> {
    const id = this.currentAdminContentId++;
    const content: AdminContent = {
      id,
      key: insertContent.key,
      value: insertContent.value,
      page: insertContent.page,
      section: insertContent.section,
      updatedAt: new Date(),
    };
    this.adminContent.set(insertContent.key, content);
    return content;
  }

  async updateAdminContent(key: string, value: string): Promise<AdminContent> {
    const existing = this.adminContent.get(key);
    if (!existing) {
      // If the content doesn't exist, create it with default properties
      console.log(`Creating new admin content with key: ${key}`);
      const newContent: AdminContent = {
        id: this.currentAdminContentId++,
        key,
        value,
        page: "unknown", // Will be updated when we know the actual page
        section: "unknown", // Will be updated when we know the actual section
        updatedAt: new Date(),
      };
      this.adminContent.set(key, newContent);
      return newContent;
    }
    const updated: AdminContent = {
      ...existing,
      value,
      updatedAt: new Date(),
    };
    this.adminContent.set(key, updated);
    return updated;
  }

  // Admin styling methods
  async getAdminStyling(elementId: string): Promise<AdminStyling | undefined> {
    return this.adminStyling.get(elementId);
  }

  async getAllAdminStyling(): Promise<AdminStyling[]> {
    return Array.from(this.adminStyling.values());
  }

  async getAdminStylingByPage(page: string): Promise<AdminStyling[]> {
    return Array.from(this.adminStyling.values()).filter(styling => styling.page === page);
  }

  async createAdminStyling(insertStyling: InsertAdminStyling): Promise<AdminStyling> {
    const id = this.currentAdminStylingId++;
    const styling: AdminStyling = {
      id,
      elementId: insertStyling.elementId,
      page: insertStyling.page,
      styles: insertStyling.styles,
      updatedAt: new Date(),
    };
    this.adminStyling.set(insertStyling.elementId, styling);
    return styling;
  }

  async updateAdminStyling(elementId: string, styles: any): Promise<AdminStyling> {
    const existing = this.adminStyling.get(elementId);
    if (!existing) {
      throw new Error(`Admin styling with elementId ${elementId} not found`);
    }
    const updated: AdminStyling = {
      ...existing,
      styles,
      updatedAt: new Date(),
    };
    this.adminStyling.set(elementId, updated);
    return updated;
  }

  // Admin session methods
  async createAdminSession(insertSession: InsertAdminSession): Promise<AdminSession> {
    const id = this.currentAdminSessionId++;
    const session: AdminSession = {
      id,
      sessionToken: insertSession.sessionToken,
      createdAt: new Date(),
      expiresAt: insertSession.expiresAt,
    };
    this.adminSessions.set(insertSession.sessionToken, session);
    return session;
  }

  async getAdminSession(sessionToken: string): Promise<AdminSession | undefined> {
    const session = this.adminSessions.get(sessionToken);
    if (session && session.expiresAt < new Date()) {
      // Session expired, delete it
      this.adminSessions.delete(sessionToken);
      return undefined;
    }
    return session;
  }

  async getAllAdminSessions(): Promise<AdminSession[]> {
    return Array.from(this.adminSessions.values());
  }

  async deleteAdminSession(sessionToken: string): Promise<void> {
    this.adminSessions.delete(sessionToken);
  }

  async cleanupExpiredSessions(): Promise<void> {
    const now = new Date();
    Array.from(this.adminSessions.keys()).forEach(token => {
      const session = this.adminSessions.get(token);
      if (session && session.expiresAt < now) {
        this.adminSessions.delete(token);
      }
    });
  }

  // Blog post methods
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const now = new Date();
    const post: BlogPost = {
      id,
      title: insertPost.title,
      slug: insertPost.slug,
      content: insertPost.content,
      excerpt: insertPost.excerpt || null,
      author: insertPost.author,
      status: insertPost.status || "draft",
      featuredImage: insertPost.featuredImage || null,
      metaTitle: insertPost.metaTitle || null,
      metaDescription: insertPost.metaDescription || null,
      tags: insertPost.tags || null,
      readingTime: insertPost.readingTime || null,
      createdAt: now,
      updatedAt: now,
      publishedAt: insertPost.status === "published" ? now : null,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: number, updates: UpdateBlogPost): Promise<BlogPost> {
    const existing = this.blogPosts.get(id);
    if (!existing) {
      throw new Error(`Blog post with id ${id} not found`);
    }
    
    const updated: BlogPost = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
      publishedAt: updates.status === "published" && existing.status !== "published" 
        ? new Date() 
        : existing.publishedAt,
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    const exists = this.blogPosts.has(id);
    if (!exists) {
      throw new Error(`Blog post with id ${id} not found`);
    }
    this.blogPosts.delete(id);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.status === "published")
      .sort((a, b) => {
        const aTime = a.publishedAt?.getTime() || 0;
        const bTime = b.publishedAt?.getTime() || 0;
        return bTime - aTime;
      });
  }

  async getBlogPostsByStatus(status: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.status === status)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.blogPosts.values())
      .filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(lowercaseQuery)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
      )
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  // Site update methods
  async createSiteUpdate(update: InsertSiteUpdate): Promise<SiteUpdate> {
    const id = this.currentSiteUpdateId++;
    const newUpdate: SiteUpdate = {
      id,
      version: update.version,
      fileName: update.fileName,
      filePath: update.filePath,
      fileSize: update.fileSize,
      status: update.status || "pending",
      description: update.description || null,
      errorMessage: update.errorMessage || null,
      backupPath: update.backupPath || null,
      createdAt: new Date(),
      completedAt: null,
    };
    this.siteUpdates.set(id, newUpdate);
    return newUpdate;
  }

  async updateSiteUpdate(id: number, updates: UpdateSiteUpdate): Promise<SiteUpdate> {
    const existing = this.siteUpdates.get(id);
    if (!existing) {
      throw new Error(`Site update with id ${id} not found`);
    }
    
    const updated: SiteUpdate = {
      ...existing,
      ...updates,
      completedAt: updates.status === "completed" ? new Date() : existing.completedAt,
    };
    this.siteUpdates.set(id, updated);
    return updated;
  }

  async deleteSiteUpdate(id: number): Promise<void> {
    this.siteUpdates.delete(id);
  }

  async getSiteUpdate(id: number): Promise<SiteUpdate | undefined> {
    return this.siteUpdates.get(id);
  }

  async getAllSiteUpdates(): Promise<SiteUpdate[]> {
    return Array.from(this.siteUpdates.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getSiteUpdatesByStatus(status: string): Promise<SiteUpdate[]> {
    return Array.from(this.siteUpdates.values())
      .filter(update => update.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getLatestSiteUpdate(): Promise<SiteUpdate | undefined> {
    const updates = Array.from(this.siteUpdates.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return updates[0];
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async initialize() {
    // Database tables are already created via migrations
    console.log("DatabaseStorage initialized");
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Diagnosis request methods
  async createDiagnosisRequest(insertRequest: InsertDiagnosisRequest): Promise<DiagnosisRequest> {
    const [request] = await db.insert(diagnosisRequests).values(insertRequest).returning();
    return request;
  }

  async getDiagnosisRequests(): Promise<DiagnosisRequest[]> {
    return await db.select().from(diagnosisRequests).orderBy(desc(diagnosisRequests.createdAt));
  }

  async getDiagnosisRequest(id: number): Promise<DiagnosisRequest | undefined> {
    const [request] = await db.select().from(diagnosisRequests).where(eq(diagnosisRequests.id, id));
    return request || undefined;
  }

  // Contact submission methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission || undefined;
  }

  // Admin content methods
  async getAdminContent(key: string): Promise<AdminContent | undefined> {
    const [content] = await db.select().from(adminContent).where(eq(adminContent.key, key));
    return content || undefined;
  }

  async getAllAdminContent(): Promise<AdminContent[]> {
    return await db.select().from(adminContent);
  }

  async getAdminContentByPage(page: string): Promise<AdminContent[]> {
    return await db.select().from(adminContent).where(eq(adminContent.page, page));
  }

  async createAdminContent(insertContent: InsertAdminContent): Promise<AdminContent> {
    const [content] = await db.insert(adminContent).values(insertContent).returning();
    return content;
  }

  async updateAdminContent(key: string, value: string): Promise<AdminContent> {
    const existing = await this.getAdminContent(key);
    if (!existing) {
      const newContent: InsertAdminContent = {
        key,
        value,
        page: "unknown",
        section: "unknown",
      };
      return await this.createAdminContent(newContent);
    }
    const [updated] = await db.update(adminContent)
      .set({ value, updatedAt: new Date() })
      .where(eq(adminContent.key, key))
      .returning();
    return updated;
  }

  // Admin styling methods
  async getAdminStyling(elementId: string): Promise<AdminStyling | undefined> {
    const [styling] = await db.select().from(adminStyling).where(eq(adminStyling.elementId, elementId));
    return styling || undefined;
  }

  async getAllAdminStyling(): Promise<AdminStyling[]> {
    return await db.select().from(adminStyling);
  }

  async getAdminStylingByPage(page: string): Promise<AdminStyling[]> {
    return await db.select().from(adminStyling).where(eq(adminStyling.page, page));
  }

  async createAdminStyling(insertStyling: InsertAdminStyling): Promise<AdminStyling> {
    const [styling] = await db.insert(adminStyling).values(insertStyling).returning();
    return styling;
  }

  async updateAdminStyling(elementId: string, styles: any): Promise<AdminStyling> {
    const [updated] = await db.update(adminStyling)
      .set({ styles, updatedAt: new Date() })
      .where(eq(adminStyling.elementId, elementId))
      .returning();
    return updated;
  }

  // Admin session methods (THE KEY FIX!)
  async createAdminSession(insertSession: InsertAdminSession): Promise<AdminSession> {
    const [session] = await db.insert(adminSessions).values(insertSession).returning();
    return session;
  }

  async getAdminSession(sessionToken: string): Promise<AdminSession | undefined> {
    const [session] = await db.select().from(adminSessions).where(eq(adminSessions.sessionToken, sessionToken));
    if (session && session.expiresAt < new Date()) {
      // Session expired, delete it
      await this.deleteAdminSession(sessionToken);
      return undefined;
    }
    return session || undefined;
  }

  async getAllAdminSessions(): Promise<AdminSession[]> {
    return await db.select().from(adminSessions);
  }

  async deleteAdminSession(sessionToken: string): Promise<void> {
    await db.delete(adminSessions).where(eq(adminSessions.sessionToken, sessionToken));
  }

  async cleanupExpiredSessions(): Promise<void> {
    await db.delete(adminSessions).where(lt(adminSessions.expiresAt, new Date()));
  }

  // Blog post methods
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: number, updates: UpdateBlogPost): Promise<BlogPost> {
    const [updated] = await db.update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostsByStatus(status: string): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.status, status))
      .orderBy(desc(blogPosts.createdAt));
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(like(blogPosts.title, `%${query}%`))
      .orderBy(desc(blogPosts.createdAt));
  }

  // Site update methods
  async createSiteUpdate(insertUpdate: InsertSiteUpdate): Promise<SiteUpdate> {
    const [update] = await db.insert(siteUpdates).values(insertUpdate).returning();
    return update;
  }

  async updateSiteUpdate(id: number, updates: UpdateSiteUpdate): Promise<SiteUpdate> {
    const [updated] = await db.update(siteUpdates)
      .set({ 
        ...updates, 
        completedAt: updates.status === "completed" ? new Date() : undefined 
      })
      .where(eq(siteUpdates.id, id))
      .returning();
    return updated;
  }

  async deleteSiteUpdate(id: number): Promise<void> {
    await db.delete(siteUpdates).where(eq(siteUpdates.id, id));
  }

  async getSiteUpdate(id: number): Promise<SiteUpdate | undefined> {
    const [update] = await db.select().from(siteUpdates).where(eq(siteUpdates.id, id));
    return update || undefined;
  }

  async getAllSiteUpdates(): Promise<SiteUpdate[]> {
    return await db.select().from(siteUpdates).orderBy(desc(siteUpdates.createdAt));
  }

  async getSiteUpdatesByStatus(status: string): Promise<SiteUpdate[]> {
    return await db.select().from(siteUpdates)
      .where(eq(siteUpdates.status, status))
      .orderBy(desc(siteUpdates.createdAt));
  }

  async getLatestSiteUpdate(): Promise<SiteUpdate | undefined> {
    const [update] = await db.select().from(siteUpdates)
      .orderBy(desc(siteUpdates.createdAt))
      .limit(1);
    return update || undefined;
  }
}

// Use DatabaseStorage instead of MemStorage to persist admin sessions
export const storage = new DatabaseStorage();
storage.initialize();
