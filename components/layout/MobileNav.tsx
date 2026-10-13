"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

export default function MobileNav({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden flex items-center gap-2">
      {/* Compact phone CTA */}
      <a
        href="tel:6474072525"
        aria-label="Call us at 647-407-2525"
        className="inline-flex items-center gap-1.5 bg-[#0755C8] text-white text-xs font-semibold px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-2"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
        </svg>
        Call
      </a>

      {/* Hamburger / close button */}
      <button
        ref={toggleRef}
        id="mobile-menu-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="p-2 rounded text-[#151A23] hover:text-[#0755C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] transition-colors"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Slide-down overlay menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed inset-x-0 top-[76px] bottom-0 z-40 bg-white",
          "transition-transform duration-200 ease-in-out",
          isOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none",
        ].join(" ")}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={close}
              className="text-[1.05rem] font-semibold text-[#151A23] hover:text-[#0755C8] py-4 border-b border-gray-100 last:border-0 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:6474072525"
            onClick={close}
            className="mt-8 inline-flex items-center justify-center gap-2 bg-[#0755C8] text-white font-bold text-sm px-6 py-3.5 rounded hover:bg-[#0B1F3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-2"
          >
            Call Now 647-407-2525
          </a>
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[76px] z-30 bg-black/20"
          aria-hidden="true"
          onClick={close}
        />
      )}
    </div>
  );
}

