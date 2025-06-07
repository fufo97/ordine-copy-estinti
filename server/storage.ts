import { 
  users, 
  diagnosisRequests, 
  contactSubmissions,
  type User, 
  type InsertUser,
  type DiagnosisRequest,
  type InsertDiagnosisRequest,
  type ContactSubmission,
  type InsertContactSubmission
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private diagnosisRequests: Map<number, DiagnosisRequest>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentDiagnosisId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.diagnosisRequests = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentDiagnosisId = 1;
    this.currentContactId = 1;
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
      ...insertRequest,
      id,
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
      ...insertSubmission,
      id,
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
}

export const storage = new MemStorage();
