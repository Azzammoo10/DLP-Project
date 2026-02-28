import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import AttackFlowDiagram from "./AttackFlowDiagram";

const FIXES = [
  { gap: "No DLP policy",          fix: "DLP Engine with L1–L3 classification",   color: "#3b82f6" },
  { gap: "No SIEM correlation",    fix: "Wazuh SIEM + 8 correlation rules",       color: "#f59e0b" },
  { gap: "Unpatched CVE-2021-4034",fix: "Patch applied + Snort IDS signature",    color: "#06b6d4" },
  { gap: "Open outbound traffic",  fix: "Egress filtering + transfer monitoring", color: "#10b981" },
];

export default function OffensiveValidation() {
  return (
    <section id="validation" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Security Validation"
            title="Controlled Offensive Validation"
            subtitle="Pentest simulation: the attack succeeds, proving the gaps. Improvements are applied afterward."
          />
        </ScrollReveal>

        {/* Pentest Simulation */}
        <ScrollReveal delay={0.08}>
          <div className="mb-10 rounded-2xl border border-navy-700/80 bg-navy-950/50 p-4 md:p-6">
            <AttackFlowDiagram />
          </div>
        </ScrollReveal>

        {/* What We Fixed */}
        <ScrollReveal delay={0.12}>
          <p className="mb-4 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Improvements Applied After Pentest
          </p>
        </ScrollReveal>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {FIXES.map((f, i) => (
            <ScrollReveal key={f.gap} delay={0.15 + i * 0.05}>
              <motion.div
                className="rounded-xl border border-navy-700/60 bg-navy-900/30 p-4"
                whileHover={{ y: -2, borderColor: f.color + "40" }}
              >
                {/* Gap */}
                <p className="text-[10px] text-red-400/80 line-through">{f.gap}</p>
                {/* Arrow */}
                <svg className="my-1.5 h-3 w-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                {/* Fix */}
                <p className="text-xs font-medium" style={{ color: f.color }}>{f.fix}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
