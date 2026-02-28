import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated governance workflow diagram — 
 * visual pipeline from detection through investigation.
 */

/* SVG icon paths rendered inside each node */
const ICON_PATHS = {
  detect: "M13 10V3L4 14h7v7l9-11h-7z", // bolt
  threshold: "M3 3v18h18M9 17V9m4 8V5m4 12v-4", // bar chart
  escalate: "M5 15l7-7 7 7", // chevron up
  notify: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0", // bell
  investigate: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", // search
  resolve: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // check circle
};

const STEPS = [
  {
    id: "detect",
    label: "Detection",
    sub: "Multi-source correlation triggers",
    color: "#3b82f6",
  },
  {
    id: "threshold",
    label: "Alert Filter",
    sub: "Noise reduction",
    color: "#06b6d4",
  },
  {
    id: "escalate",
    label: "D+1 Escalation",
    sub: "Business-day routing",
    color: "#f59e0b",
  },
  {
    id: "notify",
    label: "Manager Alert",
    sub: "Automated notification",
    color: "#a855f7",
  },
  {
    id: "investigate",
    label: "Investigation",
    sub: "Formal lifecycle",
    color: "#10b981",
  },
  {
    id: "resolve",
    label: "Resolution",
    sub: "Closure & audit trail",
    color: "#f43f5e",
  },
];

export default function GovernanceDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const nodeW = 100;
  const nodeH = 72;
  const gap = 20;
  const svgW = STEPS.length * (nodeW + gap) + 40;
  const svgH = 160;
  const startX = 30;
  const cy = svgH / 2;

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 600 }}>
        {/* Connector lines */}
        {STEPS.map((step, i) => {
          if (i === 0) return null;
          const x1 = startX + (i - 1) * (nodeW + gap) + nodeW;
          const x2 = startX + i * (nodeW + gap);
          return (
            <motion.g key={`conn-${i}`}>
              <motion.line
                x1={x1}
                y1={cy}
                x2={x2}
                y2={cy}
                stroke={STEPS[i - 1].color}
                strokeWidth="2"
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
              />
              {/* Arrow head */}
              <motion.polygon
                points={`${x2 - 6},${cy - 4} ${x2},${cy} ${x2 - 6},${cy + 4}`}
                fill={STEPS[i].color}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.6 } : {}}
                transition={{ delay: 0.5 + i * 0.15 }}
              />
              {/* Animated pulse */}
              {isInView && (
                <motion.circle
                  r="3"
                  fill={STEPS[i].color}
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [x1, x2],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 1.5 + i * 0.5,
                    repeat: Infinity,
                    repeatDelay: STEPS.length * 0.5,
                  }}
                  cy={cy}
                />
              )}
            </motion.g>
          );
        })}

        {/* Step nodes */}
        {STEPS.map((step, i) => {
          const x = startX + i * (nodeW + gap);
          return (
            <motion.g
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <rect
                x={x}
                y={cy - nodeH / 2}
                width={nodeW}
                height={nodeH}
                rx="12"
                fill="#0f1629"
                stroke={step.color}
                strokeWidth="1.5"
              />
              <g transform={`translate(${x + nodeW / 2 - 9}, ${cy - 26})`}>
                <path
                  d={ICON_PATHS[step.id]}
                  fill="none"
                  stroke={step.color}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="scale(0.75)"
                />
              </g>
              <text
                x={x + nodeW / 2}
                y={cy + 8}
                fill="white"
                fontSize="9"
                fontWeight="600"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {step.label}
              </text>
              <text
                x={x + nodeW / 2}
                y={cy + 22}
                fill="#6b7280"
                fontSize="7"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {step.sub}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
