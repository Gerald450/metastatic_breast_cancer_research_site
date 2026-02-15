import Section from '@/components/Section';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import CitationCallout from '@/components/CitationCallout';
import { references } from '@/lib/references';
import MBCIncidenceByAgeFigure from '@/components/figures/MBCIncidenceByAgeFigure';
import MBCIncidenceByRaceFigure from '@/components/figures/MBCIncidenceByRaceFigure';
import MBCSurvivalByRaceFigure from '@/components/figures/MBCSurvivalByRaceFigure';
import SexDistributionBreastCancerFigure from '@/components/figures/SexDistributionBreastCancerFigure';
import AgeAtDiagnosisVsDeathFigure from '@/components/figures/AgeAtDiagnosisVsDeathFigure';
import InsuranceVsStageAtDiagnosisFigure from '@/components/figures/InsuranceVsStageAtDiagnosisFigure';
import SEERIncidenceTrendsByAgeFigure from '@/components/figures/SEERIncidenceTrendsByAgeFigure';
import SEERIncidenceTrendsByRaceFigure from '@/components/figures/SEERIncidenceTrendsByRaceFigure';
import BreastCancerMedianAgeBySubtypeFigure from '@/components/figures/BreastCancerMedianAgeBySubtypeFigure';
import HRPlusHer2NegTrendsByAgeFigure from '@/components/figures/HRPlusHer2NegTrendsByAgeFigure';
import HRPlusHer2PosIncidenceByRaceFigure from '@/components/figures/HRPlusHer2PosIncidenceByRaceFigure';
import PageHero from '@/components/PageHero';
import DemographicsIllustration from '@/components/illustrations/DemographicsIllustration';

export default function DemographicsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Demographics"
          theme="demographics"
          illustration={<DemographicsIllustration />}
        />
        <TabSummary section="demographics" />
      </div>

      {/* Story: Who is affected? → Age & sex → Racial disparities → Socioeconomic → Subtypes */}
      <Section
        title="Who is affected"
        subtitle="Age, sex, and the distribution of MBC across populations"
        className="section-alt"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="MBC disproportionately affects women, with incidence rising with age. Male breast cancer is rare but often diagnosed at later stages with poorer outcomes. Racial and socioeconomic disparities in burden and survival are well documented."
            sources={['ref-005', 'ref-013']}
          />
          <div>
            <h3 className="heading-card mb-4 text-gray-900 dark:text-white">Sex distribution</h3>
            <SexDistributionBreastCancerFigure />
          </div>
          <div>
            <h3 className="heading-card mb-4 text-gray-900 dark:text-white">Age patterns</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Incidence and age at diagnosis vary by tumor subtype. These figures show how MBC is distributed across age groups and how trends have changed over time.
            </p>
            <div className="space-y-6">
              <MBCIncidenceByAgeFigure />
              <HRPlusHer2NegTrendsByAgeFigure />
              <SEERIncidenceTrendsByAgeFigure />
              <AgeAtDiagnosisVsDeathFigure />
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Racial and ethnic disparities"
        subtitle="Higher metastatic burden among non-Hispanic Black women; survival disparities by race"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="Non-Hispanic Black women experience higher metastatic burden at diagnosis and shorter survival compared to other racial and ethnic groups. Incidence trends and survival patterns vary by race and require population-level surveillance."
            sources={['ref-005', 'ref-008']}
          />
          <div className="space-y-6">
            <MBCIncidenceByRaceFigure />
            <HRPlusHer2PosIncidenceByRaceFigure />
            <SEERIncidenceTrendsByRaceFigure />
            <MBCSurvivalByRaceFigure />
          </div>
        </div>
      </Section>

      <Section
        title="Socioeconomic factors"
        subtitle="Insurance status and access influence stage at diagnosis"
        className="section-alt"
      >
        <div className="space-y-6">
          <InsuranceVsStageAtDiagnosisFigure />
        </div>
      </Section>

      <Section
        title="Tumor subtypes by age"
        subtitle="Median age at diagnosis varies by subtype—linking biology to demographics"
      >
        <div className="space-y-6">
          <BreastCancerMedianAgeBySubtypeFigure />
        </div>
      </Section>

      <Section title="References used" className="section-alt">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the PDF pages.
          </p>
          <ReferenceList references={references} filterBy="demographics" />
        </div>
      </Section>
    </div>
  );
}
