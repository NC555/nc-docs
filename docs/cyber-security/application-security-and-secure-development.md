# Section 08: Application Security and Secure Development

## 8.1. Secure Software Development Lifecycle (SSDLC)

- **Integration into SDLC:** Expertise in integrating security activities into every phase of the software development lifecycle (SDLC), from requirements gathering to deployment and maintenance (e.g., using models like Microsoft SDL, OWASP SAMM).
- **Security Requirements:** Ability to define and incorporate security requirements and abuse cases during the initial design and planning phases.
- **Threat Modeling:** Proficiency in conducting threat modeling using methodologies like STRIDE or DREAD to identify and mitigate potential security threats early in the development process.

## 8.2. Secure Coding Practices

- **Input Validation:** Deep knowledge of techniques to validate and sanitize all inputs to prevent injection attacks (e.g., SQL injection, Cross-Site Scripting, command injection).
- **Output Encoding:** Understanding of context-aware output encoding to prevent XSS vulnerabilities when rendering user-supplied data.
- **Authentication and Session Management:** Ability to implement secure authentication mechanisms and robust session management to prevent session hijacking and unauthorized access.
- **Secure Error Handling:** Knowledge of how to implement error handling that does not expose sensitive information to attackers.
- **Language-Specific Vulnerabilities:** Awareness of common security vulnerabilities and best practices specific to programming languages like Java, Python, C#, and JavaScript.

## 8.3. Application Security Testing

- **Static Application Security Testing (SAST):** Experience with using SAST tools (e.g., SonarQube, Veracode, Checkmarx) to analyze source code for security vulnerabilities.
- **Dynamic Application Security Testing (DAST):** Proficiency in using DAST tools (e.g., OWASP ZAP, Burp Suite, Invicti) to test running applications for vulnerabilities from the outside.
- **Interactive Application Security Testing (IAST):** Familiarity with IAST tools that combine elements of SAST and DAST for more accurate vulnerability detection.
- **Software Composition Analysis (SCA):** Knowledge of using SCA tools to identify and manage vulnerabilities in open-source and third-party libraries.
- **Penetration Testing:** Ability to perform or interpret the results of manual penetration tests to uncover complex vulnerabilities.

## 8.4. CI/CD Security (DevSecOps)

- **Secure Pipeline Configuration:** Expertise in integrating security tools (SAST, DAST, SCA) into CI/CD pipelines to automate security testing.
- **Secret Management:** Knowledge of securely managing secrets (API keys, passwords, certificates) in a CI/CD environment using tools like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault.
- **Container Security:** Understanding of how to secure container images (e.g., using base image scanning, minimizing privileges) and container orchestration platforms (e.g., Kubernetes).
- **Infrastructure as Code (IaC) Security:** Ability to analyze IaC templates (e.g., Terraform, CloudFormation) for security misconfigurations before deployment.

## Interview Questions

### Question 1: Secure SDLC and Threat Modeling

**Question:** Explain how you would integrate security into a software development lifecycle (SDLC). What are the key phases where security activities should be performed, and how would you conduct threat modeling for a new web application?

### Expected Answer

**Summary:** The candidate should describe a "shift-left" approach, integrating security into every phase of the SDLC, not just as a final step. They must explain the purpose of threat modeling and name a relevant methodology.

**Detailed Answer Components:**

- **SDLC Integration:**
  - **Requirements:** Define security requirements, compliance needs, and abuse cases alongside functional requirements.
  - **Design:** Conduct threat modeling to identify architectural flaws. Design secure authentication, authorization, and session management.
  - **Implementation:** Follow secure coding standards, use safe libraries, and perform peer code reviews with a security focus.
  - **Testing:** Implement a mix of SAST, DAST, IAST, and SCA scans. Perform security-focused unit and integration testing. Conduct manual penetration testing for critical applications.
  - **Deployment:** Securely configure the production environment, manage secrets properly, and use Infrastructure as Code (IaC) scanning.
  - **Maintenance:** Continuously monitor for new vulnerabilities, have an incident response plan, and perform regular security updates.
- **Threat Modeling Process:**
  1.  **Decompose the Application:** Diagram the application's components, data flows, and trust boundaries.
  2.  **Identify Threats:** Use a methodology like **STRIDE** (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) to brainstorm threats for each component and data flow.
  3.  **Assess Risks:** Rate the identified threats using a system like **DREAD** (Damage, Reproducibility, Exploitability, Affected Users, Discoverability) or by assessing impact and likelihood.
  4.  **Determine Mitigations:** Define and prioritize security controls (e.g., input validation, encryption, access controls) to mitigate the highest-risk threats.

### Question 2: SAST, DAST, and IAST

**Question:** Compare and contrast Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), and Interactive Application Security Testing (IAST). When would you use each, and what are their respective advantages and limitations?

### Expected Answer

