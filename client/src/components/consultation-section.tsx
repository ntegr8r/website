import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, Shield, CalendarCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Company, type Assessment, type InsertConsultation } from "@shared/schema";

interface ConsultationSectionProps {
  onNext: () => void;
  onPrev: () => void;
  company?: Company;
  assessment?: Assessment;
}

export default function ConsultationSection({ onNext, onPrev, company, assessment }: ConsultationSectionProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InsertConsultation>({
    companyId: company?.id || 0,
    assessmentId: assessment?.id || 0,
    preferredTime: "",
    preferredDay: "",
    urgency: "",
    priority: "",
    source: "",
  });

  const createConsultationMutation = useMutation({
    mutationFn: async (data: InsertConsultation) => {
      const response = await apiRequest("POST", "/api/consultations", data);
      return response.json();
    },
    onSuccess: () => {
      onNext();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to book consultation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!company || !assessment) {
      toast({
        title: "Error",
        description: "Missing company or assessment information. Please go back and complete the previous steps.",
        variant: "destructive",
      });
      return;
    }

    // Validation
    if (!formData.preferredTime || !formData.preferredDay || !formData.urgency) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createConsultationMutation.mutate({
      ...formData,
      companyId: company.id,
      assessmentId: assessment.id,
    });
  };

  const updateFormData = (field: keyof InsertConsultation, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="min-h-screen flex items-center py-12">
      <div className="max-w-2xl mx-auto px-4 w-full">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Schedule Your Strategy Consultation</h2>
              <p className="text-gray-600">Let's discuss how to implement your personalized senior marketing plan</p>
            </div>

            {/* Consultation Benefits */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">What You'll Get in This 30-Minute Call:</h3>
              <ul className="space-y-2 text-blue-800">
                {[
                  "Detailed review of your assessment results",
                  "Custom implementation roadmap for your business",
                  "Industry-specific senior marketing strategies",
                  "Q&A with our senior marketing expert"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="text-blue-600 mt-1 h-4 w-4 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="preferredTime">Preferred Consultation Time *</Label>
                <Select value={formData.preferredTime} onValueChange={(value) => updateFormData("preferredTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Time Preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 12 PM EST)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 5 PM EST)</SelectItem>
                    <SelectItem value="evening">Evening (5 PM - 8 PM EST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="preferredDay">Preferred Day *</Label>
                  <Select value={formData.preferredDay} onValueChange={(value) => updateFormData("preferredDay", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select value={formData.urgency} onValueChange={(value) => updateFormData("urgency", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="this-week">This week</SelectItem>
                      <SelectItem value="next-week">Next week</SelectItem>
                      <SelectItem value="flexible">Flexible timing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="priority">What's your biggest priority for this consultation?</Label>
                <Textarea
                  id="priority"
                  rows={4}
                  placeholder="Tell us what you'd like to focus on during our call..."
                  value={formData.priority}
                  onChange={(e) => updateFormData("priority", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="source">How did you hear about us?</Label>
                <Select value={formData.source} onValueChange={(value) => updateFormData("source", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">100% Free Consultation - No Sales Pitch Guarantee</span>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
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
                  className="flex-1 bg-secondary hover:bg-green-700"
                  disabled={createConsultationMutation.isPending}
                >
                  {createConsultationMutation.isPending ? "Booking..." : "Book My Consultation"}
                  <CalendarCheck className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
