import React, { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { SemanticProfile } from './components/SemanticProfile';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { getSemanticData } from './services/geminiService';
import { SemanticProfileData, GraphData, ViewType } from './types';
import { ListIcon } from './components/icons/ListIcon';
import { GraphIcon } from './components/icons/GraphIcon';
import { MirrorTokenManager } from './components/MirrorTokenManager';
import { useMirrorTokens } from './hooks/useMirrorTokens';

/**
 * The main application component for CogniLexicon.
 * It manages the application's state, including the search query, semantic data,
 * loading status, errors, and the active view (profile or graph).
 * It orchestrates data fetching and renders the appropriate UI components.
 *
 * @returns {React.FC} The root component of the application.
 */
const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [semanticProfile, setSemanticProfile] = useState<SemanticProfileData | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('profile');
  
  const { tokens, addToken, removeToken } = useMirrorTokens();

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setSemanticProfile(null);
    setGraphData(null);

    try {
      const result = await getSemanticData(searchQuery);
      setQuery(searchQuery); // Set query only on successful search
      setSemanticProfile(result.profile);
      setGraphData(result.graph);
      setActiveView('profile'); // Default to profile view on new search
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleLoadToken = useCallback((concept: string) => {
    handleSearch(concept);
  }, [handleSearch]);

  const WelcomeScreen = () => (
    <div className="text-center p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          CogniLexicon
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          The Semantic Expansion Engine. Enter a word or concept to generate a multi-faceted semantic profile and visualize its connections.
        </p>
      </div>
      <MirrorTokenManager
        tokens={tokens}
        onAddToken={addToken}
        onRemoveToken={removeToken}
        onLoadToken={handleLoadToken}
      />
    </div>
  );

  const ViewSwitcher = () => (
    <div className="flex justify-center space-x-2 my-6">
      <button
        onClick={() => setActiveView('profile')}
        className={`px-4 py-2 rounded-md flex items-center transition-colors duration-200 ${
          activeView === 'profile'
            ? 'bg-indigo-600 text-white shadow-lg'
            : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        <ListIcon className="h-5 w-5 mr-2" />
        Profile
      </button>
      <button
        onClick={() => setActiveView('graph')}
        className={`px-4 py-2 rounded-md flex items-center transition-colors duration-200 ${
          activeView === 'graph'
            ? 'bg-indigo-600 text-white shadow-lg'
            : 'bg-gray-700 hover:bg-gray-600'
        }`}
        disabled={!graphData}
        aria-disabled={!graphData}
      >
        <GraphIcon className="h-5 w-5 mr-2" />
        Graph
      </button>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6">
      <header className="w-full max-w-4xl mx-auto text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-200 tracking-tight">CogniLexicon</h1>
          <p className="text-gray-400">Semantic Memory Substrate & Linguistic Cartographer</p>
      </header>

      <main className="w-full max-w-4xl mx-auto flex-grow">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        
        {!isLoading && !error && !semanticProfile && <WelcomeScreen />}

        {semanticProfile && (
            <>
            <ViewSwitcher />
            <div className="mt-4">
                {activeView === 'profile' && <SemanticProfile data={semanticProfile} word={query} />}
                {activeView === 'graph' && graphData && <KnowledgeGraph data={graphData} />}
            </div>
            </>
        )}
      </main>
      
      <footer className="w-full max-w-4xl mx-auto text-center text-gray-500 text-sm py-4 mt-8">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
