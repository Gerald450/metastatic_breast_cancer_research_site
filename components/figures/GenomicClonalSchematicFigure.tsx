/**
 * Truncal vs branched subclones and site-specific genomes (complements text; ref-023).
 */
export default function GenomicClonalSchematicFigure() {
  return (
    <figure className="my-8" aria-label="Clonal evolution and metastatic spread">
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-600 dark:bg-gray-800/40">
        <div className="mx-auto flex w-max min-w-0 max-w-4xl flex-col gap-3">
          <div className="flex items-center justify-center">
            <span className="rounded-lg border-2 border-gray-300 bg-rose-50 px-4 py-2 text-xs font-medium text-gray-900 dark:border-gray-500 dark:bg-rose-950/30 dark:text-rose-100">
              Truncal drivers
              <span className="ml-1 font-normal text-gray-600 dark:text-gray-400">
                (e.g. early TP53 / PIK3CA; often shared)
              </span>
            </span>
          </div>
          <div className="flex items-center justify-center" aria-hidden>
            <div className="h-6 w-px bg-rose-300/90 dark:bg-rose-600/50" />
          </div>
          <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6">
            <div className="text-center text-xs text-gray-600 dark:text-gray-400">
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-auto" />
              <div className="mt-0 rounded border border-dashed border-gray-300 bg-gray-50 px-2 py-1.5 text-[11px] dark:border-gray-600 dark:bg-gray-800/50">
                Subclone A
                <br />
                <span className="text-gray-500">site- or treatment-specific</span>
              </div>
            </div>
            <div className="text-center text-xs text-gray-600 dark:text-gray-400">
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-auto" />
              <div className="mt-0 rounded border border-dashed border-gray-300 bg-gray-50 px-2 py-1.5 text-[11px] dark:border-gray-600 dark:bg-gray-800/50">
                Subclone B
                <br />
                <span className="text-gray-500">further CIN / selection</span>
              </div>
            </div>
            <div className="text-center text-xs text-gray-600 dark:text-gray-400">
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-auto" />
              <div className="mt-0 rounded border border-dashed border-gray-300 bg-gray-50 px-2 py-1.5 text-[11px] dark:border-gray-600 dark:bg-gray-800/50">
                Distant organ(s)
                <br />
                <span className="text-gray-500">heterogeneous genomes</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-sm italic text-gray-500 dark:text-gray-400">
          Illustrative: metastases may emerge from subclones with distinct mutation profiles; genomic
          instability increases evolutionary degrees of freedom (synthesis, ref-023).
        </p>
      </div>
    </figure>
  );
}
