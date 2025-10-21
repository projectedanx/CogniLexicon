
import React from 'react';
import { SemanticProfileData } from '../types';

interface SemanticProfileProps {
  data: SemanticProfileData;
  word: string;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-indigo-400 mb-2 border-b-2 border-indigo-500/30 pb-1">{title}</h3>
    {children}
  </div>
);

const ListSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <Section title={title}>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
            {item}
          </span>
        ))}
      </div>
    </Section>
  );
};

export const SemanticProfile: React.FC<SemanticProfileProps> = ({ data, word }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 animate-fade-in border border-gray-700/50">
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 capitalize">{word}</h2>
      
      <Section title="Definition">
        <p className="text-gray-300 leading-relaxed">{data.definition}</p>
      </Section>
      
      <Section title="Etymology">
        <p className="text-gray-300 italic">{data.etymology}</p>
      </Section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <ListSection title="Domains" items={data.domains} />
        <ListSection title="Conceptual Neighbors" items={data.conceptualNeighbors} />
        <ListSection title="Synonyms" items={data.synonyms} />
        <ListSection title="Antonyms" items={data.antonyms} />
      </div>
      
      <Section title="Example Sentences">
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {data.exampleSentences.map((sentence, index) => (
            <li key={index}>{sentence}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
};
