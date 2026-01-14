import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';

export default function Home() {
  return (
    <div className="py-12">
      <Section title="Home">
        <div className="space-y-8">
          <div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Welcome
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {/* TODO: Add introduction content */}
            </p>
          </div>

          <Placeholder label="TODO: Add home page content" />

          <div className="mt-8">
            <VisualPlaceholder
              height="400px"
              label="TODO: Add hero image or visual"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
