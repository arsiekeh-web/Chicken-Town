import React from 'react';

interface StickerBadgeProps {
  label: string;
  variant?: 'red' | 'gold' | 'dark' | 'cream';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StickerBadge: React.FC<StickerBadgeProps> = ({
  label,
  variant = 'gold',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-[#F2B705] text-[#1A1A1A] border-[#1A1A1A]',
    red: 'bg-[#C41E2A] text-[#F5F0E8] border-[#1A1A1A]',
    dark: 'bg-[#1A1A1A] text-[#F2B705] border-[#F2B705]',
    cream: 'bg-[#F5F0E8] text-[#C41E2A] border-[#C41E2A]',
  };

  const sizeStyles = {
    sm: 'text-[9px] px-2 py-0.5 border',
    md: 'text-[11px] px-2.5 py-1 border-2',
    lg: 'text-xs px-3 py-1.5 border-2',
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-black uppercase tracking-wider rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.8)] transform -rotate-2 select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {label}
    </span>
  );
};
