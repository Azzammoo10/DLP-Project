import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Attack simulation diagram for offensive validation section.
 * Shows attacker → target → detection chain.
 */

const ATTACKS = [
  { label: "Nmap Scan", color: "#ef4444" },
  { label: "Reverse Shell", color: "#f59e0b" },
  { label: "SCP Exfil", color: "#a855f7" },
];

const DETECTORS = [
  { label: "Snort IDS", color: "#10b981" },
  { label: "Wazuh SOC", color: "#f59e0b" },
  { label: "DLP Engine", color: "#3b82f6" },
];

export default function AttackFlowDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const svgW = 700;
  const svgH = 260;

  return (
    <div ref={ref} className="mx-auto w-full max-w-3xl overflow-x-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 500 }}>
        {/* Attacker */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <rect x={20} y={90} width={90} height={60} rx="12" fill="#0f1629" stroke="#ef4444" strokeWidth="1.5" />
          <text x={65} y={115} fill="#ef4444" fontSize="18" textAnchor="middle">🎯</text>
          <text x={65} y={135} fill="white" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">Attacker</text>
        </motion.g>

        {/* Attack vectors */}
        {ATTACKS.map((atk, i) => {
          const y = 50 + i * 70;
          return (
            <motion.g
              key={atk.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <motion.line
                x1={110}
                y1={120}
                x2={220}
                y2={y + 20}
                stroke={atk.color}
                strokeWidth="1.5"
                strokeDasharray="5 3"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              />
              <rect x={220} y={y} width={100} height={40} rx="8" fill="#0f1629" stroke={atk.color} strokeWidth="1.5" />
              <text x={270} y={y + 24} fill={atk.color} fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">
                {atk.label}
              </text>

              {/* Attack pulse */}
              {isInView && (
                <motion.circle
                  r="3"
                  fill={atk.color}
                  cy={120}
                  animate={{
                    cx: [110, 220],
                    cy: [120, y + 20],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 1 + i * 0.6,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Target system */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <rect x={370} y={80} width={90} height={80} rx="12" fill="#0f1629" stroke="#06b6d4" strokeWidth="2" />
          <text x={415} y={110} fill="#06b6d4" fontSize="20" textAnchor="middle">🖥️</text>
          <text x={415} y={132} fill="white" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">Target</text>
          <text x={415} y={148} fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">Enterprise</text>
        </motion.g>

        {/* Attack to target connections */}
        {ATTACKS.map((atk, i) => {
          const y = 50 + i * 70;
          return (
            <motion.line
              key={`atk-target-${i}`}
              x1={320}
              y1={y + 20}
              x2={370}
              y2={120}
              stroke={atk.color}
              strokeWidth="1"
              strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
            />
          );
        })}

        {/* Detection engines */}
        {DETECTORS.map((det, i) => {
          const y = 50 + i * 70;
          return (
            <motion.g
              key={det.label}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <motion.line
                x1={460}
                y1={120}
                x2={530}
                y2={y + 20}
                stroke={det.color}
                strokeWidth="1.5"
                strokeDasharray="5 3"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
              />
              <rect x={530} y={y} width={100} height={40} rx="8" fill="#0f1629" stroke={det.color} strokeWidth="1.5" />
              <text x={580} y={y + 24} fill={det.color} fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">
                {det.label}
              </text>

              {/* Detection checkmark */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.5 + i * 0.2, type: "spring" }}
              >
                <circle cx={638} cy={y + 8} r="8" fill="#10b981" fillOpacity="0.2" />
                <text x={638} y={y + 12} fill="#10b981" fontSize="10" textAnchor="middle">✓</text>
              </motion.g>
            </motion.g>
          );
        })}

        {/* Labels */}
        <text x={65} y={30} fill="#ef4444" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="JetBrains Mono, monospace" opacity="0.6">OFFENSIVE</text>
        <text x={svgW - 80} y={30} fill="#10b981" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="JetBrains Mono, monospace" opacity="0.6">DEFENSIVE</text>
        <text x={svgW / 2} y={svgH - 8} fill="#4b5563" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Controlled adversarial simulation → detection validation</text>
      </svg>
    </div>
  );
}
