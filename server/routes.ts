import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCompanySchema, insertAssessmentSchema, insertConsultationSchema, type AssessmentResponses, type AssessmentResults } from "@shared/schema";
import { z } from "zod";

function calculateAssessmentScore(responses: AssessmentResponses): { score: number; results: AssessmentResults } {
  let score = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Score based on senior customer percentage
  switch (responses.seniorCustomerPercentage) {
    case "0-10":
      score += 10;
      improvements.push("Limited senior customer base (under 25%)");
      break;
    case "11-25":
      score += 25;
      improvements.push("Growing senior customer base but room for expansion");
      break;
    case "26-50":
      score += 40;
      strengths.push("Solid senior customer foundation");
      break;
    case "51+":
      score += 50;
      strengths.push("Strong senior customer base");
      break;
  }

  // Score based on marketing channels
  const channels = responses.marketingChannels;
  if (channels.includes("email")) {
    score += 15;
    strengths.push("Email marketing foundation in place");
  }
  if (channels.includes("direct-mail")) {
    score += 20;
    strengths.push("Direct mail strategy for seniors");
  }
  if (channels.includes("referrals")) {
    score += 15;
    strengths.push("Referral program established");
  }
  if (!channels.includes("direct-mail") && !channels.includes("referrals")) {
    improvements.push("Missing key senior-friendly channels");
  }

  // Score based on biggest challenge
  switch (responses.biggestChallenge) {
    case "understanding-preferences":
      score += 5;
      improvements.push("Need better understanding of senior preferences");
      break;
    case "building-trust":
      score += 10;
      improvements.push("Need trust-building strategies");
      break;
    case "channel-selection":
      score += 15;
      break;
    case "messaging":
      score += 10;
      break;
    case "accessibility":
      score += 12;
      break;
  }

  // Score based on primary goal
  switch (responses.primaryGoal) {
    case "increase-revenue":
      score += 15;
      strengths.push("Clear revenue growth objectives");
      break;
    case "diversify-customers":
      score += 12;
      break;
    case "market-expansion":
      score += 10;
      break;
    case "brand-recognition":
      score += 8;
      break;
  }

  // Score based on budget
  switch (responses.monthlyBudget) {
    case "under-5k":
      score += 5;
      break;
    case "5k-15k":
      score += 10;
      strengths.push("Adequate marketing budget allocation");
      break;
    case "15k-50k":
      score += 15;
      strengths.push("Strong marketing budget for implementation");
      break;
    case "over-50k":
      score += 20;
      strengths.push("Excellent marketing budget for comprehensive strategy");
      break;
  }

  const actionPlan = [
    {
      title: "Implement Multi-Channel Senior Strategy",
      description: "Add direct mail and referral programs to complement your digital efforts"
    },
    {
      title: "Develop Trust-Building Content",
      description: "Create testimonials, case studies, and educational content specifically for seniors"
    },
    {
      title: "Optimize Message Accessibility",
      description: "Improve font sizes, contrast, and simplify complex messaging"
    }
  ];

  const projectedImpact = {
    customerGrowth: "2.5x",
    additionalRevenue: "$850K",
    customerLTV: "45%"
  };

  const results: AssessmentResults = {
    score,
    strengths,
    improvements,
    actionPlan,
    projectedImpact
  };

  return { score, results };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Create company
  app.post("/api/companies", async (req, res) => {
    try {
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(validatedData);
      res.json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid company data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create company" });
    }
  });

  // Get company
  app.get("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const company = await storage.getCompany(id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ message: "Failed to get company" });
    }
  });

  // Create assessment
  app.post("/api/assessments", async (req, res) => {
    try {
      const { companyId, responses } = req.body;
      
      if (!companyId || !responses) {
        return res.status(400).json({ message: "Company ID and responses are required" });
      }

      const company = await storage.getCompany(companyId);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      const { score, results } = calculateAssessmentScore(responses);
      
      const assessmentData = {
        companyId,
        responses,
        score
      };

      const validatedData = insertAssessmentSchema.parse(assessmentData);
      const assessment = await storage.createAssessment(validatedData);
      
      res.json({ assessment, results });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create assessment" });
    }
  });

  // Get assessment results
  app.get("/api/assessments/:id/results", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessment(id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }

      const { results } = calculateAssessmentScore(assessment.responses as AssessmentResponses);
      res.json({ assessment, results });
    } catch (error) {
      res.status(500).json({ message: "Failed to get assessment results" });
    }
  });

  // Create consultation
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      res.json(consultation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid consultation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create consultation" });
    }
  });

  // Get consultations by company
  app.get("/api/companies/:companyId/consultations", async (req, res) => {
    try {
      const companyId = parseInt(req.params.companyId);
      const consultations = await storage.getConsultationsByCompanyId(companyId);
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get consultations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
