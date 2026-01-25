'use client';

export default function PublicHealthIllustration() {
  return (
    <svg
      viewBox="0 0 120 100"
      className="h-28 w-32 text-cyan-400/70 dark:text-cyan-500/50 sm:h-32 sm:w-36"
      aria-hidden
    >
      <defs>
        <linearGradient id="ph-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path
        d="M60 12 L92 24 L92 48 Q92 72 60 88 Q28 72 28 48 L28 24 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <path
        d="M60 12 L92 24 L92 48 Q92 72 60 88 Q28 72 28 48 L28 24 Z"
        fill="url(#ph-grad)"
        fillOpacity="0.15"
      />
      {/* Cross */}
      <path d="M60 38 V62 M48 50 H72" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {/* Globe arc */}
      <path d="M40 78 Q60 72 80 78" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}
