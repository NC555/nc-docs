# Kubernetes Priate Lab

This document provides a detailed overview of the architecture and key components of the Kube-Hetzner project, designed to provision and manage Kubernetes clusters on Hetzner Cloud using Terraform.

## 1. Overall Architecture

The project leverages **Hetzner Cloud** as the Infrastructure as a Service (IaaS) provider, with **Terraform** acting as the Infrastructure as Code (IaC) tool to define, provision, and manage the entire Kubernetes cluster lifecycle. **k3s** is chosen as the lightweight Kubernetes distribution, running on **openSUSE MicroOS** for its container-optimized features and robust update mechanisms.

The architecture can be visualized as:

- **Hetzner Cloud:** Provides the underlying compute (servers), networking (private networks, Floating IPs, Load Balancers), and storage (Volumes).
- **Terraform:** Manages all Hetzner Cloud resources and orchestrates the deployment of k3s.
- **k3s Cluster:** Deployed across multiple Hetzner Cloud servers, forming a highly available and scalable Kubernetes environment.

## 2. Core Kubernetes Components

### 2.1. Control Plane Nodes

- **Purpose:** Host the Kubernetes control plane components (API Server, etcd, Scheduler, Controller Manager).
- **High Availability (HA):** For production environments, an odd number of control plane nodes (e.g., 3 or 5) is recommended to maintain etcd quorum and ensure resilience against node failures.
- **Placement Groups:** Can be used to distribute control plane nodes across different physical hosts for enhanced fault tolerance.

### 2.2. Worker Nodes

- **Purpose:** Run user workloads (Pods, Deployments, etc.).
- **Scalability:** The cluster can be scaled by adding or removing worker nodes.
- **Kubernetes Cluster Autoscaler:** Optionally integrates with Hetzner Cloud to automatically adjust the number of worker nodes based on workload demand.

## 3. Networking

### 3.1. Hetzner Private Networks

- **Purpose:** Provide isolated and secure communication between cluster nodes.
- **Configuration:** Nodes are typically provisioned within a dedicated private network.
- **CIDR Allocation:** Proper CIDR block allocation is crucial for network planning.

### 3.2. Load Balancers

- **Hetzner Cloud Load Balancer:**
  - Used to expose the Kubernetes API server to external access, providing a stable endpoint for `kubectl`.
  - Can also be used as an ingress load balancer to distribute external traffic to services running within the cluster.
- **Klipper LoadBalancer:** k3s includes an embedded on-metal load balancer for services of type `LoadBalancer` within the cluster, useful for internal service exposure or when a dedicated Hetzner Cloud Load Balancer is not desired for every service.

### 3.3. Container Network Interfaces (CNI)

- **Flannel (Default):** A simple and widely used CNI for basic pod networking.
- **Calico:** Provides more advanced networking features, including network policies for fine-grained control over pod communication.
- **Cilium:** A powerful CNI that offers advanced networking, security (e.g., BPF-based network policies), and observability features. It can also be configured with an Egress Gateway for controlled outbound traffic.

### 3.4. Floating IPs

- **Purpose:** Provide static, public IP addresses that can be reassigned between servers.
- **Usage:** Often used for the Kubernetes API server endpoint to ensure a consistent access point even if the primary control plane node changes.

## 4. Storage

### 4.1. Longhorn

- **Type:** Cloud-native distributed block storage for Kubernetes.
- **Features:** Provides highly available, persistent storage by replicating data across multiple nodes.
- **Backend:** Can utilize local node storage or Hetzner Cloud Volumes.

### 4.2. Hetzner CSI Driver

- **Purpose:** Enables dynamic provisioning of PersistentVolumes (PVs) in Kubernetes, backed by Hetzner Cloud Volumes.
- **Integration:** Allows Kubernetes workloads to request and use Hetzner Cloud Volumes directly.

### 4.3. CSI Driver for SMB

- **Purpose:** Integrates Hetzner Storage Box (SMB/CIFS shares) as persistent storage for Kubernetes.
- **Use Case:** Useful for scenarios requiring shared file storage.

### 4.4. k3s Local Storage Provisioner

- **Purpose:** Provides local path PersistentVolumes, useful for single-node setups or when data locality is desired.

## 5. Automation and Management

### 5.1. Kured (KUbernetes REboot Daemon)

- **Purpose:** Automates safe node reboots after OS updates, ensuring minimal disruption to workloads.

### 5.2. System Upgrade Controller

- **Purpose:** Facilitates automated k3s version upgrades, simplifying cluster maintenance.

### 5.3. Rancher Manager (Optional)

- **Purpose:** A comprehensive platform for managing multiple Kubernetes clusters, offering a centralized UI for operations, monitoring, and application deployment.

## 6. Security

### 6.1. SSH Key Management

- **Requirements:** Supports `ed25519` and `rsa-sha2-512/256` keys.
- **Best Practices:** Use passphrase-protected keys with an SSH agent (`ssh-add`) for enhanced security.

### 6.2. Hetzner Firewall Rules

- **Configuration:** Essential for securing the cluster by controlling inbound and outbound traffic.
- **Typical Rules:** Allow SSH access, Kubernetes API access, custom application ports, and restrict outbound traffic as needed.

### 6.3. SELinux

- **Purpose:** Provides mandatory access control (MAC) for enhanced security on Linux systems.
- **Integration:** Can be configured with `udica` for generating custom SELinux policies for containerized applications.

### 6.4. WireGuard

- **Usage:** Can be used with CNIs like Cilium for encrypting inter-node communication, enhancing data security in transit.

## 7. Terraform Module Structure and Inputs

The `kube-hetzner` Terraform module encapsulates the logic for deploying the cluster. Key aspects include:

- **Input Variables:** The `LLMs and Kubernetes` document provides a detailed, line-by-line explanation of all input variables, their purpose, default values, and implications. These variables allow extensive customization of the cluster.
- **`locals` Block:** Used for defining local variables to simplify configuration and improve readability.
- **`file()` Function:** Used to read content from files (e.g., SSH public keys, Helm chart values overrides).
- **`lifecycle` Meta-argument:** Specifically `ignore_changes`, used to prevent Terraform from managing certain resource attributes after initial creation (e.g., for attributes managed by Kubernetes itself).
- **Heredoc Syntax:** Used for multi-line string inputs, such as complex Helm chart `values_overrides`.

This architectural overview provides a foundational understanding of the Kube-Hetzner project, its components, and how they are managed. For detailed configuration options, refer to `LLMs and Kubernetes` and the `terraform-docs` output in `docs/terraform.md`.
