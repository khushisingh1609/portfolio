"use client";

import { useEffect, useState } from "react";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    NAV_LINKS.forEach(({ href }) => {
      const section = document.getElementById(href.substring(1));
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      setMenuOpen(false);
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "border-b backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(13, 17, 23, 0.75)" : "transparent",
        borderColor: scrolled ? "rgba(248,250,252,0.08)" : "transparent",
      }}
    >
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-16"
        aria-label="Primary"
      >
        {/* Left: Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          className="group font-mono text-xl font-bold tracking-tight text-[#F8FAFC] transition-opacity duration-200 hover:opacity-80"
        >
          <span style={{ color: "#F472B6" }}>&lt;</span>
          KS
          <span style={{ color: "#C084FC" }}>/&gt;</span>
        </a>

        {/* Center: Links (desktop) */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`group relative text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-[#F8FAFC]" : "text-[#F8FAFC]/60 hover:text-[#F8FAFC]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                    style={{
                      background: "linear-gradient(90deg, #F472B6, #C084FC)",
                      boxShadow: isActive ? "0 0 12px rgba(244,114,182,0.4)" : "none",
                    }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right: CTA (desktop) */}
        <a
          href="/resume.pdf"
          download="Khushi_Singh_Resume.pdf"
          className="hidden rounded-lg px-5 py-2 text-sm font-semibold text-[#121212] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] active:scale-[0.97] lg:inline-flex"
          style={{
            background: "linear-gradient(90deg, #F472B6, #C084FC)",
          }}
        >
          Download Resume
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-px w-6 bg-[#F8FAFC] transition-transform duration-300 ease-out ${
              menuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-[#F8FAFC] transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-6 bg-[#F8FAFC] transition-transform duration-300 ease-out ${
              menuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-[72px] z-40 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ backgroundColor: "rgba(13, 17, 23, 0.95)" }}
      >
        <ul className="flex flex-col items-center gap-2 px-6 py-10">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.href} className="w-full">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block w-full rounded-lg px-4 py-3 text-center text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#F472B6]/10 to-[#C084FC]/10 text-[#F8FAFC]"
                      : "text-[#F8FAFC]/70 hover:bg-[#F8FAFC]/5 hover:text-[#F8FAFC]"
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                    transform: menuOpen ? "translateY(0)" : "translateY(10px)",
                    opacity: menuOpen ? 1 : 0,
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li
            className="mt-6 w-full transition-all duration-300"
            style={{
              transitionDelay: menuOpen ? `${NAV_LINKS.length * 40}ms` : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(10px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            <a
              href="/resume.pdf"
              download
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-lg px-5 py-3.5 text-center text-sm font-semibold text-[#121212] transition-transform active:scale-[0.98]"
              style={{
                background: "linear-gradient(90deg, #F472B6, #C084FC)",
              }}
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}