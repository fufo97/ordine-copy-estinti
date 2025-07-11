import { 
  users, 
  diagnosisRequests, 
  contactSubmissions,
  adminContent,
  adminStyling,
  adminSessions,
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
  type InsertAdminSession
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private diagnosisRequests: Map<number, DiagnosisRequest>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private adminContent: Map<string, AdminContent>;
  private adminStyling: Map<string, AdminStyling>;
  private adminSessions: Map<string, AdminSession>;
  private currentUserId: number;
  private currentDiagnosisId: number;
  private currentContactId: number;
  private currentAdminContentId: number;
  private currentAdminStylingId: number;
  private currentAdminSessionId: number;

  constructor() {
    this.users = new Map();
    this.diagnosisRequests = new Map();
    this.contactSubmissions = new Map();
    this.adminContent = new Map();
    this.adminStyling = new Map();
    this.adminSessions = new Map();
    this.currentUserId = 1;
    this.currentDiagnosisId = 1;
    this.currentContactId = 1;
    this.currentAdminContentId = 1;
    this.currentAdminStylingId = 1;
    this.currentAdminSessionId = 1;
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
      company: insertRequest.company || null,
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
      throw new Error(`Admin content with key ${key} not found`);
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
}

export const storage = new MemStorage();
// Initialize the storage with default data
storage.initialize();
