'use client';

export interface StateRateEntry {
  state: string;
  stateCode?: string;
  rate: number;
}

interface StateHeatMapChartProps {
  data: StateRateEntry[];
  title?: string;
  valueLabel?: string;
}

/** US state abbreviations for display */
const STATE_ABBREV: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA',
  Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE', Florida: 'FL', Georgia: 'GA',
  Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL', Indiana: 'IN', Iowa: 'IA',
  Kansas: 'KS', Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD',
  Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS',
  Missouri: 'MO', Montana: 'MT', Nebraska: 'NE', Nevada: 'NV', 'New Hampshire': 'NH',
  'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC',
  'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK', Oregon: 'OR', Pennsylvania: 'PA',
  'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', Tennessee: 'TN',
  Texas: 'TX', Utah: 'UT', Vermont: 'VT', Virginia: 'VA', Washington: 'WA',
  'West Virginia': 'WV', Wisconsin: 'WI', Wyoming: 'WY', 'District of Columbia': 'DC',
};

function getStateCode(state: string): string {
  return STATE_ABBREV[state] ?? state.substring(0, 2).toUpperCase() ?? state;
}

export default function StateHeatMapChart({
  data,
  title,
  valueLabel = 'Rate per 100,000',
}: StateHeatMapChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No verified values available yet.
      </div>
    );
  }

  const rates = data.map((d) => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const range = maxRate - minRate || 1;

  const getColor = (rate: number) => {
    const p = (rate - minRate) / range;
    // Blue (low) to red (high) gradient
    const r = Math.round(59 + p * 196);
    const g = Math.round(130 - p * 130);
    const b = Math.round(246 - p * 130);
    return `rgb(${r},${g},${b})`;
  };

  const sorted = [...data].sort((a, b) => b.rate - a.rate);

  return (
    <div className="w-full" role="img" aria-label={`Heat map: ${valueLabel} by U.S. state`}>
      {title && (
        <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">{title}</p>
      )}
      <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Lower</span>
        <span className="h-4 w-32 rounded" style={{ background: `linear-gradient(to right, rgb(59,130,246), rgb(239,68,68))` }} />
        <span>Higher</span>
      </div>
      <div className="grid grid-cols-5 gap-1 sm:grid-cols-8 md:grid-cols-10">
        {sorted.map((d) => (
          <div
            key={d.state}
            className="flex flex-col items-center rounded p-1 transition-opacity hover:opacity-90"
            style={{ backgroundColor: getColor(d.rate) }}
            title={`${d.state}: ${d.rate.toFixed(1)} ${valueLabel}`}
          >
            <span className="text-xs font-medium text-white drop-shadow-sm" style={{ textShadow: '0 0 1px rgba(0,0,0,0.8)' }}>
              {d.stateCode ?? getStateCode(d.state)}
            </span>
            <span className="text-[10px] text-white/90" style={{ textShadow: '0 0 1px rgba(0,0,0,0.8)' }}>
              {d.rate.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
