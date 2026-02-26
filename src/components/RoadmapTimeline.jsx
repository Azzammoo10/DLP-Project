import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Visual horizontal timeline for the evolution roadmap.
 */

const PHASES = [
  { label: "DLP Foundation", color: "#3b82f6", status: "done" },
  { label: "SOC Integration", color: "#06b6d4", status: "done" },
  { label: "IDS Integration", color: "#10b981", status: "done" },
  { label: "Governance", color: "#f59e0b", status: "done" },
  { label: "Zero Trust", color: "#a855f7", status: "active" },
  { label: "Purview Enterprise", color: "#f43f5e", status: "planned" },
];

export default function RoadmapTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const svgW = 800;
  const svgH = 140;
  const lineY = 60;
  const nodeR = 16;
  const startX = 60;
  const endX = svgW - 60;
  const spacing = (endX - startX) / (PHASES.length - 1);

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 600 }}>
        {/* Background line */}
        <line x1={startX} y1={lineY} x2={endX} y2={lineY} stroke="#151d38" strokeWidth="3" />

        {/* Animated progress line */}
        <motion.line
          x1={startX}
          y1={lineY}
          x2={startX + 4 * spacing + spacing * 0.4}
          y2={lineY}
          stroke="url(#roadmapGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ x2: startX }}
          animate={isInView ? { x2: startX + 4 * spacing + spacing * 0.4 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />

        <defs>
          <linearGradient id="roadmapGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Nodes */}
        {PHASES.map((p, i) => {
          const x = startX + i * spacing;
          const isDone = p.status === "done";
          const isActive = p.status === "active";
          return (
            <motion.g
              key={p.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
              style={{ transformOrigin: `${x}px ${lineY}px` }}
            >
              {/* Glow for active */}
              {isActive && (
                <motion.circle
                  cx={x}
                  cy={lineY}
                  r={nodeR + 8}
                  fill="none"
                  stroke={p.color}
                  strokeWidth="1"
                  animate={{ r: [nodeR + 6, nodeR + 14, nodeR + 6], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {/* Node circle */}
              <circle
                cx={x}
                cy={lineY}
                r={nodeR}
                fill={isDone || isActive ? p.color : "#0f1629"}
                fillOpacity={isDone ? 0.9 : isActive ? 0.7 : 1}
                stroke={p.color}
                strokeWidth="2"
              />
              {/* Check mark for done */}
              {isDone && (
                <text
                  x={x}
                  y={lineY + 5}
                  fill="white"
                  fontSize="14"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  ✓
                </text>
              )}
              {/* Phase number for non-done */}
              {!isDone && (
                <text
                  x={x}
                  y={lineY + 5}
                  fill={isActive ? "white" : "#6b7280"}
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {i + 1}
                </text>
              )}
              {/* Label */}
              <text
                x={x}
                y={lineY + 38}
                fill={isDone || isActive ? "white" : "#6b7280"}
                fontSize="9"
                fontWeight={isActive ? "700" : "500"}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {p.label}
              </text>
              {/* Phase number label */}
              <text
                x={x}
                y={lineY - 28}
                fill={p.color}
                fontSize="8"
                fontWeight="600"
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
              >
                PHASE {i + 1}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
