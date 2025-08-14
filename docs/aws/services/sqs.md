---
title: "AWS SQS"
description: "AWS SQS, or Amazon Simple Queue Service, is a fully managed message queuing service that decouples applications, allowing them to communicate and process messages asynchronously"
tags: ["aws", "sqs", "messaging", "queues", "microservices"]
author: "Nati Cabti"
date: "2025-08-11"
---

# Amazon SQS

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-sqs.png" alt="Amazon SQS LOGO" />
</div>

AWS SQS, or Amazon Simple Queue Service, is a fully managed message queuing service that decouples applications, allowing them to communicate and process messages asynchronously. It acts as a buffer, enabling producers to send messages and consumers to retrieve them at their own pace, improving fault tolerance and scalability

## Amazon SQS Use Case Scenario

**Scenario :** A customer support team consists of a support agent and a technical specialist. The support agent is responsible for receiving customer issues, and the technical specialist works on resolving them. It acts as a buffer, enabling producers to send messages and consumers to retrieve them at their own pace, improving fault tolerance and scalability

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ques-messaging-sqs-scenario.png" alt="Amazon SQS Scenario" />

**Challenge :**
However, what happens if the support agent creates a ticket but the technical specialist is busy working on another issue or unavailable? The agent would have to wait until the specialist is free to accept the new ticket, causing delays in resolving customer issues and extending wait times for customers

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ques-messaging-sqs-scenario-challenge.png" alt="Amazon SQS Challenge" />

**Solution :** To improve efficiency, they implement a queue system using Amazon SQS. The support agent adds customer issues to the queue, creating a backlog. Even if the specialist is busy, the agent can continue adding new issues. The specialist checks the queue, resolves issues, and updates the agent
<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ques-messaging-sqs-scenario-solution.png" alt="Amazon SQS Solution" />

## Opensource Alternatives

- **Apache Kafka**
- **Redis Pub/Sub**
