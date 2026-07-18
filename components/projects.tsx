"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

// --- Types & Data ---

interface ButtonProps {
  label: string;
  href: string;
  primary?: boolean;
  disabled?: boolean;
}

interface ProjectData {
  
  image: string;
  name: string;
  tag: string;
  status?: string;
  expected?: string;
  description: string;
  features: string[];
  tech: string[];
  links: ButtonProps[];

}

const FEATURED_PROJECT: ProjectData = {
image: "/images/krishisetu.png",
  name: "KrishiSetu",
  tag: "Featured Project",
  description:
    "An AI-powered market intelligence platform that empowers farmers with crop price prediction, multilingual voice interaction, weather insights and smart selling recommendations.",
  features: [
    "AI Price Prediction",
    "Voice Assistant",
    "Market Trends",
    "Weather Insights",
    "Farmer Dashboard",
    "Smart Selling Recommendations",
  ],
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Python"],
  links: [
  ],
};

const SECONDARY_PROJECTS: ProjectData[] = [
  {
    image: "/images/pothole.png",
    name: "Smart Pothole Detection System",
    tag: "Hardware & IoT",
    description:
      "An IoT-based road safety system that detects potholes using sensors and provides live monitoring through a dashboard.",
    features: ["ESP32", "MPU6050", "Ultrasonic Sensor", "Dashboard", "Real-time Monitoring"],
    tech: ["ESP32", "Arduino IDE", "HTML", "CSS", "JavaScript"],
    links: [],
  },
  {
    image: "/images/education-center.png",
    name: "Education Management System",
    tag: "Currently Building",
    status: "In Progress",
    expected: "August 2026",
    description:
      "A full-stack education management platform designed for students, teachers and administrators with secure authentication, PostgreSQL integration and role-based dashboards.",
    features: [
      "Role-Based Login",
      "Attendance",
      "Dashboard",
      "Student Records",
      "Faculty Panel",
      "PostgreSQL Database",
    ],
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    links: [],
  },
];

// --- Reusable Components ---

function SectionHeading({ label, heading, subtitle }: { label: string; heading: string; subtitle: string }) {
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

function StatusBadge({ text, inProgress = false }: { text: string; inProgress?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md ${
        inProgress
          ? "border-[#C084FC]/20 bg-[#C084FC]/10 text-[#C084FC]"
          : "border-[#F472B6]/20 bg-[#F472B6]/10 text-[#F472B6]"
      }`}
    >
      {inProgress && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C084FC] opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C084FC]"></span>
        </span>
      )}
      {text}
    </div>
  );
}

function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex cursor-default select-none items-center rounded-md border border-[#F8FAFC]/5 bg-[#0D1117]/60 px-2.5 py-1 text-xs font-medium text-[#F8FAFC]/70 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#F472B6]/30 hover:text-[#F8FAFC] hover:shadow-[0_0_12px_rgba(244,114,182,0.15)]">
      {name}
    </span>
  );
}

function FeatureTag({ name }: { name: string }) {
  return (
    <li className="flex items-center text-sm text-[#F8FAFC]/60">
      <svg className="mr-2 h-4 w-4 text-[#F472B6]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      {name}
    </li>
  );
}

function ProjectButton({ label, href, primary, disabled }: ButtonProps) {
  if (disabled) {
    return (
      <span className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-[#F8FAFC]/10 bg-[#F8FAFC]/5 px-5 py-2.5 text-sm font-semibold text-[#F8FAFC]/40">
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] ${
        primary
          ? "bg-gradient-to-r from-[#F472B6] to-[#C084FC] text-[#0D1117] hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]"
          : "border border-[#F8FAFC]/10 bg-[#161B22]/50 text-[#F8FAFC] hover:border-[#F8FAFC]/30 hover:bg-[#F8FAFC]/10"
      }`}
    >
      {label}
      {primary && (
        <svg
          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      )}
    </a>
  );
}

