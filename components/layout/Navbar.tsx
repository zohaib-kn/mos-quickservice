"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/layout/MobileNav";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Installations", href: "#installations" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about-us" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "border-b border-[#0B1F3A]/10 bg-white/90 backdrop-blur-md shadow-xs supports-[backdrop-filter]:bg-white/80"
          : "border-b border-white/20 bg-white/35 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.06)] supports-[backdrop-filter]:bg-white/25"
      }`}
    >
      <div className="mx-auto grid h-[68px] md:h-[76px] max-w-[1280px] grid-cols-[auto_1fr] items-center gap-4 sm:gap-6 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="w-fit flex-shrink-0 justify-self-start rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-4"
          aria-label="MOS Quick Services - home"
        >
          <Image
            src="/image/logo.webp"
            alt="MOS Quick Services logo"
            width={160}
            height={50}
            priority
            className="h-9 md:h-11 w-auto"
          />
        </Link>

        {/* Desktop navigation (centered) */}
        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-300 focus-visible:outline-none motion-reduce:transition-none motion-reduce:after:transition-none ${
                isScrolled
                  ? "text-[#151A23] hover:text-[#0755C8] after:bg-[#0755C8] focus-visible:text-[#0755C8] focus-visible:after:scale-x-100"
                  : "text-white hover:text-[#38BDF8] after:bg-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] focus-visible:text-[#38BDF8] focus-visible:after:scale-x-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Call CTA + mobile toggle */}
        <div className="flex items-center justify-self-end gap-3">
          <a
            href="tel:6474072525"
            id="navbar-call-cta"
            className="hidden items-center gap-3 whitespace-nowrap rounded-full bg-[#0755C8] py-1.5 pl-1.5 pr-6 text-white transition-colors duration-200 hover:bg-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-2 motion-reduce:transition-none md:inline-flex shadow-xs"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-white/75">
                Call now
              </span>
              <span className="text-[15px] font-semibold">647-407-2525</span>
            </span>
          </a>

          <MobileNav navLinks={navLinks} isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  );
}