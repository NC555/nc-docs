# Docker Setup

This document provides detailed steps for deploying Coolify, a self-hosted container management platform, on your VPS. It includes configuration for remote HTTPS access and DNS setup with a custom domain.

## 1. Prerequisites

- A secured VPS with basic hardening (as outlined in `[Initial Server Hardening](./10_12_Initial_Hardening_Setup.md)`)

- Essential utilities installed (as outlined in `[Essential Utilities Setup](./10_13_Initial_Utils_Setup.md)`)
- A registered domain name that you can configure DNS records for
- SSH access to the server with your non-root user
- Docker installed and running (will be installed as part of this guide if not present)
- the official Docker documentation for your operating system:
    - [Install Docker](https://docs.docker.com/engine/install/)
    - [Install Docker Compose](https://docs.docker.com/compose/install/)
- If you don't have Docker and Docker Compose installed, follow the next steps in this document

##  2. Preparing the Docker Environment

Update System Packages
**Action:** Ensure your system packages are up to date

```bash
sudo apt update && sudo apt upgrade -y
```

**Details:**

- Updates all packages to their latest versions
- Ensures all security patches are applied before installation
- Prepares the system for new software installation

### Install Docker (if not already installed)

**Action:** Check if Docker is installed

```bash
docker --version
```

**Action:** If Docker is not installed, install it using the official Docker script

```bash
# Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Create directory for GPG keys if it doesn't exist
sudo install -m 0755 -d /etc/apt/keyrings

# Download Docker's official GPG key
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

# Ensure the key is readable by all users
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add your user to the docker group (to run docker without sudo)
sudo usermod -aG docker $USER

# Apply group changes to current session
newgrp docker

```

## 3. Set non-root user

To create a new non-root user on Linux, give them privileges to run Docker containers (without sudo), and find their UID/GID:

**1. Create the New User**

```bash
sudo adduser docker-user
```

You will be prompted to set a password and other details.

**2. Add the User to the 'docker' Group**
This allows your user to run Docker commands without needing sudo:

```bash
sudo usermod -aG docker dockeruser
```

> Note: The docker group grants root-level access for container management purposes [2].

**3. Log In as This User or Switch Session**

- You need either log out & back in, reboot, or use `newgrp docker` so that membership of ‘docker’ group is applied.  
  Switch temporarily with:

```bash
su - dockeruser  # Or open another terminal/session logged in as this user.
```

**4. Find Their UID and GID**
tags: #puid #pgid
Logged in as that new user (`mydockeruser`):

```bash
id -u    # Displays user's UID
id -g    # Displays user's primary GID

# Or show all info at once:
/usr/bin/id            # Shows uid=xxxx(myusername) gid=yyyy(groupname) groups...
```

Alternatively from any account you can specify username directly:

```bash
# run cmd
id docker-user   # Replace with actual username created above!
# response
uid=1002(docker-user) gid=1002(docker-user) groups=1002(docker-user),100(users),988(docker)

```

- **User name:** `docker-user`
- **UID (user ID):** `1002` ← use this as PUID in Docker
- **GID (group ID, primary group):** `1002` ← use this as PGID in Docker
- The user belongs to the following groups:
  - Primary: docker-user (`gid=1002`)
  - Others: users (`gid=100`) and docker (`gid=988`)

### For Your `.env`, Use:

```dotenv
PUID=1002
PGID=1002
```

> **Since you’re a member of the “docker” group**, you can manage/run containers without sudo.  
> No further action required—well done!

---

---
