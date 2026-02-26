import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import RadialGauge from "./RadialGauge";
import CountUp from "./CountUp";

const KPIS = [
  { metric: "MTTD", label: "Mean Time to Detect", value: 15, unit: "min", pct: 94, color: "#3b82f6", trend: "From 4+ hours → <15 min" },
  { metric: "MTTR", label: "Mean Time to Respond", value: 60, unit: "min", pct: 82, color: "#a855f7", trend: "70% faster with governance automation" },
  { metric: "Coverage", label: "Detection Coverage", value: 94, unit: "%", pct: 94, color: "#10b981", trend: "38% (DLP only) → 94% integrated" },
];

const MATURITY = [
  { level: 1, label: "Initial", color: "#ef4444", active: true },
  { level: 2, label: "Managed", color: "#f59e0b", active: true },
  { level: 3, label: "Defined", color: "#eab308", active: true },
  { level: 4, label: "Measured", color: "#10b981", active: true },
  { level: 5, label: "Optimized", color: "#3b82f6", active: false },
];

/**
 * KPI & Maturity — Radial gauges + animated maturity bar.
 */
export default function KpiMaturity() {
  return (
    <section id="kpis" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="KPIs & Maturity"
            title="Security Performance Metrics"
            subtitle="Quantifiable outcomes translating technical capability into executive-level posture visibility."
          />
        </ScrollReveal>

        {/* KPI Gauges */}
        <div className="mb-14 grid gap-8 md:grid-cols-3">
          {KPIS.map((kpi, i) => (
            <ScrollReveal key={kpi.metric} delay={i * 0.12}>
              <div className="card flex flex-col items-center text-center">
                <RadialGauge percentage={kpi.pct} color={kpi.color} size={140} />
                <div className="mt-4 font-mono text-xs tracking-wider text-gray-500 uppercase">{kpi.metric}</div>
                <div className="mt-1 text-2xl font-bold text-white">
                  {kpi.metric === "Coverage" ? "" : "< "}
                  <CountUp end={kpi.value} duration={1400} />
                  <span className="text-sm font-medium text-gray-400"> {kpi.unit}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{kpi.label}</p>
                <p className="mt-2 text-xs text-cyber-green">{kpi.trend}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Maturity Model — Visual bar */}
        <ScrollReveal delay={0.2}>
          <div className="card-static">
            <h3 className="mb-6 text-center text-base font-semibold text-white">Security Maturity Model</h3>
            <div className="flex items-end justify-center gap-3 sm:gap-5">
              {MATURITY.map((m) => (
                <div key={m.level} className="flex flex-col items-center">
                  <div
                    className="mb-2 flex items-center justify-center rounded-lg transition-all duration-500"
                    style={{
                      width: 48,
                      height: m.level * 36 + 24,
                      background: m.active ? m.color : `${m.color}44`,
                      boxShadow: m.active ? `0 0 20px ${m.color}44` : "none",
                    }}
                  >
                    <span className="text-sm font-bold text-white">{m.level}</span>
                  </div>
                  <span className={`text-xs font-medium ${m.active ? "text-white" : "text-gray-500"}`}>{m.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-gray-400">
              Current: <span className="font-semibold text-cyber-green">Level 4 — Measured</span>
              <span className="mx-2 text-navy-600">|</span>
              Target: <span className="font-semibold text-accent-light">Level 5 — Optimized</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
