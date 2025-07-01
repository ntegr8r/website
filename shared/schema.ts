import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry").notNull(),
  size: text("size"),
  revenue: text("revenue"),
  userName: text("user_name").notNull(),
  userRole: text("user_role").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  responses: jsonb("responses").notNull(),
  score: integer("score").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  assessmentId: integer("assessment_id").references(() => assessments.id).notNull(),
  preferredTime: text("preferred_time").notNull(),
  preferredDay: text("preferred_day").notNull(),
  urgency: text("urgency").notNull(),
  priority: text("priority"),
  source: text("source"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Consultation = typeof consultations.$inferSelect;
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;

export interface AssessmentResponses {
  seniorCustomerPercentage: string;
  marketingChannels: string[];
  biggestChallenge: string;
  primaryGoal: string;
  monthlyBudget: string;
}

export interface AssessmentResults {
  score: number;
  strengths: string[];
  improvements: string[];
  actionPlan: Array<{
    title: string;
    description: string;
  }>;
  projectedImpact: {
    customerGrowth: string;
    additionalRevenue: string;
    customerLTV: string;
  };
}
