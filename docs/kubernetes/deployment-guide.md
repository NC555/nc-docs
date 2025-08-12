# Deployment Guide for Kube-Hetzner

This guide provides step-by-step instructions for deploying your Kubernetes cluster on Hetzner Cloud using the Kube-Hetzner Terraform module.

## 1. Prerequisites

Before you begin, ensure you have the following:

- **Hetzner Cloud Account:** An active Hetzner Cloud account with sufficient credits.
- **Hetzner Cloud API Token:** A read/write API token for your Hetzner Cloud project.
- **Terraform:** Version 1.0 or higher installed on your local machine.
- **SSH Key Pair:** An SSH key pair (e.g., `id_ed25519` or `id_rsa`) configured on your local machine and added to your Hetzner Cloud project. The public key will be used to access the deployed servers.
- **`kube.tf` file:** A Terraform configuration file (e.g., `kube.tf`) in your project directory, defining your cluster's desired state. This file should include the `hcloud` provider and the `kube-hetzner` module configuration.
- **openSUSE MicroOS Snapshot:** A snapshot of openSUSE MicroOS (or a compatible base image) available in your Hetzner Cloud project. This snapshot will be used as the base image for your cluster nodes.

## 2. Prepare Your Terraform Configuration

Ensure your `kube.tf` file is correctly configured. A minimal example might look like this:

```terraform
terraform {
  required_providers {
    hcloud = {
      source = "hetznercloud/hcloud"
      version = "~> 1.30"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

resource "hcloud_ssh_key" "default" {
  name       = "my-ssh-key"
  public_key = file("~/.ssh/id_ed25519.pub") # Adjust path to your public key
}

module "kube-hetzner" {
  source = "./path/to/kube-hetzner-module" # Adjust to your module path or registry source

  cluster_name = "my-k3s-cluster"
  hcloud_token = var.hcloud_token
  ssh_keys     = [hcloud_ssh_key.default.id]
  image        = "openSUSE-MicroOS-latest" # Or your custom snapshot name

  control_plane_node_count = 3
  control_plane_node_type  = "cpx21"
  worker_node_count        = 2
  worker_node_type         = "cpx11"

  # Example: Enable Longhorn storage
  enable_longhorn = true

  # Example: Configure a private network
  private_network_cidr = "10.0.0.0/16"
}

variable "hcloud_token" {
  description = "Your Hetzner Cloud API token"
  type        = string
  sensitive   = true
}
```

**Important:**

- Replace `"./path/to/kube-hetzner-module"` with the actual path to your `kube-hetzner` module or its registry source.
- Adjust `file("~/.ssh/id_ed25519.pub")` to the correct path of your SSH public key.
- Ensure the `image` name matches an existing openSUSE MicroOS snapshot or image in your Hetzner Cloud project.
- Provide your Hetzner Cloud API token via an environment variable (`TF_VAR_hcloud_token`) or a `terraform.tfvars` file (ensure it's `.gitignore`d).

## 3. Deployment Steps

Follow these steps to deploy your Kubernetes cluster:

### Step 3.1: Initialize Terraform

Navigate to your project directory (where your `kube.tf` file is located) and initialize Terraform. This command downloads the necessary providers and modules.

```sh
terraform init --upgrade
```

The `--upgrade` flag ensures that all plugins and modules are updated to their latest compatible versions.

### Step 3.2: Validate Terraform Configuration

Before applying, it's good practice to validate your configuration to catch any syntax errors or inconsistencies.

```sh
terraform validate
```

This command checks the configuration files in the current directory for syntax validity and internal consistency.

### Step 3.3: Review the Execution Plan

Generate an execution plan to see what actions Terraform will perform. This is a crucial step to understand the changes before they are applied.

```sh
terraform plan
```

Review the output carefully. It will show you all the resources that will be created, modified, or destroyed. Ensure these actions align with your expectations.

### Step 3.4: Apply the Terraform Configuration

Once you are satisfied with the plan, apply the configuration to provision your infrastructure.

```sh
terraform apply
```

Terraform will prompt you to confirm the actions. Type `yes` and press Enter to proceed.

**For automated deployments (e.g., CI/CD):** You can use the `-auto-approve` flag to skip the interactive approval prompt. Use this with caution!

```sh
terraform apply -auto-approve
```

The deployment process may take several minutes as Terraform provisions servers, configures networking, and installs k3s.

## 4. Post-Deployment Steps

After `terraform apply` completes successfully, your Kubernetes cluster should be up and running.

### Step 4.1: Obtain Kubeconfig

The `kube-hetzner` module outputs the `kubeconfig` content. You can retrieve it using:

```sh
terraform output kubeconfig > kubeconfig.yaml
```

This command saves the kubeconfig to a file named `kubeconfig.yaml` in your current directory.

### Step 4.2: Access Your Cluster

Set the `KUBECONFIG` environment variable to point to your newly created `kubeconfig.yaml` file:

**Linux/macOS:**

```sh
export KUBECONFIG=$(pwd)/kubeconfig.yaml
```

**Windows (PowerShell):**

```powershell
$env:KUBECONFIG = (Get-Location).Path + "\kubeconfig.yaml"
```

Now you can use `kubectl` to interact with your cluster:

```sh
kubectl get nodes
kubectl get pods -A
```

### Step 4.3: Verify Cluster Health

Check the status of your nodes and pods to ensure everything is healthy:

```sh
kubectl get nodes -o wide
kubectl get pods --all-namespaces
```

Look for all nodes to be in `Ready` status and all critical pods (e.g., in `kube-system` namespace) to be in `Running` or `Completed` status.

## 5. Cluster Teardown

To destroy all resources provisioned by Terraform (including servers, networks, and volumes), use the `destroy` command:

```sh
terraform destroy
```

Terraform will show you a plan of resources to be destroyed and ask for confirmation. Type `yes` and press Enter to proceed.

**For automated teardown:**

```sh
terraform destroy -auto-approve
```

**Caution:** This action is irreversible and will delete all your cluster data and infrastructure. Ensure you have backed up any necessary data before proceeding.
