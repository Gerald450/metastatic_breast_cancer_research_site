import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:justify-center sm:gap-8">
          <p>© {new Date().getFullYear()} MBC Research Site</p>
          <Link href="/references" className="underline hover:no-underline">
            References
          </Link>
        </div>
      </div>
    </footer>
  );
}

