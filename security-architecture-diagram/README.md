# Security Architecture Diagram

This project provides a comprehensive overview of a layered defense architecture utilizing various security components. The central element of this architecture is an Ubuntu server, which hosts critical security tools including Wazuh, Data Loss Prevention (DLP), and Snort Intrusion Detection System (IDS).

## Architecture Overview

The architecture diagram illustrates the following components:

- **Ubuntu Server**: The core of the architecture, responsible for managing Wazuh, DLP, and Snort IDS.
- **Windows Finance**: A DLP agent that monitors financial data and ensures compliance with data protection regulations.
- **Windows RH**: Another DLP agent focused on protecting sensitive data related to human resources.
- **Kali Linux**: A penetration testing environment used to assess the security posture of the architecture.

## Files Included

- `docs/architecture/3d-architecture-diagram.drawio`: Contains the 3D architecture diagram.
- `docs/architecture/topology.md`: Provides a detailed description of the network topology.
- `docs/assets/icons/`: Contains SVG icons for each component in the architecture.
- `docs/requirements.md`: Outlines the requirements for setting up the architecture.
- `src/diagram-spec/architecture.json`: Contains the JSON specification for the architecture diagram.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the `docs` directory to access the architecture diagram and documentation.
3. Follow the instructions in `docs/requirements.md` to set up the necessary software and configurations.

## Usage Guidelines

Refer to the `topology.md` file for detailed interactions between components and best practices for maintaining security within the architecture. 

For any issues or contributions, please refer to the project's issue tracker.