# Section 09: Monitoring, Detection and Response to Events

## 9.1. Security Monitoring and Logging

- **Log Management:** Expertise in collecting, aggregating, and normalizing logs from various sources (e.g., servers, applications, network devices, cloud services).
- **Security Information and Event Management (SIEM):** Proficiency in using SIEM platforms (e.g., Splunk, IBM QRadar, Microsoft Sentinel, Elastic SIEM) for real-time analysis, correlation of events, and alert generation.
- **Threat Intelligence Integration:** Ability to integrate threat intelligence feeds into monitoring tools to enhance detection of known threats.
- **Monitoring Strategy:** Skill in developing and implementing a comprehensive security monitoring strategy that aligns with organizational risk tolerance and compliance requirements.

## 9.2. Threat Detection and Analysis

- **Intrusion Detection and Prevention Systems (IDPS):** Deep knowledge of network-based (NIDS) and host-based (HIDS) intrusion detection systems and their role in identifying malicious activity.
- **Endpoint Detection and Response (EDR):** Experience with EDR solutions (e.g., CrowdStrike Falcon, SentinelOne, Carbon Black) to detect and investigate suspicious activities on endpoints.
- **User and Entity Behavior Analytics (UEBA):** Understanding of how UEBA tools can be used to identify anomalous behavior that may indicate an insider threat or compromised account.
- **Malware Analysis:** Familiarity with techniques for static and dynamic malware analysis to understand the behavior and impact of malicious software.

## 9.3. Incident Response

- **Incident Response Lifecycle:** In-depth knowledge of the incident response lifecycle (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned) based on frameworks like NIST SP 800-61.
- **Playbook Development:** Ability to create and maintain incident response playbooks for various types of security incidents (e.g., ransomware, data breaches, DDoS attacks).
- **Digital Forensics:** Understanding of digital forensics principles and procedures for collecting and preserving evidence in a manner that is legally admissible (chain of custody).
- **Coordination and Communication:** Skill in coordinating with internal teams (e.g., legal, PR, management) and external parties (e.g., law enforcement, regulatory bodies) during an incident.

## 9.4. Vulnerability Management

- **Vulnerability Scanning:** Proficiency in using vulnerability scanning tools (e.g., Nessus, Qualys, Rapid7) to identify security weaknesses in systems and applications.
- **Risk Prioritization:** Ability to prioritize vulnerabilities for remediation based on factors like CVSS score, asset criticality, and threat intelligence.
- **Patch Management:** Knowledge of best practices for patch management to ensure timely remediation of identified vulnerabilities.
- **Reporting and Metrics:** Skill in generating reports and metrics to communicate the status of the vulnerability management program to stakeholders.

## Interview Questions

### Question 1: SIEM and Threat Detection

**Question:** You are designing a security monitoring strategy for a hybrid-cloud environment. How would you leverage a SIEM, and what are the key data sources you would prioritize for ingestion? How would you correlate events to detect a potential multi-stage attack?

### Expected Answer

A robust SIEM strategy is central to visibility in a hybrid environment. The approach involves several key steps:

- **Platform Selection:** Choose a SIEM (e.g., Microsoft Sentinel, Splunk, Elastic SIEM) that has strong support for both on-premises and multi-cloud (AWS, Azure, GCP) data sources.
- **Key Data Sources:**
  - **Cloud:** Cloud provider logs (AWS CloudTrail, Azure Activity Logs), VPC/VNet flow logs, cloud-native security alerts (GuardDuty, Azure Defender), and serverless function logs.
  - **On-Premises:** Firewall and network device logs, Active Directory and authentication logs, server event logs (Windows, Linux), and application logs.
  - **Endpoints:** EDR alerts and detailed process execution logs from all endpoints, regardless of location.
  - **Identity:** Logs from IdPs (e.g., Azure AD, Okta) to track authentication and authorization events across the entire estate.
