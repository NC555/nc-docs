---
title: "Section 02: Identity and Access Management (IAM)"
description: "A deep dive into AWS IAM, covering core concepts, policy types, and best practices for securing access in government and classified environments."
tags:
  [
    aws,
    iam,
    identity_management,
    access_control,
    security,
    least_privilege,
    mfa,
    federation,
    government_cloud,
    compliance,
    fedramp,
    nist,
    itar,
  ]
author: "Nati Cabti"
date: 2025-08-11
---

# Section 02: Identity and Access Management (IAM)

AWS IAM provides secure control over AWS resource access. In government and classified environments, IAM is critical for enforcing security policies, maintaining compliance, and preventing unauthorized access.

## Core IAM Concepts

```mermaid
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
      'primaryColor': '#6777ef',
      'primaryTextColor': '#002060',
      'primaryBorderColor': '#cdd3f7',
      'lineColor': '#00a9eb',
      'secondaryColor': '#e0e3fc',
      'tertiaryColor': '#ffffff'
    }
  }
}%%
graph LR
    IAM[IAM Service] --> U[Users]
    IAM --> G[Groups]
    IAM --> R[Roles]
    IAM --> P[Policies]

    U --> UA[Human Users]
    U --> UP[Programmatic Access]

    G --> UG[User Collections]

    R --> RT[Temporary Access]
    R --> RS[Service Roles]

    P --> Perm[Permissions]

    style IAM fill:#6777ef,stroke:#cdd3f7,color:#ffffff
    style U fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style G fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style R fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style P fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style UA fill:#ffffff,stroke:#cdd3f7
    style UP fill:#ffffff,stroke:#cdd3f7
    style UG fill:#ffffff,stroke:#cdd3f7
    style RT fill:#ffffff,stroke:#cdd3f7
    style RS fill:#ffffff,stroke:#cdd3f7
    style Perm fill:#ffffff,stroke:#cdd3f7
```

- **Users:** Individuals or applications that interact with AWS

  - For humans: Use federation with existing identity providers
  - For applications: Use IAM users with programmatic access

- **Groups:** Collections of IAM users that simplify permissions management

- **Roles:** Designed for temporary credentials and used by:

  - AWS services
  - Applications on EC2 instances
  - Federated users

- **Policies:** JSON documents defining permissions that specify who can do what on which resources

## Policy Types and Their Application

```mermaid
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
      'primaryColor': '#6777ef',
      'primaryTextColor': '#002060',
      'primaryBorderColor': '#cdd3f7',
      'lineColor': '#00a9eb',
      'secondaryColor': '#e0e3fc',
      'tertiaryColor': '#ffffff'
    }
  }
}%%
graph LR
    P[Policy Types] --> IB[Identity-based]
    P --> RB[Resource-based]
    P --> SCP[Service Control Policies]
    P --> PB[Permissions Boundaries]

    IB --> ID[Attached to<br/>Users/Groups/Roles]
    RB --> RS[Attached to<br/>Resources]
    SCP --> ORG[Organization-wide<br/>Guardrails]
    PB --> MAX[Maximum<br/>Permissions]

    style P fill:#6777ef,stroke:#cdd3f7,color:#ffffff
    style IB fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style RB fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style SCP fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style PB fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style ID fill:#ffffff,stroke:#cdd3f7
    style RS fill:#ffffff,stroke:#cdd3f7
    style ORG fill:#ffffff,stroke:#cdd3f7
    style MAX fill:#ffffff,stroke:#cdd3f7
```

- **Identity-based Policies:** Attached to users, groups, or roles
- **Resource-based Policies:** Attached directly to resources (e.g., S3 buckets)
- **Service Control Policies (SCPs):** Set maximum permissions across an organization
- **Permissions Boundaries:** Limit maximum permissions an identity-based policy can grant

## Best Practices for Government and Classified Environments

