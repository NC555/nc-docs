# Getting Started with Kube-Hetzner

Welcome to the Kube-Hetzner project! This guide is designed to help new team members, especially those new to Terraform and Kubernetes, quickly understand the project's infrastructure and get started with deployment and management.

## 1. Project Overview

### 1.1 Features

#### Key Features:

- **Maintenance-free:** Automatic upgrades for both MicroOS and k3s.
- **Multi-architecture support:** Compatible with various Hetzner Cloud instances (including ARM).
- **Hetzner private network:** Minimizes latency for internal communication.
- **CNI Options:** Choice between Flannel, Calico, or Cilium.
- **Ingress Controllers:** Traefik, Nginx, or HAProxy with Hetzner Load Balancer integration.
- **Automatic HA:** Default setup includes three control-plane nodes and two agent nodes for high availability.
- **Autoscaling:** Node autoscaling via Kubernetes Cluster Autoscaler.
- **Storage:** Optional Longhorn and Hetzner CSI for persistent storage, with encryption at rest.
- **Flexible Configuration:** Extensive customization options via Terraform variables and Kustomization.

#### openSUSE MicroOS

- Optimized container OS, mostly read-only filesystem for security.
- Hardened by default (e.g., automatic IP ban for SSH).
- Evergreen release, leveraging OpenSUSE Tumbleweed's rolling release.
- Automatic updates and rollbacks using BTRFS snapshots.
- Supports Kured for proper node draining and reboots in HA setups.

#### k3s

- Certified Kubernetes Distribution, synced with upstream Kubernetes.
- Fast deployment due to its single binary nature.
- Batteries-included with in-cluster helm-controller.
- Easy automatic updates via the system-upgrade-controller.

### 1.2 Project Diagram

