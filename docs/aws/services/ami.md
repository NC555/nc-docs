---
title: "AWS AMI"
description: "AMIs are pre-built virtual machine images that have the basic components for what is needed to start an EC2 instance"
tags: ["aws", "cloud_compute", "ec2", "ami"]
author: "Nati Cabti"
date: "2025-08-11"
---

# AMI Amazon Machine Images

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-ami.png" alt="AWS AMI Components" />
</div>

AMIs are pre-built virtual machine images that have the basic components for what is needed to start an instance

## Ways to use AMIs

AMIs can be used in three ways.

- **Create your own**: Building a custom AMI with specific configurations and software tailored to your needs
- **Pre-configured AWS AMI**: For common operating systems and software.
- **Purchase AMIs**: AWS Marketplace, where third-party vendors offer specialized software designed for specific use cases.

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ami.png" alt="AWS AMI Components" />

## AMI repeatability

AMIs provide repeatability through a consistent environment for every new instance. Configurations are identical and deployments automated, development and testing environments are consistent. This helps when scaling, reduces errors, and streamlines managing large-scale environments.
