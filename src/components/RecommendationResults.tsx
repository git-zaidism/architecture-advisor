import React from 'react';
import { Recommendation } from '../types';
import { CheckCircle, AlertTriangle, Lightbulb, Download, ArrowLeft } from 'lucide-react';

interface RecommendationResultsProps {
  recommendation: Recommendation;
  onStartOver: () => void;
  onExport: () => void;
}

export const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  recommendation,
  onStartOver,
  onExport
}) => {
  const getArchitectureColor = (architecture: string) => {
    switch (architecture) {
      case 'monolith':
        return 'from-green-500 to-emerald-600';
      case 'modular-monolith':
        return 'from-blue-500 to-purple-600';
      case 'microservices':
        return 'from-purple-500 to-indigo-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getArchitectureTitle = (architecture: string) => {
    switch (architecture) {
      case 'monolith':
        return 'Monolithic Architecture';
      case 'modular-monolith':
        return 'Modular Monolith';
      case 'microservices':
        return 'Microservices Architecture';
      default:
        return 'Unknown Architecture';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className={`bg-gradient-to-r ${getArchitectureColor(recommendation.architecture)} p-8 text-white`}>
          <h1 className="text-3xl font-bold mb-2">Architecture Recommendation</h1>
          <p className="text-lg opacity-90">Based on your inputs, we recommend:</p>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getArchitectureColor(recommendation.architecture)} flex items-center justify-center text-white font-bold text-xl mr-4`}>
                {recommendation.architecture.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {getArchitectureTitle(recommendation.architecture)}
                </h2>
                <p className="text-gray-600">
                  Confidence: {recommendation.confidence}% | Score: {recommendation.score}/100
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onExport}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
              >
                <Download size={20} className="mr-2" />
                Export Report
              </button>
              <button
                onClick={onStartOver}
                className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                Start Over
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <Lightbulb className="mr-2" size={20} />
                  Why This Architecture?
                </h3>
                <ul className="space-y-2">
                  {recommendation.reasoning.map((reason, index) => (
                    <li key={index} className="text-blue-800 flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                  <CheckCircle className="mr-2" size={20} />
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {recommendation.pros.map((pro, index) => (
                    <li key={index} className="text-green-800 flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                  <AlertTriangle className="mr-2" size={20} />
                  Considerations
                </h3>
                <ul className="space-y-2">
                  {recommendation.cons.map((con, index) => (
                    <li key={index} className="text-orange-800 flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {recommendation.risks.length > 0 && (
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                    <AlertTriangle className="mr-2" size={20} />
                    Potential Risks
                  </h3>
                  <ul className="space-y-2">
                    {recommendation.risks.map((risk, index) => (
                      <li key={index} className="text-red-800 flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">
                  Implementation Recommendations
                </h3>
                <ul className="space-y-2">
                  {recommendation.recommendations.map((rec, index) => (
                    <li key={index} className="text-purple-800 flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {recommendation.toolSuggestions.length > 0 && (
                <div className="bg-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                    Recommended Tools
                  </h3>
                  <ul className="space-y-2">
                    {recommendation.toolSuggestions.map((tool, index) => (
                      <li key={index} className="text-indigo-800 flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};