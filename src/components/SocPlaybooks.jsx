import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/* ── Playbook levels from PDF Ch.11 ── */
const LEVELS = [
  {
    id: 1,
    tag: "L1",
    title: "Triage",
    color: "#f59e0b",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    checks: [
      "Machine & user identity",
      "Canal (USB / Email / Cloud)",
      "Data classification label",
      "Frequency & volume check",
      "Risk score ≥ threshold?",
    ],
    output: "Escalate L2 or close false-positive",
  },
  {
    id: 2,
    tag: "L2",
    title: "Investigation",
    color: "#3b82f6",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    checks: [
      "Timeline reconstruction",
      "File hash verification",
      "Process tree analysis",
      "Source IP / destination check",
      "DLP rule correlation",
    ],
    output: "Incident confirmed — escalate L3",
  },
  {
    id: 3,
    tag: "L3",
    title: "Response",
    color: "#ef4444",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    checks: [
      "Block exfiltration channel",
      "Quarantine endpoint",
      "Credentials reset (AD)",
      "Governance report D+1",
      "Rule tuning & CEX briefing",
    ],
    output: "Incident contained & documented",
  },
];

/* ── Animated Level Card ── */
function LevelCard({ level, isActive, onClick, idx }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full rounded-xl border p-4 text-left transition-all"
      style={{
        borderColor: isActive ? level.color : "#1e293b50",
        backgroundColor: isActive ? `${level.color}08` : "#0b101b",
      }}
      whileHover={{ scale: 1.01, borderColor: level.color }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + idx * 0.1 }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-black"
          style={{ backgroundColor: `${level.color}20`, color: level.color }}
        >
          {level.tag}
        </span>
        <span className="text-sm font-bold text-gray-200">{level.title}</span>
      </div>
      <p className="text-[10px] text-gray-500 leading-relaxed">{level.output}</p>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="active-level"
          className="absolute -right-px top-3 bottom-3 w-[3px] rounded-full"
          style={{ backgroundColor: level.color }}
        />
      )}
    </motion.button>
  );
}

