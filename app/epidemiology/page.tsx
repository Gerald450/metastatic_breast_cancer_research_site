import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import CitationCallout from '@/components/CitationCallout';
import { references } from '@/lib/references';
import { ONLINE_SOURCES } from '@/lib/online-sources';
import PageHero from '@/components/PageHero';
import EpidemiologyIllustration from '@/components/illustrations/EpidemiologyIllustration';
import MBCSurvivalOverTimeFigure from '@/components/figures/MBCSurvivalOverTimeFigure';
import MBCSurvivorshipPopulationGrowthFigure from '@/components/figures/MBCSurvivorshipPopulationGrowthFigure';
import BreastCancerMortalityRatesFigure from '@/components/figures/BreastCancerMortalityRatesFigure';
import DeNovoStageIVIncidenceFigure from '@/components/figures/DeNovoStageIVIncidenceFigure';

const seerSource = ONLINE_SOURCES.SEER_NOV_2023;

export default function EpidemiologyPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Epidemiology"
          description="Prevalence, incidence, geographic distribution, and temporal trends in metastatic breast cancer."
          theme="epidemiology"
          illustration={<EpidemiologyIllustration />}
        />
        <TabSummary section="epidemiology" />
      </div>

      <Section
        title="Prevalence and Incidence"
        className="section-alt"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="Population-based incidence and prevalence of MBC are tracked by cancer registries. SEER (NCI) provides US surveillance data. Lord et al. and Mariotto et al. report England and US trends."
            sources={['ref-002', 'ref-011']}
          />
          <MBCSurvivalOverTimeFigure />
          <MBCSurvivorshipPopulationGrowthFigure />
          <DeNovoStageIVIncidenceFigure />
          <p className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-700 dark:bg-gray-800/50">
            <strong>Trusted data source:</strong>{' '}
            <a href={seerSource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
              {seerSource.name}
            </a>
            {' — '}{seerSource.citation}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            For prevalence and survivorship burden figures, see{' '}
            <a href="/public-health" className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
              Public Health
            </a>.
          </p>
        </div>
      </Section>

      <Section
        title="Temporal Trends"
        subtitle="Changes over time"
        className="section-alt"
      >
        <div className="space-y-6">
          <BreastCancerMortalityRatesFigure />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            For survival trends over time from selected studies, see{' '}
            <a href="/clinical-outcomes#survival" className="font-medium text-emerald-600 dark:text-emerald-400 underline hover:no-underline">
              Survival outcomes
            </a>{' '}
            on the Clinical Outcomes page.
          </p>
        </div>
      </Section>

      <Section title="Epidemiological Factors" className="section-alt">
        <div className="space-y-6">
          <Placeholder
            label="Risk factors and associations"
            notes={[
              'Identified risk factors',
              'Environmental and lifestyle associations',
              'Genetic and familial patterns',
            ]}
          />
        </div>
      </Section>

      <Section title="References Used">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the
            PDF pages.
          </p>
          <ReferenceList references={references} filterBy="epidemiology" />
        </div>
      </Section>
    </div>
  );
}
