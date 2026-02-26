'use client';

import {
  LineChart,
  Line,
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

interface MultiLineTimeSeriesChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: SeriesConfig[];
  xLabel?: string;
  yLabel?: string;
}

const DEFAULT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
];

export default function MultiLineTimeSeriesChart({
  data,
  xKey,
  series,
  xLabel,
  yLabel,
}: MultiLineTimeSeriesChartProps) {
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

  const n = data.length;
  const xInterval = n > 12 ? Math.max(0, Math.floor((n - 1) / 8)) : 0;
  const margin = { top: 10, right: 24, left: yLabel ? 72 : 24, bottom: xLabel ? 56 : 24 };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis
          dataKey={xKey}
          interval={xInterval}
          label={xLabel ? { value: xLabel, position: 'bottom', offset: 32 } : undefined}
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
        <Legend wrapperStyle={{ paddingTop: '1rem' }} className="text-xs text-gray-600 dark:text-gray-400" />
        {series.map((s, idx) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
