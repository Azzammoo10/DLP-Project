import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Interactive layered architecture diagram with animated connections.
 * Pure SVG — shows how the 6 layers communicate.
 */

const LAYERS = [
  { id: "identity", label: "Identity Layer", sub: "Zero Trust / Entra ID", color: "#f43f5e", y: 0 },
  { id: "governance", label: "Governance Layer", sub: "Escalation & Compliance", color: "#a855f7", y: 1 },
  { id: "correlation", label: "Correlation Layer", sub: "Wazuh SOC / SIEM", color: "#f59e0b", y: 2 },
  { id: "network", label: "Network Layer", sub: "Snort IDS", color: "#10b981", y: 3 },
  { id: "endpoint", label: "Endpoint Layer", sub: "Agent Monitoring", color: "#06b6d4", y: 4 },
  { id: "data", label: "Data Layer", sub: "Symantec DLP", color: "#3b82f6", y: 5 },
];

export default function ArchitectureDiagramSVG() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const boxW = 260;
  const boxH = 56;
  const gap = 14;
  const svgW = 700;
  const startX = (svgW - boxW) / 2;
  const topPad = 30;

  return (
    <div ref={ref} className="mx-auto w-full max-w-3xl overflow-x-auto">
      <svg
        viewBox={`0 0 ${svgW} ${LAYERS.length * (boxH + gap) + topPad + 60}`}
        className="w-full"
        style={{ minWidth: 400 }}
      >
        {/* Animated data flow lines on the sides */}
        {LAYERS.map((layer, i) => {
          if (i === 0) return null;
          const y1 = topPad + (i - 1) * (boxH + gap) + boxH;
          const y2 = topPad + i * (boxH + gap);
          return (
            <g key={`conn-${i}`}>
              {/* Left connector */}
              <motion.line
                x1={startX + 40}
                y1={y1}
                x2={startX + 40}
                y2={y2}
                stroke={LAYERS[i - 1].color}
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              />
              {/* Right connector */}
              <motion.line
                x1={startX + boxW - 40}
                y1={y1}
                x2={startX + boxW - 40}
                y2={y2}
                stroke={LAYERS[i].color}
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              />
              {/* Animated pulse dot going down */}
              {isInView && (
                <motion.circle
                  r="3"
                  fill={LAYERS[i].color}
                  initial={{ cx: startX + boxW / 2, cy: y1, opacity: 0 }}
                  animate={{
                    cy: [y1, y2],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 1 + i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Layer boxes */}
        {LAYERS.map((layer, i) => {
          const y = topPad + i * (boxH + gap);
          return (
            <motion.g
              key={layer.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* Glow */}
              <rect
                x={startX - 2}
                y={y - 2}
                width={boxW + 4}
                height={boxH + 4}
                rx="14"
                fill="none"
                stroke={layer.color}
                strokeWidth="1"
                opacity="0.15"
              />
              {/* Box */}
              <rect
                x={startX}
                y={y}
                width={boxW}
                height={boxH}
                rx="12"
                fill="#0f1629"
                stroke={layer.color}
                strokeWidth="1.5"
                opacity="0.9"
              />
              {/* Color accent bar */}
              <rect
                x={startX}
                y={y}
                width={6}
                height={boxH}
                rx="3"
                fill={layer.color}
              />
              {/* Label */}
              <text
                x={startX + 24}
                y={y + 24}
                fill="white"
                fontSize="13"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
              >
                {layer.label}
              </text>
              <text
                x={startX + 24}
                y={y + 42}
                fill="#9ca3af"
                fontSize="10"
                fontFamily="Inter, sans-serif"
              >
                {layer.sub}
              </text>

              {/* Side labels: LOG arrows */}
              {i < LAYERS.length - 1 && (
                <>
                  <text
                    x={startX - 50}
                    y={y + boxH + gap / 2 + 4}
                    fill={layer.color}
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    textAnchor="middle"
                    opacity="0.6"
                  >
                    LOGS ↓
                  </text>
                  <text
                    x={startX + boxW + 50}
                    y={y + boxH + gap / 2 + 4}
                    fill={LAYERS[i + 1].color}
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    textAnchor="middle"
                    opacity="0.6"
                  >
                    ↑ ALERTS
                  </text>
                </>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
