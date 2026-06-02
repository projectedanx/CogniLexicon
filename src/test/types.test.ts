import { describe, it, expect } from 'vitest';
import { SemanticProfileData } from '../../types';

describe('SemanticProfileData Type', () => {
    it('should support orthogonalIsomorphisms for high-surprisal mappings', () => {
        const data: SemanticProfileData = {
            definition: "test",
            etymology: "test",
            domains: [],
            synonyms: [],
            antonyms: [],
            conceptualNeighbors: [],
            exampleSentences: [],
            orthogonalIsomorphisms: [
                { domain: "Biology", mapping: "Cell wall functions like a firewall", AT_Score: 0.95 }
            ]
        };

        expect(data.orthogonalIsomorphisms).toBeDefined();
        expect(data.orthogonalIsomorphisms?.[0].domain).toBe("Biology");
    });
});
