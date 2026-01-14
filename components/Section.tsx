import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  evidenceType?: string;
  className?: string;
}

export default function Section({
  title,
  subtitle,
  children,
  evidenceType,
  className = '',
}: SectionProps) {
  return (
    <section className={`py-8 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {evidenceType && (
            <div className="mt-2 sm:mt-0">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-300/20">
                Evidence type: {evidenceType}
              </span>
            </div>
          )}
        </div>
        <div className="prose prose-gray max-w-none dark:prose-invert">
          {children}
        </div>
      </div>
    </section>
  );
}

