import Image from "next/image";
import Link from "next/link";

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      aria-label="Why Choose Mo's Quick Service"
      className="bg-white pt-4 sm:pt-6 lg:pt-8 pb-14 sm:pb-16 lg:pb-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-[#0755C8] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3">
            Why Choose Mo&apos;s Quick Service
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#151A23] leading-tight tracking-tight mb-5">
            A Local Handyman You Can Count On.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
            Choosing the right installer for your home can be tough. You need a stable company
            that is going to be able to stand by their work; but you also want the personalized
            service that a business can offer.
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            With Mo&apos;s Quick Services, you get the best of both worlds: The security of working
            with reliable technicians and the personalized customer service that we&apos;ve come to be known for.
          </p>
        </div>

        {/* Bento Cards Layout (Inspired by Reference Design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: Left Tall Card (Spans full height of left side) */}
          <div className="lg:col-span-4 bg-[#F5F7FA] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-gray-100/90 shadow-xs hover:shadow-md transition-shadow duration-300">
            <div>
              {/* Card Image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-6 shadow-xs">
                <Image
                  src="/image/services/faucet-sink-installation.webp"
                  alt="Polite and professional installation work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Number / Eyebrow */}
              <span className="text-[#0755C8] text-xs font-bold tracking-wider uppercase mb-2 inline-block">
                01. Core Value
              </span>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#151A23] leading-snug mb-3">
                Polite and Professional
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                The Mo&apos;s Quick Services team has earned a reputation for always being very polite and professional.
              </p>
            </div>

            {/* Pill CTA Button (Matching Reference Design) */}
            <div>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-3 bg-[#151A23] hover:bg-[#0755C8] text-white text-xs sm:text-sm font-semibold pl-5 pr-2 py-2.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-2"
              >
                <span>Get a Quote</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: 8 Columns containing Top Row (2 Cards) + Bottom Row (1 Wide Card) */}
          <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
            
            {/* Top Row: Card 2 & Card 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Card 2: Licensed and Bonded */}
              <div className="bg-[#F5F7FA] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-gray-100/90 shadow-xs hover:shadow-md transition-shadow duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0755C8]/10 text-[#0755C8] flex items-center justify-center mb-5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <span className="text-[#0755C8] text-xs font-bold tracking-wider uppercase mb-1.5 inline-block">
                    03. Certified
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#151A23] leading-snug mb-2.5">
                    Licensed and Bonded
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    You can trust your home to Mo&apos;s Quick Services because we are fully licensed, bonded, and insured for your security.
                  </p>
                </div>
              </div>

              {/* Card 3: 12 Years of Experience (Stat Card matching 50% in Reference) */}
              <div className="bg-[#F5F7FA] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-gray-100/90 shadow-xs hover:shadow-md transition-shadow duration-300">
                <div>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#151A23] tracking-tight leading-none">
                      12+
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#0755C8]">Years</span>
                  </div>
                  <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
                    02. Proven Track Record
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#151A23] leading-snug mb-2">
                    12 years of experience
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    We know what we&apos;re doing because our business was founded on more than 12 years of experience in the industry!
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Row: Card 4 (Wide Card with Technician Image on Right) */}
            <div className="bg-[#F5F7FA] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-100/90 shadow-xs hover:shadow-md transition-shadow duration-300 flex-grow">
              <div className="flex-1">
                <span className="text-[#0755C8] text-xs font-bold tracking-wider uppercase mb-2 inline-block">
                  04. Expert Team
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#151A23] leading-snug mb-3">
                  Highly trained technicians
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                  The Mo&apos;s Quick Services team has earned a reputation for always being very polite, highly trained, and professional in every home installation.
                </p>
              </div>

              {/* Technician Photograph */}
              <div className="w-full sm:w-[220px] lg:w-[260px] aspect-[4/3] relative rounded-2xl overflow-hidden shrink-0 shadow-sm bg-gray-200">
                <Image
                  src="/image/plumber-technician.jpg"
                  alt="MO'S Quick Services highly trained plumber and technician"
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}