
import React from 'react';

/**
 * A simple loading spinner component.
 * It displays a spinning circle to indicate that content is being loaded.
 *
 * @returns {React.FC} The loader component.
 */
export const Loader: React.FC = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
  </div>
);
