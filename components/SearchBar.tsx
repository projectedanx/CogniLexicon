
import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  onSearch: (query: string, targetLanguage?: string) => void;
  isLoading: boolean;
}

/**
 * A search bar component that allows users to input a query.
 * It includes an input field and a submit button with a search icon.
 * The component handles its own internal state for the query text.
 *
 * @param {SearchBarProps} props The props for the component.
 * @param {function(string): void} props.onSearch - The callback function to execute when a search is submitted.
 * @param {boolean} props.isLoading - A flag to disable the search bar during loading.
 * @returns {React.FC<SearchBarProps>} The search bar component.
 */
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query, targetLanguage.trim() !== '' ? targetLanguage : undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex flex-col space-y-3">
      <div className="relative flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a word or concept..."
          className="flex-grow pl-5 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
          disabled={isLoading}
        />
        <input
          type="text"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          placeholder="Target Language (Optional)"
          className="w-1/3 px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 rounded-r-full hover:text-indigo-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};
