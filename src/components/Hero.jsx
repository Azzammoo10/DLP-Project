import { motion } from "framer-motion";
import axaLogo from "../assets/axa.png";
import AnimatedBackground from "./AnimatedBackground";

/**
 * Hero Section — Animated particle background, title, AXA branding, CTA buttons.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Animated particle canvas */}
      <AnimatedBackground />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-accent/3 blur-[100px]" />
      </div>

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* AXA badge */}
          <motion.div
            className="mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={axaLogo} alt="AXA" className="h-10 w-auto opacity-90" />
            <div className="h-6 w-px bg-navy-600" />
            <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">
              Cybersecurity Architecture
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Hybrid Enterprise{" "}
            <span className="gradient-text">DLP Architecture</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-3 text-xl font-medium text-accent-light/80 sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            DLP &bull; SOC &bull; IDS &bull; Zero Trust
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            A governance-driven security architecture integrating Data Loss
            Prevention, Security Operations, Intrusion Detection, and
            Identity-centric controls — designed for enterprise-grade data
            protection and regulatory alignment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-light hover:shadow-accent/40 hover:scale-105"
            >
              View Architecture
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#governance"
              className="inline-flex items-center gap-2 rounded-lg border border-navy-600 bg-navy-800/50 px-6 py-3 text-sm font-semibold text-gray-300 transition-all hover:border-accent/40 hover:text-white hover:scale-105"
            >
              Governance Model
            </a>
            <a
              href="#validation"
              className="inline-flex items-center gap-2 rounded-lg border border-navy-600 bg-navy-800/50 px-6 py-3 text-sm font-semibold text-gray-300 transition-all hover:border-accent/40 hover:text-white hover:scale-105"
            >
              Security Validation
            </a>
          </motion.div>

          {/* Animated stats strip */}
          <motion.div
            className="mt-14 flex flex-wrap gap-8 border-t border-navy-700/50 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            {[
              { value: "6", label: "Security Layers" },
              { value: "94%", label: "Detection Coverage" },
              { value: "<15m", label: "Mean Time to Detect" },
              { value: "5", label: "Correlation Sources" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-2xl font-bold text-accent-light">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              className="h-8 w-px bg-gradient-to-b from-accent/60 to-transparent"
              animate={{ scaleY: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
