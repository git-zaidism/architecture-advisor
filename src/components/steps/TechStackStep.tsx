import React from 'react';
import { StepProps } from '../../types';
import { StepCard } from '../StepCard';

export const TechStackStep: React.FC<StepProps> = ({
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

  const languages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin'
  ];

  const frameworks = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Spring Boot', 'Django', 'FastAPI', 
    'ASP.NET', 'Ruby on Rails', 'Laravel', 'Flutter', 'React Native'
  ];

  return (
    <StepCard
      title="Technology Stack"
      description="Select your preferred technologies and frameworks"
      onNext={onNext}
      onPrevious={onPrevious}
      canGoNext={isValid}
      canGoPrevious={true}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Language
          </label>
          <select
            value={data.language || ''}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Framework
          </label>
          <select
            value={data.framework || ''}
            onChange={(e) => handleInputChange('framework', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select framework</option>
            {frameworks.map((framework) => (
              <option key={framework} value={framework}>{framework}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Version
          </label>
          <input
            type="text"
            value={data.version || ''}
            onChange={(e) => handleInputChange('version', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., 18.x, 3.9, latest"
          />
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <h4 className="font-medium text-blue-900 mb-2">Technology Considerations</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Consider the ecosystem and community support</li>
            <li>• Evaluate learning curve for your team</li>
            <li>• Think about long-term maintenance and updates</li>
            <li>• Consider integration capabilities with other tools</li>
          </ul>
        </div>
      </div>
    </StepCard>
  );
};