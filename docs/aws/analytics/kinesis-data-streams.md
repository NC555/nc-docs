---
title: "Amazon Kinesis Data Streams"
description: "Amazon Kinesis Data Streams is a serverless streaming data service for real-time ingestion of terabytes of data from applications, streams, and sensors with automatic scaling."
tags:
  [
    "aws",
    "kinesis",
    "kinesis_data_streams",
    "data_ingestion",
    "real_time",
    "streaming",
    "data_pipeline",
  ]
author: "Nati Cabti"
date: "2025-08-20"
---
AWS Glue
# Amazon Kinesis Data Streams

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/analytics-kinesis-data-streams.png" alt="Amazon Kinesis Data Streams" />
</div>

Amazon Kinesis Data Streams is a serverless service for real-time ingestion of terabytes of data from applications, streams, and IoT sensors. It provides automatic provisioning and scaling to handle highly variable data throughput.

## Core Benefits

- **Real-Time Processing:** Ingests data with sub-second latency, making it available for immediate processing and analysis.
- **Massive Scalability:** Handles high-volume data streams from thousands of sources and automatically scales capacity.
- **Serverless Operation:** Eliminates infrastructure management with on-demand capacity mode.

## Role in Data Pipeline

**Data Ingestion:** Serves as the real-time entry point for streaming data, capturing data from sources like application logs, mobile devices, and IoT sensors before it is processed or stored.

<div class="aws__ImageStart">
<img style={{ background: '#f6f9fd' ,width: '100%', overflowX: 'auto' , margin: '0' }} src="/img/aws/analytics-data-ingestion-concept.png" alt="Processing your data" />
</div>
:::info
- Data ingestion involves moving data from source systems into your chosen storage solution.<br/>
- Use real-time ingestion when the data is needed immediately. Use batch ingestion when some latency is tolerable.
:::

## Use Cases

- **Real-Time Analytics:** Capturing website clickstream data to analyze user behavior as it happens.
- **Log and Event Data Collection:** Ingesting log data from thousands of servers for real-time monitoring and alerting.

:::info
Kinesis Data Streams is the foundation for real-time data ingestion pipelines, enabling immediate reaction to streaming data at massive scale.
:::

**Use case:** Ideal for applications that require immediate data processing, such as real-time analytics, log aggregation, and IoT data capture.

## Additional Resources
- [Amazon Kinesis Data Streams Documentation](https://docs.aws.amazon.com/streams/latest/dev/introduction.html)