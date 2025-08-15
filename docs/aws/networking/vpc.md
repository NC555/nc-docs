---
title: "Amazon VPC"
description: "An Amazon VPC lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define."
tags: ["aws", "networking", "vpc"]
author: "Nati Cabti"
date: "2025-08-11"
---

# Amazon VPC

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-vpc.png" alt="Amazon VPC" />
</div>

An Amazon VPC lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.

# Amazon VPC in diagrams

The **AWS Cloud** is the outermost box in most diagrams.

[**AWS Region**](../global-infrastructure/regions.md) is the next box. AWS Regions are separate geographic areas. You choose your Region based on your users' geographic location for lower latency, compliance and data residency requirements, available services, and cost.

**Amazon VPC** is a solid box, and it represents your isolated, logically segmented network within AWS. A VPC helps you to control your network resources and security.

<div class="aws__ImageCentered" >
<img style={{ background: '#f6f9fd', width: '500px', overflowX: 'auto' }} src="/img/aws/aws-networking-vpc-diagram.png" alt="Amazon VPC" />
</div>

[**Availability Zones**](../global-infrastructure/availability-zones.md) are shown as separate boxes across a region. AZs consist of one or more discrete data centers, each with redundant power, networking, and connectivity, and housed in separate facilities. Using multiple AZs can protect your applications from the failure of a single location in the Region.

<div class="aws__ImageCentered">
<img style={{ background: '#f6f9fd', width: '500px', overflowX: 'auto' }} src="/img/aws/aws-networking-subnet-diagram.png" alt="Availability Zones" />
</div>
