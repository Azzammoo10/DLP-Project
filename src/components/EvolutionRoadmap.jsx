import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import RoadmapTimeline from "./RoadmapTimeline";

const PHASE_DETAILS = [
  { phase: "Phase 1", title: "DLP Layer", items: ["DLP Manager on SOC Server", "DLP Agents on AXA GO + AXA AMS"] },
  { phase: "Phase 2", title: "DLP Validation", items: ["Test file: finance_report.pdf", "Verify DLP alert triggered"] },
  { phase: "Phase 3", title: "SOC Integration", items: ["Wazuh Manager + Agents", "Snort IDS + correlation rules"] },
  { phase: "Phase 4", title: "Pentesting Validation", items: ["Kali Linux (192.168.100.50)", "Correlated DLP + Wazuh + Snort alerts"] },
  { phase: "Phase 5", title: "Zero Trust", items: ["Microsoft Entra ID", "MFA + Conditional Access + micro-segmentation"] },
  { phase: "Phase 6", title: "Purview", items: ["Cloud DLP", "Unified governance"] },
];

const statusColors = ["#10b981", "#10b981", "#10b981", "#10b981", "#3b82f6", "#6b7280"];

/**
 * Evolution Roadmap — Visual animated timeline + compact detail cards.
 */
export default function EvolutionRoadmap() {
  return (
    <section id="roadmap" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Roadmap"
            title="Architecture Evolution Roadmap"
            subtitle="Short phased plan from DLP foundation to Zero Trust and Purview."
          />
        </ScrollReveal>

        {/* Animated SVG timeline */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 rounded-xl border border-navy-700 bg-navy-950/50 p-6 md:p-10">
            <h3 className="mb-6 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
              Delivery Timeline
            </h3>
            <RoadmapTimeline />
          </div>
        </ScrollReveal>

        {/* Phase detail grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PHASE_DETAILS.map((p, i) => (
            <ScrollReveal key={p.phase} delay={i * 0.06}>
              <div className="card h-full border-t-2 p-3" style={{ borderTopColor: statusColors[i] }}>
                <span className="font-mono text-[9px] tracking-wider text-gray-600 uppercase">{p.phase}</span>
                <h3 className="mt-0.5 mb-1 text-xs font-semibold text-white">{p.title}</h3>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  {p.items.map((item, j) => (
                    <span key={item} className="flex items-center gap-1 text-[10px] text-gray-400">
                      <span className="h-0.5 w-0.5 rounded-full" style={{ background: statusColors[i] }} />
                      {item}
                      {j < p.items.length - 1 && <span className="ml-1 text-navy-700">|</span>}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
