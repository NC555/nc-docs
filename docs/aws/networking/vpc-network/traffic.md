---
title: "Network Traffic in a VPC"
description: "Network traffic in a VPC refers to the movement of data packets traveling across a network. Understanding how packets flow through VPC components is essential for managing secure and efficient cloud networking."
tags:
  [
    "aws",
    "vpc",
    "networking",
    "traffic",
    "packets",
    "network_acl",
    "internet_gateway",
    "subnet",
    "security",
  ]
author: "Nati Cabti"
date: "2025-08-11"
---

# Network Traffic in a VPC

Network traffic in a VPC refers to the movement of data packets traveling across a network within your Amazon Virtual Private Cloud.

<div class="aws__ImageCentered" >
<img style={{ background: '#f6f9fd', width: '700px', overflowX: 'auto' }} src="/img/aws/aws-vpc-network-traffic.png" alt="VPC Network Traffic Flow" />
</div>

- **Data Packet Flow:** When a customer requests data from an application hosted in the AWS Cloud, this request is sent as a packet
- **Packet Definition:** A packet is a unit of data sent over the internet or a network that contains source, destination, and payload information
- **Gateway Entry Point:** Traffic enters into a VPC through an internet gateway, which serves as the entry and exit point for internet traffic

:::note
Understanding VPC network traffic flow enables proper security configuration, performance optimization, and troubleshooting capabilities.
:::

Use case: Network traffic management is essential for securing applications, controlling access to resources, and ensuring optimal performance in cloud environments.

- **Permission Checks:** Before a packet can enter into a subnet or exit from a subnet, it will run into several checks for permissions
- [**Network ACL Filtering:**] One key permission check is performed by the network ACL (Access Control List) associated with the subnet the packet is being routed to
- **Security Evaluation:** The permissions defined by the network ACLs indicate what is allowed or denied based on who sent the packet and how the packet is trying to communicate with the resources in a subnet

## Key Components in VPC Traffic Flow

**[Internet Gateway:](../internet-gateway.md)** The entry and exit point for internet traffic to and from your VPC

**[Network ACL:](./access-control-list.md)** The VPC component that checks packet permissions for subnets, acting as a subnet-level firewall

**[Subnets:](../subnet.md)** Logical divisions within your VPC where resources are deployed and traffic is routed

**[Security Groups:](./security-groups.md)** Instance-level firewalls that control traffic to and from individual EC2 instances

### Configuring VPC Traffic

With both network ACLs and security groups, you can configure custom rules for the traffic in your VPC.

| **Feature**        | **Security Groups**                                                   | **Network ACLs**                                             |
| ------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Scope**          | Instance level (attached to EC2 instances)                            | Subnet level (associated with subnets)                       |
| **State**          | Stateful (remembers state)                                            | Stateless (doesn't remember state)                           |
| **Rule types**     | Only allow type rules                                                 | Both allow and deny type rules                               |
| **Return traffic** | Return traffic is automatically allowed if inbound traffic is allowed | Return traffic must be implicitly allowed in both directions |
| **Uses**           | Fine-grained control of traffic for individual EC2 instances          | Broad control of traffic in and out of subnets               |

### VPC Traffic Shared Responsibility Model

<div class="aws__ImageCentered" >
<img style={{ background: '#f6f9fd', width: '700px', overflowX: 'auto' }} src="/img/aws/aws-vpc-trafficing-shared-responsibility-model.png" alt="VPC Network Traffic Flow" />
</div>

### Additional Resources

- [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/)
- [Network ACLs Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)
