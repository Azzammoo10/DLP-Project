import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ZeroTrustDiagram from "./ZeroTrustDiagram";

const ZT_PILLARS = [
  { title: "Microsoft Entra ID", desc: "Centralized identity provider — authentication & authorization backbone.", color: "#3b82f6" },
  { title: "Multi-Factor Authentication", desc: "Mandatory MFA eliminating single-factor credential compromise.", color: "#a855f7" },
  { title: "Conditional Access", desc: "Dynamic access control based on device, location, risk & session context.", color: "#06b6d4" },
  { title: "Identity Risk Enrichment", desc: "Identity signals feed directly into composite risk scoring model.", color: "#10b981" },
];

/**
 * Zero Trust Integration — Identity-centric architecture with concentric diagram.
 */
export default function ZeroTrust() {
  return (
    <section id="zerotrust" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Zero Trust"
            title="Identity-Centric Security Evolution"
            subtitle="Shifting from perimeter-based trust to continuous, identity-driven verification across every access decision."
          />
        </ScrollReveal>

        {/* Concentric rings diagram */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 rounded-xl border border-navy-700 bg-navy-950/50 p-6 md:p-10">
            <h3 className="mb-4 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Defense Rings — Never Trust, Always Verify
            </h3>
            <ZeroTrustDiagram />
          </div>
        </ScrollReveal>

        {/* Pillar cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ZT_PILLARS.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08}>
              <div className="card h-full text-center">
                <div className="mx-auto mb-3 h-2 w-12 rounded-full" style={{ background: p.color }} />
                <h3 className="mb-1 text-sm font-semibold text-white">{p.title}</h3>
                <p className="text-xs leading-relaxed text-gray-400">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
