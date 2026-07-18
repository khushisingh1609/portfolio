"use client";

const BADGES: string[] = ["CGPA 9.0", "AI/ML", "Problem Solver", "Lifelong Learner"];

const EDUCATION = {
  degree: "B.Tech CSE (AI & ML)",
  university: "Lovely Professional University",
  duration: "2025 – 2029",
  cgpa: "9.0",
};

const CURRENT_FOCUS: string[] = [
  "AI / ML",
  "DSA in C++",
  "PostgreSQL",
  "Full Stack Development",
];

function SectionLabel() {
  return (
    <p
      className="text-xs font-medium uppercase tracking-[0.2em] opacity-0 animate-fade-up"
      style={{ color: "#C084FC" }}
    >
      Get to know me
    </p>
  );
}

function AboutHeading() {
  return (
    <h2
      className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-[#F8FAFC] opacity-0 animate-fade-up"
      style={{ animationDelay: "80ms" }}
    >
      About Me
    </h2>
  );
}

function AboutIntro() {
  return (
    <p
      className="mt-6 max-w-lg text-lg leading-relaxed text-[#F8FAFC]/70 opacity-0 animate-fade-up"
      style={{ animationDelay: "160ms" }}
    >
      I&apos;m an aspiring AI/ML engineer who enjoys turning ideas into working
      software. I&apos;m currently pursuing my B.Tech in Computer Science with a
      specialization in AI &amp; ML, spending most of my time building
      practical projects, sharpening my problem-solving skills, and learning
      new tools in public as I go. I care about writing clean, thoughtful
      code and understanding systems deeply rather than just getting them to
      work.
    </p>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span
      className="rounded-full border px-4 py-1.5 text-sm font-medium text-[#F8FAFC]/85 transition-colors duration-200 hover:text-[#F8FAFC]"
      style={{
        backgroundColor: "#161B22",
        borderColor: "rgba(244,114,182,0.2)",
      }}
    >
      {label}
    </span>
  );
}

function BadgeGroup() {
  return (
    <div
      className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fade-up"
      style={{ animationDelay: "240ms" }}
    >
      {BADGES.map((badge) => (
        <Badge key={badge} label={badge} />
      ))}
    </div>
  );
}

function AboutLeft() {
  return (
    <div className="flex flex-col justify-center">
      <SectionLabel />
      <AboutHeading />
      <AboutIntro />
      <BadgeGroup />
    </div>
  );
}

function EducationRow({ label, value }: { label: string; value: string }) {
  return (
    <div 
      className="flex items-baseline justify-between py-3" 
    >
      <span className="text-sm font-medium text-[#F8FAFC]/50">{label}</span>
      <span className="text-right text-sm font-semibold tracking-wide text-[#F8FAFC]">{value}</span>
    </div>
  );
}

function PremiumCard() {
  return (
    <div
      className="relative w-full max-w-xl opacity-0 animate-fade-up"
      style={{ animationDelay: "200ms" }}
    >
      {/* Subtle premium outer glow */}
      <div
        className="absolute -inset-1 rounded-[2rem] blur-2xl opacity-25 transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: "linear-gradient(120deg, #F472B6, #C084FC)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative overflow-hidden rounded-3xl border p-8 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-sm"
        style={{
          backgroundColor: "#161B22",
          borderColor: "rgba(248,250,252,0.1)",
        }}
      >
        {/* Internal ambient corner glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[90px]"
          style={{ backgroundColor: "#F472B6", opacity: 0.08 }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#0D1117] shadow-sm"
            style={{
              background: "linear-gradient(90deg, #F472B6, #C084FC)",
            }}
          >
            Academic Journey
          </span>

          <h3 className="mt-8 text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]">
            {EDUCATION.degree}
          </h3>

          <p className="mt-2 text-base text-[#F8FAFC]/60 font-medium">
            {EDUCATION.university}
          </p>

          <div className="mt-8 flex flex-col gap-1">
            <EducationRow label="Duration" value={EDUCATION.duration} />
            <div className="h-px w-full" style={{ backgroundColor: "rgba(248,250,252,0.04)" }} />
            <EducationRow label="Current CGPA" value={EDUCATION.cgpa} />
          </div>

          {/* Elegant fading divider */}
          <div 
            className="my-10 h-px w-full" 
            style={{ 
              background: "linear-gradient(90deg, rgba(248,250,252,0) 0%, rgba(248,250,252,0.1) 50%, rgba(248,250,252,0) 100%)" 
            }} 
          />

          {/* Current Focus Section */}
          <div>
            <p 
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#C084FC" }}
            >
              Current Focus
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CURRENT_FOCUS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span 
                    className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(244,114,182,0.8)]" 
                    style={{ backgroundColor: "#F472B6" }} 
                  />
                  <span className="text-sm font-medium text-[#F8FAFC]/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutRight() {
  return (
    <div className="flex w-full items-center justify-center lg:justify-end">
      <PremiumCard />
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden py-24 sm:py-28 lg:py-32"
      style={{ backgroundColor: "#0D1117" }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ backgroundColor: "#C084FC", opacity: 0.04 }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <AboutLeft />
          <AboutRight />
        </div>
      </div>

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
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}