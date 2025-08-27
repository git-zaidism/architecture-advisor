export interface TechStack {
  language: string;
  framework: string;
  version: string;
}

export interface Infrastructure {
  cloudProvider: string[];
  cicd: string[];
  databases: string[];
  messaging: string[];
  monitoring: string[];
  caching: string[];
}

export interface SystemComplexity {
  communicationPatterns: string[];
  cachingMechanisms: string[];
  monitoringTools: string[];
  deploymentPattern: string;
  expectedLatency: string;
  availabilityTarget: string;
}

export interface TeamMetrics {
  size: number;
  experienceLevel: string;
  deploymentFrequency: string;
  cicdMaturity: string;
}

export interface ProjectDetails {
  name: string;
  description: string;
  goals: string[];
  consumers: string[];
  producers: string[];
  expectedScale: string;
}

export interface UserInput {
  projectDetails: ProjectDetails;
  techStack: TechStack;
  infrastructure: Infrastructure;
  systemComplexity: SystemComplexity;
  teamMetrics: TeamMetrics;
}

export interface Recommendation {
  architecture: 'monolith' | 'modular-monolith' | 'microservices';
  score: number;
  confidence: number;
  reasoning: string[];
  pros: string[];
  cons: string[];
  risks: string[];
  recommendations: string[];
  toolSuggestions: string[];
}

export interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isValid: boolean;
}