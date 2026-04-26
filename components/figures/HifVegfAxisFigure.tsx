/**
 * Schematic: hypoxia → HIF – VEGF – vascular consequence → metastatic escape.
 * Complements the Biology page hypoxia section (ref-020).
 */
export default function HifVegfAxisFigure() {
  return (
    <figure className="my-8" aria-label="HIF to VEGF angiogenic axis">
      <div className="rounded-lg border border-gray-200 bg-gradient-to-b from-rose-50/40 to-white p-6 dark:border-gray-700 dark:from-rose-950/15 dark:to-gray-800/30">
        <div className="flex flex-col items-stretch gap-2 md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-4">
          <AxisNode title="Tumor hypoxia" sub="HIF-α stable; escapes VHL degradation" accent />
          <div className="hidden md:flex">
            <FlowArrow />
          </div>
          <div className="flex justify-center py-1 text-rose-400 dark:text-rose-500 md:hidden" aria-hidden>
            <DownChevron />
          </div>
          <AxisNode
            title="HIF–HRE program"
            sub="Transcription of pro-angiogenic and survival genes"
            accent
          />
          <div className="hidden md:flex">
            <FlowArrow />
          </div>
          <div className="flex justify-center py-1 text-rose-400 dark:text-rose-500 md:hidden" aria-hidden>
            <DownChevron />
          </div>
          <AxisNode title="VEGF ↑" sub="VEGFR signaling on endothelium" />
        </div>
        <div className="my-4 flex items-center justify-center text-gray-400 dark:text-gray-500" aria-hidden>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ConsequencePill text="Aberrant, permeable vessels" />
          <ConsequencePill text="Intravascular access & intravasation" />
          <ConsequencePill text="Pre-metastatic niche & distant colonization" />
        </div>
        <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
          Conceptual summary of the HIF–VEGF program linking oxygen sensing to angiogenesis and
          escape pathways (synthesis, ref-020).
        </p>
      </div>
    </figure>
  );
}

function AxisNode({
  title,
  sub,
  accent,
}: {
  title: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 text-center shadow-sm ${
        accent
          ? 'border-rose-200/90 bg-rose-50/80 dark:border-rose-800/50 dark:bg-rose-950/25'
          : 'border-gray-200/90 bg-white dark:border-gray-600 dark:bg-gray-800/50'
      }`}
    >
      <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
      <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">{sub}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center text-rose-400 dark:text-rose-500/90" aria-hidden>
      <svg className="h-6 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );
}

function DownChevron() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ConsequencePill({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300/80 bg-white/80 px-3 py-2 text-center text-xs font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800/40 dark:text-gray-300">
      {text}
    </div>
  );
}
