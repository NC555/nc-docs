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

AWS Transit Gateway is a centralized network transit hub that connects multiple Virtual Private Clouds (VPCs) and on-premises networks through a single gateway, eliminating the complexity of managing multiple peering connections and simplifying network architecture.

- **Centralized Connectivity:** Transit Gateway acts as a hub that connects multiple VPCs and on-premises networks, replacing complex mesh networking topologies with a simplified hub-and-spoke model
- **Global Expansion:** Inter-region peering connects transit gateways across different AWS regions using the AWS Global Infrastructure for worldwide network connectivity
- **Automatic Encryption:** All network traffic between AWS data centers is automatically encrypted at the physical layer, ensuring security without additional configuration
- **Scalable Architecture:** As your cloud infrastructure grows, Transit Gateway scales to accommodate thousands of VPCs and network connections

:::note
Transit Gateway simplifies network management by providing a single point of connectivity for complex multi-VPC and hybrid cloud architectures.
:::

Use case: Transit Gateway is essential for enterprises with multiple VPCs across regions, hybrid cloud deployments, and complex network topologies requiring centralized routing and security policies.

## Core Components and Concepts

**Attachments:** Transit Gateway supports various attachment types that define what can be connected to the gateway, enabling flexible network designs.

**Route Tables:** Transit Gateway uses route tables to control traffic flow between attachments, providing granular control over network connectivity and security policies.

**Associations:** Each attachment connects to exactly one route table, while route tables can serve multiple attachments, creating flexible routing scenarios.

**Route Propagation:** Networks can dynamically advertise routes to Transit Gateway route tables, enabling automatic network discovery and simplified management.

## Transit Gateway Attachment Types

| **Attachment Type**        | **Description**                                      | **Use Cases**                                       |
| -------------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| **VPC Attachments**        | Connect VPCs to the transit gateway                  | Multi-VPC connectivity, shared services             |
| **VPN Connections**        | Site-to-site VPN connections to on-premises networks | Hybrid cloud connectivity, remote office access     |
| **Direct Connect Gateway** | High-bandwidth dedicated connections to on-premises  | Enterprise connectivity, data center integration    |
| **Peering Connections**    | Connect to other transit gateways                    | Inter-region connectivity, multi-account networking |
| **Connect Attachments**    | SD-WAN and third-party network appliance integration | Advanced routing, network function insertion        |

## Maximum Transmission Unit (MTU) Considerations

**Standard MTU:** Transit Gateway supports an MTU of 8500 bytes for traffic between VPCs, AWS Direct Connect, Transit Gateway Connect, and peering attachments, allowing larger data payloads for improved efficiency.

**VPN Limitations:** VPN connections are limited to an MTU of 1500 bytes due to internet infrastructure constraints and encapsulation overhead.

**Performance Impact:** Larger MTU sizes reduce packet overhead and improve network throughput for bulk data transfers between high-bandwidth connections.

## Route Table Management

**Default Route Table:** Every Transit Gateway includes a default route table that handles routing for attachments unless custom route tables are configured.

**Custom Route Tables:** Additional route tables enable advanced routing scenarios, traffic isolation, and security segmentation between different network segments.

**Dynamic Routes:** Routes can be automatically propagated from VPN connections, Direct Connect gateways, and Connect attachments using Border Gateway Protocol (BGP).

**Static Routes:** VPC attachments and peering connections require manual static route configuration to direct traffic through the Transit Gateway.

## Route Propagation Behaviors

**VPC Route Propagation:** VPCs require static routes in their route tables to send traffic to Transit Gateway, as they do not automatically propagate routes.

**VPN Route Propagation:** VPN connections automatically propagate routes between Transit Gateway and on-premises routers using BGP, enabling dynamic network discovery.

**Direct Connect Route Propagation:** Direct Connect gateways use BGP to advertise allowed prefixes to on-premises routers, facilitating automatic route advertisement.

**Connect Route Propagation:** Connect attachments automatically propagate routes to Transit Gateway route tables by default, simplifying SD-WAN integration.

## Transit Gateway Benefits and Advantages

**Simplified Network Topology:** Replace complex mesh peering architectures with a centralized hub-and-spoke model that reduces management overhead and improves visibility.

**Centralized Routing Control:** Implement consistent routing policies and security controls across all connected networks from a single management point.

**Cost Optimization:** Reduce data transfer costs by eliminating redundant peering connections and optimizing traffic flow through centralized routing.

**Operational Efficiency:** Streamline network operations with unified monitoring, troubleshooting, and configuration management across all connected networks.

## Security and Access Control

**Route Table Isolation:** Use separate route tables to create network segments and control which attachments can communicate with each other.

**Security Group Integration:** Leverage existing VPC security groups to control traffic at the instance level while Transit Gateway handles network-level routing.

**Network ACL Support:** Apply subnet-level access controls within VPCs while Transit Gateway manages inter-VPC and hybrid connectivity.

**Monitoring and Logging:** Enable VPC Flow Logs and CloudWatch metrics to monitor traffic patterns and detect security anomalies across the entire network.

## Inter-Region Connectivity

<div class="aws__ImageCentered" >
<img style={{ background: '#f6f9fd', width: '700px', overflowX: 'auto' }} src="/img/aws/transit-gateway-inter-region.png" alt="Inter-Region Transit Gateway Peering" />
</div>

**Global Network Expansion:** Connect Transit Gateways across different AWS regions to create a global network infrastructure that spans continents.

**Automatic Encryption:** All inter-region traffic is encrypted automatically at the physical layer without impacting performance or requiring additional configuration.

**Bandwidth Scaling:** Inter-region connections can scale bandwidth based on demand, providing flexible capacity for global data transfer requirements.

**Latency Optimization:** AWS Global Infrastructure ensures optimal routing paths between regions to minimize latency for critical applications.

## Best Practices for Transit Gateway Implementation

**Network Segmentation:** Design route tables to create logical network segments based on security requirements, compliance needs, and operational boundaries.

**IP Address Planning:** Carefully plan CIDR blocks across all connected VPCs and on-premises networks to avoid conflicts and ensure scalability.

**Monitoring Strategy:** Implement comprehensive monitoring using CloudWatch metrics, VPC Flow Logs, and AWS Config to maintain visibility across the entire network.

**Cost Management:** Monitor data transfer costs and optimize routing policies to minimize unnecessary cross-region or cross-availability-zone traffic.

## Transit Gateway Shared Responsibility Model

<div class="aws__ImageCentered" >
<img style={{ background: '#f6f9fd', width: '700px', overflowX: 'auto' }} src="/img/aws/transit-gateway-shared-responsibility.png" alt="Transit Gateway Shared Responsibility Model" />
</div>

AWS manages the underlying Transit Gateway infrastructure, inter-region connectivity, and automatic encryption, while customers are responsible for route table configuration, attachment management, security policies, and network design.

## Additional Resources

- [AWS Transit Gateway User Guide](https://docs.aws.amazon.com/vpc/latest/tgw/)
- [Transit Gateway Route Tables](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html)
- [Transit Gateway Attachments](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-attachments.html)
- [Transit Gateway Monitoring](https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-cloudwatch-metrics.html)
