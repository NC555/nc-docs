# Section 05: Identity and Authorization Management (IAM)

## 1. Core Concepts and Principles

- **Identity Lifecycle Management:**

  - **Provisioning:** Creating and assigning digital identities and access privileges.
  - **Deprovisioning:** Revoking access and removing identities when a user's role changes or they leave the organization.
  - **Access Reviews:** Periodic re-evaluation and re-certification of user access rights to ensure they align with current roles and the Principle of Least Privilege. In government/classified contexts, these reviews are frequent, stringent, and heavily audited.

- **Core Principles:**
  - **Principle of Least Privilege (PoLP):** Granting users only the minimum permissions necessary to perform their job functions. This is a foundational concept in classified environments to limit data exposure.
  - **Separation of Duties (SoD):** Dividing critical functions among different individuals to prevent any single person from having end-to-end control, thereby reducing the risk of fraud or catastrophic error.
  - **Just-in-Time (JIT) Access:** Providing temporary, elevated access to resources for a specific task and a limited duration, automatically revoking it afterward. This is critical for privileged operations.
  - **Zero Trust:** Assumes no implicit trust within the network perimeter. Every access request must be authenticated, authorized, and encrypted before being granted.

## 2. Authentication and Authorization

- **Authentication Methods:**

  - **Multi-Factor Authentication (MFA):** Verifying a user's identity using multiple types of credentials (e.g., something you know, something you have, something you are).
  - **Passwordless Authentication:** Using methods like FIDO2/WebAuthn, biometrics, or cryptographic keys instead of passwords.
  - **Federated Authentication (SSO):** Allowing users to access multiple systems with a single set of credentials, managed by a trusted Identity Provider (IdP).

- **Access Control Models:**
  - **Role-Based Access Control (RBAC):** Assigning permissions based on defined user roles (e.g., "System Administrator," "Analyst").
  - **Attribute-Based Access Control (ABAC):** Granting access based on a dynamic evaluation of attributes of the user, resource, and environment.
  - **Policy-Based Access Control (PBAC):** A more flexible model where policies define access rules based on a combination of attributes and conditions.

## 3. Privileged Access Management (PAM)

- **PAM Lifecycle:**
  - **Discovery:** Identifying all privileged accounts and credentials across the environment.
  - **Management:** Securing and managing credentials in a centralized vault.
  - **Monitoring:** Recording and auditing all privileged sessions.
- **Key PAM Capabilities:**
  - **Credential Vaulting:** Securely storing and rotating passwords, SSH keys, and other secrets.
  - **Session Isolation and Monitoring:** Proxying privileged connections to prevent direct access and allow for real-time monitoring and recording.
  - **Privilege Elevation (JIT):** Temporarily granting elevated permissions for specific tasks.

## 4. Identity Federation and Single Sign-On (SSO)

- **Key Protocols:**
  - **SAML (Security Assertion Markup Language):** An XML-based standard for exchanging authentication and authorization data between an IdP and a Service Provider (SP).
  - **OAuth 2.0:** A framework for delegated authorization, allowing applications to obtain limited access to user accounts on an HTTP service.
  - **OpenID Connect (OIDC):** A simple identity layer built on top of OAuth 2.0, providing authentication and basic profile information.

## 5. Israeli Government and Classified Environment Context

- **INCD Directives:** The Israel National Cyber Directorate provides specific guidelines on IAM, mandating strong authentication (MFA), regular access reviews, and stringent management of privileged accounts, especially for critical infrastructure.
- **"Takanon 5777" (The Privacy Protection Regulations):** While focused on privacy, these regulations impose strict requirements on managing access to personal data, directly influencing IAM architecture.
- **Data Sovereignty and Residency:** In government systems, particularly those using cloud services like the Nimbus project, the identity store and IAM control plane must often reside within Israel's borders.
- **Inter-Agency Federation:** Securely federating identities across different government ministries and defense bodies requires robust, mutually trusted IdP frameworks and adherence to shared standards.

## 6. IAM in Cloud Environments (AWS, Azure, GCP)

