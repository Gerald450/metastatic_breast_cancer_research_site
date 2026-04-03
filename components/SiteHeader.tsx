'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/biology', label: 'Biology' },
    { href: '/epidemiology', label: 'Epidemiology' },
    { href: '/demographics', label: 'Demographics' },
    { href: '/clinical-outcomes', label: 'Clinical Outcomes' },
    { href: '/treatment', label: 'Treatment' },
    { href: '/public-health', label: 'Public Health' },
    { href: '/references', label: 'References' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        className={`
          relative block rounded-md px-3 py-2 text-sm font-medium transition-all duration-200
          md:px-3 md:py-1.5
          ${
            active
              ? 'text-pink-900 dark:text-white md:bg-pink-50 md:shadow-sm md:ring-1 md:ring-pink-100 dark:md:bg-pink-950/35 dark:md:ring-pink-900/30'
              : 'text-gray-600 hover:text-pink-800 hover:bg-pink-50/80 dark:text-gray-400 dark:hover:text-pink-200 dark:hover:bg-pink-950/20 md:hover:bg-pink-50/60 dark:md:hover:bg-pink-950/25'
          }
        `}
        onClick={() => setMobileMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100/80 bg-white/85 dark:border-pink-950/30 dark:bg-gray-900/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/92 dark:supports-[backdrop-filter]:bg-gray-900/92 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between md:h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg font-semibold text-pink-700 dark:text-pink-300 hover:text-pink-800 dark:hover:text-pink-200 transition-colors duration-200 md:text-xl"
            >
              MBC Research
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-0.5 md:rounded-lg md:bg-pink-50/70 dark:md:bg-gray-800/60 md:p-1 md:ring-1 md:ring-pink-100/60 dark:md:ring-pink-900/20">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
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
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-gray-200 py-3 md:hidden dark:border-gray-800">
            <div className="space-y-0.5">
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

