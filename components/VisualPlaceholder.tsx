interface Source {
  filename: string;
  pages?: string;
  usedFor: string;
}

interface VisualPlaceholderProps {
  title: string;
  type: 'chart' | 'diagram' | 'table';
  description?: string;
  sources?: Source[];
}

function getIcon(type: 'chart' | 'diagram' | 'table') {
  switch (type) {
    case 'chart':
      return (
        <svg
          className="h-12 w-12 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      );
    case 'diagram':
      return (
        <svg
          className="h-12 w-12 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
          />
        </svg>
      );
    case 'table':
      return (
        <svg
          className="h-12 w-12 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      );
  }
}

function getTypeLabel(type: 'chart' | 'diagram' | 'table') {
  switch (type) {
    case 'chart':
      return 'Chart';
    case 'diagram':
      return 'Diagram';
    case 'table':
      return 'Table';
  }
}

export default function VisualPlaceholder({
  title,
  type,
  description,
  sources,
}: VisualPlaceholderProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{getIcon(type)}</div>
        <div className="mb-2">
          <span className="inline-flex items-center rounded-md bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {getTypeLabel(type)}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold leading-tight text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
        <p className="text-xs italic text-gray-500 dark:text-gray-500">
          TODO: Replace with real visualization
        </p>
      </div>

      {sources && sources.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700/50">
          <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
            Source Notes (to verify in PDF)
          </h4>
          <ul className="space-y-2 text-left">
            {sources.map((source, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="font-medium">{source.filename}</span>
                {source.pages && (
                  <span className="text-gray-600 dark:text-gray-400">
                    {' '}
                    (pages {source.pages})
                  </span>
                )}
                <span className="text-gray-600 dark:text-gray-400">
                  {' '}
                  — {source.usedFor}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

