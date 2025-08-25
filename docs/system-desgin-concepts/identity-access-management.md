---
title: "Identity and Access Management Protocols: SSO, LDAP, SAML, OAuth2, and OIDC"
description: "An exploration of key protocols and concepts for secure identity management, including Single Sign-On (SSO), Identity Providers (IdP), LDAP, SAML, OAuth2, and OpenID Connect (OIDC), highlighting their roles, mechanisms, and ideal use cases."
tags:
  [
    "identity_management",
    "access_management",
    "sso",
    "single_sign_on",
    "ldap",
    "saml",
    "oauth2",
    "openid_connect",
    "oidc",
    "authentication",
    "authorization",
    "identity_provider",
    "federated_identity",
    "security_protocols",
  ]
author: "Nati Cabti"
date: "2025-04-16"
---

# Identity and Access Management (IAM)

<div class="aws__ImageCentered">
<!-- No specific image provided in the prompt for general IAM/SSO topics. -->
</div>

In today's interconnected digital landscape, securing data and managing user identities across numerous applications is paramount. IT administrators must select appropriate protocols and frameworks to deploy federated identity solutions, with Single Sign-On (SSO) being a central concept. This overview delves into the key protocols and concepts that enable robust identity and access management.

## IAM Concepts

### **Single Sign-On (SSO)**

**SSO** allows employees to log into multiple applications on a network with a single set of credentials, without needing to re-enter them for each application. With companies often using 170-200 applications, SSO significantly enhances user convenience and streamlines identity management for IT administrators and security teams.

- Google Workspace

### **Identity Provider (IdP)**

An **Identity Provider (IdP)** is a service that manages user identities and authenticates users. It's the "place where you manage your usernames" and their associated credentials, verifying a user's identity before granting access to other applications.

### **3rd Party IdP**

Often, an IdP is provided by a **3rd Party Authentication Provider** (e.g., Okta, Auth0, Google Identity Platform, Azure AD). These services handle the complex tasks of user authentication, managing identity stores, and supporting various authentication protocols, offloading this burden from individual applications.

## IAM Protocols

### **LDAP**

**LDAP** (Lightweight Directory Access Protocol) is an open, vendor-neutral, industry-standard application protocol for accessing and maintaining distributed directory information services.

- **Role:** It is used for authentications into Linux applications (e.g., OpenVPN, Docker, Jenkins) and for standalone authentication for resources like firewalls that might not support other protocols.
- **"Source of Truth":** LDAP servers often serve as the ultimate source of truth for user identities, providing IT organizations extensive control over authentication and authorization. Cloud-based LDAP services can reduce maintenance complexity and TCO.

### **SAML**

**SAML** (Security Assertion Markup Language) is an XML-based protocol designed to enable federated authentication and authorization across different security domains.

- **Function:** It lets an Identity Provider (IdP) transmit user credentials to a Service Provider (SP - the application) to both authenticate _and_ authorize the user simultaneously. This is a key differentiator from OAuth.
- **Tokens:** SAML uses **SAML assertions** (XML documents) as its "tokens" to convey authentication and authorization information.
- **Use Cases:** Widely adopted for enterprise applications due to its strong security model and ability to handle both authentication and authorization.

### **OAuth 2.0**

**OAuth 2.0** (Open Authorization) is an authorization framework that enables an application to obtain limited access to a user's account on an HTTP service, such as Facebook, GitHub, or Google.

- **Function:** Unlike SAML, OAuth 2.0 is primarily for **authorization** (delegated access). It allows third-party services to access user resources without exposing the user's credentials to those services. It _does not_ authenticate the user itself.
- **Tokens:** OAuth 2.0 provides **access tokens** to third-party service providers. These tokens grant specific, limited permissions.
- **Security:** OAuth 2.0 relies on underlying transport security like SSL/TLS for securing communication, rather than encrypting its tokens directly.
- **Use Cases:** Generally preferred for mobile deployments, consumer-facing applications, and scenarios where delegating limited access to resources is needed without full identity verification.

### **OpenID Connect**

**OpenID Connect (OIDC)** is an authentication layer built on top of the OAuth 2.0 framework.

