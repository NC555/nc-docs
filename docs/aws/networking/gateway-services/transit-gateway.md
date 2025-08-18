---
title: "AWS Transit Gateway"
description: "AWS Transit Gateway is a network transit hub that you can use to interconnect your virtual private clouds (VPCs) and on-premises networks. It acts as a cloud router that simplifies your network architecture."
tags:
  [
    "aws",
    "infrastructure",
    "networking",
    "transit_gateway",
    "vpc",
    "connectivity",
    "cloud_router",
    "peering",
  ]
author: "Nati Cabti"
date: "2025-08-11"
---

# AWS Transit Gateway

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/transit-gateway.png" alt="AWS Transit Gateway" />
</div>
AWS Transit Gateway is used to connect your Amazon VPCs and on-premises networks through a central hub.
- **Central Hub Architecture:** Acts as a cloud router that simplifies your network by eliminating complex peering relationships
- **Global Connectivity:** As your cloud infrastructure expands globally, inter-Region peering connects transit gateways together using the AWS Global Infrastructure
- **Scalable Solution:** Supports thousands of VPCs and on-premises connections through a single gateway

:::note
AWS Transit Gateway provides simplified network management, reduced operational overhead, and centralized connectivity control.
:::
Use case: It can be used to connect multiple VPCs across different AWS accounts and regions, as well as on-premises networks through a single point of management.

- Eliminates the need for multiple VPN connections and complex routing configurations
- Supports both AWS Direct Connect and VPN connections for hybrid cloud architectures
- Provides centralized monitoring and management through AWS CloudWatch and VPC Flow Logs

<div class="aws__ImageStart" >
<img style={{ background: '#f6f9fd', width: '300px', overflowX: 'auto' }} src="/img/aws/transit-gateway-overview.png" alt="Transit Gateway Architecture" />
</div>

## Additional Resources

- [AWS Transit Gateway Documentation](https://docs.aws.amazon.com/vpc/latest/tgw/)
