---
title: "Amazon GuardDuty"
description: "Amazon GuardDuty provides intelligent threat detection across your AWS infrastructure and resources by continuously monitoring network activity and account metadata."
tags:
  [
    "aws",
    "guardduty",
    "threat_detection",
    "machine_learning",
    "security_monitoring",
    "anomaly_detection",
  ]
author: "Nati Cabti"
date: "2025-08-19"
---

# Amazon GuardDuty

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/security-detection-guard-duty.png" alt="Amazon GuardDuty" />
</div>

Amazon GuardDuty provides intelligent threat detection across your infrastructure and resources. GuardDuty identifies threats by continuously monitoring streams of your account metadata and network activity in your environment. It uses known malicious IP addresses, anomaly detection, and machine learning to identify threats more accurately.

## Core Functionality

**Continuous Monitoring:** Analyzes data streams from AWS CloudTrail, VPC Flow Logs, and DNS logs to provide comprehensive visibility into account and network activity.

**Intelligent Threat Detection:** Uses machine learning, anomaly detection, and integrated threat intelligence to identify and prioritize potential threats.

**No Agent Required:** Operates without requiring any software or agents to be deployed on your resources, ensuring no performance impact on your workloads.

**Prioritized Findings:** Delivers detailed and actionable security findings that include severity levels and remediation recommendations.

## How It Works

GuardDuty processes massive volumes of data from multiple AWS data sources and applies machine learning and threat intelligence to detect suspicious activity. It looks for patterns such as unusual API calls, communication with known malicious IP addresses, and reconnaissance activity that could indicate a security threat.

## Use Cases

### Malware and Botnet Detection

Identify instances that are communicating with known command-and-control servers or participating in botnet activities.

### Compromised Resource Detection

Detect EC2 instances or IAM credentials that may have been compromised and are being used for malicious purposes, such as cryptocurrency mining or data exfiltration.

### Reconnaissance Detection

Identify unusual network activity, such as port scanning or unusual API activity, that could indicate an attacker is probing your environment.

### Insider Threat Detection

Detect unusual behavior from within your organization, such as attempts to access unauthorized resources or disable security controls.

## Connection to Other AWS Services

**AWS Security Hub:** GuardDuty findings are automatically sent to Security Hub for centralized security monitoring and incident management.

**Amazon Detective:** Investigate the root cause of GuardDuty findings using Detective's interactive visualizations and behavior graphs.

**Amazon EventBridge:** Trigger automated remediation workflows, such as isolating a compromised instance or revoking credentials, when GuardDuty generates a finding.

**AWS Lambda:** Use Lambda functions to build custom, automated responses to security threats detected by GuardDuty.

**AWS Organizations:** Centrally manage GuardDuty across all accounts in your organization for consistent threat detection.

## Key Features

**Machine Learning Powered:** Utilizes advanced machine learning models to detect anomalies and identify sophisticated threats that might otherwise be missed.

**Integrated Threat Intelligence:** Leverages threat intelligence feeds from AWS and third-party security partners to identify known malicious actors and activity.

**Multi-Account Management:** Easily enable and manage GuardDuty across all your AWS accounts from a single master account.

**Detailed Findings:** Each finding provides a comprehensive description of the threat, the affected resources, and recommended remediation steps.

## Benefits

**Broad Visibility:** Provides comprehensive visibility into account and network activity across your AWS environment without requiring additional software.

**Accurate Detection:** High-fidelity threat detection with low false positive rates, thanks to machine learning and integrated threat intelligence.

**Automated and Scalable:** Continuously monitors your environment and scales automatically to handle growing data volumes and workloads.

**Cost-Effective:** Pay only for the data you analyze, with a free trial and predictable pricing based on log data volume.

**Simplified Security:** Easy to enable with a single click in the AWS Management Console, providing immediate threat detection capabilities.

Amazon GuardDuty simplifies threat detection by providing intelligent, continuous monitoring of your AWS environment, enabling you to quickly identify and respond to potential security threats before they can impact your business.
