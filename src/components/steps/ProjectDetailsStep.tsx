import React from 'react';
import { StepProps } from '../../types';
import { StepCard } from '../StepCard';

export const ProjectDetailsStep: React.FC<StepProps> = ({
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

  const handleArrayChange = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    onUpdate({
      ...data,
      [field]: items
    });
  };

  return (
    <StepCard
      title="Project Details"
      description="Tell us about your project and its requirements"
      onNext={onNext}
      onPrevious={onPrevious}
      canGoNext={isValid}
      canGoPrevious={true}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your project name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Description
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Describe your project, its purpose, and key features"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Goals
          </label>
          <textarea
            value={data.goals ? data.goals.join(', ') : ''}
            onChange={(e) => handleArrayChange('goals', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="List your main goals (comma-separated)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumers (Who uses your system?)
            </label>
            <textarea
              value={data.consumers ? data.consumers.join(', ') : ''}
              onChange={(e) => handleArrayChange('consumers', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Web apps, mobile apps, third-party services..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Producers (What integrates with your system?)
            </label>
            <textarea
              value={data.producers ? data.producers.join(', ') : ''}
              onChange={(e) => handleArrayChange('producers', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="External APIs, databases, message queues..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Scale
          </label>
          <select
            value={data.expectedScale || ''}
            onChange={(e) => handleInputChange('expectedScale', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select expected scale</option>
            <option value="small">Small (&lt; 1K users)</option>
            <option value="medium">Medium (1K - 100K users)</option>
            <option value="large">Large (100K - 1M users)</option>
            <option value="enterprise">Enterprise (&gt; 1M users)</option>
          </select>
        </div>
      </div>
    </StepCard>
  );
};