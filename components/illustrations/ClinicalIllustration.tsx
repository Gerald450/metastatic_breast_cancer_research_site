'use client';

export default function ClinicalIllustration() {
  return (
    <svg
      viewBox="0 0 120 100"
      className="h-28 w-32 text-rose-400/70 dark:text-rose-500/50 sm:h-32 sm:w-36"
      aria-hidden
    >
      <defs>
        <linearGradient id="clin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Heartbeat / trending line */}
      <path
        d="M15 60 L30 55 L45 65 L60 40 L75 50 L90 35 L105 45"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      {/* Outcome bars */}
      <rect x="28" y="72" width="14" height="16" rx="2" fill="url(#clin-grad)" opacity="0.5" />
      <rect x="50" y="68" width="14" height="20" rx="2" fill="url(#clin-grad)" opacity="0.6" />
      <rect x="72" y="70" width="14" height="18" rx="2" fill="url(#clin-grad)" opacity="0.55" />
    </svg>
  );
}
