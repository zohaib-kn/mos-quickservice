import ContactForm from "@/components/home/ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full bg-[#F5F7FA] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12 max-w-2xl">
          <p className="text-[#0755C8] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3">
            CONTACT MO&apos;S QUICK SERVICE
          </p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-[#0B1F3A] tracking-tight leading-[1.15] mb-4"
          >
            Let&apos;s Get Your Project Started.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Need an installation, repair or handyman service? Tell us what you
            need and we&apos;ll help you with the next steps.
          </p>
        </div>

        {/* Two-Column Grid: Left Info Panel (approx 40%) | Right Form Area (approx 60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column — Contact Information Panel */}
          <div className="lg:col-span-5 bg-[#0B1F3A] rounded-2xl p-8 sm:p-10 lg:p-12 text-white flex flex-col justify-between shadow-md">
            <div>
              {/* Blue Eyebrow */}
              <p className="text-[#38BDF8] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                DIRECT CONTACT
              </p>

              {/* Strong White Heading */}
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                Need a Hand?
              </h3>

              {/* Supporting Text */}
              <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-8">
                Have a question about an installation or repair? Contact MO&apos;S
                Quick Service and tell us about your requirements.
              </p>

              {/* Divider */}
              <hr className="border-white/10 mb-8" />

              {/* Contact Details List */}
              <div className="space-y-6">
                {/* Phone Link */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#38BDF8]">
                    <svg
                      width="20"
                      height="20"
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
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">
                      Call or Text
                    </span>
                    <a
                      href="tel:6474072525"
                      className="text-lg sm:text-xl font-bold text-white hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded"
                      aria-label="Call MO'S Quick Service at 647-407-2525"
                    >
                      647-407-2525
                    </a>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#38BDF8]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">
                      Service Area
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-white">
                      Greater Toronto Area (GTA)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Reassurance Banner */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#38BDF8]/15 text-[#38BDF8]">
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <p className="text-xs sm:text-sm text-white/80 font-medium">
                  Licensed &amp; insured technicians dedicated to clean, reliable workmanship.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — Contact Form Area */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
