---
title: "Amazon FSx"
description: "Amazon FSx provides fully managed, high-performance file systems in the cloud, supporting multiple filesystem protocols including Windows File Server, Lustre, OpenZFS, and NetApp ONTAP for diverse workload requirements."
tags:
  [
    "aws",
    "fsx",
    "file_storage",
    "managed_service",
    "windows_file_server",
    "lustre",
    "openzfs",
    "netapp_ontap",
    "high_performance",
  ]
author: "Nati Cabti"
date: "2025-08-11"
---

# Amazon FSx
<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/amazon-fsx.png" alt="Amazon FSx" />
</div>

Amazon FSx makes it convenient and cost effective to launch, run, and scale feature-rich, high-performance file systems in the cloud with support for multiple filesystem protocols.

## Core Benefits

**File System Integration:** Supports multiple filesystem protocols including Windows File Server, Lustre, OpenZFS, and NetApp ONTAP, unlike Amazon EFS which focuses on NFS compatibility.

**Managed Infrastructure:** Fully managed service that handles hardware provisioning, patching, and backups, eliminating operational overhead.

**Scalable Storage:** Built on latest AWS compute, networking, and disk technologies to provide high performance and lower total cost of ownership (TCO).

**Cost Effective:** Optimized pricing models and performance characteristics reduce infrastructure costs while maintaining enterprise-grade capabilities.



## FSx File System Types

### Amazon FSx for Windows File Server
<div class="aws__ImageStart">
<img style={{ width: '64px', overflowX: 'auto', margin: '0' }} src="/img/aws/logo/amazon-fsx-windows.png" alt="Amazon FSx for Windows File Server" />
</div>

Provides fully managed shared storage built on Windows Server with comprehensive data access, data management, and administrative capabilities.

**Use Cases:**
- **Windows Migration:** Migrate existing Windows file servers to AWS with full compatibility
- **Hybrid Workloads:** Accelerate hybrid cloud deployments with seamless Windows integration
- **SQL Server Optimization:** Reduce SQL Server deployment costs through shared storage
- **Virtual Desktop Infrastructure:** Streamline virtual desktops and application streaming workloads

### Amazon FSx for NetApp ONTAP
<div class="aws__ImageStart">
  <img style={{ width: '64px', overflowX: 'auto', margin: '0' }} src="/img/aws/logo/amazon-fsx-netapp.png" alt="Amazon FSx for NetApp ONTAP" />
</div>
Delivers fully managed shared storage with popular ONTAP data access and management capabilities in the AWS Cloud.

**Use Cases:**
- **Seamless Migration:** Migrate existing NetApp workloads to AWS without application changes
- **Modern Applications:** Build cloud-native applications leveraging ONTAP's advanced features
- **Data Management Modernization:** Implement advanced data management capabilities like snapshots and cloning
- **Business Continuity:** Streamline disaster recovery and backup strategies with built-in ONTAP features

### Amazon FSx for OpenZFS
<div class="aws__ImageStart">
<img style={{ width: '64px', overflowX: 'auto', margin:'0' }} src="/img/aws/logo/amazon-fsx-zfs.png" alt="Amazon FSx for OpenZFS" />
</div>
Offers fully managed shared file storage built on OpenZFS file system, accessible through NFS protocol (v3, v4, v4.1, and v4.2).

**Use Cases:**
- **Workload Migration:** Migrate OpenZFS-based workloads to AWS seamlessly
- **Data Analytics:** Deliver faster insights for data analytics workloads requiring high IOPS
- **Content Management:** Accelerate content creation and management workflows
- **Development Acceleration:** Increase development and testing velocity with high-performance storage

### Amazon FSx for Lustre
<div class="aws__ImageStart">
<img style={{ width: '64px', overflowX: 'auto', margin:'0' }} src="/img/aws/logo/amazon-fsx-lusture.png" alt="Amazon FSx for Lustre" />
</div>

Provides fully managed shared storage with the scalability and performance of the Lustre file system for compute-intensive workloads.

**Use Cases:**
- **Machine Learning:** Accelerate ML training and inference with high-throughput data access
- **High Performance Computing:** Enable HPC workloads requiring massive parallel processing
- **Big Data Analytics:** Unlock big data analytics with high-bandwidth, low-latency storage
- **Media Processing:** Increase media workload agility for video rendering and post-production


## When to Choose FSx Over EFS

Choose Amazon FSx when you need:
- **Specific File System Protocols:** Windows SMB, Lustre, OpenZFS, or NetApp ONTAP compatibility
- **High Performance Computing:** Maximum throughput and IOPS for demanding workloads
- **Enterprise Features:** Advanced data management capabilities like snapshots, cloning, and deduplication
- **Legacy Application Support:** Existing applications requiring specific file system features

> Benefits: FSx provides enterprise-grade file systems with native protocol support, high performance capabilities, and fully managed infrastructure for specialized workload requirements.

Use case: Essential for migrating existing file server workloads, high-performance computing, machine learning, and applications requiring specific file system protocols beyond standard NFS.

## Additional Resources
- [Amazon FSx Documentation](https://docs.aws.amazon.com/fsx/)
- [FSx Performance and Pricing Comparison](https://aws.amazon.com/fsx/pricing/)