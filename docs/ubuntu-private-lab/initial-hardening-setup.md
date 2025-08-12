# Initial VPS Hardening Setup

This document provides detailed steps for securing a new VPS with proper user management, #SSH hardening, and security package installation. Following these steps will establish a foundation for a secure server environment.

## Prerequisites

- A newly provisioned VPS (Hetzner Cloud recommended)
- SSH access to the server with root credentials
- A SSH key pair for secure authentication

## 1. Initial Login

**Action:** Connect to the VPS using SSH with the root user credentials provided by your hosting provider.

```bash
ssh root@your-server-ip
```

**Details:**

- This will establish an initial connection to your server
- This should be the only time you log in directly as root via password
- Subsequent access will be more secure using SSH keys and a non-root user

## 2. User Creation and Configuration

### Step 1: Create a Non-Root User

**Action:** Create a new user named "noy" without sudo privileges

```bash
adduser noy

sudo usermod -aG sudo noy

```

**Details:**

- You'll be prompted to create a password for this user
- You'll be asked for additional user information (name, phone, etc.) which you can skip by pressing Enter
- This creates a basic user with a home directory at `/home/noy`
- The user has no elevated privileges by default, enhancing security

### Step 2: Configure SSH Key Authentication

**Action:** Set up SSH key-based authentication for the "noy" user

```bash
# for root user
# Create the correct .ssh directory for root (if it doesn't exist)
# home directory structure for the root user /root/.ssh
mkdir -p /root/.ssh

echo "your-public-key" > /root/.ssh/authorized_keys

# Set the proper permissions
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
chown -R root:root /root/.ssh

```

**Details:**

- Replace "your-public-key" with your actual public SSH key
- These permissions ensure only the owner can read and write to these files
- This establishes passwordless SSH key authentication for the user

### Step 2a: Configure Passwordless Sudo (Optional but Recommended for Coolify)

**Action:** Configure passwordless sudo for the "noy" user. This is helpful for tools like Coolify that might need to run commands as root without interactive password prompts.

```bash
# Edit the sudoers file using visudo
sudo visudo
```

Add the following line at the end of the file (replace "noy" if your username is different):

```
root ALL=(ALL) NOPASSWD:ALL
```

Save and exit the file (Ctrl+X, then Y, then Enter in nano).

**Details:**

- This allows the "noy" user to execute any command with `sudo` without needing to enter a password.
- This is particularly useful for automated scripts or management tools that require root privileges.
- **Security Note:** While convenient, be aware that this gives the "noy" user full root access without a password prompt. Ensure the "noy" account itself is well-secured (e.g., strong SSH key, limited access).

### Step 3: Verify User Access

**Action:** Verify login with the "noy" user from a separate terminal session

1. Open a new terminal or PuTTY session
2. Connect using the "noy" user and your private key:

```bash
ssh noy@your-server-ip
```

3. Once connected, verify you can switch to root (this will still work until we disable it in the next step):

```bash
su - root
```

**Details:**

- This test ensures your non-root user can access the server before disabling root login
- Verifying this step is critical before proceeding, as it prevents you from being locked out
- This confirms your SSH key is properly configured

## 3. Secure SSH and Server Access

### Step 4: Disable Password Authentication and Root Login

**Action:** With root access, modify SSH configuration to disable password authentication and root login

```bash
# Edit the SSH configuration file
nano /etc/ssh/sshd_config
```

Make these changes:

- Set `PermitRootLogin yes`
- Set `PubkeyAuthentication yes`
- Set `PasswordAuthentication no`
- Set `Port 2222` (changes SSH from default port 22)
- Set `KbdInteractiveAuthentication no`
- Set `ChallengeResponseAuthentication no`
- Set `MaxAuthTries 2`
- Set `AllowTcpForwarding no`
- Set `X11Forwarding no`
- Set `AllowAgentForwarding no`
- Ensure `AuthorizedKeysFile .ssh/authorized_keys` is set
- Add `AllowUsers root` to restrict SSH access to only root user

**Alternatively, use these sed commands for automated editing:**

```bash
sed -i -e '/^\(#\|\)PermitRootLogin/s/^.*$/PermitRootLogin yes/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)PubkeyAuthentication/s/^.*$/PubkeyAuthentication yes/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)PasswordAuthentication/s/^.*$/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)Port/s/^.*$/Port 2222/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)KbdInteractiveAuthentication/s/^.*$/KbdInteractiveAuthentication no/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)ChallengeResponseAuthentication/s/^.*$/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)MaxAuthTries/s/^.*$/MaxAuthTries 2/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)AllowTcpForwarding/s/^.*$/AllowTcpForwarding no/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)X11Forwarding/s/^.*$/X11Forwarding no/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)AllowAgentForwarding/s/^.*$/AllowAgentForwarding no/' /etc/ssh/sshd_config
sed -i -e '/^\(#\|\)AuthorizedKeysFile/s/^.*$/AuthorizedKeysFile .ssh\/authorized_keys/' /etc/ssh/sshd_config
sed -i '$a AllowUsers root' /etc/ssh/sshd_config
```

