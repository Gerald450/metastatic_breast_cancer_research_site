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
import { SURVIVAL_MONTHS_MIN, SURVIVAL_MONTHS_MAX } from '@/lib/chart-utils';

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

/** Colors by recurrence type for clear visual distinction */
const DISTANT_COLOR = '#2563eb';      // blue
const LOCOREGIONAL_COLOR = '#ea580c'; // amber

function buildChartData(plotData: MetaRegressionPlotData) {
  const studies = plotData.studies.filter(
    (s) =>
      typeof s.medianSurvival === 'number' &&
      s.medianSurvival >= SURVIVAL_MONTHS_MIN &&
      s.medianSurvival <= SURVIVAL_MONTHS_MAX
  );

  const yearSet = new Set<number>();
  plotData.regression.forEach((p) => yearSet.add(p.year));
  plotData.confidenceInterval.forEach((p) => yearSet.add(p.year));
  const years = Array.from(yearSet).sort((a, b) => a - b);

  const regressionByYear = new Map(plotData.regression.map((p) => [p.year, p.medianSurvival]));
  const ciByYear = new Map(
    plotData.confidenceInterval.map((p) => [p.year, { lower: p.lower, upper: p.upper }])
  );

  // Regression curve points only (for clean line rendering)
  const curveRows = years.map((year) => {
    const reg = regressionByYear.get(year);
    const ci = ciByYear.get(year);
    return {
      year,
      regression: reg ?? null,
      ciLower: ci?.lower ?? null,
      ciUpper: ci?.upper ?? null,
    };
  });

  const studyRows = studies.map((s) => ({
    year: s.year,
    medianSurvival: s.medianSurvival,
    yearError: s.yearError,
    recurrenceType: s.recurrenceType,
  }));

  return { curveRows, studyRows };
}

function computeDomains(plotData: MetaRegressionPlotData) {
  const allYears = [
    ...plotData.studies.map((s) => s.year),
    ...plotData.regression.map((p) => p.year),
  ];
  const allSurvival = [
    ...plotData.studies.map((s) => s.medianSurvival),
    ...plotData.regression.map((p) => p.medianSurvival),
    ...plotData.confidenceInterval.flatMap((c) => [c.lower, c.upper]),
  ].filter((v): v is number => typeof v === 'number' && !isNaN(v));

  const xMin = Math.min(...allYears);
  const xMax = Math.max(...allYears);
  const yMin = Math.max(0, Math.min(...allSurvival) - 5);
  const yMax = Math.min(120, Math.max(...allSurvival) + 10);

  return {
    xDomain: [Math.floor(xMin / 5) * 5, Math.ceil(xMax / 5) * 5] as [number, number],
    yDomain: [Math.floor(yMin / 5) * 5, Math.ceil(yMax / 5) * 5] as [number, number],
  };
}

function renderPointShape(props: {
  cx?: number;
  cy?: number;
  payload?: { recurrenceType?: string };
}) {
  const { cx = 0, cy = 0, payload } = props;
  const isDistant = payload?.recurrenceType === 'distant';
  const fill = isDistant ? DISTANT_COLOR : LOCOREGIONAL_COLOR;

  if (isDistant) {
    const size = 5;
    const path = `M ${cx} ${cy - size} L ${cx + size} ${cy + size} L ${cx - size} ${cy + size} Z`;
    return <path d={path} fill="none" stroke={fill} strokeWidth={2} />;
  }
  return <circle cx={cx} cy={cy} r={5} fill={fill} stroke="#374151" strokeWidth={1} />;
}

export default function MetaRegressionSurvivalFigure({
  plotData,
  className = '',
}: {
  plotData: MetaRegressionPlotData;
  className?: string;
}) {
  const { curveRows, studyRows } = buildChartData(plotData);
  const { xDomain, yDomain } = computeDomains(plotData);

  // Merge for ComposedChart: curve points (regression line + CI) + study points (scatter)
  const chartData = [...curveRows, ...studyRows].sort((a, b) => a.year - b.year);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: Record<string, unknown> }>; label?: number }) => {
    if (!active || !payload?.length || label == null) return null;
    const point = payload[0]?.payload;
    const hasRegression = point && 'regression' in point && point.regression != null;
    const hasStudy = point && 'medianSurvival' in point && point.medianSurvival != null;
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-lg dark:border-gray-600 dark:bg-gray-800">
        <p className="font-medium text-gray-900 dark:text-white">Year: {label}</p>
        {hasStudy && (
          <p className="text-gray-600 dark:text-gray-300">
            Study: {String(point.medianSurvival)} months
            {point.recurrenceType != null && (
              <span className="ml-1 text-xs">({String(point.recurrenceType)})</span>
            )}
          </p>
        )}
        {hasRegression && (
          <p className="text-gray-600 dark:text-gray-300">
            Regression: {String(point.regression)} months
          </p>
        )}
      </div>
    );
  };

  return (
    <figure className={className}>
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {plotData.title}
      </h3>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart
            data={chartData}
            margin={{ top: 16, right: 24, left: 55, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" strokeOpacity={0.7} />
            <XAxis
              dataKey="year"
              type="number"
              domain={xDomain}
              tickCount={Math.min(9, xDomain[1] - xDomain[0] + 1)}
              tick={{ fontSize: 11, fill: 'currentColor' }}
              label={{ value: 'Year of study', position: 'bottom', offset: 0 }}
            />
            <YAxis
              type="number"
              domain={yDomain}
              tick={{ fontSize: 11, fill: 'currentColor' }}
              label={{
                value: 'Median survival (months)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle' },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* 95% CI band - drawn first (background) */}
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
                    fill="#3b82f6"
                    fillOpacity={0.12}
                    stroke="none"
                  />
                );
              })}
            {/* Regression trend line */}
            <Line
              type="monotone"
              dataKey="regression"
              stroke="#1e40af"
              strokeWidth={2.5}
              dot={false}
              connectNulls
              isAnimationActive={false}
            />
            {/* Individual study points with horizontal error bars (year uncertainty) */}
            <Scatter
              name="Studies"
              dataKey="medianSurvival"
              shape={renderPointShape}
              isAnimationActive={false}
            >
              <ErrorBar dataKey="yearError" direction="x" strokeWidth={1.5} stroke="#6b7280" />
            </Scatter>
            <Legend
              content={() => (
                <div className="mt-3 flex flex-wrap gap-6 text-xs text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <span className="h-0.5 w-5 shrink-0 rounded bg-[#1e40af]" />
                    Meta-regression trend
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-gray-500 bg-[#ea580c]" />
                    Locoregional
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 10" fill="none" stroke="#2563eb" strokeWidth={1.5}>
                      <path d="M6 1 L10 9 L2 9 Z" />
                    </svg>
                    Distant only
                  </span>
                </div>
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Each point = one study. Horizontal bars = year uncertainty. Blue band = 95% CI of the regression trend.
        </p>
      </div>
    </figure>
  );
}
