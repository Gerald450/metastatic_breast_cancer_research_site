import Section from '@/components/Section';
import CitationCallout from '@/components/CitationCallout';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import { references } from '@/lib/references';
import MetastaticSiteOutcomesFigure from '@/components/figures/MetastaticSiteOutcomesFigure';
import SurvivalTrendsFigure from '@/components/figures/SurvivalTrendsFigure';
import SEERSurvivalByStageFigure from '@/components/figures/SEERSurvivalByStageFigure';
import SEERDistantStageBySubtypeFigure from '@/components/figures/SEERDistantStageBySubtypeFigure';
import SurvivalByMetastaticSiteFigure from '@/components/figures/SurvivalByMetastaticSiteFigure';
import SurvivalByTumorSubtypeFigure from '@/components/figures/SurvivalByTumorSubtypeFigure';
import SurvivalTimeDistributionStageIVFigure from '@/components/figures/SurvivalTimeDistributionStageIVFigure';
import SurvivalCurvesByStageFigure from '@/components/figures/SurvivalCurvesByStageFigure';
import SurvivalByYearAndSubtypeFigure from '@/components/figures/SurvivalByYearAndSubtypeFigure';
import PageHero from '@/components/PageHero';
import ClinicalIllustration from '@/components/illustrations/ClinicalIllustration';
import ProgressionPathwayDiagram from '@/components/figures/ProgressionPathwayDiagram';
export default function ClinicalOutcomesPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Clinical Outcomes"
          theme="clinical"
          illustration={<ClinicalIllustration />}
        />
        <TabSummary section="clinical-outcomes" />
      </div>

      {/* Story: Baseline → Improvement → Heterogeneity → Progression → Site outcomes → Treatment response */}
      <Section
        id="survival"
        title="Stage and prognosis: the baseline"
        subtitle="What do we expect? 5-year survival by stage and subtype from SEER"
        className="section-alt"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="Stage strongly predicts survival. Localized and regional disease have favorable outcomes; distant (metastatic) stage drops to about one-third at 5 years. Subtype further modifies prognosis."
            sources={['ref-001', 'ref-002']}
          />
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            <SEERSurvivalByStageFigure />
            <SEERDistantStageBySubtypeFigure />
          </div>
          <SurvivalCurvesByStageFigure />
        </div>
      </Section>

      <Section
        title="Improvement over time"
        subtitle="Median survival has increased across study populations"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="Survival has improved over time for patients with metastatic breast cancer, with median survival increasing across different time periods and study populations."
            sources={['ref-001', 'ref-002', 'ref-004']}
          />
          <SurvivalTrendsFigure />
        </div>
      </Section>

      <Section
        title="Heterogeneity: site and subtype"
        subtitle="Outcomes vary by metastatic site and tumor biology"
        className="section-alt"
      >
        <div className="space-y-6">
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            <SurvivalByMetastaticSiteFigure />
            <SurvivalByTumorSubtypeFigure />
          </div>
          <SurvivalTimeDistributionStageIVFigure />
          <SurvivalByYearAndSubtypeFigure />
        </div>
      </Section>

      <Section
        title="Disease progression"
        subtitle="From localized to metastatic—how breast cancer advances"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="Most metastatic disease arises from recurrence after initial treatment, not de novo stage IV. Time to progression and patterns of advancement vary by subtype, metastatic site, and treatment; registries under-capture recurrent metastatic burden."
            sources={['ref-001', 'ref-002']}
          />
          <ProgressionPathwayDiagram />
          <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Progression patterns and timelines
            </h3>
            <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-gray-100">Time to progression metrics</strong> — Median time from diagnosis or recurrence to metastatic disease (or to first progression on therapy) is reported in population and trial data; progression-free survival (PFS) and time to distant recurrence are key endpoints.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-100">Patterns of disease advancement</strong> — Disease may progress from localized to regional to distant, or present as de novo stage IV. First metastatic site (e.g. bone, viscera, brain) and subsequent spread patterns influence outcomes and are covered under site-specific outcomes.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-gray-100">Factors influencing progression</strong> — Subtype (HR+/HER2−, HER2+, TNBC), treatment history, and metastatic site are among factors that affect speed and pattern of progression; survival and treatment response sections elsewhere on this page detail these associations.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        title="Site-specific outcomes"
        subtitle="Literature on bone, liver, lung, and brain metastasis"
        className="section-alt"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="Treatment response and duration vary by metastatic site. Site-specific outcomes are reported in Bonotto, Xiao et al. and inform treatment sequencing."
            sources={['ref-006', 'ref-007']}
          />
          <MetastaticSiteOutcomesFigure />
        </div>
      </Section>

      <Section
        title="Treatment response outcomes"
        subtitle="Response rates, end points, and predictors"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="The NCI Breast Cancer Steering Committee convened a working group to define meaningful end points for MBC clinical trials. Progression-free survival (PFS) and overall survival (OS) are the primary metrics; choice depends on biologic subtype and expected post-progression survival."
            onlineSourceIds={['nci-mbc-endpoints']}
          />
          <p className="text-gray-700 dark:text-gray-300">
            Response is typically assessed using RECIST 1.1 (Response Evaluation Criteria in Solid Tumors).
            For hormone receptor–positive, HER2-negative MBC—where expected post-progression survival is
            long—PFS is the preferred primary end point; OS is often a secondary or coprimary end point.
            For triple-negative MBC, where prognosis is poorer, OS is the preferred primary end point.
            Response rates and duration of response vary by treatment line and subtype{' '}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7351338/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              (NCI Working Group)
            </a>
            .
          </p>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Key end points by subtype
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              HER2-positive disease: PFS is the end point of choice; OS may be coprimary. CDK4/6
              inhibitors combined with endocrine therapy have shown clinically significant PFS
              improvements in HR+/HER2− MBC. For novel agents, the magnitude of absolute and
              relative PFS gain must be balanced against toxicity. The working group emphasized
              integrating patient-reported outcomes and toxicity-over-time metrics into benefit
              assessment{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7351338/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (NCI Working Group)
              </a>
              .
            </p>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Treatment guidelines
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              The NCCN and ASCO provide evidence-based guidelines for metastatic breast cancer
              treatment, including sequencing of endocrine therapy, chemotherapy, and HER2-targeted
              agents. Treatment choice depends on hormone receptor and HER2 status, prior therapy,
              and performance status{' '}
              <a
                href="https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1419"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (NCCN)
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Quality of life measures"
        subtitle="Patient-reported outcomes and symptom burden"
        className="section-alt"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="For MBC, the primary goal of therapy is symptom management and life prolongation rather than cure. Health-related quality of life (HRQoL) should play a leading role in treatment decisions, with median survival after diagnosis around 3 years."
            onlineSourceIds={['mdpi-qol-mbc']}
          />
          <p className="text-gray-700 dark:text-gray-300">
            Quality of life is assessed using validated patient-reported outcome (PRO) questionnaires.
            The most commonly used instruments in MBC include the EORTC QLQ-C30 (core cancer-specific
            measure), EORTC QLQ-BR23 or QLQ-BR45 (breast cancer modules), and FACT-B (Functional
            Assessment of Cancer Therapy–Breast). These capture physical, emotional, and social
            domains; higher scores generally indicate better HRQoL{' '}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8151772/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              (Clarijs et al., Cancers 2021)
            </a>
            .
          </p>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Domains and clinical use
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              PROs assess physical functioning, symptom burden (pain, fatigue, nausea), emotional
              well-being, and social role. Routinely collecting PROs can enhance shared
              decision-making and signal changes during treatment. Disease progression is associated
              with worsened HRQoL; chemotherapy tends to show greater symptom severity than endocrine
              or targeted therapy, though outcomes vary by study design and population{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8151772/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (Clarijs et al.)
              </a>
              .
            </p>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Standardization needs
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Heterogeneity in questionnaire use across MBC studies complicates comparability.
              The EORTC is developing a dedicated metastatic breast cancer module (QLQ-BR45) for
              use with QLQ-C30 to better capture MBC-specific issues. Standardizing PRO collection
              could improve care delivery and enable valid comparisons across research{' '}
              <a
                href="https://qol.eortc.org/questionnaire/metastatic-breast-cancer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                (EORTC)
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section title="References used">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the PDF pages.
          </p>
          <ReferenceList references={references} filterBy="clinical-outcomes" />
        </div>
      </Section>
    </div>
  );
}
