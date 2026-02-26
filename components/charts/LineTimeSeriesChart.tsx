'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LineTimeSeriesChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  xLabel?: string;
  yLabel?: string;
}

export default function LineTimeSeriesChart({
  data,
  xKey,
  yKey,
  xLabel,
  yLabel,
}: LineTimeSeriesChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No verified values available yet.
      </div>
    );
  }

  // Sanitize data to ensure no NaN values
  const sanitizedData = data.map((item) => {
    const sanitized = { ...item };
    const value = sanitized[yKey];
    if (typeof value === 'number' && isNaN(value)) {
      sanitized[yKey] = 0;
    }
    return sanitized;
  }).filter((item) => {
    // Filter out items where the value is invalid
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

  const n = sanitizedData.length;
  const xInterval = n > 12 ? Math.max(0, Math.floor((n - 1) / 8)) : 0;
  const margin = { top: 10, right: 24, left: yLabel ? 72 : 24, bottom: xLabel ? 56 : 24 };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={sanitizedData} margin={margin}>
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
          label={yLabel ? { value: String(yLabel || ''), angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } } : undefined}
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
        <Line
          type="monotone"
          dataKey={yKey}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

