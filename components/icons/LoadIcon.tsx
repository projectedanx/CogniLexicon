import React from 'react';

/**
 * A load icon component, represented by a lightning bolt.
 * This component renders an SVG icon used to trigger a "load" or "generate" action.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - Standard SVG properties.
 * @returns {React.FC} The load icon component.
 */
export const LoadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);
