import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, BookOpen, Mail, Phone, Star } from "lucide-react";

export default function ThankYouSection() {
  return (
    <section className="min-h-screen flex items-center py-12">
      <div className="max-w-2xl mx-auto px-4 w-full text-center">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-secondary text-3xl" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8">Your consultation request has been submitted successfully.</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">What Happens Next?</h3>
              <div className="space-y-3 text-blue-800 text-left">
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
                  <span>You'll receive a confirmation email within 5 minutes</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
                  <span>Our team will review your assessment and prepare your custom strategy</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
                  <span>We'll reach out within 24 hours to schedule your consultation</span>
                </div>
              </div>
            </div>

            {/* Immediate Resources */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">While You Wait - Free Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="default" className="bg-primary hover:bg-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download Assessment PDF
                </Button>
                <Button variant="default" className="bg-secondary hover:bg-green-700">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Senior Marketing Guide
                </Button>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-gray-700 italic mb-4">
                "The consultation was incredibly valuable. We implemented just 3 of their recommendations and saw a 40% increase in senior customers within 60 days!"
              </p>
              <div className="flex items-center justify-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
                  alt="Client testimonial"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-600 text-sm">Founder, WellnessTech</p>
                </div>
              </div>
              <div className="flex justify-center text-yellow-400 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">Questions? We're here to help!</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center justify-center">
                  <Mail className="mr-1 h-4 w-4" />
                  hello@seniormarketingmastery.com
                </span>
                <span className="flex items-center justify-center">
                  <Phone className="mr-1 h-4 w-4" />
                  (555) 123-4567
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
