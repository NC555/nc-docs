---
title: "Amazon Relational Database Service (RDS)"
description: "Amazon RDS is a managed relational database service that automates routine database tasks while providing high availability, security, and scalability for enterprise applications."
tags:
  [
    "aws",
    "aws_service",
    "rds",
    "relational_database",
    "database",
    "mysql",
    "postgresql",
    "sql_server",
    "oracle",
    "aurora",
  ]
author: "Nati Cabti"
date: "2025-08-11"
---

# Amazon Relational Database Service (RDS)

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/amazon-dynamodb.png" alt="Amazon RDS" />
</div>

Amazon RDS is a managed relational database service that handles routine database administration tasks such as backups, patching, and hardware provisioning, allowing you to focus on application development rather than database maintenance.

## Core Benefits

**Simplified Management:** Automates time-consuming database administration tasks including backups, software patching, and hardware provisioning.

**Enhanced Availability:** Multi-AZ deployments provide automatic failover capabilities and improved data durability across multiple availability zones.

**Flexible Scaling:** Easily scale database resources vertically or horizontally to meet changing application demands without downtime.

**Comprehensive Security:** Built-in security features including network isolation, encryption in transit and at rest, and fine-grained access controls.

## Supported Database Engines

Amazon RDS supports six database engines including: 
1. Amazon Aurora 
2. MySQL
3. PostgreSQL
4. Microsoft SQL Server
5. MariaDB 
6. Oracle Database 

## Use Cases

### E-commerce Product Catalogs
Online retailers use RDS to manage product inventories and customer data with MySQL or PostgreSQL engines. The service handles traffic spikes during sales events while maintaining consistent performance and automated backups for transaction integrity.

### Enterprise Resource Planning
Large enterprises deploy RDS with Oracle or SQL Server engines to support mission-critical ERP systems. Multi-AZ deployments ensure high availability while automated patching reduces maintenance windows and operational overhead.

### Web Application Backends
Development teams leverage RDS for web application databases, utilizing read replicas to distribute query loads and automated backups to protect against data loss while scaling seamlessly with user growth.

## Shared Responsibility Model

**AWS Responsibilities:** Amazon manages the underlying infrastructure, operating system patching, database software installation and updates, automated backups, and hardware maintenance.

**Customer Responsibilities:** You manage database user accounts, access permissions, query optimization, application-level security configurations, and data encryption key management.

:::info
Amazon RDS provides a robust, scalable foundation for relational database workloads while significantly reducing administrative overhead through comprehensive automation and management features.
:::

**Use case:** Ideal for organizations requiring reliable relational databases without the complexity of managing underlying infrastructure, from small web applications to large enterprise systems.

## Additional Resources
- [Amazon RDS Documentation](https://docs.aws.amazon.com/rds/)
- [Getting Started with Amazon RDS](https://aws.amazon.com/rds/getting-started/)

