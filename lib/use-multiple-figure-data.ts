'use client';

import { useState, useEffect } from 'react';

export function useMultipleFigureData<T extends Record<string, unknown>>(urls: Record<keyof T, string | null>) {
  const [data, setData] = useState<Partial<T>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const keys = Object.keys(urls) as (keyof T)[];
    const validKeys = keys.filter((k) => urls[k]);
    if (validKeys.length === 0) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all(
      validKeys.map(async (key) => {
        const url = urls[key];
        if (!url) return [key, null] as const;
        const res = await fetch(url);
        const json = await res.json();
        return [key, res.ok ? json.data : null] as const;
      })
    ).then((results) => {
      if (cancelled) return;
      const out: Partial<T> = {};
      for (const [key, val] of results) {
        out[key as keyof T] = val as T[keyof T];
      }
      setData(out);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(urls)]);

  return { data, loading, error };
}
