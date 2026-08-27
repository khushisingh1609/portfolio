"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { SectionOrbit } from "./section-orbit";

/* ============================================================
   DATA
   ============================================================ */

interface CertificationData {
  title: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  image: string;
  pdf: string;

}

const CERTIFICATIONS_DATA: CertificationData[] = [
  {
    title: "Introduction to Artificial Intelligence",
    organization: "Infosys Springboard",
    date: "March 2026",
    category: "Artificial Intelligence",
    description:
      "Learned AI fundamentals including intelligent systems, machine learning concepts and practical AI applications.",
    image: "/certificates/infosys-ai.png",
    pdf: "/certificates/infosys-ai.pdf"
  },
  {
    title: "Mastering DevOps",
    organization: "Infosys Springboard",
    date: "March 2026",
    category: "DevOps",
    description:
      "Completed a certification covering DevOps lifecycle, CI/CD pipelines, deployment workflows and automation practices.",
    image: "/certificates/devops.png",
    pdf: "/certificates/devops.pdf",
  
  },
  {
    title: "Effective Time Management",
    organization: "Tech Veda",
    date: "November 2025",
    category: "Professional Skills",
    description:
      "Completed a certified course focused on productivity, planning, prioritization and personal effectiveness.",
    image: "/certificates/time-management.png",
    pdf: "/certificates/time-management.png",
   
  },
];

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const sectionHeadingVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Left-panel description crossfade */
const descriptionVariants: Variants = {
  enter: { opacity: 0, y: 30, filter: "blur(6px)" },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(6px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/* ============================================================
   SECTION HEADING
   ============================================================ */

function SectionHeading({
  label,
  heading,
  subtitle,
}: {
  label: string;
  heading: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      // Added flex flex-col items-center to ensure the orbit stays perfectly centered
      className="mx-auto mb-16 max-w-3xl flex flex-col items-center text-center sm:mb-20"
      variants={sectionHeadingVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.span
        // Added mb-4 here so it doesn't collide with the orbit
        className="mb-4 inline-block rounded-full border border-[#F472B6]/10 bg-[#F472B6]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F472B6]"
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {label}
      </motion.span>
      
      {/* The wrapped heading with the glowing pink orbit */}
      <div className="relative mt-2 w-fit mx-auto">
        <SectionOrbit variant="certifications" className="scale-75 sm:scale-100 origin-center" />
        <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
      </div>

      <p className="mt-6 text-base leading-relaxed text-[#F8FAFC]/60 sm:text-lg">
        {subtitle}
      </p>
    </motion.div>
  );
}
/* ============================================================
   VERTICAL MARQUEE (right side — infinite loop)
   ============================================================ */

function VerticalMarquee({
  activeIndex,
  onActiveChange,
}: {
  activeIndex: number;
  onActiveChange: (i: number) => void;
}) {
  /*
   * We render 3 copies of the list stacked vertically.
   * CSS animation scrolls the container upward by exactly one copy-height,
   * then resets seamlessly (infinite loop).
   * Total items rendered = items × 3 (enough for seamless wrap).
   */
  const items = CERTIFICATIONS_DATA;
  const copies = 3;
  const allItems = Array.from({ length: copies }, () => items).flat();

  /* Track which card is near the centre of the viewport strip */
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const detectActive = useCallback(() => {
    if (!stripRef.current) return;
    const strip = stripRef.current;
    const stripRect = strip.getBoundingClientRect();
    const centerY = stripRect.top + stripRect.height / 2;

    let closest = 0;
    let closestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - centerY);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i % items.length;
      }
    });

    if (closest !== activeIndex) {
      onActiveChange(closest);
    }
  }, [activeIndex, items.length, onActiveChange]);

  /* Poll for active card (the CSS animation runs in the browser) */
  useEffect(() => {
    const id = setInterval(detectActive, 400);
    return () => clearInterval(id);
  }, [detectActive]);

  /* The height of one full set — used to size the animation */
  const CARD_HEIGHT_REM = 20; // each card ~20rem tall (gap included)
  const singleSetHeight = items.length * CARD_HEIGHT_REM; // rem

  return (
    <div
      ref={stripRef}
      className="relative h-[32rem] overflow-hidden sm:h-[36rem]"
      /* Fade edges */
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div
        className="marquee-track flex flex-col gap-8"
        style={{
          animation: `scroll-up ${items.length * 4}s linear infinite`,
        }}
      >
        {allItems.map((cert, i) => {
          const realIndex = i % items.length;
          const isActive = realIndex === activeIndex;
          return (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`group relative w-full shrink-0 cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ${
                isActive
                  ? "border-[#F472B6]/40 shadow-[0_0_30px_rgba(244,114,182,0.15)] scale-[1.03]"
                  : "border-[#F8FAFC]/[0.06] hover:border-[#C084FC]/20"
              } bg-[#161B22]/50 backdrop-blur-xl`}
              onClick={() => onActiveChange(realIndex)}
            >
              {/* Shimmer */}
              <div
                className="shimmer-line pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(244,114,182,0.06) 50%, transparent 100%)",
                }}
              />

              <div className="relative h-48 w-full overflow-hidden bg-[#0D1117]/60 sm:h-56">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Small title below image */}
              <div className="px-4 py-3 sm:px-5 sm:py-4">
                <p className="truncate text-sm font-semibold text-[#F8FAFC]/90">
                  {cert.title}
                </p>
                <p className="mt-0.5 text-xs text-[#F8FAFC]/40">
                  {cert.organization}
                </p>
              </div>

              {/* Active indicator bar */}
              <div
                className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#F472B6] to-[#C084FC] transition-transform duration-500 origin-left ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Keyframe for infinite scroll — injected once */}
      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-${singleSetHeight}rem); }
        }
        .shimmer-line {
          animation: shimmer-sweep 3s ease-in-out infinite;
        }
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(200%); }
          100% { transform: translateX(200%); }
        }
        .marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   LEFT DESCRIPTION PANEL (sticky)
   ============================================================ */

