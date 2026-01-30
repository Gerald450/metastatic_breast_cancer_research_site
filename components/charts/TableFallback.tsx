'use client';

interface TableFallbackProps {
  data: Record<string, unknown>[];
  columns: Array<{ key: string; label: string }>;
  maxRows?: number;
}

export default function TableFallback({
  data,
  columns,
  maxRows = 10,
}: TableFallbackProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No data available for this figure yet.
      </div>
    );
  }

  const displayData = data.slice(0, maxRows);
  const hasMore = data.length > maxRows;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800/50">
          {displayData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                >
                  {row[col.key] !== null && row[col.key] !== undefined
                    ? String(row[col.key])
                    : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Showing {maxRows} of {data.length} entries
        </div>
      )}
    </div>
  );
}

