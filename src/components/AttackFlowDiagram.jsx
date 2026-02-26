import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Realistic pentest scenario diagram.
 * Shows offensive actions, target impact, and defensive response in one animated flow.
 */

const ATTACK_CHAIN = [
  { id: "recon", label: "Recon", sub: "Nmap / Service Discovery", color: "#ef4444", y: 92 },
  { id: "exploit", label: "Exploit", sub: "Credential Abuse / RCE", color: "#ef4444", y: 152 },
  { id: "exfil", label: "Exfil", sub: "Data Transfer Attempt", color: "#ef4444", y: 212 },
];

const DETECTORS = [
  { label: "Snort IDS", sub: "Network Alert", color: "#10b981", y: 92 },
  { label: "Wazuh SOC", sub: "Correlation", color: "#f59e0b", y: 152 },
  { label: "DLP Engine", sub: "Policy Block", color: "#3b82f6", y: 212 },
  { label: "Containment", sub: "Incident Triggered", color: "#22c55e", y: 272 },
];

export default function AttackFlowDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const svgW = 900;
  const svgH = 330;

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 820 }}>
        <defs>
          <marker id="af-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
          <linearGradient id="afAgentBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="afScreenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="kaliScreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1530" />
            <stop offset="100%" stopColor="#0f1020" />
          </linearGradient>
          <linearGradient id="kaliBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2b3146" />
            <stop offset="100%" stopColor="#1a2032" />
          </linearGradient>
          <linearGradient id="srvFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#17243a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="srvTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2b3a53" />
            <stop offset="100%" stopColor="#1c2a41" />
          </linearGradient>
        </defs>

        <rect x="2" y="2" width={svgW - 4} height={svgH - 4} rx="14" fill="#0b1220" stroke="#1e293b" strokeWidth="1" />

        {/* Visual legend */}
        <motion.g
          initial={{ opacity: 0, y: -6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <rect x="24" y="10" width="852" height="22" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <circle cx="44" cy="21" r="4" fill="#ef4444" className="anim-pulse-fast" />
          <text x="54" y="24" fill="#ef4444" fontSize="8" fontFamily="JetBrains Mono, monospace">Attack action</text>

          <circle cx="188" cy="21" r="4" fill="#3b82f6" className="anim-pulse-fast" />
          <text x="198" y="24" fill="#3b82f6" fontSize="8" fontFamily="JetBrains Mono, monospace">Target impact</text>

          <circle cx="326" cy="21" r="4" fill="#22c55e" className="anim-pulse-fast" />
          <text x="336" y="24" fill="#22c55e" fontSize="8" fontFamily="JetBrains Mono, monospace">Defensive response</text>

          <line x1="488" y1="21" x2="526" y2="21" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#af-arrow)" />
          <text x="532" y="24" fill="#94a3b8" fontSize="8" fontFamily="JetBrains Mono, monospace">Event flow</text>

          <circle cx="652" cy="21" r="3.3" fill="#f59e0b" className="anim-pulse" />
          <text x="662" y="24" fill="#f59e0b" fontSize="8" fontFamily="JetBrains Mono, monospace">Live pulse</text>
        </motion.g>

        <rect x="20" y="56" width="150" height="236" rx="10" fill="#1a1020" fillOpacity="0.45" stroke="#3f1d2e" strokeWidth="1" />
        <rect x="190" y="56" width="210" height="236" rx="10" fill="#151b2f" fillOpacity="0.45" stroke="#2d3d63" strokeWidth="1" />
        <rect x="420" y="56" width="170" height="236" rx="10" fill="#0f1b31" fillOpacity="0.45" stroke="#1f3551" strokeWidth="1" />
        <rect x="610" y="56" width="270" height="236" rx="10" fill="#0f241f" fillOpacity="0.45" stroke="#214b3f" strokeWidth="1" />

        {/* Attacker node */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <ellipse cx="100" cy="220" rx="52" ry="6" fill="#000" opacity="0.25" />

          <rect x="50" y="138" width="100" height="64" rx="6" fill="url(#afAgentBody)" stroke="#ef4444" strokeWidth="1.4" />
          <rect x="56" y="144" width="88" height="48" rx="3" fill="url(#afScreenGrad)" />
          <circle cx="100" cy="141" r="1.2" fill="#334155" />

          <circle cx="72" cy="160" r="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
          <text x="72" y="164" fill="#ef4444" fontSize="7" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">K</text>
          <text x="102" y="161" fill="#ef4444" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">KALI LINUX</text>
          <text x="102" y="173" fill="#93c5fd" fontSize="6.7" textAnchor="middle" fontFamily="JetBrains Mono, monospace">pentest workstation</text>

          <path d="M46,202 L58,192 L142,192 L154,202 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="46" y="202" width="108" height="8" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          <rect x="84" y="204" width="32" height="4" rx="1" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />

          <circle cx="60" cy="196" r="1.8" fill="#22c55e" className="anim-pulse" />
          <circle cx="73" cy="196" r="1.8" fill="#3b82f6" className="anim-pulse-fast" />

          <text x={100} y={234} fill="white" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">Kali Pentest Node</text>
          <text x={100} y={247} fill="#9ca3af" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">Authorized Scenario</text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.45 }}
        >
          <rect x={444} y={132} width={138} height={102} rx="10" fill="url(#srvFront)" stroke="#06b6d4" strokeWidth="1.8" />

          <rect x={450} y={142} width={82} height={18} rx="4" fill="#0b1220" stroke="#334155" strokeWidth="0.8" />
          <rect x={450} y={165} width={82} height={18} rx="4" fill="#0b1220" stroke="#334155" strokeWidth="0.8" />
          <rect x={450} y={188} width={82} height={18} rx="4" fill="#0b1220" stroke="#334155" strokeWidth="0.8" />

          <rect x={538} y={142} width={38} height={64} rx="5" fill="#0b1220" stroke="#34d399" strokeWidth="1" opacity="0.95" />
          <rect x={544} y={150} width={26} height={8} rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="0.5" />
          <rect x={544} y={163} width={26} height={8} rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="0.5" />
          <rect x={544} y={176} width={26} height={8} rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="0.5" />
          <motion.circle
            cx={557}
            cy={194}
            r="2.2"
            fill="#22c55e"
            animate={isInView ? { opacity: [0.3, 1, 0.3] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }}
          />

          <text x="491" y="154" fill="#e2e8f0" fontSize="7" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">UBUNTU SERVER</text>
          <text x="491" y="177" fill="#94a3b8" fontSize="6.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">SECURITY STACK</text>

          <text x={514} y={248} fill="white" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">Ubuntu Security Server</text>
          <text x={514} y={261} fill="#9ca3af" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">Wazuh + DLP + Snort IDS</text>
        </motion.g>

        {/* Attack chain */}
        {ATTACK_CHAIN.map((atk, i) => {
          return (
            <motion.g
              key={atk.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <motion.line
                x1={154}
                y1={175}
                x2={190}
                y2={atk.y + 16}
                stroke={atk.color}
                strokeWidth="1.6"
                strokeDasharray="5 3"
                markerEnd="url(#af-arrow)"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              />
              <rect x={206} y={atk.y} width={176} height={34} rx="8" fill="#0f1629" stroke={atk.color} strokeWidth="1.4" />
              <text x={294} y={atk.y + 14} fill={atk.color} fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">
                {atk.label}
              </text>
              <text x={294} y={atk.y + 26} fill="#9ca3af" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">
                {atk.sub}
              </text>

              <motion.line
                x1={382}
                y1={atk.y + 16}
                x2={440}
                y2={atk.y + 16}
                stroke={atk.color}
                strokeWidth="1.4"
                strokeDasharray="4 3"
                markerEnd="url(#af-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
                transition={{ duration: 0.45, delay: 0.75 + i * 0.12 }}
              />

              {/* Attack pulse */}
              {isInView && (
                <motion.circle
                  r="3"
                  fill={atk.color}
                  cy={168}
                  animate={{
                    cx: [154, 206, 440],
                    cy: [175, atk.y + 16, atk.y + 16],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 1 + i * 0.35,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Target to defense forwarding */}
        {DETECTORS.map((det, i) => {
          if (i === DETECTORS.length - 1) return null;
          return (
            <motion.line
              key={`target-defense-${det.label}`}
              x1={582}
              y1={det.y + 16}
              x2={610}
              y2={det.y + 16}
              stroke={det.color}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd="url(#af-arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.65 } : {}}
              transition={{ duration: 0.5, delay: 0.95 + i * 0.15 }}
            />
          );
        })}

        {/* Detection engines */}
        {DETECTORS.map((det, i) => {
          return (
            <motion.g
              key={det.label}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <rect x={628} y={det.y} width="220" height="34" rx="8" fill="#0f1629" stroke={det.color} strokeWidth="1.5" />
              <text x={736} y={det.y + 14} fill={det.color} fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">
                {det.label}
              </text>
              <text x={736} y={det.y + 26} fill="#9ca3af" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">
                {det.sub}
              </text>

              {/* Detection checkmark */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.35 + i * 0.18, type: "spring" }}
              >
                <circle cx={856} cy={det.y + 17} r="8" fill="#10b981" fillOpacity="0.2" />
                <text x={856} y={det.y + 21} fill="#10b981" fontSize="10" textAnchor="middle">✓</text>
              </motion.g>
            </motion.g>
          );
        })}

        <motion.line
          x1={736}
          y1={168}
          x2={736}
          y2={288}
          stroke="#22c55e"
          strokeWidth="1.4"
          strokeDasharray="4 4"
          markerEnd="url(#af-arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.65 } : {}}
          transition={{ duration: 0.65, delay: 1.45 }}
        />

        {/* SOC pulse from Wazuh to containment */}
        {isInView && (
          <motion.circle
            r="3.5"
            fill="#22c55e"
            animate={{
              cx: [736, 736],
              cy: [158, 276],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 1.4, delay: 1.8, repeat: Infinity, repeatDelay: 1.8 }}
          />
        )}

        {/* Labels */}
        <text x={svgW / 2} y={svgH - 10} fill="#4b5563" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
          Live pentest scenario: Recon → Exploit → Exfil attempt → Detection, Correlation, Containment
        </text>
      </svg>
    </div>
  );
}
