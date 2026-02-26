import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ArchitectureDiagramSVG from "./ArchitectureDiagramSVG";
import architectureDiagram from "../assets/architecture.png";

const LAYERS = [
  { color: "bg-blue-500", dot: "#3b82f6", label: "Data Layer — DLP", desc: "Content inspection, policy enforcement, and classification." },
  { color: "bg-cyan-500", dot: "#06b6d4", label: "Endpoint Layer", desc: "Agent-based user behavior and file operation monitoring." },
  { color: "bg-emerald-500", dot: "#10b981", label: "Network Layer — Snort IDS", desc: "Intrusion detection, exfiltration pattern identification." },
  { color: "bg-amber-500", dot: "#f59e0b", label: "Correlation — Wazuh SOC", desc: "Centralized SIEM aggregation and behavioral analytics." },
  { color: "bg-purple-500", dot: "#a855f7", label: "Governance Layer", desc: "Escalation workflows and compliance-aligned response." },
  { color: "bg-rose-500", dot: "#f43f5e", label: "Identity — Zero Trust", desc: "MFA, conditional access, identity risk enrichment." },
];

/**
 * Architecture Section — Interactive SVG diagram + original diagram + layer cards.
 */
export default function Architecture() {
  return (
    <section id="architecture" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Architecture"
            title="Layered Defense Architecture"
            subtitle="Six interconnected security layers — each reinforcing the others through log-based communication and centralized correlation."
          />
        </ScrollReveal>

        {/* Interactive SVG Architecture Diagram */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 rounded-xl border border-navy-700 bg-navy-950/50 p-6 md:p-10">
            <h3 className="mb-6 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Interactive Layer Model
            </h3>
            <ArchitectureDiagramSVG />
          </div>
        </ScrollReveal>

        {/* Original architecture diagram */}
        <ScrollReveal delay={0.15}>
          <div className="mb-14 overflow-hidden rounded-xl border border-navy-700 bg-navy-950/50 p-2">
            <h3 className="mb-3 pt-3 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Full Architecture Blueprint
            </h3>
            <img
              src={architectureDiagram}
              alt="Hybrid Enterprise DLP Architecture Diagram"
              className="w-full rounded-lg"
            />
          </div>
        </ScrollReveal>

        {/* Compact layer cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAYERS.map((layer, i) => (
            <ScrollReveal key={layer.label} delay={i * 0.08}>
              <div className="card group h-full">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: layer.dot }} />
                  <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                    {layer.label}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">{layer.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
