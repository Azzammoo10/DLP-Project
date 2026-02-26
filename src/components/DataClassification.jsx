import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const LEVELS = [
  { level: "Public",       badge: "L0", color: "#10b981", risk: "None",     score: "+0",  policy: "Monitor only", examples: "Marketing, press releases" },
  { level: "Internal",     badge: "L1", color: "#3b82f6", risk: "Low",      score: "+10", policy: "Block external without approval", examples: "Memos, org charts, timelines" },
  { level: "Confidential", badge: "L2", color: "#f59e0b", risk: "High",     score: "+25", policy: "Block external + encrypt + alert", examples: "PII, IBAN, contracts, HR data" },
  { level: "Secret",       badge: "L3", color: "#ef4444", risk: "Critical", score: "+40", policy: "Block all + immediate escalation", examples: "M&A docs, keys, board strategy" },
];

const MACHINE_COVERAGE = [
  {
    machine: "Win-Finance",
    role: "Endpoint (DLP Agent)",
    scope: "Applies L0-L3 classification on local files, clipboard, email and print actions.",
    color: "#06b6d4",
  },
  {
    machine: "Win-RH",
    role: "Endpoint (DLP Agent)",
    scope: "Applies L0-L3 classification on HR datasets and user operations in real time.",
    color: "#3b82f6",
  },
  {
    machine: "Ubuntu Server Central",
    role: "Wazuh + DLP + Snort",
    scope: "Stores and correlates classification events from all machines for alerting and response.",
    color: "#10b981",
  },
  {
    machine: "Kali Linux",
    role: "Pentest Validation",
    scope: "Validates that L2/L3 controls are enforced during authorized attack simulations.",
    color: "#f43f5e",
  },
];

export default function DataClassification() {
  return (
    <section id="classification" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Data Classification"
            title="Enterprise Data Classification Framework"
            subtitle="Professional 4-level model (L0-L3) governing DLP enforcement, risk scoring, and incident escalation across all machines."
          />
        </ScrollReveal>

        {/* Compact classification table */}
        <ScrollReveal delay={0.1}>
          <div className="rounded-xl border border-navy-700 bg-navy-950/60 p-4 md:p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-700">
                  <th className="py-2 pr-3 text-left font-mono text-[10px] tracking-widest text-gray-500 uppercase">Level</th>
                  <th className="py-2 px-3 text-left font-mono text-[10px] tracking-widest text-gray-500 uppercase">Risk</th>
                  <th className="py-2 px-3 text-left font-mono text-[10px] tracking-widest text-gray-500 uppercase">Score</th>
                  <th className="py-2 px-3 text-left font-mono text-[10px] tracking-widest text-gray-500 uppercase">DLP Policy</th>
                  <th className="py-2 pl-3 text-left font-mono text-[10px] tracking-widest text-gray-500 uppercase">Examples</th>
                </tr>
              </thead>
              <tbody>
                {LEVELS.map((l) => (
                  <motion.tr
                    key={l.level}
                    whileHover={{ backgroundColor: l.color + "08" }}
                    className="border-b border-navy-800 transition-colors"
                  >
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded font-mono text-[10px] font-bold"
                          style={{ backgroundColor: l.color + "20", color: l.color }}
                        >
                          {l.badge}
                        </span>
                        <span className="font-semibold text-white">{l.level}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{ borderColor: l.color + "50", color: l.color, backgroundColor: l.color + "10" }}
                      >
                        {l.risk}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-xs" style={{ color: l.color }}>{l.score}</td>
                    <td className="py-3 px-3 text-gray-400">{l.policy}</td>
                    <td className="py-3 pl-3 text-xs text-gray-500">{l.examples}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <div className="mt-8 rounded-xl border border-navy-700 bg-navy-950/60 p-4 md:p-6">
            <h3 className="mb-4 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Classification Coverage by Machine
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {MACHINE_COVERAGE.map((item) => (
                <motion.div
                  key={item.machine}
                  whileHover={{ y: -2, boxShadow: `0 8px 24px ${item.color}18` }}
                  className="rounded-lg border border-navy-700 bg-navy-900/50 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <p className="text-sm font-semibold text-white">{item.machine}</p>
                  </div>
                  <p className="mb-1 text-[11px] font-mono" style={{ color: item.color }}>{item.role}</p>
                  <p className="text-xs leading-relaxed text-gray-400">{item.scope}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