- **AWS:**

  - **AWS IAM:** The core service for managing users, roles, and policies.
  - **AWS IAM Identity Center (Successor to AWS SSO):** Centralized access management across multiple AWS accounts and applications.
  - **AWS Secrets Manager / Parameter Store:** Securely store and manage credentials and secrets.

- **Azure:**

  - **Microsoft Entra ID (formerly Azure Active Directory):** A comprehensive cloud identity and access management solution.
  - **Entra ID Privileged Identity Management (PIM):** Provides JIT privileged access to Azure resources.
  - **Azure Key Vault:** A service for securely storing and accessing secrets.

- **GCP:**
  - **Cloud IAM:** Provides granular access control for GCP resources.
  - **Identity-Aware Proxy (IAP):** A Zero Trust access control service for applications running on GCP.
  - **Secret Manager:** A secure and convenient storage system for API keys, passwords, certificates, and other sensitive data.

## 7. Interview Questions

- "How would you design a secure IAM architecture for a hybrid environment that includes on-premise legacy systems and a multi-cloud deployment, all within the constraints of a classified government network?"
- "Describe the process for conducting a comprehensive access review in a large government organization. What are the key challenges?"
- "Explain the difference between authentication and authorization. How would you implement both in a Zero Trust architecture?"

### Expected Answer

A superior answer should be structured, detailed, and demonstrate a deep understanding of both theoretical concepts and practical implementation, especially within a high-security government context.

1.  **Acknowledge Core Constraints:** Immediately recognize the key challenges: the need to integrate modern (cloud) with legacy (on-premise) systems, the stringency of a classified network, and data sovereignty requirements (e.g., Nimbus project context).

2.  **Propose a Centralized, Federated Model:**

    - **Identity Provider (IdP):** Suggest a primary, high-assurance IdP. In a government context, this would likely be a hardened instance of Microsoft Entra ID or a similar on-premise Active Directory Federation Services (AD FS) that serves as the single source of truth.
    - **Federation:** Explain that this central IdP will federate identities to the cloud providers (AWS, Azure, GCP) using SAML or OIDC protocols. This ensures consistent authentication policies.
    - **On-Premise Integration:** For legacy systems, describe using an identity bridge or proxy (like Entra ID Application Proxy) to extend modern authentication to applications that don't natively support federation.

3.  **Enforce Strong Authentication (MFA):**

    - Mandate MFA for all access, referencing government-grade authenticators (e.g., PKI smart cards, hardware tokens) over less secure methods like SMS.
    - Mention Conditional Access Policies to dynamically adjust MFA requirements based on user location, device compliance, and risk level.

4.  **Implement Core Principles:**

    - **Zero Trust:** Explicitly state that the design follows a Zero Trust model where every access request is verified.
    - **PoLP and JIT:** Detail how Role-Based Access Control (RBAC) will be used to enforce the Principle of Least Privilege. For administrative tasks, a Privileged Access Management (PAM) solution is crucial for providing Just-in-Time (JIT) access, eliminating standing privileges.
    - **SoD:** Mention defining roles and policies that enforce Separation of Duties.

5.  **Address the "Classified" Aspect:**
    - **Session Monitoring:** All privileged sessions must be isolated, recorded, and audited via the PAM solution.
    - **Data Residency:** Emphasize that the IdP and key IAM components will be hosted within the national cloud region (e.g., AWS/Oracle cloud in Israel) to comply with data sovereignty laws.
    - **Access Reviews:** Mention a rigorous, automated, and manually audited quarterly or semi-annual access review process for all accounts, tied to the HR system for automated de-provisioning.

By structuring the answer this way, the candidate demonstrates strategic thinking, awareness of the specific regulatory environment, and practical knowledge of the tools required to build a secure and compliant IAM architecture.

- "Describe the process for conducting a comprehensive access review in a large government organization. What are the key challenges?"

### Expected Answer

