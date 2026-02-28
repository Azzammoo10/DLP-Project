import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Before vs After Zero Trust — interactive toggle between
 * the flat perimeter network and the segmented identity-first architecture.
 */

/* ── SVG icon paths ── */
const ICONS = {
  server: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2",
  pc: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  lock: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  key: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  warn: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
  x: "M6 18L18 6M6 6l12 12",
  check: "M5 13l4 4L19 7",
  user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  fire: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
};

function Icon({ d, color = "#fff", size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {d.split(" M").map((seg, i) => (
        <path key={i} d={i === 0 ? seg : "M" + seg} />
      ))}
    </svg>
  );
}

/* ── Node component ── */
function NetNode({ x, y, label, sublabel, icon, color, status, delay = 0, isInView, noCircle }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay }}
    >
      {/* Glow for active */}
      {status === "secure" && (
        <motion.circle
          cx={x} cy={y} r={22}
          fill="none" stroke={color} strokeWidth={0.8}
          animate={{ r: [20, 26], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Node background */}
      {!noCircle && <circle cx={x} cy={y} r={18} fill="#0a0e1a" stroke={color} strokeWidth={status === "breach" ? 2 : 1.4} />}
      
      {/* Icon */}
      <foreignObject x={x - 7} y={y - 11} width={14} height={14}>
        <Icon d={ICONS[icon]} color={color} size={14} />
      </foreignObject>

      {/* Label */}
      <text x={x} y={y + 8} fill="white" fontSize="6.5" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">{label}</text>
      {sublabel && (
        <text x={x} y={y + 16} fill={color} fontSize="5" textAnchor="middle" fontFamily="Inter, sans-serif" opacity={0.8}>{sublabel}</text>
      )}

      {/* Status badge */}
      {status === "breach" && (
        <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
          <circle cx={x + 14} cy={y - 14} r={5} fill="#ef4444" />
          <foreignObject x={x + 11} y={y - 17} width={6} height={6}>
            <Icon d={ICONS.warn} color="#fff" size={6} />
          </foreignObject>
        </motion.g>
      )}
      {status === "secure" && (
        <motion.g initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: delay + 0.3, type: "spring" }}>
          <circle cx={x + 14} cy={y - 14} r={5} fill="#10b981" />
          <foreignObject x={x + 11} y={y - 17} width={6} height={6}>
            <Icon d={ICONS.check} color="#fff" size={6} />
          </foreignObject>
        </motion.g>
      )}
    </motion.g>
  );
}

/* ── Connection line ── */
function Connection({ x1, y1, x2, y2, color, dashed, animated, delay = 0, isInView, attackPulse }) {
  return (
    <g>
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray={dashed ? "4 4" : "0"}
        strokeOpacity={0.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 0.5, delay }}
      />
      {animated && isInView && (
        <motion.circle
          r={2.5} fill={color}
          animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, delay: delay + 0.5, repeat: Infinity, repeatDelay: 2 }}
          style={{ filter: `drop-shadow(0 0 3px ${color})` }}
        />
      )}
      {attackPulse && isInView && (
        <motion.circle
          r={3} fill="#ef4444"
          animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.2, delay: delay + 0.3, repeat: Infinity, repeatDelay: 1.8 }}
          style={{ filter: "drop-shadow(0 0 4px #ef4444)" }}
        />
      )}
    </g>
  );
}

