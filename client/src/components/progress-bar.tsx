import { Users } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="text-primary text-xl" />
            <span className="text-lg font-semibold text-gray-800">Senior Marketing Mastery</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps - 1 }, (_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      i + 1 <= currentStep
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < totalSteps - 2 && (
                    <div className="w-8 h-1 bg-gray-200 rounded"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
