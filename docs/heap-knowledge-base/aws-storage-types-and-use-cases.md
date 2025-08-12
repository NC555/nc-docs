---
title: "AWS Storage Types and Use Cases"
description: "AWS Storage Types"
tags:
  [
    aws,
    storage,
    s3,
    glacier,
    ebs,
    efs,
    fsx,
    snow_family,
    storage_gateway,
    object_storage,
    block_storage,
    file_storage,
    data_transfer,
  ]
author: "Nati Cabti"
---

# AWS Storage Types and Use Cases

## Object Storage

**Amazon S3 (Simple Storage Service)**

- Highly durable, available object storage
- Use cases: Static website hosting, data lakes, backup/archiving, mobile app content
- Tiered storage options (Standard, Infrequent Access, Glacier, etc.)
- Stores data as objects within buckets (no true folders or directories)
- Unlimited storage with individual objects up to 5TB
- Cannot mount S3 as a drive or modify just parts of objects

**Amazon S3 Glacier**

- Low-cost archival storage
- Use cases: Long-term data retention, compliance archives, digital preservation
- Multiple retrieval options (minutes to hours)
- Ideal for data that's rarely accessed but must be preserved

## Block Storage

**Amazon EBS (Elastic Block Store)**

- Persistent block storage for EC2 instances
- Use cases: Databases, enterprise applications, boot volumes
- Multiple volume types optimized for different workloads
- Point-in-time snapshots for backup

## File Storage

**Amazon EFS (Elastic File System)**

- Fully managed NFS file system
- Use cases: Content management, web serving, data sharing between EC2 instances
- Automatically scales capacity as files are added/removed
- Supports thousands of concurrent connections

**Amazon FSx**

- Managed file systems for Windows (FSx for Windows) and Lustre (FSx for Lustre)
- Use cases: Windows applications, high-performance computing, machine learning
- Native compatibility with Windows or Lustre protocols
- FSx for NetApp ONTAP offers additional enterprise features

## Data Transfer/Edge

**AWS Snow Family**

- Physical devices for data migration and edge computing
- Use cases: Large-scale data transfers, edge locations with limited connectivity
- Includes Snowcone, Snowball, and Snowmobile options
- Secure transfer of petabytes of data

## Storage Gateway

**AWS Storage Gateway**

- Hybrid storage integration
- Use cases: Connecting on-premises environments with AWS storage
- File, volume, and tape gateway options
- Enables hybrid cloud storage architectures

Each storage solution is designed for specific types of data, access patterns, and performance requirements, allowing you to choose the right storage for each workload.
