import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/* ── Scenario steps ── */
const STEPS = [
  {
    id: 0,
    time: "T+0 s",
    actor: "Finance Analyst",
    action: "Attaches sensitive budget file (IBAN, forecasts) to outbound email",
    layer: "Endpoint",
    color: "#ef4444",
    risk: 15,
  },
  {
    id: 1,
    time: "T+2 s",
    actor: "DLP Agent",
    action: "Intercepts file access — IBAN regex + fingerprint match — classified Sensitive",
    layer: "DLP",
    color: "#f59e0b",
    risk: 40,
  },
  {
    id: 2,
    time: "T+3 s",
    actor: "Snort IDS",
    action: "Flags anomalous outbound SMTP — payload exceeds user baseline — sid:100047",
    layer: "Network",
    color: "#06b6d4",
    risk: 60,
  },
  {
    id: 3,
    time: "T+5 s",
    actor: "Wazuh SIEM",
    action: "Correlates DLP event + Snort alert — Rule 100401 triggers on same source IP",
    layer: "SOC",
    color: "#a855f7",
    risk: 78,
  },
  {
    id: 4,
    time: "T+6 s",
    actor: "Risk Engine",
    action: "Composite score: Content(25) + Context(20) + Behavior(25) + Network(15) + Identity(15) = 87/100",
    layer: "Scoring",
    color: "#3b82f6",
    risk: 87,
  },
  {
    id: 5,
    time: "T+8 s",
    actor: "Governance",
    action: "Escalation triggered — transfer blocked — manager notified — forensic snapshot taken",
    layer: "Response",
    color: "#10b981",
    risk: 87,
  },
];

/* ── SVG icon paths for layer badges ── */
const LAYER_ICONS = {
  Endpoint: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  DLP: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  Network: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
  SOC: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  Scoring: "M13 10V3L4 14h7v7l9-11h-7z",
  Response: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
};

/* ── Animated Risk Gauge ── */
function RiskGauge({ value, color }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const getLabel = (v) => (v >= 75 ? "CRITICAL" : v >= 50 ? "HIGH" : v >= 25 ? "MEDIUM" : "LOW");

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          transform="rotate(-90 70 70)"
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
        />
        <motion.text
          x="70"
          y="65"
          textAnchor="middle"
          fill="white"
          fontSize="28"
          fontWeight="bold"
          fontFamily="JetBrains Mono, monospace"
          key={value}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.text>
        <text x="70" y="82" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="Inter, sans-serif">
          / 100
        </text>
      </svg>
      <motion.span
        className="mt-2 rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase"
        style={{ backgroundColor: color + "20", color }}
        key={value}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        {getLabel(value)}
      </motion.span>
    </div>
  );
}