**Action:** Restart the SSH service to apply changes

```bash
# For most modern Linux distributions
systemctl restart ssh

# If the above fails with "sshd.service not found", try:
# systemctl restart sshd

# Reboot to take port 2222 into action
reboot


```

**Details:**

- These changes enforce key-based authentication only
- Root login is completely disabled
- SSH runs on a non-standard port (2222) to reduce automated scanning attacks
- Only the "noy" user can connect via SSH
- Various SSH forwarding features are disabled to prevent potential exploits
- The MaxAuthTries setting limits brute force attempts

### Step 5: Install and Configure Security Packages

**Action:** Install `fail2ban` and `ufw` (Uncomplicated #Firewall)

```bash
# Update package repository
apt update

# Install security packages
apt install -y fail2ban ufw

# Enable automatic updates
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

**Verification & Troubleshooting for fail2ban installation:**
After installation, the `fail2ban` service should be available. You can check this with `systemctl status fail2ban`.
If it reports 'Unit fail2ban.service could not be found.' or 'Unit fail2ban.service not found.', the installation might have failed, or the service name could be different for your distribution.

1.  **Check for alternative service names**: Run `systemctl list-unit-files | grep fail2ban`. If you find a different service name (e.g., `fail2ban-server.service`), use that name in the `systemctl enable` and `systemctl start` commands below.
2.  **Reinstall fail2ban**: If no service is found, the installation may have been incomplete. Try:
    ```bash
    sudo apt update
    sudo apt install --reinstall fail2ban
    ```
    Then, re-check for the service file.
3.  **Check installation logs**: Look for errors during `apt install fail2ban`.

If problems persist, consult your distribution's documentation for `fail2ban` installation and service naming.

**Action:** Configure fail2ban to ban IPs after 5 failed login attempts in 10 minutes

```bash
# Ensure the fail2ban directory exists
mkdir -p /etc/fail2ban/

# Create a jail.local file for fail2ban
cat > /etc/fail2ban/jail.local << EOF
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
findtime = 600
bantime = 3600
EOF

# Enable and start fail2ban service
systemctl enable fail2ban
systemctl start fail2ban
```

**Action:** Configure and enable the firewall

```bash

# disable all incoming
ufw default deny incoming

# allow all outgoing
ufw default allow outgoing

# Allow SSH on the new port
ufw allow OpenSSH
ufw allow 2222/tcp

# Ensure default SSH port 22 is closed if it was previously open
# This command will only succeed if an "allow 22/tcp" rule exists.
# If it doesn't exist, it will output "Skipping: Rule not found". This is expected.
ufw delete allow 22/tcp

# Enable the firewall
ufw --force enable

# Verify the firewall status
ufw status
```

**Details:**

- fail2ban monitors authentication logs and blocks IP addresses that show malicious signs
- The configuration bans IPs for 1 hour after 5 failed attempts within 10 minutes
- unattended-upgrades ensures security patches are automatically installed
- ufw provides an easy-to-use firewall to control incoming/outgoing connections
- Only the essential SSH port is opened, all other ports are blocked by default

## 4. Reboot and Test

**Action:** Reboot the server to ensure all changes take effect

```bash
reboot
```

**Action:** Verify secure connection after reboot

Wait for the server to reboot, then attempt to connect using the new configuration:

```bash
# Connect using the non-standard port 2222
ssh -p 2222 noy@your-server-ip
```

**Verification Checklist:**

- [ ] You can connect using the "noy" user with your SSH key
- [ ] SSH connection requires the correct port (2222)
- [ ] Password authentication is denied
- [ ] Root login attempts are denied
- [ ] Connection attempts with wrong credentials trigger fail2ban (after multiple attempts)

## Security Enhancement Recommendations

1. **Consider Additional Firewall Rules**: Based on your specific applications, add only the necessary ports to UFW
2. **Implement Log Monitoring**: Consider adding a log monitoring solution
3. **Regular Security Scans**: Schedule periodic security scans to identify vulnerabilities
4. **Backup Strategy**: Implement a backup solution for critical data
5. **SSH Key Rotation**: Establish a policy for regular SSH key rotation

## Troubleshooting

If you lose access to your server after making these changes, potential solutions include:

1. **Using Console Access**: Most VPS providers offer a web-based console access that doesn't rely on SSH
2. **Recovery Mode**: Boot into recovery mode to fix SSH configuration issues
3. **Support Ticket**: Contact your VPS provider's support for assistance accessing your server

> **Warning**: Always test SSH access with your new user before closing the terminal where you have root access. This prevents being locked out of your server.

---

---
