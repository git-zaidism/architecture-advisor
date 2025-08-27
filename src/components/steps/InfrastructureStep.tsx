import React from 'react';
import { StepProps } from '../../types';
import { StepCard } from '../StepCard';

export const InfrastructureStep: React.FC<StepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  isValid
}) => {
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

  const cloudProviders = ['AWS', 'Azure', 'Google Cloud', 'Digital Ocean', 'Heroku', 'Vercel'];
  const cicdTools = ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Azure DevOps', 'CircleCI', 'Travis CI'];
  const databases = ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB', 'Elasticsearch'];
  const messaging = ['Apache Kafka', 'RabbitMQ', 'Redis Pub/Sub', 'AWS SQS', 'Azure Service Bus'];
  const monitoring = ['Prometheus', 'Grafana', 'New Relic', 'Datadog', 'ELK Stack', 'Splunk'];
  const caching = ['Redis', 'Memcached', 'Amazon ElastiCache', 'CDN', 'In-memory'];

  const renderMultiSelect = (title: string, field: string, options: string[]) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">{title}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(data[field] || []).includes(option)}
              onChange={() => handleMultiSelectChange(field, option)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <StepCard
      title="Infrastructure & Tools"
      description="Select your infrastructure components and tools"
      onNext={onNext}
      onPrevious={onPrevious}
      canGoNext={isValid}
      canGoPrevious={true}
    >
      <div className="space-y-8">
        {renderMultiSelect('Cloud Providers', 'cloudProvider', cloudProviders)}
        {renderMultiSelect('CI/CD Tools', 'cicd', cicdTools)}
        {renderMultiSelect('Databases', 'databases', databases)}
        {renderMultiSelect('Messaging Systems', 'messaging', messaging)}
        {renderMultiSelect('Monitoring Tools', 'monitoring', monitoring)}
        {renderMultiSelect('Caching Solutions', 'caching', caching)}
      </div>
    </StepCard>
  );
};