<div id="architecture-diagram" style={{ width: '100%', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
  <svg width="100%" viewBox="0 0 900 750" style={{ border: '1px solid #eee', borderRadius: '5px' }}>
    <!-- Background -->
    <rect width="900" height="900" fill="#f8f9fa" rx="10" ry="10"/>
    
    <!-- Hetzner Cloud -->
    <rect x="50" y="50" width="800" height="650" fill="#e6f7ff" stroke="#0099cc" stroke-width="2" rx="10" ry="10"/>
    <text x="450" y="80" text-anchor="middle" font-size="20" font-weight="bold" fill="#0066cc">Hetzner Cloud</text>
    
    <!-- Network -->
    <rect x="100" y="100" width="700" height="575" fill="#f0f8ff" stroke="#66aaff" stroke-width="2" rx="10" ry="10" stroke-dasharray="5,5"/>
    <text x="450" y="125" text-anchor="middle" font-size="16" fill="#0066cc">Private Network (10.0.0.0/16)</text>
    
    <!-- Control Plane Node -->
    <rect x="150" y="150" width="200" height="140" fill="#fff" stroke="#333" stroke-width="2" rx="5" ry="5"/>
    <text x="250" y="175" text-anchor="middle" font-size="16" font-weight="bold">Control Plane Node</text>
    <text x="250" y="195" text-anchor="middle" font-size="14">cx21 (2 vCPU, 4GB RAM)</text>
    <text x="250" y="215" text-anchor="middle" font-size="14">OpenSUSE MicroOS</text>
    <rect x="170" y="225" width="160" height="50" fill="#e6ffe6" stroke="#009900" stroke-width="1" rx="5" ry="5"/>
    <text x="250" y="255" text-anchor="middle" font-size="14">Kubernetes Control Plane</text>
    
    <!-- Worker Nodes -->
    <rect x="150" y="330" width="200" height="140" fill="#fff" stroke="#333" stroke-width="2" rx="5" ry="5"/>
    <text x="250" y="355" text-anchor="middle" font-size="16" font-weight="bold">Worker Node 1</text>
    <text x="250" y="375" text-anchor="middle" font-size="14">cx21 (2 vCPU, 4GB RAM)</text>
    <text x="250" y="395" text-anchor="middle" font-size="14">OpenSUSE MicroOS</text>
    <rect x="170" y="405" width="160" height="50" fill="#e6ffe6" stroke="#009900" stroke-width="1" rx="5" ry="5"/>
    <text x="250" y="435" text-anchor="middle" font-size="14">Kubernetes Worker</text>
    
    <rect x="150" y="510" width="200" height="140" fill="#fff" stroke="#333" stroke-width="2" rx="5" ry="5"/>
    <text x="250" y="535" text-anchor="middle" font-size="16" font-weight="bold">Worker Node 2</text>
    <text x="250" y="555" text-anchor="middle" font-size="14">cx21 (2 vCPU, 4GB RAM)</text>
    <text x="250" y="575" text-anchor="middle" font-size="14">OpenSUSE MicroOS</text>
    <rect x="170" y="585" width="160" height="50" fill="#e6ffe6" stroke="#009900" stroke-width="1" rx="5" ry="5"/>
    <text x="250" y="615" text-anchor="middle" font-size="14">Kubernetes Worker</text>
    
    <!-- Load Balancer -->
    <rect x="400" y="150" width="200" height="100" fill="#fff" stroke="#333" stroke-width="2" rx="5" ry="5"/>
    <text x="500" y="180" text-anchor="middle" font-size="16" font-weight="bold">Load Balancer (lb11)</text>
    <text x="500" y="200" text-anchor="middle" font-size="14">Hetzner Cloud LB</text>
    <text x="500" y="220" text-anchor="middle" font-size="14">HTTP(S) Traffic</text>
    
    <!-- Kubernetes Services -->
    <rect x="400" y="280" width="400" height="360" fill="#fff" stroke="#333" stroke-width="2" rx="5" ry="5"/>
    <text x="600" y="305" text-anchor="middle" font-size="16" font-weight="bold">Kubernetes Services</text>
    
    <!-- Row 1 -->
    <rect x="420" y="320" width="110" height="80" fill="#ffecb3" stroke="#e6ac00" stroke-width="1" rx="5" ry="5"/>
    <text x="475" y="345" text-anchor="middle" font-size="14" font-weight="bold">Nginx Ingress</text>
    <text x="475" y="365" text-anchor="middle" font-size="12">Application Routing</text>
    <text x="475" y="385" text-anchor="middle" font-size="12">TLS Termination</text>
    
    <rect x="545" y="320" width="110" height="80" fill="#ffecb3" stroke="#e6ac00" stroke-width="1" rx="5" ry="5"/>
    <text x="600" y="345" text-anchor="middle" font-size="14" font-weight="bold">Cert Manager</text>
    <text x="600" y="365" text-anchor="middle" font-size="12">TLS Certificates</text>
    <text x="600" y="385" text-anchor="middle" font-size="12">Auto Renewal</text>
    
    <rect x="670" y="320" width="110" height="80" fill="#ffecb3" stroke="#e6ac00" stroke-width="1" rx="5" ry="5"/>
    <text x="725" y="345" text-anchor="middle" font-size="14" font-weight="bold">ArgoCD</text>
    <text x="725" y="365" text-anchor="middle" font-size="12">GitOps Deployments</text>
    <text x="725" y="385" text-anchor="middle" font-size="12">App Management</text>
    
    <!-- Row 2 -->
    <rect x="420" y="420" width="110" height="80" fill="#ffecb3" stroke="#e6ac00" stroke-width="1" rx="5" ry="5"/>
    <text x="475" y="445" text-anchor="middle" font-size="14" font-weight="bold">Longhorn</text>
    <text x="475" y="465" text-anchor="middle" font-size="12">Persistent Storage</text>
    <text x="475" y="485" text-anchor="middle" font-size="12">2 Replicas</text>
    
    <rect x="545" y="420" width="110" height="80" fill="#ffecb3" stroke="#e6ac00" stroke-width="1" rx="5" ry="5"/>
    <text x="600" y="445" text-anchor="middle" font-size="14" font-weight="bold">Prometheus</text>
    <text x="600" y="465" text-anchor="middle" font-size="12">Monitoring</text>
    <text x="600" y="485" text-anchor="middle" font-size="12">Metrics Collection</text>
    
    <rect x="670" y="420" width="110" height="80" fill="#ffecb3" stroke="#e6ac00" stroke-width="1" rx="5" ry="5"/>
    <text x="725" y="445" text-anchor="middle" font-size="14" font-weight="bold">Grafana</text>
    <text x="725" y="465" text-anchor="middle" font-size="12">Dashboards</text>
    <text x="725" y="485" text-anchor="middle" font-size="12">Visualization</text>
    
    <!-- Applications -->
    <rect x="460" y="520" width="280" height="80" fill="#e6ffe6" stroke="#009900" stroke-width="1" rx="5" ry="5"/>
    <text x="600" y="545" text-anchor="middle" font-size="14" font-weight="bold">Home Lab Applications</text>
    <text x="600" y="565" text-anchor="middle" font-size="12">Deployed and Managed by ArgoCD</text>
    <text x="600" y="585" text-anchor="middle" font-size="12">Accessible via homelab.local Domain</text>
    
    <!-- External User -->
    <circle cx="500" cy="40" r="20" fill="#fff" stroke="#333" stroke-width="2"/>
    <text x="500" y="45" text-anchor="middle" font-size="14">👤</text>
    
    <!-- Connection Lines -->
    <!-- User to Load Balancer -->
    <line x1="500" y1="60" x2="500" y2="150" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
    <polygon points="500,150 495,140 505,140" fill="#666"/>
    
    <!-- Load Balancer to Nginx -->
    <line x1="500" y1="250" x2="475" y2="320" stroke="#666" stroke-width="2"/>
    <polygon points="475,320 470,310 480,310" fill="#666"/>
    
    <!-- Connections between nodes -->
    <line x1="250" y1="290" x2="250" y2="330" stroke="#666" stroke-width="2"/>
    <polygon points="250,330 245,320 255,320" fill="#666"/>
    
    <line x1="250" y1="470" x2="250" y2="510" stroke="#666" stroke-width="2"/>
    <polygon points="250,510 245,500 255,500" fill="#666"/>
    
    <!-- Control Plane to Services -->
    <line x1="350" y1="220" x2="400" y2="400" stroke="#666" stroke-width="2"/>
    <polygon points="400,400 392,393 398,388" fill="#666"/>
  </svg>
  
  <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f8f9fa', color: '#010101' }}>
    <h3 style={{ marginTop: '0' }}>Home Lab Kubernetes Architecture</h3>
    <p><strong>Infrastructure:</strong></p>
    <ul>
      <li>1 Control Plane Node (cx21 - 2vCPU, 4GB RAM)</li>
      <li>2 Worker Nodes (cx21 - 2vCPU, 4GB RAM each)</li>
      <li>OpenSUSE MicroOS as base operating system</li>
      <li>Hetzner Cloud Load Balancer (lb11) for ingress traffic</li>
    </ul>
    <p><strong>Core Services:</strong></p>
    <ul>
      <li><strong>Nginx Ingress Controller:</strong> Handles external traffic routing</li>
      <li><strong>Cert-Manager:</strong> Manages TLS certificates</li>
      <li><strong>Longhorn:</strong> Distributed persistent storage with 2 replicas</li>
      <li><strong>ArgoCD:</strong> GitOps-based application deployment and management</li>
      <li><strong>Prometheus & Grafana:</strong> Monitoring and visualization</li>
    </ul>
    <p><strong>Access:</strong> Applications are accessible via the homelab.local domain</p>
  </div>
</div>

## 2. Prerequisites

Before you begin, ensure you have the following:

1.  **Hetzner Cloud Account:** Sign up for free [here](https://hetzner.com/cloud/).
2.  **API Token:** Create a Read & Write API token in your Hetzner Cloud Console (`Project > Security > API Tokens`). Keep this key secure.
3.  **SSH Key Pair:**
    1.  Generate a passphrase-less `ed25519` SSH key pair, refer to [[Linux SSH Key Generation]]
    2.  Note the paths to your private and public keys (e.g., `~/.ssh/id_ed25519` and `~/.ssh/id_ed25519.pub`).
    3.  For more details on SSH options, refer to [`docs/ssh.md`](docs/ssh.md).
4.
5.  **CLI Tools:** Install the following command-line tools. The easiest way is using [Homebrew](https://brew.sh/) (available on Linux, Mac, and Windows Subsystem for Linux):

    ```sh
    brew tap hashicorp/tap
    brew install hashicorp/tap/terraform # Or brew install opentofu
    brew install hashicorp/tap/packer    # For initial snapshot creation only
    brew install kubectl
    brew install hcloud
    brew install coreutils               # Provides 'timeout' command on MacOS
    ```

6.  create hetzner context

```bash
# create a hcloud-cli context
hcloud context create landing-zone
#you will be prompted to enter your API token.
#You should see a confirmation message `Context my-super-project created and activated`.

# active context when you run
hcloud context list
```

## 3. Update `kube.tf` File and OpenSUSE MicroOS Snapshot

### 3.1 Initialize Project

Navigate to the directory where you want your project to live and execute the following command. This script will create a new folder, download the `kube.tf.example` and `hcloud-microos-snapshots.pkr.hcl` files, and guide you through creating the initial MicroOS snapshot.

```bash
tmp_script=$(mktemp) && curl -sSL -o "${tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/create.sh && chmod +x "${tmp_script}" && "${tmp_script}" && rm "${tmp_script}"
```

create TF_VAR_hcloud_token

```bash
export TF_VAR_hcloud_token="YOUR_HETZNER_API_TOKEN"
```

update the `kube.tf` file

```bash
# home-lab/kube.tf

# home-lab/kube.tf

locals {
  # Your Hetzner token - consider using environment variables for security
  hcloud_token = "" # Leave empty if using TF_VAR_hcloud_token environment variable

  # Home lab specific settings
  lab_name = "homelab"
  domain   = "homelab.local"
}

module "kube-hetzner" {
  source = "github.com/kube-hetzner/terraform-hcloud-kube-hetzner"

  # Pass the provider configuration to the module
  providers = {
    hcloud = hcloud
  }

  # Hetzner Cloud Token
  hcloud_token = var.hcloud_token != "" ? var.hcloud_token : local.hcloud_token

  # Basic cluster configuration
  cluster_name = local.lab_name

  # Replace with your SSH keys or generate them if needed
  ssh_public_key = file("~/.ssh/id_rsa.pub")
  ssh_private_key = file("~/.ssh/id_rsa")

  # Home lab networking
  network_region = "eu-central" # Change to your preferred region

  # Control plane - using a single smaller node for home lab
  control_plane_nodepools = [
    {
      name        = "control-plane"
      server_type = "cpx11"
      location    = "nbg1"
      labels      = []
      taints      = []
      count       = 1
    }
  ]

  # Worker nodes - adjust based on your home lab needs
  agent_nodepools = [
    {
      name        = "worker"
      server_type = "cpx11"
      location    = "nbg1"
      labels      = []
      taints      = []
      count       = 2
    }
  ]

  # Load Balancer configuration for home lab
  load_balancer_type     = "lb11"
  load_balancer_location = "nbg1"

  # Enable longhorn for storage
  enable_longhorn = true

  # Configure cert-manager
  enable_cert_manager = true

  # Use Nginx ingress controller
  ingress_controller = "nginx"

  # Automatically create a kustomization for all the services you want to deploy
  automatically_upgrade_k3s = true
  initial_k3s_channel = "stable"

  # Enable metrics server for basic monitoring
  enable_metrics_server = true
}

provider "hcloud" {
  token = var.hcloud_token != "" ? var.hcloud_token : local.hcloud_token
}

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = ">= 1.51.0"
    }
  }
}

output "kubeconfig" {
  value     = module.kube-hetzner.kubeconfig
  sensitive = true
}

variable "hcloud_token" {
  sensitive = true
  default   = ""
}


```

## 4. Installation

### 4.1 Provisioning

Once your `kube.tf` file is customized and the MicroOS snapshot is created in your Hetzner project, you can proceed with the installation:

```sh
# 🏠 Navigate to your home-lab directory
cd home-lab


# 🧹 Clean up previous Terraform state files
rm -rf .terraform .terraform.lock.hcl


####################################################
################🚀 Initialization Options ##########
# -----------------------
# 🔰 First-time initialization
terraform init

# 🔄 Re-initialization (changes backends)
terraform init -reconfigure

# ⬆️ Upgrade modules to latest versions
terraform init --upgrade


####################################################
############ 📝 Plan Creation Options ##############
# Create and save plan file
terraform plan -out=tfplan

# Export plan as JSON for inspection
terraform show -json tfplan > tfplan.json

# Export plan as text for review
terraform show tfplan > tfplan.txt


#####################################################
############## ⚙️ Apply Options #####################
# ✅ Apply using saved plan file (safest)
terraform apply "tfplan"

# ⚡ Apply directly with auto-approval (use with caution)
terraform apply -auto-approve

```

### 4.2 Deliverables after `terraform init`

Based on the configuration we've created, here's what will be installed automatically after running `terraform apply`:

| Service                      | Included? |                                       | Notes                                                  |
| ---------------------------- | --------- | ------------------------------------- | ------------------------------------------------------ |
| **Nginx Ingress Controller** | ✅ Yes    | manage external access to K8s cluster | Included because we set `ingress_controller = "nginx"` |
| **Cert-Manager**             | ✅ Yes    |                                       | Included because we set `enable_cert_manager = true`   |
| **Longhorn**                 | ✅ Yes    | Distributed block storage for K8s     | Included because we set `enable_longhorn = true`       |
| **ArgoCD**                   | ❌ No     | GitOps continuous delivery            | Not included in our simplified configuration           |
| **Prometheus & Grafana**     | ❌ No     |                                       | Not included in our simplified configuration           |

The configuration we ended up with (after fixing compatibility issues) includes:

1. K3s Kubernetes cluster (1 control plane, 2 worker nodes)
2. Nginx Ingress Controller
3. Cert-Manager
4. Longhorn storage
5. Metrics Server (basic monitoring)

## 5. Basic Usage

After your cluster is deployed, you can interact with it using `kubectl`.

### 5.1 Connecting to the Kube API

The module generates a `homelab_kubeconfig.yaml` file in your project directory after installation.

- **Directly with `kubectl`:**

```bash
kubectl --kubeconfig homelab_kubeconfig.yaml get nodes
NAME                        STATUS   ROLES                       AGE   VERSION
homelab-control-plane-ppt   Ready    control-plane,etcd,master   38m   v1.33.3+k3s1
homelab-worker-mpz          Ready    <none>                      38m   v1.33.3+k3s1
homelab-worker-zky          Ready    <none>                      38m   v1.33.3+k3s1
```

- \*\*Add the `homelab_kubeconfig.yaml` path to your `KUBECONFIG` `env` variable :

```bash
export KUBECONFIG=/<path-to-your-project-folder>/homelab_kubeconfig.yaml
```

- Generate `homelab_kubeconfig.yaml` file manually
  If you set `create_kubeconfig = false` in your `kube.tf` (a good security practice), you can generate the file manually:
  ```sh
  terraform output --raw kubeconfig > clustername_kubeconfig.yaml
  ```

### 5.2 Get the Nodes IP's

```bash

# If set KUBECONFIG environment variable
kubectl get nodes -o wide

# If you did not set KUBECONFIG environment variable
kubectl --kubeconfig homelab_kubeconfig.yaml get nodes -o wide

# most important columns for your nodes
kubectl --kubeconfig homelab_kubeconfig.yaml get nodes -o custom-columns="NAME:.metadata.name,STATUS:.status.conditions[?(@.type=='Ready')].status,ROLE:.metadata.labels.node-role\.kubernetes\.io/control-plane,INTERNAL-IP:.status.addresses[?(@.type=='InternalIP')].address,EXTERNAL-IP:.status.addresses[?(@.type=='ExternalIP')].address,VERSION:.status.nodeInfo.kubeletVersion"

```

### Connecting via SSH

You can SSH into any control plane node to manage your workloads directly from there:

```sh
ssh root@<control-plane-ip> -i /path/to/private_key -o StrictHostKeyChecking=no
```

Replace `<control-plane-ip>` with the public IP of one of your control plane nodes (you can get this from `terraform output control_planes_public_ipv4` or `hcloud server list`).

**Security Best Practice:** Configure `firewall_ssh_source` in your `kube.tf` to restrict SSH access to your own IP address(es) instead of `0.0.0.0/0`. Similarly, restrict `firewall_kube_api_source` for the Kube API.

## 6. Key Concepts and Advanced Configuration

This project offers extensive customization. Here are some key areas to explore further:

- **Nodepools:** Define control plane and agent nodepools with various server types, locations, labels, and taints. Understand the implications of HA (odd number of control planes) and scaling.
- **CNI (Container Network Interface):** Choose between Flannel, Calico, or Cilium. Cilium offers advanced features like Egress Gateway and Hubble observability.
- **Load Balancers:** Configure the main application load balancer and an optional dedicated control plane load balancer.
- **Automatic Upgrades:** Understand how MicroOS and k3s are automatically upgraded and how to manage or disable this behavior for non-HA setups.
- **Storage:** Integrate Longhorn for distributed block storage or use Hetzner CSI for Hetzner Cloud Volumes.
- **Kustomize and Extra Manifests:** Extend the cluster with your own Kubernetes manifests or Helm charts using the `extra-manifests` feature.
- **Firewall Rules:** Customize network security with `extra_firewall_rules` and restrict access to SSH and Kube API.
- **SELinux:** Learn how to work with SELinux using `udica` for container-specific policies instead of disabling it globally.
- **Rancher Integration:** Optionally deploy Rancher Manager for multi-cluster management.

For a deep dive into every configuration option, refer to the [`LLMs and Kubernetes`](../llms.md) file, which provides a line-by-line explanation of the `kube.tf` configuration.

## 7. Takedown

To destroy your cluster and all associated Hetzner Cloud resources:

```sh
terraform destroy -auto-approve
```

If the destroy process hangs (often due to Hetzner LB or autoscaled nodes), you can use the cleanup script:

```sh
tmp_script=$(mktemp) && curl -sSL -o "${tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/cleanup.sh && chmod +x "${tmp_script}" && "${tmp_script}" && rm "${tmp_script}"
```

**Caution:** These commands will delete all resources, including volumes. Use the dry run option if available (`cleanup.sh` offers this) before a full destroy.

This guide should provide a solid foundation for your journey with Kube-Hetzner. Feel free to explore the codebase and other documentation for more advanced topics.
