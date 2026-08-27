"use client";

import { useEffect, useState, useRef } from "react";
import { SectionOrbit } from "./section-orbit";

// --- Utility Components ---

function useIntersectionObserver(options = { threshold: 0.1 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return { ref, isVisible };
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- UI Components ---

function SectionHeading() {
  return (
    <FadeUp className="mx-auto mb-20 max-w-3xl text-center flex flex-col items-center">
      <span className="mb-4 inline-block rounded-full border border-[#F472B6]/10 bg-[#F472B6]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F472B6]">
        CONTACT
      </span>
      
      {/* The wrapped heading with the glowing pink orbit */}
      <div className="relative mt-2 w-fit mx-auto">
        <SectionOrbit variant="contact" className="scale-75 sm:scale-100 origin-center" />
        <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
          Let's Connect
        </h2>
      </div>

      <p className="mt-6 text-base leading-relaxed text-[#F8FAFC]/60 sm:text-lg">
        I'm always excited to connect with recruiters, developers, innovators and fellow learners.
        Whether it's an internship opportunity, collaboration, hackathon or simply a conversation about technology, I'd love to hear from you.
      </p>
    </FadeUp>
  );
}

interface ContactCardProps {
  icon: string;
  title: string;
  info: string;
  href?: string;
  delay: number;
}

function ContactCard({ icon, title, info, href, delay }: ContactCardProps) {
  const { ref, isVisible } = useIntersectionObserver();

  const isClickable = Boolean(href);

  const CardWrapper = ({ children, className }: { children: React.ReactNode; className: string }) =>
    isClickable ? (
      <a
        href={href}
        target={href?.startsWith("mailto") ? undefined : "_blank"}
        rel={href?.startsWith("mailto") ? undefined : "noopener noreferrer"}
        className={className}
      >
        {children}
      </a>
    ) : (
      <div className={className}>{children}</div>
    );

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
      } h-full`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardWrapper
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#F8FAFC]/5 bg-[#161B22]/40 p-6 backdrop-blur-xl transition-all duration-500 ease-out ${
          isClickable
            ? "cursor-pointer hover:-translate-y-2 hover:border-[#F472B6]/30 hover:shadow-[0_20px_40px_rgba(244,114,182,0.15)]"
            : ""
        }`}
      >
        {isClickable && (
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F472B6]/[0.03] to-[#C084FC]/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
        )}

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F8FAFC]/5 bg-[#0D1117]/50 text-2xl shadow-inner transition-transform duration-500 group-hover:scale-110">
            {icon}
          </div>
          {isClickable && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8FAFC]/5 text-[#F8FAFC]/40 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:bg-[#F472B6]/10 group-hover:text-[#F472B6]">
              <svg
                className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0"
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
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]/40">
            {title}
          </h3>
          <p className="break-all text-base font-medium text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#F472B6]">
            {info}
          </p>
        </div>
      </CardWrapper>
    </div>
  );
}

function AvailabilityCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#F8FAFC]/10 bg-[#161B22]/60 p-8 shadow-2xl backdrop-blur-xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F472B6] to-[#C084FC]" />
      
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </div>
        <h3 className="text-lg font-bold tracking-tight text-[#F8FAFC]">
          Currently Available For
        </h3>
      </div>

      <ul className="flex flex-col gap-4 text-base font-medium text-[#F8FAFC]/80">
        {[
          "Software Engineering Internships",
          "AI/ML Projects",
          "Full Stack Development",
          "Hackathons",
          "Open Source Collaboration",
        ].map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <svg
              className="h-5 w-5 shrink-0 text-[#C084FC]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#0D1117] px-6 py-24 sm:py-32 lg:px-16"
    >
      {/* Ambient Glows */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#F472B6]/[0.02] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#C084FC]/[0.02] blur-[150px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div className="flex flex-col justify-center gap-8">
            <FadeUp delay={100}>
              <h3 className="text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl">
                Interested in <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#F472B6] to-[#C084FC] bg-clip-text text-transparent">
                  Working together?
                </span>
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#F8FAFC]/60">
              I'm passionate about building AI-driven solutions and scalable software. If you're looking for someone who loves learning, solving problems and creating meaningful products, let's connect.
              </p>
            </FadeUp>

            <FadeUp delay={200}>
              <AvailabilityCard />
            </FadeUp>
          </div>

          {/* Right Column - Contact Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            <ContactCard
              icon="📧"
              title="Email"
              info="khushisingh2253k@gmail.com"
              href="mailto:khushisingh2253k@gmail.com"
              delay={300}
            />
            <ContactCard
              icon="💼"
              title="LinkedIn"
              info="khushi-singh-5324b4399"
              href="https://www.linkedin.com/in/khushi-singh-5324b4399"
              delay={400}
            />
            <ContactCard
              icon="💻"
              title="GitHub"
              info="khushisingh1609"
              href="https://github.com/khushisingh1609"
              delay={500}
            />
            <ContactCard
              icon="📍"
              title="Location"
              info="Noida, India"
              delay={600}
            />
          </div>
        </div>

        {/* Bottom Quote */}
        <FadeUp delay={800} className="mt-32 text-center">
          <p className="mx-auto max-w-2xl text-lg italic text-[#F8FAFC]/40 md:text-xl">
            "Turning ideas into intelligent solutions, one project at a time."
          </p>
        </FadeUp>
      </div>
    </section>
  );
}