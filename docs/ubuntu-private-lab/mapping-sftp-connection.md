# Mapping SFTP Connection

This guide explains how to configure SFTP access to specific directories on your VPS, which is particularly useful for managing files in Docker volumes or other restricted locations.

## Prerequisites

- Root access or sudo privileges on the VPS
- SSH server installed and running (includes SFTP capabilities)
- Basic understanding of Linux permissions and SSH configuration

## Configuration Steps

### 1. User Management

First, determine whether to use an existing user or create a new SFTP-specific user:

```bash
# Create a new user for SFTP access
sudo adduser sftp_user
# Follow the prompts to set password and user information
```

### 2. Directory Setup

Create and prepare the target directory for SFTP access:

```bash
# Create the directory (example for Docker volume)
sudo mkdir -p /data
sudo mkdir -p /data/uploads

# For Docker volumes, the path might look like:
sudo mkdir -p /var/lib/docker/volumes/volume_name/_data
```

### 3. SSH Daemon Configuration

Modify the SSH daemon configuration to restrict SFTP access:

```bash
# Edit SSH configuration file
sudo nano /etc/ssh/sshd_config
```

Add the following configuration at the end of the file:

```plaintext
Match User sftp_user
    ChrootDirectory /path/to/target/directory
    ForceCommand internal-sftp
    AllowTcpForwarding no
    X11Forwarding no
    PasswordAuthentication yes
```

### 4. Group-Based Permission Management

Set up proper group permissions for secure access:

```bash
# Create a new group for SFTP access
sudo groupadd sftp-access

# Add relevant users to the group
sudo usermod -aG sftp-access sftp_user
sudo usermod -aG sftp-access root  # If needed for management

# Set directory ownership and permissions /data
sudo chown root:root /data
sudo chmod -R 775 /data


# Set directory ownership and permissions /data
sudo chown root:root /data
sudo chmod -R 775 /data

# Set directory ownership and permissions /data/uploads
sudo chown sftp_user:sftp_access /data/uploads
sudo chmod 775 /data/uploads

```

### 5. Service Restart

Apply the changes by restarting the SSH service:

```bash
sudo systemctl restart ssh
```

### 6. SFTP Connection Details

Provide these details to SFTP clients (FileZilla, WinSCP, etc.):

- **Host:** Your VPS IP address
- **Port:** 22 (default SSH port)
- **Username:** sftp_user
- **Password:** User's password
- **Protocol:** SFTP

## Security Best Practices

1. **Access Restrictions**

   - Limit SFTP access to specific directories
   - Use strong passwords or SSH keys
   - Consider implementing IP-based access restrictions

2. **Permission Management**

   - Always use the principle of least privilege
   - Regularly audit directory permissions
   - Monitor access logs

3. **File System Security**
   - Keep the root directory owned by root
   - Set appropriate umask values
   - Regular permission audits

## Troubleshooting

### Common Issues

1. **Connection Refused**

   - Verify SSH service is running
   - Check firewall rules
   - Confirm SSH configuration syntax

2. **Permission Denied**

   - Verify directory permissions
   - Check group memberships
   - Ensure correct ownership

3. **Chroot Issues**
   - Verify directory ownership is root
   - Check parent directory permissions
   - Confirm proper path in sshd_config

### Verification Steps

```bash
# Check SSH service status
sudo systemctl status ssh

# View real-time auth logs
sudo tail -f /var/log/auth.log

# Test SFTP configuration
sftp sftp_user@localhost
```

## Maintenance Tasks

1. **Regular Checks**

   - Monitor disk usage
   - Review access logs
   - Update user access lists

2. **Security Updates**

   - Keep SSH server updated
   - Review and update security policies
   - Maintain access control lists

3. **Backup Considerations**
   - Include SFTP configuration in system backups
   - Document user and permission changes
   - Maintain configuration version control

## Reference

- **Files**

  - SSH Configuration: `/etc/ssh/sshd_config`
  - Auth Log: `/var/log/auth.log`
  - SFTP Log: `/var/log/sftp.log`

- **Commands**
  - User Management: `usermod`, `groupadd`
  - Permission Management: `chmod`, `chown`
  - Service Control: `systemctl`

Remember to always test the configuration in a controlled environment before implementing in production, and maintain proper documentation of any changes made to the SFTP configuration.

---
