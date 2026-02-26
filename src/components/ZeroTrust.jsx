import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ZeroTrustDiagram from "./ZeroTrustDiagram";

const ZT_PRINCIPLES = [
  { title: "Verify Explicitly", desc: "Identity, device, and context checked for every request." },
  { title: "Least Privilege", desc: "Access is minimized by role, risk, and session." },
  { title: "Assume Breach", desc: "Continuous monitoring and fast containment by design." },
];

const ZT_PILLARS = [
  { title: "Microsoft Entra ID", desc: "Identity authority for authentication and authorization.", color: "#3b82f6" },
  { title: "Multi-Factor Authentication", desc: "Strong sign-in validation for all sensitive access.", color: "#a855f7" },
  { title: "Conditional Access", desc: "Policy decisions based on context and device posture.", color: "#06b6d4" },
  { title: "Identity Risk Enrichment", desc: "Risk signals integrated into DLP and SOC decisions.", color: "#10b981" },
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
            title="Zero Trust Access Architecture"
            subtitle="Step 2 (post-pentest): implement identity-first controls to close validated gaps and strengthen access security."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.04}>
          <div className="mb-6 rounded-lg border border-navy-700 bg-navy-900/40 p-3 text-center">
            <p className="text-xs text-gray-300">
              Sequence: <span className="font-semibold text-white">Pentesting</span> → <span className="font-semibold text-white">Findings</span> → <span className="font-semibold text-white">Zero Trust Implementation</span>.
            </p>
          </div>
        </ScrollReveal>

        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {ZT_PRINCIPLES.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <div className="rounded-lg border border-navy-700 bg-navy-900/50 p-4">
                <p className="mb-1 text-xs font-semibold tracking-wide text-white uppercase">{item.title}</p>
                <p className="text-xs leading-relaxed text-gray-400">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Concentric rings diagram */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 rounded-xl border border-navy-700 bg-navy-950/50 p-6 md:p-10">
            <h3 className="mb-4 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Continuous Verification Model
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
