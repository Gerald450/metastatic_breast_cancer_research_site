import Section from '@/components/Section';
import HomeHero from '@/components/HomeHero';
import KeyStatsCards from '@/components/KeyStatsCards';
import TopicExploreGrid from '@/components/TopicExploreGrid';
import SurvivalTrendsFigure from '@/components/figures/SurvivalTrendsFigure';
import SEERSurvivalByStageFigure from '@/components/figures/SEERSurvivalByStageFigure';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <HomeHero />

        <div className="card card-hover mb-10 rounded-xl border border-gray-200 bg-gray-50/90 p-5 dark:border-gray-700 dark:bg-gray-800/60">
          <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            A research hub for metastatic breast cancer (MBC): definitions, biology, treatment, epidemiology, and evidence from literature and trusted data sources.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Use the <strong>navbar</strong> above for Home, Definition, Biology, and Treatment. Use the <strong>Explore by topic</strong> grid below to access Epidemiology, Demographics, Clinical Outcomes, Public Health, and References.
          </p>
        </div>
      </div>

      <Section
        title="Key metrics"
        subtitle="Notable findings from the literature (properly cited)"
        className="section-alt"
      >
        <KeyStatsCards />
      </Section>

      <Section
        title="Survival at a glance"
        subtitle="SEER population data and median survival from selected studies"
      >
        <div className="space-y-8">
          <SEERSurvivalByStageFigure />
          <SurvivalTrendsFigure />
        </div>
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
