---
title: "AWS Security: Comprehensive Overview"
description: "Explore AWS security fundamentals including the shared responsibility model, identity management, network protection, data encryption, and threat detection services."
tags:
  [
    "aws",
    "security",
    "iam",
    "encryption",
    "network_security",
    "threat_detection",
    "compliance",
  ]
author: "Nati Cabti"
date: "2025-08-19"
---

# AWS Security: Comprehensive Overview

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/security-identity-compliance.png" alt="AWS Security" />
</div>

AWS provides a comprehensive set of security services and features to protect data, applications, and infrastructure in the cloud. This overview covers the four core concepts of AWS security and the services that support them.

## Authentication and Authorization

- Authentication is the process of verifying the identity of a user or entity through credentials like a username and password combination.
- Authorization grants users certain access rights and permissions that determine which actions they can perform in a system or application.

> For example, an employee logs in to an employee portal (authentication) and can only access their own employee records inside the portal (authorization).

## AWS Shared Responsibility Model

Cloud security is a shared responsibility between customers and AWS. This relationship is defined by the AWS shared responsibility model.

**Customers: Security in the cloud** - When using AWS services, customers maintain complete control over their content and are responsible for securing everything they create and manage in the AWS Cloud.

**AWS: Security of the cloud** - AWS is responsible for security of the cloud, operating, managing, and controlling the components at all layers of the infrastructure.

## Four Core Security Concepts

AWS security controls help you implement comprehensive protection through four core areas:

## Security Services by Category

| Category                                           | Services                                      | Focus Area                                                  |
| :------------------------------------------------- | :-------------------------------------------- | :---------------------------------------------------------- |
| [**Identity & Access Management**](./identity/)    | IAM, IAM Identity Center, Secrets Manager     | Authentication, authorization, credential management        |
| [**Network & Application Protection**](./network/) | Shield, WAF, Security Groups, ELB             | DDoS protection, web application firewall, network security |
| [**Data Protection**](./data/)                     | KMS, Macie, Certificate Manager               | Encryption, key management, data discovery                  |
| [**Detection & Response**](./detection/)           | Inspector, GuardDuty, Detective, Security Hub | Threat detection, investigation, security monitoring        |

## Key Security Principles

**Principle of Least Privilege:**<br/>
You should only give people and systems access to what they need and nothing else. By default, all actions are denied in AWS, and you must explicitly grant permissions.

**Defense in Depth:**<br/>
AWS implements multiple layers of security controls to protect your resources, from the physical infrastructure to application-level security.

**Automation and Monitoring:**<br/>
Many AWS security services use machine learning and automation to detect threats, assess compliance, and respond to incidents faster than manual processes.

:::info
Understanding these core concepts and leveraging the appropriate AWS security services helps you build a robust security posture that protects your applications, data, and users while maintaining compliance with industry standards and regulations.
:::
