import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  evidenceType?: string;
  className?: string;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  evidenceType,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`py-12 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold leading-tight text-gray-900 dark:text-white sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
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
        <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300">
          {children}
        </div>
      </div>
    </section>
  );
}

