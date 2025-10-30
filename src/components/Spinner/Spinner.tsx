
import type { JSX } from 'react';

interface SpinnerProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export const Spinner = ({ 
  size = 20, 
  color = 'currentColor',
  strokeWidth = 4,
  className = ''
}: SpinnerProps): JSX.Element => {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;
  
  return (
    <svg 
      className={`animate-spin ${className}`}
      style={{ width: sizeValue, height: sizeValue, color }}
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth={strokeWidth}
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};