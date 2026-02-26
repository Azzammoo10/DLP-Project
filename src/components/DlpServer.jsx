import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ServerAnimation from "./ServerAnimation";

/* ── Detailed tool descriptions shown on hover/click ── */
const TOOL_DETAILS = {
  wazuh: {
    name: "Wazuh Manager",
    role: "SIEM & Log Correlation",
    color: "#3b82f6",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description: "Open-source SIEM platform acting as the central nervous system. Ingests logs from all sources (DLP agents, Snort, identity providers) via syslog and Wazuh API. Runs 200+ custom correlation rules to detect multi-source attack patterns.",
    specs: ["Log ingestion: ~5,000 events/sec capacity", "Decoders: 45 custom + 300 built-in", "Correlation rules: 200+ enterprise-tuned", "API: RESTful for dashboard integration"],
  },
  dlpscripts: {
    name: "DLP Custom Scripts",
    role: "Custom DLP Policy & Enforcement Engine",
    color: "#e11d48",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description: "Suite of custom Python and Bash scripts that form the DLP-specific logic layer. These scripts handle agent log parsing, data classification enforcement, content fingerprint matching, policy violation detection, and automated response actions. They bridge the gap between raw Wazuh/Snort alerts and enterprise DLP policy — transforming generic security events into DLP-contextualized incidents with classification-aware severity.",
    specs: [
      "dlp_parser.py — Parses agent syslog into structured DLP events",
      "classify_enforce.py — Maps file access to classification tier + policy",
      "fingerprint_match.py — SHA-256 / MinHash content fingerprinting",
      "dlp_response.sh — Automated block, quarantine, and notification actions",
      "policy_sync.py — Pushes updated DLP policies to all endpoints",
      "dlp_report.py — Generates compliance reports (GDPR, ISO 27001)",
    ],
  },
  snort: {
    name: "Snort IDS Engine",
    role: "Network Intrusion Detection",
    color: "#ef4444",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      </svg>
    ),
    description: "Network-based intrusion detection running in IDS mode. Monitors mirrored traffic from the core switch. Signature-based and protocol analysis rules detect scanning, exploitation attempts, C2 communication, and data exfiltration patterns.",
    specs: ["Mode: IDS (inline-capable)", "Signatures: 12 custom + community ruleset", "Traffic: SPAN port mirroring from core switch", "Output: Unified2 → Wazuh integration"],
  },
  correlation: {
    name: "Correlation Engine",
    role: "Cross-Source Event Linking",
    color: "#a855f7",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
      </svg>
    ),
    description: "Custom correlation logic built on top of Wazuh rules. Links events across DLP, IDS, and identity sources using shared attributes (source IP, user SID, timestamp window). Transforms isolated alerts into correlated incident chains.",
    specs: ["Time window: configurable 10s–24h", "Correlation keys: IP, User SID, Asset ID", "Chain depth: up to 5 linked events", "Output: correlated alert with full context"],
  },
  risk: {
    name: "Risk Scoring Module",
    role: "Composite Threat Assessment",
    color: "#f59e0b",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    description: "Weighted scoring engine that computes a 0–100 composite risk score for each correlated event chain. Five dimensions are evaluated independently, then aggregated to determine severity tier and appropriate response action.",
    specs: ["Content: 25% (classification level)", "Behavior: 25% (user baseline deviation)", "Context: 20% (time, location, peers)", "Network: 15% | Identity: 15%"],
  },
  governance: {
    name: "Governance Daemon",
    role: "Escalation & Workflow Engine",
    color: "#10b981",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    description: "Automated escalation service that enforces the D+1 governance model. Evaluates occurrence thresholds (≥5 in 24h), triggers manager notifications, creates incident tickets, and manages the investigation lifecycle with full audit trail.",
    specs: ["Threshold: ≥5 occurrences / 24h window", "Escalation: D+1 standard, immediate for critical", "Notifications: email + ITSM ticket creation", "Audit: append-only investigation log"],
  },
  elastic: {
    name: "Elasticsearch / Indexer",
    role: "Search & Forensic Storage",
    color: "#06b6d4",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    description: "Full-text indexing engine storing all normalized events, correlation results, and forensic data. Powers the Wazuh dashboard for real-time visualization and supports long-term retention for compliance audits and post-incident investigation.",
    specs: ["Retention: 90 days hot, 1 year warm", "Index rate: ~5,000 docs/sec", "Dashboard: Wazuh Kibana plugin", "Storage: encrypted at rest (LUKS)"],
  },
};

