---
title: "Amazon Athena"
description: "Amazon Athena is a serverless, interactive query service that enables you to analyze data directly in Amazon S3 and other sources using standard SQL, paying only for the queries you run."
tags:
  [
    "aws",
    "analytics",
    "athena",
    "serverless",
    "sql",
    "data_analysis",
    "interactive_query",
    "data_pipeline",
  ]
author: "Nati Cabti"
date: "2025-08-20"
---

# Data pipelines

Both AI/ML and traditional data analytics need clean and accessible data in a format that's usable by analytics tools and AI algorithms. <br/><br/>

<div class="aws__ImageStart">
<img style={{ background: '#f6f9fd' ,width: '100%', overflowX: 'auto' , margin: '0' }} src="/img/aws/analytics-data-pipeline-concept.png" alt="Processing your data" />
</div>
<br/>

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>

## AWS Pipeline Analytcs ETL Services:

### 1. **Data ingestion**

<!-- **Amazon Kinesis Data Streams Service** -->

#### **Amazon Kinesis Data Streams Service**

<div style={{ marginInlineStart: '20px' }} >

  <div class="aws__ImageStart">
      <img style={{ width: '64px', overflowX: 'auto', margin: '0' }} src="/img/aws/logo/analytics-kinesis-data-streams.png" alt="Amazon FSx for Windows File Server" />
  </div>

#### **Key Attributes :**

- Serverless real-time data streaming.
- Scalable Massively scalable for terabytes of data.
- Automated Automatic provisioning and scaling.

#### **Use Cases :**

- Real-time analytics
- Log and event data collection at scale.
- IoT data ingestion from sensors.

</div>

<!-- **Amazon Data Firehose** -->

### **Amazon Data Firehose**

<div style={{ marginInlineStart: '20px' }} >
  <div class="aws__ImageStart">
    <img style={{ width: '64px', overflowX: 'auto', margin: '0' }} src="/img/aws/logo/analytics-data-firehose.png" alt="Amazon FSx for Windows File Server" />
  </div>
  #### **Key Attributes :**
  - Fully managed, near real-time data loading.
  - Built-in data transformation (ETL).
  - Delivers directly to S3, Redshift, OpenSearch.
  #### **Use Cases :**
  Streaming ETL pipelines.
  Simple delivery of logs to analytics tools.
  Ingesting IoT data directly into a data lake.
</div>

## 2. **Data storage services**

## 3. **Data storage services**

## 4. **Data processing services**

## 5. **Data analysis and visualization services**

| Service Name                    |                                     Logo                                     | Type                                | Key Attributes                                                                                                                                                                      | Primary Use Cases                                                                                                                                                       |
| :------------------------------ | :--------------------------------------------------------------------------: | :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Amazon Kinesis Data Streams** |    <img src="/img/aws/logo/kinesis.png" alt="Amazon Kinesis" width="96"/>    | Data ingestion                      | <ul><li>Serverless, real-time data streaming.</li><li>Massively scalable for terabytes of data.</li><li>Automatic provisioning and scaling.</li></ul>                               | <ul><li>Real-time analytics (e.g., clickstreams).</li><li>Log and event data collection at scale.</li><li>IoT data ingestion from sensors.</li></ul>                    |
| **Amazon Data Firehose**        |    <img src="/img/aws/logo/kinesis.png" alt="Amazon Kinesis" width="96"/>    | Data ingestion                      | <ul><li>Fully managed, near real-time data loading.</li><li>Built-in data transformation (ETL).</li><li>Delivers directly to S3, Redshift, OpenSearch.</li></ul>                    | <ul><li>Streaming ETL pipelines.</li><li>Simple delivery of logs to analytics tools.</li><li>Ingesting IoT data directly into a data lake.</li></ul>                    |
| **Amazon S3**                   |         <img src="/img/aws/logo/s3.png" alt="Amazon S3" width="96"/>         | Data storage                        | <ul><li>Highly scalable, durable object storage.</li><li>The foundation for data lakes.</li><li>Stores any type of data (structured/unstructured).</li></ul>                        | <ul><li>Central data lake for raw data.</li><li>Archiving and backup.</li><li>Source/destination for analytics and ML services.</li></ul>                               |
| **Amazon Redshift**             |   <img src="/img/aws/logo/redshift.png" alt="Amazon Redshift" width="96"/>   | Data storage<br/>Data analysis      | <ul><li>Fully managed, petabyte-scale data warehouse.</li><li>High-performance with columnar storage.</li><li>Optimized for complex SQL queries.</li></ul>                          | <ul><li>Business intelligence (BI) and reporting.</li><li>High-performance analytical workloads.</li><li>Storing structured, transformed data.</li></ul>                |
| **AWS Glue Data Catalog**       |        <img src="/img/aws/logo/glue.png" alt="AWS Glue" width="96"/>         | Data cataloging                     | <ul><li>Centralized, managed metadata repository.</li><li>Automatic schema discovery with crawlers.</li><li>Integrates with Athena, EMR, and Redshift.</li></ul>                    | <ul><li>Defining schemas for data in S3.</li><li>Enabling data discovery for a data lake.</li><li>Providing a unified data view for analytics.</li></ul>                |
| **AWS Glue**                    |        <img src="/img/aws/logo/glue.png" alt="AWS Glue" width="96"/>         | Data processing                     | <ul><li>Serverless, fully managed ETL service.</li><li>Automated schema discovery and code generation.</li><li>Pay-per-job execution model.</li></ul>                               | <ul><li>Transforming raw data into structured formats.</li><li>Cleaning, enriching, and validating data.</li><li>Automating data preparation workflows.</li></ul>       |
| **Amazon EMR**                  |        <img src="/img/aws/logo/emr.png" alt="Amazon EMR" width="96"/>        | Data processing                     | <ul><li>Managed big data platform for Spark, Hadoop, etc.</li><li>Handles infrastructure provisioning and scaling.</li><li>Cost-effective with Spot Instance integration.</li></ul> | <ul><li>Large-scale, petabyte-level data processing.</li><li>Machine learning and ETL with big data frameworks.</li><li>Genomic and scientific data analysis.</li></ul> |
| **Amazon Athena**               |     <img src="/img/aws/logo/athena.png" alt="Amazon Athena" width="96"/>     | Data analysis                       | <ul><li>Serverless, interactive query service.</li><li>Uses standard SQL to query data in place (in S3).</li><li>Pay-per-query cost model.</li></ul>                                | <ul><li>Ad-hoc data discovery on data lakes.</li><li>Quickly querying log files without loading them.</li><li>Serverless BI and reporting.</li></ul>                    |
| **Amazon QuickSight**           | <img src="/img/aws/logo/quicksight.png" alt="Amazon QuickSight" width="96"/> | Data analysis<br/>and visualization | <ul><li>Serverless, cloud-native BI service.</li><li>Interactive dashboards and reports.</li><li>Natural language querying with Amazon Q.</li></ul>                                 | <ul><li>Creating executive and operational dashboards.</li><li>Data visualization for business users.</li><li>Embedding analytics into applications.</li></ul>          |
| **Amazon OpenSearch Service**   | <img src="/img/aws/logo/opensearch.png" alt="Amazon OpenSearch" width="96"/> | Data analysis<br/>and visualization | <ul><li>Managed service for OpenSearch clusters.</li><li>Real-time log analytics and application monitoring.</li><li>Full-text search capabilities.</li></ul>                       | <ul><li>Interactive log analytics and troubleshooting.</li><li>Powering search functionality for applications.</li><li>Real-time monitoring dashboards.</li></ul>       |
