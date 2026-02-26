'use client';

export interface BoxPlotDataPoint {
  category: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

interface BoxPlotChartProps {
  data: BoxPlotDataPoint[];
  xLabel?: string;
  yLabel?: string;
}

export default function BoxPlotChart({ data, xLabel, yLabel }: BoxPlotChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No verified values available yet.
      </div>
    );
  }

  const allValues = data.flatMap((d) => [d.min, d.max]);
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);
  const range = globalMax - globalMin || 1;
  const padding = 24;
  const chartHeight = 160;
  const boxWidth = Math.max(24, Math.min(60, 400 / data.length - 12));

  const valueToY = (v: number) =>
    padding + chartHeight - ((v - globalMin) / range) * chartHeight;

  return (
    <div className="w-full" role="img" aria-label={`Box plot: ${yLabel ?? 'Values'} by ${xLabel ?? 'category'}`}>
      {yLabel && (
        <p className="mb-1 text-center text-xs font-medium text-gray-600 dark:text-gray-400">{yLabel}</p>
      )}
      <svg
        viewBox={`0 0 ${Math.max(400, data.length * (boxWidth + 20) + 80)} ${chartHeight + padding * 2}`}
        className="w-full"
        style={{ minHeight: 220 }}
      >
        {data.map((d, i) => {
          const cx = 60 + i * (boxWidth + 20) + boxWidth / 2;
          const yMin = valueToY(d.min);
          const yMax = valueToY(d.max);
          const yQ1 = valueToY(d.q1);
          const yQ3 = valueToY(d.q3);
          const yMed = valueToY(d.median);
          const boxLeft = cx - boxWidth / 2;
          const boxRight = cx + boxWidth / 2;

          return (
            <g key={d.category}>
              <title>{`${d.category}: Min ${d.min}, Q1 ${d.q1}, Median ${d.median}, Q3 ${d.q3}, Max ${d.max}`}</title>
              {/* Whisker: min to q1 */}
              <line x1={cx} y1={yMin} x2={cx} y2={yQ1} stroke="#6b7280" strokeWidth={1} />
              <line x1={boxLeft} y1={yMin} x2={boxRight} y2={yMin} stroke="#6b7280" strokeWidth={1} />
              {/* Box: q1 to q3 */}
              <rect
                x={boxLeft}
                y={yQ3}
                width={boxWidth}
                height={yQ1 - yQ3}
                fill="#3b82f6"
                fillOpacity={0.6}
                stroke="#2563eb"
                strokeWidth={1}
              />
              {/* Median line */}
              <line x1={boxLeft} y1={yMed} x2={boxRight} y2={yMed} stroke="#1d4ed8" strokeWidth={2} />
              {/* Whisker: q3 to max */}
              <line x1={cx} y1={yQ3} x2={cx} y2={yMax} stroke="#6b7280" strokeWidth={1} />
              <line x1={boxLeft} y1={yMax} x2={boxRight} y2={yMax} stroke="#6b7280" strokeWidth={1} />
              {/* Category label */}
              <text
                x={cx}
                y={chartHeight + padding + 16}
                textAnchor="middle"
                className="fill-gray-600 dark:fill-gray-400"
                style={{ fontSize: 11 }}
              >
                {d.category}
              </text>
            </g>
          );
        })}
        {/* Y-axis scale labels */}
        {[globalMin, globalMin + range * 0.25, globalMin + range * 0.5, globalMin + range * 0.75, globalMax].map((v, i) => (
          <text
            key={i}
            x={48}
            y={valueToY(v) + 4}
            textAnchor="end"
            className="fill-gray-500 dark:fill-gray-500"
            style={{ fontSize: 10 }}
          >
            {Number.isInteger(v) ? v : v.toFixed(1)}
          </text>
        ))}
      </svg>
      {xLabel && (
        <p className="mt-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">{xLabel}</p>
      )}
    </div>
  );
}
