---
title: OpenID Connect (OIDC)
slug: openid-connect-oidc
description: OpenID Connect (OIDC)
tags: [authentication, openid-connect, oauth, sso, jwt]
author: Nati Cabti
---

# OpenID Connect (OIDC)

OpenID Connect (OIDC) is ==an authentication protocol built on top of OAuth 2.0==. It allows applications to verify the identity of users and obtain basic profile information through a secure and standardized process. Essentially, OIDC enables users to log in to various relying party (RP) applications using their credentials from an [OpenID Provider (OP)](https://www.google.com/search?sa=X&sca_esv=66c16178c2a2ca00&rlz=1C1GCEA_enIL1131IL1132&biw=1745&bih=835&sxsrf=AE3TifPJ7WcSddh4ohZlXOZ5GFKRcQj8ZQ%3A1754819202991&q=OpenID+Provider+%28OP%29&ved=2ahUKEwjk3vT5-v-OAxW8FRAIHb5xKbsQxccNegQIPBAB&mstk=AUtExfDtqr4bamEdEdiUkWTGK7Jy8ElVm5fpNyTynLzVNpl3pZ03Tbo_gHmrUp5Lhi6dzIXmz0OKz-KldecKXgWCLf_aZJc2oa5XNadfLwpw9cy-Wkp5bPKkWBBWg1iuoqEKo-NQrnyXvPq0Pm4Sps4bIAMdOHd4wQ9TcWSU9DB-upQEyxDFCGXOoEaj6vVTnkgsqb2H3U1-hZEAOJ5bnY_6pcZ667yNF1Jj0yWzkkhadUem8tlqBL-7lQbpUv01Dk4tgPbEqSN7O6zo73T6jchekiiO&csui=3), such as their email provider or social network, achieving [single sign-on (SSO)](https://www.google.com/search?sa=X&sca_esv=66c16178c2a2ca00&rlz=1C1GCEA_enIL1131IL1132&biw=1745&bih=835&sxsrf=AE3TifPJ7WcSddh4ohZlXOZ5GFKRcQj8ZQ%3A1754819202991&q=single+sign-on+%28SSO%29&ved=2ahUKEwjk3vT5-v-OAxW8FRAIHb5xKbsQxccNegQIPBAC&mstk=AUtExfDtqr4bamEdEdiUkWTGK7Jy8ElVm5fpNyTynLzVNpl3pZ03Tbo_gHmrUp5Lhi6dzIXmz0OKz-KldecKXgWCLf_aZJc2oa5XNadfLwpw9cy-Wkp5bPKkWBBWg1iuoqEKo-NQrnyXvPq0Pm4Sps4bIAMdOHd4wQ9TcWSU9DB-upQEyxDFCGXOoEaj6vVTnkgsqb2H3U1-hZEAOJ5bnY_6pcZ667yNF1Jj0yWzkkhadUem8tlqBL-7lQbpUv01Dk4tgPbEqSN7O6zo73T6jchekiiO&csui=3).

![[authentication-openid-connect.png]]

Here's a more detailed breakdown:

Core Functionality:

- **Authentication:**
  OIDC verifies the identity of a user, ensuring they are who they claim to be.
- **[Single Sign-On (SSO)](https://www.google.com/search?sa=X&sca_esv=66c16178c2a2ca00&rlz=1C1GCEA_enIL1131IL1132&biw=1745&bih=835&sxsrf=AE3TifPJ7WcSddh4ohZlXOZ5GFKRcQj8ZQ%3A1754819202991&q=Single+Sign-On+%28SSO%29&ved=2ahUKEwjk3vT5-v-OAxW8FRAIHb5xKbsQxccNegUIjwEQAQ&mstk=AUtExfDtqr4bamEdEdiUkWTGK7Jy8ElVm5fpNyTynLzVNpl3pZ03Tbo_gHmrUp5Lhi6dzIXmz0OKz-KldecKXgWCLf_aZJc2oa5XNadfLwpw9cy-Wkp5bPKkWBBWg1iuoqEKo-NQrnyXvPq0Pm4Sps4bIAMdOHd4wQ9TcWSU9DB-upQEyxDFCGXOoEaj6vVTnkgsqb2H3U1-hZEAOJ5bnY_6pcZ667yNF1Jj0yWzkkhadUem8tlqBL-7lQbpUv01Dk4tgPbEqSN7O6zo73T6jchekiiO&csui=3):**
  It allows users to log in once and access multiple applications without needing to re-authenticate each time.

- **ID Tokens:**
  OIDC uses [JSON Web Tokens (JWTs)](https://www.google.com/search?sa=X&sca_esv=66c16178c2a2ca00&rlz=1C1GCEA_enIL1131IL1132&biw=1745&bih=835&sxsrf=AE3TifPJ7WcSddh4ohZlXOZ5GFKRcQj8ZQ%3A1754819202991&q=JSON+Web+Tokens+%28JWTs%29&ved=2ahUKEwjk3vT5-v-OAxW8FRAIHb5xKbsQxccNegUIjQEQAQ&mstk=AUtExfDtqr4bamEdEdiUkWTGK7Jy8ElVm5fpNyTynLzVNpl3pZ03Tbo_gHmrUp5Lhi6dzIXmz0OKz-KldecKXgWCLf_aZJc2oa5XNadfLwpw9cy-Wkp5bPKkWBBWg1iuoqEKo-NQrnyXvPq0Pm4Sps4bIAMdOHd4wQ9TcWSU9DB-upQEyxDFCGXOoEaj6vVTnkgsqb2H3U1-hZEAOJ5bnY_6pcZ667yNF1Jj0yWzkkhadUem8tlqBL-7lQbpUv01Dk4tgPbEqSN7O6zo73T6jchekiiO&csui=3) called ID tokens to securely transmit user information between the OP and the relying party.
- **Extensibility:**
  The protocol is designed to be extensible, allowing for features like encryption, discovery, and session management.

Relationship with OAuth 2.0:

- OIDC builds upon the OAuth 2.0 framework for authorization, adding authentication capabilities.

- While OAuth 2.0 focuses on authorization (granting access to resources), OIDC focuses on user authentication.

- OIDC utilizes OAuth 2.0 flows like the Authorization Code Flow to obtain tokens and user information.

How it works:

- **1.** **User requests access:**

  A user attempts to access a relying party (application) that uses OIDC for authentication.

- **2.** **Redirection to OpenID Provider:**

  The RP redirects the user to the OpenID Provider (OP) for authentication.

- **3.** **User authentication:**

  The user authenticates with the OP (e.g., logging in with their email and password or using other methods).

- **4.** **Authorization and token exchange:**

  The OP verifies the user's identity and, if successful, redirects the user back to the RP, along with an authorization code.

- **5.** **Token retrieval and validation:**

  The RP exchanges the authorization code for an ID token and potentially an access token at the OP's token endpoint.

- **6.** **User information retrieval:**
  The RP can then use the ID token and access token to retrieve user information from the OP.

Key Benefits:

- **Improved Security:**

  By delegating authentication to trusted OpenID Providers, OIDC reduces the risk of password-related security breaches for relying parties.

- **Enhanced User Experience:**

  Single sign-on simplifies the login process for users, making it more convenient.

- **Reduced Development Effort:**

  OIDC provides a standardized way for applications to authenticate users, reducing the need for custom authentication solutions.

- **Interoperability:**
  OIDC is an open standard, ensuring interoperability between different OpenID Providers and relying parties.
