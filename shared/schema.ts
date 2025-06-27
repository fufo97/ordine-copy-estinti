import { pgTable, text, serial, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keeping the existing structure)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Diagnosis requests table
export const diagnosisRequests = pgTable("diagnosis_requests", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contact form submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company").notNull(),
  sector: text("sector").notNull(),
  revenue: text("revenue"),
  hasEmailList: text("has_email_list").notNull(),
  goals: text("goals").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Admin content management table
export const adminContent = pgTable("admin_content", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(), // unique identifier for each content piece
  value: text("value").notNull(), // the actual text content
  page: text("page").notNull(), // which page this content belongs to (home, servizi, contatti, etc.)
  section: text("section").notNull(), // which section of the page
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Admin styling configuration table
export const adminStyling = pgTable("admin_styling", {
  id: serial("id").primaryKey(),
  elementId: text("element_id").notNull().unique(), // unique identifier for each element
  page: text("page").notNull(), // which page this styling belongs to
  styles: json("styles").notNull(), // JSON object containing all style properties
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Admin session table for authentication
export const adminSessions = pgTable("admin_sessions", {
  id: serial("id").primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Insert schemas for form validation
export const insertDiagnosisSchema = createInsertSchema(diagnosisRequests).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Admin schemas
export const insertAdminContentSchema = createInsertSchema(adminContent).omit({
  id: true,
  updatedAt: true,
});

export const insertAdminStylingSchema = createInsertSchema(adminStyling).omit({
  id: true,
  updatedAt: true,
});

export const insertAdminSessionSchema = createInsertSchema(adminSessions).omit({
  id: true,
  createdAt: true,
});

// Admin login schema
export const adminLoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDiagnosisRequest = z.infer<typeof insertDiagnosisSchema>;
export type DiagnosisRequest = typeof diagnosisRequests.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertAdminContent = z.infer<typeof insertAdminContentSchema>;
export type AdminContent = typeof adminContent.$inferSelect;

export type InsertAdminStyling = z.infer<typeof insertAdminStylingSchema>;
export type AdminStyling = typeof adminStyling.$inferSelect;

export type InsertAdminSession = z.infer<typeof insertAdminSessionSchema>;
export type AdminSession = typeof adminSessions.$inferSelect;

export type AdminLogin = z.infer<typeof adminLoginSchema>;
