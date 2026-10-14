"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const footerServices = [
  { label: "Toilet Installation", href: "#installations" },
  { label: "Faucet Installation", href: "#installations" },
  { label: "Dishwasher Installation", href: "#installations" },
  { label: "Fridge Water Line", href: "#installations" },
  { label: "Electric Range & Oven", href: "#services" },
  { label: "General Handyman Jobs", href: "#services" },
];

const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "Installations", href: "#installations" },
  { label: "All Services", href: "#services" },
  { label: "Why Choose Us", href: "#about" },
  { label: "About Us", href: "#about-us" },
  { label: "Contact Us", href: "#contact" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-[#0B1F3A] text-white border-t border-white/10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              aria-label="MOS Quick Services - home"
            >
              <Image
                src="/image/logo-white-transparent.webp"
                alt="MOS Quick Services logo"
                width={190}
                height={65}
                className="h-11 w-auto"
              />
            </Link>

            <p className="text-sm leading-relaxed text-white/75 max-w-sm">
              Professional appliance installation and dependable handyman repair
              services. Prompt, insured, and hassle-free workmanship for all
              your household projects.
            </p>

            <div className="pt-2">
              <a
                href="tel:6474072525"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#0755C8] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0A66ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-sm"
              >
                <svg
                  width="15"
                  height="15"
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
                <span>647-407-2525</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#38BDF8] mb-4">
              Installation Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerServices.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-white/75 hover:text-white transition-colors focus-visible:outline-none focus-visible:text-[#38BDF8]"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#38BDF8] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white transition-colors focus-visible:outline-none focus-visible:text-[#38BDF8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quality & Standards (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#38BDF8] mb-4">
              Quality &amp; Standards
            </h4>
            <div className="flex items-start gap-3 text-sm text-white/80">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Licensed, insured &amp; guaranteed workmanship</span>
            </div>

            <div className="flex items-start gap-3 text-sm text-white/80">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Same-day response for urgent installation &amp; repair needs</span>
            </div>

            <div className="pt-2">
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:underline focus-visible:outline-none"
              >
                <span>Request service online</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {currentYear} Mo&apos;s Quick Services Limited. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Professional Installation &amp; Handyman Services</span>
            <span aria-hidden="true">•</span>
            <span>Fast &amp; Reliable</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
