import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import TabSummary from '@/components/TabSummary';
import ReferenceList from '@/components/ReferenceList';
import CitationCallout from '@/components/CitationCallout';
import { references } from '@/lib/references';
import PageHero from '@/components/PageHero';
import BiologyIllustration from '@/components/illustrations/BiologyIllustration';

export default function BiologyPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Biology"
          theme="biology"
          illustration={<BiologyIllustration />}
        />
        <TabSummary section="biology" />
      </div>

      {/* Story: How does metastasis work? CTCs → Physical forces → Molecular diversity → Circadian → Evolution → Resistance */}
      <Section
        title="Circulating tumor cells and the metastatic cascade"
        subtitle="How tumor cells leave the primary site, survive circulation, and colonize distant organs"
      >
        <div className="space-y-6">
          <p>
            Metastatic breast cancer (MBC) remains the primary cause of breast cancer–related
            mortality, largely due to its complex, multistep dissemination process and resistance
            to conventional therapies. Central to metastasis is the behavior of circulating tumor
            cells (CTCs)—tumor cells that detach from the primary tumor, survive mechanical and
            immune stresses in circulation, and colonize distant organs.
          </p>
          <CitationCallout
            claim="Although millions of tumor cells may enter circulation daily, only a small fraction survive to form secondary lesions. CTCs must endure shear stress, immune surveillance, and oxidative damage while retaining the capacity for extravasation and colonization."
            sources={['ref-014']}
          />
          <p>
            These constraints favor phenotypically plastic cells capable of rapid mechanical
            adaptation and transient epithelial–mesenchymal transition (EMT). Notably, CTCs are
            not a homogeneous population. Clusters of CTCs, rather than single cells, exhibit
            markedly higher metastatic potential, partly due to enhanced survival signaling and
            protection from shear forces. In breast cancer, clustered CTCs often retain partial
            epithelial characteristics, challenging the assumption that complete EMT is required
            for metastasis—a hybrid phenotype that enables both motility and intercellular
            adhesion.
          </p>
          <figure className="my-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
              <img
                src="/images/mbc_progression.png"
                alt="Metastatic cascade: steps from primary tumor to distant organ colonization"
                className="max-h-[min(70vh,560px)] w-full max-w-full rounded-lg object-contain"
              />
              <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
                Metastatic cascade: from primary tumor detachment through circulation, extravasation, and colonization of distant sites. AI-generated illustration.
              </p>
            </div>
          </figure>
        </div>
      </Section>

      <Section
        title="Physical biology of circulating tumor cells"
        subtitle="Size, stiffness, shear stress—why biophysics determines who survives circulation"
        className="section-alt"
      >
        <div className="space-y-6">
          <p>
            The physical properties of CTCs play a critical role in determining metastatic
            efficiency. Compared to normal blood cells, CTCs are generally larger, stiffer, and
            less deformable—characteristics that increase their likelihood of becoming
            mechanically trapped in capillary beds.
          </p>
          <CitationCallout
            claim="While mechanical arrest was once thought to be a passive process, emerging evidence suggests that CTCs actively exploit vascular bottlenecks to initiate extravasation. Shear stress within the bloodstream acts as a selective force, eliminating mechanically fragile cells while enriching for those with reinforced cytoskeletal structures."
            sources={['ref-014']}
          />
          <p>
            Breast cancer CTCs demonstrate adaptive cytoskeletal remodeling, allowing them to
            withstand hemodynamic forces that would otherwise induce apoptosis. These findings
            highlight metastasis as a process governed not only by genetic mutations but also by
            biophysical fitness.
          </p>
        </div>
      </Section>

      <Section
        title="Molecular heterogeneity"
        subtitle="Single-cell profiling reveals diverse CTC populations—and why bulk biopsies miss them"
      >
        <div className="space-y-6">
          <p>
            Single-cell RNA sequencing (scRNA-seq) has revolutionized the study of CTC biology by
            uncovering extensive transcriptional heterogeneity within metastatic populations.
            Analyses of breast cancer CTCs reveal distinct subpopulations associated with
            stemness, immune evasion, and therapy resistance.
          </p>
          <CitationCallout
            claim="CTCs frequently express stem-cell–associated genes such as ALDH1 and SOX2, supporting the notion that metastatic competence is linked to self-renewal capacity rather than proliferative rate alone. These transcriptional programs often coexist within the same patient, complicating treatment strategies."
            sources={['ref-014']}
          />
          <p>
            scRNA-seq data demonstrate dynamic shifts in gene expression as CTCs transition
            between circulation and colonization, emphasizing metastasis as a reversible and
            adaptive process. From a clinical perspective, this heterogeneity undermines the
            predictive value of bulk tumor biopsies. Precision medicine approaches that
            incorporate longitudinal CTC profiling may therefore provide a more accurate
            representation of metastatic risk and therapeutic vulnerability.
          </p>
          <figure className="my-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
              <img
                src="/images/molecular_heterog.png"
                alt="Exploration of transcriptional heterogeneity across CTC subpopulations"
                className="mx-auto max-h-[min(70vh,560px)] w-full max-w-full rounded-lg object-contain"
              />
              <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
                Transcriptional diversity across CTC subpopulations. AI-generated illustration.
              </p>
            </div>
          </figure>
        </div>
      </Section>

      <Section
        title="Circadian regulation and sleep-associated metastasis"
        subtitle="When do CTCs disseminate? Sleep-phase release and implications for chronotherapy"
        className="section-alt"
      >
        <div className="space-y-6">
          <p>
            One of the most unexpected recent findings in breast cancer metastasis is the role of
            sleep and circadian rhythms in regulating CTC dissemination. Studies using mouse
            models and human patient samples have demonstrated that the majority of metastatic
            spread occurs during the sleep phase rather than during active periods.
          </p>
          <CitationCallout
            claim="Breast cancer CTCs collected during sleep exhibited higher proliferative capacity and increased metastatic potential compared to those collected while awake."
            sources={['ref-014']}
          />
          <p>
            This phenomenon appears to be hormonally mediated, with circadian fluctuations in
            melatonin and glucocorticoids influencing tumor cell release and survival. These
            findings challenge longstanding assumptions about constant metastatic risk and raise
            critical questions regarding the timing of therapeutic interventions. Chronotherapy
            (administering treatments at biologically optimal times) may represent an
            underexplored strategy for limiting metastatic progression in breast cancer.
          </p>
        </div>
      </Section>

      <Section
        title="Tumor evolution"
        subtitle="Clonal expansion, subclones, and selection—how tumors diversify over time"
      >
        <div className="space-y-6">
          <p>
            Tumor evolution describes how cancer populations change over time through clonal
            expansion, mutation, and selection. A founding clone acquires mutations that enable
            growth; subclones emerge with distinct genotypes and phenotypes, some of which may
            confer resistance to therapy or metastatic potential.
          </p>
          <figure className="my-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
              <img
                src="/images/tumor_evolution.jpg"
                alt="Tumor evolution: clonal expansion, branching subclones, and selection over time"
                className="max-h-[min(70vh,560px)] w-full max-w-full rounded-lg object-contain"
              />
              <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
                Clonal evolution: a founding population diversifies into subclones over time through mutation and selection. AI-generated illustration.
              </p>
            </div>
          </figure>
        </div>
      </Section>

      <Section
        title="Resistance mechanisms"
        subtitle="From CTC heterogeneity to treatment failure—and future intervention strategies"
        className="section-alt"
      >
        <div className="space-y-6">
          <p>
            The molecular heterogeneity of CTCs—including stem-cell–like programs and dynamic
            transcriptional shifts—directly contributes to treatment resistance. Therapeutic
            strategies targeting CTC clusters, mechanical adaptability, or time-dependent
            dissemination may offer novel avenues for intervention. Future research should
            integrate biophysical modeling, single-cell profiling, and longitudinal patient
            monitoring to capture the dynamic nature of metastasis.
          </p>
          <figure className="my-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
              <img
                src="/images/resistant_mechs.png"
                alt="Resistance mechanisms: molecular pathways involved in treatment resistance"
                className="max-h-[min(70vh,560px)] w-full max-w-full rounded-lg object-contain"
              />
              <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
                Molecular pathways involved in treatment resistance. AI-generated illustration.
              </p>
            </div>
          </figure>
        </div>
      </Section>

      <Section title="References used on this page" className="section-alt">
        <div className="space-y-4">
          <ReferenceList references={references} filterBy="biology" />
        </div>
      </Section>
    </div>
  );
}
