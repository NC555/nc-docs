# Custom Commands Library

This guide provides instructions for creating and managing a custom commands library to streamline VPS administration tasks using Bash and Zsh.

## Overview

A custom commands library allows you to:

- Consolidate frequently used commands
- Automate repetitive tasks
- Improve efficiency and consistency
- Standardize system operations

## 1. Creating the Custom Commands Script

### a. Create Script File

Create a new file for your custom commands:

```bash
# Example: create command script in /usr/local/bin
sudo nano /data/nc_commands.sh
```

### b. Add Shebang Line

Specify the interpreter at the beginning of the script:

```bash
#!/bin/bash
```

### c. Define Custom Functions

Add your custom commands as functions within the script. Example:

```bash
#!/bin/bash

# Edit this script
edit_custom_commands() {
    sudo nano /usr/local/bin/custom_commands.sh
}

# Edit Zsh configuration
edit_zsh_config() {
    nano ~/.zshrc
}

# Refresh Zsh configuration
refresh_zsh() {
    source ~/.zshrc
}

# Docker utilities
docker_list_containers() {
	docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

docker_inspect_network() {
    # Example: inspect Coolify network
    docker network inspect coolify
}

docker_view_logs() {
    # Example: view Nginx Proxy Manager logs
    docker container logs nginx-proxy-manager
}
```

### d. Make Script Executable

Set execute permissions for the script:

```bash
sudo chmod +x /usr/local/bin/custom_commands.sh
```

## 2. Integrating with Zsh

### a. Edit Zsh Configuration

Open your `.zshrc` file for editing:

```bash
# Ensure Zsh is your current shell
# zsh

# Edit Zsh configuration
nano ~/.zshrc
```

### b. Source Custom Commands Script

Add the following lines to your `.zshrc` to load the custom commands:

```bash
# Source custom commands script
if [ -f /usr/local/bin/custom_commands.sh ]; then
    source /usr/local/bin/custom_commands.sh
else
    echo "Warning: /usr/local/bin/custom_commands.sh not found. Custom commands not loaded."
fi
```

### c. Apply Changes

Reload your Zsh configuration to activate the changes:

```bash
source ~/.zshrc
```

## Best Practices

1. **Organization**

   - Group related commands into functions
   - Use clear and descriptive function names
   - Add comments to explain complex commands

2. **Security**

   - Store scripts in a secure location (e.g., `/usr/local/bin`)
   - Limit execute permissions appropriately
   - Avoid hardcoding sensitive information

3. **Maintenance**
   - Regularly review and update commands
   - Test changes thoroughly
   - Document new commands and their usage

## Example Commands

### System Information

```bash
# Display system uptime
system_uptime() {
    uptime -p
}

# Show disk usage
disk_space() {
    df -h
}

# List open ports
open_ports() {
    sudo ss -tulnp
}
```

### Service Management

```bash
# Restart a service (e.g., Nginx)
restart_service() {
    sudo systemctl restart nginx
}

# Check service status
service_status() {
    sudo systemctl status "$1" # Pass service name as argument
}
```

### Backup and Restore

```bash
# Example: Perform a system backup
backup_system() {
    # Add backup script commands here
    echo "System backup initiated..."
}
```

## Troubleshooting

1. **Command Not Found**

   - Ensure the script is sourced in `.zshrc`
   - Verify the script path is correct
   - Check execute permissions

2. **Permission Issues**

   - Use `sudo` for commands requiring root privileges
   - Check file ownership and permissions

3. **Script Errors**
   - Test functions individually
   - Use `set -x` in scripts for debugging
   - Review syntax and command validity

## Maintenance Tasks

1. **Regular Updates**

   - Keep custom commands up-to-date
   - Add new useful commands as needed
   - Remove outdated or unused commands

2. **Documentation**

   - Maintain clear documentation for each command
   - Update help text or comments
   - Share command library with relevant team members

3. **Version Control**
   - Consider using Git for versioning your custom scripts
   - Track changes and manage revisions
   - Facilitate collaboration and backups

By maintaining a well-organized custom commands library, you can significantly enhance your productivity and ensure consistent system administration practices on your VPS.

---

**[Up: Introduction](./get-started-with-a-new-linux-vps.md)** | **[Previous: Deploying Coolify](./get-started-with-a-new-linux-vps.md)** | **[Next: (Back to Introduction)](./get-started-with-a-new-linux-vps.md)**
