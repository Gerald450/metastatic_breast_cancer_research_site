'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PieCategoryChartProps {
  data: Record<string, unknown>[] | { name: string; value: number }[];
  labelKey?: string;
  valueKey?: string;
}

const DEFAULT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16', // lime
];

export default function PieCategoryChart({
  data,
  labelKey = 'name',
  valueKey = 'value',
}: PieCategoryChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No verified values available yet.
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: String(item[labelKey as keyof typeof item] ?? ''),
    value: Number(item[valueKey as keyof typeof item] ?? 0),
  })).filter((d) => d.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No valid data points available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [value.toLocaleString(), 'Count']}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
