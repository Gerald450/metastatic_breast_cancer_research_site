import Section from '@/components/Section';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import { references } from '@/lib/references';
import PageHero from '@/components/PageHero';
import DefinitionIllustration from '@/components/illustrations/DefinitionIllustration';
import DefinitionWalkthrough from '@/components/DefinitionWalkthrough';

export default function DefinitionPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Definition"
          description="Clinical definition, diagnostic criteria, classification systems, and key terminology for metastatic breast cancer."
          theme="definition"
          illustration={<DefinitionIllustration />}
        />
        <TabSummary section="definition" />
      </div>

      <Section
        title="Interactive walkthrough"
        subtitle="Understand what cancer is, how breast cancer becomes metastatic (MBC), and why"
      >
        <DefinitionWalkthrough />
      </Section>

      <Section title="References used" subtitle="Literature and PDFs cited on this page" className="section-alt">
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
