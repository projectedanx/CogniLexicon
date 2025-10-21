import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';
import { describe, it, expect } from 'vitest';

describe('ErrorMessage', () => {
    it('should render the error message', () => {
        const errorMessage = 'This is a test error message.';
        render(<ErrorMessage message={errorMessage} />);

        // Check that the component renders the message
        expect(screen.getByText(errorMessage)).toBeInTheDocument();

        // Check for the "Error: " prefix as well
        expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
});
