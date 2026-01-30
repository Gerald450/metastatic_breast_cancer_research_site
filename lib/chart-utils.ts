/**
 * Outlier filtering for chart data so visuals look consistent.
 * Removes or caps values that are clearly wrong or would distort scale.
 */

/**
 * Check if a numeric value looks like a year (common extraction error).
 */
export function isYearLike(value: number): boolean {
  return value >= 1900 && value <= 2100 && Number.isInteger(value);
}

/**
 * Filter numeric values to a plausible range and optionally use IQR to remove extremes.
 * Returns only values that pass; does not modify the array.
 */
export function filterOutlierValues(
  values: number[],
  options: {
    min?: number;
    max?: number;
    excludeYearLike?: boolean;
    useIQR?: boolean;
    iqrMultiplier?: number;
  } = {}
): number[] {
  if (values.length === 0) return [];
  const {
    min = -Infinity,
    max = Infinity,
    excludeYearLike = false,
    useIQR = false,
    iqrMultiplier = 1.5,
  } = options;

  let filtered = values.filter((v) => typeof v === 'number' && !Number.isNaN(v));
  if (excludeYearLike) {
    filtered = filtered.filter((v) => !isYearLike(v));
  }
  filtered = filtered.filter((v) => v >= min && v <= max);

  if (!useIQR || filtered.length < 4) return filtered;

  const sorted = [...filtered].sort((a, b) => a - b);
  const q1Idx = Math.floor(sorted.length * 0.25);
  const q3Idx = Math.floor(sorted.length * 0.75);
  const q1 = sorted[q1Idx] ?? sorted[0];
  const q3 = sorted[q3Idx] ?? sorted[sorted.length - 1];
  const iqr = q3 - q1;
  const lower = q1 - iqrMultiplier * iqr;
  const upper = q3 + iqrMultiplier * iqr;
  return filtered.filter((v) => v >= lower && v <= upper);
}

/** Plausible range for survival in months (median survival etc.). */
export const SURVIVAL_MONTHS_MIN = 0;
export const SURVIVAL_MONTHS_MAX = 180;

/** Percentages 0–100. */
export const PERCENT_MIN = 0;
export const PERCENT_MAX = 100;
