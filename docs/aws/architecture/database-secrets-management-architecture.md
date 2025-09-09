---
title: "Database Secrets Management Architecture"
description: "A serverless, automated solution for storing, retrieving, and rotating Amazon RDS database credentials using AWS Secrets Manager, AWS Lambda, and VPC Endpoints. This architecture ensures applications can securely access databases without hardcoded secrets, while meeting strict compliance and security requirements."
tags:
  [
    aws,
    security,
    database,
    rds,
    secrets-manager,
    lambda,
    vpc,
    serverless,
    iam,
    compliance,
  ]
author: "Nati Cabti"
date: 2025-08-12
---

# Database Secrets Management Architecture

<img style={{ overflowX: 'scroll' }} src="/img/aws/architecture/aws-secret-manager-rotattion-architecture.png" alt="Database Secrets Management Architecture" />

## Objective

Provide a secure, highly-available, and automated pattern for managing database credentials that enables applications to:

1. Store database credentials (username/password) securely, encrypted at rest (AWS Secrets Manager).
2. Retrieve secrets programmatically at runtime, eliminating hardcoded credentials from code (AWS Lambda).
3. Access secrets privately from within a VPC without traversing the public internet (VPC Endpoints).
4. Automate the periodic rotation of database credentials to meet security policies without application downtime (Secrets Manager Rotation Lambda).
5. Ensure least-privilege access to both the secrets and the database itself (IAM Roles).

## Architecture Overview

| Tier                  | Key AWS service(s)                | Why it was chosen                                                                                                                                      |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Secret Storage**    | AWS Secrets Manager               | Fully managed secret store; provides encryption, access control, and native rotation capabilities for Amazon RDS.                                      |
| **Compute**           | AWS Lambda                        | Serverless execution for the application and rotation logic; scales on demand, pay-per-use, integrates seamlessly with IAM.                            |
| **Database**          | Amazon RDS                        | Managed relational database (e.g., PostgreSQL, MySQL); handles patching, backups, and scaling, allowing focus on the application.                      |
| **Networking**        | Amazon VPC, VPC Endpoint          | Provides network isolation. The Interface VPC Endpoint allows private, secure communication between Lambda and Secrets Manager within the AWS network. |
| **Access & Identity** | AWS IAM                           | Defines granular permissions for what the application and rotation functions can access, enforcing the principle of least privilege.                   |
| **Observability**     | AWS CloudTrail, Amazon CloudWatch | Logs all API calls for auditing and security analysis (CloudTrail); stores logs and metrics from Lambda functions (CloudWatch).                        |

## Component Deep-dive

### 1. AWS Secrets Manager – The Central Vault

- Stores the Amazon RDS master username and password as a secret.
- Encrypts the secret at rest using AWS KMS keys (either AWS-managed or customer-managed).
- Fine-grained access is controlled via IAM policies attached to the roles assumed by the Lambda functions.
- Configured with an automatic rotation schedule (e.g., every 30 days).

### 2. The Application Lambda Function

- A serverless function containing the core business logic that needs to query the database.
- Resides within a VPC, typically in a public subnet if it needs internet access or a private subnet if it does not.
- Its IAM execution role grants it `secretsmanager:GetSecretValue` permission for the specific database secret.
- **At runtime:**
  1. The function makes an API call to Secrets Manager via the VPC endpoint.
  2. Secrets Manager validates the IAM permissions and returns the current database credentials.
  3. The function uses these credentials to establish a connection to the Amazon RDS instance and perform queries.

### 3. The Rotation Lambda Function

- A dedicated, specialized Lambda function provided and managed by AWS for rotating RDS credentials.
- Secrets Manager invokes this function on a predefined schedule (e.g., `cron(0 10 1 * ? *)` for the first of every month).
- **Rotation Process:**
  1. **Create Secret:** The function creates a new password and tests it on the database.
  2. **Set Secret:** It updates the password in Secrets Manager with the new value, creating a new version of the secret.
  3. **Test Secret:** The function verifies that the new secret works by connecting to the database.
  4. **Finish Secret:** The new secret version is marked as the current one (`AWSCURRENT`). The old version is marked as previous (`AWSPREVIOUS`) for potential rollback.

