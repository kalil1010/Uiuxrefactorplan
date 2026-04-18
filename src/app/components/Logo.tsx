import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon/Text with Gradient */}
      <div className="relative">
        <svg 
          className={sizeClasses[size]} 
          viewBox="0 0 200 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#6556C6', stopOpacity: 1 }} />
              <stop offset="33%" style={{ stopColor: '#D20EC1', stopOpacity: 1 }} />
              <stop offset="66%" style={{ stopColor: '#F04050', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FFC600', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {showText ? (
            <text
              x="0"
              y="45"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="48"
              fontWeight="700"
              fill="url(#logoGradient)"
              letterSpacing="-0.02em"
            >
              ZokaiHub
            </text>
          ) : (
            // Just the "Z" icon version
            <text
              x="0"
              y="50"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="56"
              fontWeight="800"
              fill="url(#logoGradient)"
            >
              Z
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}

// Compact logo for small spaces
export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <div className={`w-10 h-10 rounded-xl gradient-bg flex items-center justify-center ${className}`}>
      <span className="text-white text-xl font-bold">Z</span>
    </div>
  );
}

// Logo with custom styling
export function LogoFull({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon />
      <span className="text-xl font-bold gradient-text">ZokaiHub</span>
    </div>
  );
}