/* ── Before Zero Trust (flat VMware network) ── */
function BeforeArchitecture({ isInView }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* VMware host box */}
      <rect x={40} y={20} width={520} height={270} rx={12} fill="#1a0a0a" fillOpacity={0.3} stroke="#ef444440" strokeWidth={1} strokeDasharray="6 4" />
      <text x={300} y={38} fill="#ef4444" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif" opacity={0.6}>VMware Workstation — FLAT VMnet (NAT)</text>

      {/* vSwitch at center */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        <rect x={260} y={128} width={80} height={40} rx={6} fill="#0a0e1a" stroke="#64748b" strokeWidth={1.2} />
        <foreignObject x={273} y={133} width={14} height={14}>
          <Icon d={ICONS.server} color="#64748b" size={14} />
        </foreignObject>
        <text x={300} y={145} fill="#94a3b8" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">vSwitch</text>
        <text x={300} y={156} fill="#475569" fontSize="5" textAnchor="middle" fontFamily="monospace">VMnet8 (NAT)</text>
        <text x={300} y={165} fill="#475569" fontSize="4.5" textAnchor="middle" fontFamily="monospace">No segmentation</text>
      </motion.g>

      {/* VM Nodes — all on same VMnet, no isolation */}
      <NetNode x={120} y={90} label="Kali Linux" sublabel="Attacker VM" icon="pc" color="#ef4444" status="breach" delay={0.3} isInView={isInView} noCircle />
      <NetNode x={480} y={90} label="Win-Finance" sublabel="192.168.126.x" icon="pc" color="#ef4444" status="breach" delay={0.4} isInView={isInView} noCircle />
      <NetNode x={120} y={210} label="Ubuntu Server" sublabel="Wazuh + DLP" icon="server" color="#ef4444" status="breach" delay={0.45} isInView={isInView} noCircle />
      <NetNode x={480} y={210} label="File Share" sublabel="SMB open" icon="server" color="#ef4444" status="breach" delay={0.5} isInView={isInView} noCircle />

      {/* All VMs connect through vSwitch — flat */}
      <Connection x1={138} y1={95} x2={260} y2={143} color="#ef444470" dashed delay={0.4} isInView={isInView} attackPulse />
      <Connection x1={462} y1={95} x2={340} y2={143} color="#ef444470" dashed delay={0.45} isInView={isInView} attackPulse />
      <Connection x1={138} y1={205} x2={260} y2={153} color="#ef444470" dashed delay={0.5} isInView={isInView} attackPulse />
      <Connection x1={462} y1={205} x2={340} y2={153} color="#ef444470" dashed delay={0.55} isInView={isInView} attackPulse />

      {/* Cross connections — lateral movement */}
      <Connection x1={138} y1={98} x2={462} y2={98} color="#ef444430" dashed delay={0.6} isInView={isInView} attackPulse />
      <Connection x1={138} y1={205} x2={462} y2={205} color="#ef444430" dashed delay={0.65} isInView={isInView} />

      {/* Vulnerability annotations — pushed away from nodes */}
      {[
        { x: 120, y: 48, text: "No identity check" },
        { x: 480, y: 48, text: "Lateral movement" },
        { x: 120, y: 252, text: "All VMs same subnet" },
        { x: 480, y: 252, text: "No MFA / No Entra" },
      ].map((a, i) => (
        <motion.g key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 + i * 0.1 }}
        >
          <rect x={a.x - 45} y={a.y - 8} width={90} height={16} rx={4} fill="#ef444418" stroke="#ef444440" strokeWidth={0.8} />
          <text x={a.x} y={a.y + 3} fill="#ef4444" fontSize="5.5" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">{a.text}</text>
        </motion.g>
      ))}
    </motion.g>
  );
}

