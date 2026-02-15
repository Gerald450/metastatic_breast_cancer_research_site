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

const seerSource = ONLINE_SOURCES.SEER_NOV_2023;
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
          <CitationCallout
            claim="Disparities in metastatic burden and outcomes vary by race, age, and tumor subtype. Hendrick et al. report higher metastatic burden among non-Hispanic Black women; Xiao et al. identify risk factors and survival patterns for breast cancer with lung metastasis."
            sources={['ref-005', 'ref-007']}
          />
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Risk factors for breast cancer—the primary disease from which most MBC arises—are well characterized by the CDC and NCI. Most breast cancers occur in women 50 and older; risk is influenced by a combination of genetic, reproductive, and lifestyle factors.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Non-modifiable factors</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Family history of breast or ovarian cancer; BRCA1/BRCA2 mutations</li>
                  <li>Personal history of breast cancer or certain benign breast diseases</li>
                  <li>Dense breasts; reproductive history (early menarche, late menopause)</li>
                  <li>Prior chest radiation; age (risk increases with age)</li>
                </ul>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Modifiable factors</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Alcohol consumption; being overweight or obese after menopause</li>
                  <li>Physical inactivity; hormone therapy (estrogen + progesterone, &gt;5 years)</li>
                  <li>Reproductive choices (first pregnancy after 30, not breastfeeding)</li>
                </ul>
              </div>
            </div>
            <p className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-700 dark:bg-gray-800/50">
              <strong>Trusted source:</strong>{' '}
              <a href={cdcRiskSource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                {cdcRiskSource.name}
              </a>
              {' — '}{cdcRiskSource.citation}
            </p>
          </div>
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