- **Correlation and Detection:**
  - **Use Case Development:** Develop correlation rules based on threat models like the MITRE ATT&CK framework.
  - **Multi-Stage Attack Example:** To detect a compromised account used to exfiltrate data from a cloud storage bucket, a correlation rule could look for:
    1. An impossible travel alert from the IdP (e.g., login from a new country).
    2. Followed by a privilege escalation event in the cloud IAM service.
    3. Followed by anomalous access to sensitive data in a storage service (e.g., S3, Blob Storage).
    4. Finally, a large data egress event detected via network flow logs.
  - **UEBA Integration:** Utilize User and Entity Behavior Analytics (UEBA) to baseline normal activity and detect deviations that rule-based correlation might miss.

### Question 2: Incident Response Lifecycle

**Question:** Describe the six stages of the NIST Incident Response lifecycle (SP 800-61). Using a ransomware attack as an example, walk through the key activities you would perform at each stage.

### Expected Answer

The NIST Incident Response lifecycle provides a structured approach to handling security incidents. For a ransomware attack, the stages would be:

1.  **Preparation:** This is the proactive phase. It involves developing and testing IR playbooks specifically for ransomware, ensuring backups are available and immutable, deploying EDR solutions, and training staff to recognize phishing attempts.
2.  **Identification:** This phase begins when an incident is detected. We would confirm the incident through alerts from EDR (e.g., detecting file encryption processes), SIEM (e.g., alerts for command-and-control traffic), or user reports. The scope of the incident (which systems are affected) is determined here.
3.  **Containment:** The goal is to stop the bleeding. Key actions include isolating affected endpoints from the network to prevent lateral movement, blocking C2 traffic at the firewall, and disabling compromised user accounts. The strategy might be short-term (disconnecting a host) or long-term (segmenting the network).
4.  **Eradication:** This involves removing the threat from the environment. This means eliminating the malware, removing the attacker's persistence mechanisms, and addressing the root cause vulnerability (e.g., patching an exploited system).
5.  **Recovery:** The focus is on restoring normal operations. This involves restoring data from clean backups to new or rebuilt systems, validating that systems are clean, and carefully re-introducing them into the production environment.
6.  **Lessons Learned (Post-Incident Activity):** Within a week or two of the incident, a post-mortem meeting is held. We analyze what went well, what didn't, and why. The goal is to improve the security posture and the IR process itself. This could lead to updating playbooks, improving monitoring, or investing in new security controls.

### Question 3: Vulnerability Management Program

**Question:** How do you move beyond simply running vulnerability scans to building a mature, risk-based vulnerability management program? Describe how you would prioritize vulnerabilities for a large enterprise.

### Expected Answer

A mature vulnerability management program is about intelligence and risk, not just scanning. The key steps to achieve this are:

- **Comprehensive Asset Inventory:** You can't protect what you don't know you have. Maintain a complete and continuously updated inventory of all hardware, software, and cloud assets.
- **Risk-Based Prioritization:** CVSS score alone is insufficient. Prioritization should be a multi-factor decision:
  1.  **CVSS Score:** As a baseline for technical severity.
  2.  **Threat Intelligence:** Is this vulnerability being actively exploited in the wild? Services like the CISA KEV (Known Exploited Vulnerabilities) catalog are critical here. A vulnerability with a lower CVSS score that is being actively exploited is often a higher priority than a critical one with no known exploits.
  3.  **Asset Criticality:** How important is the affected asset to the business? A critical vulnerability on a development server is less urgent than a moderate one on a customer-facing production database.
  4.  **Business Context:** What is the potential impact of exploitation (e.g., data breach, service outage, reputational damage)?
- **Defined SLAs for Remediation:** Establish and enforce Service Level Agreements (SLAs) for patching based on the calculated risk priority (e.g., Critical: 7 days, High: 30 days, Medium: 90 days).
- **Automation and Integration:** Integrate the vulnerability scanner with ticketing systems (e.g., Jira) to automatically assign remediation tasks to the correct teams. Use patch management tools (e.g., SCCM, Ansible) to automate deployment.
- **Reporting and Metrics:** Go beyond raw vulnerability counts. Report on metrics that matter to leadership, such as "Mean Time to Remediate (MTTR)" by severity, compliance with SLAs, and overall risk score reduction over time. This demonstrates the program's effectiveness and value.
