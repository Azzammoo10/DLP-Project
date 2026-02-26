import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import CountUp from "./CountUp";

const VALUES = [
  { title: "Risk Reduction", desc: "Multi-layer detection lowers undetected exposure risk.", stat: "85", unit: "%+", color: "#10b981" },
  { title: "Compliance Alignment", desc: "GDPR, NIS2, and regulatory audit evidence.", stat: "100", unit: "%", color: "#3b82f6" },
  { title: "Operational Visibility", desc: "Real-time dashboards and KPI-driven decisions.", stat: "24", unit: "/7", color: "#a855f7" },
  { title: "Enterprise Scalability", desc: "Modular layers scale horizontally across business units.", stat: "6", unit: " Layers", color: "#06b6d4" },
  { title: "Architecture Reusability", desc: "Reference pattern applicable across security programs.", stat: "4", unit: " Pillars", color: "#f59e0b" },
];

/**
 * Business Value — Animated stats + concise value cards.
 */
export default function BusinessValue() {
  return (
    <section id="value" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Business Value"
            title="Strategic Value Proposition"
            subtitle="Measurable organizational value delivered by the hybrid DLP architecture — framed for executive stakeholders."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4, boxShadow: `0 8px 30px ${v.color}22` }}
                className="card h-full text-center"
              >
                <p className="text-3xl font-bold" style={{ color: v.color }}>
                  <CountUp end={Number(v.stat)} duration={1800} />
                  <span className="text-lg font-medium">{v.unit}</span>
                </p>
                <h3 className="mt-2 mb-1 text-sm font-semibold text-white">{v.title}</h3>
                <p className="text-xs leading-relaxed text-gray-400">{v.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* ROI callout */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 card-static border-accent/20 bg-gradient-to-r from-accent/5 to-transparent text-center">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-300">
              By unifying data protection, threat detection, and identity governance, this architecture delivers measurable improvements in coverage, response time, and compliance posture — a strategic investment with clear ROI.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
