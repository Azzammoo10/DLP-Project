import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import FlowDiagram from "./FlowDiagram";
import RiskFormulaDiagram from "./RiskFormulaDiagram";

/**
 * Communication & Correlation Model — Animated flow diagram + risk formula visualization.
 */
export default function CorrelationModel() {
  return (
    <section id="correlation" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Correlation Model"
            title="Communication & Correlation Architecture"
            subtitle="A log-driven correlation framework that transforms disparate security signals into unified, risk-scored intelligence."
          />
        </ScrollReveal>

        {/* Animated flow diagram */}
        <ScrollReveal delay={0.1}>
          <div className="mb-14 rounded-xl border border-navy-700 bg-navy-950/50 p-6 md:p-10">
            <h3 className="mb-6 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Real-Time Correlation Pipeline
            </h3>
            <FlowDiagram />
          </div>
        </ScrollReveal>

        {/* Risk formula visualization */}
        <ScrollReveal delay={0.15}>
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 md:p-10">
            <h3 className="mb-6 text-center text-lg font-semibold text-white">
              Composite Risk Scoring Model
            </h3>
            <RiskFormulaDiagram />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
