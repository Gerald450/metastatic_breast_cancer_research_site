import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import { references } from '@/lib/references';
import AgeRaceDistributionFigure from '@/components/figures/AgeRaceDistributionFigure';
import MBCIncidenceByAgeFigure from '@/components/figures/MBCIncidenceByAgeFigure';
import MBCIncidenceByRaceFigure from '@/components/figures/MBCIncidenceByRaceFigure';
import MBCSurvivalByRaceFigure from '@/components/figures/MBCSurvivalByRaceFigure';
import SexDistributionBreastCancerFigure from '@/components/figures/SexDistributionBreastCancerFigure';
import AgeAtDiagnosisVsDeathFigure from '@/components/figures/AgeAtDiagnosisVsDeathFigure';
import InsuranceVsStageAtDiagnosisFigure from '@/components/figures/InsuranceVsStageAtDiagnosisFigure';
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

      <Section
        title="Age Distribution"
        className="section-alt"
      >
        <div className="space-y-6">
          <MBCIncidenceByAgeFigure />
          <AgeAtDiagnosisVsDeathFigure />
          <AgeRaceDistributionFigure />
        </div>
      </Section>

      <Section title="Sex and Gender Patterns">
        <div className="space-y-6">
          <SexDistributionBreastCancerFigure />
        </div>
      </Section>

      <Section
        title="Socioeconomic Factors"
        className="section-alt"
      >
        <div className="space-y-6">
          <InsuranceVsStageAtDiagnosisFigure />
        </div>
      </Section>

      <Section title="Ethnic and Racial Patterns" className="section-alt">
        <div className="space-y-6">
          <MBCIncidenceByRaceFigure />
          <MBCSurvivalByRaceFigure />
        </div>
      </Section>

      <Section title="References Used">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the
            PDF pages.
          </p>
          <ReferenceList references={references} filterBy="demographics" />
        </div>
      </Section>
    </div>
  );
}