/* ── Animated Checklist ── */
function Checklist({ level }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    setRevealed(0);
    const timer = setInterval(() => {
      setRevealed((p) => {
        if (p >= level.checks.length) {
          clearInterval(timer);
          return p;
        }
        return p + 1;
      });
    }, 350);
    return () => clearInterval(timer);
  }, [level.id]);

  return (
    <div className="space-y-2">
      {level.checks.map((check, i) => (
        <motion.div
          key={`${level.id}-${i}`}
          className="flex items-center gap-3 rounded-lg border px-4 py-2.5"
          style={{
            borderColor: i < revealed ? `${level.color}30` : "#1e293b30",
            backgroundColor: i < revealed ? `${level.color}06` : "transparent",
          }}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: i < revealed ? 1 : 0.25, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Checkbox */}
          <motion.div
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded border"
            style={{
              borderColor: i < revealed ? level.color : "#334155",
              backgroundColor: i < revealed ? `${level.color}20` : "transparent",
            }}
          >
            {i < revealed && (
              <motion.svg
                viewBox="0 0 14 14"
                className="h-2.5 w-2.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <path d="M3 7l3 3 5-6" stroke={level.color} strokeWidth={2.2}
                  strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </motion.svg>
            )}
          </motion.div>

          <span className="text-xs text-gray-300">{check}</span>

          {/* Step number */}
          <span className="ml-auto text-[9px] font-mono text-gray-600">{i + 1}/{level.checks.length}</span>
        </motion.div>
      ))}

      {/* Result banner */}
      <AnimatePresence>
        {revealed >= level.checks.length && (
          <motion.div
            className="mt-3 flex items-center gap-2 rounded-lg border px-4 py-2"
            style={{ borderColor: level.color, backgroundColor: `${level.color}10` }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={level.color} strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round">
              <path d={level.icon} />
            </svg>
            <span className="text-[11px] font-semibold" style={{ color: level.color }}>
              {level.output}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Flow Diagram (SVG) — horizontal L1 → L2 → L3 ── */
function FlowStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mb-8">
      <svg viewBox="0 0 700 60" className="w-full">
        {LEVELS.map((lvl, i) => {
          const x = 80 + i * 250;
          return (
            <motion.g key={lvl.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12 }}
            >
              {/* Node circle */}
              <circle cx={x} cy={30} r={16} fill={`${lvl.color}15`} stroke={lvl.color} strokeWidth={1.4} />
              <text x={x} y={34} fill={lvl.color} fontSize="10" fontWeight="800"
                textAnchor="middle" fontFamily="Inter, system-ui">{lvl.tag}</text>
              <text x={x} y={55} fill="#64748b" fontSize="7.5" textAnchor="middle"
                fontFamily="Inter, system-ui">{lvl.title}</text>

              {/* Arrow to next */}
              {i < 2 && (
                <>
                  <line x1={x + 20} y1={30} x2={x + 230} y2={30}
                    stroke={`${lvl.color}30`} strokeWidth={1} strokeDasharray="5 4" />
                  <motion.circle r={3} cy={30} fill={lvl.color}
                    animate={{ cx: [x + 26, x + 224], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.8, delay: i * 0.3 }}
                    style={{ filter: `drop-shadow(0 0 4px ${lvl.color})` }} />
                  <polygon
                    points={`${x + 225},30 ${x + 218},26 ${x + 218},34`}
                    fill={`${lvl.color}60`}
                  />
                </>
              )}
            </motion.g>
          );
        })}

        {/* Incident input */}
        <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          <text x={22} y={34} fill="#475569" fontSize="7" textAnchor="middle"
            fontFamily="JetBrains Mono, monospace">Alert</text>
          <line x1={40} y1={30} x2={64} y2={30} stroke="#47556940" strokeWidth={0.8} />
          <polygon points="63,30 58,27 58,33" fill="#47556960" />
        </motion.g>

        {/* Resolved output */}
        <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <line x1={597} y1={30} x2={640} y2={30} stroke="#10b98140" strokeWidth={0.8} />
          <polygon points="639,30 634,27 634,33" fill="#10b98160" />
          <text x={670} y={34} fill="#10b981" fontSize="7" textAnchor="middle"
            fontFamily="JetBrains Mono, monospace">Closed</text>
        </motion.g>
      </svg>
    </div>
  );
}

export default function SocPlaybooks() {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <section id="playbooks" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="SOC Operations"
            title="Incident Playbooks: L1 → L2 → L3"
            subtitle="Structured triage, investigation, and response workflow for every DLP alert."
          />
        </ScrollReveal>

        {/* Flow strip */}
        <ScrollReveal delay={0.06}>
          <FlowStrip />
        </ScrollReveal>

        {/* Interactive detail */}
        <ScrollReveal delay={0.12}>
          <div className="grid gap-4 md:grid-cols-[240px_1fr] rounded-2xl border border-navy-700/60 bg-[#060a14] p-5 md:p-6">
            {/* Left — level selectors */}
            <div className="flex flex-col gap-3">
              {LEVELS.map((lvl, i) => (
                <LevelCard
                  key={lvl.id}
                  level={lvl}
                  idx={i}
                  isActive={activeLevel === i}
                  onClick={() => setActiveLevel(i)}
                />
              ))}
            </div>

            {/* Right — animated checklist */}
            <div className="rounded-xl border border-navy-700/40 bg-navy-950/60 p-4 md:p-5">
              <div className="mb-3 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"
                  stroke={LEVELS[activeLevel].color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={LEVELS[activeLevel].icon} />
                </svg>
                <span className="text-xs font-bold" style={{ color: LEVELS[activeLevel].color }}>
                  {LEVELS[activeLevel].tag} — {LEVELS[activeLevel].title} Checklist
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLevel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Checklist level={LEVELS[activeLevel]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
