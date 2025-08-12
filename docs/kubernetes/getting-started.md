---
id: getting-started-guide
title: Getting Started with Kube-Hetzner
context_type: documentation
scope: Onboarding guide for new team members
target_audience: ["new-team-members", "infrastructure-engineers"]
granularity: guide
status: draft
last_updated: "2025-07-28"
tags: ["onboarding", "terraform", "kubernetes", "hetzner", "k3s", "microos"]
---

# Getting Started with Kube-Hetzner

Welcome to the Kube-Hetzner project! This guide is designed to help new team members, especially those new to Terraform and Kubernetes, quickly understand the project's infrastructure and get started with deployment and management.

## 1. Project Overview

Kube-Hetzner provides a highly optimized, easy-to-use, auto-upgradable, HA-default, and Load-Balanced Kubernetes cluster. It's powered by `k3s` on `openSUSE MicroOS` and deployed cost-effectively on Hetzner Cloud.

**Key Features:**

- **Maintenance-free:** Automatic upgrades for both MicroOS and k3s.
- **Multi-architecture support:** Compatible with various Hetzner Cloud instances (including ARM).
- **Hetzner private network:** Minimizes latency for internal communication.
- **CNI Options:** Choice between Flannel, Calico, or Cilium.
- **Ingress Controllers:** Traefik, Nginx, or HAProxy with Hetzner Load Balancer integration.
- **Automatic HA:** Default setup includes three control-plane nodes and two agent nodes for high availability.
- **Autoscaling:** Node autoscaling via Kubernetes Cluster Autoscaler.
- **Storage:** Optional Longhorn and Hetzner CSI for persistent storage, with encryption at rest.
- **Flexible Configuration:** Extensive customization options via Terraform variables and Kustomization.

**Why openSUSE MicroOS?**

- Optimized container OS, mostly read-only filesystem for security.
- Hardened by default (e.g., automatic IP ban for SSH).
- Evergreen release, leveraging OpenSUSE Tumbleweed's rolling release.
- Automatic updates and rollbacks using BTRFS snapshots.
- Supports Kured for proper node draining and reboots in HA setups.

**Why k3s?**

- Certified Kubernetes Distribution, synced with upstream Kubernetes.
- Fast deployment due to its single binary nature.
- Batteries-included with in-cluster helm-controller.
- Easy automatic updates via the system-upgrade-controller.

