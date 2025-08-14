# Messaging and Queuing

Amazon EventBridge, Amazon SNS, and Amazon SQS are AWS services that help different parts of an application communicate effectively in the cloud. These services support building event-driven and message-based systems. Together, they help create scalable, reliable applications that can handle high traffic and can enhance communication between components.

## EventBridge

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-event-bridge.png" alt="AWS EventBridge LOGO" />
</div>

EventBridge is a serverless service that helps connect different parts of an application using events, helping to build scalable, event-driven systems. With EventBridge, you route events from sources like custom apps, AWS services, and third-party software to other applications. EventBridge simplifies the process of receiving, filtering, transforming, and delivering events, so you can quickly build reliable applications.

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ques-messaging-event-bridge.png" alt="AWS EventBridge LOGO" />

## Amazon SQS

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-sqs.png" alt="Amazon SQS LOGO" />
</div>

#### Amazon SQS Use Case Scenario

**Scenario :** A customer support team consists of a support agent and a technical specialist. The support agent is responsible for receiving customer issues, and the technical specialist works on resolving them.

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ques-messaging-sqs-scenario.png" alt="Amazon SQS Scenario" />

**Challenge :**
However, what happens if the support agent creates a ticket but the technical specialist is busy working on another issue or unavailable? The agent would have to wait until the specialist is free to accept the new ticket, causing delays in resolving customer issues and extending wait times for customers
<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ques-messaging-sqs-scenario-challenge.png" alt="Amazon SQS Challenge" />

**Solution :** To improve efficiency, they implement a queue system using Amazon SQS. The support agent adds customer issues to the queue, creating a backlog. Even if the specialist is busy, the agent can continue adding new issues. The specialist checks the queue, resolves issues, and updates the agent
<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-ques-messaging-sqs-scenario-solution.png" alt="Amazon SQS Solution" />

## Amazon SNS

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-sns.png" alt="Amazon SNS LOGO" />

Amazon SNS is a publish-subscribe service that publishers use to send messages to subscribers through SNS topics. In Amazon SNS, subscribers can include web servers, email addresses, Lambda functions, and various other endpoints. You will learn about Lambda in more detail later.

#### Amazon SNS Use Case Scenario

A company sending a single email to all customers with updates on various topics, such as new products, special offers, and upcoming events. Customers want to receive only the updates they’re interested in. The current email update is causing customer dissatisfaction and lower engagement.

1.  **Segment the communication :** The company decides to divide the communication into three separate topics, including one for new products, one for special offers, and one for events. Each topic will focus on a specific area of interest.
2.  **Let customers choose topics :**

- A customer might subscribe only to new product updates.<br/>
- Another customer might opt only for event notifications.<br/>
- A third customer might choose to subscribe to new product updates and special offers.<br/>

3. **Send tailored notifications :** With Amazon SNS, the company can send personalized notifications to subscribers based on their specific interests. Amazon SNS makes sure that these notifications are promptly delivered to the right audience, improving the efficiency and relevance of the communication.

</div>
## Comparsion EventBridge, Amazon SNS, and Amazon SQS

| Aspect                  | Amazon EventBridge                                       | Amazon SNS                                     | Amazon SQS                                     |
| ----------------------- | -------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| **Primary Pattern**     | Event routing & filtering                                | Publish/Subscribe (Pub/Sub)                    | Message queuing                                |
| **Main Use Case**       | Event-driven architectures, application integration      | Notifications, broadcasting, fan-out messaging | Asynchronous processing, workload distribution |
| **Message Flow**        | Many sources → Event bus → Many targets (based on rules) | Publisher → Topic → Multiple subscribers       | Producer → Queue → Consumer(s)                 |
| Opensource Alternatives | - **Apache Kafka** <br/>                                 | - **Apache Kafka** <br/>- **Redis Pub/Sub**    | - **Apache Kafka** <br/>- \***\*RabbitMQ\*\*** |

**Key Similarities:**

- All support encryption at rest and in transit
- All integrate with AWS IAM for access control
- All offer high availability and durability
- All support Cloud Watch monitoring and logging

**When to Use Each:**

- **EventBridge**: When you need sophisticated event routing between multiple services and applications
- **SNS**: When you need to notify multiple subscribers about the same event immediately
- **SQS**: When you need reliable message storage and processing with the ability to handle failures gracefully

**Common Architecture Pattern:** EventBridge receives events → triggers SNS for notifications → SNS delivers to SQS queues for background processing.
