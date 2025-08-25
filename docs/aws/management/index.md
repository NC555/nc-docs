## Importance of monitoring

Monitoring your cloud resources is important. It provides a way for you to continuously observe and analyze system activity, network traffic, and security events to detect potential threats or anomalies. Monitoring and observability are critical components for ensuring the security, availability, reliability, and performance of your cloud-based workloads and data.

Benefits of monitoring with a badge and lock, a clock with a gear saving time, and a cloud with sliding controls.
Monitoring is performed using real-time monitoring tools, log collection and analysis, and dashboards. In the following lessons, you will identify several different monitoring tools and what they do.

Watch over your resources and applications

## Amazon CloudWatch

img/aws/monitoring/amazon-cloudwatch-features.png

CloudWatch monitors your AWS resources and the applications that you run on AWS in real time. With CloudWatch, you gain system-wide visibility into resource utilization, application performance, and operational health. CloudWatch does more than just monitor. It has several features that work together:

- Metrics
  CloudWatch collects metrics from all your AWS resources, applications, and services that run on AWS and on-premises servers.

- Alarms
  CloudWatch dashboards

- Dashboards
  Customizable home pages in the CloudWatch console that you can use to monitor your resources in a single view.

- Logs
  To learn more about each CloudWatch feature, choose each of the following four numbered markers.

Technician wondering how they can watch over everything followed by four boxes of metrics, alarms, dashboards, and logs.

**Benefits:** CloudWatch helps you visualize and analyze your resources, operate efficiently with automation, use an integrated view, proactively monitor, and gain insights.

**Use case:** It can be used to monitor and troubleshoot infrastructure.

Example: A retail company is using CloudWatch features to monitor their application running on Amazon Elastic Compute Cloud (Amazon EC2) instances. CloudWatch automatically collects metrics, like utilization, on the EC2 instances. The company sets up CloudWatch to collect logs on the application performance. They also have alarms for when the Amazon EC2 utilization gets too high for an extended period. They even have an action configured to automate and scale up the number of EC2 instances when the alarm sounds. Finally, they create a custom dashboard to visualize everything all in one place. Now they can analyze the logs to gain insights on performance issues or application errors.

## Importance of auditing

Imagine a financial company with a hybrid cloud solution trying to figure out what happened when there are changes made to their resources in the cloud and on premises. They need this information for troubleshooting and to provide detailed records for compliance. That's where CloudTrail can help.

An IT worker looking to see what happened, who did this, and when at his on premises datacenter and AWS cloud resources.
CloudTrail icon

## AWS CloudTrail

img/aws/monitoring/amazon-cloudwatch-features.png

CloudTrail tracks user activity and API usage in the AWS Cloud, on premises, and even with other cloud providers. CloudTrail provides a detailed history of API calls, so you can track changes and identify who made them and when. This helps you understand what actions were taken on your AWS resources.

Benefits: CloudTrail provides auditing, security monitoring, and operational troubleshooting. It also helps you prove compliance and improve your security posture.

Use cases: It can be used for compliance and auditing, identifying security incidents, troubleshooting operational issues.

To learn more about CloudTrail features, expand each of the following three categories.

CloudTrail events
CloudTrail events capture details about actions performed within your AWS account, such as API calls, console actions, or other activities. Event history provides a viewable, searchable, downloadable, and immutable record of the past 90 days of management events in an AWS Region. There are no CloudTrail charges for viewing event history.

EC2 instance with an event happening that makes an alert that is sent to a phone.

CloudTrail logs
CloudTrail monitors events and delivers those events as log files to your Amazon Simple Storage Service (Amazon S3) bucket. Because CloudTrail logs are securely stored, they can be used to prove compliance with regulations such as Payment Card Industry (PCI) and Healthcare Insurance Portability and Accountability Act (HIPAA).

Several events happening to an S3 bucket generating some trails that are sent to a log.

CloudTrail Insights
CloudTrail Insights analyzes your normal patterns of API call volume and API error rates. CloudTrail Insights also generates Insights events when API call volumes and error rates deviate from these normal patterns. You can enable CloudTrail Insights in your trails or event data stores to detect anomalous behavior and unusual activity.

## AWS Health Dashboard

With AWS Health Dashboard, you can view account-specific health information and get AWS Health event updates. You can also use AWS Health programmatically using the AWS Health API, which is available with AWS Premium Support.

Benefits: AWS Health Dashboard provides valuable information as a data source for events and changes. It gives you timely and actionable guidance to remedy issues. It also helps manage service health and is integrated and automated to use at scale.

Use cases: Use AWS Health Dashboard to view account-specific health information. You can also use it to plan for lifecycle events or troubleshoot an incident.
