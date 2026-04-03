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
    <section id={id} className={`py-10 sm:py-14 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h2 className="heading-section text-gray-900 dark:text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {evidenceType && (
            <div className="mt-2 sm:mt-0">
              <span className="inline-flex items-center rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-800 ring-1 ring-inset ring-pink-700/15 dark:bg-pink-950/30 dark:text-pink-200 dark:ring-pink-400/20">
                Evidence type: {evidenceType}
              </span>
            </div>
          )}
        </div>
        <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 prose-a:transition-colors prose-a:duration-200">
          {children}
        </div>
      </div>
    </section>
  );
}

