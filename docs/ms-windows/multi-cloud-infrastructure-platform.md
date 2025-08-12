# Multi-Cloud Infrastructure Platform

This repository contains the Infrastructure as Code (IaC) and Configuration Management setup for our multi-cloud platform. The architecture is designed to be secure, scalable, and fully automated using a suite of open-source tools.

**Core Technologies:**

- **Terraform:** For provisioning and managing cloud infrastructure.
- **Ansible:** For configuring servers and deploying applications.
- **Semaphore:** For Continuous Integration and Continuous Deployment (CI/CD).

## Project Structure

```
├── .semaphore/
│   └── semaphore.yml       # CI/CD pipeline definition
├── ansible/
│   ├── ansible.cfg         # Ansible configuration
│   ├── group_vars/         # Variables for host groups (including vault)
│   ├── inventory/          # Host inventories for different environments
│   ├── playbooks/          # Ansible playbooks for various tasks
│   └── roles/              # Reusable Ansible roles
├── terraform/
│   ├── environments/       # Environment-specific configurations (dev, prod)
│   │   ├── bootstrap/      # One-time setup for backend resources
│   │   └── dev/
│   └── modules/            # Reusable Terraform modules
└── .gitignore              # Specifies files to ignore for version control
```

---

## 1. Prerequisites for Local Development

Before you begin, ensure you have the following tools installed on your local machine:

- [Terraform](https://developer.hashicorp.com/terraform/install) (v1.0 or newer)
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) (v2.9 or newer)
- An AWS account with programmatic access (Access Key &amp; Secret Key).

---

## 2. Secrets Management with Ansible Vault

This project uses Ansible Vault to securely manage sensitive information like API keys, passwords, and certificates.

- **Vault Password:** The password for the vault is stored in the `.vault_pass` file at the root of the project. **This file is NOT checked into version control.** For local development, you must create this file yourself. For CI/CD, the file is created from a Semaphore secret.

- **Creating the Vault Password File (Local Development):**

  ```bash
  # Create the file and add your vault password to it.
  # Make sure there is no trailing newline.
  echo "YOUR_SECRET_VAULT_PASSWORD" > .vault_pass
  ```

- **Viewing/Editing Vault Files:**
  To edit an encrypted vault file (e.g., `ansible/group_vars/hetzner/vault.yml`), use the `ansible-vault` command. Our `ansible.cfg` is configured to automatically find the password file.
  ```bash
  ansible-vault edit ansible/group_vars/hetzner/vault.yml
  ```

---

## 3. Local Development Workflow

### a) Terraform

The Terraform state is managed remotely using an S3 bucket and a DynamoDB table for locking.

**One-Time Setup (Bootstrap):**
First, you must create the S3 bucket and DynamoDB table. This only needs to be done once per AWS account.

1.  **Configure AWS Credentials:**
    - Create a file at `terraform/environments/bootstrap/.aws_creds.sh`.
    - Add your AWS credentials:
      ```sh
      export AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY"
      export AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_KEY"
      ```
2.  **Apply the Bootstrap Configuration:**

    ```bash
    # Source the credentials into your shell session
    source terraform/environments/bootstrap/.aws_creds.sh

    # Navigate to the bootstrap directory
    cd terraform/environments/bootstrap

    # Initialize and apply
    terraform init
    terraform apply
    ```

**Managing Environments (e.g., `dev`):**
Once the bootstrap is complete, you can manage your main environments.

1.  **Configure AWS Credentials:**
    - Create a file at `terraform/environments/dev/.aws_creds.sh` with your AWS keys.
2.  **Run Terraform Commands:**

    ```bash
    # Source the credentials
    source terraform/environments/dev/.aws_creds.sh

    # Navigate to the environment directory
    cd terraform/environments/dev

    # Initialize Terraform for the dev environment
    terraform init

    # Create a new workspace if it doesn't exist
    terraform workspace new dev

    # Plan and apply changes
    terraform plan
    terraform apply
    ```

### b) Ansible

Ansible is configured to automatically find the inventory and vault password file.

1.  **Ensure `.vault_pass` exists** at the project root.
2.  **Run a playbook:**
    ```bash
    # Example: Run the setup_server.yml playbook on the dev inventory
    ansible-playbook -i ansible/inventory/dev.ini ansible/playbooks/setup_server.yml
    ```

---

## 4. CI/CD with Semaphore

The CI/CD pipeline is defined in `.semaphore/semaphore.yml`. It automates the Terraform and Ansible workflows.

- **Secrets:** The pipeline relies on two secrets configured in the Semaphore project settings:

  - `aws-creds`: Contains `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
  - `ansible-vault-password`: Contains `ANSIBLE_VAULT_PASSWORD`, the content of your vault password.

- **Pipeline Stages:**
  1.  **Terraform Plan &amp; Apply:** The pipeline automatically checks out the code, sets up AWS credentials from secrets, and runs `terraform plan` and `terraform apply` for the specified environment.
  2.  **Run Ansible Playbook:** The pipeline then creates the `.vault_pass` file from the secret and runs the specified Ansible playbook.

Committing and pushing changes to your GitHub repository will automatically trigger a new build on Semaphore.
