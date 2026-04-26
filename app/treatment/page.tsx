import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';
import PageHero from '@/components/PageHero';
import TreatmentIllustration from '@/components/illustrations/TreatmentIllustration';
import MBCDrugsFigure from '@/components/figures/MBCDrugsFigure';
import TopicDashboardTop from '@/components/insights/TopicDashboardTop';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function TreatmentPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Treatment"
          theme="treatment"
          illustration={<TreatmentIllustration />}
        />
        <TopicDashboardTop
          title="Treatment"
          subtitle="A dashboard view of available therapies and the evidence pipeline behind this section."
          section="treatment"
          dataAnchorId="fda-approved-drugs"
          insights={[
            {
              lead: 'Therapy landscape',
              headline:
                'Treatment spans systemic therapy, targeted therapy, and supportive care; this section is being expanded with evidence-linked summaries.',
              sources: [
                { kind: 'ref', id: 'ref-006', href: '/references#ref-006' },
                { kind: 'ref', id: 'ref-007', href: '/references#ref-007' },
              ],
            },
            {
              lead: 'FDA-approved drugs',
              headline:
                'Drug listings and labels are sourced from OpenFDA for breast cancer indications.',
              sources: [
                {
                  kind: 'data',
                  id: ONLINE_SOURCES.OPENFDA.id,
                  label: ONLINE_SOURCES.OPENFDA.name,
                  href: ONLINE_SOURCES.OPENFDA.url,
                },
              ],
            },
            {
              lead: 'Decision frameworks',
              headline:
                'Sequencing and modality guidance will be tied to clinical outcomes evidence and guideline sources as the section matures.',
              sources: [{ kind: 'ref', id: 'ref-006', href: '/references#ref-006' }],
            },
          ]}
        />
      </div>

      {/* FDA-approved drugs first so they are easy to find */}
      <Section
        id="fda-approved-drugs"
        title="FDA-approved drugs"
        subtitle="Drugs with breast cancer indications from OpenFDA"
        className="section-alt"
      >
        <MBCDrugsFigure />
      </Section>

      {/* Story: What exists → Modalities → Targeted approaches → How we sequence */}
      <Section
        title="Therapy overview"
        subtitle="General principles and treatment modality categories"
      >
        <div className="space-y-6">
          <Placeholder
            label="Treatment approach overview (planned)"
            notes={[
              'General treatment principles',
              'Treatment modality categories',
              'Multidisciplinary approach',
            ]}
          />
          <VisualPlaceholder
            title="Treatment modality overview diagram"
            type="diagram"
            description="Comprehensive overview of available treatment approaches and their relationships"
          />
        </div>
      </Section>

      <Section
        title="Treatment modalities"
        subtitle="Available options: surgery, systemic therapy, and supportive care"
      >
        <div className="space-y-6">
          <Placeholder
            label="Available treatment options"
            notes={[
              'Surgical approaches',
              'Systemic therapy options',
              'Supportive care measures',
            ]}
          />
        </div>
      </Section>

      <Section
        title="Targeted therapy"
        subtitle="Molecular targets, biomarkers, and precision approaches"
      >
        <div className="space-y-6">
          <Placeholder
            label="Targeted therapeutic approaches (planned)"
            notes={[
              'Molecular targets and pathways',
              'Targeted agent mechanisms',
              'Biomarker-guided therapy',
            ]}
          />
          <VisualPlaceholder
            title="Targeted therapy pathways chart"
            type="chart"
            description="Visualization of targeted therapy approaches and their molecular targets"
          />
        </div>
      </Section>

      <Section
        title="Treatment sequencing"
        subtitle="First-line, subsequent lines, and decision frameworks"
        className="section-alt"
      >
        <div className="space-y-6">
          <Placeholder
            label="Treatment sequencing strategies (planned)"
            notes={[
              'First-line and subsequent therapies',
              'Sequencing algorithms',
              'Treatment decision frameworks',
            ]}
          />
          <VisualPlaceholder
            title="Treatment sequencing algorithm"
            type="diagram"
            description="Decision tree showing recommended treatment sequencing based on patient factors"
          />
        </div>
      </Section>

      <Section title="References used">
        <div className="space-y-4">
          <ReferenceList references={references} filterBy="treatment" />
        </div>
      </Section>
    </div>
  );
}
