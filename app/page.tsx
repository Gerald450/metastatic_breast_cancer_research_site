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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
        <div className="grid gap-8 md:grid-cols-2">
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
