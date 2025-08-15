---
title: "AWS PrivateLink"
description: "AWS PrivateLink is a highly available, scalable technology that you can use to privately connect your VPC to services and resources as if they were in your VPC."
tags:
  [
    "aws",
    "infrastructure",
    "connection",
    "client_vpn",
    "networking",
    "secured_connection",
    "shared connection",
  ]
author: "Nati Cabti"
date: "2025-08-11"
---

# AWS PrivateLink

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-private-link.png" alt="AWS PrivateLink Logo" />
</div>

AWS PrivateLink is a highly available, scalable technology that you can use to privately connect your VPC to services and resources as if they were in your [**VPC**](./vpc.md).

> You do not need to use an internet gateway, NAT device, public IP address, Direct Connect connection, or AWS Site-to-Site VPN connection to allow communication with AWS services or resources from your private subnets.

Instead, you control the specific API endpoints, sites, services, and resources that are reachable from your VPC.

- **Benefits:** AWS PrivateLink helps you secure your traffic and connect with simplified management rules.

- **Use case:** It is used for connecting your clients in your VPC to resources, other VPCs, and endpoints.

<div class="aws__ImageCentered" >
<img style={{ background: '#f6f9fd', width: '500px', overflowX: 'auto' }} src="/img/aws/aws-networking-privatelink-concepts.png" alt="VPN Connection" />
</div>

### Additional Resources

- [AWS PrivateLink concepts](https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html)
