import Section from '@/components/Section';
import ReferenceList from '@/components/ReferenceList';
import CitationCallout from '@/components/CitationCallout';
import { references } from '@/lib/references';
import PageHero from '@/components/PageHero';
import BiologyIllustration from '@/components/illustrations/BiologyIllustration';
import TopicDashboardTop from '@/components/insights/TopicDashboardTop';
import CollapsibleBiologyBlock from '@/components/biology/CollapsibleBiologyBlock';
import HypoxiaDrivenEscapeSteps from '@/components/biology/HypoxiaDrivenEscapeSteps';
import CscPathwayGrid from '@/components/biology/CscPathwayGrid';
import HifVegfAxisFigure from '@/components/figures/HifVegfAxisFigure';
import EcmInvasionLoopFigure from '@/components/figures/EcmInvasionLoopFigure';
import TmeStromalNicheFigure from '@/components/figures/TmeStromalNicheFigure';
import GenomicClonalSchematicFigure from '@/components/figures/GenomicClonalSchematicFigure';
import MolecularHeterogeneityLandscape from '@/components/figures/MolecularHeterogeneityLandscape';

export default function BiologyPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Biology"
          theme="biology"
          illustration={<BiologyIllustration />}
        />
        <TopicDashboardTop
          title="Biology"
          subtitle="A dashboard view of mechanisms: dissemination, microenvironment, and evolution—each tied to key sources."
          section="biology"
          dataAnchorId="ctc-cascade"
          insights={[
            {
              lead: 'Dissemination mechanics',
              headline:
                'CTCs face mechanical and immune constraints; only a minority complete the metastatic cascade.',
              sources: [{ kind: 'ref', id: 'ref-014', href: '/references#ref-014' }],
            },
            {
              lead: 'Plasticity programs',
              headline:
                'Epithelial–mesenchymal plasticity (EMT/MET and hybrid states) is implicated in invasion and adaptation, with context-dependent roles.',
              sources: [
                { kind: 'ref', id: 'ref-018', href: '/references#ref-018' },
                { kind: 'ref', id: 'ref-021', href: '/references#ref-021' },
              ],
            },
            {
              lead: 'Evolution & resistance',
              headline:
                'Clonal evolution and microenvironmental pressures contribute to heterogeneity and resistance in metastatic disease.',
              sources: [
                { kind: 'ref', id: 'ref-012', href: '/references#ref-012' },
                { kind: 'ref', id: 'ref-023', href: '/references#ref-023' },
              ],
            },
          ]}
        />
      </div>

      <Section
        id="ctc-cascade"
        title="Circulating tumor cells and the metastatic cascade"
        subtitle="How tumor cells leave the primary site, survive circulation, and colonize distant organs"
      >
        <div className="space-y-6">
          <p>
            Metastatic breast cancer (MBC) remains a leading cause of breast cancer–related
            mortality, largely due to the multistep nature of dissemination and the evolution of
            therapy-resistant phenotypes. Circulating tumor cells (CTCs)—cells shed from the
            primary or metastatic sites that survive the vasculature—are central to understanding
            how disease becomes systemic.
          </p>
          <CitationCallout
            claim="Although many tumor cells may enter circulation, only a minority complete the cascade; CTCs face shear stress, immune attack, and oxidative damage while retaining capacity for extravasation and organ colonization."
            sources={['ref-014']}
          />
          <p>
            CTCs are not uniform: clusters can show greater metastatic potential than single cells,
            and hybrid epithelial / mesenchymal phenotypes support both motility and cohesion. These
            observations sit within a broader framework of epithelial–mesenchymal plasticity
            (EMP), where cells move between states along a spectrum rather than as a simple
            on–off switch.
          </p>
          <CitationCallout
            claim="EMP encompasses both EMT and mesenchymal–epithelial transition (MET). Hybrid E/M states can carry high metastatic and tumor-initiating potential; partial EMT is linked to collective invasion, whereas more mesenchymal programs can favor single-cell dissemination—context and timing matter."
            sources={['ref-018', 'ref-021']}
          />
          <p>
            EMT is regulated by conserved pathways (for example TGF-β, Wnt, and Notch) that can be
            co-opted in malignancy. The EMT–MET idea—that cells may transiently lose epithelial
            traits to travel and re-acquire them to grow at a secondary site—connects to how CTCs
            and macrometastases are studied in the clinic and in single-cell data.
          </p>
          <CitationCallout
            claim="EMT programs are driven in part by TGF-β, Wnt, and Notch; plasticity between states supports adaptation in circulation, at secondary sites, and under treatment pressure."
            sources={['ref-019']}
          />
          <CollapsibleBiologyBlock title="In vivo evidence, MET, and why “EMT only” is incomplete">
            <p>
              Lineage-tracing in mouse models supports that EMT-like programs occur during
              spontaneous progression; EMT-like cells can be enriched at invasive edges and among
              CTCs, yet the fraction in “full” EMT is often small—partial or transient states may
              suffice. Genetic loss of specific EMT transcription factors has{' '}
              <em>context-specific</em> effects across tumor types, complicating a single rule for
              all breast cancers. Metastatic deposits often re-express epithelial markers, aligning
              with a model in which effective colonization and outgrowth may require epithelial
              characteristics or MET, not permanent mesenchymal locking.
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Synthesized in ref-021; also see ref-018 and ref-019 for mechanistic and signaling
              context.
            </p>
          </CollapsibleBiologyBlock>
          <figure className="my-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
              <img
                src="/images/mbc_progression.png"
                alt="Metastatic cascade: steps from primary tumor to distant organ colonization"
                className="max-h-[min(70vh,560px)] w-full max-w-full rounded-lg object-contain"
              />
              <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
                Metastatic cascade: from primary tumor detachment through circulation,
                extravasation, and colonization of distant sites. AI-generated illustration.
              </p>
            </div>
          </figure>
        </div>
      </Section>

      <Section
        id="hypoxia-hif-vegf"
        title="Hypoxia, HIF, and VEGF-driven angiogenesis"
        subtitle="Oxygen sensing, neovascularization, and how tumors exploit vascular dysfunction to support escape"
        className="section-alt"
      >
        <div className="space-y-6">
          <p>
            As solid tumors outgrow their blood supply, hypoxia becomes an active driver of
            reprogramming—not merely a passive stress. Hypoxia-inducible factors (HIFs), especially
            HIF-α together with HIF-β, orchestrate responses to low oxygen, including
            pro-angiogenic and survival programs; under normoxia, HIF-α is typically hydroxylated
            and degraded via the VHL pathway, whereas in hypoxia, stabilized HIF-α drives
            hypoxia-response element (HRE)–mediated transcription.
          </p>
          <CitationCallout
            claim="VEGF is a key HIF-inducible, secreted factor: it promotes endothelial proliferation, migration, and permeability, contributing to the abnormal tumor vasculature that can both support perfusion and facilitate transendothelial escape."
            sources={['ref-020']}
          />
          <p>
            Dysfunctional angiogenesis can perpetuate hypoxia, selecting for more aggressive
            behavior; hypoxia, in turn, feeds programs that support invasion, matrix changes, and
            coordination with the broader EMT and microenvironmental signaling described elsewhere
            on this page.
          </p>
          <HifVegfAxisFigure />
          <HypoxiaDrivenEscapeSteps />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Anti-VEGF and HIF-related strategies are established in some tumor types; compensatory
            pathway activation and persisting hypoxia contribute to clinical resistance, underscoring
            combination and biomarker need (ref-020).
          </p>
        </div>
      </Section>

      <Section
        id="physical-ctc"
        title="Physical biology of circulating tumor cells"
        subtitle="Size, stiffness, shear—how biophysical selection shapes who survives in blood"
      >
        <div className="space-y-6">
          <p>
            Physical properties of CTCs help determine which cells persist after intravasation.
            Relative to many blood elements, CTCs can be larger, stiffer, and less deformable, which
            influences mechanical trapping in capillary beds; shear in flow also selects for
            robust cytoskeletal and survival programs.
          </p>
          <CitationCallout
            claim="Data support that mechanical arrest is not only passive: cells can interface with vascular bottlenecks; shear can eliminate fragile cells and enrich for cytoskeletally reinforced, metastasis-prone subpopulations."
            sources={['ref-014']}
          />
          <p>
            In breast CTCs, adaptive cytoskeletal changes illustrate how metastasis is governed as
            much by functional cell mechanics as by mutation alone—overlapping conceptually with ECM
            and integrin-mediated tension in tissues (see below).
          </p>
        </div>
      </Section>

      <Section
        id="ecm-invasion"
        title="ECM stiffening, integrins, and proteolytic remodeling"
        subtitle="How matrix mechanics and adhesion co-evolve with invasion in tissue"
        className="section-alt"
      >
        <div className="space-y-6">
          <p>
            The extracellular matrix (ECM) is a dynamic source of both structure and instruction.
            In cancer, increased collagen deposition, cross-linking (e.g. lysyl oxidase–family
            activity), and fibroblast activity raise stiffness and reorient matrix fibers, feeding
            migration and EMT programs.
          </p>
          <CitationCallout
            claim="Integrins couple ECM mechanics to the cytoskeleton: focal adhesion kinase, Src, and Rho GTPase pathways translate stiffness into invasive behavior; matrix metalloproteinases (MMPs) break down barriers, release sequestered factors, and participate in a feedback loop with integrin engagement."
            sources={['ref-022']}
          />
          <p>
            Invasion is therefore a mechanical–biochemical system: stiffer microenvironments can
            augment integrin signaling, which can increase protease output; MMP activity reshapes the
            matrix, further biasing cell trajectories. Immune and stromal cells, discussed next, sit
            within the same three-dimensional and signaling landscape.
          </p>
          <EcmInvasionLoopFigure />
        </div>
      </Section>

      <Section
        id="heterogeneity"
        title="Molecular heterogeneity"
        subtitle="Single-cell views of CTCs and how bulk sampling can miss the spread-capable tail"
      >
        <div className="space-y-6">
          <p>
            scRNA-seq and related approaches show transcriptionally distinct CTC-related states,
            including programs linked to stemness, stress resistance, and immune evasion, sometimes
            coexisting within a patient. Dynamic shifts in gene expression as cells move between
            blood and parenchyma support the view of metastasis as a reversible, selective
            process—consistent with the plasticity themes above.
          </p>
          <CitationCallout
            claim="Markers of stem-like and plastic states are observed in CTCs; this heterogeneity limits what a one-time primary biopsy may capture and motivates longitudinal, circulating, or multi-site assessment where feasible."
            sources={['ref-014', 'ref-017', 'ref-018']}
          />
          <p>
            A tumor-initiating / cancer stem cell perspective (next section) intersects with these
            molecular portraits: the same samples may be interpreted through plasticity, stem
            program reactivation, or clonal history—complementary, not exclusive, lenses.
          </p>
          <MolecularHeterogeneityLandscape />
        </div>
      </Section>

      <Section
        id="tme-stromal-immune"
        title="Tumor microenvironment: stromal and immune crosstalk"
        subtitle="CAFs, immune populations, and immunosuppressive niches in three-dimensional context"
        className="section-alt"
      >
        <div className="space-y-6">
          <p>
            Cancer-associated fibroblasts (CAFs) and other stromal cells are abundant in many solid
            tumors, with subtypes (e.g. inflammatory vs myofibroblastic) that differ in spatial
            pattern and function. Through cytokines, chemokines, growth factors, and matrix
            remodeling, CAFs help recruit and polarize immune cells—often favoring
            immune-suppressive populations and excluding effector T cells from tumor regions.
          </p>
          <CitationCallout
            claim="Mesenchymal stromal cell–like populations can also dampen T cell activity and modulate checkpoint pathways, contributing to a metabolically and physically hostile milieu. Together, stromal–immune networks generate immunosuppressive niches with consequences for immune therapy sensitivity."
            sources={['ref-024']}
          />
          <TmeStromalNicheFigure />
          <p>
            In metastatic settings, the balance between immune control and evasion in primary and
            secondary sites is an active field; spatial and multi-omic methods increasingly resolve
            how stroma partitions tumors into functionally different neighborhoods.
          </p>
        </div>
      </Section>

      <Section
        id="csc-pathways"
        title="Stemness, tumor-initiating cells, and developmental signaling"
        subtitle="Notch, Wnt, and Hedgehog crosstalk in self-renewal, plasticity, and drug resistance"
      >
        <div className="space-y-2">
          <CscPathwayGrid />
        </div>
      </Section>

      <Section
        id="circadian"
        title="Circadian regulation and sleep-associated dissemination"
        subtitle="Time-of-day patterns in CTC release and the concept of chronotherapy"
        className="section-alt"
      >
        <div className="space-y-6">
          <p>
            In breast cancer models and patient work, a striking fraction of CTC release and
            pro-metastatic features can be enriched during rest phases—linking the endocrine and
            circadian milieu to dissemination dynamics, not a constant &quot;steady drip&quot; of
            risk across the day.
          </p>
          <CitationCallout
            claim="In reported analyses, CTCs collected during sleep can show features associated with higher proliferative and metastatic potential in experimental readouts, with hormonal oscillations proposed as modulators. Chronotherapy (timing treatments to biological rhythm) is being explored, though not yet standard in MBC."
            sources={['ref-014']}
          />
          <p>
            This area intersects with stress biology, clock genes in tumors, and practical questions
            about when to sample blood or time systemic therapy—an evolving evidence base.
          </p>
        </div>
      </Section>

      <Section
        id="evolution-genomics"
        title="Clonal evolution and genomic drivers"
        subtitle="From truncal drivers to subclones: TP53, PIK3CA, instability, and how tumors diversify"
      >
        <div className="space-y-6">
          <p>
            At the genomic level, metastasis is a selective process. Driver alterations such as
            inactivating <em>TP53</em> and activating <em>PIK3CA</em> (PI3K pathway) are frequently
            observed; they can appear concordant between primary and matched metastases, consistent
            with early spread or parallel evolution, while additional changes accumulate in
            subclones. In HR-positive metastatic disease, <em>PIK3CA</em> is among the most
            common actionable alterations in contemporary cohorts—interpretation in any patient
            requires clinical and assay context.
          </p>
          <CitationCallout
            claim="Genomic instability accelerates diversity and can worsen resistance: defective repair, copy-number chaos, and catastrophic events expand the subclone pool and can uncouple from any single “driver” on its own. Knowledge-gap themes from older gap analyses (e.g. progression, dormancy) still frame how we interpret clonal kinetics in MBC (ref-012) alongside modern sequencing."
            sources={['ref-023', 'ref-012']}
          />
          <GenomicClonalSchematicFigure />
          <p>
            Integrating clonal information with the phenotypic plasticity, TME, and CTC data above
            supports a view of MBC as an evolving, multi-layer system rather than a static list of
            mutations—still compatible with using genomics to guide some targeted options where
            validated.
          </p>
          <figure className="my-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
              <img
                src="/images/tumor_evolution.jpg"
                alt="Tumor evolution: clonal expansion, branching subclones, and selection over time"
                className="max-h-[min(70vh,560px)] w-full max-w-full rounded-lg object-contain"
              />
              <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
                Clonal expansion and branching over time. AI-generated illustration. Complements the
                clonal-schematic and molecular themes (ref-012, ref-023).
              </p>
            </div>
          </figure>
        </div>
      </Section>

      <Section
        id="resistance"
        title="Resistance in a plastic, multi-layer system"
        subtitle="Heterogeneous CTCs, EMT state, hypoxia, and stem programs—implications for durable control"
        className="section-alt"
      >
        <div className="space-y-6">
          <p>
            Therapeutic failure in metastatic disease often reflects more than a single
            &quot;escape&quot; mutation: CTCs and parenchymal cells can reconfigure phenotype under
            drug pressure, hypoxia can support survival and rewire vasculature, and redundant
            developmental-pathway crosstalk can limit single-agent pathway blockade. Anti-angiogenic
            regimens, where used, can face evasive revascularization and selection—consistent with
            the biology summarized for the HIF–VEGF program (ref-020).
          </p>
          <CitationCallout
            claim="Targeting EMT or plasticity nodes (TGF-β, Wnt, Notch) or favoring epithelial re-differentiation in defined contexts is an active research space; it must be reconciled with evidence that some epithelial states are required for macrometastatic expansion."
            sources={['ref-019', 'ref-021']}
          />
          <p>
            Combinations that pair genomically informed drugs with microenvironment- or
            schedule-aware strategies (e.g. circadian hypotheses, TME modulators) remain under
            investigation. Longitudinal monitoring—circulating, imaging, and tissue when
            possible—remains a central goal.
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

      <Section title="References used on this page" className="section-alt" id="references-biology">
        <div className="space-y-4">
          <ReferenceList
            references={references}
            filterBy="biology"
            ensureIds={[
              'ref-012',
              'ref-014',
              'ref-017',
              'ref-018',
              'ref-019',
              'ref-020',
              'ref-021',
              'ref-022',
              'ref-023',
              'ref-024',
              'ref-025',
            ]}
          />
        </div>
      </Section>
    </div>
  );
}