function DescriptionPanel({ activeIndex }: { activeIndex: number }) {
  const cert = CERTIFICATIONS_DATA[activeIndex];

  return (
    <div className="flex h-full flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={descriptionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="space-y-6"
        >
          {/* Category badge */}
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-full border border-[#C084FC]/25 bg-[#C084FC]/10 px-3 py-1 text-xs font-semibold text-[#C084FC] backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="text-sm"></span>
            {cert.category}
          </motion.span>

          {/* Title */}
          <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
            {cert.title}
          </h3>

          {/* Org & date */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[#F8FAFC]/80">
              {cert.organization}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#F8FAFC]/20" />
            <span className="flex items-center gap-1.5 text-sm text-[#F8FAFC]/50">
              <svg
                className="h-3.5 w-3.5 text-[#F472B6]/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {cert.date}
            </span>
          </div>

          {/* Separator */}
          <div className="h-px w-16 bg-gradient-to-r from-[#F472B6]/40 to-transparent" />

          {/* Description */}
          <p className="max-w-md text-base leading-relaxed text-[#F8FAFC]/60 sm:text-lg">
            {cert.description}
          </p>

          {/* View certificate link */}
          <motion.a
            href={cert.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 rounded-lg border border-[#F472B6]/20 bg-[#F472B6]/5 px-5 py-2.5 text-sm font-semibold text-[#F472B6] transition-all duration-300 hover:border-[#F472B6]/40 hover:bg-[#F472B6]/10 hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            View Certificate
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Dots indicator */}
          <div className="flex items-center gap-2 pt-4">
            {CERTIFICATIONS_DATA.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-8 bg-gradient-to-r from-[#F472B6] to-[#C084FC]"
                    : "w-1.5 bg-[#F8FAFC]/15"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   FLOATING PARTICLES (background)
   ============================================================ */

function FloatingParticles() {
  /* Use fixed positions to avoid server/client hydration mismatch */
  const particles = [
    { id: 0, x: 12, y: 8, size: 2, duration: 10, delay: 0, color: "#F472B6" },
    { id: 1, x: 85, y: 15, size: 3, duration: 12, delay: 1, color: "#C084FC" },
    { id: 2, x: 45, y: 90, size: 1.5, duration: 8, delay: 2, color: "#22d3ee" },
    { id: 3, x: 72, y: 42, size: 2.5, duration: 9, delay: 0.5, color: "#F472B6" },
    { id: 4, x: 25, y: 65, size: 1, duration: 11, delay: 3, color: "#C084FC" },
    { id: 5, x: 92, y: 78, size: 3.5, duration: 7, delay: 1.5, color: "#22d3ee" },
    { id: 6, x: 5, y: 50, size: 2, duration: 13, delay: 2.5, color: "#F472B6" },
    { id: 7, x: 60, y: 22, size: 1.5, duration: 10, delay: 0.8, color: "#C084FC" },
    { id: 8, x: 38, y: 72, size: 2.5, duration: 9, delay: 3.5, color: "#22d3ee" },
    { id: 9, x: 78, y: 55, size: 1, duration: 14, delay: 1.2, color: "#F472B6" },
    { id: 10, x: 18, y: 35, size: 3, duration: 8, delay: 2.8, color: "#C084FC" },
    { id: 11, x: 55, y: 5, size: 2, duration: 11, delay: 0.3, color: "#22d3ee" },
    { id: 12, x: 30, y: 88, size: 1.5, duration: 12, delay: 1.8, color: "#F472B6" },
    { id: 13, x: 95, y: 30, size: 2.5, duration: 7, delay: 3.2, color: "#C084FC" },
    { id: 14, x: 50, y: 60, size: 1, duration: 9, delay: 0.6, color: "#22d3ee" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -25, 10, -15, 0],
            x: [0, 10, -8, 5, 0],
            opacity: [0.15, 0.4, 0.2, 0.35, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   MAIN EXPORT
   ============================================================ */

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden bg-[#0D1117] px-6 py-24 sm:py-32 lg:px-16"
    >
      {/* Background ambient glows */}
      <motion.div
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#F472B6]/[0.03] blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-3/4 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-[#C084FC]/[0.03] blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden="true"
      />

      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="CERTIFICATIONS"
          heading="Continuous Learning Journey"
          subtitle="I enjoy learning continuously and expanding my skills through industry-recognized certifications. Every certificate represents a step toward becoming a better software engineer."
        />

        {/* ---- Split layout ---- */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — Description */}
          <div className="order-2 lg:order-1">
            <DescriptionPanel activeIndex={activeIndex} />
          </div>

          {/* RIGHT — Scrolling certificates */}
          <div className="order-1 lg:order-2">
            <VerticalMarquee
              activeIndex={activeIndex}
              onActiveChange={setActiveIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}