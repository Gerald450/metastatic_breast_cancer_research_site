import Link from 'next/link';

export default function SiteHeader() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/definition', label: 'Definition' },
    { href: '/epidemiology', label: 'Epidemiology' },
    { href: '/demographics', label: 'Demographics' },
    { href: '/clinical-outcomes', label: 'Clinical Outcomes' },
    { href: '/public-health', label: 'Public Health' },
    { href: '/biology', label: 'Biology' },
    { href: '/treatment', label: 'Treatment' },
    { href: '/references', label: 'References' },
  ];

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              Academic Site
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Mobile menu button - TODO: implement mobile menu */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

