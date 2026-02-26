'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface DotPlotChartProps {
  data: Record<string, unknown>[];
  categoryKey: string;
  valueKey: string;
  categoryLabel?: string;
  valueLabel?: string;
  /** Show a reference line at zero (e.g. for AAPC). */
  showZeroLine?: boolean;
}

/**
 * Horizontal dot-plot style chart: one value per category with optional zero reference.
 * Good for AAPC, rates by group, or any single metric per category.
 */
export default function DotPlotChart({
  data,
  categoryKey,
  valueKey,
  categoryLabel,
  valueLabel,
  showZeroLine = false,
}: DotPlotChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No verified values available yet.
      </div>
    );
  }

  const yAxisWidth = 160;
  const margin = { top: 10, right: 24, left: yAxisWidth + 16, bottom: valueLabel ? 56 : 24 };

  return (
    <ResponsiveContainer width="100%" height={Math.max(300, data.length * 44)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={margin}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" horizontal={false} />
        <XAxis
          type="number"
          label={valueLabel ? { value: valueLabel, position: 'bottom', offset: 32 } : undefined}
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor', fontSize: 11 }}
        />
        <YAxis
          type="category"
          dataKey={categoryKey}
          width={yAxisWidth}
          tick={{ fill: 'currentColor', fontSize: 11 }}
          label={categoryLabel ? { value: categoryLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } } : undefined}
          className="text-xs text-gray-600 dark:text-gray-400"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
          }}
        />
        {showZeroLine && <ReferenceLine x={0} stroke="#6b7280" strokeDasharray="3 3" />}
        <Bar dataKey={valueKey} radius={0} barSize={14} fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
