'use client';

import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Scatter,
  ErrorBar,
  Legend,
  ReferenceArea,
} from 'recharts';

export type MetaRegressionDiseaseKey =
  | 'recurrentDisease'
  | 'recurrentERPlus'
  | 'recurrentERMinus'
  | 'deNovoStageIV';

export type MetaRegressionPlotData = {
  title: string;
  studies: Array<{
    year: number;
    medianSurvival: number;
    yearError: number;
    recurrenceType: 'distant' | 'locoregional';
    colorIndex: number;
  }>;
  regression: Array<{ year: number; medianSurvival: number }>;
  confidenceInterval: Array<{ year: number; lower: number; upper: number }>;
};

const STUDY_COLORS = [
  '#b91c1c', // red
  '#ea580c', // orange
  '#ca8a04', // yellow
  '#16a34a', // green
  '#0d9488', // teal
  '#2563eb', // blue
  '#7c3aed', // purple
  '#db2777', // pink
];

function buildChartData(plotData: MetaRegressionPlotData) {
  const yearSet = new Set<number>();
  plotData.regression.forEach((p) => yearSet.add(p.year));
  plotData.confidenceInterval.forEach((p) => yearSet.add(p.year));
  const years = Array.from(yearSet).sort((a, b) => a - b);

  const regressionByYear = new Map(plotData.regression.map((p) => [p.year, p.medianSurvival]));
  const ciByYear = new Map(
    plotData.confidenceInterval.map((p) => [p.year, { lower: p.lower, upper: p.upper }])
  );

  const curveRows = years.map((year) => {
    const reg = regressionByYear.get(year);
    const ci = ciByYear.get(year);
    return {
      year,
      regression: reg ?? undefined,
      ciLower: ci?.lower ?? undefined,
      ciUpper: ci?.upper ?? undefined,
    };
  });

  const studyRows = plotData.studies.map((s) => ({
    year: s.year,
    medianSurvival: s.medianSurvival,
    yearError: s.yearError,
    recurrenceType: s.recurrenceType,
    colorIndex: s.colorIndex,
  }));

  const merged = [...curveRows, ...studyRows].sort((a, b) => a.year - b.year);
  return merged;
}

function renderPointShape(props: {
  cx?: number;
  cy?: number;
  payload?: { recurrenceType?: string; colorIndex?: number };
}) {
  const { cx = 0, cy = 0, payload } = props;
  const isDistant = payload?.recurrenceType === 'distant';
  const colorIndex = typeof payload?.colorIndex === 'number' ? payload.colorIndex : 0;
  const fill = STUDY_COLORS[colorIndex % STUDY_COLORS.length];

  if (isDistant) {
    // Open triangle (stroke only, no fill)
    const size = 6;
    const path = `M ${cx} ${cy - size} L ${cx + size} ${cy + size} L ${cx - size} ${cy + size} Z`;
    return (
      <path
        d={path}
        fill="none"
        stroke={fill}
        strokeWidth={1.5}
      />
    );
  }
  // Closed circle
  return <circle cx={cx} cy={cy} r={5} fill={fill} stroke="#374151" strokeWidth={1} />;
}

export default function MetaRegressionSurvivalFigure({
  plotData,
  className = '',
}: {
  plotData: MetaRegressionPlotData;
  className?: string;
}) {
  const chartData = buildChartData(plotData);
  const xDomain: [number, number] = [1975, 2015];
  const yDomain: [number, number] = [10, 70];

  return (
    <figure className={className}>
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {plotData.title}
      </h3>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis
              dataKey="year"
              type="number"
              domain={xDomain}
              tickCount={9}
              tick={{ fontSize: 11, fill: 'currentColor' }}
              label={{ value: 'year', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              type="number"
              domain={yDomain}
              tick={{ fontSize: 11, fill: 'currentColor' }}
              label={{
                value: 'median survival time (month)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
              }}
              formatter={(value: number, name: string) => [value, name]}
              labelFormatter={(label) => `Year: ${label}`}
            />
            {/* Gray confidence interval band: one ReferenceArea per year span */}
            {plotData.confidenceInterval
              .slice(0, -1)
              .map((ci, i) => {
                const next = plotData.confidenceInterval[i + 1];
                return (
                  <ReferenceArea
                    key={`ci-${ci.year}`}
                    x1={ci.year}
                    x2={next.year}
                    y1={ci.lower}
                    y2={ci.upper}
                    fill="#9ca3af"
                    fillOpacity={0.5}
                  />
                );
              })}
            {/* Black regression curve */}
            <Line
              type="monotone"
              dataKey="regression"
              stroke="#111827"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            {/* Study points with horizontal error bars */}
            <Scatter
              name="Studies"
              dataKey="medianSurvival"
              shape={renderPointShape}
              isAnimationActive={false}
            >
              <ErrorBar dataKey="yearError" direction="x" strokeWidth={1} stroke="#6b7280" />
            </Scatter>
            <Legend
              content={() => (
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-0 w-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-500" />
                    distant recurrence only
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full border border-gray-600 bg-gray-400" />
                    locoregional recurrence
                  </span>
                </div>
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
          Individual study data points with horizontal error bars (year CI). Black line: regression
          curve. Gray band: confidence interval.
        </p>
      </div>
    </figure>
  );
}
