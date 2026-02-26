import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const STEPS = [
  {
    step: "01",
    title: "User Action",
    detail: "An employee performs a data-related operation: file copy to USB, email attachment, cloud upload, print, or screen capture. The action originates on a managed Windows endpoint.",
    layer: "User",
    color: "#94a3b8",
    arrow: true,
  },
  {
    step: "02",
    title: "Local Detection — DLP Agent",
    detail: "Endpoint agent intercepts the operation in real-time. Content inspection engine applies pattern matching (regex, fingerprint, keyword). If sensitive content is detected, a local DLP event is generated with classification level, content hash, user SID, process name, and timestamp. Event forwarded to central server via encrypted syslog.",
    layer: "Endpoint",
    color: "#3b82f6",
    arrow: true,
  },
  {
    step: "03",
    title: "Network Detection — Snort IDS",
    detail: "Simultaneously, Snort sensors on the network segment analyze the traffic. Signature-based and protocol analysis rules evaluate the connection. If anomalous patterns are detected (unusual destination, payload size, protocol misuse), a network alert is generated with source/destination IP, matched rule SID, packet metadata, and connection state.",
    layer: "Network",
    color: "#ef4444",
    arrow: true,
  },
  {
    step: "04",
    title: "Log Ingestion — Wazuh SIEM",
    detail: "Wazuh manager ingests events from both the DLP agent and Snort IDS in near-real-time. Event normalization standardizes field formats across sources. Decoders extract structured fields for correlation rule evaluation. Events are indexed and available for cross-source pattern matching.",
    layer: "SOC",
    color: "#a855f7",
    arrow: true,
  },
  {
    step: "05",
    title: "Risk Scoring — Composite Calculation",
    detail: "The correlation engine evaluates the normalized event stream against 200+ rules. When multi-source correlation triggers (DLP + IDS from same source within time window), the risk scoring engine calculates: Content(25%) + Context(20%) + Behavior(25%) + Network(15%) + Identity(15%). The composite score determines severity classification.",
    layer: "Engine",
    color: "#f59e0b",
    arrow: true,
  },
  {
    step: "06",
    title: "Governance Escalation",
    detail: "If score ≥ critical threshold (75) and occurrence count ≥ 5 within 24h: automated incident creation, manager notification via structured template, forensic evidence package generation, and audit trail preservation. The incident enters the investigation lifecycle: Triage → Analysis → Containment → Remediation → Post-Incident Review.",
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
            subtitle="Step-by-step technical walkthrough of how a user action traverses the detection, correlation, scoring, and governance layers."
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
              Total processing latency from user action to governance escalation: 
              <span className="ml-1 font-mono font-bold text-accent-light">&lt; 15 seconds</span>.
              All events are preserved in append-only storage for forensic reconstruction and regulatory audit.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
