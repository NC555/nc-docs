---
title: "Amazon SNS"
description: "Amazon SNS is a publish-subscribe service that publishers use to send messages to subscribers through SNS topics"
tags: ["sns", "event_bridge", "messaging", "queues", "microservices"]
author: "Nati Cabti"
date: "2025-08-11"
---

# Amazon SNS

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-sns.png" alt="Amazon SNS LOGO" />
</div>
Amazon SNS is a publish-subscribe service that publishers use to send messages to subscribers through SNS topics. In Amazon SNS, subscribers can include web servers, email addresses, Lambda functions, and various other endpoints. You will learn about Lambda in more detail later.

#### Amazon SNS Use Case Scenario

A company sending a single email to all customers with updates on various topics, such as new products, special offers, and upcoming events. Customers want to receive only the updates they’re interested in. The current email update is causing customer dissatisfaction and lower engagement.

1.  **Segment the communication :** The company decides to divide the communication into three separate topics, including one for new products, one for special offers, and one for events. Each topic will focus on a specific area of interest.

2.  **Let customers choose topics :**

- A customer might subscribe only to new product updates.
- Another customer might opt only for event notifications.
- A third customer might choose to subscribe to new product updates and special offers.

3. **Send tailored notifications :** With Amazon SNS, the company can send personalized notifications to subscribers based on their specific interests. Amazon SNS makes sure that these notifications are promptly delivered to the right audience, improving the efficiency and relevance of the communication.
