# Requirements — Hybrid Enterprise Security Architecture

## Overview

This document outlines the software and configuration requirements for the progressive security architecture lab. The environment runs on VMware with a Host-Only network (`192.168.100.0/24`) and deploys four virtual machines across five implementation phases.

## Network Requirements

| Setting | Value |
|---|---|
| Hypervisor | VMware Workstation / VMware Player |
| Network Mode | Host-Only |
| Subnet | 192.168.100.0/24 |
| Gateway | 192.168.100.1 |

## Virtual Machine Requirements

### SOC Server — 192.168.100.10
- **OS:** Ubuntu Server 22.04 LTS
- **Role:** Central SOC platform (DLP Manager + Wazuh Manager + Snort IDS)
- **Required packages:**
  - Wazuh Manager 4.7+
  - Snort IDS 3.1+
  - Custom DLP scripts (`/opt/dlp/scripts/`)
  - Correlation engine (`/opt/dlp/correlate.py`)
- **Ports:** Syslog TCP/UDP 514, Wazuh API 55000, OSSEC 1514/UDP

### AXA GO Endpoint — 192.168.100.30
- **OS:** Windows 10 Enterprise LTSC
- **Role:** Corporate workstation
- **Required agents:**
  - DLP Agent (`dlp-agent.exe`) — Phase 1
  - Wazuh Agent — Phase 3
- **Deployment:** GPO or SCCM auto-deploy
- **Agent footprint:** RAM < 50 MB, CPU < 2%

### AXA AMS Endpoint — 192.168.100.20
- **OS:** Windows 10 Enterprise LTSC
- **Role:** Finance workstation
- **Required agents:**
  - DLP Agent (`dlp-agent.exe`) — Phase 1
  - Wazuh Agent — Phase 3
- **Deployment:** GPO or SCCM auto-deploy
- **Agent footprint:** RAM < 50 MB, CPU < 2%

### Attacker Machine — 192.168.100.50
- **OS:** Kali Linux (2023.1 or later)
- **Role:** Controlled pentesting — Phase 4 only
- **Required tools:**
  - Metasploit Framework 6.4+
  - Nmap 7.94+
  - Burp Suite Community
  - SCP / OpenSSH client
  - PowerShell (for evil-winrm or PowerShell remoting tests)

## Progressive Deployment Configuration

### Phase 1 — DLP Layer
1. Install DLP Manager on SOC server (`192.168.100.10`)
2. Deploy DLP Agent on AXA GO (`192.168.100.30`) and AXA AMS (`192.168.100.20`)
3. Configure DLP policies for USB, email, cloud upload, and SCP/FTP detection
4. Configure agent reporting to SOC server via Syslog TCP 514

### Phase 2 — DLP Validation
1. Prepare test file: `finance_report.pdf`
2. Attempt file transfer outside the network
3. Verify DLP alert is generated on SOC server

### Phase 3 — SOC Integration
1. Install and configure Wazuh Manager on SOC server
2. Deploy Wazuh Agent on AXA GO and AXA AMS
3. Configure Snort IDS on SOC server (interface mirroring)
4. Write Wazuh correlation rules for DLP + network events
5. Validate: DLP alert + Wazuh SIEM alert + Snort IDS alert appear for the same incident

### Phase 4 — Pentesting Validation
1. Confirm the Kali Linux VM is isolated to `192.168.100.50`
2. Execute authorized pentest scenarios:
   - Nmap scan of `192.168.100.0/24`
   - Reverse shell against SOC server
   - SCP data exfiltration from endpoint
   - Malicious PowerShell execution
3. Validate: all attacks generate correlated alerts across DLP, Wazuh, and Snort

### Phase 5 — Zero Trust Integration
1. Register devices with Microsoft Entra ID (Azure Student subscription)
2. Enable MFA and Conditional Access policies
3. Configure VMware network micro-segmentation:
   - VMnet1 — Security (SOC server)
   - VMnet2 — Finance (AXA AMS)
   - VMnet3 — Monitoring (Snort, logging)
4. Validate: Kali Linux access is denied at the identity gate

## Additional Notes

- Apply OS updates and patches before each phase to prevent false-positive CVEs in the pentest phase.
- All DLP policies should be documented in the policy catalog before Phase 2 validation.
- Wazuh correlation rules must reference DLP source IPs (`192.168.100.30`, `192.168.100.20`) for accurate incident linking.
- Zero Trust is the final governance layer — it does not replace DLP or SOC monitoring but governs access on top of them.
