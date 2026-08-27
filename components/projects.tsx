"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SectionOrbit } from "./section-orbit";

// --- Data ---
interface ProjectData {
  id: string;
  image: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: "krishisetu",
    image: "/images/krishisetu.png",
    number: "01",
    category: "AI & FULL-STACK PLATFORM",
    title: "KrishiSetu",
    subtitle: "AI-Powered Agricultural Ecosystem",
    description: "An intelligent platform that empowers farmers with data-driven insights, crop price predictions, and smart decision tools for better harvests and higher profits.",
    tech: ["AI & ML", "Next.js", "Python", "Computer Vision", "Tailwind CSS"],
    link: "https://krishisetu-team404.vercel.app/",
  },
  {
    id: "pothole",
    image: "/images/pothole.png",
    number: "02",
    category: "HARDWARE & IOT",
    title: "Smart Pothole Detection",
    subtitle: "IoT-based Road Safety System",
    description: "A real-time monitoring system that utilizes sensors and microcontrollers to detect road anomalies and ensure safer commutes.",
    tech: ["ESP32", "IoT", "Arduino", "JavaScript"],
    link: "#",
  },
  {
    id: "ems",
    image: "/images/education-center.png",
    number: "03",
    category: "WEB APPLICATION",
    title: "Education Mgmt System",
    subtitle: "Full-Stack Educational Platform",
    description: "A comprehensive management system designed for students, teachers, and administrators featuring secure authentication and role-based access.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    link: "#",
  },
];

// --- Reusable Section Heading with Orbit ---
function SectionHeading({ label, heading, subtitle }: { label: string; heading: string; subtitle: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
      <span className="text-[10px] font-bold tracking-[0.25em] text-[#F472B6] uppercase bg-[#F472B6]/5 px-3 py-1 rounded-full border border-[#F472B6]/10 mb-4 inline-block">
        {label}
      </span>

      {/* The wrapped heading with the glowing pink orbit */}
      <div className="relative mt-2 w-fit mx-auto">
        <SectionOrbit variant="projects" className="scale-75 sm:scale-100 origin-center" />
        <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
          {heading}
        </h2>
      </div>

      <p className="mt-4 text-base sm:text-lg text-[#F8FAFC]/60 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

// --- Typewriter Component ---
function Typewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let i = 0;
    
    const timeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, 30);
      
      return () => clearInterval(intervalId);
    }, 400);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="min-h-[80px]">
      <span className="text-base leading-relaxed text-[#F8FAFC]/60 sm:text-lg">
        {displayedText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="ml-1 inline-block h-4 w-[2px] bg-[#F472B6] align-middle shadow-[0_0_8px_#F472B6]"
      />
    </div>
  );
}

// --- Main Component ---
export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.4 },
      },
    }),
  };

  if (!isMounted) return null;

  const currentProject = PROJECTS[currentIndex];
  const totalStr = PROJECTS.length.toString().padStart(2, '0');

  return (
    <section id="projects" className="relative w-full overflow-hidden bg-[#0D1117] px-6 py-24 sm:py-32 lg:px-16">
      
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#F472B6]/[0.03] blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-3/4 h-[450px] w-[450px] translate-x-1/3 rounded-full bg-[#C084FC]/[0.03] blur-[140px]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        
        <SectionHeading
          label="MY WORK"
          heading="Products I've Built"
          subtitle="A collection of production-grade software, AI experiments, and full-stack platforms engineered to solve real-world problems."
        />

        {/* Carousel Body */}
        <div className="relative min-h-[450px] w-full overflow-hidden pt-4">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:gap-20"
            >
              
              {/* Left Side: Image */}
              <div className="relative w-full lg:w-1/2 flex flex-col justify-center">
                {/* Subtle background glow */}
                <div className="absolute inset-0 -z-10 -translate-x-6 translate-y-6 sm:-translate-x-10 sm:translate-y-10 rounded-[40px] bg-gradient-to-br from-[#F472B6]/15 to-[#C084FC]/5 blur-[60px] transition-all duration-700" />
                
                {/* Image container using aspect-[16/10] for perfect screenshot framing */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-3xl border border-[#F8FAFC]/10 bg-[#0D1117] shadow-2xl group p-1">
                  <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="flex w-full flex-col justify-center lg:w-1/2">
                
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F472B6]">
                  {currentProject.number} / {totalStr} &mdash; {currentProject.category}
                </p>
                
                <h3 className="mb-2 flex items-center gap-3 text-4xl font-bold tracking-tight text-[#F8FAFC] sm:text-5xl group">
                  {currentProject.title}
                  {currentProject.link && (
                    <a href={currentProject.link} className="text-[#F8FAFC]/20 transition-all duration-300 hover:text-[#F472B6] hover:scale-110">
                      <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  )}
                </h3>
                
                <p className="mb-8 text-lg font-medium text-[#C084FC]">
                  {currentProject.subtitle}
                </p>
                
                <div className="mb-10">
                  <Typewriter text={currentProject.description} />
                </div>
                
                {/* Tech Stack Pills */}
                <div className="mb-12 flex flex-wrap gap-3">
                  {currentProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex cursor-default rounded-md border border-[#F8FAFC]/10 bg-[#0D1117]/80 px-3 py-1.5 text-xs font-medium text-[#F8FAFC]/70 transition-all hover:-translate-y-0.5 hover:border-[#F472B6]/40 hover:text-[#F8FAFC] hover:shadow-[0_0_12px_rgba(244,114,182,0.2)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* CTA Button */}
                {currentProject.link && (
                  <div>
                    <a
                      href={currentProject.link}
                      className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F472B6] to-[#C084FC] px-6 py-3 text-sm font-bold text-[#0D1117] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(244,114,182,0.4)] active:scale-[0.98]"
                    >
                      Explore Project
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                )}
                
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Centered Desktop & Mobile Navigation Dock */}
        <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10 relative z-20">
          <button
            onClick={handlePrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F8FAFC]/10 bg-[#161B22]/80 text-[#F8FAFC]/50 backdrop-blur-sm transition-all hover:scale-110 hover:border-[#F472B6]/50 hover:bg-[#F472B6]/10 hover:text-[#F472B6] hover:shadow-[0_0_15px_rgba(244,114,182,0.2)]"
            aria-label="Previous project"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-3">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  i === currentIndex 
                    ? "w-8 bg-[#F472B6] shadow-[0_0_8px_#F472B6]" 
                    : "w-2 bg-[#F8FAFC]/20 hover:bg-[#F8FAFC]/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F8FAFC]/10 bg-[#161B22]/80 text-[#F8FAFC]/50 backdrop-blur-sm transition-all hover:scale-110 hover:border-[#F472B6]/50 hover:bg-[#F472B6]/10 hover:text-[#F472B6] hover:shadow-[0_0_15px_rgba(244,114,182,0.2)]"
            aria-label="Next project"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}