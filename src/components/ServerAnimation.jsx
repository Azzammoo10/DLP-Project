import { useState } from "react";

/**
 * Animated server rack SVG with pulsing lights, data flow lines,
 * and interactive tool slots. Uses CSS animations instead of
 * framer-motion for infinite loops (better GPU performance).
 */

const TOOLS = [
  { id: "wazuh", y: 58, label: "Wazuh Manager", color: "#3b82f6", version: "4.7", script: "/etc/wazuh/ossec.conf" },
  { id: "snort", y: 92, label: "Snort IDS Engine", color: "#ef4444", version: "3.1", script: "/etc/snort/snort.lua" },
  { id: "dlpscripts", y: 126, label: "DLP Custom Scripts", color: "#e11d48", version: "v3.2", script: "/opt/dlp/scripts/" },
  { id: "correlation", y: 160, label: "Correlation Engine", color: "#a855f7", version: "Custom", script: "/opt/dlp/correlate.py" },
  { id: "risk", y: 194, label: "Risk Scoring Module", color: "#f59e0b", version: "v2.1", script: "/opt/dlp/risk_score.py" },
  { id: "governance", y: 228, label: "Governance Daemon", color: "#10b981", version: "v1.4", script: "/opt/dlp/governance.sh" },
  { id: "elastic", y: 262, label: "Elasticsearch / Indexer", color: "#06b6d4", version: "8.x", script: "/etc/elasticsearch/" },
];

export default function ServerAnimation({ activeTool, onToolHover }) {
  return (
    <svg viewBox="0 0 400 340" className="w-full max-w-md mx-auto" aria-label="DLP Server visualization">
      <defs>
        {/* Server body gradient */}
        <linearGradient id="serverBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Pulse animation for LEDs */}
        <radialGradient id="ledGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Server chassis ── */}
      {/* Shadow */}
      <rect x="58" y="30" width="284" height="280" rx="8" fill="#000" opacity="0.3" />
      {/* Main body */}
      <rect x="55" y="26" width="284" height="280" rx="8" fill="url(#serverBody)" stroke="#334155" strokeWidth="1.5" />
      {/* Top bezel */}
      <rect x="55" y="26" width="284" height="26" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="55" y="44" width="284" height="4" fill="#0f172a" />

      {/* Ubuntu / Server label */}
      <text x="200" y="42" textAnchor="middle" className="text-[8px]" fill="#64748b" fontFamily="monospace">
        UBUNTU SERVER 22.04 LTS — DLP-CENTRAL-01
      </text>

      {/* ── Status LEDs (top-right) ── */}
      {/* Power */}
      <circle cx="315" cy="36" r="3" fill="#22c55e" className="anim-pulse" />
      {/* Network */}
      <circle cx="325" cy="36" r="3" fill="#3b82f6" className="anim-pulse-fast" />

      {/* ── Tool slots (rack units) ── */}
      {TOOLS.map((tool) => {
        const isActive = activeTool === tool.id;
        return (
          <g
            key={tool.id}
            onMouseEnter={() => onToolHover(tool.id)}
            onMouseLeave={() => onToolHover(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Slot background */}
            <rect
              x="70"
              y={tool.y}
              width="254"
              height="30"
              rx="4"
              fill={isActive ? tool.color + "18" : "#0f172a"}
              stroke={isActive ? tool.color : "#1e293b"}
              strokeWidth={isActive ? 1.5 : 1}
              filter={isActive ? "url(#glow)" : undefined}
              style={{ transition: "fill 0.3s, stroke 0.3s" }}
            />

            {/* Status LED */}
            <circle
              cx="82"
              cy={tool.y + 15}
              r="3"
              fill={tool.color}
              className={isActive ? "anim-pulse-fast" : undefined}
              opacity={isActive ? undefined : 0.6}
            />

            {/* Tool name */}
            <text
              x="95"
              y={tool.y + 13}
              fill={isActive ? "#f1f5f9" : "#94a3b8"}
              fontSize="10"
              fontFamily="monospace"
              fontWeight={isActive ? "bold" : "normal"}
            >
              {tool.label}
            </text>

            {/* Script path sublabel */}
            <text
              x="95"
              y={tool.y + 23}
              fill={isActive ? tool.color : "#334155"}
              fontSize="7"
              fontFamily="monospace"
              opacity={isActive ? 0.9 : 0.6}
            >
              {tool.script}
            </text>

            {/* Version badge */}
            <rect x="270" y={tool.y + 4} width="40" height="18" rx="4" fill={tool.color + "25"} />
            <text
              x="290"
              y={tool.y + 17}
              textAnchor="middle"
              fill={tool.color}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {tool.version}
            </text>

            {/* Data flow indicator (right edge) */}
            {isActive && (
              <rect
                x="322"
                y={tool.y + 6}
                width="3"
                height="14"
                rx="1.5"
                fill={tool.color}
                className="anim-pulse-fast"
              />
            )}
          </g>
        );
      })}

      {/* ── Bottom panel — network & storage indicators ── */}
      <rect x="70" y="296" width="254" height="10" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
      {/* Port indicators */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={82 + i * 18}
          y="298"
          width="10"
          height="6"
          rx="1"
          fill="#3b82f6"
          className={`anim-pulse-d${i}`}
        />
      ))}
      <text x="160" y="304" fill="#475569" fontSize="7" fontFamily="monospace">ETH0 • ETH1 • MGMT • iLO</text>

      {/* ── Data flow lines (left side — incoming) ── */}
      <line x1="20" y1="75" x2="70" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" />
      <line x1="20" y1="109" x2="70" y2="109" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" />
      <line x1="20" y1="143" x2="70" y2="143" stroke="#e11d48" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" />
      <line x1="20" y1="177" x2="70" y2="177" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" />

      {/* Left labels */}
      <text x="12" y="72" fill="#3b82f6" fontSize="7" fontFamily="monospace" textAnchor="end">SYSLOG</text>
      <text x="12" y="106" fill="#ef4444" fontSize="7" fontFamily="monospace" textAnchor="end">SNORT</text>
      <text x="12" y="140" fill="#e11d48" fontSize="7" fontFamily="monospace" textAnchor="end">DLP-AGENT</text>
      <text x="12" y="174" fill="#a855f7" fontSize="7" fontFamily="monospace" textAnchor="end">ENTRA ID</text>

      {/* ── Data flow lines (right side — outgoing) ── */}
      <line x1="324" y1="210" x2="390" y2="210" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" />
      <line x1="324" y1="244" x2="390" y2="244" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" />
      <line x1="324" y1="278" x2="390" y2="278" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" />

      {/* Right labels */}
      <text x="395" y="207" fill="#f59e0b" fontSize="7" fontFamily="monospace">ALERTS</text>
      <text x="395" y="241" fill="#10b981" fontSize="7" fontFamily="monospace">ESCALATE</text>
      <text x="395" y="275" fill="#06b6d4" fontSize="7" fontFamily="monospace">KIBANA</text>
    </svg>
  );
}
