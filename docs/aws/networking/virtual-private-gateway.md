---
title: "Virtual Private Gateway"
description: "Virtual Private Gateway is the VPN concentrator on the Amazon side of the Site-to-Site VPN connection."
tags: ["aws", "infrastructure", "networking", "internet_gateway"]
author: "Nati Cabti"
date: "2025-08-11"
---

# Virtual private gateway

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-virtual-private-network.png" alt="Amazon VPC" />
</div>

To allow public traffic from the internet to access your [VPC](./vpc.md), you attach an internet gateway to the VPC.

An internet gateway is a connection between a VPC and the internet. You can think of an internet gateway as being similar to a doorway that customers use to enter the coffee shop. Without an internet gateway, no one can access the resources within your VPC.

<div class="aws__ImageCentered" >
<img style={{ background: '#f6f9fd', width: '500px', overflowX: 'auto' }} src="/img/aws/aws-networking-virtual-private-gateway.png" alt="Virtual Private Gateway" />
</div>
