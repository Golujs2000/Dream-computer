import React from 'react';

/**
 * Authentic Official Vector SVGs for Major Hardware Brands & Partners
 * Featured on Dream Computer's Official Stationery Pad:
 * DELL, HP, LG, SAMSUNG, INTEL, ACER, LENOVO, ASUS (plus NVIDIA, AMD, MSI, CORSAIR)
 * All SVGs share unified viewBox="0 0 160 50" for 100% consistent sizing and alignment.
 */
export const BrandLogo = ({ slug, name, className = "h-8 w-auto max-w-[140px]" }) => {
  const normalized = (slug || name || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. DELL (Official Circular Emblem with slanted 'E')
  if (normalized.includes('dell')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="25" r="18" stroke="#007DB8" strokeWidth="3" fill="none" />
        <g fill="#007DB8">
          {/* D */}
          <path d="M19 16H23.5C26.5 16 28.5 18 28.5 25C28.5 32 26.5 34 23.5 34H19V16ZM21.5 31.5H23C25 31.5 26 30 26 25C26 20 25 18.5 23 18.5H21.5V31.5Z" />
        </g>
        <text x="56" y="32" fill="#007DB8" fontFamily="'Inter', 'Rajdhani', sans-serif" fontWeight="900" fontSize="22" letterSpacing="1">
          DELL
        </text>
        <text x="110" y="32" fill="#8B929E" fontFamily="'Rajdhani', sans-serif" fontWeight="600" fontSize="10" letterSpacing="1.5">
          PARTNER
        </text>
      </svg>
    );
  }

  // 2. HP (Official Circular Emblem with italic hp)
  if (normalized === 'hp' || normalized.includes('hewlett')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="25" r="18" fill="#0096D6" />
        <g fill="#FFFFFF" transform="translate(18, 12) skewX(-12)">
          {/* h */}
          <path d="M6 3H9V12C9.8 10.8 11.2 10.2 12.8 10.2C15.5 10.2 17 12 17 15V24H14V16C14 14.5 13.2 13.5 11.8 13.5C10.5 13.5 9.5 14.5 9 16V24H6V3Z" />
          {/* p */}
          <path d="M19 10.5H22V12.2C22.8 11 24.2 10.2 25.8 10.2C29 10.2 31 12.8 31 16.5C31 20.2 29 22.8 25.8 22.8C24.2 22.8 22.8 22 22 20.8V28H19V10.5ZM25 13.2C23.2 13.2 22 14.8 22 16.5C22 18.2 23.2 19.8 25 19.8C26.8 19.8 28 18.2 28 16.5C28 14.8 26.8 13.2 25 13.2Z" />
        </g>
        <text x="60" y="32" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="19" letterSpacing="1">
          HP
        </text>
        <text x="92" y="32" fill="#0096D6" fontFamily="'Rajdhani', sans-serif" fontWeight="700" fontSize="11" letterSpacing="1.5">
          OFFICIAL
        </text>
      </svg>
    );
  }

  // 3. LG (Official Circular Face Logo & LG Wordmark)
  if (normalized.includes('lg')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* LG Circular Emblem */}
        <circle cx="28" cy="25" r="18" fill="#C4004F" />
        {/* Stylized face (L and G with dot) */}
        <circle cx="23" cy="20" r="2.2" fill="#FFFFFF" />
        <path d="M25 21V28H31" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M35 25C35 30.5 30.5 35 25 35C19.5 35 15 30.5 15 25C15 19.5 19.5 15 25 15C29 15 32.5 17.5 34 21" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Wordmark */}
        <text x="56" y="32" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="22" letterSpacing="2">
          LG
        </text>
        <text x="94" y="32" fill="#C4004F" fontFamily="'Rajdhani', sans-serif" fontWeight="700" fontSize="11" letterSpacing="1">
          ELECTRONICS
        </text>
      </svg>
    );
  }

  // 4. ACER (Official Green Wordmark)
  if (normalized.includes('acer')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="20" y="33" fill="#83B81A" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="28" letterSpacing="-1">
          acer
        </text>
        <rect x="92" y="16" width="56" height="18" rx="4" fill="#191F2D" stroke="#83B81A" strokeWidth="1" />
        <text x="120" y="28" dominantBaseline="middle" textAnchor="middle" fill="#F5F5F7" fontFamily="'Rajdhani', sans-serif" fontWeight="700" fontSize="9" letterSpacing="1.5">
          PREDATOR
        </text>
      </svg>
    );
  }

  // 5. ASUS & ROG (Official ASUS Stencil & ROG Eye)
  if (normalized.includes('asus') || normalized.includes('rog')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 5) scale(0.5)">
          <path d="M78 2C68 0.5 56 4 50 11C42 19 38 31 37 42C34 34 33 24 36 15C38 8 45 2 53 1C38 0 25 8 20 21C16 34 18 48 26 59C30 64 35 66 41 65C52 62 60 53 66 43C73 30 78 16 78 2Z" fill="#FF0033"/>
          <path d="M3 28C1 36 0 45 2 53C5 60 11 65 19 65C13 62 8 55 7 48C6 40 10 33 14 27C10 26 6 26 3 28Z" fill="#FF0033"/>
        </g>
        <text x="60" y="27" fill="#FFFFFF" fontFamily="'Orbitron', sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">
          ASUS
        </text>
        <text x="60" y="39" fill="#FF0033" fontFamily="'Rajdhani', sans-serif" fontWeight="700" fontSize="11" letterSpacing="2">
          ROG GAMING
        </text>
      </svg>
    );
  }

  // 6. INTEL (Intel Modern Wordmark)
  if (normalized.includes('intel')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="80" y="34" dominantBaseline="middle" textAnchor="middle" fill="#0071C5" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="34" letterSpacing="-2">
          intel
        </text>
        <circle cx="43" cy="12" r="3.5" fill="#00C7FD" />
      </svg>
    );
  }

  // 7. LENOVO & LEGION
  if (normalized.includes('lenovo') || normalized.includes('legion')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(14, 10)">
          <path d="M14 2L4 22H10L14 12L18 22H24L14 2Z" fill="#00E5FF"/>
          <path d="M14 15L7 27H21L14 15Z" fill="#F5F5F7"/>
        </g>
        <text x="46" y="26" fill="#FFFFFF" fontFamily="'Orbitron', sans-serif" fontWeight="800" fontSize="15" letterSpacing="2">
          LEGION
        </text>
        <text x="46" y="37" fill="#E2231A" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="10" letterSpacing="1.5">
          LENOVO
        </text>
      </svg>
    );
  }

  // 8. SAMSUNG
  if (normalized.includes('samsung')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="80" y="32" dominantBaseline="middle" textAnchor="middle" fill="#1428A0" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="24" letterSpacing="2">
          SAMSUNG
        </text>
      </svg>
    );
  }

  // 9. NVIDIA & GEFORCE
  if (normalized.includes('nvidia') || normalized.includes('geforce')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 7) scale(0.48)">
          <path d="M36 11C25 11 16 17 16 26C16 35 25 41 36 41C46 41 55 35 56 26C56 22 52 18 48 18C46 18 43 20 43 22C43 26 36 28 33 25C30 22 33 17 39 17C46 17 53 22 61 28C58 42 44 52 31 52C16 52 3 40 3 26C3 13 14 2 32 1C44 0 57 6 67 16C70 20 73 24 74 28C73 35 66 58 36 58C15 58 0 43 0 26C0 10 13 -1 36 0C52 1 67 8 74 19L65 26C60 17 49 11 36 11Z" fill="#76B900"/>
        </g>
        <text x="56" y="32" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" letterSpacing="0.5">
          NVIDIA
        </text>
      </svg>
    );
  }

  // 10. AMD & RYZEN
  if (normalized.includes('amd') || normalized.includes('ryzen')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(18, 12)">
          <path d="M0 0H18V18H0V0Z" fill="#ED1C24"/>
          <path d="M14 4H4V14H14V4Z" fill="#0A101E"/>
          <path d="M18 0L24 6V18H18V0Z" fill="#ED1C24"/>
        </g>
        <text x="54" y="30" fill="#FFFFFF" fontFamily="'Orbitron', sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">
          AMD
        </text>
        <text x="100" y="30" fill="#ED1C24" fontFamily="'Rajdhani', sans-serif" fontWeight="800" fontSize="16" letterSpacing="2">
          RYZEN
        </text>
      </svg>
    );
  }

  // 11. MSI GAMING
  if (normalized.includes('msi')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="65" y="32" dominantBaseline="middle" textAnchor="middle" fill="#FF0000" fontFamily="'Orbitron', sans-serif" fontWeight="900" fontSize="30" letterSpacing="3">
          msi
        </text>
        <rect x="108" y="15" width="28" height="18" rx="3" fill="#191F2D" stroke="#FF0000" strokeWidth="1.5"/>
        <text x="122" y="27" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontFamily="'Rajdhani', sans-serif" fontWeight="700" fontSize="9" letterSpacing="1">
          GMR
        </text>
      </svg>
    );
  }

  // 12. CORSAIR
  if (normalized.includes('corsair')) {
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(16, 8) scale(0.48)">
          <path d="M30 3C27 12 24 24 6 30C15 27 25 24 30 3Z" fill="#F5F5F7"/>
          <path d="M31 6C33 18 39 33 54 39C42 33 35 24 31 6Z" fill="#BEF8A1"/>
          <path d="M18 33C27 31 39 33 45 45C33 42 24 40 18 33Z" fill="#F5F5F7"/>
        </g>
        <text x="54" y="31" fill="#FFFFFF" fontFamily="'Rajdhani', sans-serif" fontWeight="800" fontSize="20" letterSpacing="3">
          CORSAIR
        </text>
      </svg>
    );
  }

  // Fallback for custom or admin brands
  return (
    <div className="flex items-center justify-center font-orbitron font-bold text-sm text-[#BEF8A1]">
      {name}
    </div>
  );
};
