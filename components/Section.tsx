import { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ title, children, className = '' }: SectionProps) {
  return (
    <section className={`py-8 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        )}
        <div className="prose prose-gray max-w-none dark:prose-invert">
          {children}
        </div>
      </div>
    </section>
  );
}

