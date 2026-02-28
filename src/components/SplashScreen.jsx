import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axaLogo from "../assets/axa.png";

/**
 * SplashScreen — 3-second professional loading screen.
 * AXA GBS Morocco branding + internship context + disclaimer notice.
 */
export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();
    const duration = 3000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);
      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onFinish, 500); // wait for exit animation
        }, 200);
      }
    };
    requestAnimationFrame(tick);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #020617 0%, #0a0e1a 50%, #020617 100%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glow */}
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, #3b82f608 0%, transparent 70%)" }}
          />

          <div className="relative flex flex-col items-center gap-8 px-6 text-center">
            {/* AXA Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-3">
                <img src={axaLogo} alt="AXA" className="h-14 w-auto object-contain" />
                <div className="h-10 w-px bg-navy-700" />
                <div className="text-left">
                  <div className="text-lg font-bold tracking-wide text-white">Global Business Services</div>
                  <div className="text-xs font-medium tracking-widest text-blue-400/70 uppercase">Morocco</div>
                </div>
              </div>
            </motion.div>

            {/* Shield icon with pulse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, #3b82f620 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <svg className="h-14 w-14 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </motion.div>

            {/* Project title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Hybrid Enterprise{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  DLP Architecture
                </span>
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Data Loss Prevention &bull; Security Operations &bull; Zero Trust
              </p>
            </motion.div>

            {/* Internship context */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="rounded-lg border border-navy-700/60 bg-navy-900/40 px-6 py-3"
            >
              <p className="text-sm font-medium text-white">Mohamed AZZAM</p>
              <p className="mt-0.5 text-xs text-blue-400/80">
                DLP Analyst Intern — Final Year Internship Project
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                AXA GBS Morocco &bull; {new Date().getFullYear()}
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="w-64"
            >
              <div className="h-1 overflow-hidden rounded-full bg-navy-800">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                    boxShadow: "0 0 12px #3b82f640",
                  }}
                />
              </div>
              <p className="mt-2 text-[10px] tracking-wide text-gray-600 uppercase">
                Loading architecture...
              </p>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-2 max-w-md rounded-lg border border-amber-500/20 bg-amber-500/5 px-5 py-3"
            >
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-[11px] font-semibold text-amber-400">Confidentiality Notice</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-amber-200/60">
                    All information presented in this project is confidential. No internal AXA data,
                    systems, or proprietary tools have been used. This work is based entirely on
                    open-source technologies and personal lab environments.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
