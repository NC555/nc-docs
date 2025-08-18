---
title: "Network Address Translation (NAT) Gateway"
description: "A NAT gateway is a managed NAT service that enables instances in private subnets to connect to services outside your VPC while preventing external services from initiating connections to those instances."
tags:
  [
    "aws",
    "infrastructure",
    "networking",
    "nat_gateway",
    "private_subnet",
    "security",
    "outbound_connectivity",
    "managed_service",
  ]
author: "Nati Cabti"
date: "2025-08-11"
---

# Network Address Translation (NAT) Gateway

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/nat-gateway.png" alt="AWS NAT Gateway" />
</div>
A NAT gateway is a NAT service that enables secure outbound internet connectivity for instances in private subnets.
- **Managed Service:** Fully managed by AWS with built-in redundancy and high availability
- **Security Enhancement:** Allows outbound connections while preventing unsolicited inbound connections from the internet
- **Bandwidth Scaling:** Automatically scales bandwidth up to 100 Gbps based on your workload requirements

:::note
NAT Gateway provides secure internet access for private resources, high availability, and requires no management overhead.
:::

Use case: You can use a NAT gateway so that instances in a private subnet can connect to services outside your VPC but external services can't initiate a connection with those instances.

- Ideal for private database servers, application servers, and backend services that need to download updates or access external APIs
- Supports both IPv4 and IPv6 traffic with separate gateway types
- Provides better performance and availability compared to NAT instances

<div class="aws__ImageStart" >
<img style={{ background: '#f6f9fd', width: '300px', overflowX: 'auto' }} src="/img/aws/nat-gateway-concept.png" alt="NAT Gateway Architecture" />
</div>

## Additional Resources

- [Connect to the internet or other networks using NAT devices](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat.html)
