'use client';

import { useMemo, type CSSProperties } from 'react';

type Point = { x: number; y: number; r: number; cluster: 0 | 1 | 2 | 3 | 4; phase: number };

/**
 * Abstract embedding-style view of transcriptional heterogeneity (CTC / scRNA concepts).
 * Deterministic pseudo-random layout—decorative, not real data.
 */
export default function MolecularHeterogeneityLandscape() {
  const { points } = useMemo(() => {
    const seeds = [
      { cx: 95, cy: 78, n: 22, spread: 28, basePhase: 0 },
      { cx: 255, cy: 95, n: 18, spread: 24, basePhase: 1.2 },
      { cx: 180, cy: 195, n: 20, spread: 30, basePhase: 0.6 },
      { cx: 330, cy: 175, n: 15, spread: 22, basePhase: 1.8 },
    ];
    const pts: Point[] = [];
    let i = 0;
    for (const s of seeds) {
      const clusterId = seeds.indexOf(s) as 0 | 1 | 2 | 3;
      for (let k = 0; k < s.n; k++) {
        const t = (i * 0.618033988749895) % 1;
        const a = t * Math.PI * 2 + s.basePhase;
        const j = (k % 7) * 0.3;
        const x = s.cx + Math.cos(a + j) * s.spread * (0.4 + t * 0.6) + Math.sin(k * 2.1) * 4;
        const y = s.cy + Math.sin(a * 0.9 - j) * s.spread * (0.35 + t * 0.55) + Math.cos(k * 1.7) * 3;
        pts.push({
          x,
          y,
          r: 2.2 + (k % 4) * 0.45,
          cluster: clusterId,
          phase: (k * 0.15) % (Math.PI * 2),
        });
        i++;
      }
    }
    // Bridge "hybrid" points between clusters
    const bridges: Point[] = [
      { x: 165, y: 125, r: 2.5, cluster: 4, phase: 0 },
      { x: 210, y: 140, r: 2.2, cluster: 4, phase: 0.5 },
      { x: 290, y: 130, r: 2.3, cluster: 4, phase: 1 },
      { x: 145, y: 150, r: 2, cluster: 4, phase: 1.5 },
      { x: 315, y: 95, r: 2.4, cluster: 4, phase: 2 },
    ];
    return { points: [...pts, ...bridges] };
  }, []);

  const colors = {
    0: { fill: 'var(--c0)', label: 'Stem / stress' },
    1: { fill: 'var(--c1)', label: 'Proliferative' },
    2: { fill: 'var(--c2)', label: 'EMT / hybrid' },
    3: { fill: 'var(--c3)', label: 'Immune evasion' },
    4: { fill: 'var(--c4)', label: 'Intermediate' },
  };

  return (
    <figure
      className="my-8 w-full"
      aria-label="Conceptual plot of single cells in transcriptional space, showing distinct clusters and intermediate states"
    >
      <div
        className="molecular-het-viz relative overflow-hidden rounded-2xl border border-gray-200/90 bg-gradient-to-br from-slate-50 via-white to-rose-50/40 p-4 shadow-sm dark:border-gray-600 dark:from-slate-900/80 dark:via-gray-900/50 dark:to-rose-950/20 sm:p-6"
        style={
          {
            '--c0': 'rgb(190, 24, 93)',
            '--c1': 'rgb(37, 99, 235)',
            '--c2': 'rgb(180, 83, 9)',
            '--c3': 'rgb(5, 150, 105)',
            '--c4': 'rgb(100, 116, 139)',
          } as CSSProperties
        }
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(244,114,182,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,rgba(244,114,182,0.06),transparent_50%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%2394a3b8' fill-opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px',
          }}
          aria-hidden
        />
        <svg
          viewBox="0 0 400 240"
          className="relative z-[1] mx-auto h-auto w-full max-w-2xl"
          role="img"
        >
          <title>Transcriptional clusters and bridge cells in conceptual embedding space</title>
          <desc>
            Abstract representation of many cells as dots; four colored groups plus gray
            intermediate points suggesting plasticity between states.
          </desc>
          <rect x="0" y="0" width="400" height="240" fill="transparent" />
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                className="dark:opacity-90"
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={colors[p.cluster].fill}
                fillOpacity={p.cluster === 4 ? 0.45 : 0.72}
              />
              {p.cluster !== 4 && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.r + 0.6}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.4}
                  className="text-white/0 dark:text-white/10"
                  strokeOpacity={0.15}
                />
              )}
            </g>
          ))}
          <text
            x="20"
            y="28"
            className="fill-gray-500 text-[10px] font-medium dark:fill-gray-400"
            fontFamily="system-ui, sans-serif"
          >
            t-SNE / UMAP–style (conceptual)
          </text>
        </svg>
        <ul className="relative z-[1] mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-600 dark:text-gray-300">
          {([0, 1, 2, 3] as const).map((k) => (
            <li key={k} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: colors[k].fill }}
              />
              <span>{colors[k].label}</span>
            </li>
          ))}
          <li className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-slate-400/50 dark:ring-slate-500/40"
              style={{ background: 'var(--c4)' }}
            />
            <span>Intermediate / plastic</span>
          </li>
        </ul>
        <p className="relative z-[1] mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
          Conceptual embedding: distinct transcriptional subpopulations can co-exist; intermediate
          cells (lighter) suggest transitions bulk sampling may not resolve—aligned with
          scRNA analyses of CTCs (e.g. ref-014, ref-017, ref-018).
        </p>
      </div>
    </figure>
  );
}
