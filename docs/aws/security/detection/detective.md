---
title: "Amazon Detective"
description: "Amazon Detective helps you analyze and investigate the root cause of security threats with interactive visualizations and a unified view of resource interactions."
tags:
  [
    "aws",
    "detective",
    "threat_investigation",
    "root_cause_analysis",
    "security_analytics",
    "incident_response",
  ]
author: "Nati Cabti"
date: "2025-08-19"
---

# Amazon Detective

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/security-detection-detective.png" alt="Amazon Detective" />
</div>

After a threat has been detected, you can use Amazon Detective to further investigate the root cause. Detective helps you analyze threats with interactive visualizations contained in a unified AWS Management Console view. These visualizations include resource and user interactions over a configurable timeline with recommended steps for remediation.

## Core Functionality

**Automated Data Collection:** Automatically collects and processes log data from AWS CloudTrail, VPC Flow Logs, and Amazon GuardDuty findings to build a comprehensive view of your security data.

**Behavior Graph:** Creates a behavior graph that models relationships between resources, users, and API calls, providing context for security investigations.

**Interactive Visualizations:** Provides interactive dashboards and visualizations that help you explore security events, identify patterns, and understand the scope of an incident.

**Root Cause Analysis:** Simplifies root cause analysis by providing a timeline of events and contextual information that helps you trace the origin of a security finding.

## How It Works

Detective ingests and analyzes trillions of events from multiple data sources and uses machine learning to build a graph model of your AWS environment. When a security finding is identified, Detective provides pre-built visualizations and analytics that help you quickly understand the context and history of the event.

## Use Cases

### Incident Investigation

Drill down into security findings from services like Amazon GuardDuty to understand the full scope of a security incident, including all affected resources and user accounts.

### Threat Hunting

Proactively search for security threats and anomalies by exploring the behavior graph and identifying unusual patterns of activity.

### Root Cause Analysis

Determine the root cause of a security event by examining the sequence of actions and resource interactions that led to the incident.

### Compliance and Auditing

Provide detailed investigation reports and evidence for compliance audits and internal security reviews.

## Connection to Other AWS Services

**Amazon GuardDuty:** Investigate GuardDuty findings directly from the GuardDuty console by pivoting to Detective for deeper analysis.

**AWS Security Hub:** Start investigations from Security Hub by selecting a finding and using the "Investigate in Detective" action.

**AWS CloudTrail:** Detective automatically ingests CloudTrail logs to provide detailed information about API calls and user activity.

**Amazon VPC:** Uses VPC Flow Logs to analyze network traffic patterns and identify unusual communication between resources.

**AWS Organizations:** Enable Detective across all accounts in your organization for centralized security investigation capabilities.

## Key Features

**Unified Security View:** Provides a single, unified view of security data from multiple sources, eliminating the need to manually collect and correlate logs.

**Timeline Analysis:** Explore a timeline of events to understand the sequence of actions that occurred before, during, and after a security incident.

**Profile Panels:** View detailed profiles of resources and users, including historical activity, related findings, and normal behavior patterns.

**Contextual Visualizations:** Interactive charts and graphs help you visualize relationships and anomalies, making it easier to spot suspicious activity.

## Benefits

**Faster Investigations:** Significantly reduce the time it takes to investigate security incidents by automating data collection and providing contextual visualizations.

**Simplified Analysis:** Eliminates the complexity of manual log analysis and correlation, making it easier for security teams to conduct effective investigations.

**Deeper Insights:** Gain a deeper understanding of security events by exploring the full context of resource and user interactions.

**No Upfront Costs:** Pay only for the data you analyze, with no long-term commitments or upfront fees.

**Easy to Enable:** Enable Detective with a few clicks in the AWS Management Console and start investigating security findings immediately.

Amazon Detective empowers security teams to conduct faster, more effective investigations by providing the tools and context needed to understand the root cause of security incidents and respond to threats more efficiently.
