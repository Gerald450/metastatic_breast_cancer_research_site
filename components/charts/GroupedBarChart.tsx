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

interface GroupedBarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: SeriesConfig[];
  xLabel?: string;
  yLabel?: string;
}

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function GroupedBarChart({
  data,
  xKey,
  series,
  xLabel,
  yLabel,
}: GroupedBarChartProps) {
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

  const margin = { top: 10, right: 20, left: yLabel ? 55 : 10, bottom: xLabel ? 50 : 5 };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis
          dataKey={xKey}
          label={xLabel ? { value: xLabel, position: 'bottom', offset: 0 } : undefined}
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor' }}
        />
        <YAxis
          label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } } : undefined}
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '1rem' }} className="text-xs text-gray-600 dark:text-gray-400" />
        {series.map((s, idx) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            fill={s.color ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
