'use client';

import React from 'react';

/** Max characters per line before wrapping (approximate). */
const MAX_CHARS_PER_LINE = 12;
const LINE_HEIGHT = 12;

export interface WrappedXAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value?: string };
  fill?: string;
  fontSize?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  width?: number;
}

/**
 * Splits a label into lines that fit within roughly MAX_CHARS_PER_LINE characters.
 */
function wrapLabel(text: string): string[] {
  if (!text || typeof text !== 'string') return [''];
  const trimmed = text.trim();
  if (!trimmed) return [''];
  const words = trimmed.split(/\s+/);
  if (words.length <= 1) {
    // Single word: break at character limit
    const chars = trimmed.split('');
    const lines: string[] = [];
    for (let i = 0; i < chars.length; i += MAX_CHARS_PER_LINE) {
      lines.push(chars.slice(i, i + MAX_CHARS_PER_LINE).join(''));
    }
    return lines.length ? lines : [trimmed];
  }
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= MAX_CHARS_PER_LINE) {
      current = next;
    } else {
      if (current) lines.push(current);
      if (word.length > MAX_CHARS_PER_LINE) {
        for (let i = 0; i < word.length; i += MAX_CHARS_PER_LINE) {
          lines.push(word.slice(i, i + MAX_CHARS_PER_LINE));
        }
        current = '';
      } else {
        current = word;
      }
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [trimmed];
}

/**
 * Recharts custom tick for XAxis that wraps long labels into stacked lines.
 */
export default function WrappedXAxisTick({
  x = 0,
  y = 0,
  payload,
  fill = 'currentColor',
  fontSize = 11,
  textAnchor = 'middle',
}: WrappedXAxisTickProps) {
  const value = payload?.value != null ? String(payload.value) : '';
  const lines = wrapLabel(value);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        fill={fill}
        fontSize={fontSize}
        textAnchor={textAnchor}
        className="text-gray-600 dark:text-gray-400"
      >
        {lines.map((line, i) => (
          <tspan key={i} x={0} dy={i === 0 ? 8 : LINE_HEIGHT}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export { LINE_HEIGHT, MAX_CHARS_PER_LINE };
