import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';

export default function Home() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Project Status Banner */}
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-3 shadow-sm dark:border-amber-800/50 dark:bg-amber-900/10">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Draft — content placeholders included
          </p>
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
          Welcome
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {/* TODO: Add introduction content */}
        </p>
      </div>

      <Section title="Overview">
        <div className="space-y-8">
          <Placeholder label="TODO: Add home page content" />

          <div className="mt-8">
            <VisualPlaceholder
              title="Hero visualization placeholder"
              type="diagram"
              description="TODO: Add hero image or visual"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
