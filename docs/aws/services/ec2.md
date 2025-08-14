---
title: "Amazon Elastic Compute Cloud (EC2) "
description: "Amazon EC2 offers a broad range of instance types, each tailored to meet specific use case requirements."
tags: ["aws", "compute", "vps", "ec2"]
author: "Nati Cabti"
date: "2025-08-11"
---

# Amazon Elastic Compute Cloud (EC2)

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-ec2.png" alt="AWS EC2 LOGO" />
</div>

Amazon EC2 is more flexible, cost-effective, and faster than managing on-premises servers. It offers on-demand compute capacity that can be quickly launched, scaled, and terminated, with costs based only on active usage.

## How Amazon EC2 works

With Amazon EC2, you can quickly launch, connect to, and use virtual instances in the cloud. Here's an overview of how the process works

- **Launch an instance**: Start by selecting an Amazon Machine Image (AMI), which defines the operating system. You also choose an instance type, which determines the hardware resources, such as ==CPU==, ==memory==, and ==network== performance
- **Connect to the instance**: After you are connected to the instance, you can begin using it to run commands, install software, add storage, organize files, and perform other tasks.

## EC2 Instance Types

### General purpose

General purpose instances provide a balanced mix of compute, memory, and networking resources. They are ideal for diverse workloads, like web services, code repositories, and when workload performance is uncertain.

### Compute optimized

Compute optimized instances are ideal for compute-intensive tasks, such as gaming servers, high performance computing (HPC), machine learning, and scientific modeling.

### Memory optimized

Memory optimized instances are used for memory-intensive tasks like processing large datasets, data analytics, and databases. They provide fast performance for memory-heavy workloads.

### Accelerated computing

Accelerated computing instances use hardware accelerators, like graphics processing units (GPUs), to efficiently handle tasks, such as floating-point calculations, graphics processing, and machine learning.

### Storage optimized

Storage optimized instances are designed for workloads that require high performance for locally stored data, such as large databases, data warehousing, and I/O-intensive applications.

## EC2 Shared Responsibility Model

Amazon EC2 requires you to perform all of the necessary security configuration and management tasks.
When you deploy an EC2 instance, you are responsible for configuring security, managing the guest operating system (OS), applying updates, and setting up firewalls (security groups).

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ec2-shared-responsibility.png" alt="EC2 Shared Responsibility Model" />

## EC2 Pricing

### On-Demand Instances

On-Demand Instances:
Pay only for the compute capacity you consume with no upfront payments or long-term commitments required.

### Reserved Instances:

Get a savings of up to 75 percent by committing to a 1-year or 3-year term for predictable workloads using specific instance families and AWS Regions.

### Spot Instances:

Bid on spare compute capacity at up to 90 percent off the On-Demand price, with the flexibility to be interrupted when AWS reclaims the instance.

### Savings Plans:

Save up to 72 percent across a variety of instance types and services by committing to a consistent usage level for 1 or 3 years.

### Dedicated Hosts:

Reserve an entire physical server for your exclusive use. This option offers full control and is ideal for workloads with strict security or licensing needs.

### Dedicated Instances:

Pay for instances running on hardware dedicated solely to your account. This option provides isolation from other AWS customers.

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ec2-dedicated.png" alt="EC2 Dedicated Instances" />

### Scaling Amazon EC2

### Scalability

Scalability refers to the ability of a system to handle an increased load by adding resources. You can scale up by adding more power to existing machines, or you can scale out by adding more machines. Scalability focuses on long-term capacity planning to make sure that the system can grow and accommodate more users or workloads as needed.

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ec2-scalability.png" alt="EC2 Dedicated Instances" />

### Elasticity

Elasticity is the ability to automatically scale resources up or down in response to real-time demand. A system can then rapidly adjust its resources, scaling out during periods of high demand and scaling in when the demand decreases. Elasticity provides cost efficiency and optimal resource usage at any given moment.

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ec2-elasticity.jpeg" alt="EC2 Dedicated Instances" />

---

### Additional Resources

- [AWS Compute Services](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/compute-services.html)
- [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
