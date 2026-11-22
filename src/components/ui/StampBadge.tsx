import React from 'react';

export interface StampBadgeProps {
  label: string;
  variant?: 'red' | 'green' | 'amber' | 'neutral';
  rotate?: number;
  className?: string;
}

export function StampBadge({
  label,
  variant = 'red',
  rotate = -2,
  className = '',
}: StampBadgeProps) {
  const colorStyles: Record<NonNullable<StampBadgeProps['variant']>, string> = {
    red: 'border-[#c4402a] text-[#c4402a] bg-[#c4402a]/5',
    green: 'border-[#2f5a44] text-[#2f5a44] bg-[#2f5a44]/5',
    amber: 'border-[#b67a18] text-[#b67a18] bg-[#b67a18]/5',
    neutral: 'border-[#4b463d] text-[#4b463d] bg-black/5',
  };

  return (
    <span
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`inline-block px-2.5 py-0.5 border-2 font-mono text-[11px] font-bold uppercase tracking-wider select-none ${colorStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
