'use client';

import { useState } from 'react';

const STEPS: Array<{
  id: string;
  label: string;
  detail: string;
}> = [
  {
    id: 'sense',
    label: '1. Sensing & HIF',
    detail:
      'Tumor outgrowth can exceed perfusion, stabilizing HIF-α. HIFs promote survival programs and pro-angiogenic output including VEGF, coupling oxygen status to tissue remodeling and invasive behavior.',
  },
  {
    id: 'vascular',
    label: '2. Dysfunctional vasculature',
    detail:
      'VEGF-driven neovasculature is often leaky and structurally disorganized. Permeable vessels and abnormal flow can facilitate intravasation while perpetuating local hypoxia, selecting for more aggressive behavior.',
  },
  {
    id: 'tissue',
    detail:
      'Hypoxia and HIF signaling contribute to EMT, matrix remodeling, and motility—converging with the broader epithelial–mesenchymal plasticity programs covered elsewhere on this page.',
    label: '3. Tissue & phenotype programs',
  },
  {
    id: 'systemic',
    label: '4. Distant opportunity',
    detail:
      'Beyond the primary site, HIF-related biology links to pre-metastatic conditioning and organ-specific colonization, framing therapeutic co-targeting of angiogenesis and stress pathways as an active but resistance-prone field.',
  },
];

/**
 * Click-through steps to compress dense hypoxia narrative; pairs with HifVegfAxisFigure and ref-020.
 */
export default function HypoxiaDrivenEscapeSteps() {
  const [active, setActive] = useState(0);

  return (
    <div
      className="my-6 rounded-xl border border-rose-100/90 bg-rose-50/30 p-4 dark:border-rose-900/25 dark:bg-rose-950/15"
      role="region"
      aria-label="Step-by-step hypoxia and escape sequence"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-rose-800/90 dark:text-rose-200/90">
        Interactive: hypoxia-driven programs
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition sm:text-sm ${
              i === active
                ? 'bg-rose-200/90 text-rose-950 dark:bg-rose-800/60 dark:text-rose-50'
                : 'bg-white/90 text-gray-600 hover:bg-rose-100/50 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-rose-900/30'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="mt-4 min-h-[5rem] text-sm leading-relaxed text-gray-800 dark:text-gray-200">
        {STEPS[active]!.detail}
      </p>
    </div>
  );
}
