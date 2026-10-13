"use client";

import { useEffect, useRef } from "react";

function HeroContent() {
  return (
    <div className="flex flex-col">
      {/* Eyebrow label - vibrant sky blue */}
      <p className="text-[#38BDF8] text-[0.75rem] sm:text-xs font-extrabold tracking-[0.22em] uppercase mb-3 sm:mb-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
        Trusted Local Handyman
      </p>

      {/* Main heading - pure bright white with crisp shadow */}
      <h1
        className="font-black text-white leading-[1.0] tracking-tight mb-4 sm:mb-5 drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]"
        style={{ fontSize: "clamp(38px, 4.6vw, 68px)" }}
      >
        INSTALL.<br />
        REPAIR.<br />
        GET IT DONE.
      </h1>

      {/* Supporting paragraph - crisp white text */}
      <p className="text-white text-[0.95rem] sm:text-base leading-relaxed mb-6 sm:mb-7 max-w-[440px] font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
        Professional home installation and handyman repair services across
        the GTA. Simple, reliable and hassle-free.
      </p>

      {/* Primary CTA */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
        <a
          href="#contact"
          id="hero-get-quote-cta"
          className="inline-flex items-center gap-2 bg-[#0755C8] hover:bg-[#0A66ED] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded shadow-xl transition-all duration-200 border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          Get a Quote
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
      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
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

  const videoSrc = "/Videos/7584762-uhd_3840_2160_25fps.mp4";

  return (
    <section
      aria-label="Hero - Install. Repair. Get it done."
      className="relative w-full overflow-hidden bg-[#0B1F3A] flex items-center min-h-[520px] sm:min-h-[580px] md:min-h-[620px] lg:min-h-[660px]"
    >
      {/* Background Video — fills entire hero section with 100% clarity */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/image/plumber-technician.jpg"
          className="w-full h-full object-cover"
          style={{ objectPosition: "65% center" }}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Hero Content — positioned above the video */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-[480px] lg:max-w-[530px]">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
