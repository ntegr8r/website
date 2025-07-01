import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, CheckCircle, AlertTriangle, Download, Video, Calendar } from "lucide-react";
import { type AssessmentResults } from "@shared/schema";

interface ResultsSectionProps {
  onNext: () => void;
  onPrev: () => void;
  assessmentResults?: AssessmentResults;
}

export default function ResultsSection({ onNext, onPrev, assessmentResults }: ResultsSectionProps) {
  if (!assessmentResults) {
    return (
      <section className="min-h-screen flex items-center py-12">
        <div className="max-w-4xl mx-auto px-4 w-full text-center">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <p className="text-gray-600">No assessment results available. Please complete the assessment first.</p>
              <Button onClick={onPrev} className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center py-12">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-secondary text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Senior Marketing Assessment Results</h2>
              <p className="text-gray-600">Based on your responses, here's what we recommend for your business</p>
            </div>

            {/* Results Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Your Senior Marketing Maturity Score: <span className="text-primary">{assessmentResults.score}/100</span>
              </h3>
              <p className="text-blue-800">
                {assessmentResults.score >= 70
                  ? "Excellent foundation for senior marketing with significant opportunities for optimization."
                  : assessmentResults.score >= 50
                  ? "You have a moderate foundation for senior marketing but significant opportunities exist to optimize your approach and dramatically increase revenue from this demographic."
                  : "There's tremendous opportunity to develop your senior marketing strategy and tap into this lucrative market."}
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                  <CheckCircle className="text-green-600 mr-2 h-5 w-5" />
                  Strengths Identified
                </h4>
                <ul className="space-y-2 text-green-800">
                  {assessmentResults.strengths.length > 0 ? (
                    assessmentResults.strengths.map((strength, index) => (
                      <li key={index}>• {strength}</li>
                    ))
                  ) : (
                    <li>• Ready to implement senior marketing strategies</li>
                  )}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
                  <AlertTriangle className="text-red-600 mr-2 h-5 w-5" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2 text-red-800">
                  {assessmentResults.improvements.length > 0 ? (
                    assessmentResults.improvements.map((improvement, index) => (
                      <li key={index}>• {improvement}</li>
                    ))
                  ) : (
                    <li>• Continue optimizing your senior marketing approach</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Recommended Action Plan */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Personalized Action Plan</h3>
              <div className="space-y-4">
                {assessmentResults.actionPlan.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{action.title}</h4>
                      <p className="text-gray-600">{action.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projected Impact */}
            <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3">Projected Impact of Implementation</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{assessmentResults.projectedImpact.customerGrowth}</div>
                  <div className="text-blue-100">Senior Customer Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{assessmentResults.projectedImpact.additionalRevenue}</div>
                  <div className="text-blue-100">Additional Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{assessmentResults.projectedImpact.customerLTV}</div>
                  <div className="text-blue-100">Higher Customer LTV</div>
                </div>
              </div>
            </div>

            {/* Educational Resources */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Download className="text-primary mr-2 h-5 w-5" />
                  Free Resources
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Senior Marketing Playbook (PDF)</li>
                  <li>• Trust-Building Checklist</li>
                  <li>• Channel Selection Guide</li>
                </ul>
                <Button variant="outline" className="mt-4 w-full">
                  Download Resources
                </Button>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Video className="text-primary mr-2 h-5 w-5" />
                  Video Training
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Senior Psychology Masterclass</li>
                  <li>• Channel Strategy Workshop</li>
                  <li>• Trust-Building Techniques</li>
                </ul>
                <Button variant="outline" className="mt-4 w-full">
                  Watch Training
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">Ready to implement these strategies with expert guidance?</p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={onPrev}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={onNext}
                  className="flex-1 bg-secondary hover:bg-green-700"
                >
                  Schedule Your Strategy Call
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
