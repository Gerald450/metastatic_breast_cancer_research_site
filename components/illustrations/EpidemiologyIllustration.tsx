'use client';

export default function EpidemiologyIllustration() {
  return (
    <svg
      viewBox="0 0 120 100"
      className="h-28 w-32 text-emerald-400/70 dark:text-emerald-500/50 sm:h-32 sm:w-36"
      aria-hidden
    >
      <defs>
        <linearGradient id="epi-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Globe outline */}
      <ellipse cx="60" cy="50" rx="38" ry="32" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M22 50 H98" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <path d="M35 28 Q60 20 85 28" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <path d="M35 72 Q60 80 85 72" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {/* Data points on globe */}
      <circle cx="45" cy="38" r="4" fill="url(#epi-grad)" />
      <circle cx="72" cy="42" r="4" fill="url(#epi-grad)" />
      <circle cx="55" cy="58" r="4" fill="url(#epi-grad)" />
      <circle cx="78" cy="62" r="4" fill="url(#epi-grad)" />
      {/* Trend line */}
      <path
        d="M18 78 Q40 65 60 70 T102 58"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}
