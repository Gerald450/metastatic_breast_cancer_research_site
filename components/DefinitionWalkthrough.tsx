'use client';

import { useState } from 'react';
import Link from 'next/link';
import { references } from '@/lib/references';
import ClassificationSchemaDiagram from '@/components/figures/ClassificationSchemaDiagram';
import ProgressionPathwayDiagram from '@/components/figures/ProgressionPathwayDiagram';

const steps = [
  {
    id: 'cancer',
    title: 'What is cancer?',
    content: (
      <>
        <p>
          Cancer is a disease in which cells divide uncontrollably and can invade surrounding
          tissues or spread to distant sites. Normal cells follow strict growth and division
          signals; cancer cells evade these controls. Breast cancer arises when cells in the
          breast undergo such changes.
        </p>
        <div className="my-6 rounded-xl border-l-4 border-rose-300 bg-rose-50/60 p-4 dark:border-rose-700/50 dark:bg-rose-900/20">
          <p className="font-medium text-gray-900 dark:text-white">Key point</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Cancer develops when genetic and molecular changes allow cells to bypass normal
            regulatory mechanisms. These changes accumulate over time and can enable spread
            beyond the site of origin.
          </p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          See Thompson et al. (ref-012) on knowledge gaps in breast cancer research and
          metastatic progression.
        </p>
      </>
    ),
    citation: 'ref-012',
    showDiagram: false,
  },
  {
    id: 'progression',
    title: 'What is breast cancer and how does it progress?',
    content: (
      <>
        <p>
          Breast cancer typically starts as a local tumor (stage I–III). It can remain
          confined to the breast or regional lymph nodes, or progress to distant sites.
          Staging reflects the extent of disease: local (stage I–II), regional (stage III),
          or metastatic (stage IV).
        </p>
        <ProgressionPathwayDiagram />
        <p>
          Most metastatic breast cancer arises from recurrence—cancer that was initially
          diagnosed as local or regional later returns as metastatic disease. A smaller
          proportion of patients present with de novo stage IV disease at first diagnosis
          (Caswell et al., ref-001).
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Sources: Caswell et al. (ref-001), Lord et al. (ref-002).
        </p>
      </>
    ),
    citation: 'ref-001',
    showDiagram: true,
  },
  {
    id: 'mbc',
    title: 'What is MBC (metastatic breast cancer)?',
    content: (
      <>
        <p>
          Metastatic breast cancer (MBC) is breast cancer that has spread to distant organs
          or tissues—such as bone, liver, lung, or brain—beyond the breast and regional
          lymph nodes. It is also called stage IV or advanced breast cancer.
        </p>
        <div className="my-6 rounded-xl border-l-4 border-rose-300 bg-rose-50/60 p-4 dark:border-rose-700/50 dark:bg-rose-900/20">
          <p className="font-medium text-gray-900 dark:text-white">De novo vs recurrent</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            <strong>De novo metastatic</strong> disease is diagnosed as stage IV at first
            presentation. <strong>Recurrent metastatic</strong> disease is diagnosed after a
            prior diagnosis of non-metastatic breast cancer. Population-based studies
            (e.g., Caswell et al., Lord et al.) indicate that most MBC arises from
            recurrence, not de novo presentation.
          </p>
        </div>
        <p>
          Classification systems help standardize staging, diagnostic criteria, and
          terminology across clinical and research settings.
        </p>
        <ClassificationSchemaDiagram />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Sources: Caswell et al. (ref-001), Lord et al. (ref-002), Thompson et al. (ref-012).
        </p>
      </>
    ),
    citation: 'ref-001',
    showDiagram: true,
  },
  {
    id: 'how-why',
    title: 'How and why does it become metastatic?',
    content: (
      <>
        <p>
          Metastasis occurs when cancer cells leave the primary tumor, enter the
          bloodstream or lymphatics, travel to distant sites, and establish new tumors.
          This process—the metastatic cascade—involves invasion, intravasation,
          circulation, extravasation, and colonization.
        </p>
        <p>
          Cancer cells can remain dormant at distant sites for years before reactivating,
          contributing to late recurrences (Thompson et al.). Molecular and cellular
          heterogeneity, resistance mechanisms, and microenvironment interactions all
          influence whether and when metastasis develops.
        </p>
        <div className="my-6 rounded-xl border-l-4 border-rose-300 bg-rose-50/60 p-4 dark:border-rose-700/50 dark:bg-rose-900/20">
          <p className="font-medium text-gray-900 dark:text-white">Why it matters for research</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Understanding metastatic mechanisms informs treatment and early detection
            strategies. Thompson et al. (ref-012) highlight remaining knowledge gaps in
            breast cancer research, including metastatic progression and dormancy.
          </p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Sources: Thompson et al. (ref-012).
        </p>
      </>
    ),
    citation: 'ref-012',
    showDiagram: false,
  },
];

export default function DefinitionWalkthrough() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const ref = references.find((r) => r.id === step.citation);

  return (
    <div className="space-y-8">
      {/* Step indicator */}
      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(i)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              i === currentStep
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
            }`}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      {/* Current step content */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          {step.title}
        </h2>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
          {step.content}
        </div>
        {ref && (
          <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Cite:</span>{' '}
              <Link
                href={`/references#${ref.id}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {ref.id} — {ref.authors} ({ref.year}). {ref.title}.
              </Link>
              {ref.localUrl && (
                <>
                  {' '}
                  <a
                    href={ref.localUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    [PDF]
                  </a>
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          ← Back
        </button>
        <button
          onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep === steps.length - 1}
          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
