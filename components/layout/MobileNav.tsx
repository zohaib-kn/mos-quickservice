"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

export default function MobileNav({
  navLinks,
  isScrolled = false,
}: {
  navLinks: NavLink[];
  isScrolled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden flex items-center gap-2">
      {/* Compact phone CTA */}
      <a
        href="tel:6474072525"
        aria-label="Call us at 647-407-2525"
        className="inline-flex items-center gap-1.5 bg-[#0755C8] text-white text-xs font-semibold px-3 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-2 active:scale-95 transition-transform shadow-xs"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
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
        className={`p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] transition-colors ${
          isScrolled
            ? "text-[#151A23] hover:text-[#0755C8]"
            : "text-white hover:text-[#38BDF8] drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]"
        }`}
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Portal overlay: rendered into document.body to avoid parent containing-block trapping */}
      {mounted &&
        isOpen &&
        createPortal(
          <div className="md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 top-[68px] z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
              aria-hidden="true"
              onClick={close}
            />

            {/* Menu Drawer */}
            <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-x-0 top-[68px] z-50 max-h-[calc(100dvh-68px)] overflow-y-auto bg-white border-b border-gray-200 shadow-2xl transition-all duration-200 animate-in slide-in-from-top-2"
            >
              <nav aria-label="Mobile navigation links" className="flex flex-col px-6 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    className="flex items-center justify-between py-4 text-base font-semibold text-[#151A23] hover:text-[#0755C8] border-b border-gray-100 last:border-0 transition-colors"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="text-gray-400 text-sm">
                      →
                    </span>
                  </Link>
                ))}

                {/* Direct Call Action */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a
                    href="tel:6474072525"
                    onClick={close}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#0755C8] text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#0B1F3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] shadow-md"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                    </svg>
                    <span>Call Now 647-407-2525</span>
                  </a>
                  <p className="mt-3 text-center text-xs text-gray-500">
                    Licensed &amp; Insured • Fast &amp; Dependable
                  </p>
                </div>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
