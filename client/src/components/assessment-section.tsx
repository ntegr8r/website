import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Company, type Assessment, type AssessmentResponses, type AssessmentResults } from "@shared/schema";
import { type FunnelData } from "@/pages/funnel";

interface AssessmentSectionProps {
  onNext: () => void;
  onPrev: () => void;
  company?: Company;
  onDataUpdate: (data: Partial<FunnelData>) => void;
}

export default function AssessmentSection({ onNext, onPrev, company, onDataUpdate }: AssessmentSectionProps) {
  const { toast } = useToast();
  const [responses, setResponses] = useState<AssessmentResponses>({
    seniorCustomerPercentage: "",
    marketingChannels: [],
    biggestChallenge: "",
    primaryGoal: "",
    monthlyBudget: "",
  });

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: { companyId: number; responses: AssessmentResponses }) => {
      const response = await apiRequest("POST", "/api/assessments", data);
      return response.json() as Promise<{ assessment: Assessment; results: AssessmentResults }>;
    },
    onSuccess: ({ assessment, results }) => {
      onDataUpdate({ assessment, assessmentResults: results });
      onNext();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!company) {
      toast({
        title: "Error",
        description: "Company information is missing. Please go back and complete the previous step.",
        variant: "destructive",
      });
      return;
    }

    // Validation
    if (!responses.seniorCustomerPercentage || !responses.biggestChallenge || !responses.primaryGoal || !responses.monthlyBudget) {
      toast({
        title: "Validation Error",
        description: "Please answer all required questions.",
        variant: "destructive",
      });
      return;
    }

    if (responses.marketingChannels.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one marketing channel.",
        variant: "destructive",
      });
      return;
    }

    createAssessmentMutation.mutate({
      companyId: company.id,
      responses,
    });
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    setResponses(prev => ({
      ...prev,
      marketingChannels: checked
        ? [...prev.marketingChannels, channel]
        : prev.marketingChannels.filter(c => c !== channel)
    }));
  };

  return (
    <section className="min-h-screen flex items-center py-12">
      <div className="max-w-3xl mx-auto px-4 w-full">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Senior Marketing Assessment</h2>
              <p className="text-gray-600">Answer these questions to help us understand your current approach and challenges</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question 1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">1. What percentage of your current customer base is over 55?</h3>
                <RadioGroup
                  value={responses.seniorCustomerPercentage}
                  onValueChange={(value) => setResponses(prev => ({ ...prev, seniorCustomerPercentage: value }))}
                >
                  {[
                    { value: "0-10", label: "0-10%" },
                    { value: "11-25", label: "11-25%" },
                    { value: "26-50", label: "26-50%" },
                    { value: "51+", label: "Over 50%" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`q1-${option.value}`} />
                      <Label htmlFor={`q1-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Question 2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Which marketing channels do you currently use? (Select all that apply)</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {[
                    { value: "social-media", label: "Social Media" },
                    { value: "email", label: "Email Marketing" },
                    { value: "print", label: "Print Advertising" },
                    { value: "tv-radio", label: "TV/Radio" },
                    { value: "direct-mail", label: "Direct Mail" },
                    { value: "referrals", label: "Referrals" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`q2-${option.value}`}
                        checked={responses.marketingChannels.includes(option.value)}
                        onCheckedChange={(checked) => handleChannelChange(option.value, checked as boolean)}
                      />
                      <Label htmlFor={`q2-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">3. What's your biggest challenge in marketing to seniors?</h3>
                <RadioGroup
                  value={responses.biggestChallenge}
                  onValueChange={(value) => setResponses(prev => ({ ...prev, biggestChallenge: value }))}
                >
                  {[
                    { value: "understanding-preferences", label: "Understanding their preferences and behaviors" },
                    { value: "building-trust", label: "Building trust and credibility" },
                    { value: "channel-selection", label: "Choosing the right marketing channels" },
                    { value: "messaging", label: "Creating appropriate messaging and content" },
                    { value: "accessibility", label: "Making content accessible and easy to understand" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`q3-${option.value}`} />
                      <Label htmlFor={`q3-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Question 4 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">4. What's your primary goal for targeting the senior market?</h3>
                <RadioGroup
                  value={responses.primaryGoal}
                  onValueChange={(value) => setResponses(prev => ({ ...prev, primaryGoal: value }))}
                >
                  {[
                    { value: "increase-revenue", label: "Increase overall revenue" },
                    { value: "diversify-customers", label: "Diversify customer base" },
                    { value: "market-expansion", label: "Expand into new markets" },
                    { value: "brand-recognition", label: "Build brand recognition" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`q4-${option.value}`} />
                      <Label htmlFor={`q4-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Question 5 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">5. What's your monthly marketing budget range?</h3>
                <RadioGroup
                  value={responses.monthlyBudget}
                  onValueChange={(value) => setResponses(prev => ({ ...prev, monthlyBudget: value }))}
                >
                  {[
                    { value: "under-5k", label: "Under $5,000" },
                    { value: "5k-15k", label: "$5,000 - $15,000" },
                    { value: "15k-50k", label: "$15,000 - $50,000" },
                    { value: "over-50k", label: "Over $50,000" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`q5-${option.value}`} />
                      <Label htmlFor={`q5-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex space-x-4 pt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onPrev}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={createAssessmentMutation.isPending}
                >
                  {createAssessmentMutation.isPending ? "Analyzing..." : "Get My Results"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
