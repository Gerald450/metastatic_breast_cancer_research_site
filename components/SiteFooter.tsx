import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-gray-200/80 bg-white dark:border-gray-800/80 dark:bg-gray-900/95">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:justify-center sm:gap-8">
          <p>© {new Date().getFullYear()} MBC Research</p>
          <Link href="/references" className="font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
            References
          </Link>
        </div>
      </div>
    </footer>
  );
}

