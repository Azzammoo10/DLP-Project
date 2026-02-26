import { useState, useEffect } from "react";
import axaLogo from "../assets/axa.png";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Architecture", href: "#architecture" },
  { label: "Correlation", href: "#correlation" },
  { label: "Governance", href: "#governance" },
  { label: "Validation", href: "#validation" },
  { label: "Zero Trust", href: "#zerotrust" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "KPIs", href: "#kpis" },
  { label: "Value", href: "#value" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-navy-700 bg-navy-900/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <img src={axaLogo} alt="AXA" className="h-8 w-auto" />
          <span className="hidden font-semibold tracking-tight text-white sm:inline">
            DLP Architecture
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-accent-light"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="text-gray-300 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-700 bg-navy-900/98 backdrop-blur-md lg:hidden">
          <div className="section-container flex flex-col gap-3 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-gray-300 transition-colors hover:text-accent-light"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
