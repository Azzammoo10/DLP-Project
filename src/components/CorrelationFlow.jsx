import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const STEPS = [
  {
    step: "01",
    title: "User Action",
    detail: "A user performs a sensitive action on a managed endpoint (copy, email, upload, or print).",
    layer: "User",
    color: "#94a3b8",
    arrow: true,
  },
  {
    step: "02",
    title: "Local Detection — DLP Agent",
    detail: "DLP agent inspects content in real time and sends classified events to the central server.",
    layer: "Endpoint",
    color: "#3b82f6",
    arrow: true,
  },
  {
    step: "03",
    title: "Network Detection — Snort IDS",
    detail: "Snort analyzes traffic and raises alerts for suspicious network behavior.",
    layer: "Network",
    color: "#ef4444",
    arrow: true,
  },
  {
    step: "04",
    title: "Log Ingestion — Wazuh SIEM",
    detail: "Wazuh ingests and normalizes DLP and Snort events for unified analysis.",
    layer: "SOC",
    color: "#a855f7",
    arrow: true,
  },
  {
    step: "05",
    title: "Risk Scoring — Composite Calculation",
    detail: "Correlation engine links multi-source events and computes one risk score to set severity.",
    layer: "Engine",
    color: "#f59e0b",
    arrow: true,
  },
  {
    step: "06",
    title: "Governance Escalation",
    detail: "Critical events trigger automatic escalation, notification, and incident workflow.",
    layer: "Governance",
    color: "#10b981",
    arrow: false,
  },
];

export default function CorrelationFlow() {
  return (
    <section id="flow" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Event Processing"
            title="End-to-End Event Processing Flow"
            subtitle="Essential flow from user action to detection, correlation, risk scoring, and escalation."
          />
        </ScrollReveal>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-gray-500/40 via-accent/30 to-green-500/40 md:left-[27px]" />

          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.08}>
                <div className="relative flex gap-4 md:gap-6">
                  {/* Step node */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 md:h-14 md:w-14"
                      style={{ borderColor: s.color, backgroundColor: s.color + "12" }}
                    >
                      <span className="font-mono text-xs font-bold" style={{ color: s.color }}>
                        {s.step}
                      </span>
                    </motion.div>

                    {/* Arrow connector */}
                    {s.arrow && (
                      <div className="mt-1 flex flex-col items-center">
                        <div className="h-4 w-px" style={{ backgroundColor: s.color + "40" }} />
                        <svg className="h-2 w-4" style={{ color: s.color + "60" }} fill="currentColor" viewBox="0 0 16 8">
                          <path d="M8 8L0 0h16z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="rounded-lg border border-navy-700 bg-navy-800/70 p-4 md:p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: s.color + "18", color: s.color }}
                        >
                          {s.layer}
                        </span>
                        <h3 className="text-base font-semibold text-white">{s.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-400">{s.detail}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Technical note */}
        <ScrollReveal delay={0.35}>
          <div className="mt-10 rounded-xl border border-navy-700 bg-navy-950/60 p-5 text-center">
            <p className="text-sm text-gray-400">
              End-to-end response time: 
              <span className="ml-1 font-mono font-bold text-accent-light">&lt; 15 seconds</span>
              , with full event retention for audit.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
