---
title: "Multi AZs Secured VPC Networking Hybrid"
description: "Multi AZs Secured VPC is a comprehensive AWS Hybrid architecture that effectively illustrates a secure, highly available multi-AZ deployment with both internet and private connectivity options"
tags:
  [
    aws,
    fundamentals,
    global_infrastructure,
    regions,
    availability_zones,
    edge_locations,
    government_cloud,
    security,
  ]
author: "Nati Cabti"
date: 2025-08-11
---

# Multi Availabilty Zones Hybrid Architecture

Multi AZs Secured VPC is a comprehensive AWS architecture that effectively illustrates a secure, highly available multi-AZ deployment with both internet and private connectivity options.

## Multi AZs Secured VPC Diagram Hybrid

<img style={{ overflowX: 'scroll' }} src="/img/aws/az-secured-networking-hybrid.svg" alt="AWS Advanced PAAS Architecture Diagram" />

## Overall Architecture Components

Let highlight a few additional points about how these components work together, especially regarding security controls

1. **Perimeter Security**:
   - **AWS Shield** provides the first layer of defense against DDoS attacks
   - **AWS WAF** sits behind Shield and filters malicious web requests based on rules (SQL injection, XSS, etc.)
2. **VPC Entry**:
   - Traffic passes through the **Internet Gateway** as the entry point to the VPC
   - **Network Firewall** provides network-level protection with stateful, deep packet inspection
3. **Load Distribution**:
   - **Elastic Load Balancer (ELB)** distributes traffic across all three Availability Zones
   - ELB performs health checks and routes requests only to healthy instances
4. **Multi-AZ Architecture**:
   - Traffic flows to public subnets in all three AZs (IL-C1-AZ1, IL-C1-AZ2, IL-C1-AZ3)
   - Security Groups protect individual resources in each subnet
   - Network ACLs provide subnet-level protection across all subnets
5. **Private Connection**:
   - **Direct Connect** provides a dedicated private connection from on-premises network to AWS
   - Traffic through Direct Connect bypasses the internet and connects directly to the private subnet in IL-C1-AZ3
6. **Monitoring and Logging**:
   - **Flow Logs** capture network traffic information
   - **CloudWatch** aggregates and visualizes logs, metrics, and alarms
   - **CloudTrail** records API calls and account activity for governance and compliance
7. **Security Layers in Action**:
   - Internet traffic: Internet → Shield → WAF → Internet Gateway → Network Firewall → ELB → Public Subnet → Security Group → Resource
   - Private traffic: On-Premises → Direct Connect → Private Subnet in AZ3 → Security Group → Resource  
      This enhanced architecture demonstrates a comprehensive security approach with multiple layers of protection, high availability across three AZs, private connectivity options, and robust monitoring capabilities.

### Security Layers in Depth

1. **External Security Layer**:

   - AWS Shield and WAF work together as your first line of defense, with Shield blocking volumetric DDoS attacks and WAF filtering application-level threats
   - This protects your infrastructure before traffic even reaches your VPC

2. **Network Security Layer**:

   - Network Firewall provides deep packet inspection and stateful traffic filtering
   - It can block traffic based on domain names, IP addresses, and protocol patterns
   - Unlike Security Groups and NACLs, Network Firewall can inspect the actual content of packets

3. **Subnet Security Layer**:

   - NACLs act as stateless subnet-level controls that filter traffic entering or leaving subnets
   - A single NACL in your diagram controls traffic for all subnets, though you could also use separate NACLs for different subnet groups

4. **Instance Security Layer**:
   - Security Groups (SG1-SG6) provide stateful instance-level protection
   - They're the most granular control and can be tailored to specific application requirements

### Data Path Nuances

- **Load-Balanced Traffic Flow**:

  - The ELB acts as both a security component and availability component
  - It terminates connections, inspects requests, and can include SSL/TLS offloading
  - Health checks prevent traffic from being sent to failed instances

- **Cross-AZ Communication**:

  - Though not explicitly shown, resources in different AZs can communicate with each other
  - This communication still passes through Security Groups but stays within the VPC

- **Direct Connect Considerations**:
  - The Direct Connect path bypasses many of the internet-facing security controls
  - Security for this path relies on the private nature of the connection and the Security Groups

### Monitoring Integration

