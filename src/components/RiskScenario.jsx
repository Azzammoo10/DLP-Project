import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/* ── Timeline steps for the incident scenario ── */
const TIMELINE = [
  {
    time: "T+0s",
    actor: "User Action",
    event: "Finance analyst initiates outbound email with attached budget file containing IBAN numbers and internal forecasting data.",
    layer: "Endpoint",
    color: "#ef4444",
  },
  {
    time: "T+2s",
    actor: "DLP Agent",
    event: "Endpoint agent intercepts file access, performs content inspection. Detects IBAN patterns (regex + fingerprint match) and classifies content as Confidential.",
    layer: "DLP",
    color: "#f59e0b",
  },
  {
    time: "T+3s",
    actor: "Snort IDS",
    event: "Network sensor flags outbound SMTP connection to external domain. Payload size exceeds baseline for this user profile. Alert generated: sid:100047.",
    layer: "Network",
    color: "#06b6d4",
  },
  {
    time: "T+5s",
    actor: "Wazuh SIEM",
    event: "Correlation engine ingests DLP event + Snort alert. Rule 100401 triggers: simultaneous content violation and anomalous egress from same source IP within 10s window.",
    layer: "SOC",
    color: "#a855f7",
  },
  {
    time: "T+6s",
    actor: "Risk Engine",
    event: "Composite risk score calculated: Content(25) + Context(20) + Behavior(25) + Network(15) + Identity(15) = 87/100. Exceeds critical threshold (≥75).",
    layer: "Scoring",
    color: "#3b82f6",
  },
  {
    time: "T+8s",
    actor: "Governance",
    event: "Escalation workflow triggered. Incident ticket created. Manager notification dispatched. File transfer blocked at gateway. Forensic snapshot preserved.",
    layer: "Governance",
    color: "#10b981",
  },
];

const WITHOUT = [
  "DLP-only deployment would flag the content but lacks network context — alert treated as low-priority.",
  "No correlation with Snort means the anomalous outbound connection goes unnoticed.",
  "Without risk scoring, the event competes with hundreds of daily alerts — likely deprioritized.",
  "No automated escalation — the incident sits in a queue until manual triage, potentially hours later.",
  "Exfiltration succeeds. Regulatory exposure under GDPR Article 33 — 72-hour breach notification obligation triggered.",
];

export default function RiskScenario() {
  return (
    <section id="scenario" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Threat Scenario"
            title="Enterprise Risk Scenario"
            subtitle="A realistic incident walkthrough demonstrating how layered detection transforms a potential data breach into a contained, governed response."
          />
        </ScrollReveal>

        {/* Scenario context */}
        <ScrollReveal delay={0.05}>
          <div className="mb-10 rounded-xl border border-navy-700 bg-navy-950/60 p-6">
            <h3 className="mb-3 font-mono text-xs tracking-widest text-cyber-amber uppercase">
              Scenario Context
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
              A Finance department analyst at AXA France attempts to send a confidential annual budget
              file to a personal email address. The file contains <span className="text-white font-medium">IBAN account numbers</span>,
              <span className="text-white font-medium"> internal revenue forecasts</span>, and
              <span className="text-white font-medium"> departmental cost projections</span> classified
              as <span className="text-cyber-amber font-semibold">Confidential</span> under the enterprise
              data classification policy.
            </p>
          </div>
        </ScrollReveal>

        {/* Detection timeline */}
        <ScrollReveal delay={0.1}>
          <h3 className="mb-6 font-mono text-xs tracking-widest text-gray-500 uppercase text-center">
            Detection &amp; Response Timeline
          </h3>
        </ScrollReveal>

        <div className="relative mb-14">
          {/* Vertical connector */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-red-500/60 via-blue-500/40 to-green-500/60 md:left-[47px]" />

          <div className="space-y-5">
            {TIMELINE.map((step, i) => (
              <ScrollReveal key={step.time} delay={i * 0.07}>
                <div className="relative flex gap-4 pl-2 md:gap-6">
                  {/* Node */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 md:h-12 md:w-12"
                      style={{ borderColor: step.color, backgroundColor: step.color + "18" }}
                    >
                      <span className="font-mono text-[10px] font-bold" style={{ color: step.color }}>
                        {step.time}
                      </span>
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-lg border border-navy-700 bg-navy-800/70 p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{ backgroundColor: step.color + "20", color: step.color }}
                      >
                        {step.layer}
                      </span>
                      <span className="text-sm font-semibold text-white">{step.actor}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">{step.event}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Without this architecture */}
        <ScrollReveal delay={0.15}>
          <div className="rounded-xl border border-cyber-red/30 bg-cyber-red/5 p-6">
            <h3 className="mb-4 font-mono text-xs tracking-widest text-cyber-red uppercase">
              Without Layered Architecture — Failure Mode
            </h3>
            <ul className="space-y-2">
              {WITHOUT.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-cyber-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
