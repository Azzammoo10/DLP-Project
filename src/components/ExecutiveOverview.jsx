import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const PILLARS = [
  {
    title: "DLP Alone Is Insufficient",
    text: "Traditional DLP lacks visibility into endpoint behavior, network anomalies, and identity threats — leaving critical gaps adversaries exploit.",
    color: "#ef4444",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "SOC & IDS Integration",
    text: "Correlating DLP events with Wazuh SIEM and Snort IDS transforms isolated alerts into actionable intelligence.",
    color: "#3b82f6",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101" />
      </svg>
    ),
  },
  {
    title: "Governance-Driven Model",
    text: "Escalation workflows and compliance-aligned processes bridge technical controls with organizational accountability.",
    color: "#f59e0b",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Defense-in-Depth",
    text: "Layered controls across data, endpoint, network, identity, and governance — no single point of failure.",
    color: "#10b981",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

/**
 * Executive Overview — Animated pillar cards with icons.
 */
export default function ExecutiveOverview() {
  return (
    <section id="overview" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Executive Overview"
            title="Why a Hybrid Architecture?"
            subtitle="Isolated security tools create blind spots. This architecture unifies data protection, threat detection, security operations, and identity governance into a cohesive defense framework."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, boxShadow: `0 8px 30px ${p.color}22` }}
                className="card flex h-full gap-4"
              >
                <div className="shrink-0 mt-0.5" style={{ color: p.color }}>{p.icon}</div>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-white">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{p.text}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
