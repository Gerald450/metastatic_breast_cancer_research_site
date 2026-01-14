import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';

export default function DemographicsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
          Demographics
        </h1>
      </div>

      <Section title="Age Distribution">
        <div className="space-y-6">
          <Placeholder
            label="Age-related patterns and characteristics"
            notes={[
              'Age at diagnosis distribution',
              'Age-specific incidence rates',
              'Variations across age groups',
            ]}
          />
          <VisualPlaceholder
            title="Age distribution chart"
            type="chart"
            description="Distribution of cases across different age groups"
          />
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
          <VisualPlaceholder
            title="Sex distribution comparison table"
            type="table"
            description="Comparative data across sex and gender categories"
          />
        </div>
      </Section>

      <Section title="Socioeconomic Factors">
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

      <Section title="Ethnic and Racial Patterns">
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

      <Section title="References used on this page">
        <div className="space-y-2">
          <Placeholder
            label="Reference list placeholder"
            notes={[
              'TODO: Add demographic study citations',
              'TODO: Add age distribution sources',
              'TODO: Add socioeconomic pattern references',
            ]}
          />
        </div>
      </Section>
    </div>
  );
}
