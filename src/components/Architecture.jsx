import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ArchitectureDiagramSVG from "./ArchitectureDiagramSVG";

const NODES = [
  {
    label: "Ubuntu Server (Central)",
    desc: "Wazuh, DLP, Snort IDS",
    color: "bg-emerald-400",
  },
  {
    label: "Win-Finance",
    desc: "DLP Agent",
    color: "bg-cyan-400",
  },
  {
    label: "Win-RH",
    desc: "DLP Agent",
    color: "bg-blue-400",
  },
  {
    label: "Kali Linux",
    desc: "Pentest",
    color: "bg-rose-400",
  },
];

const FLOW = [
  {
    step: "Collect",
    detail: "Win-Finance and Win-RH DLP agents capture and forward endpoint security events.",
  },
  {
    step: "Detect",
    detail: "Snort IDS analyzes traffic while Wazuh correlates host and network telemetry.",
  },
  {
    step: "Validate",
    detail: "Kali Linux performs controlled pentest scenarios to validate detection coverage.",
  },
  {
    step: "Respond",
    detail: "The Ubuntu central stack orchestrates triage, policy enforcement, and incident response.",
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
                <h4 className="text-sm font-semibold text-white">Ubuntu Server Central</h4>
                <p className="mt-2 text-sm text-gray-400">Hosts Wazuh, DLP, and Snort IDS as the unified analysis and control plane.</p>
              </div>

              <div className="rounded-lg border border-navy-800 bg-navy-900/60 p-4">
                <p className="mb-2 text-xs font-semibold tracking-wider text-cyan-300 uppercase">Endpoint Protection Layer</p>
                <h4 className="text-sm font-semibold text-white">Win-Finance + Win-RH</h4>
                <p className="mt-2 text-sm text-gray-400">Both endpoints run DLP agents to enforce policy and send telemetry to the central server.</p>
              </div>

              <div className="rounded-lg border border-navy-800 bg-navy-900/60 p-4">
                <p className="mb-2 text-xs font-semibold tracking-wider text-rose-300 uppercase">Validation Layer</p>
                <h4 className="text-sm font-semibold text-white">Kali Linux</h4>
                <p className="mt-2 text-sm text-gray-400">Executes authorized pentest simulations to validate detections and response workflows.</p>
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
