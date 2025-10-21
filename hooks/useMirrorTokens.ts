import { useState, useEffect, useCallback } from 'react';
import { MirrorToken } from '../types';

const STORAGE_KEY = 'cogniLexiconMirrorTokens';

/**
 * A custom React hook for managing "Mirror Tokens" in local storage.
 * Mirror Tokens are saved search queries or concepts.
 * This hook provides functionalities to add, remove, and retrieve these tokens.
 *
 * @returns An object containing the current list of tokens and functions to modify them.
 * @property {MirrorToken[]} tokens - The current array of saved mirror tokens.
 * @property {(token: MirrorToken) => void} addToken - Function to add a new token. It prevents duplicates (case-insensitive).
 * @property {(tokenName: string) => void} removeToken - Function to remove a token by its name.
 */
export const useMirrorTokens = () => {
    const [tokens, setTokens] = useState<MirrorToken[]>([]);

    useEffect(() => {
        try {
            const storedTokens = window.localStorage.getItem(STORAGE_KEY);
            if (storedTokens) {
                setTokens(JSON.parse(storedTokens));
            }
        } catch (error) {
            console.error("Error loading mirror tokens from localStorage", error);
            setTokens([]);
        }
    }, []);

    const saveTokens = useCallback((newTokens: MirrorToken[]) => {
        try {
            setTokens(newTokens);
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newTokens));
        } catch (error) {
            console.error("Error saving mirror tokens to localStorage", error);
        }
    }, []);

    const addToken = useCallback((token: MirrorToken) => {
        let isDuplicate = false;
        try {
            const currentTokens = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
            isDuplicate = currentTokens.some((t: MirrorToken) => t.name.toLowerCase() === token.name.toLowerCase());
        } catch (e) {
            // ignore parsing errors and proceed
        }

        if (isDuplicate) {
            alert(`A mirror token named "${token.name}" already exists.`);
            return;
        }
        const newTokens = [...tokens, token];
        saveTokens(newTokens);
    }, [tokens, saveTokens]);

    const removeToken = useCallback((tokenName: string) => {
        const newTokens = tokens.filter(token => token.name !== tokenName);
        saveTokens(newTokens);
    }, [tokens, saveTokens]);

    return { tokens, addToken, removeToken };
};
