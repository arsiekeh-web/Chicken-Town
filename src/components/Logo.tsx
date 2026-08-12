import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false, className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Flame-crested Chicken Icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Flame Crest Background */}
          <path
            d="M50 5 C35 20, 20 15, 25 35 C15 45, 10 60, 25 75 C15 85, 30 95, 50 95 C70 95, 85 85, 75 75 C90 60, 85 45, 75 35 C80 15, 65 20, 50 5 Z"
            fill="#C41E2A"
          />
          <path
            d="M50 15 C40 28, 30 22, 33 38 C25 46, 22 58, 33 70 C25 78, 36 86, 50 86 C64 86, 75 78, 67 70 C78 58, 75 46, 67 38 C70 22, 60 28, 50 15 Z"
            fill="#F2B705"
          />
          {/* Stylized Chicken Silhouette */}
          <path
            d="M50 25 C45 35, 38 42, 42 52 C38 56, 38 64, 46 72 C42 76, 48 80, 54 80 C60 80, 66 76, 62 72 C70 64, 70 56, 66 52 C70 42, 63 35, 58 25 Z"
            fill="#1A1A1A"
          />
          {/* Eye */}
          <circle cx="53" cy="40" r="3.5" fill="#F5F0E8" />
          {/* Beak */}
          <polygon points="62,44 74,48 62,54" fill="#F2B705" />
          {/* Wattle */}
          <path d="M58 52 C62 58, 58 64, 55 60 Z" fill="#C41E2A" />
        </svg>
      </div>

      {/* Wordmark: CHICKEN (Cream) / TOWN (Red) */}
      <div className="flex flex-col leading-none tracking-tight font-black uppercase font-[Impact,sans-serif]">
        <div className={`flex items-center gap-1 ${textSizes[size]}`}>
          <span className="text-[#F5F0E8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">CHICKEN</span>
          <span className="text-[#C41E2A] bg-[#1A1A1A] px-1 rounded drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            TOWN
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] sm:text-xs font-sans tracking-wider normal-case italic font-medium text-[#F2B705] mt-0.5">
            "Swit u Mot Swit u Lyf"
          </span>
        )}
      </div>
    </div>
  );
};
