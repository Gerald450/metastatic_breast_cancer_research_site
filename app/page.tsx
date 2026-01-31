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
       

        <HomeHero />

        <div className="card card-hover mb-10 rounded-xl border border-gray-200 bg-gray-50/90 p-5 dark:border-gray-700 dark:bg-gray-800/60">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This site synthesizes evidence on metastatic breast cancer from the literature (PDFs). Key metrics and figures below draw on population-based and clinical studies of survival over time, prevalence and burden, and outcomes by metastatic site. Key sources include ref-001, ref-002, ref-003, and others — see <Link href="/references" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">References</Link> for full citations and PDF links.
          </p>
        </div>
      </div>

      <Section
        title="Key metrics"
        subtitle="Notable findings from the literature"
        className="section-alt"
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
        className="section-alt"
      >
        <TopicExploreGrid />
      </Section>
    </div>
  );
}
