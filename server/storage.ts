import { companies, assessments, consultations, type Company, type InsertCompany, type Assessment, type InsertAssessment, type Consultation, type InsertConsultation, type AssessmentResponses } from "@shared/schema";

export interface IStorage {
  // Company operations
  createCompany(company: InsertCompany): Promise<Company>;
  getCompany(id: number): Promise<Company | undefined>;
  
  // Assessment operations
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  getAssessmentByCompanyId(companyId: number): Promise<Assessment | undefined>;
  
  // Consultation operations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultation(id: number): Promise<Consultation | undefined>;
  getConsultationsByCompanyId(companyId: number): Promise<Consultation[]>;
}

export class MemStorage implements IStorage {
  private companies: Map<number, Company>;
  private assessments: Map<number, Assessment>;
  private consultations: Map<number, Consultation>;
  private currentCompanyId: number;
  private currentAssessmentId: number;
  private currentConsultationId: number;

  constructor() {
    this.companies = new Map();
    this.assessments = new Map();
    this.consultations = new Map();
    this.currentCompanyId = 1;
    this.currentAssessmentId = 1;
    this.currentConsultationId = 1;
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const company: Company = {
      ...insertCompany,
      id,
      createdAt: new Date(),
    };
    this.companies.set(id, company);
    return company;
  }

  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentAssessmentId++;
    const assessment: Assessment = {
      ...insertAssessment,
      id,
      createdAt: new Date(),
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async getAssessmentByCompanyId(companyId: number): Promise<Assessment | undefined> {
    return Array.from(this.assessments.values()).find(
      (assessment) => assessment.companyId === companyId
    );
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.currentConsultationId++;
    const consultation: Consultation = {
      ...insertConsultation,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async getConsultation(id: number): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }

  async getConsultationsByCompanyId(companyId: number): Promise<Consultation[]> {
    return Array.from(this.consultations.values()).filter(
      (consultation) => consultation.companyId === companyId
    );
  }
}

export const storage = new MemStorage();
