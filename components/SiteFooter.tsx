export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Academic Site. All rights reserved.</p>
          <p className="mt-2">
            {/* TODO: Add footer links, contact info, or additional content */}
          </p>
        </div>
      </div>
    </footer>
  );
}

