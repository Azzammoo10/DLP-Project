import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Professional global architecture diagram.
 * Pure SVG — realistic server/workstation visual metaphor with animated data flows.
 */

const NODES = {
  finance: {
    label: "Win-Finance",
    sub: "DLP Agent",
    color: "#06b6d4",
    x: 20,
    y: 220,
    w: 170,
    h: 72,
  },
  central: {
    label: "Ubuntu Server Central",
    sub: "Wazuh • DLP • Snort IDS",
    color: "#10b981",
    x: 265,
    y: 185,
    w: 250,
    h: 120,
  },
  rh: {
    label: "Win-RH",
    sub: "DLP Agent",
    color: "#3b82f6",
    x: 590,
    y: 220,
    w: 170,
    h: 72,
  },
  kali: {
    label: "Kali Linux",
    sub: "Pentest",
    color: "#f43f5e",
    x: 300,
    y: 55,
    w: 180,
    h: 72,
  },
};

export default function ArchitectureDiagramSVG() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const financeEdgeX = NODES.finance.x + NODES.finance.w;
  const financeEdgeY = NODES.finance.y + NODES.finance.h / 2;
  const centralLeftX = NODES.central.x;
  const centralLeftY = NODES.central.y + 60;

  const rhEdgeX = NODES.rh.x;
  const rhEdgeY = NODES.rh.y + NODES.rh.h / 2;
  const centralRightX = NODES.central.x + NODES.central.w;
  const centralRightY = NODES.central.y + 60;

  const kaliEdgeX = NODES.kali.x + NODES.kali.w / 2;
  const kaliEdgeY = NODES.kali.y + NODES.kali.h;
  const centralTopX = NODES.central.x + NODES.central.w / 2;
  const centralTopY = NODES.central.y;

  return (
    <div ref={ref} className="mx-auto w-full max-w-3xl overflow-x-auto">
      <svg
        viewBox="0 0 900 380"
        className="w-full"
        style={{ minWidth: 560 }}
      >
        <defs>
          <pattern id="techGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#1e293b" strokeWidth="1" />
          </pattern>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="1" y="1" width="898" height="378" rx="16" fill="#0b1220" stroke="#1e293b" strokeWidth="1" />
        <rect x="8" y="8" width="884" height="364" rx="12" fill="url(#techGrid)" opacity="0.35" />

        <motion.rect
          x={NODES.central.x - 12}
          y={NODES.central.y - 12}
          width={NODES.central.w + 24}
          height={NODES.central.h + 24}
          rx="20"
          fill="none"
          stroke="#10b981"
          strokeWidth="1.2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0.08, 0.26, 0.08] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.line
          x1={financeEdgeX}
          y1={financeEdgeY}
          x2={centralLeftX}
          y2={centralLeftY}
          stroke="#06b6d4"
          strokeWidth="2"
          strokeDasharray="6 6"
          markerEnd="url(#arrowHead)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.9 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        />

        <motion.line
          x1={rhEdgeX}
          y1={rhEdgeY}
          x2={centralRightX}
          y2={centralRightY}
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="6 6"
          markerEnd="url(#arrowHead)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.9 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        />

        <motion.line
          x1={kaliEdgeX}
          y1={kaliEdgeY}
          x2={centralTopX}
          y2={centralTopY}
          stroke="#f43f5e"
          strokeWidth="2"
          strokeDasharray="5 5"
          markerEnd="url(#arrowHead)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.9 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        />

        <motion.circle
          r="3.5"
          fill="#67e8f9"
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  cx: [financeEdgeX, centralLeftX],
                  cy: [financeEdgeY, centralLeftY],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8, ease: "linear" }}
        />

        <motion.circle
          r="3.5"
          fill="#93c5fd"
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  cx: [rhEdgeX, centralRightX],
                  cy: [rhEdgeY, centralRightY],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{ duration: 1.6, delay: 0.35, repeat: Infinity, repeatDelay: 0.8, ease: "linear" }}
        />

        <motion.circle
          r="3.5"
          fill="#fda4af"
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  cx: [kaliEdgeX, centralTopX],
                  cy: [kaliEdgeY, centralTopY],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{ duration: 1.7, delay: 0.5, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
        />

        <motion.text x={financeEdgeX + (centralLeftX - financeEdgeX) * 0.45} y={financeEdgeY + 12} fill="#67e8f9" fontSize="10" fontFamily="JetBrains Mono, monospace" initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.7 } : {}} transition={{ delay: 0.9 }}>
          telemetry + policy events
        </motion.text>
        <motion.text x={centralRightX + (rhEdgeX - centralRightX) * 0.2} y={rhEdgeY + 12} fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace" initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.7 } : {}} transition={{ delay: 1 }}>
          telemetry + policy events
        </motion.text>
        <motion.text x="345" y="170" fill="#fda4af" fontSize="10" fontFamily="JetBrains Mono, monospace" initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.8 } : {}} transition={{ delay: 1.1 }}>
          controlled pentest traffic
        </motion.text>

        {Object.entries(NODES).map(([id, node], index) => (
          <motion.g
            key={id}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            <rect
              x={node.x - 2}
              y={node.y - 2}
              width={node.w + 4}
              height={node.h + 4}
              rx="14"
              fill="none"
              stroke={node.color}
              strokeWidth="1"
              opacity="0.24"
              filter="url(#softGlow)"
            />
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx="12"
              fill="#0f1629"
              stroke={node.color}
              strokeWidth={id === "central" ? "2" : "1.5"}
              opacity="0.95"
            />
            <rect x={node.x} y={node.y} width="6" height={node.h} rx="3" fill={node.color} />

            {id === "central" && (
              <>
                <rect x={node.x + node.w - 78} y={node.y + 22} width="56" height="72" rx="6" fill="#0b1220" stroke="#34d399" strokeWidth="1" opacity="0.9" />
                <rect x={node.x + node.w - 71} y={node.y + 30} width="42" height="10" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="0.5" />
                <rect x={node.x + node.w - 71} y={node.y + 45} width="42" height="10" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="0.5" />
                <rect x={node.x + node.w - 71} y={node.y + 60} width="42" height="10" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="0.5" />
                <motion.circle
                  cx={node.x + node.w - 35}
                  cy={node.y + 87}
                  r="2.3"
                  fill="#22c55e"
                  animate={isInView ? { opacity: [0.3, 1, 0.3] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </>
            )}

            {(id === "finance" || id === "rh") && (
              <>
                <rect x={node.x + node.w - 60} y={node.y + 16} width="42" height="24" rx="3" fill="#0b1220" stroke="#94a3b8" strokeWidth="1" />
                <rect x={node.x + node.w - 44} y={node.y + 41} width="10" height="4" rx="1" fill="#64748b" />
                <rect x={node.x + node.w - 50} y={node.y + 45} width="22" height="3" rx="1" fill="#334155" />
                <rect x={node.x + node.w - 16} y={node.y + 20} width="7" height="26" rx="1.5" fill="#111827" stroke="#64748b" strokeWidth="0.8" />
              </>
            )}

            {id === "kali" && (
              <>
                <rect x={node.x + node.w - 62} y={node.y + 18} width="38" height="22" rx="2.5" fill="#0b1220" stroke="#fca5a5" strokeWidth="0.9" />
                <rect x={node.x + node.w - 64} y={node.y + 41} width="42" height="5" rx="1.5" fill="#374151" />
                <text x={node.x + node.w - 56} y={node.y + 32} fill="#fb7185" fontSize="8" fontFamily="JetBrains Mono, monospace">$ scan</text>
              </>
            )}

            <text
              x={node.x + 18}
              y={node.y + 28}
              fill="white"
              fontSize={id === "central" ? "14" : "13"}
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              {node.label}
            </text>
            <text
              x={node.x + 18}
              y={node.y + 48}
              fill="#9ca3af"
              fontSize="10"
              fontFamily="Inter, sans-serif"
            >
              {node.sub}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
