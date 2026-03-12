# Network Topology Overview

This document describes the network topology of the Hybrid Enterprise Security Architecture lab. The environment runs entirely on VMware with a Host-Only network and follows a **progressive deployment strategy** — each security layer is validated independently before integrating the next.

## Network Configuration

| Property | Value |
|---|---|
| Network Type | VMware Host-Only |
| Subnet | 192.168.100.0/24 |
| Gateway | 192.168.100.1 |

## Components

### 1. SOC Server — 192.168.100.10
- **OS:** Ubuntu Server 22.04 LTS
- **Role:** Central SOC monitoring platform
- **Services:**
  - Wazuh Manager (SIEM & log correlation)
  - Snort IDS (network intrusion detection)
  - DLP Manager (policy engine, alert aggregation)
- **Ingestion:** Syslog TCP/UDP port 514 + Wazuh API

### 2. AXA GO Endpoint — 192.168.100.30
- **OS:** Windows 10 Enterprise LTSC
- **Role:** Corporate workstation
- **Agents installed:**
  - DLP Agent (Phase 1 — file, process, network, content monitoring)
  - Wazuh Agent (Phase 3 — forwards Windows event logs to SOC server)

### 3. AXA AMS Endpoint — 192.168.100.20
- **OS:** Windows 10 Enterprise LTSC
- **Role:** Finance workstation
- **Agents installed:**
  - DLP Agent (Phase 1 — monitors sensitive financial data)
  - Wazuh Agent (Phase 3 — forwards Windows event logs to SOC server)

### 4. Attacker Machine — 192.168.100.50
- **OS:** Kali Linux
- **Role:** Controlled pentesting node
- **Tools:** Metasploit, Nmap, Burp Suite, SCP, PowerShell scripts
- **Purpose:** Phase 4 — simulate attack scenarios to validate detection coverage

## Progressive Deployment Architecture

The security layers are deployed in this order, each validated before the next is added:

```
Phase 1 — DLP Layer
  AXA GO (192.168.100.30)  ──► DLP Agent ──►┐
  AXA AMS (192.168.100.20) ──► DLP Agent ──►│──► DLP Manager (192.168.100.10)
                                             │
Phase 2 — DLP Validation
  Verify: finance_report.pdf transfer → DLP alert triggered

Phase 3 — SOC Integration
  AXA GO  ──► DLP Agent + Wazuh Agent ──►┐
  AXA AMS ──► DLP Agent + Wazuh Agent ──►│──► SOC Server (192.168.100.10)
                                          │    └── Wazuh Manager
                                          │    └── Snort IDS
                                          │    └── DLP Manager

Phase 4 — Pentesting Validation
  Kali Linux (192.168.100.50) ──► controlled attacks ──► SOC Server + Endpoints
  Validate: DLP + Wazuh + Snort correlated alerts

Phase 5 — Zero Trust Integration
  Microsoft Entra ID ──► Identity + Device Trust + Micro-segmentation layer
```

## Interaction Flow

- **AXA GO and AXA AMS** send agent telemetry (DLP events + Windows logs) to the SOC server via Syslog.
- **Snort IDS** on the SOC server monitors network traffic and forwards alerts to Wazuh.
- **Wazuh Manager** correlates events from DLP, Snort, and endpoint agents into a unified incident view.
- **Kali Linux** executes authorized pentest scenarios and all generated traffic is captured by Snort and Wazuh.
- **Microsoft Entra ID** (Phase 5) provides identity verification, device compliance validation, and access governance on top of the full stack.

## Conclusion

This topology implements a realistic enterprise hybrid security environment. Each phase adds an independent security layer that is validated before the next one is integrated, ensuring reliable detection coverage before complexity is increased.
