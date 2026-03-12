# Security Architecture Diagram — Hybrid Enterprise Security

This sub-project documents the **progressive deployment architecture** of a hybrid enterprise security lab combining DLP, SOC monitoring, pentesting validation, and Zero Trust access control.

The lab runs on VMware with a Host-Only network (`192.168.100.0/24`) and four virtual machines deployed across five sequential phases.

## Architecture Overview

Security layers are deployed in this order, each validated independently before the next is added:

1. **Phase 1 — DLP Layer**: Deploy DLP Manager (SOC server) + DLP Agents (AXA GO + AXA AMS).
2. **Phase 2 — DLP Validation**: Validate detection using test file `finance_report.pdf`.
3. **Phase 3 — SOC Integration**: Add Wazuh Manager + Wazuh Agents + Snort IDS.
4. **Phase 4 — Pentesting Validation**: Kali Linux simulates attacks; validate correlated alerts.
5. **Phase 5 — Zero Trust Integration**: Microsoft Entra ID — identity, device trust, micro-segmentation.

## Virtual Machines

| VM | OS | IP | Role |
|---|---|---|---|
| SOC Server | Ubuntu Server 22.04 LTS | 192.168.100.10 | DLP Manager + Wazuh Manager + Snort IDS |
| AXA GO | Windows 10 Enterprise LTSC | 192.168.100.30 | Corporate workstation — DLP Agent + Wazuh Agent |
| AXA AMS | Windows 10 Enterprise LTSC | 192.168.100.20 | Finance workstation — DLP Agent + Wazuh Agent |
| Kali Linux | Kali Linux 2023.1+ | 192.168.100.50 | Pentesting machine (Phase 4) |

**Network:** VMware Host-Only — `192.168.100.0/24` — Gateway `192.168.100.1`

## Files Included

- `docs/architecture/3d-architecture-diagram.drawio`: Architecture diagram (DrawIO).
- `docs/architecture/topology.md`: Detailed network topology and interaction flow.
- `docs/assets/icons/`: SVG icons for each component (SOC Server, AXA GO, AXA AMS, Kali Linux).
- `docs/requirements.md`: Phase-by-phase software and configuration requirements.
- `src/diagram-spec/architecture.json`: JSON node/link graph specification.

## Setup Instructions

1. Create four VMware VMs using the IPs above on a Host-Only network (`192.168.100.0/24`).
2. Follow `docs/requirements.md` for phase-by-phase installation.
3. Validate each phase independently before proceeding to the next.
4. Refer to `docs/architecture/topology.md` for the full interaction flow.