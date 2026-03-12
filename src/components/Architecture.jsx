import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ArchitectureDiagramSVG from "./ArchitectureDiagramSVG";

const NODES = [
  {
    label: "SOC Server (192.168.100.10)",
    desc: "DLP Manager, Wazuh, Snort IDS",
    color: "bg-emerald-400",
  },
  {
    label: "AXA AMS (192.168.100.20)",
    desc: "DLP Agent + Wazuh Agent",
    color: "bg-cyan-400",
  },
  {
    label: "AXA GO (192.168.100.30)",
    desc: "DLP Agent + Wazuh Agent",
    color: "bg-blue-400",
  },
  {
    label: "Kali Linux (192.168.100.50)",
    desc: "Pentest — Phase 4",
    color: "bg-rose-400",
  },
];

const FLOW = [
  {
    step: "Collect",
    detail: "AXA GO and AXA AMS endpoints forward DLP events and Wazuh agent telemetry to the SOC server.",
  },
  {
    step: "Detect",
    detail: "Snort IDS analyzes network traffic while Wazuh Manager correlates host and network telemetry.",
  },
  {
    step: "Validate",
    detail: "Kali Linux (Phase 4) executes controlled pentest scenarios to validate detection coverage across DLP, Wazuh, and Snort.",
  },
  {
    step: "Respond",
    detail: "The SOC server orchestrates triage, DLP policy enforcement, and incident response with Zero Trust access governance.",
  },
];

/**
 * Architecture Section — Professional visual architecture.
 */
export default function Architecture() {
  return (
    <section id="architecture" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Architecture"
            title="Global Layered Defense Architecture"
            subtitle="Professional enterprise architecture with one centralized security platform, protected business endpoints, and a controlled validation node."
          />
        </ScrollReveal>

        {/* Creative architecture layout (no diagram) */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 rounded-xl border border-navy-700 bg-navy-950/50 p-5 md:p-7">
            <h3 className="mb-5 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Global Architecture Diagram
            </h3>

            <ArchitectureDiagramSVG />

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-navy-800 bg-navy-900/60 p-4">
                <p className="mb-2 text-xs font-semibold tracking-wider text-emerald-300 uppercase">Central Security Platform</p>
                <h4 className="text-sm font-semibold text-white">SOC Server — 192.168.100.10</h4>
                <p className="mt-2 text-sm text-gray-400">Hosts DLP Manager, Wazuh Manager, and Snort IDS as the unified analysis and control plane.</p>
              </div>

              <div className="rounded-lg border border-navy-800 bg-navy-900/60 p-4">
                <p className="mb-2 text-xs font-semibold tracking-wider text-cyan-300 uppercase">Endpoint Protection Layer</p>
                <h4 className="text-sm font-semibold text-white">AXA AMS + AXA GO</h4>
                <p className="mt-2 text-sm text-gray-400">Both endpoints run DLP Agent + Wazuh Agent to enforce policy and forward telemetry to the SOC server.</p>
              </div>

              <div className="rounded-lg border border-navy-800 bg-navy-900/60 p-4">
                <p className="mb-2 text-xs font-semibold tracking-wider text-rose-300 uppercase">Validation Layer — Phase 4</p>
                <h4 className="text-sm font-semibold text-white">Kali Linux — 192.168.100.50</h4>
                <p className="mt-2 text-sm text-gray-400">Executes authorized pentest simulations to validate detections across DLP, Wazuh, and Snort.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mb-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {FLOW.map((item, index) => (
            <ScrollReveal key={item.step} delay={index * 0.08}>
              <div className="card h-full">
                <p className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">{item.step}</p>
                <p className="text-sm leading-relaxed text-gray-300">{item.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Role cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NODES.map((node, i) => (
            <ScrollReveal key={node.label} delay={i * 0.08}>
              <div className="card group h-full">
                <div className="mb-3 flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${node.color}`} />
                  <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                    {node.label}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">{node.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
