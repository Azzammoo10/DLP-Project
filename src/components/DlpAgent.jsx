import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import AgentAnimation from "./AgentAnimation";

/* ── Detailed monitoring layer descriptions shown on hover ── */
const LAYER_DETAILS = {
  file: {
    name: "File Access Monitoring",
    role: "File System API Hooks",
    color: "#3b82f6",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    description:
      "Hooks into Windows file system APIs (NtCreateFile, NtReadFile, NtWriteFile) via minifilter driver to intercept every file operation in real-time. Captures read, write, copy, rename, and delete events on classified files. Content fingerprinting is applied at access time — generating SHA-256 hashes matched against a central fingerprint index to detect sensitive document movement.",
    specs: [
      "Hook method: Windows Minifilter Driver (FltMgr)",
      "Operations: CreateFile, ReadFile, WriteFile, Rename, Delete",
      "Fingerprinting: SHA-256 hash matched against central index",
      "Detection: Classified file copy to USB, cloud sync, or email attachment",
    ],
    detection: "USB copy of CONFIDENTIAL-tagged Excel → immediate block + alert to Wazuh",
  },
  process: {
    name: "Process Execution Tracking",
    role: "ETW Kernel-Level Tracing",
    color: "#a855f7",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description:
      "Monitors process creation events via Event Tracing for Windows (ETW) at kernel level. Captures parent-child process relationships, command-line arguments, and module loads. Detects unauthorized applications accessing classified content — archiving tools (7-Zip, WinRAR), cloud sync clients (Dropbox, OneDrive personal), steganography tools, and encoding utilities often used for data exfiltration.",
    specs: [
      "Source: ETW Provider — Microsoft-Windows-Kernel-Process",
      "Tracked: Process creation, termination, module load, thread injection",
      "Blocklist: 47 unauthorized applications (archival, stego, P2P)",
      "Context: Parent PID, command-line args, user SID, integrity level",
    ],
    detection: "winrar.exe compressing CONFIDENTIAL folder → block + risk score elevation",
  },
  network: {
    name: "Network Connection Monitoring",
    role: "Outbound Traffic Capture",
    color: "#06b6d4",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
      </svg>
    ),
    description:
      "Captures all outbound TCP/UDP connections from user-space processes using Windows Filtering Platform (WFP) callout drivers. Maps each connection to its originating process and user session. Detects data transfer to external endpoints, unauthorized protocols (FTP, TFTP, IRC), DNS tunneling patterns, and anomalous payload sizes indicating bulk data exfiltration attempts.",
    specs: [
      "Engine: Windows Filtering Platform (WFP) callout driver",
      "Protocols: TCP, UDP, DNS, HTTP/S, FTP, SMTP, custom ports",
      "Mapping: Connection → Process → User SID → Classification level",
      "Thresholds: Payload size anomaly (>100MB/session), frequency spike",
    ],
    detection: "curl.exe uploading 200MB to external IP via HTTPS → alert + network log to Snort correlation",
  },
  content: {
    name: "Content Pattern Detection",
    role: "Inline Regex & Fingerprint Engine",
    color: "#f59e0b",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    description:
      "Applies multi-technique content scanning in real-time before data leaves the endpoint. Combines regex patterns (IBAN, SSN, credit card), keyword dictionaries (GDPR categories), and document fingerprints (exact & partial match) to detect sensitive content across all data channels — clipboard, email drafts, file saves, and print operations. Supports 15+ document formats including PDF, DOCX, XLSX, and compressed archives.",
    specs: [
      "Patterns: 120+ regex rules (PII, financial, health, proprietary)",
      "Dictionaries: GDPR keyword categories, industry-specific terms",
      "Fingerprints: SHA-256 exact match + MinHash partial similarity",
      "Formats: PDF, DOCX, XLSX, PPTX, ZIP, 7Z, TXT, CSV, JSON, XML",
    ],
    detection: "Paste of 50+ IBAN numbers into webmail compose → immediate block + critical alert",
  },
};

const LAYER_IDS = ["file", "process", "network", "content"];

const COMPARISON = [
  {
    aspect: "Detection Scope",
    local: "Single endpoint — file, process, local network",
    central: "Cross-endpoint correlation — patterns across users, departments, time",
  },
  {
    aspect: "Response Time",
    local: "Immediate — block/quarantine at source",
    central: "Seconds — after log ingestion and rule evaluation",
  },
  {
    aspect: "Context Depth",
    local: "Limited to local user session and file metadata",
    central: "Full context: identity, network, history, classification, peer behavior",
  },
  {
    aspect: "Evasion Resistance",
    local: "Vulnerable to local bypass (process injection, encoding)",
    central: "Multi-layer correlation detects patterns even if individual layer is evaded",
  },
];

export default function DlpAgent() {
  const [activeTool, setActiveTool] = useState(null);
  const detail = activeTool ? LAYER_DETAILS[activeTool] : null;

  return (
    <section id="dlp-agent" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Endpoint Agent"
            title="Endpoint DLP Agent Architecture"
            subtitle="Lightweight agent deployed on Windows endpoints providing real-time content inspection, behavioral monitoring, and local enforcement — the first detection layer in the architecture."
          />
        </ScrollReveal>

        {/* ── Agent Visualization + Detail Panel ── */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 rounded-xl border border-navy-700 bg-navy-950/60 p-4 md:p-8">
            <h3 className="mb-2 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Interactive Agent — Hover each monitoring layer
            </h3>
            <p className="mb-6 text-center text-xs text-gray-600">
              Each layer represents a real-time monitoring capability running inside dlp-agent.exe
            </p>

            <div className="grid gap-6 lg:grid-cols-2 items-start">
              {/* Left — Animated endpoint SVG */}
              <div className="flex justify-center">
                <AgentAnimation activeTool={activeTool} onToolHover={setActiveTool} />
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
                      <div className="rounded-lg border border-navy-700 bg-navy-900/60 p-3 mb-4">
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

                      {/* Example detection */}
                      <div className="rounded-lg border border-navy-700 bg-navy-900/40 p-3">
                        <p className="mb-1.5 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                          Example Detection
                        </p>
                        <p className="text-xs font-mono leading-relaxed" style={{ color: detail.color }}>
                          {detail.detection}
                        </p>
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Hover a monitoring layer</p>
                        <p className="mt-1 text-xs text-gray-600">to explore its technical details</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Monitoring Layer Quick-Reference Grid ── */}
        <ScrollReveal delay={0.15}>
          <h3 className="mb-5 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
            Monitoring Capabilities Overview
          </h3>
        </ScrollReveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {LAYER_IDS.map((id, i) => {
            const t = LAYER_DETAILS[id];
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

        

        {/* ── Agent Configuration Summary ── */}
        <ScrollReveal delay={0.22}>
          <div className="mt-8 rounded-xl border border-navy-700 bg-navy-950/60 p-5">
            <h3 className="mb-3 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
              Agent Configuration
            </h3>
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { key: "Platform", value: "Windows 10 / 11 Enterprise" },
                { key: "Service", value: "dlp-agent.exe (auto-start)" },
                { key: "Deployment", value: "GPO / SCCM / Intune" },
                { key: "Footprint", value: "< 50 MB RAM, < 2% CPU" },
                { key: "Reporting", value: "Syslog TCP 514 → DLP-CENTRAL" },
                { key: "Update", value: "Central policy push (hourly sync)" },
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
