import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SemanticProfile } from '../../components/SemanticProfile';
import { SemanticProfileData } from '../../types';

describe('SemanticProfile', () => {
    it('should render the Orthogonal Isomorphisms panel', () => {
        const mockData: SemanticProfileData = {
            definition: "Test def",
            etymology: "Test ety",
            domains: ["Domain A"],
            synonyms: [],
            antonyms: [],
            conceptualNeighbors: [],
            exampleSentences: [],
            orthogonalIsomorphisms: [
                {
                    domain: "Quantum Mechanics",
                    mapping: "State superposition acts as...",
                    AT_Score: 0.95
                }
            ]
        };

        render(<SemanticProfile data={mockData} word="Test Concept" />);

        expect(screen.getByText('Dialectical Synthesis: Structural Isomorphisms')).toBeInTheDocument();
        expect(screen.getByText('Domain: Quantum Mechanics')).toBeInTheDocument();
        expect(screen.getByText('State superposition acts as...')).toBeInTheDocument();
    });
});
