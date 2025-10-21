import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getSemanticData } from './geminiService';

// Mock the @google/genai module
vi.mock('@google/genai', () => {
  const mockGenerateContent = vi.fn();
  return {
    GoogleGenAI: vi.fn(() => ({
      models: {
        generateContent: mockGenerateContent,
      },
    })),
    Type: {
        OBJECT: 'object',
        STRING: 'string',
        ARRAY: 'array',
        INTEGER: 'integer',
    }
  };
});

// We need to access the mock for manipulation in tests
const { GoogleGenAI } = await import('@google/genai');
const mockGenerateContent = (new GoogleGenAI() as any).models.generateContent;


describe('getSemanticData', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return semantic data on successful API call', async () => {
        const mockData = {
            profile: {
                definition: 'A test definition.',
                etymology: 'From a test.',
                domains: ['Testing'],
                synonyms: ['check', 'trial'],
                antonyms: ['certainty'],
                conceptualNeighbors: ['evaluation'],
                exampleSentences: ['This is a test.'],
            },
            graph: {
                nodes: [{ id: 'test', group: 1 }],
                links: [],
            },
        };

        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(mockData),
        });

        const result = await getSemanticData('test');
        expect(result).toEqual(mockData);
        expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    });

    it('should throw an error for incomplete data from API', async () => {
        const mockData = {
            profile: {
                // Missing definition
                etymology: 'From a test.',
            },
            graph: {
                nodes: [],
                links: [],
            },
        };

        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(mockData),
        });

        await expect(getSemanticData('test')).rejects.toThrow(
            "Incomplete data received from API. The definition for the concept could not be generated."
        );
    });

    it('should throw a network error message', async () => {
        mockGenerateContent.mockRejectedValue(new Error('fetch failed'));
        await expect(getSemanticData('test')).rejects.toThrow(
            "Network error. Please check your internet connection and try again."
        );
    });

    it('should throw a 429 rate limit error message', async () => {
        mockGenerateContent.mockRejectedValue(new Error('[429] Rate limit exceeded'));
        await expect(getSemanticData('test')).rejects.toThrow(
            "API rate limit exceeded. Please wait a moment before trying again."
        );
    });

    it('should throw a generic error for other issues', async () => {
        mockGenerateContent.mockRejectedValue(new Error('Some other error'));
        await expect(getSemanticData('test')).rejects.toThrow("An unexpected error occurred. Please try again.");
    });

    it('should create a fallback graph if none is provided', async () => {
        const mockData = {
            profile: {
                definition: 'A test definition.',
                etymology: 'From a test.',
                domains: ['Testing'],
                synonyms: ['check', 'trial'],
                antonyms: ['certainty'],
                conceptualNeighbors: ['evaluation'],
                exampleSentences: ['This is a test.'],
            },
            graph: {
                nodes: [],
                links: [],
            },
        };

        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify(mockData),
        });

        const result = await getSemanticData('test');
        expect(result.graph.nodes).toEqual([{ id: 'test', group: 1 }]);
    });
});
