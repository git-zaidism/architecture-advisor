import React from 'react';
import { StepProps } from '../../types';
import { StepCard } from '../StepCard';

export const ComplexityStep: React.FC<StepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  isValid
}) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  const handleMultiSelectChange = (field: string, value: string) => {
    const current = data[field] || [];
    const updated = current.includes(value)
      ? current.filter((item: string) => item !== value)
      : [...current, value];
    
    onUpdate({
      ...data,
      [field]: updated
    });
  };

  const communicationPatterns = ['REST APIs', 'GraphQL', 'gRPC', 'Pub/Sub', 'WebSockets', 'Event Sourcing'];

  return (
    <StepCard
      title="System Complexity"
      description="Define the complexity and architectural requirements"
      onNext={onNext}
      onPrevious={onPrevious}
      canGoNext={isValid}
      canGoPrevious={true}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Communication Patterns
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {communicationPatterns.map((pattern) => (
              <label key={pattern} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(data.communicationPatterns || []).includes(pattern)}
                  onChange={() => handleMultiSelectChange('communicationPatterns', pattern)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{pattern}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deployment Pattern
            </label>
            <select
              value={data.deploymentPattern || ''}
              onChange={(e) => handleInputChange('deploymentPattern', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select deployment pattern</option>
              <option value="active-active">Active-Active</option>
              <option value="active-passive">Active-Passive</option>
              <option value="blue-green">Blue-Green</option>
              <option value="canary">Canary</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Latency
            </label>
            <select
              value={data.expectedLatency || ''}
              onChange={(e) => handleInputChange('expectedLatency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select expected latency</option>
              <option value="low">Low (&lt; 100ms)</option>
              <option value="medium">Medium (100ms - 1s)</option>
              <option value="high">High (&gt; 1s acceptable)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability Target
          </label>
          <select
            value={data.availabilityTarget || ''}
            onChange={(e) => handleInputChange('availabilityTarget', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select availability target</option>
            <option value="99.9">99.9% (8.77 hours downtime/year)</option>
            <option value="99.95">99.95% (4.38 hours downtime/year)</option>
            <option value="99.99">99.99% (52.6 minutes downtime/year)</option>
            <option value="99.999">99.999% (5.26 minutes downtime/year)</option>
          </select>
        </div>
      </div>
    </StepCard>
  );
};