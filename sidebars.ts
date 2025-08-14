import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// Helper function to truncate long titles
function truncateTitle(title: string, maxLength: number = 40): string {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength - 3) + "...";
}

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "index",
    {
      type: "category",
      label: "Ubuntu Private Lab",
      link: {
        type: "doc",
        id: "ubuntu-private-lab/index",
      },
      items: [
        {
          type: "doc",
          id: "ubuntu-private-lab/code-server",
          label: "Code Server",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/coolify-paas",
          label: "Coolify Paas",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/custom-commands-library",
          label: "Custom Commands Library",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/docker-management",
          label: "Docker Management",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/docker-setup",
          label: "Docker Setup",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/executable-shell-scripts",
          label: "Executable Shell Scripts",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/file-directory-management",
          label: "File Directory Management",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/ha-proxy-load-balancer",
          label: "Ha Proxy Load Balancer",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/initial-hardening-setup",
          label: "Initial Hardening Setup",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/initial-utilities-setup",
          label: "Initial Utilities Setup",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/linux-ssh-key-generation",
          label: "Linux Ssh Key Generation",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/linux-timezone-management",
          label: "Linux Timezone Management",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/mapping-sftp-connection",
          label: "Mapping Sftp Connection",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/memory-swap-space",
          label: "Memory Swap Space",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/monitoring-resource-performance",
          label: "Monitoring Resource Performance",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/nginx-proxy-manager",
          label: "Nginx Proxy Manager",
        },
        { type: "doc", id: "ubuntu-private-lab/nvm-node", label: "Nvm Node" },
        {
          type: "doc",
          id: "ubuntu-private-lab/ollama-container-interaction",
          label: "Ollama Container Interaction",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/tcp-udp-ports-allocated",
          label: "Tcp Udp Ports Allocated",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/tree-view-in-linux",
          label: "Tree View In Linux",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/ubuntu-user-account",
          label: "Ubuntu User Account",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/user-account-management-guide",
          label: "User Account Management Guide",
        },
        {
          type: "doc",
          id: "ubuntu-private-lab/vmt-virtualization-monitoring-tools",
          label: "Vmt Virtualization Monitoring Tools",
        },
      ],
    },
    {
      type: "category",
      label: "Landing Zone Concepts",
      link: {
        type: "doc",
        id: "landing-zone-concepts/index",
      },
      items: [
        {
          type: "category",
          label: "Architecture",
          items: [
            {
              type: "doc",
              id: "landing-zone-concepts/architecture/hashicorp-vault-secret",
              label: "Hashicorp Vault Secret",
            },
            {
              type: "doc",
              id: "landing-zone-concepts/architecture/Landing-zone-hld",
              label: "Landing Zone Hld",
            },
            {
              type: "doc",
              id: "landing-zone-concepts/architecture/landing-zone-architecture",
              label: "Landing Zone Architecture",
            },
          ],
        },
        {
          type: "category",
          label: "Discovery",
          items: [
            {
              type: "doc",
              id: "landing-zone-concepts/discovery/cloud-platform-requirement-questionnaire",
              label: "Cloud Platform Requirement Questionnaire",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "MS Windows",
      link: {
        type: "doc",
        id: "ms-windows/index",
      },
      items: [
        {
          type: "doc",
          id: "ms-windows/ansible-installation",
          label: "Ansible Installation",
        },
        { type: "doc", id: "ms-windows/ansible", label: "Ansible" },
        {
          type: "doc",
          id: "ms-windows/hashicorp-vault",
          label: "Hashicorp Vault",
        },
        {
          type: "doc",
          id: "ms-windows/multi-cloud-infrastructure-platform",
          label: "Multi Cloud Infrastructure Platform",
        },
        {
          type: "doc",
          id: "ms-windows/terraform-multi-cloud-setup",
          label: "Terraform Multi Cloud Setup",
        },
        {
          type: "category",
          label: "Powershell",
          items: [
            {
              type: "doc",
              id: "ms-windows/powershell/powershell-creating-ssh-keys",
              label: "Powershell Creating Ssh Keys",
            },
            {
              type: "doc",
              id: "ms-windows/powershell/powershell-network-information",
              label: "Powershell Network Information",
            },
            {
              type: "doc",
              id: "ms-windows/powershell/powershell-symbolic-links-manual",
              label: "Powershell Symbolic Links Manual",
            },
          ],
        },
        {
          type: "category",
          label: "WSL",
          link: {
            type: "doc",
            id: "ms-windows/wsl/index",
          },
          items: [
            {
              type: "doc",
              id: "ms-windows/wsl/ubuntu-24.04-lts",
              label: "Ubuntu 24.04 Lts",
            },
            {
              type: "doc",
              id: "ms-windows/wsl/setup-windows-subsystem-for-linux",
              label: "Setup Windows Subsystem For Linux",
            },
            {
              type: "doc",
              id: "ms-windows/wsl/setup-wsl-putty-connection",
              label: "Setup Wsl Putty Connection",
            },
            {
              type: "doc",
              id: "ms-windows/wsl/lifecycle-operations",
              label: "Lifecycle Operations",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Kubernetes",
      link: {
        type: "doc",
        id: "kubernetes/index",
      },
      items: [
        {
          type: "doc",
          id: "kubernetes/architecture-components",
          label: "Architecture Components",
        },
        {
          type: "doc",
          id: "kubernetes/architecture-diagram",
          label: "Architecture Diagram",
        },
        {
          type: "doc",
          id: "kubernetes/deployment-guide",
          label: "Deployment Guide",
        },
        {
          type: "doc",
          id: "kubernetes/getting-started-guide",
          label: "Getting Started Guide",
        },
        {
          type: "category",
          label: "Home Lab",
          items: [
            {
              type: "doc",
              id: "kubernetes/home-lab/getting-started-home-lab",
              label: "Getting Started Home Lab",
            },
            {
              type: "doc",
              id: "kubernetes/home-lab/home-lab",
              label: "Home Lab",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Ansible",
      link: {
        type: "doc",
        id: "ansible/index",
      },
      items: [
        {
          type: "doc",
          id: "ansible/ansible-core-concepts",
          label: "Ansible Core Concepts",
        },
        {
          type: "doc",
          id: "ansible/ansible-ubuntu-hardining-palybook",
          label: "Ansible Ubuntu Hardining Palybook",
        },
        {
          type: "doc",
          id: "ansible/set-discovered-dhcp-ip",
          label: "Set Discovered Dhcp Ip",
        },
      ],
    },
    {
      type: "category",
      label: "Git",
      link: {
        type: "doc",
        id: "git/index",
      },
      items: [
        {
          type: "doc",
          id: "git/git-new-branch-in-repo",
          label: "Git New Branch In Repo",
        },
        {
          type: "doc",
          id: "git/starting-a-new-git-repo",
          label: "Starting A New Git Repo",
        },
      ],
    },
    {
      type: "category",
      label: "AWS",
      link: {
        type: "doc",
        id: "aws/index",
      },
      items: [
        {
          type: "category",
          label: "Services",
          items: [
            {
              type: "doc",
              id: "aws/srvices/ec2",
              label: "Elastic Compute Cloud (EC2)",
            },
            {
              type: "doc",
              id: "aws/srvices/ami",
              label: "Amazon Machine Images AMI",
            },
          ],
        },
        {
          type: "category",
          label: "Fundamentals",
          items: [
            {
              type: "doc",
              id: "aws/fundamentals/fundamentals-global-infrastructure",
              label: "Fundamentals Global Infrastructure",
            },
            {
              type: "doc",
              id: "aws/fundamentals/identity-access-management-iam",
              label: "Identity Access Management Iam",
            },
            {
              type: "doc",
              id: "aws/fundamentals/network-security-architecture",
              label: "Network Security Architecture",
            },
            {
              type: "doc",
              id: "aws/fundamentals/data-protection-encryption",
              label: "Data Protection Encryption",
            },
            {
              type: "doc",
              id: "aws/fundamentals/compute-application-security",
              label: "Compute Application Security",
            },
            {
              type: "doc",
              id: "aws/fundamentals/management-governance",
              label: "Management Governance",
            },
            {
              type: "doc",
              id: "aws/fundamentals/compliance-regulatory-adherence",
              label: "Compliance Regulatory Adherence",
            },
            {
              type: "doc",
              id: "aws/fundamentals/hybrid-cloud-connectivity",
              label: "Hybrid Cloud Connectivity",
            },
            {
              type: "doc",
              id: "aws/fundamentals/disaster-recovery-business-continuity",
              label: "Disaster Recovery Business Continuity",
            },
            {
              type: "doc",
              id: "aws/fundamentals/devsecops-automation",
              label: "Devsecops Automation",
            },
            {
              type: "doc",
              id: "aws/fundamentals/cost-management-optimization",
              label: "Cost Management Optimization",
            },
            {
              type: "doc",
              id: "aws/fundamentals/monitoring-detection-response",
              label: "Monitoring Detection Response",
            },
            {
              type: "doc",
              id: "aws/fundamentals/architecture-systems_engineering-principles",
              label: "Architecture Systems Engineering Principles",
            },
            {
              type: "doc",
              id: "aws/fundamentals/government-specific-aws-project-aspects",
              label: "Government Specific Aws Project Aspects",
            },
            {
              type: "doc",
              id: "aws/fundamentals/advanced-aws-topics-emerging-technologies",
              label: "Advanced Aws Topics Emerging Technologies",
            },
          ],
        },
        {
          type: "category",
          label: "Architecture",
          items: [
            {
              type: "doc",
              id: "aws/architecture/multi-azs-secured-networking-hybrid",
              label: "Multi Azs Secured Networking Hybrid",
            },
            {
              type: "doc",
              id: "aws/architecture/aws-advance-pass-architecture",
              label: "Aws Advance Pass Architecture",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Knowledge Base",
      link: {
        type: "doc",
        id: "heap-knowledge-base/index",
      },
      items: [
        {
          type: "doc",
          id: "heap-knowledge-base/api-gateways",
          label: "Api Gateways",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/api-security",
          label: "Api Security",
        },
        { type: "doc", id: "heap-knowledge-base/apis", label: "Apis" },
        {
          type: "doc",
          id: "heap-knowledge-base/aws-elastic-block-store",
          label: "Aws Elastic Block Store",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/aws-s3-storage-system",
          label: "Aws S3 Storage System",
        },
        { type: "doc", id: "heap-knowledge-base/aws-s3", label: "Aws S3" },
        {
          type: "doc",
          id: "heap-knowledge-base/aws-storage-types-and-use-cases",
          label: "Aws Storage Types And Use Cases",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/building-reliable-apis",
          label: "Building Reliable Apis",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/cicd-core-concepts",
          label: "Cicd Core Concepts",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/clean-software-architecture",
          label: "Clean Software Architecture",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/container-orchestration",
          label: "Container Orchestration",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/content-delivery-networks",
          label: "Content Delivery Networks",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/database-performance-strategies",
          label: "Database Performance Strategies",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/differences-between-virtualization-and-containerization",
          label: "Differences Between Virtualization And Containerization",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/distributed-caching",
          label: "Distributed Caching",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/dns-record-types",
          label: "Dns Record Types",
        },
        { type: "doc", id: "heap-knowledge-base/docker", label: "Docker" },
        {
          type: "doc",
          id: "heap-knowledge-base/free-apis-for-developers",
          label: "Free Apis For Developers",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/how-ssh-works",
          label: "How Ssh Works",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/http-protocol-evolution",
          label: "Http Protocol Evolution",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/http-request",
          label: "Http Request",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/identity-services",
          label: "Identity Services",
        },
        { type: "doc", id: "heap-knowledge-base/ipv4", label: "Ipv4" },
        {
          type: "doc",
          id: "heap-knowledge-base/json-web-token",
          label: "Json Web Token",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/kubernetes",
          label: "Kubernetes",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/mastering-database-selection",
          label: "Mastering Database Selection",
        },
        { type: "doc", id: "heap-knowledge-base/mcp", label: "Mcp" },
        {
          type: "doc",
          id: "heap-knowledge-base/message-queues",
          label: "Message Queues",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/microservices-architecture-data-sharing",
          label: "Microservices Architecture Data Sharing",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/microservices-design-patterns",
          label: "Microservices Design Patterns",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/microservices-sidecar-pattern",
          label: "Microservices Sidecar Pattern",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/modern-database-types",
          label: "Modern Database Types",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/monolith-vs-microservices",
          label: "Monolith Vs Microservices",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/network-access-control-list",
          label: "Network Access Control List",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/network-hub-and-spoke",
          label: "Network Hub And Spoke",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/network-security-components-in-cloud-infrastructure",
          label: "Network Security Components In Cloud Infrastructure",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/network-tapping",
          label: "Network Tapping",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/networking-the-essentials",
          label: "Networking The Essentials",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/openid-connect",
          label: "Openid Connect",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/proxy-vs-reverse-proxy",
          label: "Proxy Vs Reverse Proxy",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/redis-utils",
          label: "Redis Utils",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/rest-api-authentication-methods",
          label: "Rest Api Authentication Methods",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/rest-apis",
          label: "Rest Apis",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/saas-functional-requirements-backbone-part-2",
          label: "Saas Functional Requirements Backbone Part 2",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/security-information-and-event-management",
          label: "Security Information And Event Management",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/software-architecture-patterns",
          label: "Software Architecture Patterns",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/software-architecture-resources",
          label: "Software Architecture Resources",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/strategies-to-reduce-latency",
          label: "Strategies To Reduce Latency",
        },
        {
          type: "doc",
          id: "heap-knowledge-base/types-of-databases",
          label: "Types Of Databases",
        },
      ],
    },
    {
      type: "category",
      label: "Cyber Security",
      link: {
        type: "doc",
        id: "cyber-security/index",
      },
      items: [
        {
          type: "doc",
          id: "cyber-security/information-security-and-cyber-fundamentals",
          label: "Information Security And Cyber Fundamentals",
        },
        {
          type: "doc",
          id: "cyber-security/information-security-architecture",
          label: "Information Security Architecture",
        },
        {
          type: "doc",
          id: "cyber-security/critical-infrastructure-security",
          label: "Critical Infrastructure Security",
        },
        {
          type: "doc",
          id: "cyber-security/cyber-protection-in-cloud-and-hybrid-environments",
          label: "Cyber Protection In Cloud And Hybrid Environments",
        },
        {
          type: "doc",
          id: "cyber-security/identity-and-authorization-management-(iam)",
          label: "Identity And Authorization Management (Iam)",
        },
        {
          type: "doc",
          id: "cyber-security/communication-and-network-security",
          label: "Communication And Network Security",
        },
        {
          type: "doc",
          id: "cyber-security/information-security-and-privacy",
          label: "Information Security And Privacy",
        },
        {
          type: "doc",
          id: "cyber-security/application-security-and-secure-development",
          label: "Application Security And Secure Development",
        },
        {
          type: "doc",
          id: "cyber-security/monitoring,-detection-and-response-to-events",
          label: "Monitoring, Detection And Response To Events",
        },
        {
          type: "doc",
          id: "cyber-security/compliance-and-regulatory-management",
          label: "Compliance And Regulatory Management",
        },
        {
          type: "doc",
          id: "cyber-security/architecture-and-systems-engineering-skills",
          label: "Architecture And Systems Engineering Skills",
        },
        {
          type: "doc",
          id: "cyber-security/cloud-security",
          label: "Cloud Security",
        },
        {
          type: "doc",
          id: "cyber-security/enterprise-security-architecture",
          label: "Enterprise Security Architecture",
        },
        {
          type: "doc",
          id: "cyber-security/incident-response-and-forensics",
          label: "Incident Response And Forensics",
        },
        {
          type: "doc",
          id: "cyber-security/security-leadership-and-communication",
          label: "Security Leadership And Communication",
        },
      ],
    },
  ],
};

export default sidebars;
