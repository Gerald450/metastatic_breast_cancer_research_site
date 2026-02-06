import Section from '@/components/Section';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';
import { ONLINE_SOURCES } from '@/lib/online-sources';
import ReferencesBySectionChart from '@/components/figures/ReferencesBySectionChart';

export default function ReferencesPage() {
  const onlineSources = Object.values(ONLINE_SOURCES);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
          References
        </h1>
        <div className="card card-hover mb-10 rounded-xl border border-gray-200 bg-gray-50/90 p-5 dark:border-gray-700 dark:bg-gray-800/60">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This page lists literature sources (PDFs) and trusted online data sources used across the site. References are tagged by topic. Each entry includes title, authors, year, journal, and a link to the local PDF where available.
          </p>
        </div>
      </div>

      <Section title="Trusted online data sources" subtitle="SEER, NCI, CDC" className="section-alt">
        <ul className="space-y-4">
          {onlineSources.map((s) => (
            <li key={s.id} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                {s.name}
              </a>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{s.citation}</p>
            </li>
          ))}
        </ul>
      </Section>

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