### 4. VPC Endpoint for Secrets Manager

- An **Interface VPC Endpoint** creates an Elastic Network Interface (ENI) in a private subnet of the VPC.
- This ENI acts as a private entry point to the Secrets Manager service API.
- All traffic from the Lambda functions to Secrets Manager is routed through this endpoint, ensuring it never leaves the AWS network.
- This is a critical security control that prevents data exfiltration and reduces the attack surface.

## Security Controls (Defense in Depth)

| Layer           | Controls                                                                                                                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Identity**    | IAM roles with least-privilege policies for both Application and Rotation Lambdas. The application only has `GetSecretValue`, while the rotator has permissions to modify the secret and the database user's password. |
| **Network**     | The RDS instance is in a private subnet with no direct internet access. Security Groups restrict database traffic (e.g., port 5432) to only come from the application's Lambda function.                               |
| **Data**        | Secrets are encrypted at rest in Secrets Manager using KMS. In-transit encryption is enforced via TLS for all connections (Lambda to Secrets Manager, Lambda to RDS).                                                  |
| **Application** | No hardcoded credentials in the application code or environment variables. Secrets are retrieved dynamically at invocation time.                                                                                       |
| **Auditing**    | AWS CloudTrail is enabled to log every API call to Secrets Manager (`GetSecretValue`, `PutSecretValue`, etc.), providing a complete audit trail of who accessed which secret and when.                                 |

## Typical Data Flow Walk-through

1. The **Application Lambda** function is invoked (e.g., by an API Gateway request or an S3 event).
2. The function's code makes a `get_secret_value` SDK call to the AWS Secrets Manager service.
3. Because the function is in a VPC, the request is routed through the **VPC Endpoint** directly to Secrets Manager within the AWS network.
4. Secrets Manager authenticates the request using the Lambda's IAM execution role and returns the current database credentials (username/password).
5. The application code uses the retrieved credentials to connect to the **Amazon RDS** instance in the private subnet.
6. The application performs its database operations (e.g., `SELECT`, `INSERT`).
7. Separately, on a schedule, Secrets Manager invokes the **Rotation Lambda**.
8. The Rotation Lambda communicates with both Secrets Manager (to update the stored secret) and Amazon RDS (to change the user's password on the database itself), completing the rotation cycle seamlessly.

---

## Reference Bill of Materials (Pay-as-you-go)

| Service & Config                  | Unit             | On-Demand Price | Free-Tier              |
| --------------------------------- | ---------------- | --------------- | ---------------------- |
| AWS Secrets Manager               | secret per month | $0.40           | —                      |
| AWS Secrets Manager API Calls     | 10,000 calls     | $0.05           | —                      |
| VPC Endpoint (per AZ)             | hour             | $0.01           | —                      |
| AWS Lambda (128 MB, 500 ms avg)   | invoke           | $0.0000001042   | 1 M invocations        |
| Amazon RDS (db.t3.micro)          | hour             | $0.017          | 750 h/mo for 12 months |
| **Total** for 100k invocations/mo | month            | ≈ **$10**       |                        |

## Operational Tips

- **Use Multi-AZ for RDS:** For production workloads, deploy RDS in a Multi-AZ configuration for high availability.
- **Set CloudWatch Alarms:** Create alarms for rotation failures. Secrets Manager will emit a `RotationFailed` event to CloudWatch Events, which can trigger an SNS notification to your operations team.
- **Fine-tune IAM Policies:** Restrict `GetSecretValue` to the specific ARN of the secret needed by the application. Avoid using wildcards (`*`).
- **Leverage Connection Pooling:** For high-throughput Lambda applications, use a connection pool (like RDS Proxy or a library) to avoid exhausting database connection limits.
- **Tagging:** Apply consistent tags (`Environment`, `Application`, `Owner`) to all resources (Lambda, RDS, Secret) for better cost allocation and resource management.
