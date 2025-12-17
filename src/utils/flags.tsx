import React from 'react';
import ReactCountryFlag from 'react-country-flag';

// Special cases that need manual mapping to ISO 3166-1 alpha-2 codes
const COUNTRY_CODE_MAPPING: Record<string, string> = {
   'ENG': 'GB-ENG',   // England
  'SCO': 'GB-SCT',   // Scotland
  'WAL': 'GB-WLS',   // Wales
  'NIR': 'GB-NIR',   // Northern Ireland
  'CUW': 'CW',       // Curaçao
  'CIV': 'CI',       // Ivory Coast
  'COD': 'CD',       // DR Congo
  'KSA': 'SA',       // Saudi Arabia
  'RSA': 'ZA',       // South Africa
  'CPV': 'CV',       // Cape Verde
  'URU': 'UY',       // Uruguay
  'IRQ': 'IQ',       // Iraq
  'UZB': 'UZ',       // Uzbekistan
  'HAI': 'HT',       // Haiti
  'NED': 'NL',       // Netherlands
  'SUI': 'CH',       // Switzerland
  'ARG': 'AR',       // Argentina
  'MAR': 'MA',       // Morocco
  'BRA': 'BR',       // Brazil
  'KOR': 'KR',       // South Korea
  'DEN': 'DK',       // Denmark
  'MEX': 'MX',       // Mexico
  'CAN': 'CA',       // Canada
  'ITA': 'IT',       // Italy
  'QAT': 'QA',       // Qatar
  'USA': 'US',       // United States
  'PAR': 'PY',       // Paraguay
  'AUS': 'AU',       // Australia
  'TUR': 'TR',       // Turkey
  'JPN': 'JP',       // Japan
  'UKR': 'UA',       // Ukraine
  'TUN': 'TN',       // Tunisia
  'GER': 'DE',       // Germany
  'ECU': 'EC',       // Ecuador
  'BEL': 'BE',       // Belgium
  'EGY': 'EG',       // Egypt
  'IRN': 'IR',       // Iran
  'NZL': 'NZ',       // New Zealand
  'ESP': 'ES',       // Spain
  'FRA': 'FR',       // France
  'SEN': 'SN',       // Senegal
  'NOR': 'NO',       // Norway
  'ALG': 'DZ',       // Algeria
  'AUT': 'AT',       // Austria
  'JOR': 'JO',       // Jordan
  'POR': 'PT',       // Portugal
  'COL': 'CO',       // Colombia
  'CRO': 'HR',       // Croatia
  'GHA': 'GH',       // Ghana
  'PAN': 'PA',       // Panama
};

// Get the ISO 3166-1 alpha-2 country code
export const getCountryCode = (code: string): string => {
  return COUNTRY_CODE_MAPPING[code] || code;
};

// TypeScript interface for CountryFlag props
interface CountryFlagProps {
  countryCode: string;
  size?: number;
  className?: string;
  [key: string]: any;
}

// React component for rendering country flags
export const CountryFlag: React.FC<CountryFlagProps> = ({ 
  countryCode, 
  size = 24,
  className = '',
  ...props 
}) => {
  const isoCode = getCountryCode(countryCode);
  const flagStyle = {
    width: `${size}px`,
    height: `${size}px`,
    objectFit: 'cover' as const,
  };
  
  // Special handling for UK nations
  if (isoCode.startsWith('GB-')) {
    return (
      <span 
        className={`inline-flex items-center justify-center ${className}`}
        style={flagStyle}
        {...props}
      >
        {COUNTRY_CODE_MAPPING[countryCode] ? (
          <ReactCountryFlag
            countryCode={isoCode}
            svg
            style={flagStyle}
            title={countryCode}
          />
        ) : (
          <span className="text-sm">{countryCode}</span>
        )}
      </span>
    );
  }

  return (
    <ReactCountryFlag
      countryCode={isoCode}
      svg
      style={flagStyle}
      className={className}
      title={countryCode}
      {...props}
    />
  );
};

// Backward compatibility function (returns string for existing code)
export const getFlagForCountry = (countryCode: string): string => {
  return countryCode; // This will be used with the CountryFlag component
};

// List of all country codes
export const countryCodes = Object.keys(COUNTRY_CODE_MAPPING);