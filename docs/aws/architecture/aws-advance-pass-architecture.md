---
title: "AWS Advanced PAAS Architecture"
description: "This enhanced architecture builds upon the foundational PAAS services with comprehensive security layers, multi-AZ deployment, and hybrid connectivity. The design provides defense in depth through perimeter security, network-level protection, and robust monitoring across three Availability Zones"
tags:
  [
    aws,
    fundamentals,
    paas,
    rds,
    fargate,
    aws_amplify,
    government_cloud,
    security,
  ]
author: "Nati Cabti"
date: 2025-08-11
---

# AWS Advanced PAAS Architecture

The AWS Advanced PAAS Architecture is a comprehensive AWS solution that effectively illustrates a secure, resilient, and highly available multi-AZ deployment leveraging Platform-as-a-Service (PaaS) and serverless components. It features robust security, hybrid connectivity, and a complete CI/CD pipeline for automated deployments.

## Architecture Diagram

<img style={{ width: '1400px', overflowX: 'auto' }} src="/img/aws/aws-pass-enhanced-security.svg" alt="AWS Advanced PAAS Architecture Diagram" />

## Overall Architecture Components

Let's highlight the key components and how they integrate to create a modern, scalable application environment.

1.  **Perimeter & Content Delivery**:
    - **Amazon CloudFront** acts as the Content Delivery Network (CDN), distributing the Angular frontend globally, providing SSL termination, and caching content closer to users.
    - **AWS Shield** provides the first layer of defense against DDoS attacks at the AWS edge.
    - **AWS WAF** filters malicious web requests (e.g., SQL injection, XSS) based on custom rules before they reach the application.
2.  **VPC, Networking & Traffic Inspection**:
    - A **VPC** spans three Availability Zones, segmented into public, private application, private database, and dedicated firewall subnets.
    - Traffic enters through the **Internet Gateway** and is immediately routed to **AWS Network Firewall** endpoints for deep packet inspection and IDS/IPS.
    - **NAT Gateways** in public subnets allow resources in private subnets to initiate outbound internet connections.
3.  **Load Balancing & Application Tier**:
    - **Application Load Balancer (ALB)**, in public subnets, distributes traffic across all three AZs to the containerized application fleet.
    - **Amazon ECS with AWS Fargate** runs containerized Node.js and Python applications in **Private App Subnets**, abstracting away server management.
4.  **Data Tier**:
    - **Amazon RDS for MySQL** is deployed in a Multi-AZ configuration within **Private DB Subnets**, with a primary, a synchronous standby for failover, and an asynchronous read replica to offload read queries.
5.  **Hybrid Connectivity**:
    - **AWS Direct Connect** provides a dedicated, private, high-bandwidth connection from the on-premises network via a **Direct Connect Gateway** and **Virtual Private Gateway**.
6.  **CI/CD Pipeline**:
    - **AWS CodePipeline** orchestrates the entire CI/CD workflow from source to deployment.
    - **AWS CodeBuild** compiles applications and builds Docker images.
    - **Amazon ECR** stores container images and performs vulnerability scanning.
    - **AWS CodeDeploy** handles zero-downtime, blue-green deployments to ECS.
    - **AWS Amplify** builds and deploys the frontend application to **Amazon S3**.
7.  **Monitoring, Logging & Governance**:
    - **Amazon CloudWatch** is the central hub for logs, metrics, and alarms.
    - **AWS CloudTrail** records all API calls for auditing and security analysis.
    - **VPC Flow Logs** capture network traffic information for troubleshooting.
    - **AWS Config** continuously monitors resource configurations for compliance.
    - **AWS Security Hub** aggregates security findings from across the environment.
    - **AWS IAM** provides granular, least-privilege access control for all users and services.

### Security Layers in Depth

This architecture employs a defense-in-depth strategy across multiple layers.

1.  **Perimeter Defense Layer**:
    - **AWS Shield Standard** provides automatic DDoS protection. **AWS Shield Advanced** is an optional upgrade for enhanced protection and access to the 24/7 DDoS Response Team.
    - **AWS WAF**, integrated with CloudFront and the ALB, uses custom rules to block OWASP Top 10 vulnerabilities like SQL injection and cross-site scripting (XSS).
