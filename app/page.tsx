"use client";
import Contact from "@/components/contact";
import Certifications from "@/components/certifications";
import Project from "@/components/projects";
import Skills from "@/components/skills";
import About from "@/components/about";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Achievements from "@/components/achievements";
import { useEffect, useState } from "react";

/**
 * Hero Section — Midnight Rose Tech
 * Khushi Singh — AI/ML Engineer in Progress
 *
 * Palette:
 *  bg:        #0D1117
 *  card:      #161B22
 *  accent:    #F472B6
 *  secondary: #C084FC
 *  text:      #F8FAFC
 */

const TECH_STACK: string[] = [
  "Python",
  "C",
  "C++",
  "PostgreSQL",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Git",
  "GitHub",
];

const PARTICLES: { top: string; left: string; size: number; color: string; delay: string }[] = [
  { top: "8%", left: "12%", size: 6, color: "#F472B6", delay: "0s" },
  { top: "18%", left: "82%", size: 4, color: "#C084FC", delay: "1.2s" },
  { top: "78%", left: "88%", size: 5, color: "#F472B6", delay: "2.1s" },
  { top: "85%", left: "10%", size: 4, color: "#C084FC", delay: "0.6s" },
  { top: "48%", left: "94%", size: 3, color: "#F472B6", delay: "1.8s" },
  { top: "40%", left: "2%", size: 3, color: "#C084FC", delay: "2.6s" },
];

function AvailabilityBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 opacity-0 animate-fade-up"
      style={{
        borderColor: "rgba(244,114,182,0.25)",
        backgroundColor: "#161B22",
        animationDelay: "0ms",
      }}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping-slow"
          style={{ backgroundColor: "#F472B6" }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: "#F472B6" }}
        />
      </span>
      <span className="text-xs font-medium tracking-wide text-[#F8FAFC]/80">
        Available for work
      </span>
    </div>
  );
}

function HeroHeadline() {
  return (
    <div className="mt-6">
      <p
        className="text-xl text-[#F8FAFC]/70 opacity-0 animate-fade-up"
        style={{ animationDelay: "80ms" }}
      >
        Hello, <span className="inline-block animate-wave origin-[70%_70%]"></span>
      </p>

      <h1
        className="mt-2 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] text-[#F8FAFC] opacity-0 animate-fade-up"
        style={{ animationDelay: "160ms" }}
      >
        I&apos;m Khushi Singh
      </h1>

      <h2
        className="mt-3 text-2xl sm:text-3xl lg:text-[2rem] font-semibold leading-tight opacity-0 animate-fade-up bg-clip-text text-transparent bg-gradient-to-r from-[#F472B6] to-[#C084FC]"
        style={{ animationDelay: "240ms" }}
      >
        AI/ML Engineer in Progress
      </h2>

      <p
        className="mt-6 max-w-md text-lg leading-relaxed text-[#F8FAFC]/70 opacity-0 animate-fade-up"
        style={{ animationDelay: "320ms" }}
      >
        Building intelligent software with AI, learning in public, one
        project at a time.
      </p>
    </div>
  );
}

