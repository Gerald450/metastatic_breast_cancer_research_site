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
import WrappedXAxisTick, { LINE_HEIGHT } from './WrappedXAxisTick';

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

  const manyCategories = data.length > 8;
  const xInterval = manyCategories ? Math.floor(data.length / 7) : 0;
  const tickMargin = 10;
  const bottomMargin = xLabel ? (manyCategories ? 24 + LINE_HEIGHT * 3 + 32 + tickMargin : 56 + tickMargin) : 24 + tickMargin;
  const margin = { top: 10, right: 24, left: yLabel ? 72 : 24, bottom: bottomMargin };

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis
          dataKey={xKey}
          interval={xInterval}
          tickMargin={tickMargin}
          tick={<WrappedXAxisTick fontSize={11} />}
          label={xLabel ? { value: xLabel, position: 'bottom', offset: manyCategories ? 24 + LINE_HEIGHT * 3 + 8 : 32 } : undefined}
          className="text-xs text-gray-600 dark:text-gray-400"
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
