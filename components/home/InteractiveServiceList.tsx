"use client";

import Image from "next/image";

export interface ServiceItem {
  id: string;
  name: string;
  note: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
}

interface InteractiveServiceListProps {
  items: ServiceItem[];
  label: string;
  startIndex?: number;
  activeId: string;
  onHoverService: (id: string) => void;
}

export default function InteractiveServiceList({
  items,
  label,
  startIndex = 0,
  activeId,
  onHoverService,
}: InteractiveServiceListProps) {
  return (
    <ol aria-label={label} className="list-none">
      {items.map((item, i) => {
        const isActive = activeId === item.id;
        const displayIndex = startIndex + i + 1;

        return (
          <li
            key={item.id}
            onMouseEnter={() => onHoverService(item.id)}
            className="border-b border-[#0B1F3A]/15 transition-colors duration-150"
          >
            {/* Interactive Row Header */}
            <button
              type="button"
              id={`service-row-${item.id}`}
              aria-expanded={isActive}
              onClick={() => onHoverService(item.id)}
              onFocus={() => onHoverService(item.id)}
              className={`group flex w-full cursor-pointer items-center justify-between py-5 sm:py-6 px-3 -mx-3 rounded-xl text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-2 ${
                isActive ? "bg-slate-50/90" : "hover:bg-slate-50/60"
              }`}
            >
              {/* Left: Number + Service Title */}
              <div className="flex items-center gap-5 sm:gap-7 min-w-0 pr-4">
                <span
                  aria-hidden="true"
                  className={`w-9 shrink-0 font-serif text-sm italic transition-colors duration-150 sm:text-base ${
                    isActive ? "text-[#0755C8] font-bold" : "text-[#0755C8]"
                  }`}
                >
                  ({String(displayIndex).padStart(2, "0")})
                </span>

                <span
                  className={`text-2xl font-medium leading-tight tracking-tight transition-colors duration-150 sm:text-3xl lg:text-[2rem] ${
                    isActive
                      ? "text-[#0755C8] font-semibold"
                      : "text-[#0B1F3A] group-hover:text-[#0755C8]"
                  }`}
                >
                  {item.name}
                </span>
              </div>

              {/* Right: Category Note + Directional Arrow */}
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-sm font-medium transition-colors duration-150 sm:text-base ${
                    isActive ? "text-[#0755C8] font-semibold" : "text-gray-500"
                  }`}
                >
                  {item.note}
                </span>
                <span
                  aria-hidden="true"
                  className={`text-lg text-[#0755C8] transition-all duration-200 hidden sm:inline-block ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                >
                  →
                </span>
              </div>
            </button>

            {/* Mobile-only inline accordion preview (Zero desktop layout shift) */}
            <div
              className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                isActive
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pt-1 pb-5 px-1">
                  <div className="relative w-full aspect-[4/3] max-h-[260px] overflow-hidden rounded-xl border border-gray-200/80 shadow-md bg-slate-50">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="100vw"
                      className="object-cover object-center"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}


