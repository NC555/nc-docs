# Section 03: Critical Infrastructure Security

## 1. Core Concepts

### a. Definition of Critical Infrastructure (CI) and Critical Information Infrastructure (CII)

- **Critical Infrastructure (CI):** Physical and virtual assets, systems, and networks that are so vital to a nation that their incapacitation or destruction would have a debilitating effect on security, national economic security, national public health or safety, or any combination thereof.
- **Critical Information Infrastructure (CII):** The subset of CI that is reliant on information and communication technologies (ICT). This includes the networks, systems, and data that underpin the functionality of all critical sectors.
- **Interdependencies:** Understanding that an attack on one sector (e.g., energy) can have cascading failures across others (e.g., finance, water, transportation).

### b. Key Sectors (ICS/SCADA)

- **Industrial Control Systems (ICS):** A general term that encompasses several types of control systems, including Supervisory Control and Data Acquisition (SCADA) systems, Distributed Control Systems (DCS), and Programmable Logic Controllers (PLC).
- **SCADA:** Systems used to control and monitor industrial processes (e.g., power grids, water treatment plants, oil and gas pipelines).
- **Unique Challenges:**
  - **Legacy Systems:** Long operational life cycles (20+ years) mean many systems lack modern security controls.
  - **Proprietary Protocols:** Non-standard protocols that security tools may not understand.
  - **Real-time Constraints:** Security measures cannot introduce latency that would disrupt physical processes.
  - **Physical Consequences:** A cyber-attack can cause physical destruction, environmental damage, or loss of life.

### c. Threat Models in CI/CII

- **Nation-State Actors:** Highly sophisticated, well-funded adversaries seeking to disrupt national capabilities, conduct espionage, or preposition for future conflict.
- **Cybercriminals:** Increasingly targeting CI for ransomware attacks, exploiting the high-impact nature of service disruption.
- **Insider Threats:** Malicious or unintentional actions by employees, contractors, or trusted partners.
- **Hacktivists & Terrorists:** Seeking to make a political statement or cause widespread panic.

## 2. Government and Classified Environment Context (Israel)

### a. Regulatory Bodies and Directives

