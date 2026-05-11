import { motion, AnimatePresence } from "framer-motion";

/**
 * Animated Overlay for the API Dashboard.
 * Features a holographic entry, scanning effect, and glassy UI.
 */
export default function ApiDashboardOverlay({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
          />

          {/* Dashboard Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-2xl shadow-blue-500/20"
          >
            {/* Header / Title Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-navy-950/50 px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                  Central Server Dashboard — Ubuntu-DLP-API
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="relative aspect-[16/10] w-full bg-black">
              {/* The Actual Image */}
              <img
                src="/Dahboard1.png"
                alt="Flask API Dashboard"
                className="h-full w-full object-contain opacity-90"
              />

              {/* Holographic Overlays */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Scanning Line */}
                <motion.div
                  animate={{
                    y: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="h-1 w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                />

                {/* Digital Noise / Grid overlay (Subtle) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg" />
                <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-blue-500/30 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-blue-500/30 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-blue-500/30 rounded-br-lg" />
              </div>
            </div>

            {/* Footer / Status Bar */}
            <div className="flex items-center justify-between border-t border-white/10 bg-navy-950/50 px-4 py-2 text-[10px] font-mono text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  <span>SYSTEM: NOMINAL</span>
                </div>
                <span>UPTIME: 14d 06h 22m</span>
              </div>
              <div className="flex items-center gap-4">
                <span>PORT: 5000 (HTTPS)</span>
                <span>VM: UBUNTU-DLP-SOC</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
