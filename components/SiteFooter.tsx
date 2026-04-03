import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-pink-100/90 bg-white dark:border-pink-950/25 dark:bg-gray-900/95">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:justify-center sm:gap-8">
          <p>© {new Date().getFullYear()} MBC Research</p>
          <Link href="/references" className="font-medium text-pink-700 hover:text-pink-800 dark:text-pink-300 dark:hover:text-pink-200 transition-colors duration-200">
            References
          </Link>
        </div>
      </div>
    </footer>
  );
}

