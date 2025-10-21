import React, { useState } from 'react';
import { MirrorToken } from '../types';
import { LoadIcon } from './icons/LoadIcon';
import { DeleteIcon } from './icons/DeleteIcon';

interface MirrorTokenManagerProps {
    tokens: MirrorToken[];
    onAddToken: (token: MirrorToken) => void;
    onRemoveToken: (tokenName: string) => void;
    onLoadToken: (concept: string) => void;
}

export const MirrorTokenManager: React.FC<MirrorTokenManagerProps> = ({ tokens, onAddToken, onRemoveToken, onLoadToken }) => {
    const [name, setName] = useState('');
    const [concept, setConcept] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && concept.trim()) {
            onAddToken({ name, concept });
            setName('');
            setConcept('');
        }
    };

    return (
        <div className="mt-12 w-full max-w-3xl mx-auto bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700/50 animate-fade-in">
            <h2 className="text-2xl font-bold text-indigo-400 mb-4 text-left">Mirror Token Lexicon</h2>
            
            <form onSubmit={handleSubmit} className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Token Name (e.g., 'Creative Spark')"
                    className="flex-grow w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Semantic Concept (e.g., 'a sudden brilliant idea')"
                    className="flex-grow w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
                >
                    Save
                </button>
            </form>

            <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-300 mb-3 border-b border-gray-700 pb-2">Saved Tokens</h3>
                {tokens.length === 0 ? (
                    <p className="text-gray-500 italic">No mirror tokens saved yet. Add one above to get started!</p>
                ) : (
                    <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {tokens.map(token => (
                            <li key={token.name} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-md hover:bg-gray-700 transition-colors">
                                <div>
                                    <p className="font-bold text-indigo-300">{token.name}</p>
                                    <p className="text-sm text-gray-400 italic">"{token.concept}"</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => onLoadToken(token.concept)} 
                                        title="Load semantic profile for this concept"
                                        className="p-2 text-gray-400 hover:text-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                                        aria-label={`Load ${token.name}`}
                                    >
                                        <LoadIcon className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => onRemoveToken(token.name)} 
                                        title="Delete this token"
                                        className="p-2 text-gray-400 hover:text-red-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                                        aria-label={`Delete ${token.name}`}
                                    >
                                        <DeleteIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
