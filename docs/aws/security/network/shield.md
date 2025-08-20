---
title: "AWS Shield"
description: "AWS Shield provides DDoS protection for AWS applications, with Standard protection included automatically and Advanced protection offering enhanced mitigation for sophisticated attacks."
tags:
  [
    "aws",
    "shield",
    "ddos_protection",
    "network_security",
    "cloudfront",
    "route53",
  ]
author: "Nati Cabti"
date: "2025-08-19"
---

# AWS Shield

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/security-network-shield.png" alt="AWS Shield" />
</div>

AWS Shield is a managed Distributed Denial of Service (DDoS) protection service that provides automatic protection against the most common and frequently occurring network and transport layer DDoS attacks. It offers two tiers of protection to meet different security and budget requirements.

## AWS Shield Standard

AWS Shield Standard is designed to automatically protect AWS customers from the most common, frequently occurring types of DDoS attacks at no additional cost. It provides protection for all AWS customers and uses a variety of analysis techniques to detect and mitigate incoming malicious network traffic in real time.

**Key Features:**

- Automatic protection against common DDoS attacks
- No additional charges
- Built-in protection for AWS services
- Real-time attack detection and mitigation

## AWS Shield Advanced

AWS Shield Advanced is a paid service that provides detailed attack diagnostics and the ability to detect and mitigate sophisticated DDoS attacks. It offers enhanced protection capabilities and additional features for mission-critical applications.

**Key Features:**

- Advanced attack mitigation for larger and more complex attacks
- 24/7 access to the DDoS Response Team (DRT)
- Real-time attack notifications
- Enhanced detection and mitigation
- DDoS cost protection
- Integration with AWS WAF at no additional charge

## Use Cases

### Web Application Protection

Protect web applications and APIs from volumetric attacks, state-exhaustion attacks, and application-layer attacks that could render them unavailable to legitimate users.

### Gaming and Media Streaming

Protect real-time applications like online games and video streaming services that are particularly vulnerable to DDoS attacks due to their always-on nature and large user bases.

### E-commerce and Financial Services

Ensure high availability for business-critical applications where downtime directly impacts revenue and customer trust.

### DNS Protection

Protect your DNS infrastructure from attacks that could affect the availability of all your online services.

## Connection to Other AWS Services

**Amazon CloudFront:** Shield automatically protects CloudFront distributions, providing protection at AWS edge locations closest to your users for faster response times.

**Amazon Route 53:** DNS queries are automatically protected by Shield, ensuring your domain name resolution remains available during attacks.

**Elastic Load Balancing:** Application Load Balancers and Network Load Balancers receive automatic Shield Standard protection, with Shield Advanced available for enhanced protection.

**AWS WAF:** Shield Advanced includes AWS WAF at no additional charge, allowing you to create custom rules to mitigate application-layer DDoS attacks.

**Amazon EC2:** Elastic IP addresses are protected by Shield Standard, with Shield Advanced providing enhanced protection and faster response times.

**AWS Global Accelerator:** Receives automatic Shield Standard protection, with Shield Advanced available for applications requiring maximum availability.

## Benefits

**Automatic Protection:** Shield Standard provides baseline DDoS protection for all AWS services without requiring any configuration or management.

**Cost Protection:** Shield Advanced includes DDoS cost protection, which provides credits for scaling charges that result from DDoS attacks.

**Expert Support:** Shield Advanced customers have access to the AWS DDoS Response Team (DRT) for assistance during attacks.

**Real-time Visibility:** Detailed attack diagnostics and real-time notifications help you understand and respond to threats quickly.

**Seamless Integration:** Works transparently with existing AWS services without requiring changes to your applications.

AWS Shield provides essential DDoS protection that scales with your infrastructure, ensuring your applications remain available even during large-scale attacks, while Shield Advanced offers enhanced capabilities for organizations requiring maximum protection and support.
