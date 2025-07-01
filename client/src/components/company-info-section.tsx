import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type InsertCompany, type Company } from "@shared/schema";
import { type FunnelData } from "@/pages/funnel";

interface CompanyInfoSectionProps {
  onNext: () => void;
  onPrev: () => void;
  onDataUpdate: (data: Partial<FunnelData>) => void;
}

export default function CompanyInfoSection({ onNext, onPrev, onDataUpdate }: CompanyInfoSectionProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InsertCompany>({
    name: "",
    industry: "",
    size: "",
    revenue: "",
    userName: "",
    userRole: "",
    email: "",
    phone: "",
  });

  const createCompanyMutation = useMutation({
    mutationFn: async (data: InsertCompany) => {
      const response = await apiRequest("POST", "/api/companies", data);
      return response.json() as Promise<Company>;
    },
    onSuccess: (company) => {
      onDataUpdate({ company });
      onNext();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save company information. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.industry || !formData.userName || !formData.userRole || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createCompanyMutation.mutate(formData);
  };

  const updateFormData = (field: keyof InsertCompany, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="min-h-screen flex items-center py-12">
      <div className="max-w-2xl mx-auto px-4 w-full">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us About Your Company</h2>
              <p className="text-gray-600">Help us understand your business so we can provide personalized recommendations</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Your Company Name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="financial">Financial Services</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="travel">Travel & Hospitality</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="userName">Your Name *</Label>
                  <Input
                    id="userName"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.userName}
                    onChange={(e) => updateFormData("userName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="userRole">Your Role *</Label>
                  <Input
                    id="userRole"
                    type="text"
                    required
                    placeholder="CEO, Marketing Director, etc."
                    value={formData.userRole}
                    onChange={(e) => updateFormData("userRole", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="size">Company Size</Label>
                <Select value={formData.size} onValueChange={(value) => updateFormData("size", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Company Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="revenue">Annual Revenue Range</Label>
                <Select value={formData.revenue} onValueChange={(value) => updateFormData("revenue", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Revenue Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under $1M</SelectItem>
                    <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m-25m">$5M - $25M</SelectItem>
                    <SelectItem value="25m-100m">$25M - $100M</SelectItem>
                    <SelectItem value="over-100m">Over $100M</SelectItem>
                  </SelectContent>
                </Select>
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
                  className="flex-1"
                  disabled={createCompanyMutation.isPending}
                >
                  {createCompanyMutation.isPending ? "Saving..." : "Continue"}
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
