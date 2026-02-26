import Section from '@/components/Section';
import HomeHero from '@/components/HomeHero';
import EvidenceHighlights from '@/components/EvidenceHighlights';
import TopicExploreGrid from '@/components/TopicExploreGrid';
import TabSummary from '@/components/TabSummary';
import ReferenceList from '@/components/ReferenceList';
import DefinitionWalkthrough from '@/components/DefinitionWalkthrough';
import SurvivalCurvesByStageFigure from '@/components/figures/SurvivalCurvesByStageFigure';
import SurvivalByStageBarFigure from '@/components/figures/SurvivalByStageBarFigure';
import MBCTrialsFigure from '@/components/figures/MBCTrialsFigure';
import MBCPublicationsFigure from '@/components/figures/MBCPublicationsFigure';
import { references } from '@/lib/references';

export default function Home() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeHero />
        <TabSummary section="definition" />
      </div>

      <Section
        id="definition"
        title="What is metastatic breast cancer?"
        subtitle="Step by step: what cancer is, how breast cancer becomes metastatic (MBC), and why the distinction matters"
      >
        <DefinitionWalkthrough />
      </Section>

      <Section
        title="From primary tumor to distant sites"
        subtitle="Local invasion → migration → intravasation → circulation → extravasation → colonization (lung, liver, brain, bone)"
      >
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            The diagram below illustrates the steps of the metastatic cascade—from the primary
            tumor through the bloodstream to colonization of distant organs. For more on the
            biology of the metastatic cascade, see{' '}
            <a
              href="/biology"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              Biology
            </a>
            .
          </p>
          <figure className="my-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
              <img
                src="/images/metastatic-progression-primary-to-distant.png"
                alt="Metastatic progression of breast cancer from primary site through circulation to distant secondary sites (lung, liver, brain, bone)"
                className="w-full rounded-lg"
              />
              <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
                Metastatic progression of breast cancer from the primary tumor site to distant
                secondary sites. Source:{' '}
                <a
                  href="https://www.researchgate.net/figure/Metastatic-progression-of-breast-cancer-from-the-primary-tumor-site-to-distant-secondary_fig1_371922539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  ResearchGate
                </a>
                .
              </p>
            </div>
          </figure>
        </div>
      </Section>

      <Section
        title="Evidence highlights"
        subtitle="Key findings from the literature and institutional datasets"
        evidenceType="Literature & clinical trials"
        className="section-alt"
      >
        <EvidenceHighlights />
      </Section>

      <Section
        title="Survival at a glance"
        subtitle="Population-based and study-based estimates"
        evidenceType="SEER & selected studies"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <SurvivalCurvesByStageFigure />
          <SurvivalByStageBarFigure />
        </div>
      </Section>

      <Section
        title="Research"
        subtitle="Clinical trials and recent publications"
        evidenceType="ClinicalTrials.gov & PubMed"
        className="section-alt"
      >
        <div className="space-y-8">
          <MBCTrialsFigure />
          <MBCPublicationsFigure />
        </div>
      </Section>

      <Section
        title="Explore by topic"
        className="section-alt"
      >
        <TopicExploreGrid />
      </Section>

      <Section
        title="References used"
        subtitle="Literature and PDFs cited on this page"
      >
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes. Verify page ranges against the PDFs.
          </p>
          <ReferenceList references={references} filterBy="definition" />
        </div>
      </Section>
    </div>
  );
}
