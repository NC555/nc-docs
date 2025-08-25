---
title: "AWS CloudTrail"
description: "AWS CloudTrail is a service that enables governance, compliance, operational auditing, and risk auditing of your AWS account. It provides a detailed history of user activity and API usage across your AWS infrastructure."
tags:
  [
    "aws",
    "cloudtrail",
    "auditing",
    "security_monitoring",
    "compliance",
    "api_calls",
    "logging",
    "governance",
    "operational_troubleshooting",
  ]
author: "Nati Cabti"
date: "2025-04-16"
---

# AWS CloudTrail

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/cloudtrail.png" alt="AWS CloudTrail" />
</div>

AWS CloudTrail tracks user activity and API usage across the AWS Cloud, on premises, and even with other cloud providers. CloudTrail provides a detailed history of API calls, allowing you to track changes, identify who made them, and when. This comprehensive record helps you understand exactly what actions were taken on your AWS resources.

## Core Benefits

CloudTrail provides essential capabilities for auditing, security monitoring, and operational troubleshooting. It significantly helps organizations prove compliance with various regulations and continuously improve their security posture by offering transparency into AWS account activities.

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/management-governance/aws-cloudtrail-concept.png" alt="AWS Organizations" />

## Use Cases

- **Compliance and Auditing:** Provides immutable logs for regulatory compliance (e.g., PCI, HIPAA) and internal auditing requirements.
- **Identifying Security Incidents:** Helps detect unusual or unauthorized activity, enabling rapid response to potential security threats.
- **Troubleshooting Operational Issues:** Pinpoints the exact API calls or console actions that might have led to an operational problem, streamlining root cause analysis.

## Key Features

### CloudTrail Events

CloudTrail events capture detailed information about actions performed within your AWS account. These include AWS API calls, console actions, and other activities. The Event history provides a viewable, searchable, downloadable, and immutable record of the past 90 days of management events in an AWS Region. There are no CloudTrail charges for viewing event history.

### CloudTrail Logs

CloudTrail monitors events and delivers these events as log files to an Amazon Simple Storage Service (Amazon S3) bucket that you specify. Because CloudTrail logs are securely stored and immutable in S3, they are a reliable source for proving compliance with stringent regulations such as Payment Card Industry (PCI) Data Security Standard and the Healthcare Insurance Portability and Accountability Act (HIPAA).

### CloudTrail Insights

CloudTrail Insights enhances your security and operational monitoring by automatically analyzing your normal patterns of API call volume and API error rates. CloudTrail Insights generates Insights events when API call volumes and error rates deviate significantly from these established normal patterns. You can enable CloudTrail Insights in your trails or event data stores to proactively detect anomalous behavior and unusual activity, providing an early warning system for potential issues.

:::info
AWS CloudTrail is a cornerstone service for maintaining security, operational visibility, and regulatory compliance within your AWS environment, by providing a comprehensive audit trail of all activities.
:::

**Use case:** Ideal for organizations that require a detailed audit log of all activities in their AWS accounts for security, compliance, or operational troubleshooting purposes.

## Additional Resources

- [AWS CloudTrail Documentation](https://docs.aws.amazon.com/cloudtrail/)
- [What is AWS CloudTrail?](https://aws.amazon.com/cloudtrail/what-is-cloudtrail/)
- [Working with CloudTrail Events](https://docs.aws.amazon.com/cloudtrail/latest/userguide/cloudtrail-working-with-events.html)
