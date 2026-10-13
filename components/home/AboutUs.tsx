import Image from "next/image";
import Link from "next/link";

const APPOINTMENT_INCLUSIONS = [
  "Pre-installation inspection & damage checks",
  "Clear upfront estimates for any extra work",
  "Safe disconnection & old appliance removal",
  "Code-approved utility & line connections",
  "Manufacturer safety hardware & leveling",
  "Full appliance testing before completion",
  "Easy-to-understand operation instructions",
  "Clean disposal of all job-related debris",
];

export default function AboutUs() {
  return (
    <section
      id="about-us"
      aria-labelledby="about-us-heading"
      className="w-full bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Images */}
          <div className="relative pb-10 lg:col-span-5">
            {/* Main photo: uncropped, shown at its natural proportions */}
            <div className="relative w-full overflow-hidden rounded-sm rounded-br-[56px] bg-gray-100">
              <Image
                src="/image/technician-installation.jpg"
                alt="Mo's Quick Service technician working on a home appliance"
                width={0}
                height={0}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="block h-auto w-full"
              />
            </div>

            {/* Inset photo */}
            <div className="absolute bottom-0 right-3 aspect-square w-[34%] sm:right-6 lg:-right-4 overflow-hidden rounded-sm border-[6px] border-white bg-gray-100 shadow-[0_20px_40px_-20px_rgba(11,31,58,0.5)]">
              <Image
                src="/image/about-kitchen.jpg"
                alt="Modern kitchen with appliances installed"
                fill
                sizes="(max-width: 1024px) 40vw, 16vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <h2
              id="about-us-heading"
              className="text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              Local service, real support
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              At Mo&apos;s Quick Services we provide courteous and professional
              service to our customers at the best possible price. We understand
              that when your in-home appliances stop working it disrupts your
              daily routine, which is why we offer quick and efficient
              installation services.
            </p>

            <h3 className="mt-10 text-lg font-bold text-[#151A23]">
              When you schedule an appointment, you receive
            </h3>

            <ul className="mt-4 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {APPOINTMENT_INCLUSIONS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-[#0B1F3A]/10 py-3.5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0755C8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                  >
                    <polyline points="4 12.5 9.5 18 20 6.5" />
                  </svg>
                  <span className="text-[0.95rem] leading-snug text-[#151A23]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="#contact"
              id="about-us-schedule-cta"
              className="mt-9 inline-flex items-center rounded-full bg-[#0755C8] px-8 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Schedule an appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}