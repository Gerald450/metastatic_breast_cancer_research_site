'use client';

export default function DefinitionIllustration() {
  return (
    <svg
      viewBox="0 0 120 100"
      className="h-28 w-32 text-indigo-400/70 dark:text-indigo-500/50 sm:h-32 sm:w-36"
      aria-hidden
    >
      <defs>
        <linearGradient id="def-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Book/document */}
      <path
        d="M20 15 L20 85 Q20 92 28 92 L92 92 Q100 92 100 85 L100 15 Q100 8 92 8 L28 8 Q20 8 20 15Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28 20 H72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M28 32 H88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M28 44 H80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Staging boxes */}
      <rect x="32" y="58" width="16" height="14" rx="3" fill="url(#def-grad)" opacity="0.8" />
      <rect x="52" y="58" width="16" height="14" rx="3" fill="url(#def-grad)" opacity="0.6" />
      <rect x="72" y="58" width="16" height="14" rx="3" fill="url(#def-grad)" opacity="0.8" />
      <path d="M48 65 L52 65" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M68 65 L72 65" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
