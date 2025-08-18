---
title: "Amazon Kendra"
description: "Amazon Kendra is an intelligent enterprise search service powered by machine learning that delivers precise answers from your content using natural language queries rather than simple keyword matching."
tags:
  [
    "aws",
    "kendra",
    "enterprise_search",
    "intelligent_search",
    "nlp",
    "machine_learning",
    "document_search",
    "ai",
  ]
author: "Nati Cabti"
date: "2025-08-18"
---

# Amazon Kendra

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/logo/ml-kendra.png" alt="Amazon Kendra" />
</div>

Amazon Kendra uses natural language processing to search for answers within large amounts of enterprise content. It understands the context of queries and returns precise, relevant answers rather than just documents with matching keywords, revolutionizing how organizations access their knowledge.

## Core Benefits

**Contextual Understanding:** Leverages advanced NLP to comprehend query intent and context, delivering specific answers rather than lists of potentially relevant documents.

**Enterprise Integration:** Connects to popular data sources including SharePoint, Confluence, ServiceNow, and various databases to create unified search experiences across organizational content.

**Machine Learning Enhancement:** Continuously improves search accuracy through user feedback and interaction patterns, learning from organizational usage to deliver increasingly relevant results.

**Security and Access Control:** Maintains existing permissions and access controls from source systems, ensuring users only see content they're authorized to access.

## Use Cases

### Intelligent Knowledge Management
Technology companies deploy Kendra to search across technical documentation, code repositories, and internal wikis. Engineers and support teams can ask natural language questions about system configurations, troubleshooting procedures, and API documentation, receiving precise answers with source citations.

### Customer Support Enhancement
Financial services firms use Kendra to power customer service chatbots and agent assistance tools. The service searches across policy documents, compliance guidelines, and product information to provide accurate answers to customer inquiries while ensuring regulatory compliance.

### Legal Document Research
Law firms leverage Kendra to search through case files, legal precedents, and regulatory documents. Attorneys can ask complex legal questions and receive relevant case citations, statutory references, and expert opinions, dramatically reducing research time for case preparation.

### Healthcare Information Retrieval
Hospitals and research institutions use Kendra to search medical literature, treatment protocols, and patient care guidelines. Healthcare professionals can query best practices for specific conditions and receive evidence-based recommendations with supporting research citations.

## Key Features

Kendra supports multiple content formats including text documents, PDFs, presentations, and structured data from databases. The service provides relevance tuning capabilities and custom synonyms to optimize search results for specific industries and organizational terminology.

## Shared Responsibility Model

**AWS Responsibilities:** Amazon manages the search infrastructure, machine learning model updates, service availability, and security of the search processing pipeline.

**Customer Responsibilities:** You handle content indexing configuration, data source connectivity, access control mapping, search relevance tuning, and ensuring appropriate content permissions and privacy controls.

:::info
Kendra transforms enterprise search from keyword-based document discovery to intelligent answer delivery, enabling organizations to unlock knowledge trapped in diverse content repositories.
:::

**Use case:** Ideal for organizations with large knowledge bases requiring intelligent search capabilities, from technical support and legal research to healthcare information retrieval and customer service enhancement.

## Additional Resources
- [Amazon Kendra Documentation](https://docs.aws.amazon.com/kendra/)
- [Kendra Data Source Connectors](https://docs.aws.amazon.com/kendra/latest/dg/data-sources.html)