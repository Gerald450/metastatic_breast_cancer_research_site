/**
 * Integrated model: stiffness, integrin signaling, and MMP remodeling (ref-022).
 */
export default function EcmInvasionLoopFigure() {
  const items = [
    { label: 'ECM stiffening & alignment', sub: 'Collagen, LOX, CAF activity' },
    { label: 'Integrin / mechanotransduction', sub: 'FAK, Rho, focal adhesion maturation' },
    { label: 'MMP activity', sub: 'Degradation, invadopodia' },
    { label: 'Feedback', sub: 'Re-shaped matrix, invasion tracks' },
  ] as const;

  return (
    <figure className="my-8" aria-label="ECM stiffening, integrin and MMP feedback loop">
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
        <ol className="relative space-y-0 pl-0">
          {items.map((it, i) => (
            <li key={it.label} className="relative flex gap-4 pb-0">
              {i < items.length - 1 && (
                <div
                  className="absolute left-[1.1rem] top-10 h-[calc(100%-0.25rem)] w-0.5 bg-rose-200/90 dark:bg-rose-800/50"
                  aria-hidden
                />
              )}
              <div className="z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-rose-200 bg-rose-50 text-sm font-semibold text-rose-900 dark:border-rose-700/60 dark:bg-rose-950/40 dark:text-rose-100">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1 pb-8">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{it.label}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{it.sub}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-center text-sm italic text-gray-500 dark:text-gray-400">
          Self-reinforcing loop connecting mechanical, adhesive, and proteolytic programs (synthesis,
          ref-022).
        </p>
      </div>
    </figure>
  );
}