2.  **Network Security Controls**:
    - **AWS Network Firewall** is the core inspection point, deploying stateful firewall endpoints in each AZ for deep packet inspection, IDS/IPS, and URL filtering on all north-south and east-west traffic.
    - **Network ACLs** provide an additional, stateless filtering layer at the subnet boundary.
3.  **Instance & Application Security Layer**:
    - **Security Groups** act as stateful firewalls at the resource level (ECS tasks, RDS instances), enforcing the principle of least privilege. For example, only the App Security Group can communicate with the DB Security Group on the database port.
4.  **Identity & Access Management (IAM)**:
    - IAM is foundational to the security posture, providing granular control over "who can do what." IAM Roles are used extensively to grant services (like ECS tasks and CodeBuild projects) the specific permissions they need to interact with other AWS services without hardcoding credentials.

### Data Flow Explanation

1.  **Internet Traffic Flow**:
    1.  User request hits an **Amazon CloudFront** edge location.
    2.  **AWS Shield** provides DDoS mitigation.
    3.  **AWS WAF** applies application-layer filtering.
    4.  Traffic is routed to the **Internet Gateway** in the region.
    5.  Traffic is routed to the **Network Firewall** endpoint for inspection.
    6.  The **Application Load Balancer** receives the request and performs SSL termination.
    7.  The ALB forwards the request to a healthy **ECS Fargate** task in a private subnet.
    8.  The application queries the **RDS MySQL** database via its private IP address.
2.  **Private/Hybrid Traffic Flow**:
    1.  Traffic from the on-premises network traverses the **Direct Connect** link.
    2.  It enters the VPC via the **Direct Connect Gateway** and **Virtual Private Gateway**.
    3.  VPC Route Tables direct the traffic through the **Network Firewall** for inspection.
    4.  After inspection, traffic is routed to the target resource (e.g., an ECS task or RDS instance) in a private subnet, governed by NACLs and Security Groups.
3.  **Administrative & Management Flow**:
    1.  Administrators use **AWS Systems Manager Session Manager** for secure, browser-based shell access to resources, eliminating the need for open SSH ports.
    2.  All actions are logged by **AWS CloudTrail** for a complete audit trail.
    3.  **AWS Config** continuously checks that resources remain compliant with defined security rules.
    4.  **AWS Security Hub** centralizes findings from Config, GuardDuty, IAM Access Analyzer, and ECR scanning for a unified security view.

### Monitoring Integration

The monitoring components form a comprehensive visibility and observability layer:

- **CloudWatch** serves as the central nervous system, ingesting metrics, logs (from Fargate, RDS, VPC Flow Logs), and events. Alarms are configured to trigger SNS notifications or auto-scaling actions.
- **CloudTrail** provides the "who, what, when" for every API call, crucial for security investigations and compliance.
- **VPC Flow Logs** offer deep network visibility, helping diagnose connectivity issues and detect anomalous traffic patterns.
- **AWS Config** provides a configuration history and ensures the deployed architecture does not drift from its intended, secure state.

## Pay as You Go services

This architecture utilizes several pay-as-you-go AWS services. Prices below are illustrative examples and vary by region.

