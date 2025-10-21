
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

/**
 * A component to display an error message.
 * It renders a styled box with the provided error message.
 *
 * @param {ErrorMessageProps} props - The props for the component.
 * @param {string} props.message - The error message to display.
 * @returns {React.FC<ErrorMessageProps>} The error message component.
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg my-4 text-center" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);
