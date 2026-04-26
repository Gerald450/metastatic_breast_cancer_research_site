/**
 * Stromal & immune crosstalk → immunosuppressive niche (ref-024).
 */
export default function TmeStromalNicheFigure() {
  return (
    <figure className="my-8" aria-label="Cancer associated fibroblasts and immune suppression">
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-slate-50/60 p-6 dark:border-gray-700 dark:bg-slate-900/20">
        <div className="mx-auto flex min-w-[18rem] max-w-2xl flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-2">
          <NicheNode title="CAF / stroma" sub="Cytokines, chemokines, matrix" tone="left" />
          <div className="hidden shrink-0 text-rose-400 sm:block" aria-hidden>
            <span className="text-2xl">⇄</span>
          </div>
          <NicheNode
            title="Immune milieu"
            sub="M2, Tregs, MDSCs, checkpoint ligands"
            tone="right"
          />
        </div>
        <div className="mt-4 rounded-lg border border-rose-100/90 bg-rose-50/50 px-4 py-2 text-center text-sm text-gray-800 dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-gray-200">
          <strong className="font-medium">Immunosuppressive niche</strong> — T cell exclusion,
          metabolic stress, and resistance to ICI
        </div>
        <p className="mt-3 text-center text-sm italic text-gray-500 dark:text-gray-400">
          Simplified crosstalk model; spatial organization and CAF subtypes add further complexity
          (synthesis, ref-024).
        </p>
      </div>
    </figure>
  );
}

function NicheNode({
  title,
  sub,
  tone,
}: {
  title: string;
  sub: string;
  tone: 'left' | 'right';
}) {
  const c =
    tone === 'left'
      ? 'border-rose-200/80 bg-white dark:border-rose-800/40 dark:bg-gray-800/50'
      : 'border-slate-200/90 bg-white dark:border-slate-600 dark:bg-gray-800/50';
  return (
    <div className={`flex-1 rounded-xl border px-4 py-3 text-center shadow-sm ${c}`}>
      <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
      <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">{sub}</span>
    </div>
  );
}
