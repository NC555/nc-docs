---
title: "AI/ML on AWS: An Overview"
description: "Explore the AWS AI/ML stack, from pre-built AI services and managed ML platforms to foundational ML frameworks and infrastructure, designed to solve diverse business challenges and drive innovation."
tags:
  [
    "aws",
    "ai",
    "ml",
    "machine_learning",
    "artificial_intelligence",
    "ai_ml_stack",
    "generative_ai",
  ]
author: "Nati Cabti"
date: "2025-08-19"
---

# AI/ML on AWS: An Overview

Both AI/ML and traditional data analytics need clean and accessible data in a format that's usable by analytics tools and AI algorithms. AWS offers a comprehensive AI/ML stack to address a wide range of business use cases, from predicting trends and making decisions to detecting anomalies.

## Common ML Business Use Cases

ML models can power diverse applications and solve complex business problems, including:

- **Predict Trends:** Forecast future stock prices, sales demand, or customer churn.
- **Make Decisions:** Route callers to the right department, optimize logistics, or personalize content.
- **Detect Anomalies:** Identify bank fraud, unusual network activity, or equipment failures.

## AWS AI/ML Solutions: The Three Tiers

The AWS AI/ML stack is composed of three tiers, offering varying levels of control and customization:

| Tier                                         | Description                                                                                                                                                                                                        | Primary Services/Approach                                                                                                                                                                                        |
| :------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tier 1: AI Services**                      | - Pre-built models already trained to perform specific functions.<br/>- These are ready-to-use, managed services for quick solutions without ML expertise.<br/>                                                    | - Amazon Comprehend.<br/>- Amazon Polly.<br/>- Amazon Transcribe.<br/>- Amazon Translate.<br/>- Amazon Kendra.<br/>- Amazon Rekognition.<br/>- Amazon Textract.<br/>- Amazon Lex.<br/>- Amazon Personalize.<br/> |
| **Tier 2: ML Services**                      | - A more customized approach where you build, train, and deploy your own ML models with fully managed infrastructure.<br/>- Offers more control over ML solutions without managing underlying infrastructure.<br/> | - Amazon SageMaker.<br/>                                                                                                                                                                                         |
| **Tier 3: ML Frameworks and Infrastructure** | - A completely custom approach for organizations with highly specialized needs.<br/>- Provides complete control over the ML training process using purpose-built chips and popular ML frameworks.<br/>             | - PyTorch.<br/>- TensorFlow.<br/>- Apache MXNet on EC2, EMR, ECS, etc.<br/>- (underlying infrastructure).<br/>                                                                                                   |

This tiered approach allows you to choose the right level of abstraction for your specific needs, from quick integration of pre-trained models to deep customization of ML frameworks.

## Generative AI on AWS

Within the AI/ML stack, AWS offers specialized solutions for Generative AI, enabling the creation of new content and accelerating productivity:

| Service Name                   | Key Focus                                                                                                          |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Amazon SageMaker JumpStart** | ML hub with FMs and pre-built ML solutions for rapid deployment and fine-tuning.                                   |
| **Amazon Bedrock**             | Fully managed service for adapting and deploying FMs from Amazon and leading AI companies via a single API.        |
| **Amazon Q**                   | Interactive AI assistant integrated with company information repositories for business and developer productivity. |

## Additional Resources

- [AWS Machine Learning Overview](https://aws.amazon.com/machine-learning/)
- [AWS AI Services](https://aws.amazon.com/machine-learning/ai-services/)
- [Amazon SageMaker](https://aws.amazon.com/sagemaker/)
- [Generative AI on AWS](https://aws.amazon.com/generative-ai/)