const TOOL_IDS = ["wazuh", "snort", "dlpscripts", "correlation", "risk", "governance", "elastic"];

export default function DlpServer() {
  const [activeTool, setActiveTool] = useState(null);
  const detail = activeTool ? TOOL_DETAILS[activeTool] : null;

  return (
    <section id="dlp-server" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Server Architecture"
            title="DLP Server Technical Architecture"
            subtitle="The central governance node — Ubuntu Server hosting 7 integrated services including custom DLP scripts responsible for log aggregation, DLP enforcement, correlation, risk scoring, and escalation."
          />
        </ScrollReveal>

        {/* ── Server Visualization + Detail Panel ── */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 rounded-xl border border-navy-700 bg-navy-950/60 p-4 md:p-8">
            <h3 className="mb-2 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Interactive Server — Hover each component
            </h3>
            <p className="mb-6 text-center text-xs text-gray-600">
              Each rack unit represents a service running on the virtual machine
            </p>

            <div className="grid gap-6 lg:grid-cols-2 items-start">
              {/* Left — Animated server SVG */}
              <div className="flex justify-center">
                <ServerAnimation activeTool={activeTool} onToolHover={setActiveTool} />
              </div>

              {/* Right — Detail panel */}
              <div className="min-h-[340px]">
                <AnimatePresence mode="wait">
                  {detail ? (
                    <motion.div
                      key={activeTool}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-xl border p-5 md:p-6"
                      style={{ borderColor: detail.color + "40", backgroundColor: detail.color + "08" }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ backgroundColor: detail.color + "20", color: detail.color }}
                        >
                          {detail.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{detail.name}</h3>
                          <p className="text-xs font-mono tracking-wider" style={{ color: detail.color }}>
                            {detail.role}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-5 text-sm leading-relaxed text-gray-400">
                        {detail.description}
                      </p>

                      {/* Technical specs */}
                      <div className="rounded-lg border border-navy-700 bg-navy-900/60 p-3">
                        <p className="mb-2 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                          Technical Specifications
                        </p>
                        <ul className="space-y-1.5">
                          {detail.specs.map((spec) => (
                            <li key={spec} className="flex items-start gap-2 text-xs text-gray-400">
                              <span
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                                style={{ backgroundColor: detail.color }}
                              />
                              <span className="font-mono">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed border-navy-700 bg-navy-900/30"
                    >
                      <div className="text-center px-6">
                        <svg className="mx-auto mb-3 h-10 w-10 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Hover a component in the server</p>
                        <p className="mt-1 text-xs text-gray-600">to view its technical details</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Tool Quick-Reference Grid ── */}
        <ScrollReveal delay={0.15}>
          <h3 className="mb-5 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
            Installed Services Overview
          </h3>
        </ScrollReveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_IDS.map((id, i) => {
            const t = TOOL_DETAILS[id];
            return (
              <ScrollReveal key={id} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -3, boxShadow: `0 8px 30px ${t.color}15` }}
                  onMouseEnter={() => setActiveTool(id)}
                  onMouseLeave={() => setActiveTool(null)}
                  className="card cursor-pointer flex items-start gap-3"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: t.color + "18", color: t.color }}
                  >
                    {t.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                    <p className="text-[11px] font-mono" style={{ color: t.color }}>{t.role}</p>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{t.description.split(". ")[0]}.</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Server Config Summary ── */}
        <ScrollReveal delay={0.25}>
          <div className="mt-8 rounded-xl border border-navy-700 bg-navy-950/60 p-5">
            <h3 className="mb-3 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
              VM Configuration
            </h3>
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { key: "OS", value: "Ubuntu Server 22.04 LTS" },
                { key: "Role", value: "Central DLP Governance Node" },
                { key: "Ingestion", value: "Syslog TCP/UDP 514 + API" },
                { key: "Storage", value: "LUKS-encrypted, 90d hot + 1y warm" },
                { key: "Services", value: "7 integrated components (above)" },
                { key: "Network", value: "Management VLAN, isolated segment" },
              ].map((s) => (
                <div key={s.key} className="flex items-baseline gap-2 text-sm">
                  <span className="font-mono text-[11px] text-gray-500">{s.key}:</span>
                  <span className="text-gray-300">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}