"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InteractiveServiceList, { ServiceItem } from "@/components/home/InteractiveServiceList";

const APPLIANCE_INSTALLATIONS: ServiceItem[] = [
  {
    id: "dishwashers",
    name: "Dishwashers",
    note: "Kitchen",
    image: "/image/services/Our/image.png",
    imageAlt: "MO'S Quick Service technician installing a built-in kitchen dishwasher",
  },
  {
    id: "electric-ranges",
    name: "Electric Ranges",
    note: "Kitchen",
    image: "/image/services/Our/image copy.png",
    imageAlt: "MO'S Quick Service technician fitting an electric range cooking stove",
  },
  {
    id: "wall-ovens",
    name: "Wall Ovens",
    note: "Kitchen",
    image: "/image/services/Our/image copy 2.png",
    imageAlt: "MO'S Quick Service technician installing a built-in wall oven",
  },
  {
    id: "cooktops",
    name: "Cooktops",
    note: "Kitchen",
    image: "/image/services/Our/image copy 4.png",
    imageAlt: "MO'S Quick Service technician assembling a kitchen gas cooktop",
  },
  {
    id: "microwaves-range-hoods",
    name: "Microwaves / Range Hoods",
    note: "Kitchen",
    image: "/image/services/Our/image copy 6.png",
    imageAlt: "MO'S Quick Service technician mounting an over-the-range microwave hood",
  },
  {
    id: "garburators",
    name: "Garburators",
    note: "Kitchen",
    image: "/image/services/Our/image copy 7.png",
    imageAlt: "MO'S Quick Service technician installing an in-sink garbage disposal unit",
  },
  {
    id: "fridge-waterline",
    name: "Fridge waterline",
    note: "Kitchen",
    image: "/image/services/Our/image copy 8.png",
    imageAlt: "MO'S Quick Service technician connecting refrigerator water supply line",
  },
  {
    id: "sinks",
    name: "Sinks",
    note: "Kitchen & bathroom",
    image: "/image/services/Our/image copy 10.png",
    imageAlt: "MO'S Quick Service technician installing undermount kitchen sink basin",
  },
  {
    id: "faucets",
    name: "Faucets",
    note: "Kitchen & bathroom",
    image: "/image/services/Our/image copy 9.png",
    imageAlt: "MO'S Quick Service technician tightening high-arc kitchen sink faucet with wrench",
  },
  {
    id: "toilets",
    name: "Toilets",
    note: "Bathroom",
    image: "/image/services/Our/image copy 3.png",
    imageAlt: "MO'S Quick Service technician leveling and installing bathroom toilet",
  },
  {
    id: "vanities",
    name: "Vanities",
    note: "Bathroom",
    image: "/image/services/Our/image copy 5.png",
    imageAlt: "MO'S Quick Service technician installing modern floating bathroom vanity",
  },
];

const ADDITIONAL_HANDYMAN_SERVICES: ServiceItem[] = [
  {
    id: "handyman-small-jobs",
    name: "Handyman for small jobs",
    note: "General",
    image: "/image/services/Our/image copy 11.png",
    imageAlt: "MO'S Quick Service technician with professional tool kit performing home maintenance",
  },
  {
    id: "redo-plumbing",
    name: "Redo plumbing with ABS or Brass piping",
    note: "Plumbing",
    image: "/image/services/Our/image copy 12.png",
    imageAlt: "MO'S Quick Service technician assembling ABS drain pipes and brass couplings",
  },
  {
    id: "propane-bbq",
    name: "Propane BBQ and patio furniture assemblies",
    note: "Assembly",
    image: "/image/services/Our/image copy 13.png",
    imageAlt: "MO'S Quick Service technician assembling stainless steel propane BBQ grill on patio",
  },
  {
    id: "fridge-door-reversals",
    name: "Fridge door reversals",
    note: "Appliance adjustment",
    image: "/image/services/Our/image copy 14.png",
    imageAlt: "MO'S Quick Service technician adjusting refrigerator door hinge bracket with screwdriver",
  },
];

