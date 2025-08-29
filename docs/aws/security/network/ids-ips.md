---
title: "IDS/IPS Services in AWS"
description: "Protect your AWS infrastructure from network-based threats with comprehensive DDoS protection, web application firewalls, and security controls."
tags:
  [
    "aws",
    "network_security",
    "ddos_protection",
    "waf",
    "shield",
    "security_groups",
  ]
author: "Nati Cabti"
date: "2025-08-19"
---

# **IDS/IPS Services in AWS**

- **IDS :** >Intrusion Detection System
- **IPS :** >Intrusion Prevention System
  These are security technologies that monitor network traffic and system activities for malicious behavior and policy violations.

[IDP & ICS Concepts](../../../system-design-concepts/security/idp-ics)

## **AWS IDS/IPS Services**

| Service                                                                    | Type    | Function                                                                                                    |
| -------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| [**VPC Security groups**](../../networking/vpc-network/security-groups.md) | IPS     | Controls the traffic that is allowed to reach and leave the resources                                       |
| [**VPC ACLs**](../../networking/vpc-network/access-control-list.md)        | IPS     | network access control list (ACL) allows or denies specific inbound or outbound traffic at the subnet level |
| [**AWS GuardDuty**](../detection/guardDuty.md)                             | IDS     | Threat detection using ML, monitors DNS queries, VPC Flow Logs                                              |
| **AWS Network Firewall**                                                   | IDS/IPS | Both detection and prevention with custom Suricata rules                                                    |
| [**AWS WAF**](../network/waf.md)                                           | IPS     | Blocks malicious web requests at application layer                                                          |

## **Real-World Examples**

### **IDS Alert Example**

```
ALERT: Potential SQL Injection Detected
Time: 2025-08-28 14:30:15
Source IP: 203.0.113.45
Target: web-server-1.company.com:443
Pattern: "' OR 1=1--" detected in HTTP POST data
Severity: High
Action: Alert sent to security team, traffic allowed to continue
```

### **IPS Block Example**

```
BLOCKED: Known Malware Command & Control Communication
Time: 2025-08-28 14:35:22
Source IP: 192.168.1.100 (internal)
Destination: malicious-c2.bad-domain.com:8080
Pattern: Zeus botnet communication signature
Action: Connection terminated, internal host quarantined
```

## **IDS/IPS in Your Multi-AZ Architecture**

## **Network Firewall Positioning**

```
Internet → Shield → WAF → IGW → **Network Firewall (IDS/IPS)** → NACL → ALB
```

**What Network Firewall can detect/prevent:**

- Known malware signatures
- Command and control communications
- Lateral movement attempts
- Data exfiltration patterns
- Protocol anomalies
- Suspicious DNS queries

### **Limitations with End-to-End Encryption**

```
[HTTPS Encrypted] → Network Firewall → [Still Encrypted]
```

**Can detect:**

- Connection patterns and metadata
- DNS queries to malicious domains
- Certificate anomalies
- Traffic volume patterns

**Cannot detect:**

- Encrypted payload content
- Application-layer attacks in HTTPS traffic
- SQL injection in encrypted requests

## **Best Practices**

### **1. Layered Approach**

```
Perimeter IPS (Network Firewall) → Host-based IDS (on EC2) → Application IDS
```

### **2. Tuning and Maintenance**

- Regularly update signature databases
- Fine-tune rules to reduce false positives
- Monitor IPS performance impact
- Regular review of detection rules

### **3. Integration with SIEM**

```
IDS/IPS Alerts → CloudWatch → SIEM System → Security Team Response
```

This comprehensive IDS/IPS approach provides multiple layers of threat detection and prevention throughout your network infrastructure.