The monitoring components (CloudWatch, CloudTrail, Flow Logs) form a comprehensive visibility layer:

- Flow Logs capture raw network traffic data
- CloudWatch provides metrics, visualization, and alerting
- CloudTrail audits API calls and configuration changes

This layered security approach follows the defense-in-depth principle, ensuring that if one control fails, others are in place to maintain security. The multi-AZ design provides both high availability and geographic redundancy, making this architecture resilient to both component failures and AZ outages.

## Data Flow Explanation

1. **Perimeter Security**:
   - **AWS Shield** provides the first layer of defense against DDoS attacks
   - **AWS WAF** sits behind Shield and filters malicious web requests based on rules (SQL injection, XSS, etc.)
2. **VPC Entry**:
   - Traffic passes through the **Internet Gateway** as the entry point to the VPC
   - **Network Firewall** provides network-level protection with stateful, deep packet inspection
3. **Load Distribution**:
   - **Elastic Load Balancer (ELB)** distributes traffic across all three Availability Zones
   - ELB performs health checks and routes requests only to healthy instances
4. **Multi-AZ Architecture**:
   - Traffic flows to public subnets in all three AZs (IL-C1-AZ1, IL-C1-AZ2, IL-C1-AZ3)
   - Security Groups protect individual resources in each subnet
   - Network ACLs provide subnet-level protection across all subnets
5. **Private Connection**:
   - **Direct Connect** provides a dedicated private connection from on-premises network to AWS
   - Traffic through Direct Connect bypasses the internet and connects directly to the private subnet in IL-C1-AZ3
6. **Monitoring and Logging**:
   - **Flow Logs** capture network traffic information
   - **CloudWatch** aggregates and visualizes logs, metrics, and alarms
   - **CloudTrail** records API calls and account activity for governance and compliance
7. **Security Layers in Action**:
   - Internet traffic: Internet → Shield → WAF → Internet Gateway → Network Firewall → ELB → Public Subnet → Security Group → Resource
   - Private traffic: On-Premises → Direct Connect → Private Subnet in AZ3 → Security Group → Resource  
      This enhanced architecture demonstrates a comprehensive security approach with multiple layers of protection, high availability across three AZs, private connectivity options, and robust monitoring capabilities.

## Architecture pay-as-you-go AWS services

This network architecture consumes several pay-as-you-go AWS services. The pricing details can vary based on AWS Region and specific configurations, so the prices listed below are typical examples and might not be exact for all regions. Always refer to the official AWS pricing pages for the most up-to-date and accurate information.

Here's a table outlining the pay-as-you-go services depicted:

