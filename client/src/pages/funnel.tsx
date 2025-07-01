import { useState } from "react";
import ProgressBar from "@/components/progress-bar";
import LandingSection from "@/components/landing-section";
import CompanyInfoSection from "@/components/company-info-section";
import AssessmentSection from "@/components/assessment-section";
import ResultsSection from "@/components/results-section";
import ConsultationSection from "@/components/consultation-section";
import ThankYouSection from "@/components/thank-you-section";
import { type Company, type Assessment, type AssessmentResults } from "@shared/schema";

export type FunnelData = {
  company?: Company;
  assessment?: Assessment;
  assessmentResults?: AssessmentResults;
};

export default function Funnel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [funnelData, setFunnelData] = useState<FunnelData>({});

  const totalSteps = 6;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFunnelData = (data: Partial<FunnelData>) => {
    setFunnelData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <main className="pt-20">
        {currentStep === 1 && (
          <LandingSection onNext={nextStep} />
        )}
        
        {currentStep === 2 && (
          <CompanyInfoSection 
            onNext={nextStep} 
            onPrev={prevStep}
            onDataUpdate={updateFunnelData}
          />
        )}
        
        {currentStep === 3 && (
          <AssessmentSection 
            onNext={nextStep} 
            onPrev={prevStep}
            company={funnelData.company}
            onDataUpdate={updateFunnelData}
          />
        )}
        
        {currentStep === 4 && (
          <ResultsSection 
            onNext={nextStep} 
            onPrev={prevStep}
            assessmentResults={funnelData.assessmentResults}
          />
        )}
        
        {currentStep === 5 && (
          <ConsultationSection 
            onNext={nextStep} 
            onPrev={prevStep}
            company={funnelData.company}
            assessment={funnelData.assessment}
          />
        )}
        
        {currentStep === 6 && (
          <ThankYouSection />
        )}
      </main>
    </div>
  );
}
