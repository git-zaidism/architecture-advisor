import { UserInput, Recommendation } from '../types';

export class RecommendationEngine {
  private static calculateScore(input: UserInput): number {
    let score = 0;

    // Team size factor (0-20 points)
    const teamSize = input.teamMetrics.size;
    if (teamSize >= 21) score += 20;
    else if (teamSize >= 11) score += 15;
    else if (teamSize >= 6) score += 10;
    else if (teamSize >= 3) score += 5;

    // Experience level factor (0-15 points)
    const experience = input.teamMetrics.experienceLevel;
    if (experience === 'senior') score += 15;
    else if (experience === 'mixed') score += 10;
    else if (experience === 'mid') score += 5;

    // System complexity factor (0-25 points)
    const complexity = input.systemComplexity;
    if (complexity.communicationPatterns?.length > 2) score += 8;
    if (complexity.expectedLatency === 'low') score += 8;
    if (complexity.availabilityTarget === '99.99' || complexity.availabilityTarget === '99.999') score += 9;

    // Scale factor (0-15 points)
    const scale = input.projectDetails.expectedScale;
    if (scale === 'enterprise') score += 15;
    else if (scale === 'large') score += 10;
    else if (scale === 'medium') score += 5;

    // CI/CD maturity factor (0-15 points)
    const cicdMaturity = input.teamMetrics.cicdMaturity;
    if (cicdMaturity === 'advanced') score += 15;
    else if (cicdMaturity === 'intermediate') score += 10;
    else if (cicdMaturity === 'basic') score += 5;

    // Deployment frequency factor (0-10 points)
    const deploymentFreq = input.teamMetrics.deploymentFrequency;
    if (deploymentFreq === 'daily') score += 10;
    else if (deploymentFreq === 'weekly') score += 7;
    else if (deploymentFreq === 'monthly') score += 3;

    return Math.min(score, 100);
  }

  public static generateRecommendation(input: UserInput): Recommendation {
    const score = this.calculateScore(input);

    let architecture: 'monolith' | 'modular-monolith' | 'microservices';
    let confidence: number;

    if (score <= 30) {
      architecture = 'monolith';
      confidence = 85;
    } else if (score <= 60) {
      architecture = 'modular-monolith';
      confidence = 80;
    } else {
      architecture = 'microservices';
      confidence = 90;
    }

    return {
      architecture,
      score,
      confidence,
      reasoning: this.generateReasoning(input, architecture, score),
      pros: this.generatePros(architecture, input),
      cons: this.generateCons(architecture, input),
      risks: this.generateRisks(architecture, input),
      recommendations: this.generateRecommendations(architecture, input),
      toolSuggestions: this.generateToolSuggestions(architecture, input)
    };
  }

  private static generateReasoning(input: UserInput, architecture: string, score: number): string[] {
    const reasoning = [];

    if (architecture === 'monolith') {
      reasoning.push(`Your team size of ${input.teamMetrics.size} developers works well with a monolithic approach`);
      reasoning.push(`${input.teamMetrics.experienceLevel} experience level suggests starting with simpler architecture`);
      reasoning.push(`${input.projectDetails.expectedScale} scale doesn't require distributed architecture complexity`);
    } else if (architecture === 'modular-monolith') {
      reasoning.push(`Your project complexity requires better separation of concerns than a traditional monolith`);
      reasoning.push(`Team size allows for some parallel development within modules`);
      reasoning.push(`Provides a good migration path to microservices if needed`);
    } else {
      reasoning.push(`Large team size (${input.teamMetrics.size}+) can work effectively with distributed services`);
      reasoning.push(`High availability and performance requirements justify the complexity`);
      reasoning.push(`Advanced CI/CD maturity supports independent service deployments`);
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

    if (architecture === 'monolith' && input.projectDetails.expectedScale === 'enterprise') {
      risks.push('May face scalability issues with enterprise-level traffic');
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