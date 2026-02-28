import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/* ── Why Hybrid — 3 concise points ── */
const REASONS = [
  { text: "Phase 1 — Linux lab (Wazuh + Snort + custom DLP) to master DLP logic hands-on", color: "#06b6d4" },
  { text: "Phase 2 — Microsoft 365 E3 trial + Purview trial (1 month) for enterprise-grade protection", color: "#3b82f6" },
  { text: "Unified governance bridges both phases into one coherent DLP architecture", color: "#10b981" },
];

/* ── Channels covered by each side ── */
const PURVIEW_CHANNELS = [
  { name: "Exchange", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { name: "SharePoint", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" },
  { name: "Teams", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { name: "Copilot AI", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
];

const LINUX_CHANNELS = [
  { name: "Endpoint DLP", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { name: "Wazuh SIEM", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { name: "Snort IDS", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { name: "Governance", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

/* ── Animated Architecture Diagram ── */
function HybridDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredSide, setHoveredSide] = useState(null);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 15 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay },
  });

  return (
    <div ref={ref} className="rounded-2xl border border-navy-700/60 bg-[#060a14] p-3 sm:p-5 md:p-8 overflow-x-auto">
      <svg viewBox="0 0 700 340" className="w-full" style={{ minWidth: 500, minHeight: 220 }}>
        {/* ── Cloud side (Purview) ── */}
        <motion.g {...fade(0.1)}>
          {/* Cloud box */}
          <rect x={30} y={30} width={280} height={220} rx={16}
            fill={hoveredSide === "cloud" ? "#3b82f610" : "#3b82f608"}
            stroke="#3b82f6" strokeWidth={1.2} strokeDasharray="0" />
          {/* Cloud label */}
          <text x={170} y={58} fill="#3b82f6" fontSize="11" fontWeight="800"
            textAnchor="middle" fontFamily="Inter, system-ui">Microsoft Purview (M365)</text>
          <text x={170} y={72} fill="#60a5fa" fontSize="6.5" fontWeight="600"
            textAnchor="middle" fontFamily="JetBrains Mono, monospace">E3 Free Trial + Purview Trial (1 month)</text>
          <line x1={80} y1={78} x2={260} y2={78} stroke="#3b82f620" strokeWidth={0.8} />

          {/* Channel cards */}
          {PURVIEW_CHANNELS.map((ch, i) => {
            const x = 60 + (i % 2) * 130;
            const y = 94 + Math.floor(i / 2) * 72;
            return (
              <motion.g key={ch.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                onMouseEnter={() => setHoveredSide("cloud")}
                onMouseLeave={() => setHoveredSide(null)}
              >
                <rect x={x} y={y} width={110} height={58} rx={8}
                  fill="#3b82f60a" stroke="#3b82f630" strokeWidth={0.8} />
                <foreignObject x={x + 8} y={y + 10} width={20} height={20}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.6}
                    strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                    <path d={ch.icon} />
                  </svg>
                </foreignObject>
                <text x={x + 34} y={y + 25} fill="#93c5fd" fontSize="8.5" fontWeight="600"
                  fontFamily="Inter, system-ui">{ch.name}</text>
                <text x={x + 55} y={y + 46} fill="#64748b" fontSize="6.5" textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace">Protected</text>
              </motion.g>
            );
          })}

          {/* Policy template */}
          <motion.g {...fade(0.6)}>
            <rect x={60} y={225} width={220} height={18} rx={4} fill="#3b82f608" stroke="#3b82f620" strokeWidth={0.5} />
            <text x={170} y={237} fill="#3b82f680" fontSize="6" textAnchor="middle"
              fontFamily="JetBrains Mono, monospace">IF sensitive + external → Block + Log SOC</text>
          </motion.g>
        </motion.g>

        {/* ── On-Prem side (Linux) ── */}
        <motion.g {...fade(0.15)}>
          <rect x={390} y={30} width={280} height={220} rx={16}
            fill={hoveredSide === "onprem" ? "#06b6d410" : "#06b6d408"}
            stroke="#06b6d4" strokeWidth={1.2} />
          <text x={530} y={58} fill="#06b6d4" fontSize="11" fontWeight="800"
            textAnchor="middle" fontFamily="Inter, system-ui">Linux Lab (SOC + DLP)</text>
          <text x={530} y={72} fill="#67e8f9" fontSize="6.5" fontWeight="600"
            textAnchor="middle" fontFamily="JetBrains Mono, monospace">VMware — Learn DLP logic first</text>
          <line x1={440} y1={78} x2={620} y2={78} stroke="#06b6d420" strokeWidth={0.8} />

          {LINUX_CHANNELS.map((ch, i) => {
            const x = 420 + (i % 2) * 130;
            const y = 94 + Math.floor(i / 2) * 72;
            return (
              <motion.g key={ch.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.25 + i * 0.1 }}
                onMouseEnter={() => setHoveredSide("onprem")}
                onMouseLeave={() => setHoveredSide(null)}
              >
                <rect x={x} y={y} width={110} height={58} rx={8}
                  fill="#06b6d40a" stroke="#06b6d430" strokeWidth={0.8} />
                <foreignObject x={x + 8} y={y + 10} width={20} height={20}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth={1.6}
                    strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                    <path d={ch.icon} />
                  </svg>
                </foreignObject>
                <text x={x + 34} y={y + 25} fill="#67e8f9" fontSize="8.5" fontWeight="600"
                  fontFamily="Inter, system-ui">{ch.name}</text>
                <text x={x + 55} y={y + 46} fill="#64748b" fontSize="6.5" textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace">Monitored</text>
              </motion.g>
            );
          })}

          <motion.g {...fade(0.65)}>
            <rect x={420} y={225} width={220} height={18} rx={4} fill="#06b6d408" stroke="#06b6d420" strokeWidth={0.5} />
            <text x={530} y={237} fill="#06b6d480" fontSize="6" textAnchor="middle"
              fontFamily="JetBrains Mono, monospace">Detect + Correlate + Score + Escalate</text>
          </motion.g>
        </motion.g>

        {/* ── Central bridge — Governance ── */}
        <motion.g {...fade(0.5)}>
          {/* Connecting arrows with animated packets */}
          <line x1={310} y1={140} x2={390} y2={140} stroke="#10b981" strokeWidth={1.2} strokeDasharray="4 3" />
          <motion.circle r={3} fill="#10b981"
            animate={{ cx: [315, 385], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            style={{ filter: "drop-shadow(0 0 4px #10b981)" }} />

          <line x1={310} y1={170} x2={390} y2={170} stroke="#10b981" strokeWidth={1.2} strokeDasharray="4 3" />
          <motion.circle r={3} fill="#10b981"
            animate={{ cx: [385, 315], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
            style={{ filter: "drop-shadow(0 0 4px #10b981)" }} />

          {/* Governance hub */}
          <rect x={320} y={278} width={60} height={44} rx={10}
            fill="#10b98115" stroke="#10b981" strokeWidth={1.2} />
          <foreignObject x={331} y={284} width={20} height={20}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={1.8}
              strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </foreignObject>
          <text x={350} y={316} fill="#10b981" fontSize="6.5" fontWeight="700"
            textAnchor="middle" fontFamily="Inter, system-ui">Unified Gov.</text>

          {/* Lines from both sides to governance */}
          <line x1={170} y1={250} x2={330} y2={290} stroke="#3b82f630" strokeWidth={0.8} strokeDasharray="4 3" />
          <line x1={530} y1={250} x2={370} y2={290} stroke="#06b6d430" strokeWidth={0.8} strokeDasharray="4 3" />

          {/* Animated data flowing to governance */}
          <motion.circle r={2.5} fill="#3b82f6"
            animate={{ cx: [170, 330], cy: [250, 290], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} />
          <motion.circle r={2.5} fill="#06b6d4"
            animate={{ cx: [530, 370], cy: [250, 290], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.7 }} />
        </motion.g>
      </svg>
    </div>
  );
}

export default function HybridDlp() {
  return (
    <section id="hybrid" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Hybrid Strategy"
            title="Hybrid DLP: Purview + Linux Governance"
            subtitle="Start with the Linux lab on VMware to master DLP detection logic, then activate Microsoft 365 E3 free trial & Purview free trial for 1 month to deploy the enterprise solution."
          />
        </ScrollReveal>

        {/* Why hybrid — 3 compact points */}
        <ScrollReveal delay={0.06}>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {REASONS.map((r, i) => (
              <motion.div key={i}
                className="flex items-center gap-2 rounded-full border border-navy-700/60 bg-navy-900/30 px-4 py-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: r.color }} />
                <span className="text-[11px] text-gray-400">{r.text}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Diagram */}
        <ScrollReveal delay={0.1}>
          <HybridDiagram />
        </ScrollReveal>
      </div>
    </section>
  );
}
