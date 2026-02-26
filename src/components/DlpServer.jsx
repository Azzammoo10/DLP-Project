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
    description: "Central SIEM service for collecting logs and generating security alerts.",
    specs: ["Ingestion: Syslog + Wazuh API", "Role: Central alerting", "Output: Correlated security events"],
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
    description: "Custom logic for DLP parsing, policy checks, and local response actions.",
    specs: [
      "dlp_parser.py: normalize agent events",
      "classify_enforce.py: apply DLP policy",
      "dlp_response.sh: block/quarantine actions",
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
    description: "Network intrusion detection service for suspicious traffic and attack patterns.",
    specs: ["Mode: IDS", "Input: mirrored/SPAN traffic", "Output: alerts to Wazuh"],
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
    description: "Links Wazuh, Snort, and DLP events into one incident timeline.",
    specs: ["Keys: IP, user, asset", "Window: short time-based matching", "Output: single correlated incident"],
  },
};

const TOOL_IDS = ["wazuh", "snort", "dlpscripts", "correlation"];

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
            subtitle="Ubuntu central server with 4 core components: Wazuh, Snort, DLP Custom, and Correlation Engine."
          />
        </ScrollReveal>

        {/* ── Server Visualization + Detail Panel ── */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 rounded-xl border border-navy-700 bg-navy-950/60 p-4 md:p-8">
            <h3 className="mb-2 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Interactive Server — Hover each component
            </h3>
            <p className="mb-6 text-center text-xs text-gray-600">
              Each rack unit is one core service
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
                        <p className="mt-1 text-xs text-gray-600">to view key information</p>
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
                { key: "Role", value: "Central DLP Security Node" },
                { key: "Ingestion", value: "Syslog TCP/UDP 514 + API" },
                { key: "Storage", value: "Encrypted local storage" },
                { key: "Services", value: "4 core components" },
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