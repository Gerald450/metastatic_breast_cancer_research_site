import Section from '@/components/Section';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';
import ReferencesBySectionChart from '@/components/figures/ReferencesBySectionChart';

export default function ReferencesPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
          References
        </h1>
        <div className="card card-hover mb-10 rounded-xl border border-gray-200 bg-gray-50/90 p-5 dark:border-gray-700 dark:bg-gray-800/60">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This page lists all literature sources (PDFs) used across the site. References are tagged by topic (Definition, Epidemiology, Demographics, Clinical Outcomes, Public Health). Each entry includes title, authors, year, journal, and a link to the local PDF where available. Page highlights and excerpt hints are listed as notes and should be verified against the PDFs.
          </p>
        </div>
      </div>

      <Section
        title="Literature overview"
        subtitle="Source coverage across site sections"
        className="section-alt"
      >
        <ReferencesBySectionChart />
      </Section>

      <Section title="All References">
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            Reference list for all sources used across the site. Use the filter
            buttons below to view references by section.
          </p>
          <ReferenceList references={references} />
        </div>
      </Section>
    </div>
  );
}