1.  **Scope and Preparation:**

    - **Asset and Identity Inventory:** The first step is to have a complete, up-to-date inventory of all systems, applications, data repositories, and all user/service accounts with access to them.
    - **Define Materiality:** Not all access is equal. Classify systems and data by sensitivity (e.g., Classified, Secret, Top Secret) to prioritize the review.
    - **Tooling:** Identify the tools to be used. In a large organization, this cannot be done manually. It requires an Identity Governance and Administration (IGA) tool that can automatically pull access data from various systems (AD, cloud IAM, databases).

2.  **The Review Process (The "How"):**

    - **Attestation Campaigns:** Launch automated "attestation campaigns" using the IGA tool. The system sends reports to designated "certifiers."
    - **Identify Certifiers:** The certifier is typically the resource owner or the user's direct manager—someone who understands the business context of the access. This is a critical and often difficult step.
    - **Review and Certify/Revoke:** The certifier reviews each access right for their employees/systems and makes a decision:
      - **Certify:** The access is still required and appropriate.
      - **Revoke:** The access is no longer needed. The IGA tool should automatically trigger a de-provisioning workflow.
      - **Delegate/Reassign:** The certifier may not have enough context and can reassign the review to someone who does.
    - **Tracking and Escalation:** The IGA tool must track the campaign's progress. Un-reviewed access must be automatically escalated to a higher management level or security officer. Access that is not certified by the deadline should be automatically revoked based on a "deny-by-default" policy.

3.  **Key Challenges:**
    - **Scale and Complexity:** The sheer volume of users, systems, and permissions in a large government organization makes manual reviews impossible and strains even automated tools.
    - **"Rubber Stamping":** Certifiers, overwhelmed by long lists of permissions, may just approve everything without proper scrutiny. To counter this, use delta-based reviews (showing only _changes_ since the last review) and provide clear contextual information.
    - **Orphaned and Dormant Accounts:** Identifying accounts that are no longer associated with an active employee or have not been used for an extended period.
    - **Privileged and Non-Human Accounts:** Service accounts, API keys, and other non-human identities are often overlooked but pose a significant risk. They must be included in the review, with clear ownership defined.
    - **Lack of Context:** A manager may know an employee needs access to a system but not whether they need _administrator-level_ permissions. The IGA tool must provide rich context to enable informed decisions.

- "Explain the difference between authentication and authorization. How would you implement both in a Zero Trust architecture?"

### Expected Answer

1.  **Clear, Concise Definitions:**

    - **Authentication (AuthN):** "This is the process of **verifying who you are**." It's about proving an identity claim. The system asks, "Can you prove you are User X?" An analogy is showing your ID card (the authenticator) to a guard (the system) to prove your identity.
    - **Authorization (AuthZ):** "This is the process of **determining what you are allowed to do** _after_ you have been successfully authenticated." It's about granting permissions. The system asks, "Now that I know you are User X, what doors are you allowed to open?" An analogy is the guard checking a list to see which specific rooms your ID grants you access to.

2.  **Implementation in a Zero Trust Architecture:**

    - A key insight is that in Zero Trust, authentication and authorization are **not a one-time event** at the perimeter. They are continuous processes that happen with every single access request.

    - **Implementing Authentication (AuthN):**

      - **Strong Identity:** Every user and device has a strong, verifiable identity. This is established through a central, trusted Identity Provider (IdP) like Entra ID or Okta.
      - **Universal MFA:** Every authentication attempt, regardless of where it originates, must be protected by Multi-Factor Authentication (MFA). The "something you have" factor should be phishing-resistant (e.g., FIDO2/WebAuthn key).
      - **Device Trust:** Authentication isn't just about the user. The device's security posture (is it patched? is it encrypted? is malware protection active?) is a critical part of the authentication decision. This is checked via endpoint management tools.

    - **Implementing Authorization (AuthZ):**
      - **Policy Decision Point (PDP):** At the core of Zero Trust authorization is a central PDP. This is the "brain" that makes the access decision.
      - **Dynamic and Granular Policies:** The PDP uses a rich set of signals to make its decision in real-time. This is where Attribute-Based Access Control (ABAC) shines. The policy might look like this:
        - **ALLOW** `access`
        - **IF** `user.identity` is `authenticated` via `MFA`
        - **AND** `user.role` is `Financial Analyst`
        - **AND** `resource.data_sensitivity` is `Confidential`
        - **AND** `device.compliance_status` is `Healthy`
        - **AND** `request.location` is `Corporate Network`
        - **AND** `time` is `Business Hours`.
      - **Policy Enforcement Point (PEP):** The PDP's decision is sent to a PEP, which sits in front of the application or resource (e.g., an Identity-Aware Proxy, an API gateway, or a service mesh). The PEP is the "guard" that actually grants or denies access based on the PDP's instructions.
      - **Least Privilege:** Access is granted on a per-session, per-request basis, adhering strictly to the Principle of Least Privilege. The default policy is always to **deny**.

