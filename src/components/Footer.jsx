/**
 * Footer — Author info and social links.
 */
import axaLogo from "../assets/axa.png";

export default function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-950 pb-10">
      <div className="section-container py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Left — Logo + Project */}
          <div className="flex items-center gap-4">
            <img src={axaLogo} alt="AXA" className="h-8 w-auto object-contain" />
            <div className="h-8 w-px bg-navy-700" />
            <div>
              <div className="text-sm font-semibold text-white">
                Hybrid Enterprise DLP Architecture
              </div>
              <div className="text-xs text-gray-500">
                AXA GBS Morocco &bull; Final Year Internship Project
              </div>
            </div>
          </div>

          {/* Center — Author */}
          <div className="text-center">
            <div className="text-base font-semibold text-white">Mohamed AZZAM</div>
            <div className="mt-1 text-sm text-gray-400">
              DLP Analyst Intern &bull; AXA GBS Morocco
            </div>
          </div>

          {/* Right — Social & Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://azzammo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-navy-700 px-4 py-2 text-sm text-gray-400 transition-all hover:border-accent/40 hover:text-accent-light"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.777.514-3.435 1.404-4.833" />
              </svg>
              Portfolio
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-navy-700 px-4 py-2 text-sm text-gray-400 transition-all hover:border-accent/40 hover:text-accent-light"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-navy-700 px-4 py-2 text-sm text-gray-400 transition-all hover:border-accent/40 hover:text-accent-light"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* TryHackMe Badge */}
        <div className="mt-8 flex justify-center">
          <a href="https://tryhackme.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://tryhackme-badges.s3.amazonaws.com/azzam.moo10.png"
              alt="TryHackMe Badge"
              className="h-auto max-w-[320px] rounded-lg opacity-90 transition-opacity hover:opacity-100"
            />
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-navy-700 pt-6 text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Mohamed AZZAM — AXA GBS Morocco — Hybrid Enterprise DLP Architecture.
            All rights reserved. All information is confidential — no internal AXA data or tools were used.
          </p>
        </div>
      </div>
    </footer>
  );
}
