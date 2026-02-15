import Section from '@/components/Section';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import CitationCallout from '@/components/CitationCallout';
import { references } from '@/lib/references';
import PageHero from '@/components/PageHero';
import PublicHealthIllustration from '@/components/illustrations/PublicHealthIllustration';
import SurvivorshipBurdenFigure from '@/components/figures/SurvivorshipBurdenFigure';
import StateLevelBreastCancerMortalityFigure from '@/components/figures/StateLevelBreastCancerMortalityFigure';
import BreastCancerMortalityHeatMapFigure from '@/components/figures/BreastCancerMortalityHeatMapFigure';
import CauseOfDeathBreastVsOtherFigure from '@/components/figures/CauseOfDeathBreastVsOtherFigure';

export default function PublicHealthPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Public Health"
          theme="public-health"
          illustration={<PublicHealthIllustration />}
        />
        <TabSummary section="public-health" />
      </div>

      {/* Story: Burden → Mortality landscape → Cause of death → Screening/Prevention/Resources */}
      <Section
        title="Population burden"
        subtitle="How many people live with MBC—and why the number is growing"
        className="section-alt"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="Improved survival has increased the number of people living with metastatic breast cancer. Mariotto et al. and Lord et al. project ongoing growth in MBC prevalence."
            sources={['ref-011', 'ref-002']}
          />
          <SurvivorshipBurdenFigure />
        </div>
      </Section>

      <Section
        title="Mortality landscape"
        subtitle="Geographic and temporal patterns in breast cancer deaths"
      >
        <div className="space-y-8">
          <p className="text-gray-700 dark:text-gray-300">
            Mortality rates vary by geography and over time. These figures show state-level and
            temporal patterns that inform public health priorities.
          </p>
          <div className="space-y-6">
            <StateLevelBreastCancerMortalityFigure />
            <BreastCancerMortalityHeatMapFigure />
          </div>
        </div>
      </Section>

      <Section
        title="Cause of death attribution"
        subtitle="Breast cancer vs. other causes among patients with MBC"
        className="section-alt"
      >
        <div className="space-y-6">
          <CauseOfDeathBreastVsOtherFigure />
        </div>
      </Section>

      <Section
        title="Screening and early detection"
        subtitle="Current approaches and effectiveness"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="Current surveillance guidelines recommend regular mammography and physical examinations, with further laboratory tests and imaging only when symptomatic. These guidelines stem from 1990s trials that used relatively insensitive imaging (chest X-ray, bone scintigraphy, abdominal ultrasound) and did not include tumour marker investigations."
            sources={['ref-015']}
          />
          <CitationCallout
            claim="A reproducible tumour marker increase (CEA, CA 15-3, CA 125) from individual baseline values, followed by whole-body imaging, is highly effective for early detection of asymptomatic metastatic breast cancer—identifying recurrence in ~66% of patients with such increases."
            sources={['ref-015']}
          />
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Tumour marker monitoring
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Tumour markers CEA, CA 15-3, and CA 125 can detect 40–60% of breast cancer recurrences
              before clinical or radiological evidence of disease, with a lead-time of 2–18 months.
              Using CEA and CA 15-3 together enables early diagnosis in up to 60–80% of patients.
              Individual baseline values (rather than fixed cut-offs) improve sensitivity: increases
              entirely within the reference range can still indicate malignancy and warrant imaging{' '}
              <a
                href="#ref-015"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (ref-015)
              </a>
              .
            </p>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Whole-body imaging
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Advances in imaging—FDG-PET/CT and whole-body MRI (WB-MRI)—allow very early detection
              of distant metastases. WB-MRI offers high sensitivity for liver, bone, and brain
              metastases without ionizing radiation; FDG-PET/CT is of clinical value when prompted
              by progressive tumour marker increase. In studies of asymptomatic patients with a
              reproducible tumour marker rise, whole-body imaging detected metastases in about
              two-thirds of cases, with limited disease (≤3 lesions in a single organ) in roughly
              24%—a subgroup that may benefit from more aggressive, multidisciplinary treatment{' '}
              <a
                href="#ref-015"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (ref-015)
              </a>
              .
            </p>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Outcomes and implications
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              &quot;Tumour marker guided&quot; salvage treatment—initiating therapy at the time of elevated
              markers before radiological confirmation—has been associated with significantly
              higher 3-year survival compared with conventional treatment initiated at symptomatic
              or radiological relapse. Patients with limited metastatic disease tend to have higher
              survival rates than those with disseminated disease. Whether population-level screening
              with tumour markers and whole-body imaging improves survival requires further
              prospective randomised trials{' '}
              <a
                href="#ref-015"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (ref-015)
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Prevention strategies"
        subtitle="Risk reduction and population-level interventions"
        className="section-alt"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="Metastatic disease is the major cause of breast cancer mortality, with 5-year survival below 25%. Strategies that detect and treat metastasis-prone cancers before or soon after metastatic spread are needed to improve outcomes."
            sources={['ref-017']}
          />
          <p className="text-gray-700 dark:text-gray-300">
            Population mammographic screening, introduced widely in the mid-1980s, increased detection of
            stage I cancers and ductal carcinoma in situ, but has not yielded the expected decrease in
            mortality. This suggests that screening mammography often misses critical lesions until after
            they have spread, and may detect many lesions that will not progress to metastatic disease or
            may even regress spontaneously{' '}
            <a
              href="#ref-017"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              (ref-017)
            </a>
            .
          </p>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Omic-signature-based screening
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Genome-scale molecular analysis can reveal features uniquely associated with metastasis-prone
              disease. A tiered strategy proposes: (a) low-cost blood-based assays of molecular signatures
              to identify high-risk individuals, (b) sensitive anatomic imaging to localize lesions, and (c)
              molecular histopathological assays to characterize even small lesions. Basal-like and luminal B
              tumors are more metastasis-prone than luminal A, suggesting subtypes can guide risk-based
              screening{' '}
              <a
                href="#ref-017"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (ref-017)
              </a>
              .
            </p>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Prognostic and predictive signatures
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Gene expression signatures such as Oncotype Dx, MammaPrint, and the Rotterdam 76-gene
              signature help predict risk of relapse or distant metastasis. These can identify patients who
              may benefit from more aggressive treatment or closer monitoring. Detection of circulating
              tumor cells (CTCs) and circulating tumor DNA offers opportunities for monitoring residual
              disease and recurrence, though ASCO guidelines currently do not recommend routine
              screening beyond history and physical examination{' '}
              <a
                href="#ref-017"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (ref-017)
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Healthcare resource utilization"
        subtitle="Costs, capacity, and system impact"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="Breast cancer remains one of the most costly cancers in the United States, with an estimated $16.5 billion spent on breast cancer treatment in 2010. Among mBC patients, receipt of HER2-targeted agents is associated with the highest per-patient-per-month healthcare utilization and costs."
            sources={['ref-016']}
          />
          <p className="text-gray-700 dark:text-gray-300">
            Studies of US insured populations show that mBC patients receiving HER2-targeted therapy incur
            average per-patient-per-month (PPPM) costs of approximately $11,000–14,000—higher than those
            on other antineoplastic regimens or receiving no systemic treatment. Cost patterns differ by
            treatment status: untreated patients have the highest inpatient admissions and emergency
            department use, while HER2-targeted users have the highest outpatient visits, laboratory
            services, diagnostic radiology, radiation treatments, and prescription antineoplastics{' '}
            <a
              href="#ref-016"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              (ref-016)
            </a>
            .
          </p>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Cost drivers
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              For patients receiving systemic therapy, outpatient care—including anticancer treatments and
              medications for side effects—accounts for 48–50% of breast cancer–related costs. In contrast,
              inpatient costs represent nearly 60% of total costs for untreated patients, who often present
              with acute complications. Among HER2-targeted users, costs are higher for those without
              hormonal therapy (proxy for ER-negative), for de novo versus recurrent mBC, and for younger
              versus older patients{' '}
              <a
                href="#ref-016"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (ref-016)
              </a>
              .
            </p>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              System implications
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              As new and expensive targeted therapies become available for HER2-positive mBC,
              understanding the economic burden is important for planning healthcare costs and allocating
              resources. The introduction of more effective but costly targeted therapies has contributed to
              rising healthcare resource use among mBC patients{' '}
              <a
                href="#ref-016"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (ref-016)
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section title="References used" className="section-alt">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the PDF pages.
          </p>
          <ReferenceList references={references} filterBy="public-health" />
        </div>
      </Section>
    </div>
  );
}
