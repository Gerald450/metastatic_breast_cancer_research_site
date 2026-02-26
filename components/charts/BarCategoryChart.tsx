'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import WrappedXAxisTick, { LINE_HEIGHT } from './WrappedXAxisTick';

interface BarCategoryChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  xLabel?: string;
  yLabel?: string;
}

export default function BarCategoryChart({
  data,
  xKey,
  yKey,
  xLabel,
  yLabel,
}: BarCategoryChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No verified values available yet.
      </div>
    );
  }

  const manyCategories = data.length > 8;
  const xInterval = manyCategories ? Math.floor(data.length / 7) : 0;
  const tickMargin = 10;
  const bottomMargin = xLabel ? (manyCategories ? 24 + LINE_HEIGHT * 3 + 32 + tickMargin : 56 + tickMargin) : 24 + tickMargin;
  const margin = { top: 10, right: 20, left: yLabel ? 72 : 24, bottom: bottomMargin };

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
        <Bar dataKey={yKey} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