| Service                       | Tags                                         | Role                                                                             | Unit of Measure                                          | Free Tier Rate Limit                                             | Price per Unit After Free Tier (Approx. USD, per region)                        |
| :---------------------------- | :------------------------------------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **Amazon CloudFront**         | - cdn<br/>- network<br/>- security           | Global CDN for low-latency frontend delivery, SSL termination, and caching.      | Data Transfer Out (GB), Requests (count).                | 1 TB Data Transfer Out, 10M HTTP/S Requests per month.           | Data Transfer: Starts at ~$0.085/GB; Requests: $0.01 per 10,000 HTTPS requests. |
| **AWS Shield Standard**       | - network<br/>- security<br/>- ddos          | Automatic protection against common network and transport layer DDoS attacks.    | Included with other AWS services.                        | Always-on and enabled for all customers at no cost.              | Free. (AWS Shield Advanced is an optional paid upgrade).                        |
| **AWS WAF**                   | - network<br/>- security<br/>- waf           | Protects against OWASP Top 10 vulnerabilities like SQL injection and XSS.        | Web ACLs, Rules, Requests (count).                       | No specific free tier.                                           | Web ACL: $5.00/month; Rule: $1.00/rule/month; Requests: $0.60 per million.      |
| **AWS Network Firewall**      | - networking<br/>- security<br/>- firewall   | Managed stateful inspection, IDS/IPS, and web filtering for VPC traffic.         | Firewall endpoint (per hour), Data processed (GB).       | No specific free tier.                                           | Endpoint: ~$0.395/hour per AZ; Data Processed: ~$0.065/GB.                      |
| **NAT Gateway**               | - networking<br/>- vpc<br/>- egress          | Enables instances in private subnets to initiate outbound internet connections.  | NAT Gateway processing (per GB), NAT Gateway hours.      | No specific free tier.                                           | Gateway Hour: ~$0.045/hour; Data Processed: ~$0.045/GB.                         |
| **Application Load Balancer** | - networking<br/>- balancer                  | Distributes traffic to ECS tasks, performs health checks, and terminates SSL.    | Load Balancer Capacity Units (LCUs) per hour, hours.     | 750 hours/month.                                                 | Hours: ~$0.0225/hour; LCU-hours: ~$0.008/LCU-hour.                              |
| **Amazon ECS on AWS Fargate** | - compute<br/>- container<br/>- serverless   | Serverless compute for containers (Node.js, Python), removing server management. | vCPU per hour, Memory (GB) per hour.                     | No specific free tier.                                           | vCPU: ~$0.04/hour; Memory: ~$0.004/GB/hour.                                     |
| **Amazon RDS for MySQL**      | - database<br/>- rds<br/>- paas              | Managed relational database with Multi-AZ for high availability and failover.    | DB instance hours, Storage (GB/month), I/O (count).      | 750 hours db.t2.micro, 20 GB storage per month.                  | Varies by instance size. Multi-AZ deployment doubles instance cost.             |
| **AWS Direct Connect**        | - networking<br/>- private-network           | Dedicated private network connection from on-premises to AWS.                    | Port hour (by speed), Data transfer out (GB).            | No specific free tier.                                           | Port Hour: 1 Gbps ~$0.30/hour; Data Transfer Out: ~$0.02/GB.                    |
| **Amazon ECR**                | - container<br/>- registry<br/>- cicd        | Stores, manages, and scans Docker container images for vulnerabilities.          | Storage (GB/month), Data Transfer Out (GB).              | 500 MB-month storage (private repos).                            | Storage: $0.10/GB-month; Data Transfer Out: Standard AWS rates.                 |
| **AWS CodePipeline**          | - cicd<br/>- devops                          | Orchestrates CI/CD workflows for automated, zero-downtime deployments.           | Active pipelines (count).                                | 1 free active pipeline per month.                                | $1.00 per active pipeline per month.                                            |
| **AWS CodeBuild**             | - cicd<br/>- devops<br/>- compute            | Compiles source code, runs tests, and builds container images.                   | Build duration (per minute).                             | 100 build minutes per month (build.general1.small).              | Starts at $0.005/minute.                                                        |
| **AWS Amplify**               | - frontend<br/>- cicd<br/>- hosting          | Builds, deploys, and hosts the Angular frontend application on S3/CloudFront.    | Build minutes, GB stored, GB served.                     | 1,000 build minutes, 5 GB stored, 15 GB served per month.        | Build: $0.01/min; Stored: $0.023/GB; Served: $0.15/GB.                          |
| **AWS Config**                | - governance<br/>- compliance                | Continuously monitors resource configurations against compliance rules.          | Configuration items, Rule evaluations (count).           | 1,000 CI recordings, 1,000 rule evaluations per month.           | CIs: $0.003/CI; Rule Evals: $0.001/evaluation.                                  |
| **AWS Security Hub**          | - security<br/>- monitoring                  | Centralizes security findings from AWS services for a unified view.              | Security checks, Finding ingestions (count).             | 30-day free trial. Free CIS benchmark checks.                    | Findings: $0.00003 per ingestion after first 10,000.                            |
| **AWS Systems Manager**       | - operations<br/>- management<br/>- security | Provides operational control; Session Manager offers secure shell access.        | Varies by feature (e.g., Parameter Store, Associations). | Generous free tier for most features, including Session Manager. | Pay-per-use for advanced features.                                              |
| **AWS IAM**                   | - security<br/>- identity<br/>- free         | Manages user access and service permissions using roles and policies.            | Logical Config.                                          | Unlimited.                                                       | Free.                                                                           |
