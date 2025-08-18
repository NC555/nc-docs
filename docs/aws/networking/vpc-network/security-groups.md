---
title: "Security Groups"
description: "A security group is a virtual firewall that controls inbound and outbound traffic at the resource level. It performs stateful packet filtering to secure individual AWS resources like EC2 instances."
tags:
  [
    "aws",
    "vpc",
    "networking",
    "security_group",
    "firewall",
    "security",
    "ec2",
    "stateful",
    "packet_filtering",
    "resource_level",
  ]
author: "Nati Cabti"
date: "2025-08-11"
---

# Security Groups

A security group is a virtual firewall that controls inbound and outbound traffic at the resource level. After a packet has entered a subnet, it must have its permissions evaluated for resources within the subnet, such as Amazon EC2 instances.

<div class="aws__ImageStart" >
<img style={{ background: '#f6f9fd', width: '300px', overflowX: 'auto' }} src="/img/aws/security-group-diagram.png" alt="Security Group Architecture" />
</div>

- **Resource-Level Protection:** Acts as a security layer that filters traffic for specific AWS resources like EC2 instances
- **Instance-Specific Control:** Each security group can be associated with one or multiple instances, providing granular resource-level security
- **Rule-Based Access:** Uses custom rules to determine which traffic should be allowed, with all other traffic being denied by default

:::info
Security groups provide resource-level security, stateful filtering for seamless connections, and flexible association with multiple AWS resources for comprehensive protection.
:::

**Use case:** Security groups are essential for controlling access to individual resources, implementing least-privilege access principles, and creating secure application tiers with specific traffic requirements.

:::tip
Think of a security group like an apartment building's door attendant - just as the attendant checks guests entering the building but doesn't need to verify them again when they leave, security groups remember approved connections and automatically allow return traffic.
:::

<div class="aws__ImageStart" >
<img style={{ background: '#f6f9fd', width: '700px', overflowX: 'auto' }} src="/img/aws/security-group-architecture.png" alt="Security Group Architecture" />
</div>

## Default Security Group Behavior

**Default Inbound Rules:** By default, a security group denies all inbound traffic. This means no external traffic can reach your resources unless you explicitly create rules to allow it. This default-deny approach ensures maximum security by requiring you to intentionally open access.

**Default Outbound Rules:** Security groups allow all outbound traffic by default. This enables your resources to communicate with external services, download updates, and access the internet without additional configuration. However, you can modify these rules to restrict outbound traffic if needed.

## Custom Rules and Configuration

With security groups, you can add custom rules to configure which traffic should be allowed. These rules can be configured separately for inbound and outbound traffic, giving you precise control over your resource's network access.

**Rule Components:** Each security group rule specifies the protocol (TCP, UDP, ICMP), port range, and source (for inbound) or destination (for outbound) traffic. Sources and destinations can be IP addresses, CIDR blocks, or other security groups.

**Multiple Instance Association:** If you have multiple Amazon EC2 instances within the same VPC, you can associate them with the same security group for consistent policies, or use different security groups for each instance to implement varied security requirements.

## Stateful Packet Filtering

Security groups perform stateful packet filtering, which means they remember previous decisions made for incoming packets. This stateful nature provides several advantages over stateless filtering.

When you send a request from an Amazon EC2 instance to the internet, the security group tracks this outbound connection. When the response packet returns to the instance, the security group remembers your previous request and automatically allows the response to proceed, regardless of the configured inbound security group rules.

> This stateful behavior eliminates the need to create separate rules for response traffic, simplifying security group management and ensuring seamless communication flows.

## Security Groups vs Network ACLs

While both security groups and network ACLs provide network security, they operate at different levels and have distinct characteristics:

**Security groups** operate at the resource level with stateful filtering, while **network ACLs** operate at the subnet level with stateless filtering. Security groups have a default-deny inbound policy, whereas the default network ACL allows all traffic. This layered approach provides defense in depth for your VPC resources.

## Additional Resources

- [Security Groups Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- [Security Group Rules Reference](https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules-reference.html)
- [VPC Security Best Practices](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-best-practices.html)
