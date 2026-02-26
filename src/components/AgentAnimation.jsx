/**
 * Animated SVG of a Windows endpoint workstation with 4 monitoring
 * layers. Uses CSS animations for infinite loops (GPU performance).
 */

const LAYERS = [
  { id: "file",    y: 78,  label: "FILE ACCESS MONITOR",       color: "#3b82f6", icon: "M5 4h4l2 2h4a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" },
  { id: "process", y: 122, label: "PROCESS EXECUTION TRACKER",  color: "#a855f7", icon: "M9 3v2m6-2v2M5 9h14M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: "network", y: 166, label: "NETWORK CONNECTION MONITOR", color: "#06b6d4", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9" },
  { id: "content", y: 210, label: "CONTENT PATTERN DETECTOR",   color: "#f59e0b", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
];

export default function AgentAnimation({ activeTool, onToolHover }) {
  return (
    <svg viewBox="0 0 420 340" className="w-full max-w-md mx-auto" aria-label="DLP Endpoint Agent visualization">
      <defs>
        <linearGradient id="agentBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <filter id="agentGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Laptop base shadow ── */}
      <ellipse cx="120" cy="298" rx="90" ry="10" fill="#000" opacity="0.25" />

      {/* ── Laptop screen ── */}
      <rect x="35" y="40" width="170" height="120" rx="6" fill="url(#agentBody)" stroke="#334155" strokeWidth="1.5" />
      <rect x="42" y="46" width="156" height="94" rx="3" fill="url(#screenGrad)" />
      <circle cx="120" cy="43" r="1.5" fill="#334155" />

      {/* ── Windows logo on screen ── */}
      <g transform="translate(95, 68)">
        <rect x="0" y="0" width="10" height="10" rx="1" fill="#3b82f6" opacity="0.5" />
        <rect x="12" y="0" width="10" height="10" rx="1" fill="#3b82f6" opacity="0.4" />
        <rect x="0" y="12" width="10" height="10" rx="1" fill="#3b82f6" opacity="0.4" />
        <rect x="12" y="12" width="10" height="10" rx="1" fill="#3b82f6" opacity="0.3" />
      </g>
      <text x="120" y="110" textAnchor="middle" className="text-[7px]" fill="#475569" fontFamily="monospace">WINDOWS 10 / 11</text>
      <text x="120" y="120" textAnchor="middle" className="text-[6px]" fill="#334155" fontFamily="monospace">DLP-AGENT-01</text>

      {/* ── Laptop keyboard/base ── */}
      <path d="M30,160 L45,145 L195,145 L210,160 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="30" y="160" width="180" height="10" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <rect x="90" y="162" width="60" height="5" rx="1" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />

      {/* ── Status LEDs ── */}
      <circle cx="50" cy="148" r="2" fill="#22c55e" className="anim-pulse" />
      <text x="55" y="150" className="text-[5px]" fill="#475569" fontFamily="monospace">PWR</text>
      <circle cx="75" cy="148" r="2" fill="#3b82f6" className="anim-pulse-fast" />
      <text x="80" y="150" className="text-[5px]" fill="#475569" fontFamily="monospace">NET</text>
      <circle cx="100" cy="148" r="2" fill="#f59e0b" className="anim-pulse-d1" />
      <text x="105" y="150" className="text-[5px]" fill="#475569" fontFamily="monospace">DLP</text>

      {/* ── Shield outline ── */}
      <path
        d="M120,22 C160,22 200,30 215,35 L215,130 C215,165 170,180 120,195 C70,180 25,165 25,130 L25,35 C40,30 80,22 120,22Z"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="0.8"
        strokeDasharray="4 4"
        opacity="0.25"
        className="anim-dash-slow"
      />

      {/* ── Monitoring layer slots (right panel) ── */}
      {LAYERS.map((layer) => {
        const isActive = activeTool === layer.id;
        return (
          <g
            key={layer.id}
            onMouseEnter={() => onToolHover(layer.id)}
            onMouseLeave={() => onToolHover(null)}
            style={{ cursor: "pointer" }}
          >
            <rect
              x="240"
              y={layer.y}
              width="168"
              height="36"
              rx="6"
              fill={isActive ? layer.color + "18" : "#0f172a"}
              stroke={isActive ? layer.color : "#1e293b"}
              strokeWidth={isActive ? 1.5 : 1}
              style={{ transition: "fill 0.2s, stroke 0.2s" }}
            />

            <g transform={`translate(248, ${layer.y + 8})`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? layer.color : "#475569"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={layer.icon} />
              </svg>
            </g>

            <text
              x="274"
              y={layer.y + 18}
              className="text-[7px]"
              fill={isActive ? "#e2e8f0" : "#64748b"}
              fontFamily="monospace"
              fontWeight={isActive ? "bold" : "normal"}
            >
              {layer.label}
            </text>

            <circle
              cx="398"
              cy={layer.y + 18}
              r="3"
              fill={layer.color}
              className={isActive ? "anim-pulse-fast" : undefined}
              opacity={isActive ? undefined : 0.3}
            />

            <text
              x="274"
              y={layer.y + 28}
              className="text-[5.5px]"
              fill={isActive ? layer.color : "#334155"}
              fontFamily="monospace"
            >
              {layer.id === "file" && "FS API HOOKS — REAL-TIME"}
              {layer.id === "process" && "ETW TRACING — KERNEL LEVEL"}
              {layer.id === "network" && "OUTBOUND CAPTURE — TCP/UDP"}
              {layer.id === "content" && "REGEX + FINGERPRINT — INLINE"}
            </text>

            <line
              x1="210"
              y1={130}
              x2="240"
              y2={layer.y + 18}
              stroke={isActive ? layer.color : "#1e293b"}
              strokeWidth={isActive ? 1.2 : 0.6}
              strokeDasharray={isActive ? "none" : "3 3"}
              opacity={isActive ? 0.7 : 0.2}
              style={{ transition: "opacity 0.3s, stroke 0.3s" }}
            />
          </g>
        );
      })}

      {/* ── Data flow arrow to server ── */}
      <g>
        <path
          d="M120,175 L120,275 L120,290"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="4 3"
          className="anim-dash-slow"
        />
        <polygon points="115,290 120,300 125,290" fill="#3b82f6" opacity="0.6" />

        <rect x="60" y="308" width="120" height="18" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="0.8" />
        <text x="120" y="320" textAnchor="middle" className="text-[6.5px]" fill="#64748b" fontFamily="monospace">
          SYSLOG → DLP-CENTRAL-01
        </text>

        <g className="anim-pulse">
          <rect x="130" y="230" width="50" height="14" rx="3" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="0.5" />
          <text x="155" y="240" textAnchor="middle" className="text-[5.5px]" fill="#3b82f6" fontFamily="monospace">
            ~500 EPS
          </text>
        </g>
      </g>

      {/* ── Agent service indicator ── */}
      <g>
        <rect x="35" y="178" width="170" height="16" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="0.8" />
        <circle cx="46" cy="186" r="2.5" fill="#22c55e" className="anim-pulse" />
        <text x="55" y="189" className="text-[6px]" fill="#64748b" fontFamily="monospace">
          dlp-agent.exe — SERVICE RUNNING — PID 4872
        </text>
      </g>

      {/* ── Deployment info ── */}
      <g>
        <rect x="35" y="198" width="170" height="16" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="0.8" />
        <text x="46" y="209" className="text-[6px]" fill="#475569" fontFamily="monospace">
          GPO: Auto-Deploy | RAM: &lt; 50MB | CPU: &lt; 2%
        </text>
      </g>
    </svg>
  );
}
