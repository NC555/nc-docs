---
title: "AWS Elastic Block Store"
description: "AWS Elastic Block Store"
tags: [aws, ebs, storage, ec2]
author: "Nati Cabti"
---

# EC2 Instance's EBS (Elastic Block Store) Volume

An EBS (Elastic Block Store) volume is a persistent block storage device used with Amazon EC2 instances in AWS. Think of it as a virtual hard drive that provides:

- Persistent storage that exists independently of the EC2 instance lifecycle
- Ability to survive instance termination (if configured not to delete on termination)
- Various volume types optimized for different workloads (General Purpose SSD, Provisioned IOPS SSD, Throughput Optimized HDD, etc.)
- Different performance characteristics based on the volume type (IOPS, throughput)
- Point-in-time snapshot capabilities for backup and recovery

EC2 instances use EBS volumes as their primary storage for operating systems, applications, and data. When you launch an EC2 instance, the root volume is typically an EBS volume containing the operating system. You can also attach additional EBS volumes to an instance for more storage.

Unlike instance store volumes (ephemeral storage), EBS volumes maintain their data when instances are stopped or terminated, making them suitable for persistent data storage in cloud environments.
