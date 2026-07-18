"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

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
    image: "/certificates/infosys-ai.png", //
    pdf: "/certificates/infosys-ai.pdf",
  },
  {
    title: "Mastering DevOps",
    organization: "Infosys Springboard",
    date: "March 2026",
    category: "DevOps",
    description:
      "Completed a certification covering DevOps lifecycle, CI/CD pipelines, deployment workflows and automation practices.",
    image: "/certificates/devops.png", //
    pdf: "/certificates/devops.pdf",
  },
  {
    title: "Effective Time Management",
    organization: "Tech Veda",
    date: "November 2025",
    category: "Professional Skills",
    description:
      "Completed a certified course focused on productivity, planning, prioritization and personal effectiveness.",
    image: "/certificates/time-management.png", //
    pdf: "/certificates/time-management.pdf",
  },
];

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
    <div className="mx-auto mb-20 max-w-3xl text-center">
      <span className="inline-block rounded-full border border-[#F472B6]/10 bg-[#F472B6]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F472B6]">
        {label}
      </span>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      <p className="mt-6 text-base leading-relaxed text-[#F8FAFC]/60 sm:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

function CertificationCard({
  cert,
  index,
}: {
  cert: CertificationData;
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
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#F8FAFC]/5 bg-[#161B22]/40 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#F472B6]/30 hover:shadow-[0_20px_40px_rgba(244,114,182,0.15)] ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Soft Pink Glow Background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F472B6]/[0.03] to-[#C084FC]/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative h-[240px] w-full overflow-hidden border-b border-[#F8FAFC]/5 bg-[#0D1117]/50 sm:h-[280px]">
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-[#C084FC]/20 bg-[#C084FC]/10 px-2.5 py-0.5 text-xs font-semibold text-[#C084FC] backdrop-blur-md">
            {cert.category}
          </span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">
          {cert.title}
        </h3>

        <div className="mt-3 flex items-center justify-between border-b border-[#F8FAFC]/5 pb-4">
          <span className="text-sm font-medium text-[#F8FAFC]/80">
            {cert.organization}
          </span>
          <span className="text-xs font-medium text-[#F8FAFC]/40">
            {cert.date}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#F8FAFC]/60 sm:text-base">
          {cert.description}
        </p>
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden bg-[#0D1117] px-6 py-24 sm:py-32 lg:px-16"
    >
      {/* Background ambient glows */}
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#F472B6]/[0.03] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-3/4 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-[#C084FC]/[0.03] blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="CERTIFICATIONS"
          heading="Continuous Learning Journey"
          subtitle="I enjoy learning continuously and expanding my skills through industry-recognized certifications. Every certificate represents a step toward becoming a better software engineer."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <CertificationCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}