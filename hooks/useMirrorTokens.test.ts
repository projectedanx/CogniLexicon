import { renderHook, act } from '@testing-library/react';
import { useMirrorTokens } from './useMirrorTokens';
import { MirrorToken } from '../types';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useMirrorTokens', () => {
    // Reset localStorage before each test
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should initialize with an empty array if localStorage is empty', () => {
        const { result } = renderHook(() => useMirrorTokens());
        expect(result.current.tokens).toEqual([]);
    });

    it('should load tokens from localStorage on initialization', () => {
        const mockTokens: MirrorToken[] = [{ name: 'Test Token', timestamp: '12345' }];
        window.localStorage.setItem('cogniLexiconMirrorTokens', JSON.stringify(mockTokens));

        const { result } = renderHook(() => useMirrorTokens());
        expect(result.current.tokens).toEqual(mockTokens);
    });

    it('should add a new token', () => {
        const { result } = renderHook(() => useMirrorTokens());
        const newToken: MirrorToken = { name: 'New Token', timestamp: '67890' };

        act(() => {
            result.current.addToken(newToken);
        });

        expect(result.current.tokens).toEqual([newToken]);
        expect(JSON.parse(window.localStorage.getItem('cogniLexiconMirrorTokens') || '[]')).toEqual([newToken]);
    });

    it('should not add a duplicate token (case-insensitive)', () => {
        const { result } = renderHook(() => useMirrorTokens());
        const token1: MirrorToken = { name: 'Duplicate', timestamp: '1' };
        const token2: MirrorToken = { name: 'duplicate', timestamp: '2' };

        act(() => {
            result.current.addToken(token1);
        });
        act(() => {
            result.current.addToken(token2);
        });

        expect(result.current.tokens).toEqual([token1]);
    });

    it('should remove a token', () => {
        const { result } = renderHook(() => useMirrorTokens());
        const token1: MirrorToken = { name: 'Token 1', timestamp: '1' };
        const token2: MirrorToken = { name: 'Token 2', timestamp: '2' };

        act(() => {
            result.current.addToken(token1);
        });
        act(() => {
            result.current.addToken(token2);
        });

        act(() => {
            result.current.removeToken('Token 1');
        });

        expect(result.current.tokens).toEqual([token2]);
        expect(JSON.parse(window.localStorage.getItem('cogniLexiconMirrorTokens') || '[]')).toEqual([token2]);
    });
});