By explaining it this way, the candidate shows they understand the theoretical difference and, more importantly, how to apply it using the modern, dynamic, and continuous verification principles of Zero Trust.

- "You need to provide a third-party contractor with temporary, restricted access to a sensitive production environment. How would you use PAM and JIT principles to achieve this securely?"

### Expected Answer

A strong answer will outline a clear, auditable, and secure process that minimizes risk.

1.  **Onboarding and Identity Creation (The Foundation):**

    - **Identity Vetting:** First, the contractor's identity must be vetted through a formal process. They are not an anonymous user.
    - **Create a Dedicated, Time-Bound Account:** Do not give them a shared account or a permanent employee's credentials. Create a dedicated user account for the contractor in the central IdP (e.g., Entra ID, Okta). This account **must have an expiration date** that corresponds to the contract's end date.
    - **No Default Privileges:** This new account should have **zero** standing privileges in the production environment by default.

2.  **Implementing Privileged Access Management (PAM) and JIT (The Core):**

    - **Onboard to PAM:** The contractor's dedicated account is onboarded into the organization's Privileged Access Management (PAM) solution (e.g., CyberArk, Delinea, Entra ID PIM).
    - **Define an Access Policy:** Within the PAM tool, create a specific policy for this contractor. This policy defines:
      - **What they can access:** A specific, narrow set of target systems (e.g., `WebApp-Server-01`, `DB-Server-Prod-ReadOnly`). Access should be defined by an allow-list, not a deny-list.
      - **What they can do:** The specific commands or actions they are allowed to perform.
      - **When they can access it:** The access is not available 24/7. It must be requested.

3.  **The Just-in-Time (JIT) Access Workflow (The "How"):**

    - **The Request:** When the contractor needs to perform a task, they log into the PAM portal (authenticating with MFA). They submit a request for elevated access, specifying which system they need and providing a justification (e.g., "Applying security patch XYZ, Ticket #12345").
    - **The Approval:** The request triggers an approval workflow. It is routed to the system owner or a designated manager for approval. The approver can see the justification and the exact permissions being requested.
    - **The Access (Ephemeral and Proxied):**
      - Once approved, the PAM solution grants the contractor a temporary, highly-privileged role, but **only for a limited time** (e.g., 2 hours). This is the essence of JIT.
      - The contractor **never receives the actual password or credential**. The PAM tool establishes a **proxied and isolated session** to the target system. This means all traffic goes through the PAM solution.
    - **The Monitoring and Recording:** The entire session is **recorded in real-time**. Every keystroke and command is logged. The security team can monitor the session live and terminate it instantly if any suspicious activity is detected.
    - **The Revocation:** After the 2-hour window expires, the elevated permissions are **automatically revoked**. The session is terminated. To continue working, the contractor must submit a new request.

4.  **Offboarding (The Cleanup):**
    - When the contract ends, the central identity is disabled or deleted, and all associated policies in the PAM tool are removed. The audit logs of their sessions are retained for future review.

This structured approach demonstrates a mastery of modern security principles, showing how to grant necessary access without compromising control, visibility, or security posture.

- "You need to provide a third-party contractor with temporary, restricted access to a sensitive production environment. How would you use PAM and JIT principles to achieve this securely?"
