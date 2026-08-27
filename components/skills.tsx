"use client";

import { useEffect, useState, useRef } from "react";
import { SectionOrbit } from "./section-orbit"; // <-- NEW IMPORT

interface SkillCardProps {
  title: string;
  description: string;
  skills: string[];
  icon: React.ReactNode;
  index: number;
}

interface LearningItemProps {
  title: string;
  description: string;
  index: number;
}

const SKILL_CARDS = [
  {
    title: "Programming Languages",
    description: "Languages I use to solve problems and build software.",
    skills: ["Python", "C", "C++", "JavaScript"],
    icon: (
      <svg className="h-6 w-6 text-[#F472B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Frontend Development",
    description: "Creating responsive and modern user interfaces.",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    icon: (
      <svg className="h-6 w-6 text-[#C084FC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Backend & Database",
    description: "Building scalable backend systems and databases.",
    skills: ["PostgreSQL", "Supabase", "REST APIs"],
    icon: (
      <svg className="h-6 w-6 text-[#F472B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: "Tools & Workflow",
    description: "Tools that help me build efficiently.",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Postman"],
    icon: (
      <svg className="h-6 w-6 text-[#C084FC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
];

const LEARNING_ITEMS = [
  {
    title: "AI / ML",
    description: "Learning machine learning fundamentals and building intelligent applications.",
  },
  {
    title: "DSA in C++",
    description: "Strengthening problem-solving for interviews.",
  },
  {
    title: "PostgreSQL",
    description: "Learning advanced database design and optimization.",
  },
  {
    title: "Full Stack Development",
    description: "Building complete production-ready applications.",
  },
];

function SectionHeading({ label, heading, subtitle }: { label: string; heading: string; subtitle: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
      <span className="text-[10px] font-bold tracking-[0.25em] text-[#F472B6] uppercase bg-[#F472B6]/5 px-3 py-1 rounded-full border border-[#F472B6]/10 mb-4 inline-block">
        {label}
      </span>
      
      {/* MODIFIED: Wrapped heading in centered relative container with Orbit */}
      <div className="relative mt-2 w-fit mx-auto">
        <SectionOrbit variant="skills" className="scale-75 sm:scale-100 origin-center" />
        <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC] px-6 py-2">
          {heading}
        </h2>
      </div>

      <p className="mt-4 text-base sm:text-lg text-[#F8FAFC]/60 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

function SkillChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[#F8FAFC]/5 bg-[#0D1117]/60 px-3 py-1 text-xs font-medium text-[#F8FAFC]/70 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#C084FC]/30 hover:text-[#F8FAFC] hover:shadow-[0_0_12px_rgba(192,132,252,0.15)] select-none cursor-default">
      {name}
    </span>
  );
}

function SkillCard({ title, description, skills, icon, index }: SkillCardProps) {
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
      className={`group relative overflow-hidden rounded-2xl border border-[#F8FAFC]/5 bg-[#161B22]/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#F472B6]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[#F472B6]/[0.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F472B6]/[0.02] to-[#C084FC]/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
        aria-hidden="true"
      />
      
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F8FAFC]/10 bg-[#0D1117]/80 shadow-inner transition-transform duration-500 ease-out group-hover:scale-110">
          {icon}
        </div>
        <span className="font-mono text-[10px] text-[#F8FAFC]/20 tracking-wider">0{index + 1}</span>
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-tight text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#F8FAFC]">
        {title}
      </h3>
      
      <p className="mt-2.5 text-sm leading-relaxed text-[#F8FAFC]/50">
        {description}
      </p>

      <div className="mt-6 h-px w-full bg-gradient-to-r from-[#F8FAFC]/10 to-transparent" aria-hidden="true" />

      <div className="mt-6 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillChip key={skill} name={skill} />
        ))}
      </div>
    </div>
  );
}

function LearningCard({ title, description, index }: LearningItemProps) {
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
      className={`relative pl-8 sm:pl-12 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute left-0 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[#0D1117] border-2 border-[#C084FC] transition-transform duration-300 group-hover:scale-125">
        <div className="h-1.5 w-1.5 rounded-full bg-[#C084FC] animate-pulse" />
      </div>

      <div className="group relative rounded-xl border border-[#F8FAFC]/5 bg-[#161B22]/30 p-5 sm:p-6 backdrop-blur-sm transition-all duration-500 ease-out hover:border-[#C084FC]/20 hover:bg-[#161B22]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
        <h4 className="text-base font-semibold tracking-tight text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#C084FC]">
          {title}
        </h4>
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#F8FAFC]/50">
          {description}
        </p>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="relative max-w-2xl mx-auto mt-12">
      <div 
        className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#C084FC]/40 via-[#F472B6]/20 to-transparent" 
        aria-hidden="true" 
      />
      <div className="space-y-6">
        {LEARNING_ITEMS.map((item, index) => (
          <LearningCard
            key={item.title}
            title={item.title}
            description={item.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative w-full overflow-hidden bg-[#0D1117] px-6 py-24 sm:py-32 lg:px-16">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-[#F472B6]/[0.02] blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[600px] rounded-full bg-[#C084FC]/[0.01] blur-[100px]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="MY TOOLBOX"
          heading="Skills & Technologies"
          subtitle="The technologies I use to build AI-powered software, full-stack applications and solve real-world problems."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {SKILL_CARDS.map((card, index) => (
            <SkillCard
              key={card.title}
              title={card.title}
              description={card.description}
              skills={card.skills}
              icon={card.icon}
              index={index}
            />
          ))}
        </div>

        <div className="mt-28 sm:mt-36">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#C084FC] uppercase bg-[#C084FC]/5 px-3 py-1 rounded-full border border-[#C084FC]/10">
              CURRENTLY LEARNING
            </span>
          </div>
          <Timeline />
        </div>
      </div>
    </section>
  );
}