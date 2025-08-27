import React from 'react';
import { StepProps } from '../../types';
import { StepCard } from '../StepCard';

export const TeamMetricsStep: React.FC<StepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  isValid
}) => {
  const handleInputChange = (field: string, value: any) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <StepCard
      title="Team Metrics"
      description="Tell us about your development team and processes"
      onNext={onNext}
      onPrevious={onPrevious}
      canGoNext={isValid}
      canGoPrevious={true}
      isLastStep={true}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Size
          </label>
          <select
            value={data.size || ''}
            onChange={(e) => handleInputChange('size', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select team size</option>
            <option value="1">1-2 developers</option>
            <option value="3">3-5 developers</option>
            <option value="6">6-10 developers</option>
            <option value="11">11-20 developers</option>
            <option value="21">20+ developers</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Experience Level
          </label>
          <select
            value={data.experienceLevel || ''}
            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select experience level</option>
            <option value="junior">Junior (&lt; 2 years)</option>
            <option value="mid">Mid-level (2-5 years)</option>
            <option value="senior">Senior (5+ years)</option>
            <option value="mixed">Mixed experience</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deployment Frequency
          </label>
          <select
            value={data.deploymentFrequency || ''}
            onChange={(e) => handleInputChange('deploymentFrequency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select deployment frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CI/CD Maturity
          </label>
          <select
            value={data.cicdMaturity || ''}
            onChange={(e) => handleInputChange('cicdMaturity', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select CI/CD maturity</option>
            <option value="none">No CI/CD</option>
            <option value="basic">Basic CI/CD</option>
            <option value="intermediate">Intermediate CI/CD</option>
            <option value="advanced">Advanced CI/CD</option>
          </select>
        </div>

        <div className="bg-purple-50 rounded-xl p-4">
          <h4 className="font-medium text-purple-900 mb-2">Team Considerations</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Larger teams may benefit from microservices for parallel development</li>
            <li>• Junior teams might find monoliths easier to understand and maintain</li>
            <li>• Frequent deployments work well with mature CI/CD pipelines</li>
            <li>• Consider the operational overhead of managing multiple services</li>
          </ul>
        </div>
      </div>
    </StepCard>
  );
};