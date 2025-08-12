# Technical Manual: Hetzner Firewall SSH Access Update

## 1. Overview

This document provides a comprehensive guide for using the Ansible playbook `nc555-labs-tom-fw-update.yml`. The purpose of this playbook is to dynamically update a specific Hetzner Cloud Firewall to allow incoming SSH traffic from a designated IP address.

### Business Requirement

The primary business requirement is to enhance security by restricting SSH access to servers from specific IP addresses. This needs to be an automated process to facilitate quick and secure access for authorized developers and administrators without manual intervention in the Hetzner Cloud Console.

### Logic and Workflow

1.  **IP Address Determination**: The playbook's logic is designed to be flexible.

    - If a specific IP address is defined in the `sever_ssh_port_allowed_ip` variable within the vault file, that IP will be used. This is useful for pre-authorizing known static IPs.
    - If `sever_ssh_port_allowed_ip` is empty or not defined, the playbook automatically fetches the public IP address of the machine executing the playbook using the `ipify` service. This is ideal for developers working from dynamic IP addresses.

2.  **API Interaction**: The playbook interacts with the Hetzner Cloud API to modify the firewall rules. It constructs a request to the `/firewalls/{firewall_id}/actions/set_rules` endpoint.

3.  **Firewall Rule Structure**: The playbook sets a new ruleset for the firewall. This includes:
    - An inbound rule for SSH (port defined by `server_ssh_port`) from the determined `target_ip`.
    - Standard inbound rules for HTTP (port 80) and HTTPS (port 443) from any IP address (`0.0.0.0/0` and `::/0`).
    - **Important**: The `set_rules` action overwrites all existing rules on the firewall. The rules defined in the playbook constitute the new, complete ruleset.

## 2. File Structure

The playbook and its components are organized as follows:

```
ansible/
├── ansible.cfg
├── group_vars/
│   └── cloud-hetzner/
│       ├── api-vars.yml
│       ├── nc555-tom2-vars.yml
│       └── nc555-tom2-vault.yml
├── inventory/
│   └── cloud-hetzner/
│       └── nc555-labs-tom2.ini
├── playbooks/
│   └── cloud-hetzner/
│       ├── nc555-labs-tom-fw-update.yml
│       └── nc555-labs-tom-fw-update_MANUAL.md
└── roles/
    └── cloud-hetzner/
        └── nc555-labs/
            └── tasks/
                └── main.yml
```

- `ansible.cfg`: Main Ansible configuration, including the path to the vault password file.
- `api-vars.yml`: Contains non-sensitive API configuration.
- `nc555-tom2-vars.yml`: Contains non-sensitive project and server-specific variables.
- `nc555-tom2-vault.yml`: Contains sensitive information like API tokens and secrets. **This file must be encrypted.**
- `nc555-labs-tom2.ini`: The inventory file, targeting `localhost`.
- `nc555-labs-tom-fw-update.yml`: The main playbook file.
- `roles/cloud-hetzner/nc555-labs/tasks/main.yml`: The role containing the core logic for the firewall update.

## 3. Setup and Configuration

### Prerequisites

- Ansible installed on your local machine.
- `community.general` collection installed (`ansible-galaxy collection install community.general`).

### Step 1: Configure Vault Variables

The `nc555-tom2-vault.yml` file holds all sensitive data. You must populate it with your specific details.

1.  **Check Vault Password File Path**: Ensure the `ansible.cfg` file points to the correct vault password file. It is currently set to `vault_password_file = ../.vault_pass`. Create this file in the project's root directory (one level above `ansible`).

```bash
    # In your project's root directory
    echo "YOUR_STRONG_VAULT_PASSWORD" > .vault_pass
    # Add .vault_pass to your .gitignore file!
```


2.  **Edit the Vault File**: Use `ansible-vault` to edit the file. **Run this command from within the `ansible` directory.**


```bash
    # Navigate to the ansible directory first
    cd ansible

    # Now edit the vault file
    ansible-vault edit group_vars/cloud-hetzner/nc555-tom2-vault.yml

	#This command will open the file in your default editor (usually `vi` or 
    #`vim`). Because you are running the command from the `ansible` directory, it
    # will automatically find the vault password file based on the `ansible.cfg` 
    #settings.
    #**Using `vi`/`vim`:**
    #   Press `i` to enter "Insert Mode" to start editing.
    #   Update the following values:
    #    `hetzner_api_token`: Your Hetzner Cloud API token.
    #    `server_ip`: The IP of the server this firewall protects.
    #    `server_ssh_port`: The SSH port (e.g., `22`).
    #    `server_ssh_key_name`: The name of your SSH key in Hetzner Cloud.
    #    `sever_ssh_port_allowed_ip`: Leave as `""` to use your dynamic IP  `.
    #    `firewall_id`: The unique ID of the Hetzner Firewall to modify.
    #   Press `Esc` to exit "Insert Mode".
    #   Type `:wq` and press `Enter` to write the changes and quit the editor. 
	#   The file will be automatically re-encrypted.
```


### Step 2: Review Non-Sensitive Variables

Ensure the variables in `api-vars.yml` and `nc555-tom2-vars.yml` are correct for your environment.

## 4. Running the Playbook

To execute the playbook, **run the command from within the `ansible` directory**:



```bash
# Navigate to the ansible directory first
cd ansible

# Run the playbook using relative paths
ansible-playbook ansible/playbooks/cloud-hetzner/nc555-labs-tom-fw-set-ssh-allowed-ip.yml -i ansible/inventory/cloud-hetzner/nc555-labs-tom2.ini --ask-vault-pass
````

### Command Breakdown:

- By running from the `ansible` directory, you no longer need the `--vault-password-file` flag, which resolves the permissions error in WSL.
- `ansible-playbook ...`: The command to run the playbook.
- `-i ...`: Specifies the inventory file to use, now with a path relative to the `ansible` directory.

The playbook will run, display the IP being used, show the API endpoint and payload, and then execute the update. You will see the API response upon successful completion.

## 5. Vault Management

All `ansible-vault` commands should be run from within the `ansible` directory to ensure the `ansible.cfg` is used correctly.

### Encrypting a File

```bash
# From within the ansible directory
ansible-vault encrypt ./ansible/group_vars/cloud-hetzner/nc555-tom2-vault.yml
```

### Decrypting a File

```bash
# From within the ansible directory
ansible-vault decrypt ./ansible/group_vars/cloud-hetzner/nc555-tom2-vault.yml
```

### Changing the Vault Password

```bash
# From within the ansible directory
# Make sure .new_vault_pass exists at the root level first
ansible-vault rekey ./ansible/group_vars/cloud-hetzner/nc555-tom2-vault.yml --new-vault-password-file ../.new_vault_pass
```

---

**End of Manual**

create a "ansible\group_vars\cloudflare\vars.yml"
create a "ansible\group_vars\cloudflare\vault.yml"

add to 
ansible\group_vars\cloudflare\vault.yml
vars:
CLOUDFLARE_EMAIL
CLOUDFLARE_API_KEY