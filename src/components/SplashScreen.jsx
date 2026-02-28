import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
   Particle Network — interconnected cyber-mesh on canvas
   ═══════════════════════════════════════════════════════════════ */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const N = 110;
    const LINK = 130;
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.6 + 0.5, o: Math.random() * 0.4 + 0.12,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28);
        ctx.fillStyle = `rgba(6,182,212,${p.o})`; ctx.fill();
        for (let j = i + 1; j < N; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < LINK) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(6,182,212,${0.09 * (1 - d / LINK)})`;
            ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0" />;
}

/* ═══════════════════════════════════════════════════════════════
   Matrix Rain — falling binary / hex data streams
   ═══════════════════════════════════════════════════════════════ */
function MatrixRain() {
  const cols = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${(i / 30) * 100}%`,
      dur: 7 + Math.random() * 10,
      delay: Math.random() * 5,
      chars: Array.from({ length: 22 }, () =>
        Math.random() > 0.5
          ? String.fromCharCode(0x30A0 + Math.random() * 96)
          : Math.random().toString(16).slice(2, 4)
      ),
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.06] pointer-events-none">
      {cols.map((col) => (
        <motion.div
          key={col.id}
          className="absolute font-mono text-[9px] text-emerald-400 leading-[14px] select-none"
          style={{ left: col.left }}
          initial={{ y: -500 }}
          animate={{ y: "115vh" }}
          transition={{ duration: col.dur, repeat: Infinity, delay: col.delay, ease: "linear" }}
        >
          {col.chars.map((c, j) => <div key={j} style={{ opacity: 0.3 + j * 0.035 }}>{c}</div>)}
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Radar Sweep — rotating sonar-style sweep inside the ring
   ═══════════════════════════════════════════════════════════════ */
function RadarSweep() {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 150 150" className="h-full w-full">
        <defs>
          <linearGradient id="sweep" gradientTransform="rotate(0)">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#06b6d440" />
          </linearGradient>
        </defs>
        <path d="M75 75 L75 9 A66 66 0 0 1 130 45 Z" fill="url(#sweep)" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Terminal Boot — SOC-style boot messages
   ═══════════════════════════════════════════════════════════════ */
const BOOT = [
  { label: "kernel: DLP engine loaded", t: 0.10 },
  { label: "net: threat-intel feed synced", t: 0.28 },
  { label: "siem: correlation rules compiled", t: 0.46 },
  { label: "ids: signature db verified (sha256)", t: 0.62 },
  { label: "auth: zero-trust policies active", t: 0.78 },
  { label: "status: ALL SYSTEMS OPERATIONAL", t: 0.93 },
];
function TerminalBoot({ progress }) {
  return (
    <div className="w-full max-w-xs sm:max-w-sm rounded-lg border border-cyan-900/30 bg-[#0a0f1a]/80 backdrop-blur-sm p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] leading-relaxed">
      {/* Terminal header bar */}
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-cyan-900/20">
        <div className="h-2 w-2 rounded-full bg-red-500/60" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
        <div className="h-2 w-2 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[8px] text-gray-600 tracking-widest uppercase">sec-ops-terminal</span>
      </div>
      {BOOT.map((b, i) => {
        const show = progress >= b.t;
        const active = progress >= b.t && (i === BOOT.length - 1 || progress < BOOT[i + 1]?.t);
        return (
          <motion.div
            key={i}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -8 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.25 }}
          >
            <span className="text-gray-700 select-none">$</span>
            {b.t >= 0.93 ? (
              <span className={`font-bold ${show ? "text-emerald-400" : "text-gray-700"}`}>
                {show ? "✓ " : ""}{b.label}
              </span>
            ) : (
              <span className={show ? "text-cyan-500/80" : "text-gray-700"}>
                {show ? "✓ " : ""}{b.label}
              </span>
            )}
            {active && show && (
              <motion.span
                className="inline-block h-3 w-[2px] bg-cyan-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SplashScreen — pure cybersecurity boot experience
   ═══════════════════════════════════════════════════════════════ */
export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();
    const duration = 4000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);
      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => { setVisible(false); setTimeout(onFinish, 700); }, 400);
      }
    };
    requestAnimationFrame(tick);
  }, [onFinish]);

  const R = 60;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center select-none overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 50% 40%, #050d1a 0%, #010409 100%)" }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ── Background layers ── */}
          <ParticleCanvas />
          <MatrixRain />

          {/* Hex grid */}
          <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, #06b6d430 20%, #10b98140 50%, #06b6d430 80%, transparent)" }}
            animate={{ top: ["-2%", "102%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Corner brackets */}
          {[["top-4 left-4","border-t-2 border-l-2"],["top-4 right-4","border-t-2 border-r-2"],["bottom-4 left-4","border-b-2 border-l-2"],["bottom-4 right-4","border-b-2 border-r-2"]].map(([pos, border], i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} h-8 w-8 ${border} border-cyan-800/30 pointer-events-none`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            />
          ))}

          {/* Breathing aura */}
          <motion.div
            className="absolute left-1/2 top-[40%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #06b6d40a 0%, transparent 65%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── Main Content ── */}
          <div className="relative flex flex-col items-center gap-6 px-6 text-center">

            {/* ── Radar Ring + Shield ── */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.3, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 1.1, type: "spring", stiffness: 70, damping: 13 }}
            >
              {/* Outer rotating orbit */}
              <motion.div
                className="absolute -inset-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <circle cx="100" cy="100" r="96" fill="none" stroke="#0e3a4f" strokeWidth="0.3" strokeDasharray="2 12" />
                  {/* 4 node dots on the orbit */}
                  {[0, 90, 180, 270].map((a) => {
                    const rad = (a * Math.PI) / 180;
                    return <circle key={a} cx={100 + Math.cos(rad) * 96} cy={100 + Math.sin(rad) * 96} r="2" fill="#06b6d450" />;
                  })}
                </svg>
              </motion.div>

              {/* Middle counter-orbit */}
              <motion.div
                className="absolute -inset-5"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#0e3a4f" strokeWidth="0.2" strokeDasharray="1.5 18" />
                </svg>
              </motion.div>

              {/* SVG progress ring */}
              <svg viewBox="0 0 150 150" className="h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52">
                <defs>
                  <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <filter id="gl">
                    <feGaussianBlur stdDeviation="3.5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Tick marks */}
                {Array.from({ length: 72 }, (_, i) => {
                  const a = (i / 72) * 360 - 90;
                  const rad = (a * Math.PI) / 180;
                  const inn = 64, out = i % 6 === 0 ? 69 : 67;
                  return (
                    <line key={i}
                      x1={75 + Math.cos(rad) * inn} y1={75 + Math.sin(rad) * inn}
                      x2={75 + Math.cos(rad) * out} y2={75 + Math.sin(rad) * out}
                      stroke={i % 6 === 0 ? "#164e63" : "#0e293d"} strokeWidth={i % 6 === 0 ? 0.8 : 0.35}
                    />
                  );
                })}

                {/* Background ring */}
                <circle cx="75" cy="75" r={R} fill="none" stroke="#0e293d" strokeWidth="2" />

                {/* Animated progress arc */}
                <circle cx="75" cy="75" r={R} fill="none"
                  stroke="url(#rg)" strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={offset}
                  transform="rotate(-90 75 75)" filter="url(#gl)"
                />
              </svg>

              {/* Radar sweep inside ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-44 w-44 sm:h-52 sm:w-52 relative">
                  <RadarSweep />
                </div>
              </div>

              {/* Center shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 15px 0px #06b6d410, inset 0 0 15px #06b6d406",
                      "0 0 45px 8px #06b6d425, inset 0 0 25px #06b6d410",
                      "0 0 15px 0px #06b6d410, inset 0 0 15px #06b6d406",
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#071520] to-[#030a10] ring-1 ring-cyan-500/15"
                >
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24">
                    <motion.path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      stroke="#06b6d4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 1.8, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M9 12l2 2 4-4"
                      stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 2.2, duration: 0.4 }}
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Percentage */}
              <div className="absolute inset-x-0 -bottom-2 flex justify-center">
                <span className="font-mono text-xs font-bold tracking-widest text-cyan-400/90 tabular-nums">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </motion.div>

            {/* ── Title ── */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl uppercase">
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  DLP Architecture
                </span>
              </h1>

              <motion.div
                className="mx-auto mt-2 flex items-center justify-center gap-3"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.85, duration: 0.6, ease: "easeOut" }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/30" />
                <p className="font-mono text-[9px] tracking-[0.4em] text-cyan-700 uppercase">
                  Data Loss Prevention &bull; Security Operations
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/30" />
              </motion.div>
            </motion.div>

            {/* ── Terminal Boot ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <TerminalBoot progress={progress} />
            </motion.div>

            {/* ── Bottom status bar ── */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-6 font-mono text-[8px] tracking-widest text-cyan-800 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span>AES-256</span>
              <span className="text-cyan-900">|</span>
              <span>TLS 1.3</span>
              <span className="text-cyan-900">|</span>
              <span>SHA-512</span>
              <span className="text-cyan-900">|</span>
              <span>RBAC</span>
              <span className="text-cyan-900">|</span>
              <span>MFA</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
