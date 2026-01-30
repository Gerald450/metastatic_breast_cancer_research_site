'use client';

export default function TreatmentIllustration() {
  return (
    <svg
      viewBox="0 0 120 100"
      className="h-28 w-32 text-sky-400/70 dark:text-sky-500/50 sm:h-32 sm:w-36"
      aria-hidden
    >
      <defs>
        <linearGradient id="tx-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Heart / care symbol */}
      <path
        d="M60 78 C35 55 20 40 20 28 C20 18 28 12 38 12 C46 12 52 18 60 26 C68 18 74 12 82 12 C92 12 100 18 100 28 C100 40 85 55 60 78Z"
        fill="url(#tx-grad)"
        opacity="0.6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
