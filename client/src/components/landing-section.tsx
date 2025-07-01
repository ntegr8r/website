import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Award, Target, Handshake, Rocket, ArrowRight, Star } from "lucide-react";

interface LandingSectionProps {
  onNext: () => void;
}

export default function LandingSection({ onNext }: LandingSectionProps) {
  return (
    <section className="min-h-screen flex items-center py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unlock the $30 Trillion{" "}
            <span className="text-primary">Senior Market</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Young entrepreneurs are missing out on the wealthiest demographic in history.
            Learn proven strategies to authentically connect with and market to seniors over 55.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="text-secondary h-4 w-4" />
              <span>Trusted by 500+ Companies</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-secondary h-4 w-4" />
              <span>$50M+ in Senior Sales Generated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="text-secondary h-4 w-4" />
              <span>Industry-Leading ROI</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onNext}
            size="lg"
            className="bg-primary hover:bg-blue-700 text-white font-semibold py-4 px-8 text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Your Senior Marketing Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 animate-slide-up">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="text-primary text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Targeted Strategies</h3>
            <p className="text-gray-600">Learn age-appropriate marketing tactics that resonate with senior consumers</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Handshake className="text-secondary text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Trust</h3>
            <p className="text-gray-600">Establish credibility and authentic connections with senior customers</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Rocket className="text-red-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scale Revenue</h3>
            <p className="text-gray-600">Tap into the highest-spending demographic with proven methodologies</p>
          </div>
        </div>

        {/* Viral Social Proof Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">🔥 Going VIRAL on LinkedIn</h3>
            <p className="text-gray-600">Young entrepreneurs are sharing their senior market wins everywhere</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
                  alt="Professional headshot"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Michael Chen, 28</p>
                  <p className="text-gray-600 text-sm">HealthTech CEO</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-sm">
                "I was IGNORING the richest demographic! 6 months later: $2.3M in senior revenue. Every young founder needs this 🚀"
              </p>
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <span>🔥 2.3K shares</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
                  alt="Professional headshot"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Sarah Martinez, 26</p>
                  <p className="text-gray-600 text-sm">SaaS Founder</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-sm">
                "Plot twist: Seniors have ALL the money 💰 Went from $0 to $1.8M ARR targeting 55+ market. Mind = blown 🤯"
              </p>
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <span>🚀 1.8K shares</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-3">Join 12,000+ entrepreneurs sharing their success stories</p>
            <div className="flex justify-center space-x-4 text-xs">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">#SeniorMarket</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">#YoungEntrepreneur</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">#30TrillionMarket</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
