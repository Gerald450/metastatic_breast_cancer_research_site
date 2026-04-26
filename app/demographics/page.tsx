import Section from '@/components/Section';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';
import PageHero from '@/components/PageHero';
import DemographicsIllustration from '@/components/illustrations/DemographicsIllustration';
import DemographicsDashboard from '@/components/demographics/DemographicsDashboard';

export default function DemographicsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Demographics"
          theme="demographics"
          illustration={<DemographicsIllustration />}
        />
        <DemographicsDashboard />
      </div>

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
