import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Zero Trust concentric rings diagram showing identity at the center
 * with security layers radiating outward.
 */

const RINGS = [
  { label: "Identity", sub: "Entra ID", r: 50, color: "#f43f5e", fillOpacity: 0.15 },
  { label: "MFA", sub: "Multi-Factor", r: 95, color: "#a855f7", fillOpacity: 0.08 },
  { label: "Conditional Access", sub: "Policy Engine", r: 140, color: "#3b82f6", fillOpacity: 0.06 },
  { label: "Device Compliance", sub: "Endpoint Trust", r: 185, color: "#06b6d4", fillOpacity: 0.04 },
  { label: "Continuous Evaluation", sub: "Risk Scoring", r: 230, color: "#10b981", fillOpacity: 0.03 },
];

export default function ZeroTrustDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cx = 300;
  const cy = 260;
  const svgW = 600;
  const svgH = 520;

  return (
    <div ref={ref} className="mx-auto w-full max-w-xl">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
        <defs>
          <filter id="zt-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rings — from outer to inner so inner overlaps */}
        {[...RINGS].reverse().map((ring, i) => {
          const idx = RINGS.length - 1 - i;
          return (
            <motion.g
              key={ring.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              {/* Ring fill */}
              <circle
                cx={cx}
                cy={cy}
                r={ring.r}
                fill={ring.color}
                fillOpacity={ring.fillOpacity}
                stroke={ring.color}
                strokeWidth="1.5"
                strokeOpacity="0.3"
              />

              {/* Rotating dash on outer rings */}
              {idx > 0 && (
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="1"
                  strokeDasharray="8 12"
                  strokeOpacity="0.4"
                  animate={isInView ? { rotate: idx % 2 === 0 ? 360 : -360 } : {}}
                  transition={{ duration: 30 + idx * 10, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Labels on rings */}
        {RINGS.map((ring, i) => {
          // place label on top of each ring
          const labelY = cy - ring.r + (i === 0 ? 0 : -8);
          return (
            <motion.g
              key={`label-${ring.label}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
            >
              {i === 0 ? (
                <>
                  <text
                    x={cx}
                    y={cy - 8}
                    fill={ring.color}
                    fontSize="14"
                    fontWeight="700"
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                  >
                    {ring.label}
                  </text>
                  <text
                    x={cx}
                    y={cy + 10}
                    fill={ring.color}
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                    opacity="0.8"
                  >
                    {ring.sub}
                  </text>
                </>
              ) : (
                <>
                  <rect
                    x={cx - 55}
                    y={labelY - 10}
                    width={110}
                    height={22}
                    rx="4"
                    fill="#0a0e1a"
                    fillOpacity="0.85"
                  />
                  <text
                    x={cx}
                    y={labelY + 4}
                    fill={ring.color}
                    fontSize="9"
                    fontWeight="600"
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                  >
                    {ring.label}
                  </text>
                </>
              )}
            </motion.g>
          );
        })}

        {/* Animated verification pulses */}
        {isInView &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={`pulse-${i}`}
              cx={cx}
              cy={cy}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1"
              initial={{ r: 50, opacity: 0.6 }}
              animate={{ r: 240, opacity: 0 }}
              transition={{
                duration: 3,
                delay: 2 + i * 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

        {/* "Never Trust, Always Verify" */}
        <motion.text
          x={cx}
          y={svgH - 16}
          fill="#6b7280"
          fontSize="10"
          fontWeight="500"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          NEVER TRUST — ALWAYS VERIFY
        </motion.text>
      </svg>
    </div>
  );
}
