import Section from '@/components/Section';
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
import SEERIncidenceTrendsByRaceFigure from '@/components/figures/SEERIncidenceTrendsByRaceFigure';
import HRPlusHer2NegTrendsByAgeFigure from '@/components/figures/HRPlusHer2NegTrendsByAgeFigure';
import HRPlusHer2NegStageDistributionFigure from '@/components/figures/HRPlusHer2NegStageDistributionFigure';

const seerSource = ONLINE_SOURCES.SEER_NOV_2024;
const seerBreastSource = ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST;
const cdcRiskSource = ONLINE_SOURCES.CDC_BREAST_CANCER_RISK;

export default function EpidemiologyPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Epidemiology"
          theme="epidemiology"
          illustration={<EpidemiologyIllustration />}
        />
        <TabSummary section="epidemiology" />
      </div>

      {/* Story: Scale of MBC → New cases → Trends over time → Risk factors */}
      <Section
        title="The growing MBC population"
        subtitle="More people are living with metastatic breast cancer due to improved survival"
        className="section-alt"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="Population-based incidence and prevalence of MBC are tracked by cancer registries. SEER (NCI) provides US surveillance data. Lord et al. and Mariotto et al. report England and US survivorship growth."
            sources={['ref-002', 'ref-011']}
          />
          <div className="space-y-6">
            <MBCSurvivorshipPopulationGrowthFigure />
            <MBCSurvivalOverTimeFigure />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            For survivorship burden and mortality figures, see{' '}
            <a href="/public-health" className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
              Public Health
            </a>.
          </p>
        </div>
      </Section>

      <Section
        title="New cases: incidence and stage"
        subtitle="De novo stage IV incidence and how subtypes present at diagnosis"
      >
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            A proportion of breast cancers present as metastatic (stage IV) at first diagnosis.
            Tumor subtype influences both incidence and stage distribution.
          </p>
          <DeNovoStageIVIncidenceFigure />
          <HRPlusHer2NegStageDistributionFigure />
        </div>
      </Section>

      <Section
        title="Trends over time"
        subtitle="Mortality, incidence, and how patterns are changing"
        className="section-alt"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="Breast cancer mortality has declined over recent decades. Incidence trends vary by age and race—with rising trends in some groups. Survival trends are covered in Clinical Outcomes."
            sources={['ref-001', 'ref-004']}
          />
          <div className="space-y-6">
            <BreastCancerMortalityRatesFigure />
            <HRPlusHer2NegTrendsByAgeFigure />
            <SEERIncidenceTrendsByRaceFigure />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            For survival trends over time from selected studies, see{' '}
            <a href="/clinical-outcomes#survival" className="font-medium text-emerald-600 dark:text-emerald-400 underline hover:no-underline">
              Survival outcomes
            </a>{' '}
            on the Clinical Outcomes page.
          </p>
        </div>
      </Section>

      <Section
        title="Risk factors and data sources"
        subtitle="Context for interpreting epidemiological data"
      >
        <div className="space-y-4">
          <CitationCallout
            claim="Disparities in metastatic burden and outcomes vary by race, age, and tumor subtype. Hendrick et al. report higher metastatic burden among non-Hispanic Black women."
            sources={['ref-005', 'ref-007']}
          />
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Risk factors for breast cancer—the primary disease from which most MBC arises—are well
            characterized by the CDC and NCI. Most breast cancers occur in women 50 and older; risk
            is influenced by genetic, reproductive, and lifestyle factors.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="heading-card mb-2 text-gray-900 dark:text-white">Non-modifiable factors</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                <li>Family history; BRCA1/BRCA2 mutations</li>
                <li>Personal history of breast cancer</li>
                <li>Dense breasts; reproductive history</li>
                <li>Prior chest radiation; age</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="heading-card mb-2 text-gray-900 dark:text-white">Modifiable factors</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                <li>Alcohol; obesity after menopause</li>
                <li>Physical inactivity</li>
                <li>Hormone therapy; reproductive choices</li>
              </ul>
            </div>
          </div>
          <p className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-700 dark:bg-gray-800/50">
            <strong>Data sources:</strong>{' '}
            <a href={seerSource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">{seerSource.name}</a>
            {' — '}{seerSource.citation}. Breast cancer subtype data:{' '}
            <a href={seerBreastSource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">{seerBreastSource.name}</a>.
            {' '}<a href={cdcRiskSource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">{cdcRiskSource.name}</a>.
          </p>
        </div>
      </Section>

      <Section title="References used" className="section-alt">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the PDF pages.
          </p>
          <ReferenceList references={references} filterBy="epidemiology" />
        </div>
      </Section>
    </div>
  );
}
