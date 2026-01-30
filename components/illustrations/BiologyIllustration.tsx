'use client';

export default function BiologyIllustration() {
  return (
    <svg
      viewBox="0 0 120 100"
      className="h-28 w-32 text-violet-400/70 dark:text-violet-500/50 sm:h-32 sm:w-36"
      aria-hidden
    >
      <defs>
        <linearGradient id="bio-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Cell / node cluster */}
      <circle cx="60" cy="50" r="28" fill="url(#bio-grad)" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="45" cy="42" r="8" fill="url(#bio-grad)" opacity="0.6" />
      <circle cx="72" cy="45" r="8" fill="url(#bio-grad)" opacity="0.5" />
      <circle cx="58" cy="62" r="8" fill="url(#bio-grad)" opacity="0.55" />
      <path d="M51 46 L66 48" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M52 54 L64 52" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