- **National Cyber Directorate (INCD - מערך הסייבר הלאומי):** The primary body responsible for defending Israel's civilian cyberspace. Issues directives, provides guidance, and manages national-level incident response.
- **Shin Bet (שב"כ - שירות הביטחון הכללי):** Responsible for the security of the nation's most critical infrastructure against terrorism and espionage. Provides binding directives to organizations deemed essential for national security.
- **Sector-Specific Regulators:**
  - **Nega (נגה - ניהול מערכת החשמל):** Regulates the electricity sector.
  - **Ministry of Health:** Regulates healthcare cybersecurity.
  - **Bank of Israel:** Regulates the financial sector.
- **Key Principle:** Regulation is not a checklist. It is a baseline. Architects must design systems that exceed regulatory requirements based on a thorough risk assessment tailored to the specific threats faced by the organization.

### b. The "Cyber Defense Shield" (הגנת רציפות תפקודית)

- This is not just a technical concept but a national doctrine. It emphasizes **resilience** and **functional continuity** over prevention alone.
- **Architectural Implications:**
  - **Redundancy and Failover:** Designing systems that can withstand the failure of primary components.
  - **Graceful Degradation:** Ensuring that if a system is partially compromised, it can continue to operate essential functions safely.
  - **Manual Override:** The ability for human operators to take control of automated processes in an emergency.
  - **Black Start Capability:** The ability to restore power or operations from a total shutdown without assistance from the external network.

### c. Data Classification in a CI Context

- **Level 1 (Most Critical):** Real-time operational data (e.g., PLC commands, sensor readings). Compromise could lead to immediate physical damage.
- **Level 2:** Engineering and configuration data (e.g., SCADA system configurations, network diagrams). Compromise could enable future attacks.
- **Level 3:** Business and administrative data. Compromise has financial or reputational impact but does not directly endanger physical processes.
- **Architectural Mandate:** Implement strict network segmentation (e.g., using the Purdue Model) to enforce data flow policies based on these classifications. Data should not cross boundaries without rigorous inspection and justification.

## 3. Architectural Security Principles for CI/CII

### a. Purdue Model for ICS Network Segmentation

- A reference architecture for segmenting ICS networks from enterprise (IT) networks.
- **Level 0:** The Physical Process (sensors, actuators).
- **Level 1:** Basic Control (PLCs, controllers).
- **Level 2:** Area Supervisory Control (HMIs, operator workstations).
- **Level 3:** Site Control (historians, engineering workstations).
- **DMZ (Level 3.5):** A buffer zone between IT and OT. All traffic between the enterprise and control networks must pass through this zone.
- **Level 4:** Site Business Planning and Logistics (Enterprise IT network).
- **Level 5:** Enterprise Network.
- **Architect's Role:** Enforce this model with firewalls, unidirectional gateways, and access control lists. The goal is to prevent a compromise in the IT network (Level 4/5) from propagating to the critical OT network (Levels 0-3).

### b. Unidirectional Security Gateways

- **Concept:** A hardware-based device that allows data to flow in only one direction. It is physically incapable of transmitting data back.
- **Use Case:** Essential for sending data from the highly secure OT network to the less secure IT network for analysis (e.g., sending operational data to a business intelligence platform) without creating a pathway for attacks to come back into the OT network.
- **Architectural Placement:** Typically placed in the DMZ (Level 3.5) to protect the boundary to the OT network.

### c. Secure Remote Access

- **The Challenge:** Providing remote access for maintenance and support without exposing the control network.
- **Insecure Method:** Direct VPN access to the OT network (highly discouraged).
- **Secure Architecture:**
  1. **Multi-Factor Authentication (MFA):** Mandatory for all remote users.
  2. **Jump Host/Bastion Host:** Users connect to a hardened server in the DMZ.
  3. **Session Monitoring and Recording:** All remote sessions are recorded for audit and forensic analysis.
  4. **Least Privilege:** Remote users are granted access only to the specific systems and for the specific time they need.
  5. **Vendor-Specific Solutions:** Utilizing secure remote access platforms designed for ICS environments.

## 4. Interview Preparation: Scenario-Based Questions

- **Question:** "You are designing the security architecture for a new water treatment facility. The board wants to use a cloud-based analytics platform to optimize operations. How do you architect a solution that allows data to be sent to the cloud securely without exposing the plant's control systems?"

  - **Expected Answer:**
    - Start with the Purdue Model for segmentation.
    - Collect data from Level 2/3 into a historian database.
    - Use a **unidirectional gateway** to transfer data from the OT network historian to a server in the IT/DMZ network.
    - The server in the IT network is then responsible for sanitizing and forwarding the data to the cloud platform.
    - Emphasize that no direct connection from the cloud or IT network back into the OT network is ever permitted.

- **Question:** "A legacy SCADA system in a power substation, which uses an unencrypted proprietary protocol, needs to be monitored by a central Security Operations Center (SOC). How would you achieve this?"

  - **Expected Answer:**
    - Acknowledge the risk of the unencrypted protocol.
    - Propose deploying a specialized ICS-aware Intrusion Detection System (IDS) sensor on a SPAN/mirror port on the OT network switch.
    - This sensor understands the proprietary protocol (Deep Packet Inspection) and can identify anomalous behavior.
    - The sensor would send alerts (not raw traffic) unidirectionally to the central SOC.
    - Mention the importance of network tapping to avoid impacting the real-time performance of the control network.

- **Question:** "During a national emergency, the INCD has issued a directive to immediately disconnect all critical infrastructure from the internet. What architectural features would you need to have in place to comply while ensuring the plant can still operate safely?"
  - **Expected Answer:**
    - Reference the concept of "functional continuity."
    - The primary internet ingress/egress points should be architected for rapid shutdown.
    - The system must be able to operate in an "island mode."
    - This requires having on-site systems for all critical functions (e.g., local historian, local HMI).
    - Operators must be trained for **manual control** procedures.
    - This highlights the importance of not being solely reliant on cloud or remote services for core operations.
