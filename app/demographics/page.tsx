import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import { references } from '@/lib/references';
import AgeRaceDistributionFigure from '@/components/figures/AgeRaceDistributionFigure';
import PageHero from '@/components/PageHero';
import DemographicsIllustration from '@/components/illustrations/DemographicsIllustration';

export default function DemographicsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Demographics"
          description="Age, sex, race, ethnicity, and socioeconomic patterns in metastatic breast cancer."
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
          <Placeholder
            label="Age-related patterns and characteristics"
            notes={[
              'Age at diagnosis distribution',
              'Age-specific incidence rates',
              'Variations across age groups',
            ]}
          />
          <AgeRaceDistributionFigure />
        </div>
      </Section>

      <Section title="Sex and Gender Patterns">
        <div className="space-y-6">
          <Placeholder
            label="Sex and gender distribution"
            notes={[
              'Sex-specific incidence patterns',
              'Gender differences in presentation',
              'Hormonal and biological factors',
            ]}
          />
        </div>
      </Section>

      <Section
        title="Socioeconomic Factors"
        className="section-alt"
      >
        <div className="space-y-6">
          <Placeholder
            label="Socioeconomic associations"
            notes={[
              'Income and education level patterns',
              'Access to healthcare impacts',
              'Socioeconomic disparities in outcomes',
            ]}
          />
        </div>
      </Section>

      <Section title="Ethnic and Racial Patterns" className="section-alt">
        <div className="space-y-6">
          <Placeholder
            label="Ethnic and racial distribution"
            notes={[
              'Racial and ethnic group variations',
              'Genetic and environmental factors',
              'Health equity considerations',
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
          <ReferenceList references={references} filterBy="demographics" />
        </div>
      </Section>
    </div>
  );
}
