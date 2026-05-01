import React from 'react';
import { BiasAnalysisData } from '../types';

interface CognitiveBiasPanelProps {
  biasData: BiasAnalysisData;
}

export const CognitiveBiasPanel: React.FC<CognitiveBiasPanelProps> = ({ biasData }) => {
  const isHighRisk = biasData.homophilyIndex > 0.7;

  return (
    <div className={`mt-6 rounded-lg p-6 border ${isHighRisk ? 'bg-red-900/20 border-red-500/50' : 'bg-gray-800/50 border-gray-700/50'} animate-fade-in`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-orange-400 border-b-2 border-orange-500/30 pb-1">
          Anionic Veto: Bias Analysis
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${isHighRisk ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
          Homophily Index: {biasData.homophilyIndex.toFixed(2)}
        </div>
      </div>

      {biasData.detectedBiases && biasData.detectedBiases.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Detected Biases</h4>
          <ul className="space-y-2">
            {biasData.detectedBiases.map((bias, idx) => (
              <li key={idx} className="bg-gray-800 p-3 rounded text-sm border border-gray-600">
                <span className="font-bold text-red-400">[{bias.severity.toUpperCase()}] {bias.type}: </span>
                <span className="text-gray-300">{bias.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {biasData.orthogonalConcepts && biasData.orthogonalConcepts.length > 0 && (
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Orthogonal Vectors (Dialectical Synthesis)</h4>
          <div className="flex flex-wrap gap-2">
            {biasData.orthogonalConcepts.map((concept, idx) => (
              <span key={idx} className="bg-orange-900/50 text-orange-200 border border-orange-700/50 px-3 py-1 rounded-full text-sm">
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
