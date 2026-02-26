/**
 * 3D-style animated server rack SVG.
 * Focused on 4 core services: Wazuh, Snort, DLP Custom, Correlation.
 */

const TOOLS = [
  { id: "wazuh", y: 94, label: "Wazuh Manager", color: "#3b82f6", version: "4.7", script: "/etc/wazuh/ossec.conf" },
  { id: "snort", y: 130, label: "Snort IDS Engine", color: "#ef4444", version: "3.1", script: "/etc/snort/snort.lua" },
  { id: "dlpscripts", y: 166, label: "DLP Custom Scripts", color: "#e11d48", version: "v3.2", script: "/opt/dlp/scripts/" },
  { id: "correlation", y: 202, label: "Correlation Engine", color: "#a855f7", version: "Custom", script: "/opt/dlp/correlate.py" },
];

export default function ServerAnimation({ activeTool, onToolHover }) {
  return (
    <svg viewBox="0 0 470 390" className="w-full max-w-md mx-auto" aria-label="3D DLP Server visualization">
      <defs>
        <linearGradient id="panelBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1120" />
          <stop offset="100%" stopColor="#090f1c" />
        </linearGradient>

        <linearGradient id="frontFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#202c40" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <linearGradient id="topFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        <linearGradient id="sideFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111b2f" />
          <stop offset="100%" stopColor="#0b1426" />
        </linearGradient>

        <filter id="slotGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <marker id="flowArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
        </marker>
      </defs>

      <rect x="10" y="10" width="450" height="370" rx="16" fill="url(#panelBg)" stroke="#1f2a44" strokeWidth="1" />
      <rect x="20" y="20" width="430" height="350" rx="12" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.7" />

      <ellipse cx="245" cy="334" rx="150" ry="20" fill="#000" opacity="0.32" />

      <polygon points="106,60 332,60 356,82 130,82" fill="url(#topFace)" stroke="#3a4a63" strokeWidth="1" />
      <polygon points="332,60 356,82 356,310 332,286" fill="url(#sideFace)" stroke="#29384f" strokeWidth="1" />

      <rect x="106" y="82" width="226" height="228" rx="10" fill="url(#frontFace)" stroke="#334155" strokeWidth="1.4" />
      <rect x="106" y="82" width="226" height="26" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="106" y="102" width="226" height="4" fill="#0f172a" />
      <rect x="100" y="82" width="4" height="228" rx="1" fill="#0b1220" />
      <rect x="334" y="82" width="4" height="228" rx="1" fill="#0b1220" />

      <text x="218" y="98" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
        UBUNTU SERVER 22.04 LTS — DLP-CENTRAL-01
      </text>

      <rect x="118" y="114" width="190" height="16" rx="4" fill="#0d1728" stroke="#243246" strokeWidth="1" />
      <text x="128" y="125" fill="#94a3b8" fontSize="6.8" fontFamily="monospace">SOC HEALTH</text>
      <text x="182" y="125" fill="#22c55e" fontSize="6.8" fontFamily="monospace">NOMINAL</text>

      <rect x="222" y="118" width="32" height="5" rx="2" fill="#17263a" />
      <rect x="222" y="118" width="20" height="5" rx="2" fill="#22c55e" className="anim-pulse" />
      <text x="257" y="123" fill="#64748b" fontSize="6" fontFamily="monospace">CPU</text>

      <rect x="272" y="118" width="32" height="5" rx="2" fill="#17263a" />
      <rect x="272" y="118" width="22" height="5" rx="2" fill="#3b82f6" className="anim-pulse-fast" />
      <text x="307" y="123" fill="#64748b" fontSize="6" fontFamily="monospace">RAM</text>

      <circle cx="316" cy="96" r="2.8" fill="#22c55e" className="anim-pulse" />
      <circle cx="325" cy="96" r="2.8" fill="#3b82f6" className="anim-pulse-fast" />

      {TOOLS.map((tool) => {
        const isActive = activeTool === tool.id;
        return (
          <g
            key={tool.id}
            onMouseEnter={() => onToolHover(tool.id)}
            onMouseLeave={() => onToolHover(null)}
            style={{ cursor: "pointer" }}
          >
            <polygon
              points={`118,${tool.y} 310,${tool.y} 318,${tool.y + 8} 126,${tool.y + 8}`}
              fill="#182336"
              opacity="0.7"
            />

            <rect
              x="118"
              y={tool.y + 8}
              width="192"
              height="30"
              rx="4"
              fill={isActive ? tool.color + "18" : "#0f172a"}
              stroke={isActive ? tool.color : "#1e293b"}
              strokeWidth={isActive ? 1.5 : 1}
              filter={isActive ? "url(#slotGlow)" : undefined}
              style={{ transition: "fill 0.3s, stroke 0.3s" }}
            />

            <rect x="118" y={tool.y + 8} width="5" height="30" rx="2" fill={tool.color} opacity={isActive ? 1 : 0.65} />

            <circle
              cx="130"
              cy={tool.y + 23}
              r="3"
              fill={tool.color}
              className={isActive ? "anim-pulse-fast" : undefined}
              opacity={isActive ? undefined : 0.65}
            />

            <text
              x="142"
              y={tool.y + 22}
              fill={isActive ? "#f1f5f9" : "#94a3b8"}
              fontSize="9.2"
              fontFamily="monospace"
              fontWeight={isActive ? "bold" : "normal"}
            >
              {tool.label}
            </text>

            <text
              x="142"
              y={tool.y + 32}
              fill={isActive ? tool.color : "#334155"}
              fontSize="6.6"
              fontFamily="monospace"
              opacity={isActive ? 0.95 : 0.65}
            >
              {tool.script}
            </text>

            <rect x="278" y={tool.y + 14} width="30" height="14" rx="4" fill={tool.color + "25"} />
            <text
              x="293"
              y={tool.y + 23}
              textAnchor="middle"
              fill={tool.color}
              fontSize="7.5"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {tool.version}
            </text>

            {isActive && (
              <rect
                x="312"
                y={tool.y + 16}
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

      <rect x="118" y="264" width="192" height="20" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="0.8" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={128 + i * 15}
          y="270"
          width="9"
          height="5"
          rx="1"
          fill="#3b82f6"
          className={`anim-pulse-d${i}`}
        />
      ))}
      <text x="194" y="275" fill="#475569" fontSize="6.6" fontFamily="monospace">ETH0 • ETH1 • MGMT • iLO</text>

      <g transform="translate(287, 273)">
        <circle cx="0" cy="0" r="7" fill="#0b1220" stroke="#2b3b52" strokeWidth="1" />
        <g>
          <path d="M0 -4 L1.7 -1.1 L-1.7 -1.1 Z" fill="#64748b" />
          <path d="M4 0 L1.1 1.7 L1.1 -1.7 Z" fill="#64748b" />
          <path d="M0 4 L-1.7 1.1 L1.7 1.1 Z" fill="#64748b" />
          <path d="M-4 0 L-1.1 -1.7 L-1.1 1.7 Z" fill="#64748b" />
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="2.8s" repeatCount="indefinite" />
        </g>
      </g>

      <line x1="28" y1="106" x2="118" y2="106" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" markerEnd="url(#flowArrow)" />
      <line x1="28" y1="142" x2="118" y2="142" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" markerEnd="url(#flowArrow)" />
      <line x1="28" y1="178" x2="118" y2="178" stroke="#e11d48" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" markerEnd="url(#flowArrow)" />
      <line x1="28" y1="214" x2="118" y2="214" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" markerEnd="url(#flowArrow)" />

      <text x="24" y="103" fill="#3b82f6" fontSize="6.6" fontFamily="monospace" textAnchor="end">SYSLOG</text>
      <text x="24" y="139" fill="#ef4444" fontSize="6.6" fontFamily="monospace" textAnchor="end">SNORT</text>
      <text x="24" y="175" fill="#e11d48" fontSize="6.6" fontFamily="monospace" textAnchor="end">DLP-AGENT</text>
      <text x="24" y="211" fill="#a855f7" fontSize="6.6" fontFamily="monospace" textAnchor="end">IDENTITY</text>

      <line x1="310" y1="214" x2="430" y2="214" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" markerEnd="url(#flowArrow)" />
      <line x1="310" y1="250" x2="430" y2="250" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" className="anim-dash" markerEnd="url(#flowArrow)" />

      <text x="434" y="211" fill="#a855f7" fontSize="6.6" fontFamily="monospace">CORRELATE</text>
      <text x="434" y="247" fill="#3b82f6" fontSize="6.6" fontFamily="monospace">ALERTS</text>

      <text x="235" y="352" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="monospace">
        3D Security Server Node • Wazuh + Snort + DLP Custom + Correlation
      </text>
    </svg>
  );
}
