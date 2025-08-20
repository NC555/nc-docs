---
title: "Amazon Athena"
description: "Amazon Athena is a serverless, interactive query service that enables you to analyze data directly in Amazon S3 and other sources using standard SQL, paying only for the queries you run."
tags:
  - "aws"
  - "analytics"
  - "athena"
  - "serverless"
  - "sql"
  - "data_analysis"
  - "interactive_query"
  - "data_pipeline"
author: "Nati Cabti"
date: "2025-08-20"
---

# Data pipelines

Both AI/ML and traditional data analytics need clean and accessible data in a format that's usable by analytics tools and AI algorithms. <br/><br/>

<div class="aws__ImageStart">
  <img
    style={{
      background: "#f6f9fd",
      width: "100%",
      overflowX: "auto",
      margin: "0",
    }}
    src="/img/aws/analytics-data-pipeline-concept.png"
    alt="Processing your data"
  />
</div>
<br />

## AWS Pipeline Analytcs ETL Services:

### 1. Data Ingestion Services

| Service Name                    |                                             Logo                                              | Key Attributes                                                                                                                                    | Use Cases                                                                                                                             |
| :------------------------------ | :-------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| **Amazon Kinesis Data Streams** | <img src="/img/aws/logo/analytics-kinesis-data-streams.png" alt="Amazon Kinesis" width="64"/> | - Serverless, real-time data streaming.<br/>- Massively scalable for terabytes of data.<br/>- Automatic provisioning and scaling.<br/>            | - Real-time analytics (e.g., clickstreams).<br/>- Log and event data collection at scale.<br/>- IoT data ingestion from sensors.<br/> |
| **Amazon Data Firehose**        |    <img src="/img/aws/logo/analytics-data-firehose.png" alt="Amazon Kinesis" width="64"/>     | - Fully managed, near real-time data loading.<br/>- Built-in data transformation (ETL).<br/>- Delivers directly to S3, Redshift, OpenSearch.<br/> | - Streaming ETL pipelines.<br/>- Simple delivery of logs to analytics tools.<br/>- Ingesting IoT data directly into a data lake.<br/> |

### 2. Data Storage Services

| Service Name        |                                        Logo                                        | Key Attributes                                                                                                                                | Use Cases                                                                                                                                 |
| :------------------ | :--------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Amazon S3**       |            <img src="/img/aws/logo/s3.png" alt="Amazon S3" width="64"/>            | - Highly scalable, durable object storage.<br/>- The foundation for data lakes.<br/>- Stores any type of data (structured/unstructured).<br/> | - Central data lake for raw data.<br/>- Archiving and backup.<br/>- Source/destination for analytics and ML services.<br/>                |
| **Amazon Redshift** | <img src="/img/aws/logo/analytics-redshift.png" alt="Amazon Redshift" width="64"/> | - Fully managed, petabyte-scale data warehouse.<br/>- High-performance with columnar storage.<br/>- Optimized for complex SQL queries.<br/>   | - Business intelligence (BI) and reporting.<br/>- High-performance analytical workloads.<br/>- Storing structured, transformed data.<br/> |

### 3. Data Cataloging Services

| Service Name              |                                         Logo                                         | Key Attributes                                                                                                                                    | Use Cases                                                                                                                                 |
| :------------------------ | :----------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **AWS Glue Data Catalog** | <img src="/img/aws/logo/analytics-glue-data-catalog.png" alt="AWS Glue" width="64"/> | - Centralized, managed metadata repository.<br/>- Automatic schema discovery with crawlers.<br/>- Integrates with Athena, EMR, and Redshift.<br/> | - Defining schemas for data in S3.<br/>- Enabling data discovery for a data lake.<br/>- Providing a unified data view for analytics.<br/> |

### 4. Data Processing Services

| Service Name   |                                    Logo                                     | Key Attributes                                                                                                                                                       | Use Cases                                                                                                                                                |
| :------------- | :-------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWS Glue**   | <img src="/img/aws/logo/analytics-aws-glue.png" alt="AWS Glue" width="64"/> | - Serverless, fully managed ETL service.<br/>- Automated schema discovery and code generation.<br/>- Pay-per-job execution model.<br/>                               | - Transforming raw data into structured formats.<br/>- Cleaning, enriching, and validating data.<br/>- Automating data preparation workflows.<br/>       |
| **Amazon EMR** |  <img src="/img/aws/logo/analytics-emr.png" alt="Amazon EMR" width="64"/>   | - Managed big data platform for Spark, Hadoop, etc.<br/>- Handles infrastructure provisioning and scaling.<br/>- Cost-effective with Spot Instance integration.<br/> | - Large-scale, petabyte-level data processing.<br/>- Machine learning and ETL with big data frameworks.<br/>- Genomic and scientific data analysis.<br/> |

---

### 5. Data Analysis and Visualization Services

| Service Name          |                                          Logo                                          | Key Attributes                                                                                                                                 | Use Cases                                                                                                                                          |
| :-------------------- | :------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Amazon Athena**     |     <img src="/img/aws/logo/analytics-athena.png" alt="Amazon Athena" width="64"/>     | - Serverless, interactive query service.<br/>- Uses standard SQL to query data in place (in S3).<br/>- Pay-per-query cost model.<br/>          | - Ad-hoc data discovery on data lakes.<br/>- Quickly querying log files without loading them.<br/>- Serverless BI and reporting.<br/>              |
| **Amazon Redshift**   |   <img src="/img/aws/logo/analytics-redshift.png" alt="Amazon Redshift" width="64"/>   | - Fully managed, petabyte-scale data warehouse.<br/>- High-performance with columnar storage.<br/>- Optimized for complex SQL queries.<br/>    | - Business intelligence (BI) and reporting.<br/>- High-performance analytical workloads.<br/>- Storing structured, transformed data.<br/>          |
| **Amazon QuickSight** | <img src="/img/aws/logo/analytics-quicksight.png" alt="Amazon QuickSight" width="64"/> | - Serverless, cloud-native BI service.<br/>- Interactive dashboards and reports.<br/>- Natural language querying with Amazon Q.<br/>           | - Creating executive and operational dashboards.<br/>- Data visualization for business users.<br/>- Embedding analytics into applications.<br/>    |
| **Amazon OpenSearch** | <img src="/img/aws/logo/analytics-opensearch.png" alt="Amazon OpenSearch" width="64"/> | - Managed service for OpenSearch clusters.<br/>- Real-time log analytics and application monitoring.<br/>- Full-text search capabilities.<br/> | - Interactive log analytics and troubleshooting.<br/>- Powering search functionality for applications.<br/>- Real-time monitoring dashboards.<br/> |