- **Function:** OIDC adds identity to OAuth 2.0. While OAuth 2.0 handles authorization, OIDC provides a standardized way for IdPs to authenticate users and convey claims about them to client applications.
- **Tokens:** OIDC uses **ID tokens** (JSON Web Tokens - JWTs) which contain verifiable claims about the end-user (like user ID, name, email).
- **Use Cases:** Used when both authentication (who the user is) and authorization (what the user can do) are required, especially in modern web and mobile applications, often in conjunction with OAuth 2.0 for API access.

## How Single Sign-On (SSO) Works (SAML Example)

1.  **User Request:** A user attempts to access a resource (an application, acting as the Service Provider or SP).
2.  **Redirection to IdP:** The Service Provider detects that the user is not authenticated and redirects the user's browser to the SAML Identity Provider's (IdP) login page.
3.  **User Authentication:** The user inputs their username and password on the IdP's login page.
4.  **IdP Verification:** The IdP communicates with its backend user database to verify the user's credentials.
5.  **SAML Response:** Upon successful verification, the IdP generates a SAML assertion (a SAML response) containing authentication and authorization information, signs it, and sends it back to the user's browser.
6.  **Assertion to SP:** The user's browser forwards this SAML assertion to the original Service Provider.
7.  **User Authenticated & Authorized:** The Service Provider validates the SAML assertion and authenticates the user, granting them access to the requested resource.

## Comparison: LDAP, SAML, OAuth 2.0, and OpenID Connect

| Feature                    | LDAP                                                                               | SAML                                                                        | OAuth 2.0                                                                                              | OpenID Connect (OIDC)                                          |
| :------------------------- | :--------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| **Primary Function**       | Directory service, centralized identity management, authentication, authorization. | Federated identity, primarily for **authentication** and **authorization**. | Delegated **authorization** (granting access to resources).                                            | **Authentication** layer built on OAuth 2.0.                   |
| **Protocol Type**          | Client-server protocol (binary).                                                   | XML-based protocol (HTTP/HTTPS transport).                                  | Authorization framework (uses HTTP/HTTPS, JSON).                                                       | Authentication layer (uses HTTP/HTTPS, JSON Web Tokens).       |
| **Authentication Support** | Yes (direct authentication against directory).                                     | Yes (full authentication and session management).                           | No (relies on an external IdP for user authentication).                                                | Yes (provides user identity verification).                     |
| **Authorization Support**  | Yes (via directory attributes/groups).                                             | Yes (via attributes in assertions).                                         | Yes (core purpose - granular access to resources).                                                     | Yes (often combined with OAuth 2.0 for resource access).       |
| **Token/Assertion Type**   | N/A (direct bind/search).                                                          | SAML Assertions (XML).                                                      | Access Tokens (opaque string, JWT, etc.).                                                              | ID Tokens (JWT) for identity, Access Tokens for authorization. |
| **Key Attributes**         | Hierarchical directory, efficient queries, control over attributes.                | Cross-domain SSO, strong security, enterprise focus.                        | Secure delegated access, granular permissions, mobile/API friendly.                                    | Simple identity layer, interoperable, modern web/mobile.       |
| **Security Approach**      | Built-in mechanisms, strong reliance on transport security (LDAPS).                | Cryptographic signatures for assertions, strong message integrity.          | Relies on SSL/TLS for transport security, token revocation.                                            | Relies on SSL/TLS, signed JWTs for ID tokens.                  |
| **Typical Use Cases**      | Internal corporate directories, Linux app authentication, firewalls.               | Enterprise SSO, cloud application SSO (e.g., Salesforce, Workday).          | Granting third-party app access to user data (e.g., "Login with Google/Facebook" for app permissions). | Single Sign-On for modern web/mobile apps, API authentication. |

:::info
Choosing the right identity and access management protocol is critical for system security, user experience, and IT efficiency. Each protocol offers distinct advantages, making the decision dependent on the specific requirements for authentication, authorization, and the operational environment.
:::

**Use case:** Essential for security architects, system administrators, and developers designing and implementing identity management solutions, federated access, or integrating third-party services in both enterprise and consumer-facing applications.

## Additional Resources

- [What is SAML?](https://www.okta.com/identity-101/what-is-saml/)
- [OAuth 2.0 Explained](https://oauth.net/2/)
- [OpenID Connect Introduction](https://openid.net/connect/)
- [LDAP Protocol Overview](https://www.ibm.com/docs/en/SSFHSG/2.4?topic=concepts-overview-ldap-protocol)
