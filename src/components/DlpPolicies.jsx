import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/* ── Policy catalog from PDF Ch.9 ── */
const CATEGORIES = [
  {
    id: "hr",
    label: "HR",
    color: "#f59e0b",
    rules: [
      { id: "HR-01", canal: "USB",       condition: "Fichier .xlsx > 50 lignes RH",   action: "Block",  severity: "Critical" },
      { id: "HR-02", canal: "Email",     condition: "PJ contient NIR / fiche paie",   action: "Block",  severity: "Critical" },
      { id: "HR-03", canal: "Print",     condition: "Impression hors RH tag L3",      action: "Alert",  severity: "High" },
      { id: "HR-04", canal: "Cloud",     condition: "Upload cloud perso détecté",     action: "Block",  severity: "Critical" },
    ],
  },
  {
    id: "fin",
    label: "Finance",
    color: "#3b82f6",
    rules: [
      { id: "FIN-01", canal: "Email",    condition: "Liasse fiscale vers externe",    action: "Block",  severity: "Critical" },
      { id: "FIN-02", canal: "Teams",    condition: "Partage canal non-Finance",      action: "Warn",   severity: "Medium" },
      { id: "FIN-03", canal: "USB",      condition: "> 100 écritures comptables",     action: "Block",  severity: "Critical" },
      { id: "FIN-04", canal: "SaaS",     condition: "Export Copilot données budget",  action: "Alert",  severity: "High" },
    ],
  },
];

const ACTION_COLORS = {
  Block:  { bg: "#ef444420", border: "#ef4444", text: "#fca5a5" },
  Alert:  { bg: "#f59e0b18", border: "#f59e0b", text: "#fcd34d" },
  Warn:   { bg: "#eab30816", border: "#eab308", text: "#fde68a" },
};

const SEV_DOT = { Critical: "#ef4444", High: "#f59e0b", Medium: "#eab308" };

/* ── Interactive Policy Diagram ── */
function PolicyDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [activeCat, setActiveCat] = useState("hr");

  const cat = CATEGORIES.find((c) => c.id === activeCat);

  return (
    <div ref={ref} className="rounded-2xl border border-navy-700/60 bg-[#060a14] p-3 sm:p-5 md:p-8 overflow-hidden">
      {/* Toggle tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
        {CATEGORIES.map((c) => (
          <motion.button key={c.id}
            onClick={() => setActiveCat(c.id)}
            className="relative rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold transition-colors"
            style={{
              color: activeCat === c.id ? "#fff" : "#94a3b8",
              borderWidth: 1,
              borderColor: activeCat === c.id ? c.color : "#334155",
              backgroundColor: activeCat === c.id ? `${c.color}18` : "transparent",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {c.label} Policies
          </motion.button>
        ))}
      </div>

      {/* Animated flow: Event → Detection → Action */}
      <svg viewBox="0 0 700 50" className="w-full mb-4">
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {/* Flow labels */}
          {["Event Captured", "Pattern Matched", "Action Enforced", "SOC Notified"].map((label, i) => {
            const x = 90 + i * 170;
            return (
              <g key={label}>
                <circle cx={x} cy={25} r={10} fill={`${cat.color}18`} stroke={cat.color} strokeWidth={1} />
                <text x={x} y={28} fill={cat.color} fontSize="8" fontWeight="700" textAnchor="middle"
                  fontFamily="Inter, system-ui">{i + 1}</text>
                <text x={x} y={46} fill="#64748b" fontSize="7" textAnchor="middle"
                  fontFamily="Inter, system-ui">{label}</text>
                {i < 3 && (
                  <>
                    <line x1={x + 14} y1={25} x2={x + 156} y2={25} stroke={`${cat.color}30`} strokeWidth={0.8}
                      strokeDasharray="4 3" />
                    <motion.circle r={2.5} cy={25} fill={cat.color}
                      animate={{ cx: [x + 20, x + 150], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6, delay: i * 0.3 }}
                      style={{ filter: `drop-shadow(0 0 4px ${cat.color})` }} />
                  </>
                )}
              </g>
            );
          })}
        </motion.g>
      </svg>

      {/* Rule cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCat}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {cat.rules.map((rule, i) => {
            const actionStyle = ACTION_COLORS[rule.action];
            return (
              <motion.div key={rule.id}
                className="group relative rounded-xl border bg-navy-900/30 p-4 cursor-default"
                style={{ borderColor: `${cat.color}20` }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                whileHover={{ borderColor: cat.color, scale: 1.01 }}
              >
                {/* Header row */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-navy-800 px-2 py-0.5 font-mono text-[10px] font-bold"
                      style={{ color: cat.color }}>{rule.id}</span>
                    <span className="rounded-full border px-2 py-0.5 text-[9px] font-semibold"
                      style={{ borderColor: actionStyle.border, backgroundColor: actionStyle.bg, color: actionStyle.text }}>
                      {rule.action}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: SEV_DOT[rule.severity] }} />
                    <span className="text-[9px] text-gray-500">{rule.severity}</span>
                  </div>
                </div>

                {/* Canal badge */}
                <div className="mb-1 text-[10px] text-gray-500">
                  Canal: <span className="ml-1 text-gray-400 font-medium">{rule.canal}</span>
                </div>

                {/* Condition */}
                <p className="text-[11px] leading-relaxed text-gray-300">{rule.condition}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap justify-center gap-4">
        {Object.entries(ACTION_COLORS).map(([name, s]) => (
          <span key={name} className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: s.border }} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DlpPolicies() {
  return (
    <section id="policies" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Policy Catalog"
            title="DLP Rules: HR & Finance"
            subtitle="8 targeted rules protecting sensitive HR and financial data across all channels."
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <PolicyDiagram />
        </ScrollReveal>
      </div>
    </section>
  );
}
