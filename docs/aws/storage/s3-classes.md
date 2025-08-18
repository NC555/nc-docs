---
title: "Amazon S3 Storage Classes"
description: "Amazon S3 offers multiple storage classes designed for different use cases, access patterns, and cost optimization requirements. Choose the right storage class based on your data access frequency and performance needs."
tags:
  [
    "aws",
    "s3",
    "storage",
    "storage_classes",
    "object_storage",
    "cost_optimization",
    "data_archiving",
    "backup",
  ]
author: "Nati Cabti"
date: "2025-08-11"
---

# Amazon S3 Storage Classes

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/s3.png" alt="Amazon S3" />
</div>

Amazon S3 offers multiple storage classes designed for different use cases, from frequently accessed data to long-term archival. Each storage class is optimized for specific access patterns, performance requirements, and cost considerations.

## Common S3 Attributes

All S3 storage classes share these fundamental characteristics:

**Durability:** Designed for 99.999999999% (11 9's) of data durability across multiple Availability Zones

**Security:** Supports encryption in transit and at rest, with comprehensive access control mechanisms

**Scalability:** Virtually unlimited storage capacity that scales automatically based on your needs

**Integration:** Seamlessly integrates with other AWS services and supports standard REST APIs

**Management:** Lifecycle policies enable automatic transition between storage classes based on age or access patterns

**Accessibility:** Objects can be accessed from anywhere on the internet through the AWS Management Console, CLI, or SDKs

## S3 Storage Classes Comparison

| Storage Class                     | Logo                                                                                                           | Key Attributes                                                                                | Primary Use Cases                                                                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **S3 Standard**                   | <img src="/img/aws/logo/s3-standard.png" alt="S3 Standard" width="96"/>                                    | - General-purpose storage<br/>- High performance and low latency<br/>- Default storage class  | - Cloud applications<br/>- Dynamic websites<br/>- Content distribution<br/>- Big data analytics  |
| **S3 Intelligent-Tiering**        | <img src="/img/aws/logo/s3-intelligent-tiering.png" alt="S3 Intelligent-Tiering" width="96"/>              | - Automatic cost optimization<br/>- Monitors access patterns<br/>- Three access tiers         | - Unknown access patterns<br/>- Changing access patterns<br/>- Automatic cost savings            |
| **S3 Standard-IA**                | <img src="/img/aws/logo/s3-infrequent-access.png" alt="S3 Standard-IA" width="96"/>                        | - Lower storage costs<br/>- Rapid access when needed<br/>- Retrieval fees apply               | - Long-term backups<br/>- Disaster recovery files<br/>- Infrequently accessed data               |
| **S3 One Zone-IA**                | <img src="/img/aws/logo/s3-one-zone-infrequent-access.png" alt="S3 One Zone-IA" width="96"/>               | - Single Availability Zone<br/>- Lower cost than Standard-IA<br/>- Less availability          | - Secondary backups<br/>- Easily recreatable data<br/>- Cost-sensitive workloads                 |
| **S3 Express One Zone**           | <img src="/img/aws/logo/s3-express-one-zone.png" alt="S3 Express One Zone" width="96"/>                    | - Single-digit millisecond latency<br/>- 10x faster data access<br/>- 80% lower request costs | - Latency-sensitive applications<br/>- Frequently accessed data<br/>- High-performance workloads |
| **S3 Glacier Instant Retrieval**  | <img src="/img/aws/logo/s3-glacier-instant-retrival.png" alt="S3 Glacier Instant Retrieval" width="96"/>   | - Millisecond retrieval<br/>- 68% cost savings vs Standard-IA<br/>- Archive storage           | - Rarely accessed archives<br/>- Medical images<br/>- News media assets                          |
| **S3 Glacier Flexible Retrieval** | <img src="/img/aws/logo/s3-glacier-flexible-retrival.png" alt="S3 Glacier Flexible Retrieval" width="96"/> | - 1-5 minute expedited retrieval<br/>- Accessed 1-2 times per year<br/>- Low-cost archival    | - Backup and disaster recovery<br/>- Offsite data storage<br/>- Long-term archives               |
| **S3 Glacier Deep Archive**       | <img src="/img/aws/logo/s3-glacier-deep-archive.png" alt="S3 Glacier Deep Archive" width="96"/>            | - Lowest-cost storage class<br/>- 12-hour retrieval time<br/>- 7-10 year retention            | - Regulatory compliance<br/>- Digital preservation<br/>- Long-term retention                     |
| **S3 Outposts**                   | <img src="/img/aws/logo/s3-outposts.png" alt="S3 Outposts" width="96"/>                                    | - On-premises object storage<br/>- Local data residency<br/>- S3 APIs and features            | - Data residency requirements<br/>- Low-latency access<br/>- Hybrid cloud architectures          |

## Choosing the Right Storage Class

Select your S3 storage class based on these key factors:

**Access Frequency:** How often you need to retrieve your data determines the most cost-effective option

**Performance Requirements:** Consider latency and throughput needs for your applications

**Cost Sensitivity:** Balance storage costs against retrieval costs and access patterns

**Compliance Needs:** Some industries require specific data retention and residency requirements

**Availability Requirements:** Determine if you need multi-AZ redundancy or if single-zone storage is sufficient.

## S3 Lifecycle

To avoid manually managing your object storage tier configurations, you can use S3 **_Lifecycle configurations_** to automate the process. you can choose to automate between two types of actions, as follows:

- **Transition actions :** define when objects should transition to another storage class.
- **Expiration actions :** define when objects expire and should be permanently deleted.

### S3 Lifecycle configuration Example

<div class="aws__ImageStart">
<img style={{ width: '500px', overflowX: 'auto' }} src="/img/aws/s3-lifecycle-concept.png" alt="S3 Lifecycle Concept" />
</div>
- **After 30 days :** After 30 days without being accessed, the object is moved from the Amazon S3 Standard storage class to the Amazon S3 Standard-IA storage class.
- **After 60 days :** After the object has been in the S3 Standard-IA storage class for 60 days without being accessed, it's moved to the Amazon S3 Glacier Instant Retrieval storage class.
- **After 365 days :** Finally, after 365 days in the Amazon S3 Glacier Instant Retrieval storage class without being accessed, the object is deleted.

**_Use Cases :_**

- Periodic logs: If you upload periodic logs to a bucket, your application might need them for a week or a month.
- Data that changes in access frequency: Some documents are frequently accessed for a limited period of time. After that, they are infrequently accessed. At some point, you might not need real-time access to them.

### Additional Resources

- [Amazon S3 Storage Classes Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
- [S3 Storage Classes Pricing](https://aws.amazon.com/s3/pricing/)
