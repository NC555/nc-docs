---
title: "Internet Gateway"
description: "To allow public traffic from the internet to access your VPC, you attach an internet gateway to the VPC. An internet gateway is a connection between a VPC and the internet"
tags: ["aws", "infrastructure", "networking", "internet_gateway"]
author: "Nati Cabti"
date: "2025-08-11"
---

# Internet Gateway

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/internet-gateway.png" alt="Amazon VPC" />
</div>

To allow public traffic from the internet to access your [**VPC**](./vpc.md), you attach an internet gateway to the VPC.

- An internet gateway is a connection between a VPC and the internet.
- Without an internet gateway, no one can access the resources within your VPC.
- Internet Gateway connects to public subnets only

<div class="aws__ImageStart" >
<img style={{ background: '#f6f9fd', width: '500px', overflowX: 'auto' }} src="/img/aws/networking-vpc-internet-gateway.png" alt="Internet Gateway" />
</div>

### AWS Services accessible through Internet Gateway

- Services with Public IP addresses in Public Subnets:

  - [EC2](../cloud-compute/ec2.md) instances with public IPs
  - [ELB](../cloud-compute/elb.md) Elastic Load Balancing
  - [NAT](./gateway-services/network-address-transalation-gateway.md) Gateways
  - Application Load Balancers (ALB)
  - Network Load Balancers (NLB)
  - Classic Load Balancers
  - EC2 instances running NAT instances

- AWS Managed Services with Internet Endpoints:
  - S3 (via internet endpoints)
  - DynamoDB (via internet endpoints)
  - Lambda (when accessing internet resources)
  - API Gateway
  - CloudFront
  - Route 53
  - SES, SNS, SQS (via internet APIs)

### Additional Resources

- [VPC Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html)
