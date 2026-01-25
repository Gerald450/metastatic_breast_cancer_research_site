import Section from '@/components/Section';
import HomeHero from '@/components/HomeHero';
import KeyStatsCards from '@/components/KeyStatsCards';
import TopicExploreGrid from '@/components/TopicExploreGrid';
import SurvivalTrendsFigure from '@/components/figures/SurvivalTrendsFigure';

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
