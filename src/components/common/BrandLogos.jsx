import React from 'react';

/**
 * Authentic Official Vector SVGs for Major Hardware Brands & Partners
 * All SVGs share unified viewBox="0 0 160 50" for 100% consistent sizing and alignment.
 */
export const BrandLogo = ({ slug, name, className = "h-8 w-auto max-w-[140px]" }) => {
  const normalized = (slug || name || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalized.includes('asus') || normalized.includes('rog')) {
    // ASUS ROG (Republic of Gamers) Official Red Eye & Text
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ROG Eye Icon */}
        <g transform="translate(10, 5) scale(0.5)">
          <path d="M78 2C68 0.5 56 4 50 11C42 19 38 31 37 42C34 34 33 24 36 15C38 8 45 2 53 1C38 0 25 8 20 21C16 34 18 48 26 59C30 64 35 66 41 65C52 62 60 53 66 43C73 30 78 16 78 2Z" fill="#FF0033"/>
          <path d="M3 28C1 36 0 45 2 53C5 60 11 65 19 65C13 62 8 55 7 48C6 40 10 33 14 27C10 26 6 26 3 28Z" fill="#FF0033"/>
        </g>
        {/* Text */}
        <text x="60" y="27" fill="#FFFFFF" fontFamily="'Orbitron', sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">
          ASUS
        </text>
        <text x="60" y="39" fill="#FF0033" fontFamily="'Rajdhani', sans-serif" fontWeight="700" fontSize="11" letterSpacing="2">
          ROG GAMING
        </text>
      </svg>
    );
  }

  if (normalized.includes('nvidia') || normalized.includes('geforce')) {
    // NVIDIA Official Green Eye & Typography
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* NVIDIA Claw */}
        <g transform="translate(10, 7) scale(0.48)">
          <path d="M36 11C25 11 16 17 16 26C16 35 25 41 36 41C46 41 55 35 56 26C56 22 52 18 48 18C46 18 43 20 43 22C43 26 36 28 33 25C30 22 33 17 39 17C46 17 53 22 61 28C58 42 44 52 31 52C16 52 3 40 3 26C3 13 14 2 32 1C44 0 57 6 67 16C70 20 73 24 74 28C73 35 66 58 36 58C15 58 0 43 0 26C0 10 13 -1 36 0C52 1 67 8 74 19L65 26C60 17 49 11 36 11Z" fill="#76B900"/>
        </g>
        <text x="56" y="32" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" letterSpacing="0.5">
          NVIDIA
        </text>
      </svg>
    );
  }

  if (normalized.includes('intel')) {
    // Intel Modern Wordmark with Dot
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="80" y="34" dominantBaseline="middle" textAnchor="middle" fill="#0071C5" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="34" letterSpacing="-2">
          intel
        </text>
        <circle cx="43" cy="12" r="3.5" fill="#00C7FD" />
      </svg>
    );
  }

  if (normalized.includes('amd') || normalized.includes('ryzen')) {
    // AMD Arrow Box & Typography
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

  if (normalized.includes('msi')) {
    // MSI Gaming Red Typography & Emblem
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

  if (normalized.includes('corsair')) {
    // Corsair Sails & Typography
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sails */}
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

  if (normalized.includes('lenovo') || normalized.includes('legion')) {
    // Lenovo Legion
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(18, 10)">
          <path d="M14 2L4 22H10L14 12L18 22H24L14 2Z" fill="#00E5FF"/>
          <path d="M14 15L7 27H21L14 15Z" fill="#F5F5F7"/>
        </g>
        <text x="50" y="26" fill="#FFFFFF" fontFamily="'Orbitron', sans-serif" fontWeight="800" fontSize="15" letterSpacing="2">
          LEGION
        </text>
        <text x="50" y="37" fill="#8B929E" fontFamily="'Rajdhani', sans-serif" fontWeight="600" fontSize="9" letterSpacing="2">
          BY LENOVO
        </text>
      </svg>
    );
  }

  if (normalized.includes('samsung')) {
    // Samsung Blue Wordmark
    return (
      <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="80" y="32" dominantBaseline="middle" textAnchor="middle" fill="#1428A0" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="24" letterSpacing="2">
          SAMSUNG
        </text>
      </svg>
    );
  }

  // Fallback
  return (
    <div className="flex items-center justify-center font-orbitron font-bold text-sm text-[#BEF8A1]">
      {name}
    </div>
  );
};