function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#0D1117] ${className}`}>
      {/* Abstract Mockup Design */}
      <div className="absolute inset-0 opacity-20 transition-transform duration-700 ease-out group-hover:scale-105">
        <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-[#F472B6] blur-[80px]"></div>
        <div className="absolute -bottom-[20%] -right-[20%] h-[60%] w-[60%] rounded-full bg-[#C084FC] blur-[80px]"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-[#F8FAFC]/20">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-mono text-sm tracking-widest">UI SCREENSHOT</span>
        </div>
      </div>
      
      {/* Sleek browser/app chrome */}
      <div className="absolute left-4 right-4 top-4 h-full rounded-t-xl border border-[#F8FAFC]/5 bg-[#161B22]/80 shadow-2xl backdrop-blur-sm transition-transform duration-700 ease-out group-hover:translate-y-2">
        <div className="flex items-center gap-2 border-b border-[#F8FAFC]/5 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#F8FAFC]/20"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#F8FAFC]/20"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#F8FAFC]/20"></div>
        </div>
        <div className="p-4">
          <div className="h-4 w-1/3 rounded bg-[#F8FAFC]/5"></div>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full rounded bg-[#F8FAFC]/5"></div>
            <div className="h-2 w-4/5 rounded bg-[#F8FAFC]/5"></div>
            <div className="h-2 w-5/6 rounded bg-[#F8FAFC]/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedProjectCard({ project }: { project: ProjectData }) {
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
      className={`group relative flex w-full flex-col overflow-hidden rounded-3xl border border-[#F8FAFC]/5 bg-[#161B22]/40 backdrop-blur-xl transition-all duration-700 ease-out hover:border-[#F472B6]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] lg:flex-row lg:items-stretch ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F472B6]/[0.03] to-[#C084FC]/[0.03] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Content Side */}
      <div className="flex flex-1 flex-col justify-center p-8 sm:p-12 lg:w-1/2">
        <div className="mb-6 flex items-center gap-4">
          <StatusBadge text={project.tag} />
        </div>

        <h3 className="text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl">
          {project.name}
        </h3>
        
        <p className="mt-4 text-base leading-relaxed text-[#F8FAFC]/70 sm:text-lg">
          {project.description}
        </p>

        <div className="mt-8">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]/40">
            Key Features
          </h4>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <FeatureTag key={feature} name={feature} />
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <TechChip key={tech} name={tech} />
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {project.links.map((link) => (
              <ProjectButton key={link.label} {...link} />
            ))}
          </div>
        )}
      </div>

      {/* Image Side */}
      <div className="relative min-h-[300px] border-t border-[#F8FAFC]/5 bg-[#0D1117]/50 lg:w-1/2 lg:border-l lg:border-t-0">
        <Image
  src={project.image}
  alt={project.name}
  fill
  className="object-cover transition-all duration-500 group-hover:scale-105"
/>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
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
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#F8FAFC]/5 bg-[#161B22]/40 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:border-[#C084FC]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#C084FC]/[0.02] to-[#F472B6]/[0.02] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative h-[240px] w-full border-b border-[#F8FAFC]/5 bg-[#0D1117]/50 sm:h-[280px]">
       <Image
  src={project.image}
  alt={project.name}
  fill
  className="object-cover transition-all duration-500 group-hover:scale-105"
/>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {project.status && (
            <StatusBadge text={project.status} inProgress={project.status === "In Progress"} />
          )}
          {project.expected && (
            <span className="text-xs font-medium text-[#F8FAFC]/40">
              Expected: {project.expected}
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">
          {project.name}
        </h3>
        
        <p className="mt-3 text-sm leading-relaxed text-[#F8FAFC]/60 sm:text-base">
          {project.description}
        </p>

        <div className="mt-6 mb-8 flex-1">
          <ul className="space-y-2">
            {project.features.map((feature) => (
              <FeatureTag key={feature} name={feature} />
            ))}
          </ul>
        </div>

        <div className={project.links.length > 0 || project.status === "In Progress" ? "mb-8 flex flex-wrap gap-2" : "mt-auto flex flex-wrap gap-2"}>
          {project.tech.map((tech) => (
            <TechChip key={tech} name={tech} />
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap items-center gap-3">
            {project.links.map((link) => (
              <ProjectButton key={link.label} {...link} />
            ))}
          </div>
        )}

        {project.links.length === 0 && project.status === "In Progress" && (
          <div className="mt-auto flex flex-col gap-2 rounded-xl border border-[#F8FAFC]/5 bg-[#0D1117]/50 p-4">
            <div className="flex items-center gap-2">
              <span className="text-base">🚀</span>
              <span className="text-sm font-semibold text-[#F8FAFC]">Currently Building</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#F8FAFC]/5 pt-2">
              <span className="text-xs font-medium text-[#F8FAFC]/40">Expected Completion</span>
              <span className="text-xs font-semibold text-[#C084FC]">{project.expected}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full overflow-hidden bg-[#0D1117] px-6 py-24 sm:py-32 lg:px-16">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#F472B6]/[0.03] blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-3/4 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-[#C084FC]/[0.03] blur-[120px]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="MY WORK"
          heading="Featured Projects"
          subtitle="A collection of projects that reflect my passion for Artificial Intelligence, Full Stack Development and solving real-world problems."
        />

        <div className="mt-16 flex flex-col gap-8 sm:gap-12">
          {/* Featured Full Width Project */}
          <FeaturedProjectCard project={FEATURED_PROJECT} />

          {/* Two Column Projects Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {SECONDARY_PROJECTS.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}