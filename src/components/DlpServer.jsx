// Updated: Sprint 1 & Sprint 2 — v2.0
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ServerAnimation from "./ServerAnimation";

/* ── Detailed tool descriptions shown on hover/click ── */
const TOOL_DETAILS = {
  manager: {
    name: "Flask REST API",
    role: "manager.py",
    color: "#3b82f6",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    description: "API REST (port 5000) for ingestion alertes & règles DLP.",
    specs: ["Endpoints: /alert, /health, /stats, /labeled, /alerts", "Reload: /reload hot reload", "Dépendances: flask, requests, threading"],
  },
  alertlogger: {
    name: "Alert Logger",
    role: "alertlogger.py",
    color: "#10b981",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description: "Thread-safe normalization and persistence into JSONL format.",
    specs: ["Log: /var/log/dlp/dlp.json", "Log: /var/log/dlp/labeledfiles.json", "Log: /var/log/dlp/alerts.log"],
  },
  dlpaddon: {
    name: "Mitmproxy Addon",
    role: "dlpaddon.py",
    color: "#f59e0b",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    ),
    description: "Mitmproxy addon for HTTPS and Dropbox cloud inspection.",
    specs: ["Role: HTTPS Decryption", "Vector: CLOUD", "Dependencies: mitmproxy"],
  },
  rules: {
    name: "DLP Policy Catalog",
    role: "rules.json",
    color: "#ef4444",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description: "Catalogue of DLP policies for Public, Internal, Confidential, and Secret.",
    specs: ["Classifications: 4 levels", "Format: JSON", "Dependencies: json"],
  },
  dlpemailsender: {
    name: "Email Simulator",
    role: "dlpemailsender.py",
    color: "#a855f7",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: "Relai and simulation for outbound email interception testing.",
    specs: ["Vector: EMAIL", "Role: Outbound Email Simulation", "Dependencies: datetime"],
  },
};

const TOOL_IDS = ["manager", "alertlogger", "dlpaddon", "rules", "dlpemailsender"];

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
            subtitle="Serveur central Ubuntu hébergeant l'API Flask, la journalisation DLP, et l'inspection réseau."
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
                { key: "Hostname", value: "DLPSOC" },
                { key: "IP", value: "192.168.100.10" },
                { key: "Réseau", value: "VMware Host-Only 192.168.100.0/24" },
                { key: "Dépendances", value: "flask, requests, mitmproxy, json, logging..." },
                { key: "Logs", value: "/var/log/dlp/dlp.json & alerts.log" },
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