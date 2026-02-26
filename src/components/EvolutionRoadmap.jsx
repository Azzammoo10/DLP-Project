import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import RoadmapTimeline from "./RoadmapTimeline";

const PHASE_DETAILS = [
  { phase: "Phase 1", title: "Foundational DLP", items: ["DLP baseline", "Endpoint agents"] },
  { phase: "Phase 2", title: "SOC Integration", items: ["Wazuh SIEM", "Correlation rules"] },
  { phase: "Phase 3", title: "IDS Layer", items: ["Snort IDS", "Network visibility"] },
  { phase: "Phase 4", title: "Governance", items: ["Escalation flow", "Manager alerts"] },
  { phase: "Phase 5", title: "Zero Trust", items: ["Entra ID", "MFA + Conditional Access"] },
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHASE_DETAILS.map((p, i) => (
            <ScrollReveal key={p.phase} delay={i * 0.06}>
              <div className="card h-full border-t-2" style={{ borderTopColor: statusColors[i] }}>
                <span className="font-mono text-[10px] tracking-wider text-gray-600 uppercase">{p.phase}</span>
                <h3 className="mt-1 mb-2 text-sm font-semibold text-white">{p.title}</h3>
                <ul className="space-y-1">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="h-1 w-1 rounded-full" style={{ background: statusColors[i] }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