const ALL_SERVICES: ServiceItem[] = [
  ...APPLIANCE_INSTALLATIONS,
  ...ADDITIONAL_HANDYMAN_SERVICES,
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>("dishwashers");

  const activeItem =
    ALL_SERVICES.find((s) => s.id === activeId) || ALL_SERVICES[0];

  const appIndex = APPLIANCE_INSTALLATIONS.findIndex((s) => s.id === activeId);
  const handyIndex = ADDITIONAL_HANDYMAN_SERVICES.findIndex((s) => s.id === activeId);
  const activeDisplayIndex =
    appIndex !== -1
      ? String(appIndex + 1).padStart(2, "0")
      : String(handyIndex + 1).padStart(2, "0");

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Sticky Left Column: Editorial Intro + Dedicated Showcase Panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <h2
                  id="services-heading"
                  className="text-3xl font-bold leading-[1.1] tracking-tight text-[#0B1F3A] sm:text-4xl lg:text-[2.6rem]"
                >
                  More than installations
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#151A23]">
                  Professional appliance installation, plumbing connections and
                  practical home services.
                </p>
              </div>

              {/* Dedicated Showcase Card (Desktop) — 100% Crisp Photo, Zero Tint, Smooth Cross-Fade */}
              <div className="hidden lg:block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-slate-100 shadow-lg">
                  {ALL_SERVICES.map((service) => {
                    const isSelected = service.id === activeItem.id;
                    return (
                      <div
                        key={service.id}
                        className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                          isSelected ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                        }`}
                        aria-hidden={!isSelected}
                      >
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          sizes="(max-width: 1280px) 45vw, 480px"
                          className="object-cover object-center"
                          priority={service.id === "dishwashers"}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Active Service Caption */}
                <div className="mt-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xs italic text-[#0755C8] font-bold">
                      ({activeDisplayIndex})
                    </span>
                    <span className="text-sm font-semibold text-[#0B1F3A]">
                      {activeItem.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0755C8]">
                    {activeItem.note}
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-sm leading-relaxed text-gray-600">
                  Our services include water supply and drain line hookup for new
                  installations as well as repairs to existing lines. Our licensed
                  technicians respond quickly to service calls, avoiding or
                  minimizing damage to your home.
                </p>
                <Link
                  href="#contact"
                  className="mt-4 inline-flex items-center rounded-full bg-[#0755C8] px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Static Typography-first Services List (Zero Layout Shift) */}
          <div className="lg:col-span-7">
            {/* Appliance installation */}
            <div>
              <div className="border-t-2 border-[#0B1F3A] pt-6 pb-6">
                <h3 className="text-xl font-bold text-[#0B1F3A] sm:text-2xl">
                  Appliance installation
                </h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-600">
                  At Mo&apos;s Quick Services we take pride in our work. We
                  always inspect your appliance before installation and perform
                  complete functional testing before we leave.
                </p>
              </div>
              <div className="border-t border-[#0B1F3A]/15">
                <InteractiveServiceList
                  items={APPLIANCE_INSTALLATIONS}
                  label="Appliance installation services"
                  startIndex={0}
                  activeId={activeId}
                  onHoverService={setActiveId}
                />
              </div>
            </div>

            {/* Handyman */}
            <div className="mt-16 lg:mt-20">
              <div className="border-t-2 border-[#0B1F3A] pt-6 pb-6">
                <h3 className="text-xl font-bold text-[#0B1F3A] sm:text-2xl">
                  We also go beyond the services listed
                </h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-600">
                  In addition to major appliances, our technicians handle
                  specialized plumbing upgrades, assemblies, and adjustments
                  across your home.
                </p>
              </div>
              <div className="border-t border-[#0B1F3A]/15">
                <InteractiveServiceList
                  items={ADDITIONAL_HANDYMAN_SERVICES}
                  label="Additional handyman services"
                  startIndex={0}
                  activeId={activeId}
                  onHoverService={setActiveId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}