import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import GovernanceDiagram from "./GovernanceDiagram";

const DETAILS = [
  { title: "≥5 Occurrence Threshold", desc: "Filters transient anomalies from persistent violations. Reduces alert fatigue by 80%.", color: "#06b6d4" },
  { title: "D+1 Escalation Model", desc: "Validated incidents escalated within one business day. Critical events bypass for immediate routing.", color: "#f59e0b" },
  { title: "Automated Manager Notification", desc: "Structured summaries with severity, data categories, user context, and containment recommendations.", color: "#a855f7" },
  { title: "Investigation Lifecycle", desc: "Triage → Analysis → Containment → Remediation → Post-Incident Review with full audit trail.", color: "#10b981" },
];

/**
 * Governance Workflow — Animated diagram + key details.
 */
export default function GovernanceWorkflow() {
  return (
    <section id="governance" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Governance"
            title="Governance & Escalation Workflow"
            subtitle="Compliance-aligned escalation that transforms detections into organizational accountability."
          />
        </ScrollReveal>

        {/* Animated governance pipeline diagram */}
        <ScrollReveal delay={0.1}>
          <div className="mb-14 rounded-xl border border-navy-700 bg-navy-950/50 p-6 md:p-10">
            <h3 className="mb-6 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Escalation Pipeline
            </h3>
            <GovernanceDiagram />
          </div>
        </ScrollReveal>

        {/* Key governance details */}
        <div className="grid gap-5 sm:grid-cols-2">
          {DETAILS.map((d, i) => (
            <ScrollReveal key={d.title} delay={i * 0.08}>
              <div className="card h-full border-l-4" style={{ borderLeftColor: d.color }}>
                <h3 className="mb-2 text-base font-semibold text-white">{d.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{d.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
