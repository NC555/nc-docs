---
title: "Amazon Subnets"
description: "AWS Subnet is a segment of a Virtual Private Cloud (VPC) that allows you to organize your network resources into logical groupings"
tags: ["aws", "networking", "subnet", "public_subnet", "private_subnet"]
author: "Nati Cabti"
date: "2025-08-11"
---

# Amazon Subnets

<div class="aws__DoubleLogosWrapper">
    <div class="aws__ImageAligned">
      <img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-subnet-public.png" alt="Public Subnet" />
      <span>Public Subnet</span>
    </div>
    <div class="aws__ImageAligned">
      <img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-subnet-private.png" alt="Private Subnet" />      
      <span>Private Subnet</span>
    </div>
</div>

AWS Subnets are essentially segments of your [VPC](./vpc.md), allowing you to divide your VPC into smaller, manageable sections. A subnet is a range of IP addresses in your VPC.

- Subnets are used to logically isolate resources within a VPC
- Each subnet is associated with a specific range of IP addresses, and resources within that subnet use these addresses.

## Public Vs Private

- **Public Subnets:** are designed to isolate resources that shouldn't be directly exposed to the public internet. In diagrams, they are illustrated with solid boxes.
- **Private Subnets:** Public subnets are designed to provide direct internet access to resources placed inside them. To allow access, they are connected with an internet gateway. You will learn more about internet gateways in a later lesson. In diagrams, public subnets are drawn with dashed boxes.

<div class="aws__ImageCentered">
<img style={{ background: '#f6f9fd', width: '500px', overflowX: 'auto' }} src="/img/aws/aws-networking-public-private-subnet-diagram.png" alt="Availability Zones" />
</div>
