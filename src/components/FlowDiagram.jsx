import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated data flow diagram showing how logs flow from sources
 * through correlation to governance escalation.
 */

const SOURCES = [
  { id: "dlp", label: "DLP Logs", color: "#3b82f6", icon: "📄" },
  { id: "snort", label: "Snort Alerts", color: "#10b981", icon: "🌐" },
  { id: "windows", label: "Windows Logs", color: "#06b6d4", icon: "🖥️" },
  { id: "identity", label: "Identity Events", color: "#a855f7", icon: "🔐" },
];

export default function FlowDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const svgW = 800;
  const svgH = 380;
  const sourceY = 50;
  const correlationY = 180;
  const outputY = 310;

  return (
    <div ref={ref} className="mx-auto w-full max-w-4xl overflow-x-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 500 }}>
        <defs>
          {SOURCES.map((s) => (
            <linearGradient key={`grad-${s.id}`} id={`grad-${s.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Source nodes */}
        {SOURCES.map((s, i) => {
          const x = 100 + i * 165;
          return (
            <motion.g
              key={s.id}
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <rect
                x={x - 55}
                y={sourceY - 20}
                width={110}
                height={44}
                rx="10"
                fill="#0f1629"
                stroke={s.color}
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={sourceY + 5}
                fill="white"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {s.label}
              </text>

              {/* Animated flow line down to correlation */}
              <motion.path
                d={`M ${x} ${sourceY + 24} C ${x} ${sourceY + 70}, ${svgW / 2} ${correlationY - 50}, ${svgW / 2} ${correlationY - 24}`}
                fill="none"
                stroke={s.color}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
              />

              {/* Animated pulse dot */}
              {isInView && (
                <motion.circle
                  r="4"
                  fill={s.color}
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    offsetDistance: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.4,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <animateMotion
                    dur="2s"
                    begin={`${1 + i * 0.4}s`}
                    repeatCount="indefinite"
                    path={`M ${x} ${sourceY + 24} C ${x} ${sourceY + 70}, ${svgW / 2} ${correlationY - 50}, ${svgW / 2} ${correlationY - 24}`}
                  />
                </motion.circle>
              )}
            </motion.g>
          );
        })}

        {/* Correlation engine — center */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Outer glow ring */}
          <motion.circle
            cx={svgW / 2}
            cy={correlationY}
            r="52"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
            opacity="0.2"
            animate={isInView ? { r: [48, 56, 48] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle
            cx={svgW / 2}
            cy={correlationY}
            r="46"
            fill="#0f1629"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text
            x={svgW / 2}
            y={correlationY - 8}
            fill="#f59e0b"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
          >
            WAZUH
          </text>
          <text
            x={svgW / 2}
            y={correlationY + 8}
            fill="#fbbf24"
            fontSize="9"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
          >
            Correlation
          </text>
          <text
            x={svgW / 2}
            y={correlationY + 20}
            fill="#fbbf24"
            fontSize="9"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
          >
            Engine
          </text>
        </motion.g>

        {/* Output branches */}
        {[
          { label: "Risk Score", x: 200, color: "#ef4444" },
          { label: "Correlated Alert", x: 400, color: "#f59e0b" },
          { label: "Governance Escalation", x: 600, color: "#a855f7" },
        ].map((out, i) => (
          <motion.g
            key={out.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
          >
            <motion.path
              d={`M ${svgW / 2} ${correlationY + 46} Q ${(svgW / 2 + out.x) / 2} ${outputY - 40}, ${out.x} ${outputY - 22}`}
              fill="none"
              stroke={out.color}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
              transition={{ duration: 0.7, delay: 1.3 + i * 0.15 }}
            />
            <rect
              x={out.x - 70}
              y={outputY - 22}
              width={140}
              height={40}
              rx="10"
              fill="#0f1629"
              stroke={out.color}
              strokeWidth="1.5"
            />
            <text
              x={out.x}
              y={outputY + 3}
              fill="white"
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
            >
              {out.label}
            </text>
          </motion.g>
        ))}

        {/* Legend label */}
        <text x={svgW / 2} y={svgH - 8} fill="#4b5563" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
          Real-time log correlation pipeline
        </text>
      </svg>
    </div>
  );
}
