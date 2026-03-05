// ================================================
// startup-ui — Navbar Component (React)
// Features: responsive, mobile hamburger, active link
// Accessibility: nav landmark, aria-label, aria-expanded
// ================================================

import { useState } from "react";

const navLinks = [
  { label: "Bileşenler", href: "#", active: true },
  { label: "Döküman",    href: "#" },
  { label: "Örnekler",   href: "#" },
  { label: "GitHub",     href: "#" },
];

export function Navbar({ logo = "startup-ui", cta = { label: "Başla →", href: "#" } }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Ana navigasyon"
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-neutral-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
          {logo}
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={[
                  "text-sm transition-colors",
                  link.active
                    ? "font-medium text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
                ].join(" ")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={cta.href}
            className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            {cta.label}
          </a>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex rounded-md p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 md:hidden"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "block rounded-md px-3 py-2 text-sm",
                    link.active
                      ? "font-medium text-neutral-900 dark:text-neutral-100"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
                  ].join(" ")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
            <a
              href={cta.href}
              className="block w-full rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white dark:bg-white dark:text-black"
            >
              {cta.label}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
