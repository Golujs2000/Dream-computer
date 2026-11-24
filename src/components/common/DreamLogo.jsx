import React from 'react';

/**
 * Dream Computer Official Theme-Matched Vector Logo Icon
 * Combines the physical stationery DC emblem with a futuristic gaming PC & micro-soldering aesthetic.
 * Colors: Deep Navy (#0A101E), Card (#121826), Neon Lime (#BEF8A1), Glow (#C3FFA5), Electric Cyan (#00E5FF).
 */
export const DreamLogoIcon = ({ className = "w-10 h-10", glowing = true }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Ambient Neon Lime Glow */}
        <filter id="dc-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradient for Cyber Ring */}
        <linearGradient id="dc-ring-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BEF8A1" />
          <stop offset="50%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#BEF8A1" />
        </linearGradient>

        {/* Metallic Dark Badge Gradient */}
        <radialGradient id="dc-badge-bg" cx="50" cy="50" r="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#192238" />
          <stop offset="70%" stopColor="#0F1626" />
          <stop offset="100%" stopColor="#0A101E" />
        </radialGradient>

        {/* Lime Accent Gradient */}
        <linearGradient id="dc-lime-grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C3FFA5" />
          <stop offset="100%" stopColor="#8BE362" />
        </linearGradient>
      </defs>

      {/* Outer Hex-Circular Shield Background */}
      <circle cx="50" cy="50" r="46" fill="url(#dc-badge-bg)" stroke="#303746" strokeWidth="1.5" />

      {/* Cybernetic Tech Accents / Segmented Outer Ring */}
      <circle cx="50" cy="50" r="42" stroke="#303746" strokeWidth="1" strokeDasharray="3 3" />
      
      {/* Top and Bottom Tech Caliper Brackets */}
      <path
        d="M26 22C33 17 41 14 50 14C59 14 67 17 74 22"
        stroke="url(#dc-ring-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter={glowing ? "url(#dc-neon-glow)" : undefined}
      />
      <path
        d="M26 78C33 83 41 86 50 86C59 86 67 83 74 78"
        stroke="url(#dc-ring-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter={glowing ? "url(#dc-neon-glow)" : undefined}
      />

      {/* Micro-Circuit Dots / Nodes */}
      <circle cx="26" cy="22" r="2.5" fill="#BEF8A1" />
      <circle cx="74" cy="22" r="2.5" fill="#00E5FF" />
      <circle cx="26" cy="78" r="2.5" fill="#00E5FF" />
      <circle cx="74" cy="78" r="2.5" fill="#BEF8A1" />
      
      {/* Left and Right Alignment Marks */}
      <line x1="10" y1="50" x2="16" y2="50" stroke="#BEF8A1" strokeWidth="2" strokeLinecap="round" />
      <line x1="84" y1="50" x2="90" y2="50" stroke="#BEF8A1" strokeWidth="2" strokeLinecap="round" />

      {/* ======================================================== */}
      {/* INTERLOCKING D & C CYBERNETIC MONOGRAM */}
      {/* ======================================================== */}
      <g transform="translate(1, 0)">
        {/* Letter 'D' (Titanium White with Cyber Cut) */}
        <path
          d="M28 28H42C51 28 57 34 57 50C57 66 51 72 42 72H28V28ZM36 36V64H41C46 64 49 60 49 50C49 40 46 36 41 36H36Z"
          fill="#F5F5F7"
        />
        {/* Inner Power Accent on 'D' */}
        <path d="M30 31H34V69H30V31Z" fill="#BEF8A1" opacity="0.6" />

        {/* Letter 'C' (Glowing Neon Lime, Interlocking) */}
        <path
          d="M72 37L66 43C62 39 58 37 53 37C44 37 39 42 39 50C39 58 44 63 53 63C58 63 62 61 66 57L72 63C67 69 60 72 52 72C38 72 30 63 30 50C30 37 38 28 52 28C60 28 67 31 72 37Z"
          fill="url(#dc-lime-grad)"
          filter={glowing ? "url(#dc-neon-glow)" : undefined}
        />
      </g>

      {/* Central Quantum Tech Core Spark */}
      <polygon points="50,47 52,50 50,53 48,50" fill="#00E5FF" filter={glowing ? "url(#dc-neon-glow)" : undefined} />
    </svg>
  );
};

export const DreamLogo = ({
  variant = "horizontal", // "horizontal" | "icon" | "stacked"
  iconSize = "w-10 h-10",
  showTagline = true,
  className = "",
}) => {
  if (variant === "icon") {
    return <DreamLogoIcon className={iconSize} />;
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        <div className="relative group">
          <div className="absolute inset-0 rounded-full bg-[#BEF8A1]/20 blur-md group-hover:bg-[#BEF8A1]/40 transition-all" />
          <DreamLogoIcon className="w-16 h-16 relative z-10" />
        </div>
        <div>
          <span className="font-orbitron text-2xl font-black tracking-wider text-[#F5F5F7] block leading-tight">
            DREAM<span className="text-[#BEF8A1]">.</span>COMPUTER
          </span>
          {showTagline && (
            <span className="text-xs tracking-widest uppercase font-rajdhani text-[#BEF8A1] font-bold block mt-0.5">
              Patna's Tech Powerhouse
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal Brand Lockup
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative shrink-0">
        {/* Soft Ambient Glow Behind Logo */}
        <div className="absolute -inset-1 rounded-full bg-[#BEF8A1]/15 blur-sm group-hover:bg-[#BEF8A1]/30 transition-all" />
        <DreamLogoIcon className={`${iconSize} relative z-10 group-hover:scale-105 transition-transform duration-300`} />
      </div>
      <div>
        <span className="font-orbitron text-xl sm:text-2xl font-black tracking-wider text-[#F5F5F7] group-hover:text-[#BEF8A1] transition-colors block leading-tight">
          DREAM<span className="text-[#BEF8A1]">.</span>COMPUTER
        </span>
        {showTagline && (
          <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-rajdhani text-[#B7BBC5] group-hover:text-[#F5F5F7] block -mt-0.5 transition-colors">
            Patna’s Tech Powerhouse
          </span>
        )}
      </div>
    </div>
  );
};
