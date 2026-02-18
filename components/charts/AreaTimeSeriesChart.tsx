'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AreaTimeSeriesChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  xLabel?: string;
  yLabel?: string;
}

export default function AreaTimeSeriesChart({
  data,
  xKey,
  yKey,
  xLabel,
  yLabel,
}: AreaTimeSeriesChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No verified values available yet.
      </div>
    );
  }

  const sanitizedData = data
    .map((item) => {
      const sanitized = { ...item };
      const value = sanitized[yKey];
      if (typeof value === 'number' && isNaN(value)) {
        sanitized[yKey] = 0;
      }
      return sanitized;
    })
    .filter((item) => {
      const value = item[yKey];
      return value !== null && value !== undefined && (typeof value !== 'number' || !isNaN(value));
    });

  if (sanitizedData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No valid data points available.
      </div>
    );
  }

  const margin = { top: 10, right: 20, left: yLabel ? 55 : 10, bottom: xLabel ? 50 : 5 };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={sanitizedData} margin={margin}>
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
        <Area
          type="monotone"
          dataKey={yKey}
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.4}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