```mermaid
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
      'primaryColor': '#6777ef',
      'primaryTextColor': '#002060',
      'primaryBorderColor': '#cdd3f7',
      'lineColor': '#00a9eb',
      'secondaryColor': '#e0e3fc',
      'tertiaryColor': '#ffffff'
    }
  }
}%%
flowchart LR
    BP[Best Practices] --> LP[Least Privilege]
    BP --> MFA[Multi-Factor<br/>Authentication]
    BP --> AK[Access Key<br/>Management]
    BP --> RF[Role-based<br/>Federation]
    BP --> CM[Centralized<br/>Management]
    BP --> AM[Auditing &<br/>Monitoring]

    style BP fill:#6777ef,stroke:#cdd3f7,color:#ffffff
    style LP fill:#ffffff,stroke:#cdd3f7
    style MFA fill:#ffffff,stroke:#cdd3f7
    style AK fill:#ffffff,stroke:#cdd3f7
    style RF fill:#ffffff,stroke:#cdd3f7
    style CM fill:#ffffff,stroke:#cdd3f7
    style AM fill:#ffffff,stroke:#cdd3f7
```

- **Principle of Least Privilege:** Grant only permissions required to perform tasks

- **Multi-Factor Authentication (MFA):** Enforce for all accounts, especially privileged ones

- **Access Key Management:**

  - Avoid embedding keys in code
  - Use IAM roles for EC2 instances
  - Use temporary credentials via AWS STS

- **Role Assumption and Federation:**

  - Use roles for temporary access
  - Federate identities from enterprise directories

- **Centralized IAM Management:** Use AWS Organizations with SCPs

- **Regular Auditing and Monitoring:**
  - Utilize CloudTrail, AWS Config, and Security Hub
  - Integrate with SIEM systems

## Government-Specific Considerations

```mermaid
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
      'primaryColor': '#6777ef',
      'primaryTextColor': '#002060',
      'primaryBorderColor': '#cdd3f7',
      'lineColor': '#00a9eb',
      'secondaryColor': '#e0e3fc',
      'tertiaryColor': '#ffffff'
    }
  }
}%%
graph TD
    G[Government<br/>Considerations] --> I[Directory<br/>Integration]
    G --> C[Compliance<br/>Requirements]
    G --> A[Audit & ATO]
    G --> D[Data Residency]
    G --> N[Need-to-Know]

    C --> N1[NIST 800-53]
    C --> F[FedRAMP]
    C --> IT[ITAR]
    C --> IN[INCD/Shin Bet]

    style G fill:#6777ef,stroke:#cdd3f7,color:#ffffff
    style I fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style C fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style A fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style D fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style N fill:#00a9eb,stroke:#cdd3f7,color:#ffffff
    style N1 fill:#ffffff,stroke:#cdd3f7
    style F fill:#ffffff,stroke:#cdd3f7
    style IT fill:#ffffff,stroke:#cdd3f7
    style IN fill:#ffffff,stroke:#cdd3f7
```

- **Integration with Existing Directories:** Federate with on-premises identity systems

- **Compliance Requirements:**

  - NIST SP 800-53
  - FedRAMP
  - ITAR
  - Local regulations (e.g., Israeli National Cyber Directorate)

- **Audit Management and ATO:** IAM configurations are scrutinized during Authorization to Operate

- **Data Residency and Sovereignty:** Enforce geographic boundaries for sensitive data

- **Compartmentation:** Support "need-to-know" principles for classified environments

## Example: Classified Workload IAM Architecture

<img style={{ width: '100%', overflowX: 'auto' }} src="/img/aws/aws-iam-control-policy.svg" alt="AWS Advanced PAAS Architecture Diagram" />

A classified workload processing sensitive data would include:

- **Federated access** for human users via AWS SSO
- **Least privilege roles** for applications
- **Resource-based policies** on sensitive data
- **SCPs** for organizational guardrails
- **Permissions boundaries** for administrative roles
- **MFA enforcement** for all human access
- **Automated key rotation** for any necessary long-term credentials

## Conclusion

IAM is the cornerstone of AWS security for government and classified environments. Proper implementation ensures sensitive data protection while maintaining operational capabilities required for critical missions.
