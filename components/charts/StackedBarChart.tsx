'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SeriesConfig {
  key: string;
  label: string;
  color?: string;
}

const DEFAULT_STACK_COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16', // lime
];

interface StackedBarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: SeriesConfig[];
  xLabel?: string;
  yLabel?: string;
}

export default function StackedBarChart({
  data,
  xKey,
  series,
  xLabel,
  yLabel,
}: StackedBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No verified values available yet.
      </div>
    );
  }

  if (!series || series.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No series configuration provided.
      </div>
    );
  }

  const manyCategories = data.length > 8;
  const xInterval = manyCategories ? Math.floor(data.length / 7) : 0;
  const margin = { top: 10, right: 24, left: yLabel ? 72 : 24, bottom: xLabel ? (manyCategories ? 80 : 56) : 24 };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis
          dataKey={xKey}
          interval={xInterval}
          angle={manyCategories ? -45 : 0}
          textAnchor={manyCategories ? 'end' : 'middle'}
          label={xLabel ? { value: xLabel, position: 'bottom', offset: manyCategories ? 72 : 32 } : undefined}
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor', fontSize: 11 }}
        />
        <YAxis
          width={52}
          label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } } : undefined}
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor', fontSize: 11 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: '1rem',
          }}
          className="text-xs text-gray-600 dark:text-gray-400"
        />
        {series.map((s, idx) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            stackId="a"
            name={s.label}
            fill={s.color ?? DEFAULT_STACK_COLORS[idx % DEFAULT_STACK_COLORS.length]}
            radius={idx === series.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

