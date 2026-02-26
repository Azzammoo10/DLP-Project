import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated risk formula visualization with pulsing additive bars.
 */

const FACTORS = [
  { label: "Content", weight: 25, color: "#3b82f6", desc: "Data sensitivity" },
  { label: "Context", weight: 20, color: "#06b6d4", desc: "Operational context" },
  { label: "Behavior", weight: 25, color: "#f59e0b", desc: "User activity" },
  { label: "Network", weight: 15, color: "#10b981", desc: "Traffic anomalies" },
  { label: "Identity", weight: 15, color: "#a855f7", desc: "Trust level" },
];

export default function RiskFormulaDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const totalWeight = FACTORS.reduce((s, f) => s + f.weight, 0);
  const barW = 500;
  const svgW = 600;
  const svgH = 200;
  let cumX = (svgW - barW) / 2;

  return (
    <div ref={ref} className="mx-auto w-full max-w-2xl">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
        {/* Formula text */}
        <motion.text
          x={svgW / 2}
          y={24}
          fill="#9ca3af"
          fontSize="11"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Risk = Content + Context + Behavior + Network + Identity
        </motion.text>

        {/* Stacked bar */}
        {FACTORS.map((f, i) => {
          const w = (f.weight / totalWeight) * barW;
          const x = cumX;
          cumX += w;
          return (
            <motion.g
              key={f.label}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              style={{ transformOrigin: `${x}px 80px` }}
            >
              <rect
                x={x}
                y={55}
                width={w}
                height={50}
                fill={f.color}
                fillOpacity="0.25"
                stroke={f.color}
                strokeWidth="1"
                rx={i === 0 ? "8" : i === FACTORS.length - 1 ? "8" : "0"}
              />
              {/* Label */}
              <text
                x={x + w / 2}
                y={76}
                fill="white"
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {f.label}
              </text>
              <text
                x={x + w / 2}
                y={92}
                fill={f.color}
                fontSize="12"
                fontWeight="700"
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
              >
                {f.weight}%
              </text>

              {/* Bottom label */}
              <text
                x={x + w / 2}
                y={128}
                fill="#6b7280"
                fontSize="8"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {f.desc}
              </text>
            </motion.g>
          );
        })}

        {/* Arrow to result */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <line
            x1={svgW / 2}
            y1={140}
            x2={svgW / 2}
            y2={158}
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="3 2"
          />
          <polygon
            points={`${svgW / 2 - 5},${158} ${svgW / 2},${166} ${svgW / 2 + 5},${158}`}
            fill="#f59e0b"
          />
          <rect
            x={svgW / 2 - 60}
            y={168}
            width={120}
            height={28}
            rx="8"
            fill="#f59e0b"
            fillOpacity="0.15"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          <text
            x={svgW / 2}
            y={186}
            fill="#fbbf24"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
          >
            RISK SCORE
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
