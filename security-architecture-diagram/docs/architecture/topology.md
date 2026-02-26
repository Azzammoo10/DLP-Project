# Network Topology Overview

This document provides a detailed description of the network topology for the security architecture, which includes an Ubuntu server as the central component for Wazuh, Data Loss Prevention (DLP), and Snort Intrusion Detection System (IDS). The architecture also incorporates Windows Finance and Windows RH as DLP agents, along with Kali Linux for penetration testing.

## Components

1. **Ubuntu Server**
   - Acts as the central management server.
   - Hosts Wazuh for security monitoring and incident response.
   - Integrates Snort IDS for network intrusion detection.
   - Manages DLP policies and controls.

2. **Windows Finance**
   - Functions as a DLP agent.
   - Monitors sensitive financial data and enforces DLP policies.
   - Communicates with the Ubuntu server for policy updates and alerts.

3. **Windows RH**
   - Serves as another DLP agent.
   - Protects sensitive data related to human resources.
   - Interacts with the Ubuntu server for compliance and reporting.

4. **Kali Linux**
   - Used for penetration testing.
   - Simulates attacks to identify vulnerabilities in the network.
   - Provides feedback to the Ubuntu server for improving security measures.

## Interaction Flow

- The **Ubuntu server** collects logs and alerts from both **Windows Finance** and **Windows RH** DLP agents.
- **Snort IDS** analyzes network traffic and sends alerts to the Ubuntu server for potential threats.
- **Kali Linux** performs penetration tests and reports findings back to the Ubuntu server for remediation.
- All components communicate over a secure network to ensure data integrity and confidentiality.

## Conclusion

This topology outlines a layered defense architecture that leverages various components to enhance security posture. The integration of DLP, IDS, and penetration testing creates a robust framework for protecting sensitive information and responding to threats effectively.