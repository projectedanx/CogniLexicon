import re

with open('services/geminiService.test.ts', 'r') as f:
    content = f.read()

# Fix the first test
content = content.replace("""        const mockData = {
            profile: {
                definition: 'A test definition.',
                etymology: 'From a test.',
                domains: ['Testing'],
                synonyms: ['check', 'trial'],
                antonyms: ['certainty'],
                conceptualNeighbors: ['evaluation'],
                exampleSentences: ['This is a test.'],
            },""", """        const mockData = {
            profile: {
                definition: 'A test definition.',
                etymology: 'From a test.',
                domains: ['Testing'],
                synonyms: ['check', 'trial'],
                antonyms: ['certainty'],
                conceptualNeighbors: ['evaluation'],
                exampleSentences: ['This is a test.'],
                biasAnalysis: {
                    homophilyIndex: 0,
                    detectedBiases: [],
                    orthogonalConcepts: []
                }
            },""")

# Fix the fallback test
content = content.replace("""        const mockData = {
            profile: {
                definition: 'A test definition.',
                etymology: 'From a test.',
                domains: ['Testing'],
                synonyms: ['check', 'trial'],
                antonyms: ['certainty'],
                conceptualNeighbors: ['evaluation'],
                exampleSentences: ['This is a test.'],
            },
            graph: {""", """        const mockData = {
            profile: {
                definition: 'A test definition.',
                etymology: 'From a test.',
                domains: ['Testing'],
                synonyms: ['check', 'trial'],
                antonyms: ['certainty'],
                conceptualNeighbors: ['evaluation'],
                exampleSentences: ['This is a test.'],
                biasAnalysis: {
                    homophilyIndex: 0,
                    detectedBiases: [],
                    orthogonalConcepts: []
                }
            },
            graph: {""")

with open('services/geminiService.test.ts', 'w') as f:
    f.write(content)