/* ── After Zero Trust (VMware + Entra ID) ── */
function AfterArchitecture({ isInView }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Azure / Entra ID cloud layer — top */}
      <motion.g initial={{ opacity: 0, y: -8 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
        <rect x={60} y={8} width={480} height={52} rx={10} fill="#3b82f60a" stroke="#3b82f640" strokeWidth={1} />
        <rect x={68} y={13} width={100} height={18} rx={4} fill="#3b82f618" stroke="#3b82f640" strokeWidth={0.6} />
        <foreignObject x={72} y={15} width={14} height={14}>
          <Icon d={ICONS.shield} color="#3b82f6" size={14} />
        </foreignObject>
        <text x={100} y={26} fill="#3b82f6" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif">Azure AD</text>
        <text x={180} y={22} fill="#60a5fa" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">Microsoft Entra ID</text>
        <text x={180} y={33} fill="#64748b" fontSize="5.5" fontFamily="Inter, sans-serif">Azure Student Subscription — Identity Authority</text>
        <foreignObject x={380} y={14} width={14} height={14}>
          <Icon d={ICONS.key} color="#a855f7" size={14} />
        </foreignObject>
        <text x={400} y={25} fill="#a855f7" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">MFA</text>
        <foreignObject x={430} y={14} width={14} height={14}>
          <Icon d={ICONS.eye} color="#06b6d4" size={14} />
        </foreignObject>
        <text x={450} y={25} fill="#06b6d4" fontSize="5.5" fontWeight="600" fontFamily="Inter, sans-serif">Cond. Access</text>
        <text x={440} y={50} fill="#475569" fontSize="4.5" textAnchor="middle" fontFamily="monospace">Verify Explicitly · Least Privilege · Assume Breach</text>
      </motion.g>

      {/* Blocked attacker — Kali rejected at the identity gate */}
      <motion.g
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.35 }}
      >
        <NetNode x={40} y={84} label="Kali Linux" sublabel="Attacker" icon="pc" color="#ef4444" status="breach" delay={0.35} isInView={isInView} noCircle />
        <line x1={58} y1={84} x2={125} y2={84} stroke="#ef4444" strokeWidth={1.2} strokeDasharray="4 3" opacity={0.5} />
        <foreignObject x={88} y={76} width={14} height={14}>
          <Icon d={ICONS.x} color="#ef4444" size={14} />
        </foreignObject>
        <rect x={14} y={106} width={52} height={13} rx={3} fill="#ef444420" stroke="#ef444440" strokeWidth={0.6} />
        <text x={40} y={115} fill="#ef4444" fontSize="4.5" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">ACCESS DENIED</text>
      </motion.g>

      {/* Verification gates */}
      {[
        { x: 160, y: 72, label: "Identity\nCheck" },
        { x: 310, y: 72, label: "Device\nCompliance" },
        { x: 460, y: 72, label: "Risk\nScoring" },
      ].map((g, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25 + i * 0.1 }}
        >
          <rect x={g.x - 30} y={g.y} width={60} height={24} rx={5} fill="#10b98115" stroke="#10b98140" strokeWidth={1} />
          <foreignObject x={g.x - 6} y={g.y + 2} width={12} height={12}>
            <Icon d={ICONS.lock} color="#10b981" size={12} />
          </foreignObject>
          {g.label.split("\n").map((l, li) => (
            <text key={li} x={g.x} y={g.y + 17 + li * 7} fill="#10b981" fontSize="4.5" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">{l}</text>
          ))}
          <line x1={g.x} y1={g.y + 24} x2={g.x} y2={g.y + 34} stroke="#10b98150" strokeWidth={1} />
        </motion.g>
      ))}

      {/* VMware host box */}
      <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
        <rect x={80} y={110} width={460} height={130} rx={10} fill="#0d111b" stroke="#1e293b" strokeWidth={0.8} />
        <text x={310} y={122} fill="#475569" fontSize="5.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">VMware Workstation — Segmented VMnets</text>
      </motion.g>

      {/* Micro-segments (isolated VMnets) */}
      {[
        { x: 90, y: 128, w: 140, h: 105, label: "VMnet1 — Security", color: "#06b6d4" },
        { x: 240, y: 128, w: 140, h: 105, label: "VMnet2 — Finance", color: "#3b82f6" },
        { x: 390, y: 128, w: 140, h: 105, label: "VMnet3 — Monitoring", color: "#a855f7" },
      ].map((seg, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.38 + i * 0.1 }}
        >
          <rect x={seg.x} y={seg.y} width={seg.w} height={seg.h} rx={8}
            fill={seg.color + "08"} stroke={seg.color + "30"} strokeWidth={1} />
          <text x={seg.x + seg.w / 2} y={seg.y + 13} fill={seg.color} fontSize="5.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">{seg.label}</text>
        </motion.g>
      ))}

      {/* Nodes inside segments */}
      <NetNode x={160} y={192} label="Ubuntu Server" sublabel="Wazuh + DLP" icon="server" color="#06b6d4" status="secure" delay={0.48} isInView={isInView} noCircle />
      <NetNode x={310} y={192} label="Win-Finance" sublabel="Entra joined" icon="pc" color="#3b82f6" status="secure" delay={0.55} isInView={isInView} noCircle />
      <NetNode x={460} y={192} label="Snort IDS" sublabel="Monitoring" icon="shield" color="#a855f7" status="secure" delay={0.6} isInView={isInView} noCircle />

      {/* Identity-controlled connections from gates down to VMs */}
      <Connection x1={160} y1={106} x2={160} y2={174} color="#10b981" animated delay={0.5} isInView={isInView} />
      <Connection x1={310} y1={106} x2={310} y2={174} color="#10b981" animated delay={0.55} isInView={isInView} />
      <Connection x1={460} y1={106} x2={460} y2={174} color="#10b981" animated delay={0.6} isInView={isInView} />

      {/* Inter-segment — blocked by default */}
      <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
        <line x1={230} y1={188} x2={240} y2={188} stroke="#ef444450" strokeWidth={1.2} strokeDasharray="3 3" />
        <foreignObject x={231} y={180} width={10} height={10}>
          <Icon d={ICONS.x} color="#ef4444" size={10} />
        </foreignObject>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.75 }}>
        <line x1={380} y1={188} x2={390} y2={188} stroke="#ef444450" strokeWidth={1.2} strokeDasharray="3 3" />
        <foreignObject x={381} y={180} width={10} height={10}>
          <Icon d={ICONS.x} color="#ef4444" size={10} />
        </foreignObject>
      </motion.g>

      {/* Continuous monitoring layer — bottom */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }}>
        <rect x={80} y={250} width={460} height={36} rx={8} fill="#10b98108" stroke="#10b98130" strokeWidth={1} />
        <foreignObject x={100} y={258} width={16} height={16}>
          <Icon d={ICONS.eye} color="#10b981" size={16} />
        </foreignObject>
        <text x={125} y={268} fill="#10b981" fontSize="7" fontWeight="600" fontFamily="Inter, sans-serif">Continuous Evaluation</text>
        <text x={125} y={278} fill="#64748b" fontSize="5" fontFamily="Inter, sans-serif">Wazuh SIEM + Entra sign-in risk + adaptive access revocation</text>

        {/* Monitoring connections */}
        {[160, 310, 460].map((nx, i) => (
          <Connection key={i} x1={nx} y1={210} x2={nx} y2={250} color="#10b98140" dashed delay={0.85 + i * 0.05} isInView={isInView} />
        ))}
      </motion.g>

      {/* Security annotations */}
      {[
        { x: 160, y: 150, text: "Least privilege" },
        { x: 310, y: 150, text: "Entra MFA" },
        { x: 460, y: 150, text: "VM isolated" },
      ].map((a, i) => (
        <motion.g key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 + i * 0.08 }}
        >
          <rect x={a.x - 28} y={a.y - 7} width={56} height={13} rx={4} fill="#10b98112" stroke="#10b98130" strokeWidth={0.6} />
          <text x={a.x} y={a.y + 2} fill="#10b981" fontSize="5" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">{a.text}</text>
        </motion.g>
      ))}

      {/* Rotating verification pulse */}
      {isInView && [0, 1, 2].map((i) => (
        <motion.circle
          key={i} cx={310} cy={192} fill="none" stroke="#10b981" strokeWidth={0.6}
          initial={{ r: 30, opacity: 0.3 }}
          animate={{ r: 180, opacity: 0 }}
          transition={{ duration: 4, delay: 1.5 + i * 1.3, repeat: Infinity }}
        />
      ))}
    </motion.g>
  );
}

