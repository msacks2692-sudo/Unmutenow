import React from 'react';

interface UnmuteLogoProps {
  className?: string;
  showText?: boolean;
}

export const UnmuteLogo: React.FC<UnmuteLogoProps> = ({ className = "", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Converging data streams - left side */}
        <path
          d="M2 10 L18 22"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-pulse"
          style={{ animationDelay: '0s', animationDuration: '2s' }}
        />
        <path
          d="M4 18 L18 24"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-pulse"
          style={{ animationDelay: '0.3s', animationDuration: '2s' }}
        />
        <path
          d="M2 26 L18 26"
          stroke="url(#gradient3)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-pulse"
          style={{ animationDelay: '0.6s', animationDuration: '2s' }}
        />
        <path
          d="M4 34 L18 28"
          stroke="url(#gradient4)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-pulse"
          style={{ animationDelay: '0.9s', animationDuration: '2s' }}
        />
        <path
          d="M2 42 L18 30"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-pulse"
          style={{ animationDelay: '1.2s', animationDuration: '2s' }}
        />

        {/* Microphone body */}
        <rect
          x="18"
          y="18"
          width="12"
          height="16"
          rx="6"
          fill="url(#micGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Microphone stand */}
        <path
          d="M24 34 L24 40 M18 40 L30 40"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Sound waves emanating - right side */}
        <path
          d="M32 24 Q38 24 42 20"
          stroke="url(#waveGradient1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '0s', animationDuration: '1.5s' }}
        />
        <path
          d="M32 24 Q38 24 44 24"
          stroke="url(#waveGradient2)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '0.2s', animationDuration: '1.5s' }}
        />
        <path
          d="M32 24 Q38 24 42 28"
          stroke="url(#waveGradient3)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '0.4s', animationDuration: '1.5s' }}
        />
        <path
          d="M34 24 Q40 24 46 18"
          stroke="url(#waveGradient1)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}
        />
        <path
          d="M34 24 Q40 24 46 30"
          stroke="url(#waveGradient3)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '0.8s', animationDuration: '1.5s' }}
        />

        {/* Gradients */}
        <defs>
          {/* Input stream gradients */}
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(33, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(180, 100%, 50%)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(180, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(180, 100%, 25%)" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(180, 100%, 25%)" />
            <stop offset="100%" stopColor="hsl(262, 42%, 73%)" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(262, 42%, 73%)" />
            <stop offset="100%" stopColor="hsl(33, 100%, 50%)" />
          </linearGradient>
          
          {/* Microphone gradient */}
          <linearGradient id="micGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(33, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(180, 100%, 50%)" />
          </linearGradient>
          
          {/* Output wave gradients */}
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(180, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(33, 100%, 50%)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(33, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(262, 42%, 73%)" />
            <stop offset="100%" stopColor="hsl(180, 100%, 25%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <span className="text-2xl font-bold tracking-wider" style={{ letterSpacing: '0.05em' }}>
          <span className="bg-gradient-to-r from-[hsl(33,100%,50%)] via-[hsl(180,100%,50%)] to-[hsl(262,42%,73%)] bg-clip-text text-transparent">
            UNMUTE
          </span>
        </span>
      )}
    </div>
  );
};
