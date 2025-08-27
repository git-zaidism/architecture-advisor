import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepTitles
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? (
                  <Check size={16} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="text-xs mt-2 text-gray-600 text-center max-w-20">
                {title}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-16 mx-2 transition-all duration-300 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};