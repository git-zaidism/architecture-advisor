import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { ProjectDetailsStep } from './components/steps/ProjectDetailsStep';
import { TechStackStep } from './components/steps/TechStackStep';
import { InfrastructureStep } from './components/steps/InfrastructureStep';
import { ComplexityStep } from './components/steps/ComplexityStep';
import { TeamMetricsStep } from './components/steps/TeamMetricsStep';
import { RecommendationResults } from './components/RecommendationResults';
import { UserInput, Recommendation } from './types';
import { RecommendationEngine } from './utils/recommendationEngine';
import { fetchRecommendation } from './services/api';


function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState<UserInput>({
    projectDetails: {
      name: '',
      description: '',
      goals: [],
      consumers: [],
      producers: [],
      expectedScale: ''
    },
    techStack: {
      language: '',
      framework: '',
      version: ''
    },
    infrastructure: {
      cloudProvider: [],
      cicd: [],
      databases: [],
      messaging: [],
      monitoring: [],
      caching: []
    },
    systemComplexity: {
      communicationPatterns: [],
      cachingMechanisms: [],
      monitoringTools: [],
      deploymentPattern: '',
      expectedLatency: '',
      availabilityTarget: ''
    },
    teamMetrics: {
      size: 0,
      experienceLevel: '',
      deploymentFrequency: '',
      cicdMaturity: ''
    }
  });
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const stepTitles = ['Project', 'Tech Stack', 'Infrastructure', 'Complexity', 'Team'];

  const updateStepData = (stepIndex: number, data: any) => {
    const stepKeys = ['projectDetails', 'techStack', 'infrastructure', 'systemComplexity', 'teamMetrics'];
    const stepKey = stepKeys[stepIndex];
    
    setUserInput(prev => ({
      ...prev,
      [stepKey]: data
    }));
  };

  const validateStep = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return !!(userInput.projectDetails.name && userInput.projectDetails.description);
      case 1:
        return !!(userInput.techStack.language && userInput.techStack.framework);
      case 2:
        return userInput.infrastructure.cloudProvider.length > 0;
      case 3:
        return !!(userInput.systemComplexity.deploymentPattern && userInput.systemComplexity.expectedLatency);
      case 4:
        return !!(userInput.teamMetrics.size && userInput.teamMetrics.experienceLevel);
      default:
        return true;
    }
  };

 const handleNext = async () => {
   if (currentStep < stepTitles.length - 1) {
     setCurrentStep(currentStep + 1);
   } else {
     // Generate recommendation via API
     let result = '';
     try {
       result = await fetchRecommendation(userInput);
       setRecommendation(result);
     } catch (error) {
        result = RecommendationEngine.generateRecommendation(userInput);
        setRecommendation(result);
        console.error(error);
     }
   }
 };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setRecommendation(null);
    setUserInput({
      projectDetails: {
        name: '',
        description: '',
        goals: [],
        consumers: [],
        producers: [],
        expectedScale: ''
      },
      techStack: {
        language: '',
        framework: '',
        version: ''
      },
      infrastructure: {
        cloudProvider: [],
        cicd: [],
        databases: [],
        messaging: [],
        monitoring: [],
        caching: []
      },
      systemComplexity: {
        communicationPatterns: [],
        cachingMechanisms: [],
        monitoringTools: [],
        deploymentPattern: '',
        expectedLatency: '',
        availabilityTarget: ''
      },
      teamMetrics: {
        size: 0,
        experienceLevel: '',
        deploymentFrequency: '',
        cicdMaturity: ''
      }
    });
  };

  const handleExport = () => {
    if (!recommendation) return;
    
    const reportContent = `
# Architecture Decision Report

## Recommendation: ${recommendation.architecture.toUpperCase()}

**Confidence:** ${recommendation.confidence}%
**Score:** ${recommendation.score}/100

## Reasoning
${recommendation.reasoning.map(r => `- ${r}`).join('\n')}

## Benefits
${recommendation.pros.map(p => `- ${p}`).join('\n')}

## Considerations
${recommendation.cons.map(c => `- ${c}`).join('\n')}

## Risks
${recommendation.risks.map(r => `- ${r}`).join('\n')}

## Recommendations
${recommendation.recommendations.map(r => `- ${r}`).join('\n')}

## Tool Suggestions
${recommendation.toolSuggestions.map(t => `- ${t}`).join('\n')}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture-recommendation.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderStep = () => {
    const stepData = [
      userInput.projectDetails,
      userInput.techStack,
      userInput.infrastructure,
      userInput.systemComplexity,
      userInput.teamMetrics
    ];

    const stepProps = {
      data: stepData[currentStep],
      onUpdate: (data: any) => updateStepData(currentStep, data),
      onNext: handleNext,
      onPrevious: handlePrevious,
      isValid: validateStep(currentStep)
    };

    switch (currentStep) {
      case 0:
        return <ProjectDetailsStep {...stepProps} />;
      case 1:
        return <TechStackStep {...stepProps} />;
      case 2:
        return <InfrastructureStep {...stepProps} />;
      case 3:
        return <ComplexityStep {...stepProps} />;
      case 4:
        return <TeamMetricsStep {...stepProps} />;
      default:
        return null;
    }
  };

  if (recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <main className="py-8">
          <RecommendationResults
            recommendation={recommendation}
            onStartOver={handleStartOver}
            onExport={handleExport}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Architecture Decision Wizard
            </h2>
            <p className="text-gray-600">
              Answer a few questions to get a personalized architecture recommendation
            </p>
          </div>

          <ProgressBar
            currentStep={currentStep}
            totalSteps={stepTitles.length}
            stepTitles={stepTitles}
          />

          {renderStep()}
        </div>
      </main>
    </div>
  );
}

export default App;