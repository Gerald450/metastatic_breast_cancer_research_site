import CitationCallout from '@/components/CitationCallout';

/**
 * Developmental pathway roles in stemness and metastatic processes (ref-025).
 * Static “cards” to avoid heavy client JS.
 */
export default function CscPathwayGrid() {
  const pathways: Array<{
    name: string;
    short: string;
    metastasis: string;
  }> = [
    {
      name: 'Notch',
      short: 'Ligand–receptor cleavage, transcriptional control',
      metastasis: 'CSC self-renewal, angiogenesis, EMT contribution',
    },
    {
      name: 'Wnt / β-catenin',
      short: 'Maintains plastic populations; crosstalk with other pathways',
      metastasis: 'EMT, microenvironment crosstalk, plasticity with Notch and Hh',
    },
    {
      name: 'Hedgehog',
      short: 'CSC maintenance and TME engagement',
      metastasis: 'Survival, remodeling, resistance—often in parallel with Notch and Wnt',
    },
  ];

  return (
    <div className="my-6 space-y-4">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Metastatic competence in heterogeneous tumors intersects with developmental programs that
        sustain self-renewal. Redundant <em>crosstalk</em> complicates monotherapy; combination
        designs must account for concurrent pathway activation and plasticity in intermediate
        states.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {pathways.map((p) => (
          <div
            key={p.name}
            className="rounded-xl border border-gray-200/90 bg-gradient-to-b from-pink-50/50 to-white p-4 text-left dark:border-gray-600 dark:from-pink-950/15 dark:to-gray-800/30"
          >
            <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">{p.name}</h3>
            <p className="mt-2 text-xs text-gray-700 dark:text-gray-300">{p.short}</p>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{p.metastasis}</p>
          </div>
        ))}
      </div>
      <CitationCallout
        claim="Cancer stem–like or tumor-initiating cells reactivate Notch, Wnt/β-catenin, and Hedgehog; extensive pathway crosstalk and redundancy can confer resistance to single-pathway blockade in metastatic settings."
        sources={['ref-025']}
      />
    </div>
  );
}
