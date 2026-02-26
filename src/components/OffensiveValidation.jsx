import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import AttackFlowDiagram from "./AttackFlowDiagram";

const FINDINGS = [
  { label: "New Snort Signatures", value: "12", color: "#ef4444" },
  { label: "Wazuh Correlation Rules", value: "8", color: "#f59e0b" },
  { label: "DLP Policy Refinements", value: "3", color: "#3b82f6" },
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
            subtitle="Adversarial simulations that stress-test defensive controls and generate evidence-based tuning recommendations."
          />
        </ScrollReveal>

        {/* Attack Flow Diagram */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 rounded-xl border border-navy-700 bg-navy-950/50 p-6 md:p-10">
            <h3 className="mb-6 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Attack Simulation &rarr; Detection Validation
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
              All exercises conducted in a controlled lab under documented authorization — aligned with enterprise penetration testing governance.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
