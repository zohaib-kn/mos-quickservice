"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface InstallationService {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  videoSrc?: string;
  galleryImages?: string[];
}

const INSTALLATION_SERVICES: InstallationService[] = [
  {
    id: "toilet-installation",
    title: "Toilet Installation",
    description: "Clean and professional toilet installation.",
    image: "/image/services/toilet-installation.webp",
    imageAlt: "Clean, professional white toilet installation in modern bathroom",
    href: "#installations",
    galleryImages: [
      "/image/services/toilet-installation.webp",
      "/image/services/toi-let/33696c70-9197-4ad8-8320-ace12869f707.webp",
      "/image/services/toi-let/42a37295-97a9-42b3-97f6-ed4b6dd33f85.webp",
      "/image/services/toi-let/5eef4a1a-9d18-4814-9e02-b3f0b9f8258c.webp",
      "/image/services/toi-let/884560a2-3381-4bd6-b5d2-5c7b82f6382e.webp",
    ],
  },
  {
    id: "faucet-installation",
    title: "Faucet Installation",
    description: "Kitchen, bathroom and utility faucets.",
    image: "/image/services/faucet-sink-installation.webp",
    imageAlt: "Modern chrome basin faucet and sink installation",
    href: "#installations",
    videoSrc: "/Videos/Faucet Installation.mp4",
  },
  {
    id: "fridge-water-line",
    title: "Fridge Water Line",
    description: "Connect your fridge to a water supply.",
    image: "/image/services/refrigerator-installation.webp",
    imageAlt: "Stainless steel refrigerator water and ice line installation",
    href: "#installations",
    videoSrc: "/Videos/Fridge waterline.mp4",
  },
  {
    id: "dishwasher-installation",
    title: "Dishwasher Installation",
    description: "Full setup and installation for your dishwasher.",
    image: "/image/services/dishwasher-installation.webp",
    imageAlt: "Built-in kitchen dishwasher installation with dish rack",
    href: "#installations",
    videoSrc: "/Videos/Dishwasher.mp4",
  },
];

function ServiceCard({
  service,
  isActiveOnMobile,
  onToggleMobile,
}: {
  service: InstallationService;
  isActiveOnMobile: boolean;
  onToggleMobile: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Detect desktop pointer with true hover capability (filters out mobile/touch)
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(hoverMq.matches);
    const handleHoverChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    hoverMq.addEventListener("change", handleHoverChange);

    // Detect prefers-reduced-motion
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionMq.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionMq.addEventListener("change", handleMotionChange);

    return () => {
      hoverMq.removeEventListener("change", handleHoverChange);
      motionMq.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Active condition: hover on desktop or tap-active on mobile
  const isPlaying =
    !reducedMotion && ((canHover && isHovered) || (!canHover && isActiveOnMobile));

  const handleActivate = () => {
    if (!canHover || reducedMotion) return;
    setIsHovered(true);
    if (service.videoSrc) {
      if (!hasLoaded) setHasLoaded(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleDeactivate = () => {
    if (!canHover) return;
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // On mobile touch devices, tap toggles playback rather than jumping anchors
    if (!canHover) {
      e.preventDefault();
      if (!isActiveOnMobile) {
        if (!hasLoaded) setHasLoaded(true);
        if (videoRef.current && service.videoSrc) {
          videoRef.current.play().catch(() => {});
        }
      }
      onToggleMobile();
    }
  };

  // Video playback management
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !service.videoSrc) return;

    if (isPlaying) {
      if (!hasLoaded) setHasLoaded(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Gracefully ignore interrupted or blocked autoplay
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying, hasLoaded, service.videoSrc]);

  // Image slideshow management (800ms cycle for responsive feel)
  useEffect(() => {
    if (!service.galleryImages || service.galleryImages.length <= 1) return;

    if (isPlaying) {
      const timer = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % service.galleryImages!.length);
      }, 800);

      return () => clearInterval(timer);
    } else {
      setActiveSlide(0);
    }
  }, [isPlaying, service.galleryImages]);

  const hasGallery = service.galleryImages && service.galleryImages.length > 1;

  return (
    <li className="flex">
      <Link
        href={service.href}
        onClick={handleClick}
        onPointerEnter={handleActivate}
        onPointerLeave={handleDeactivate}
        onFocus={handleActivate}
        onBlur={handleDeactivate}
        className="group relative flex w-full flex-col overflow-hidden rounded-sm rounded-br-[56px] bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0755C8]"
      >
        {/* Photo + Video Area: diagonal polygon mask maintained */}
        <div className="relative h-[280px] w-full overflow-hidden [clip-path:polygon(0_0,100%_0,100%_86%,0_100%)] sm:h-[300px]">
          {hasGallery ? (
            <div className="relative h-full w-full">
              {/* Base default image */}
              <Image
                src={service.galleryImages![0]}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />

              {/* Crossfading slideshow images on hover */}
              {service.galleryImages!.slice(1).map((imgSrc, sliceIdx) => {
                const imageIndex = sliceIdx + 1;
                const isActive = activeSlide === imageIndex;
                return (
                  <Image
                    key={imgSrc}
                    src={imgSrc}
                    alt={`${service.title} photo ${imageIndex + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover object-center transition-all duration-250 ease-in-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  />
                );
              })}
            </div>
          ) : (
            /* Single image base */
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          )}
          {/* Video layer with snappy 180ms fade-in */}
          {service.videoSrc && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload={hasLoaded ? "auto" : "metadata"}
              src={service.videoSrc}
              aria-hidden="true"
              tabIndex={-1}
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 ease-out ${
                isPlaying ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        {/* Content panel */}
        <div className="flex flex-1 flex-col px-6 pb-7 pt-4 sm:px-7">
          <h3 className="text-2xl font-bold leading-tight text-[#0B1F3A] sm:text-[1.65rem]">
            {service.title}
          </h3>
          <p className="mt-3 flex-1 text-base leading-relaxed text-gray-600">
            {service.description}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default function InstallationServices() {
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);

  const handleToggleMobile = (id: string) => {
    setActiveMobileId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="installations"
      aria-labelledby="installations-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#0755C8] to-[#0A3A80] py-14 sm:py-16 lg:py-20"
    >
      {/* Navy band behind the header; cards overlap its lower edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[300px] bg-[#0B1F3A] sm:h-[270px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2
              id="installations-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Installation services
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              Toilets, faucets, fridges and dishwashers, fitted and connected
              for you.
            </p>
          </div>

          <Link
            href="#services"
            className="inline-flex w-fit items-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A] motion-reduce:transition-none"
          >
            View all services
          </Link>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {INSTALLATION_SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isActiveOnMobile={activeMobileId === service.id}
              onToggleMobile={() => handleToggleMobile(service.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}