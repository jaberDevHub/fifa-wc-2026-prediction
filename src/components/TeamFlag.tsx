import React from 'react';
import { CountryFlag } from '@/utils/flags';

interface TeamFlagProps {
  countryCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TeamFlag: React.FC<TeamFlagProps> = ({
  countryCode,
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 20,
    md: 24,
    lg: 32
  };

  return (
    <CountryFlag
      countryCode={countryCode}
      size={sizeMap[size]}
      className={className}
    />
  );
};