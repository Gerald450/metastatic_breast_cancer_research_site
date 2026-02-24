'use client';

import { useMemo } from 'react';
import PieCategoryChart from '@/components/charts/PieCategoryChart';
import Figure from '@/components/Figure';
import { references } from '@/lib/references';

const sectionLabels: Record<string, string> = {
  definition: 'Definition',
  epidemiology: 'Epidemiology',
  demographics: 'Demographics',
  'clinical-outcomes': 'Clinical Outcomes',
  'public-health': 'Public Health',
  biology: 'Biology',
  treatment: 'Treatment',
};

export default function ReferencesBySectionChart() {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    references.forEach((ref) => {
      ref.usedFor.forEach((section) => {
        counts[section] = (counts[section] ?? 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([section, count]) => ({
        section: sectionLabels[section] ?? section,
        count,
      }))
      .filter((d) => d.count > 0)
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <Figure
      title="References by section"
      description="Number of sources used per site section"
      sources={[]}
      status="Verified"
      caption="Each reference can be tagged with multiple sections (usedFor)."
      summary="This chart shows how many references on this site are tagged to each section (e.g., definition, epidemiology, clinical outcomes)—where the evidence base is thickest and where it is thinner. We show it so readers can see which topics are well supported and which rely on fewer sources. Conclusion: clinical outcomes and epidemiology typically draw on the most references, reflecting the breadth of survival and incidence literature; other sections may have fewer citations. What this means: readers can interpret content in light of evidence density and identify areas where more research or curation would strengthen the site."
    >
      <PieCategoryChart
        data={chartData}
        labelKey="section"
        valueKey="count"
      />
    </Figure>
  );
}
