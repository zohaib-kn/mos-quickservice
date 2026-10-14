"use client";

import { useEffect, useRef } from "react";

function HeroContent() {
  return (
    <div className="flex flex-col">
      {/* Eyebrow label - vibrant sky blue, refined tracking */}
      <p className="text-[#38BDF8] text-[0.75rem] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
        Trusted Local Handyman
      </p>

      {/* Main heading - matches condensed uppercase typography and sleek stroke thickness of reference image */}
      <h1
        className="font-bold text-white uppercase leading-[1.03] mb-4 sm:mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] font-[family-name:var(--font-oswald)]"
        style={{
          fontFamily: "var(--font-oswald), var(--font-inter), sans-serif",
          fontSize: "clamp(34px, 8.5vw, 68px)",
          letterSpacing: "0.02em",
        }}
      >
        INSTALL.<br />
        REPAIR.<br />
        GET IT DONE.
      </h1>

      {/* Supporting paragraph - crisp refined text thickness matching reference */}
      <p className="text-white/90 text-[0.95rem] sm:text-base leading-relaxed mb-6 sm:mb-7 max-w-[440px] font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
        Professional home installation and dependable handyman repair services.
        Simple, reliable and hassle-free.
      </p>

      {/* Primary CTA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <a
          href="#contact"
          id="hero-get-quote-cta"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#0755C8] hover:bg-[#0A66ED] text-white font-semibold text-base px-7 py-3.5 rounded-lg shadow-xl transition-all duration-200 border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          <span>Get a Quote</span>
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
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {/* Trust points - bright white text with vivid sky-blue checkmarks */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-white/95 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
        <span className="inline-flex items-center gap-1.5">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Licensed &amp; Insured
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Same-Day Response
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Guaranteed Work
        </span>
      </div>
    </div>
  );
}

function applyReducedMotion(video: HTMLVideoElement | null): (() => void) | undefined {
  if (!video) return;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) video.pause();
  const handler = (e: MediaQueryListEvent) => {
    if (e.matches) video.pause();
    else video.play().catch(() => {});
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const cleanup = applyReducedMotion(videoRef.current);
    return () => cleanup?.();
  }, []);

  const videoSrc = "/Videos/hero-video-optimized.mp4";

  return (
    <section
      aria-label="Hero - Install. Repair. Get it done."
      className="relative w-full overflow-hidden bg-[#0B1F3A] flex items-center min-h-[580px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[720px]"
    >
      {/* Background Video — fills entire hero section with 100% clarity */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/image/plumber-technician.jpg"
          className="w-full h-full object-cover"
          style={{ objectPosition: "65% center" }}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Hero Content — positioned above the video */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-[480px] lg:max-w-[530px]">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