| Service                                                                   | Tags                                                  | Role                                                                                                                                     | Unit of Measure                                                                   | Free Tier Rate Limit                                                                       | Price per Unit After Free Tier (Approx. USD, per region)                                                                                                     |
| :------------------------------------------------------------------------ | :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWS Shield Standard**                                                   | - network<br/>- security<br/>- ddos                   | Provides always-on detection and automatic inline mitigations for common DDoS attacks.                                                   | Included with other AWS services.                                                 | Always-on and automatically enabled for all AWS customers at no additional cost.           | Free. (AWS Shield Advanced is a paid subscription service.)                                                                                                  |
| **AWS WAF**                                                               | - network<br/>- security<br/>- waf                    | Helps protect web applications from common web exploits that could affect application availability or compromise security.               | Web ACLs (count), Rules (count), Requests processed (count).                      | No specific free tier.                                                                     | Web ACL: $5.00/Web ACL/month; Rules: $1.00/rule/month (up to 10 rules); Requests: $0.60 per million requests.                                                |
| **AWS CloudTrail**                                                        | - network<br/>- logging<br/>- api-log                 | Records API calls and related events made in your AWS account.                                                                           | Management events (count), Data events (count).                                   | 1 trail per account for management events (one copy of management events delivered to S3). | Management Events: $2.00 per 100,000 events; Data Events: $0.10 per 100,000 events.                                                                          |
| **Internet Gateway (IGW)**                                                | - networking<br/>- comms<br/>- gateway                | Enables communication between instances in your VPC and the internet.                                                                    | Data transfer out (GB).                                                           | 100 GB of Data Transfer Out (aggregated across all AWS services).                          | Standard EC2 data transfer out rates (e.g., $0.09/GB for first 10TB/month). Data transfer in is free.                                                        |
| **AWS Network Firewall**                                                  | - networking<br/>- security<br/>- firewall            | Managed firewall service for your VPCs, providing stateful inspection and intrusion prevention.                                          | Firewall endpoint usage (per hour), Data processed (GB).                          | No specific free tier.                                                                     | Firewall Endpoint: ~$0.40/hour per AZ; Data Processed: ~$0.065/GB.                                                                                           |
| **Public Subnet**                                                         | - vpc                                                 | Logical division within VPC for resources with public internet access                                                                    | Logical Config                                                                    |                                                                                            | Free                                                                                                                                                         |
| **Private Subnet**                                                        | - vpc                                                 | Logical division within VPC for resources without direct internet access.                                                                | Logical Config                                                                    |                                                                                            | Free                                                                                                                                                         |
| **Elastic Load Balancer (ELB) - Application Load Balancer (ALB) assumed** | - networking<br/>- balancer                           | Distributes incoming application traffic across multiple targets in multiple Availability Zones.                                         | Load Balancer Capacity Units (LCUs) per hour, Load Balancer hours.                | 750 hours (aggregated for ALB/NLB), 15 GB of LCU capacity per month.                       | Load Balancer hours: ~$0.0225/hour; LCU-hours: ~$0.008/LCU-hour.                                                                                             |
| **AWS Direct Connect**                                                    | - networking<br/>- private-network                    | Establishes a dedicated network connection from your premises to AWS.                                                                    | Port hour (based on connection speed), Data transfer out (GB).                    | No specific free tier.                                                                     | Port Hour: Varies by speed (e.g., 1 Gbps ~$0.30/hour, 10 Gbps ~$2.25/hour); Data Transfer Out: Varies by region (e.g., ~$0.02/GB). Data transfer in is free. |
| **Network ACL (NACL)**                                                    | - networking<br/>- security<br/>- firewall<br/>- free | Subnet-level stateless firewall for controlling inbound/outbound traffic.                                                                | Rules                                                                             | Unlimited                                                                                  | Free                                                                                                                                                         |
| **Security Group (SG)**                                                   | - networking<br/>- security<br/>- firewall<br/>- free | Instance-level stateful firewall for controlling inbound/outbound traffic.                                                               | Rules                                                                             | Unlimited                                                                                  | Free                                                                                                                                                         |
| **Amazon VPC Flow Logs**                                                  | Logging                                               | Captures information about IP traffic going to and from network interfaces in your VPC. Used for network monitoring and troubleshooting. | GB of log data ingested.                                                          | No specific free tier for Flow Logs ingestion.                                             | $0.50 per GB of Flow Log data published to CloudWatch Logs.                                                                                                  |
| **Amazon CloudWatch**                                                     | Monitoring & Observability                            | Monitoring and observability service, used here for ingesting and storing VPC Flow Logs.                                                 | Log data ingested (GB), Log data stored (GB), Alarms (count), Dashboards (count). | 5 GB Log data ingestion, 5 GB Log data storage, 10 Alarms, 3 Dashboards.                   | Log Ingestion: $0.50/GB; Log Storage: $0.03/GB/month; Alarms: $0.10/alarm/month; Dashboards: $3.00/dashboard/month.                                          |

**Important Considerations:**

- **EC2 Instances/Compute:** While not explicitly shown, Public and Private Subnets typically contain compute resources (e.g., EC2 instances, Containers, Serverless functions, Databases). These underlying compute resources would be a significant source of cost, charged based on instance type, runtime, and storage.
- **Data Transfer:** Data transfer out of AWS (egress) is almost always charged, and rates vary based on the destination and the service. Data transfer within the same Availability Zone or into AWS (ingress) is generally free.
- **IP Addresses:** Public IP addresses (Elastic IPs) are free when associated with a running instance. If Elastic IPs are allocated to your account and not associated with a running instance, or associated with a stopped instance, they incur a small hourly charge.
- **Regional Pricing:** All prices provided are examples and can vary significantly by AWS Region.
- **Free Tier Limits:** The AWS Free Tier often applies to new accounts for 12 months, or perpetually for certain services. Crossing these limits will incur standard charges.
