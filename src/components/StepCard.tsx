import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastStep?: boolean;
}

export const StepCard: React.FC<StepCardProps> = ({
  title,
  description,
  children,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastStep = false
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="mb-8">
        {children}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            canGoPrevious
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Previous
        </button>
        
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            canGoNext
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLastStep ? 'Generate Recommendation' : 'Next'}
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};