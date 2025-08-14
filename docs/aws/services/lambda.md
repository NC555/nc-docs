---
title: "AWS Lambda"
description: "AWS SQS, or Amazon Simple Queue Service, is a fully managed message queuing service that decouples applications, allowing them to communicate and process messages asynchronously"
tags: ["aws", "compute", "lambda", "serverless"]
author: "Nati Cabti"
date: "2025-08-11"
---

# Amazon Lambda

<div class="aws__ImageCentered">
<img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-lambda.png" alt="Amazon Lambda" />
</div>

AWS Lambda is a serverless compute service provided by Amazon Web Services (AWS) that allows users to run code without provisioning or managing servers. It operates on an "event-driven" model, meaning your code (packaged as a "function") is executed in response to various triggers or events.

## How Lambda works

1. **Upload code to Lambda :** First, upload the code to Lambda, which uploads as a Lambda function.
2. **Set code to trigger from an event source :** Next, configure your code to be triggered by events, like AWS services, mobile apps, or HTTP requests, [SQS queue](sqs).
3. **Set code to trigger from an event source :** Your code runs only when an event occurs, like a file upload or user action.
4. **Under The Hood :** Lambda automatically handles all the server management, scaling, and infrastructure. The Lambda runtime executes your function code using the event data passed to it.
