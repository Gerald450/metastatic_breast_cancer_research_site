'use client';

export default function DemographicsIllustration() {
  return (
    <svg
      viewBox="0 0 120 100"
      className="h-28 w-32 text-amber-500/70 dark:text-amber-500/50 sm:h-32 sm:w-36"
      aria-hidden
    >
      <defs>
        <linearGradient id="demo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Group icons / segments */}
      <circle cx="30" cy="35" r="12" fill="url(#demo-grad)" opacity="0.7" />
      <circle cx="30" cy="35" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="60" cy="32" r="10" fill="url(#demo-grad)" opacity="0.6" />
      <circle cx="60" cy="32" r="5" fill="currentColor" opacity="0.3" />
      <circle cx="90" cy="38" r="11" fill="url(#demo-grad)" opacity="0.7" />
      <circle cx="90" cy="38" r="5" fill="currentColor" opacity="0.3" />
      {/* Bars (distribution) */}
      <rect x="22" y="62" width="16" height="22" rx="2" fill="url(#demo-grad)" opacity="0.5" />
      <rect x="44" y="58" width="16" height="26" rx="2" fill="url(#demo-grad)" opacity="0.6" />
      <rect x="66" y="64" width="16" height="20" rx="2" fill="url(#demo-grad)" opacity="0.5" />
      <rect x="88" y="60" width="16" height="24" rx="2" fill="url(#demo-grad)" opacity="0.6" />
    </svg>
  );
}