function CTAGroup() {
  return (
    <div
      className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
      style={{ animationDelay: "400ms" }}
    >
      <a
        href="#projects"
        className="group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-[#0D1117] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(192,132,252,0.35)] active:scale-[0.98]"
        style={{
          background: "linear-gradient(90deg, #F472B6, #C084FC)",
        }}
      >
        View My Work
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
          →
        </span>
      </a>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center rounded-lg border border-[#F8FAFC]/10 bg-[#F8FAFC]/[0.02] px-6 py-3 text-sm font-semibold text-[#F8FAFC] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#C084FC]/40 hover:bg-[#F8FAFC]/[0.04] hover:shadow-[0_0_24px_rgba(244,114,182,0.15)] active:scale-[0.98] active:translate-y-0"
      >
        View Resume
      </a>
    </div>
  );
}

function TechStackStrip() {
  const TECH_ROWS = [
    ["Python", "C", "C++", "PostgreSQL","React", "Next.js"],
    ["Tilwind CSS","Git", "GitHub"]
  ];

  return (
    <div
      className="mt-14 opacity-0 animate-fade-up"
      style={{ animationDelay: "480ms" }}
    >
      <div
        className="h-px w-full max-w-md mb-6"
        style={{ backgroundColor: "rgba(248,250,252,0.08)" }}
      />
      
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#F8FAFC]/40 uppercase mb-4">
        SKILLS 
      </h3>

      <div className="flex flex-col gap-3 max-w-xl">
        {TECH_ROWS.map((row, rowIndex) => (
          <ul key={rowIndex} className="flex flex-wrap gap-2.5">
            {row.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center rounded-full border border-[#F8FAFC]/10 bg-[#161B22]/80 px-4 py-1.5 text-xs font-medium text-[#F8FAFC]/80 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#C084FC]/30 hover:text-[#F8FAFC] hover:shadow-[0_0_16px_rgba(192,132,252,0.15)] cursor-default select-none"
              >
                {tech}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function OrbitRing() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full animate-spin-slow"
      aria-hidden="true"
    >
      <circle
        cx="200"
        cy="200"
        r="188"
        fill="none"
        stroke="#C084FC"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="4 8"
      />
    </svg>
  );
}

function DecorativeGlyphs() {
  return (
    <>
      <span
        className="absolute -top-2 left-2 select-none font-mono text-2xl text-[#C084FC]/15"
        aria-hidden="true"
      >
        {"{ }"}
      </span>

      <svg
        className="absolute bottom-2 right-0 h-10 w-10 text-[#F472B6]/15"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="10" r="2.5" fill="currentColor" />
        <circle cx="32" cy="8" r="2.5" fill="currentColor" />
        <circle cx="20" cy="30" r="2.5" fill="currentColor" />
        <path
          d="M8 10L20 30M32 8L20 30M8 10L32 8"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <span
        className="absolute top-1/3 -right-3 select-none font-mono text-lg text-[#C084FC]/15"
        aria-hidden="true"
      >
        ⌁
      </span>
    </>
  );
}

function FloatingParticles() {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.5,
            animationDelay: p.delay,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

function ProfilePhoto() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mx-auto h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] lg:h-[320px] lg:w-[320px]">
      {/* Glow halo */}
      <div
        className="absolute inset-[-30px] rounded-full blur-3xl animate-glow-pulse"
        style={{ backgroundColor: "#F472B6", opacity: 0.35 }}
        aria-hidden="true"
      />

      {/* Circular backing so glow has a surface to sit on */}
      <div
        className="absolute inset-[-4px] rounded-full"
        style={{ backgroundColor: "#161B22" }}
        aria-hidden="true"
      />

      {/* Orbit ring */}
      <div className="absolute inset-[-40px]">
        <OrbitRing />
      </div>

      {/* Photo */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-full ring-2 transition-all duration-700 ease-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ boxShadow: "0 0 0 2px rgba(244,114,182,0.4)" }}
      >
        <Image
          src="/avatar.png"
          alt="Khushi Singh, AI/ML Engineer"
          fill
          sizes="320px"
          className="object-cover"
          priority
          onLoad={() => setLoaded(true)}
        />
      </div>

      <FloatingParticles />
      <DecorativeGlyphs />
    </div>
  );
}

function HeroVisual() {
  return (
    <div
      className="relative flex items-center justify-center opacity-0 animate-fade-up"
      style={{ animationDelay: "280ms" }}
    >
      <ProfilePhoto />
    </div>
  );
}

function BackgroundLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ backgroundColor: "#F472B6", opacity: 0.05 }}
      />
      <div
        className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ backgroundColor: "#C084FC", opacity: 0.04 }}
      />
    </div>
  );
}

function ScrollCue() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up"
      style={{ animationDelay: "600ms" }}
    >
      <a
        href="#about"
        className="group flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F8FAFC]/30 transition-all duration-500 ease-out hover:text-[#F472B6] hover:drop-shadow-[0_0_10px_rgba(244,114,182,0.7)]"
      >
        <span className="animate-bob flex flex-col items-center gap-2">
          Explore My Work
          <svg
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </a>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
    <Navbar />
    <section
      className="relative min-h-[90vh] w-full overflow-hidden"
      style={{ backgroundColor: "#0D1117" }}
    >
      <BackgroundLayer />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 py-24 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.4fr_1fr]">
          {/* Left column */}
          <div className={mounted ? "" : "invisible"}>
            <AvailabilityBadge />
            <HeroHeadline />
            <CTAGroup />
            <TechStackStrip />
          </div>

          {/* Right column */}
          <div className={mounted ? "order-first lg:order-last" : "invisible order-first lg:order-last"}>
            <HeroVisual />
          </div>
        </div>
      </div>

      <ScrollCue />

      <style jsx global>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.75;
          }
          70%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          15% {
            transform: rotate(14deg);
          }
          30% {
            transform: rotate(-8deg);
          }
          45% {
            transform: rotate(14deg);
          }
          60% {
            transform: rotate(-4deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }
        .animate-wave {
          display: inline-block;
          animation: wave 1.8s ease-in-out 1;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }

        @keyframes glow-pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        .animate-glow-pulse {
          animation: glow-pulse 4s ease-in-out infinite;
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(4px, -6px);
          }
        }
        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }

        @keyframes bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
        .animate-bob {
          animation: bob 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up,
          .animate-ping-slow,
          .animate-wave,
          .animate-spin-slow,
          .animate-glow-pulse,
          .animate-float-particle,
          .animate-bob {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
    <About />
    <Skills />
    <Project />
    <Certifications />
    <Achievements />
    <Contact />
    </>
  );
}