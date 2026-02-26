import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import AttackFlowDiagram from "./AttackFlowDiagram";

const FINDINGS = [
  { label: "Validated Attack Scenarios", value: "3", color: "#ef4444" },
  { label: "New Correlation Rules", value: "8", color: "#f59e0b" },
  { label: "DLP Policy Improvements", value: "3", color: "#3b82f6" },
  { label: "Detection Coverage Gain", value: "+18%", color: "#10b981" },
];

/**
 * Offensive Validation — Attack flow diagram + outcome metrics.
 */
export default function OffensiveValidation() {
  return (
    <section id="validation" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Security Validation"
            title="Controlled Offensive Validation"
            subtitle="Realistic pentest simulation in a controlled lab: emulate attacker behavior, validate detections, and generate remediation actions before Zero Trust rollout."
          />
        </ScrollReveal>

        {/* Attack Flow Diagram */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 rounded-xl border border-navy-700 bg-navy-950/50 p-6 md:p-10">
            <h3 className="mb-6 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Live Pentest Scenario &rarr; SOC Detection Response
            </h3>
            <AttackFlowDiagram />
          </div>
        </ScrollReveal>

        {/* Tuning Outcomes */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {FINDINGS.map((f) => (
              <div key={f.label} className="card text-center">
                <p className="text-3xl font-bold" style={{ color: f.color }}>{f.value}</p>
                <p className="mt-1 text-xs text-gray-400">{f.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Note */}
        <ScrollReveal delay={0.3}>
          <div className="mt-8 card-static border-accent/20 bg-accent/5 text-center">
            <p className="text-sm font-medium text-gray-300">
              Findings are validated, documented, and converted into hardening actions for the next Zero Trust implementation phase.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
