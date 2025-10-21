
import React from 'react';
import { SemanticProfileData } from '../types';

interface SemanticProfileProps {
  data: SemanticProfileData;
  word: string;
}

/**
 * A reusable component to create a styled section with a title.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the section.
 * @param {React.ReactNode} props.children - The content of the section.
 * @returns {React.FC} A section component.
 */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-indigo-400 mb-2 border-b-2 border-indigo-500/30 pb-1">{title}</h3>
    {children}
  </div>
);

/**
 * A component that displays a list of items in a section.
 * Returns null if the items array is empty.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the list section.
 * @param {string[]} props.items - The array of strings to display.
 * @returns {React.FC | null} A list section component or null.
 */
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

/**
 * Renders the semantic profile of a word, including its definition, etymology, and related concepts.
 * The component is structured into sections for clarity.
 *
 * @param {SemanticProfileProps} props - The props for the component.
 * @param {SemanticProfileData} props.data - The semantic profile data to display.
 * @param {string} props.word - The word or concept being displayed.
 * @returns {React.FC<SemanticProfileProps>} The semantic profile component.
 */
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
