import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  onClick,
}) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 44 : 34;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const taglineSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <div
      id="aquasense-brand-logo"
      onClick={onClick}
      className={`flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Modern blue water droplet with inner highlight */}
      <div 
        className="relative flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 40 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            <linearGradient id="dropGrad" x1="20" y1="2" x2="20" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="innerHighlight" x1="12" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="leafAccent" x1="18" y1="20" x2="28" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Droplet Body */}
          <path
            d="M20 2C20 2 6 18.2 6 28C6 35.732 12.268 42 20 42C27.732 42 34 35.732 34 28C34 18.2 20 2 20 2Z"
            fill="url(#dropGrad)"
          />

          {/* Inner Light Reflection */}
          <path
            d="M20 5C17.5 9.5 10 18 10 26C10 32 14.5 37 20 37C17 34 14 29 14 24C14 18.5 19 10 20 5Z"
            fill="url(#innerHighlight)"
          />

          {/* Subtle Eco Leaf Vein / Accent */}
          <path
            d="M20 20C24 23 27 28 26 33C24 33.5 21 31 20 28Z"
            fill="url(#leafAccent)"
          />

          {/* Specular Sparkle */}
          <circle cx="16" cy="14" r="2.2" fill="#ffffff" fillOpacity="0.9" />
          <circle cx="19" cy="9" r="1.2" fill="#ffffff" fillOpacity="0.7" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-sky-950 font-sans ${titleSize} leading-tight`}>
          Aqua<span className="text-cyan-600">Sense</span>
        </span>
        {showTagline && (
          <span className={`text-slate-500 font-medium tracking-normal ${taglineSize} leading-none mt-0.5`}>
            Small Changes. A Bigger Tomorrow.
          </span>
        )}
      </div>
    </div>
  );
};
