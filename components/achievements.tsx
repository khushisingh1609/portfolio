"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { SectionOrbit } from "./section-orbit";

// --- UI Components ---

function SectionHeading({
  label,
  heading,
  subtitle,
}: {
  label: string;
  heading: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto mb-20 max-w-3xl text-center flex flex-col items-center">
      <span className="mb-4 inline-block rounded-full border border-[#F472B6]/10 bg-[#F472B6]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F472B6]">
        {label}
      </span>
      
      {/* The wrapped heading with the glowing pink orbit */}
      <div className="relative mt-2 w-fit mx-auto">
        <SectionOrbit variant="achievements" className="scale-75 sm:scale-100 origin-center" />
        <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
      </div>

      <p className="mt-6 text-base leading-relaxed text-[#F8FAFC]/60 sm:text-lg">
        {subtitle}
      </p>
    </div>
  );
}
function Modal({
  isOpen,
  onClose,
  imageSrc,
  altText,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0D1117]/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col items-center justify-center rounded-3xl border border-[#F8FAFC]/10 bg-[#161B22]/90 p-4 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#F8FAFC]/10 bg-[#0D1117]/50 text-[#F8FAFC]/70 backdrop-blur-md transition-all hover:scale-105 hover:bg-[#F8FAFC]/10 hover:text-[#F8FAFC]"
          aria-label="Close modal"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

// --- Achievement Cards ---

function FeaturedAchievement() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className={`group relative flex w-full flex-col overflow-hidden rounded-3xl border border-[#F8FAFC]/5 bg-[#161B22]/40 backdrop-blur-xl transition-all duration-700 ease-out hover:border-[#F472B6]/30 hover:shadow-[0_20px_60px_rgba(244,114,182,0.15)] lg:flex-row lg:items-stretch ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F472B6]/[0.03] to-[#C084FC]/[0.03] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Content Side */}
        <div className="flex flex-1 flex-col justify-center p-8 sm:p-12 lg:w-1/2">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F472B6]/20 to-[#C084FC]/20 text-2xl shadow-[0_0_20px_rgba(244,114,182,0.2)]">
              🏆
            </span>
            <span className="inline-flex items-center rounded-full border border-[#F472B6]/20 bg-[#F472B6]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#F472B6] backdrop-blur-md">
              2nd Position
            </span>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl">
            2nd Place
          </h3>
          <p className="mt-2 text-xl font-medium text-[#C084FC]">
            Cod-A-Fest X 3.0
          </p>

          <div className="mt-6 border-l-2 border-[#F8FAFC]/10 pl-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]/40">
              Organizer
            </p>
            <p className="mt-1 text-base text-[#F8FAFC]/80">
              InnovXus &middot; Lovely Professional University
            </p>
          </div>

          <p className="mt-6 text-base leading-relaxed text-[#F8FAFC]/60 sm:text-lg">
            Secured 2nd Position in Cod-A-Fest X 3.0 by developing an innovative
            software solution within hackathon constraints.
          </p>

          <div className="mt-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group/btn relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#F472B6] to-[#C084FC] px-6 py-3 text-sm font-bold text-[#0D1117] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] active:scale-[0.98]"
            >
              View Achievement
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative flex min-h-[300px] items-center justify-center border-t border-[#F8FAFC]/5 bg-[#0D1117]/50 p-6 lg:w-1/2 lg:border-l lg:border-t-0">
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#F8FAFC]/10 bg-[#161B22] shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]">
            <Image
            src="/achievements/codafest-2nd-place.png"
              alt="Cod-A-Fest X 3.0 Certificate"
              fill
              className="object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc="/achievements/codafest-2nd-place.png"
        altText="Cod-A-Fest X 3.0 Certificate"
      />
    </>
  );
}

function MiniCard({
  icon,
  title,
  children,
  index,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-[#F8FAFC]/5 bg-[#161B22]/40 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#C084FC]/30 hover:shadow-[0_20px_40px_rgba(192,132,252,0.1)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#C084FC]/[0.02] to-[#F472B6]/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1117]/80 text-xl shadow-inner border border-[#F8FAFC]/5">
          {icon}
        </span>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]/60">
          {title}
        </h4>
      </div>
      
      <div className="flex flex-1 flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative w-full overflow-hidden bg-[#0D1117] px-6 py-24 sm:py-32 lg:px-16"
    >
      {/* Ambient Background Glows */}
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#C084FC]/[0.03] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-3/4 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-[#F472B6]/[0.03] blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="ACHIEVEMENTS"
          heading="Highlights Of My Journey"
          subtitle="Some memorable milestones that reflect my academic journey, competitive achievements and continuous growth as a software engineer."
        />

        <div className="mt-16 flex flex-col gap-6 sm:gap-8">
          {/* Hero Achievement */}
          <FeaturedAchievement />

          {/* Mini Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            
            {/* 1. CGPA */}
            <MiniCard icon="🎓" title="Semester CGPA" index={1}>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-[#F8FAFC] drop-shadow-md">
                  9.0
                </span>
                <span className="text-sm font-medium text-[#F472B6]">/10</span>
              </div>
            </MiniCard>

            {/* 2. Projects Built */}
            <MiniCard icon="💻" title="Projects Built" index={2}>
              <div className="mb-3 text-4xl font-bold tracking-tight text-[#F8FAFC]">
                3+
              </div>
              <ul className="flex flex-col gap-1.5 text-xs text-[#F8FAFC]/50">
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#C084FC]"></span>
                  KrishiSetu
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#C084FC]"></span>
                  Smart Pothole Detection
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#C084FC]"></span>
                  Education Mgmt System
                </li>
              </ul>
            </MiniCard>

            {/* 3. Currently Building */}
            <MiniCard icon="🚀" title="Currently Building" index={3}>
              <p className="mb-4 text-lg font-bold leading-tight text-[#F8FAFC]">
                Education Management System
              </p>
              <div className="mt-auto flex items-center justify-between rounded-lg border border-[#F472B6]/20 bg-[#F472B6]/5 px-3 py-2 backdrop-blur-sm">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F472B6]/70">
                  Expected
                </span>
                <span className="text-xs font-bold text-[#F472B6]">
                  August 2026
                </span>
              </div>
            </MiniCard>

            {/* 4. Continuous Learning */}
            <MiniCard icon="📚" title="Continuous Learning" index={4}>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Artificial Intelligence", "DevOps", "DSA", "PostgreSQL"].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md border border-[#F8FAFC]/10 bg-[#0D1117]/60 px-2.5 py-1 text-xs font-medium text-[#F8FAFC]/70 transition-colors group-hover:border-[#C084FC]/30 group-hover:text-[#F8FAFC]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </MiniCard>

          </div>
        </div>
      </div>
    </section>
  );
}