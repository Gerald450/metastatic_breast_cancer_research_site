import Section from '@/components/Section';
import HomeHero from '@/components/HomeHero';
import KeyStatsCards from '@/components/KeyStatsCards';
import TopicExploreGrid from '@/components/TopicExploreGrid';
import SurvivalTrendsFigure from '@/components/figures/SurvivalTrendsFigure';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Project Status Banner */}
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-3 shadow-sm dark:border-amber-800/50 dark:bg-amber-900/10">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Draft — content placeholders included
          </p>
        </div>

        <HomeHero />

        <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-700 dark:bg-gray-800/50">
          <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Summary for researchers
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This site synthesizes evidence on metastatic breast cancer from the literature (PDFs). Key metrics and figures below draw on population-based and clinical studies of survival over time, prevalence and burden, and outcomes by metastatic site. Key sources include Caswell et al. (2018), Lord et al. (2019), Mariotto et al. (2017), and others — see <Link href="/references" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">References</Link> for full citations and PDF links.
          </p>
        </div>
      </div>

      <Section
        title="Key metrics"
        subtitle="Notable findings from the literature"
        className="bg-gray-50/70 dark:bg-gray-800/40"
      >
        <KeyStatsCards />
      </Section>

      <Section
        title="Survival at a glance"
        subtitle="Median survival over time from selected studies"
      >
        <SurvivalTrendsFigure />
      </Section>

      <Section
        title="Explore by topic"
        subtitle="Browse evidence by category"
        className="bg-gray-50/70 dark:bg-gray-800/40"
      >
        <TopicExploreGrid />
      </Section>
    </div>
  );
}