/* ── Comparison stats ── */
const COMPARISON = [
  { metric: "Authentication", before: "None (implicit)", after: "Entra ID + MFA (Azure Student)", color: "#3b82f6" },
  { metric: "Network Model", before: "Flat VMnet (NAT)", after: "Segmented VMnets", color: "#06b6d4" },
  { metric: "Lateral Movement", before: "Unrestricted across VMs", after: "Blocked between VMnets", color: "#ef4444" },
  { metric: "Access Policy", before: "IP-based", after: "Entra Conditional Access + Risk", color: "#10b981" },
  { metric: "Identity Provider", before: "None", after: "Microsoft Entra ID", color: "#a855f7" },
];

/* ── Main Component ── */
export default function ZeroTrustDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [view, setView] = useState("before");

  return (
    <div ref={ref} className="space-y-5">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-1">
        <button
          onClick={() => setView("before")}
          className={`rounded-l-lg border px-3 sm:px-5 py-2 font-mono text-[10px] sm:text-xs font-semibold transition-all ${
            view === "before"
              ? "border-red-500/40 bg-red-500/10 text-red-400"
              : "border-navy-700 bg-navy-900/40 text-gray-500 hover:text-gray-300"
          }`}
        >
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: view === "before" ? "#ef4444" : "#334155" }} />
          Before Zero Trust
        </button>
        <button
          onClick={() => setView("after")}
          className={`rounded-r-lg border px-3 sm:px-5 py-2 font-mono text-[10px] sm:text-xs font-semibold transition-all ${
            view === "after"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : "border-navy-700 bg-navy-900/40 text-gray-500 hover:text-gray-300"
          }`}
        >
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: view === "after" ? "#10b981" : "#334155" }} />
          After Zero Trust
        </button>
      </div>

      {/* Architecture SVG */}
      <div className="rounded-lg border border-navy-700/50 bg-[#060a14] p-2">
        <svg viewBox="0 0 600 300" className="w-full">
          <AnimatePresence mode="wait">
            {view === "before" ? (
              <BeforeArchitecture key="before" isInView={isInView} />
            ) : (
              <AfterArchitecture key="after" isInView={isInView} />
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-lg border border-navy-700">
        <div className="grid grid-cols-3 border-b border-navy-700/60 bg-navy-900/60 px-2 sm:px-4 py-2">
          <span className="text-[10px] font-semibold tracking-wide text-gray-500 uppercase">Metric</span>
          <span className="text-center text-[10px] font-semibold tracking-wide text-red-400/70 uppercase">Before</span>
          <span className="text-center text-[10px] font-semibold tracking-wide text-emerald-400/70 uppercase">After</span>
        </div>
        {COMPARISON.map((c, i) => (
          <motion.div
            key={c.metric}
            className="grid grid-cols-3 border-b border-navy-700/30 px-2 sm:px-4 py-2.5 last:border-0"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <span className="text-[10px] sm:text-xs font-medium text-white">{c.metric}</span>
            <span className="text-center text-[10px] sm:text-xs text-red-400/80">{c.before}</span>
            <span className="text-center text-[10px] sm:text-xs font-medium text-emerald-400">{c.after}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
