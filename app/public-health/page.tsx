import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import CitationCallout from '@/components/CitationCallout';
import { references } from '@/lib/references';
import PageHero from '@/components/PageHero';
import PublicHealthIllustration from '@/components/illustrations/PublicHealthIllustration';
import SurvivorshipBurdenFigure from '@/components/figures/SurvivorshipBurdenFigure';
import StateLevelBreastCancerMortalityFigure from '@/components/figures/StateLevelBreastCancerMortalityFigure';
import BreastCancerMortalityHeatMapFigure from '@/components/figures/BreastCancerMortalityHeatMapFigure';
import CauseOfDeathBreastVsOtherFigure from '@/components/figures/CauseOfDeathBreastVsOtherFigure';

export default function PublicHealthPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Public Health"
          theme="public-health"
          illustration={<PublicHealthIllustration />}
        />
        <TabSummary section="public-health" />
      </div>

      {/* Story: Burden → Mortality landscape → Cause of death → Screening/Prevention/Resources */}
      <Section
        title="Population burden"
        subtitle="How many people live with MBC—and why the number is growing"
        className="section-alt"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="Improved survival has increased the number of people living with metastatic breast cancer. Mariotto et al. and Lord et al. project ongoing growth in MBC prevalence."
            sources={['ref-011', 'ref-002']}
          />
          <SurvivorshipBurdenFigure />
        </div>
      </Section>

      <Section
        title="Mortality landscape"
        subtitle="Geographic and temporal patterns in breast cancer deaths"
      >
        <div className="space-y-8">
          <p className="text-gray-700 dark:text-gray-300">
            Mortality rates vary by geography and over time. These figures show state-level and
            temporal patterns that inform public health priorities.
          </p>
          <div className="space-y-6">
            <StateLevelBreastCancerMortalityFigure />
            <BreastCancerMortalityHeatMapFigure />
          </div>
        </div>
      </Section>

      <Section
        title="Cause of death attribution"
        subtitle="Breast cancer vs. other causes among patients with MBC"
        className="section-alt"
      >
        <div className="space-y-6">
          <CauseOfDeathBreastVsOtherFigure />
        </div>
      </Section>

      <Section
        title="Screening and early detection"
        subtitle="Current approaches and effectiveness"
      >
        <Placeholder
          label="Screening programs and strategies"
          notes={['Current screening approaches', 'Early detection methods', 'Screening program effectiveness']}
        />
      </Section>

      <Section
        title="Prevention strategies"
        subtitle="Risk reduction and population-level interventions"
        className="section-alt"
      >
        <Placeholder
          label="Prevention and risk reduction"
          notes={['Primary prevention approaches', 'Risk factor modification', 'Population-level interventions']}
        />
      </Section>

      <Section
        title="Healthcare resource utilization"
        subtitle="Costs, capacity, and system impact"
      >
        <div className="space-y-6">
          <VisualPlaceholder
            title="Healthcare utilization patterns table"
            type="table"
            description="Resource utilization metrics including hospitalizations, procedures, and costs"
          />
          <Placeholder
            label="Resource utilization analysis"
            notes={['Healthcare service utilization', 'Cost and resource allocation', 'System capacity considerations']}
          />
        </div>
      </Section>

      <Section title="References used" className="section-alt">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the PDF pages.
          </p>
          <ReferenceList references={references} filterBy="public-health" />
        </div>
      </Section>
    </div>
  );
}