**Summary:** The candidate must correctly define SAST (white-box), DAST (black-box), and IAST (hybrid) and explain their ideal placement in the SDLC.

**Detailed Answer Components:**

- **SAST (Static Application Security Testing):**
  - **What:** Analyzes source code, byte code, or binaries without executing the application.
  - **When:** Early in the SDLC ("shift-left") during or right after coding. Integrates directly into IDEs and CI/CD pipelines.
  - **Pros:** Finds vulnerabilities early when they are cheapest to fix. Provides exact line numbers for vulnerabilities.
  - **Cons:** High rate of false positives. Cannot find runtime or environment-related vulnerabilities.
- **DAST (Dynamic Application Security Testing):**
  - **What:** Tests the running application by sending malicious or unexpected inputs from the outside, simulating an attacker.
  - **When:** Later in the SDLC, in a staging or testing environment.
  - **Pros:** Low false-positive rate. Finds runtime and configuration issues that SAST misses. Language-agnostic.
  - **Cons:** Provides no information about the code location of the vulnerability. Slower to run. Cannot find vulnerabilities in code that is not executed.
- **IAST (Interactive Application Security Testing):**
  - **What:** A hybrid approach that uses instrumentation within the running application to monitor its internal state while DAST-like tests are performed.
  - **When:** During runtime in a testing environment.
  - **Pros:** Combines the benefits of SAST and DAST. Low false positives with exact code location. Can see how data flows through the application.
  - **Cons:** Can have a performance impact. Can be more complex to set up and maintain. Supports a limited number of languages and frameworks compared to SAST/DAST.

### Question 3: Secure Coding Practices

**Question:** Describe common secure coding practices that developers should follow to prevent vulnerabilities such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF). How would you ensure these practices are adopted across a development team?

### Expected Answer

**Summary:** The candidate should list key technical controls for common web vulnerabilities and provide practical methods for ensuring team-wide adoption.

**Detailed Answer Components:**

- **Technical Controls:**
  - **SQL Injection:** Use of **parameterized queries** (prepared statements) is the primary defense. ORMs often handle this automatically. Input validation and least-privilege database access are also crucial.
  - **Cross-Site Scripting (XSS):** Implement **context-aware output encoding** on all user-supplied data before it is rendered in a browser. Use modern frontend frameworks (like React, Angular) that auto-encode by default. Implement a strong **Content Security Policy (CSP)**.
  - **Cross-Site Request Forgery (CSRF):** Use **anti-CSRF tokens** (synchronizer token pattern). Check the `Origin` or `Referer` header. Use the `SameSite` attribute on session cookies.
- **Adoption Strategy:**
  - **Training:** Provide regular, hands-on secure coding training.
  - **Standards and Checklists:** Maintain a clear, accessible secure coding standard and provide checklists for code reviews.
  - **Automation:** Integrate SAST and SCA tools into the CI/CD pipeline to automatically catch common errors.
  - **Code Review:** Make security a mandatory part of the peer code review process.
  - **Secure Libraries:** Provide and encourage the use of pre-vetted, secure libraries and components that handle security functions correctly.
  - **Security Champions:** Embed security-focused developers within teams to act as mentors and advocates.

### Question 4: API and Container Security

**Question:** What are the key security considerations for securing RESTful APIs and containerized applications? How do you ensure that APIs are protected against common threats, and what security measures are essential for a container orchestration platform like Kubernetes?

### Expected Answer

**Summary:** The candidate must address security for both APIs (authentication, authorization, data protection) and the container ecosystem (images, runtime, orchestration).

**Detailed Answer Components:**

- **API Security:**
  - **Authentication & Authorization:** Use strong, standardized mechanisms like **OAuth 2.0** or OIDC. Implement fine-grained authorization to enforce the principle of least privilege.
  - **Data Protection:** Enforce TLS for all communication. Validate all incoming data against a strict schema. Prevent excessive data exposure by tailoring responses to what the client needs.
  - **Rate Limiting & Throttling:** Protect against DoS attacks and abuse.
  - **Logging & Monitoring:** Keep detailed logs of API requests and monitor for suspicious activity.
- **Container & Kubernetes Security:**
  - **Image Security:** Use minimal, trusted base images. Scan images for known vulnerabilities (SCA) and misconfigurations. Use multi-stage builds to keep production images lean.
  - **Runtime Security:** Run containers with the least privilege possible (e.g., as a non-root user, with a read-only file system). Use tools like Falco or Aqua Security for runtime threat detection.
  - **Network Security:** Use **Network Policies** in Kubernetes to restrict traffic flow between pods (micro-segmentation). Use a service mesh like Istio for mTLS between services.
  - **Secret Management:** Use built-in Kubernetes Secrets or integrate with an external secrets manager like HashiCorp Vault.
  - **Orchestrator Security:** Secure the Kubernetes API server with strong authentication and RBAC. Regularly update Kubernetes to patched versions.