The entire infrastructure is deployed using [Terraform](https://www.terraform.io/), leveraging the [Hetzner Terraform Provider](https://registry.terraform.io/providers/hetznercloud/hcloud/latest/docs).

## 2. Prerequisites

Before you begin, ensure you have the following:

1.  **Hetzner Cloud Account:** Sign up for free [here](https://hetzner.com/cloud/).
2.  **API Token:** Create a Read & Write API token in your Hetzner Cloud Console (`Project > Security > API Tokens`). Keep this key secure.
3.  **SSH Key Pair:**
    1.  Generate a passphrase-less `ed25519` SSH key pair, refer to [[Linux SSH Key Generation]]
    2.  Note the paths to your private and public keys (e.g., `~/.ssh/id_ed25519` and `~/.ssh/id_ed25519.pub`).
    3.  For more details on SSH options, refer to [`Linux SSH Key Generation`](../310 Ubuntu VPS Lab/Linux%20SSH%20Key%20Generation.md).
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

## 3. Creating Your `kube.tf` File and OpenSUSE MicroOS Snapshot

This step initializes your project folder and creates the necessary MicroOS snapshot for your nodes.

1.  **Create a Project in Hetzner Cloud:** If you haven't already, create a new project in your [Hetzner Cloud Console](https://console.hetzner.cloud/).
2.  **Generate SSH Key Pair:**
3.  (If not already done) Generate your SSH key pair as described in the Prerequisites section.

4.  **Initialize Project Folder and Snapshot:** Navigate to the directory where you want your project to live and execute the following command. This script will create a new folder, download the `kube.tf.example` and `hcloud-microos-snapshots.pkr.hcl` files, and guide you through creating the initial MicroOS snapshot.

    ```sh
    tmp_script=$(mktemp) && curl -sSL -o "${tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/create.sh && chmod +x "${tmp_script}" && "${tmp_script}" && rm "${tmp_script}"
    ```

    _For fish shell:_

    ```fish
    set tmp_script (mktemp); curl -sSL -o "{tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/create.sh; chmod +x "{tmp_script}"; bash "{tmp_script}"; rm "{tmp_script}"
    ```

    This script performs the following actions:

    - Creates a new project folder.
    - Downloads `kube.tf.example` (renamed to `kube.tf`) and `packer-template/hcloud-microos-snapshots.pkr.hcl`.
    - Prompts for your `HCLOUD_TOKEN` and uses `packer` to build the MicroOS snapshot.
    - Creates an `hcloud` CLI context for your project.

5.  **Customize `kube.tf`:** In the newly created project folder, you will find your `kube.tf` file. This file contains the Terraform configuration for your Kubernetes cluster. You **must** customize it to suit your specific needs.

    - **Detailed Configuration Reference:** A complete reference of all available inputs, outputs, and module configurations can be found in the comprehensive guide: `LLMs and Kubernetes`. It is highly recommended to review this document to understand each parameter's purpose and implications.

## 4. Installation

Once your `kube.tf` file is customized and the MicroOS snapshot is created in your Hetzner project, you can proceed with the installation:

```sh
cd <your-project-folder>

rm -rf .terraform .terraform.lock.hcl

terraform init -reconfigure

terraform init --upgrade

terraform plan -out=tfplan

terraform apply "tfplan"

terraform validate

terraform apply -auto-approve

```

### Output Plan to Json/txt format:

```bash
# First create the plan file
terraform plan -out=tfplan

# Then convert the plan to JSON
terraform show -json tfplan > tfplan.json

# First create the plan file
terraform plan -out=tfplan

# Then convert the plan to text
terraform show tfplan > tfplan.txt

```

- The `terraform init --upgrade` command initializes your Terraform working directory and downloads the necessary providers and modules.
- `terraform validate` checks your configuration for syntax errors and internal consistency.
- `terraform apply -auto-approve` applies the changes defined in your `kube.tf` file to your Hetzner Cloud account. The `-auto-approve` flag bypasses the interactive confirmation prompt.

The deployment process typically takes around 5 minutes. Upon successful completion, you should see a green output confirming your cluster is up and running.

**Important Note:** Once you start managing your project with Terraform, avoid making manual changes to the cluster state directly via the Hetzner UI. This can lead to state drift and errors when you try to run Terraform again. Use the `hcloud` CLI for inspection if needed.

## 5. Basic Usage

After your cluster is deployed, you can interact with it using `kubectl`.

### Connecting to the Kube API

The module generates a `clustername_kubeconfig.yaml` file in your project directory after installation.

- **Directly with `kubectl`:**
  ```sh
  kubectl --kubeconfig clustername_kubeconfig.yaml get nodes
  ```
- **For convenience (recommended):** Add the kubeconfig path to your `KUBECONFIG` environment variable in your shell profile (e.g., `~/.bashrc` or `~/.zshrc`):
  ```sh
  export KUBECONFIG=/<path-to-your-project-folder>/clustername_kubeconfig.yaml
  ```
  Replace `<path-to-your-project-folder>` with the actual path. After adding, `source` your shell profile (e.g., `source ~/.bashrc`).

If you set `create_kubeconfig = false` in your `kube.tf` (a good security practice), you can generate the file manually:

```sh
terraform output --raw kubeconfig > clustername_kubeconfig.yaml
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

For a deep dive into every configuration option, refer to the `LLMs and Kubernetes` file, which provides a line-by-line explanation of the `kube.tf` configuration.

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
