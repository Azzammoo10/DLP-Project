// Updated: Sprint 1 & Sprint 2 — v2.0
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import AgentAnimation from "./AgentAnimation";

/* ── Concise monitoring layer details ── */
const LAYER_DETAILS = {
  filescanner: {
    name: "filescanner.py",
    role: "Vecteur FILE",
    color: "#3b82f6",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    description: "Surveillance filesystem watchdog + scan keywords + popup tkinter.",
    specs: ["Librairie: watchdog, tkinter", "Méthode: FS Monitoring"],
    detection: "BLOCK: Suppression fichier + popup tkinter",
  },
  clipboardmonitor: {
    name: "clipboardmonitor.py",
    role: "Vecteur CLIPBOARD",
    color: "#a855f7",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: "Polling pyperclip + hashlib déduplication.",
    specs: ["Librairie: pyperclip, hashlib", "Méthode: Polling Clipboard"],
    detection: "AUDIT: Log + popup warning utilisateur",
  },
  usbmonitor: {
    name: "usbmonitor.py",
    role: "Vecteur USB",
    color: "#06b6d4",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
      </svg>
    ),
    description: "psutil détection lecteurs amovibles + watchdog.",
    specs: ["Librairie: psutil, watchdog, ctypes", "Méthode: Removable Drives"],
    detection: "ALERT: Log silencieux uniquement",
  },
  emailmonitor: {
    name: "emailmonitor.py",
    role: "Vecteur EMAIL",
    color: "#f59e0b",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: "Serveur SMTP local aiosmtpd + parsing MIME.",
    specs: ["Librairie: aiosmtpd, email", "Méthode: SMTP Proxying"],
    detection: "ALLOW: Aucune action",
  },
  networkmonitor: {
    name: "networkmonitor.py",
    role: "Vecteur CLOUD/NETWORK",
    color: "#ef4444",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    ),
    description: "psutil connexions actives + reverse DNS cloud + corrélation fichiers.",
    specs: ["Librairie: psutil, socket", "Méthode: Active TCP connections"],
    detection: "BLOCK: Interruption transfert",
  },
  alertsender: {
    name: "alertsender.py",
    role: "TRANSPORT",
    color: "#10b981",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description: "HTTP POST vers 192.168.100.10:5000/alert + retry queue locale.",
    specs: ["Librairie: requests, threading", "File: agent/alertsqueue.json"],
    detection: "POST Payload JSON",
  },
};

const LAYER_IDS = ["filescanner", "clipboardmonitor", "usbmonitor", "emailmonitor", "networkmonitor", "alertsender"];

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
            subtitle="Windows endpoint agent with 4 core controls: file, process, network, and content detection."
          />
        </ScrollReveal>

        {/* ── Agent Visualization + Detail Panel ── */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 rounded-xl border border-navy-700 bg-navy-950/60 p-4 md:p-8">
            <h3 className="mb-2 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Endpoint Architecture Overview
            </h3>
            <p className="mb-6 text-center text-xs text-gray-600">
              Hover each layer to see key points
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
                          Key Technical Points
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
                          Important Example
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
                        <p className="mt-1 text-xs text-gray-600">to view important details</p>
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
            Endpoint Monitoring Capabilities
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
              Endpoint Agent Configuration
            </h3>
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { key: "Platform", value: "Windows 11 LTSC" },
                { key: "Endpoints", value: "AXA-AMS (192.168.100.20), AXA-GO (192.168.100.30)" },
                { key: "Config", value: "agentconfig.json" },
                { key: "Cible", value: "POST http://192.168.100.10:5000/alert" },
                { key: "Actions", value: "Secret: BLOCK, Confidential: AUDIT, Internal: ALERT, Public: ALLOW" },
                { key: "Payload", value: "JSON (timestamp, classification, vector, hostname, ruleid...)" },
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
