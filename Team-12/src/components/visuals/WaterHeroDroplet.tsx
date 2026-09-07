import React from 'react';

export const WaterHeroDroplet: React.FC = () => {
  return (
    <div id="hero-water-droplet-container" className="relative w-full max-w-[460px] h-[480px] flex items-center justify-center select-none">
      {/* Soft radial background glow */}
      <div className="absolute inset-0 bg-radial from-cyan-200/50 via-sky-100/30 to-transparent blur-2xl -z-10" />

      {/* Handwritten Decorative Text Around */}
      <div className="absolute -top-1 left-4 font-handwriting text-2xl md:text-3xl text-sky-700/85 -rotate-12 animate-float pointer-events-none">
        Save Water ✨
      </div>
      <div className="absolute top-16 -right-2 font-handwriting text-2xl md:text-3xl text-teal-600/85 rotate-6 animate-float [animation-delay:1.5s] pointer-events-none">
        Brighter Days 🌿
      </div>

      {/* Floating mini droplets around */}
      <div className="absolute top-8 left-16 w-3.5 h-4 rounded-full bg-cyan-300/70 blur-[0.5px] animate-float [animation-delay:0.7s]" />
      <div className="absolute top-24 right-12 w-2.5 h-3 rounded-full bg-sky-300/80 blur-[0.5px] animate-float [animation-delay:2.2s]" />
      <div className="absolute bottom-24 left-6 w-3 h-3.5 rounded-full bg-teal-300/70 blur-[0.5px] animate-float [animation-delay:1.1s]" />

      {/* Floating gentle leaf elements */}
      <div className="absolute top-32 -left-4 text-emerald-500/70 rotate-45 animate-float [animation-delay:2s] pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        </svg>
      </div>
      <div className="absolute bottom-32 -right-3 text-teal-500/60 -rotate-12 animate-float [animation-delay:3s] pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        </svg>
      </div>

      {/* Central Glass Water Droplet Container */}
      <div className="relative w-[340px] h-[400px] flex items-center justify-center">
        {/* Outer Droplet SVG with clipPath for internal eco-home artwork */}
        <svg viewBox="0 0 340 400" className="w-full h-full drop-shadow-2xl">
          <defs>
            {/* Droplet Outline Clip Path */}
            <clipPath id="dropletClip">
              <path d="M170 12 C170 12 50 170 50 260 C50 330 104 384 170 384 C236 384 290 330 290 260 C290 170 170 12 170 12 Z" />
            </clipPath>

            {/* Droplet Border Gradient */}
            <linearGradient id="dropletBorder" x1="50" y1="12" x2="290" y2="384" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#7dd3fc" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
            </linearGradient>

            {/* Glass refraction gradient */}
            <linearGradient id="glassSheen" x1="80" y1="30" x2="160" y2="280" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Sky gradient inside droplet */}
            <linearGradient id="skyGrad" x1="170" y1="20" x2="170" y2="280" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="60%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>

            {/* Water bottom gradient */}
            <linearGradient id="insideWater" x1="170" y1="290" x2="170" y2="384" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            {/* Water Surface reflection */}
            <radialGradient id="waterSurfaceGlow" cx="170" cy="380" r="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Droplet Background Glow */}
          <path
            d="M170 12 C170 12 50 170 50 260 C50 330 104 384 170 384 C236 384 290 330 290 260 C290 170 170 12 170 12 Z"
            fill="#e0f7ff"
            fillOpacity="0.75"
          />

          {/* Clipped Inside: Sustainable Home, Trees, Water, Skyline */}
          <g clipPath="url(#dropletClip)">
            {/* Sky Background */}
            <rect x="0" y="0" width="340" height="400" fill="url(#skyGrad)" />

            {/* Distant Soft Skyline */}
            <g opacity="0.35">
              <rect x="70" y="195" width="22" height="45" rx="2" fill="#0369a1" />
              <rect x="96" y="180" width="18" height="60" rx="2" fill="#0284c7" />
              <rect x="118" y="200" width="14" height="40" rx="1" fill="#0369a1" />
              <rect x="210" y="190" width="24" height="50" rx="2" fill="#0284c7" />
              <rect x="238" y="185" width="18" height="55" rx="2" fill="#0369a1" />
              <rect x="260" y="205" width="20" height="35" rx="1" fill="#38bdf8" />
            </g>

            {/* Sun / Eco Warmth */}
            <circle cx="230" cy="110" r="22" fill="#fef08a" fillOpacity="0.8" />
            <circle cx="230" cy="110" r="32" fill="#fef9c3" fillOpacity="0.3" />

            {/* Rolling Green Eco Hills / Garden Mound */}
            <path
              d="M30 280 Q 110 240 170 255 Q 240 270 310 250 L 310 320 L 30 320 Z"
              fill="#10b981"
            />
            <path
              d="M40 290 Q 140 260 210 275 Q 270 285 310 270 L 310 330 L 40 330 Z"
              fill="#059669"
            />

            {/* Trees & Foliage */}
            {/* Left Tree */}
            <rect x="98" y="240" width="6" height="22" rx="2" fill="#78350f" />
            <circle cx="101" cy="235" r="16" fill="#059669" />
            <circle cx="95" cy="230" r="12" fill="#10b981" />
            <circle cx="107" cy="228" r="11" fill="#34d399" />

            {/* Right Tree */}
            <rect x="236" y="245" width="6" height="20" rx="2" fill="#78350f" />
            <circle cx="239" cy="238" r="15" fill="#047857" />
            <circle cx="244" cy="232" r="12" fill="#10b981" />

            {/* Sustainable Modern Home */}
            <g transform="translate(130, 205)">
              {/* Home Shadow */}
              <ellipse cx="40" cy="65" rx="42" ry="7" fill="#064e3b" fillOpacity="0.3" />

              {/* Main Building Base */}
              <rect x="10" y="24" width="60" height="38" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Modern Slanted Timber / Solar Roof */}
              <polygon points="4,24 40,6 76,24" fill="#0284c7" />
              {/* Solar Panels on Roof */}
              <rect x="18" y="14" width="16" height="8" rx="1" fill="#0369a1" stroke="#38bdf8" strokeWidth="0.8" />
              <rect x="38" y="14" width="16" height="8" rx="1" fill="#0369a1" stroke="#38bdf8" strokeWidth="0.8" />

              {/* Large Eco Window */}
              <rect x="16" y="32" width="22" height="18" rx="2" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.2" />
              {/* Window Crossbar */}
              <line x1="27" y1="32" x2="27" y2="50" stroke="#bae6fd" strokeWidth="1" />
              <line x1="16" y1="41" x2="38" y2="41" stroke="#bae6fd" strokeWidth="1" />

              {/* Clean Front Door */}
              <rect x="46" y="36" width="16" height="26" rx="2" fill="#0d9488" />
              <circle cx="58" cy="48" r="1.5" fill="#fef08a" />

              {/* Rainwater Harvesting Tank beside house */}
              <rect x="68" y="44" width="12" height="18" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
              {/* Tank Pipe */}
              <path d="M66 28 L74 28 L74 44" fill="none" stroke="#64748b" strokeWidth="1.5" />
            </g>

            {/* Small Garden Flowers */}
            <circle cx="120" cy="275" r="2.5" fill="#f43f5e" />
            <circle cx="126" cy="273" r="2" fill="#fbbf24" />
            <circle cx="132" cy="277" r="2.5" fill="#f43f5e" />
            <circle cx="210" cy="275" r="2" fill="#a855f7" />
            <circle cx="216" cy="273" r="2.5" fill="#fbbf24" />

            {/* Bottom Crystal Blue Water Reservoir */}
            <path
              d="M30 300 Q 100 290 170 295 Q 240 300 310 290 L 310 400 L 30 400 Z"
              fill="url(#insideWater)"
            />

            {/* Water Wave surface ripples */}
            <path
              d="M40 306 Q 105 298 170 304 Q 235 310 300 302"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="2.5"
              strokeOpacity="0.85"
            />
            <path
              d="M50 325 Q 120 318 190 324 Q 250 328 290 320"
              fill="none"
              stroke="#bae6fd"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />

            {/* Glass Sheen / Reflection inside */}
            <path
              d="M170 24 C140 60 72 160 70 240 C69 280 84 310 100 330 C86 280 94 200 134 110 C154 65 170 24 170 24 Z"
              fill="url(#glassSheen)"
            />

            {/* Highlight Sparkles */}
            <ellipse cx="110" cy="120" rx="14" ry="34" transform="rotate(-25 110 120)" fill="#ffffff" fillOpacity="0.5" />
            <circle cx="92" cy="180" r="3.5" fill="#ffffff" fillOpacity="0.75" />
          </g>

          {/* Droplet Glass Outer Rim Stroke */}
          <path
            d="M170 12 C170 12 50 170 50 260 C50 330 104 384 170 384 C236 384 290 330 290 260 C290 170 170 12 170 12 Z"
            fill="none"
            stroke="url(#dropletBorder)"
            strokeWidth="3.5"
          />

          {/* Specular Top-Left Highlights on Glass Surface */}
          <path
            d="M165 30 C135 75 75 165 72 230"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
          <circle cx="162" cy="40" r="3" fill="#ffffff" fillOpacity="0.9" />
        </svg>

        {/* Subtle Water Surface Pond & Ripples Below Droplet */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[280px] h-[36px] pointer-events-none">
          {/* Ripple 1 */}
          <div className="absolute inset-0 rounded-[100%] border border-cyan-400/50 animate-ripple" />
          {/* Ripple 2 */}
          <div className="absolute inset-2 rounded-[100%] border border-sky-300/40 animate-ripple [animation-delay:1s]" />
          {/* Water reflection puddle */}
          <div className="absolute inset-x-6 inset-y-2 rounded-[100%] bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent blur-[2px]" />
        </div>
      </div>
    </div>
  );
};
