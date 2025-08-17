---
title: "Network ACLs"
description: "A network ACL is a virtual firewall that controls inbound and outbound traffic at the subnet level. It performs stateless packet filtering to secure your VPC subnets."
tags:
  [
    "aws",
    "vpc",
    "networking",
    "network_acl",
    "firewall",
    "security",
    "subnet",
    "stateless",
    "packet_filtering",
  ]
author: "Nati Cabti"
date: "2025-08-11"
---

# Network ACLs

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-network-acl.png" alt="AWS Network ACL" />
</div>
A network ACL is a virtual firewall that controls inbound and outbound traffic at the subnet level.
- **Subnet-Level Protection:** Acts as a security layer that filters traffic entering and leaving subnets within your VPC
- **Bidirectional Control:** Manages both inbound traffic coming into the subnet and outbound traffic leaving the subnet
- **Rule-Based Filtering:** Uses numbered rules to evaluate traffic, processing rules in order from lowest to highest number

:::info
Network ACLs provide subnet-level security, stateless filtering for performance, and granular traffic control for enhanced network protection.
:::

**Use case :** Network ACLs can be used to create additional security layers, implement compliance requirements, and control traffic flow between different tiers of your application architecture.

:::tip
Think of a network ACL like airport passport control - just as officers check travelers entering and leaving a country, network ACLs check every packet crossing subnet boundaries.
:::

<div class="aws__ImageCentered" >
<img style={{ background: '#f6f9fd', width: '500px', overflowX: 'auto' }} src="/img/aws/aws-network-acl-architecture.png.png" alt="Network ACL Architecture" />
</div>

## Default vs Custom Network ACLs

**Default Network ACL:** Each AWS account includes a default network ACL that comes with your VPC. When configuring your VPC, you can use your account's default network ACL or create custom network ACLs. By default, your account's default network ACL allows all inbound and outbound traffic, but you can modify it by adding your own rules.

**Custom Network ACLs:** For custom network ACLs, all inbound and outbound traffic is denied until you add rules to specify which traffic to allow. Additionally, all network ACLs have an explicit deny rule. This rule makes sure that if a packet doesn't match any of the other rules on the list, the packet is denied.

## Stateless Packet Filtering

Network ACLs perform stateless packet filtering. They remember nothing and check packets that cross the subnet border each way: inbound and outbound.

Recall the previous example of a traveler who wants to enter into a different country. This is similar to sending a request out from an Amazon EC2 instance to the internet. When a packet response for that request comes back to the subnet, the network ACL does not remember your previous request. The network ACL checks the packet response against its list of rules to determine whether to allow or deny.

> This stateless nature means that you must configure rules for both inbound and outbound traffic separately, even for the same connection.

### Additional Resources

- [Network ACLs Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)
- [VPC Security Best Practices](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-best-practices.html)