/* ── Animated Scene: visual flow User -> DLP -> Network -> SIEM -> Engine -> Blocked ── */
function SceneVisualization({ activeStep }) {
  const nodes = [
    { label: "User PC", x: 40, color: "#ef4444" },
    { label: "DLP Agent", x: 190, color: "#f59e0b" },
    { label: "Network", x: 340, color: "#06b6d4" },
    { label: "Wazuh", x: 490, color: "#a855f7" },
    { label: "Risk Engine", x: 640, color: "#3b82f6" },
    { label: "Blocked", x: 790, color: "#10b981" },
  ];

  return (
    <div className="mb-10 w-full overflow-x-auto">
      <svg viewBox="0 0 900 100" className="w-full" style={{ minWidth: 600 }}>
        {/* Connector lines */}
        {nodes.map((node, i) => {
          if (i === 0) return null;
          const x1 = nodes[i - 1].x + 60;
          const x2 = node.x;
          const active = activeStep >= i;
          return (
            <g key={`line-${i}`}>
              <motion.line
                x1={x1} y1={50} x2={x2} y2={50}
                stroke={active ? nodes[i - 1].color : "#1e293b"}
                strokeWidth="2"
                strokeDasharray={active ? "0" : "4 4"}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: active ? 0.7 : 0.2 }}
                transition={{ duration: 0.4 }}
              />
              {/* Animated data packet */}
              {active && (
                <motion.circle
                  r="4"
                  fill={nodes[i - 1].color}
                  cy={50}
                  animate={{ cx: [x1, x2], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2, delay: i * 0.3 }}
                  style={{ filter: `drop-shadow(0 0 4px ${nodes[i - 1].color})` }}
                />
              )}
              {/* Arrow */}
              <motion.polygon
                points={`${x2 - 5},${45} ${x2},${50} ${x2 - 5},${55}`}
                fill={active ? node.color : "#334155"}
                animate={{ opacity: active ? 0.8 : 0.2 }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const active = activeStep >= i;
          return (
            <motion.g key={node.label}>
              {/* Pulse ring */}
              {activeStep === i && (
                <motion.circle
                  cx={node.x + 30} cy={50} r={22}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  animate={{ r: [22, 30], opacity: [0.5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
              <motion.rect
                x={node.x} y={28} width={60} height={44} rx={10}
                fill={active ? node.color + "18" : "#0f172a"}
                stroke={active ? node.color : "#334155"}
                strokeWidth={activeStep === i ? 2 : 1}
                animate={{ scale: activeStep === i ? 1.05 : 1 }}
                style={{ transformOrigin: `${node.x + 30}px 50px`, filter: activeStep === i ? `drop-shadow(0 0 8px ${node.color}40)` : "none" }}
              />
              <text
                x={node.x + 30} y={55}
                textAnchor="middle"
                fill={active ? node.color : "#475569"}
                fontSize="8" fontWeight="600"
                fontFamily="Inter, sans-serif"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Main Component ── */
export default function RiskScenario() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  /* Auto-play on scroll into view */
  useEffect(() => {
    if (isInView && activeStep === -1 && !isPlaying) {
      setIsPlaying(true);
      let step = 0;
      const interval = setInterval(() => {
        setActiveStep(step);
        step++;
        if (step > STEPS.length - 1) clearInterval(interval);
      }, 1400);
      return () => clearInterval(interval);
    }
  }, [isInView, activeStep, isPlaying]);

  const currentRisk = activeStep >= 0 ? STEPS[Math.min(activeStep, STEPS.length - 1)].risk : 0;
  const currentColor = activeStep >= 0 ? STEPS[Math.min(activeStep, STEPS.length - 1)].color : "#334155";

  /* Replay handler */
  const handleReplay = () => {
    setActiveStep(-1);
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
      let step = 0;
      const interval = setInterval(() => {
        setActiveStep(step);
        step++;
        if (step > STEPS.length - 1) clearInterval(interval);
      }, 1400);
    }, 300);
  };

  return (
    <section id="scenario" className="section-padding" ref={sectionRef}>
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Threat Scenario"
            title="Enterprise Risk Scenario"
            subtitle="Live incident simulation — watch how layered detection contains a data breach in under 10 seconds."
          />
        </ScrollReveal>

        {/* Scenario context bar */}
        <ScrollReveal delay={0.05}>
          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border border-navy-700/60 bg-navy-950/50 px-5 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyber-red/15 ring-1 ring-cyber-red/30">
              <svg className="h-4 w-4 text-cyber-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="flex-1 text-sm text-gray-400">
              <span className="font-medium text-white">Scenario:</span> Finance analyst sends sensitive budget file (IBAN, forecasts) to personal email — classified <span className="font-semibold text-cyber-amber">Sensitive</span>.
            </p>
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 rounded-md border border-navy-600 bg-navy-800/60 px-3 py-1.5 text-[11px] font-semibold text-gray-300 transition-all hover:border-accent/40 hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Replay
            </button>
          </div>
        </ScrollReveal>

        {/* Animated scene visualization */}
        <ScrollReveal delay={0.1}>
          <SceneVisualization activeStep={activeStep} />
        </ScrollReveal>

        {/* Main content: steps + gauge */}
        <div className="grid gap-8 lg:grid-cols-[1fr_200px]">
          {/* Animated step cards */}
          <div className="space-y-3">
            <AnimatePresence>
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -30, height: 0 }}
                  animate={
                    activeStep >= i
                      ? { opacity: 1, x: 0, height: "auto" }
                      : { opacity: 0, x: -30, height: 0 }
                  }
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex gap-4 rounded-lg border p-4 transition-all"
                    style={{
                      borderColor: activeStep === i ? step.color + "60" : "#1e293b",
                      backgroundColor: activeStep === i ? step.color + "08" : "#0f172a80",
                      boxShadow: activeStep === i ? `0 0 20px ${step.color}15` : "none",
                    }}
                  >
                    {/* Time badge */}
                    <div className="flex flex-col items-center gap-1.5 pt-1">
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2"
                        style={{ borderColor: step.color, backgroundColor: step.color + "15" }}
                        animate={activeStep === i ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="font-mono text-[9px] font-bold" style={{ color: step.color }}>
                          {step.time}
                        </span>
                      </motion.div>
                      {/* Layer icon */}
                      <svg className="h-4 w-4" style={{ color: step.color + "80" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={LAYER_ICONS[step.layer]} />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span
                          className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: step.color + "20", color: step.color }}
                        >
                          {step.layer}
                        </span>
                        <span className="text-sm font-semibold text-white">{step.actor}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-400">{step.action}</p>

                      {/* Risk contribution bar */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-navy-800">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: step.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${step.risk}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-gray-500">{step.risk}/100</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Blocked outcome */}
            <AnimatePresence>
              {activeStep >= STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-4 flex items-center gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-3"
                >
                  <svg className="h-5 w-5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-emerald-300">Exfiltration Blocked — Incident Contained</p>
                    <p className="text-xs text-gray-400">Full detection-to-response in under 10 seconds. Forensic evidence preserved, GDPR compliance maintained.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Live risk gauge */}
          <div className="flex flex-col items-center justify-start pt-4">
            <p className="mb-4 font-mono text-[10px] tracking-widest text-gray-500 uppercase">Live Risk Score</p>
            <RiskGauge value={currentRisk} color={currentColor} />

            {/* Progress indicator */}
            <div className="mt-6 flex gap-1.5">
              {STEPS.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  animate={{
                    backgroundColor: activeStep >= i ? STEPS[i].color : "#334155",
                    scale: activeStep === i ? 1.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
