import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated radial gauge / donut chart for KPI visualization.
 */
export default function RadialGauge({
  value,
  max = 100,
  label,
  sublabel,
  color = "#3b82f6",
  size = 160,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const r = (size - 20) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = value / max;
  const offset = circumference * (1 - pct);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#151d38"
          strokeWidth="10"
        />
        {/* Animated fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Center text */}
        <text
          x={size / 2}
          y={size / 2 - 4}
          fill="white"
          fontSize="22"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
        >
          {label}
        </text>
        <text
          x={size / 2}
          y={size / 2 + 14}
          fill="#9ca3af"
          fontSize="9"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
        >
          {sublabel}
        </text>
      </svg>
    </div>
  );
}
