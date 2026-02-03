import { UserInput, Recommendation } from '../types';

export class RecommendationEngine {
  private static clampScore(value: number): number {
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  private static calculateScore(input: UserInput): {
    total: number;
    breakdown: Record<string, number>;
  } {
    const breakdown: Record<string, number> = {
      scale: 0,
      complexity: 0,
      team: 0,
      devops: 0,
      infrastructure: 0
    };

    // Scale factor (0-20)
    switch (input.projectDetails.expectedScale) {
      case 'enterprise':
        breakdown.scale = 20;
        break;
      case 'large':
        breakdown.scale = 15;
        break;
      case 'medium':
        breakdown.scale = 8;
        break;
      default:
        breakdown.scale = 2;
        break;
    }

    // Complexity factor (0-25)
    const patterns = input.systemComplexity.communicationPatterns?.length || 0;
    if (patterns >= 4) breakdown.complexity += 10;
    else if (patterns >= 2) breakdown.complexity += 6;
    else if (patterns === 1) breakdown.complexity += 3;

    if (input.systemComplexity.expectedLatency === 'low') breakdown.complexity += 6;
    if (input.systemComplexity.availabilityTarget === '99.99') breakdown.complexity += 5;
    if (input.systemComplexity.availabilityTarget === '99.999') breakdown.complexity += 7;

    const deployPattern = input.systemComplexity.deploymentPattern;
    if (deployPattern === 'blue-green' || deployPattern === 'canary') breakdown.complexity += 4;
    if (deployPattern === 'active-active') breakdown.complexity += 5;

    breakdown.complexity = Math.min(breakdown.complexity, 25);

    // Team readiness factor (0-20)
    const teamSize = input.teamMetrics.size;
    if (teamSize >= 21) breakdown.team += 10;
    else if (teamSize >= 11) breakdown.team += 8;
    else if (teamSize >= 6) breakdown.team += 6;
    else if (teamSize >= 3) breakdown.team += 4;
    else breakdown.team += 2;

    switch (input.teamMetrics.experienceLevel) {
      case 'senior':
        breakdown.team += 10;
        break;
      case 'mixed':
        breakdown.team += 7;
        break;
      case 'mid':
        breakdown.team += 5;
        break;
      default:
        breakdown.team += 2;
        break;
    }

    // DevOps maturity factor (0-15)
    switch (input.teamMetrics.cicdMaturity) {
      case 'advanced':
        breakdown.devops += 9;
        break;
      case 'intermediate':
        breakdown.devops += 6;
        break;
      case 'basic':
        breakdown.devops += 3;
        break;
      default:
        breakdown.devops += 0;
        break;
    }

    switch (input.teamMetrics.deploymentFrequency) {
      case 'daily':
        breakdown.devops += 6;
        break;
      case 'weekly':
        breakdown.devops += 4;
        break;
      case 'monthly':
        breakdown.devops += 2;
        break;
      default:
        breakdown.devops += 0;
        break;
    }

    // Infrastructure readiness factor (0-20)
    const infra = input.infrastructure;
    const infraSignals = [
      infra.cloudProvider?.length || 0,
      infra.cicd?.length || 0,
      infra.databases?.length || 0,
      infra.messaging?.length || 0,
      infra.monitoring?.length || 0,
      infra.caching?.length || 0
    ].reduce((sum, value) => sum + Math.min(value, 2), 0);
    breakdown.infrastructure = Math.min(20, infraSignals * 2);

    const total = this.clampScore(
      breakdown.scale +
        breakdown.complexity +
        breakdown.team +
        breakdown.devops +
        breakdown.infrastructure
    );

    return { total, breakdown };
  }

  public static generateRecommendation(input: UserInput): Recommendation {
    const { total: score, breakdown } = this.calculateScore(input);

    let architecture: 'monolith' | 'modular-monolith' | 'microservices';
    let confidence: number;

    if (score <= 35) {
      architecture = 'monolith';
    } else if (score <= 65) {
      architecture = 'modular-monolith';
    } else {
      architecture = 'microservices';
    }

    const distance = architecture === 'monolith'
      ? 35 - score
      : architecture === 'modular-monolith'
      ? Math.min(score - 35, 65 - score)
      : score - 65;
    confidence = Math.min(95, Math.max(70, 70 + Math.round(distance * 1.2)));

    return {
      architecture,
      score,
      confidence,
      reasoning: this.generateReasoning(input, architecture, score, breakdown),
      pros: this.generatePros(architecture, input),
      cons: this.generateCons(architecture, input),
      risks: this.generateRisks(architecture, input),
      recommendations: this.generateRecommendations(architecture, input),
      toolSuggestions: this.generateToolSuggestions(architecture, input)
    };
  }

  private static generateReasoning(
    input: UserInput,
    architecture: string,
    score: number,
    breakdown: Record<string, number>
  ): string[] {
    const reasoning = [];

    if (architecture === 'monolith') {
      reasoning.push(`Current scale (${input.projectDetails.expectedScale || 'small'}) and complexity suggest a simpler foundation first`);
      reasoning.push(`Team size (${input.teamMetrics.size || 'small'}) and experience level favor faster iteration in a single codebase`);
      reasoning.push(`Operational readiness score (${breakdown.devops}/15) is better suited to centralized deployments`);
    } else if (architecture === 'modular-monolith') {
      reasoning.push(`Balanced score (${score}/100) indicates moderate complexity without full distributed needs`);
      reasoning.push(`You can gain separation of concerns while avoiding microservices overhead`);
      reasoning.push(`Keeps a low-risk migration path if scale or complexity increases`);
    } else {
      reasoning.push(`Higher scale and complexity indicators justify distributed services`);
      reasoning.push(`Team size (${input.teamMetrics.size || 'large'}) supports parallel service ownership`);
      reasoning.push(`DevOps readiness (${breakdown.devops}/15) supports independent deployments`);
    }

    return reasoning;
  }

  private static generatePros(architecture: string, input: UserInput): string[] {
    const commonPros = {
      'monolith': [
        'Simpler to develop, test, and deploy initially',
        'Easy to understand and maintain',
        'Better performance with fewer network calls',
        'Easier debugging and monitoring',
        'Lower operational overhead'
      ],
      'modular-monolith': [
        'Better separation of concerns than traditional monolith',
        'Easier to scale development teams',
        'Flexible deployment options',
        'Good foundation for future microservices migration',
        'Reduced network complexity'
      ],
      'microservices': [
        'Independent development and deployment',
        'Technology diversity for different services',
        'Better fault isolation',
        'Easier to scale individual components',
        'Supports large development teams'
      ]
    };

    return commonPros[architecture] || [];
  }

  private static generateCons(architecture: string, input: UserInput): string[] {
    const commonCons = {
      'monolith': [
        'Can become difficult to maintain as it grows',
        'Entire application needs to be deployed for any change',
        'Technology lock-in',
        'Scaling limitations',
        'Potential for tight coupling'
      ],
      'modular-monolith': [
        'Requires discipline to maintain module boundaries',
        'Can still face some scalability challenges',
        'Risk of creating a distributed monolith',
        'More complex than traditional monolith'
      ],
      'microservices': [
        'Increased operational complexity',
        'Network latency and reliability concerns',
        'Distributed system challenges',
        'Requires advanced DevOps practices',
        'Potential for service sprawl'
      ]
    };

    return commonCons[architecture] || [];
  }

  private static generateRisks(architecture: string, input: UserInput): string[] {
    const risks = [];

    if (architecture === 'microservices' && input.teamMetrics.experienceLevel === 'junior') {
      risks.push('Junior team may struggle with distributed systems complexity');
    }

    if (architecture === 'microservices' && input.teamMetrics.cicdMaturity === 'none') {
      risks.push('Lack of CI/CD will make microservices management very difficult');
    }

    if (architecture === 'microservices' && input.teamMetrics.deploymentFrequency === 'quarterly') {
      risks.push('Low deployment frequency could slow service evolution and coordination');
    }

    if (architecture === 'monolith' && input.projectDetails.expectedScale === 'enterprise') {
      risks.push('May face scalability issues with enterprise-level traffic');
    }

    if (architecture === 'monolith' && (input.systemComplexity.communicationPatterns?.length || 0) >= 4) {
      risks.push('High integration complexity may cause a monolith to become tightly coupled');
    }

    return risks;
  }

  private static generateRecommendations(architecture: string, input: UserInput): string[] {
    const recommendations = [];

    if (architecture === 'monolith') {
      recommendations.push('Start with a well-structured monolith using clean architecture principles');
      recommendations.push('Implement proper module boundaries to enable future migration');
      recommendations.push('Focus on automated testing and deployment pipelines');
    } else if (architecture === 'modular-monolith') {
      recommendations.push('Define clear module boundaries based on business capabilities');
      recommendations.push('Implement inter-module communication patterns');
      recommendations.push('Consider using event-driven architecture within modules');
    } else {
      recommendations.push('Start with a few well-defined services, not many');
      recommendations.push('Implement comprehensive monitoring and logging');
      recommendations.push('Establish service contracts and API versioning strategies');
    }

    return recommendations;
  }

  private static generateToolSuggestions(architecture: string, input: UserInput): string[] {
    const suggestions = [];

    if (architecture === 'microservices') {
      suggestions.push('API Gateway: Kong, AWS API Gateway, or Nginx');
      suggestions.push('Service Discovery: Consul, Eureka, or Kubernetes');
      suggestions.push('Container Orchestration: Kubernetes or Docker Swarm');
      suggestions.push('Monitoring: Prometheus + Grafana, Jaeger for tracing');
    }

    if (input.infrastructure.monitoring?.includes('Prometheus')) {
      suggestions.push('Grafana for visualization with Prometheus');
    }

    if (input.infrastructure.cloudProvider?.includes('AWS')) {
      suggestions.push('AWS ECS or EKS for container orchestration');
    }

    return suggestions;
  }
}
