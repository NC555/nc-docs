# Coolify PAAS

This document provides detailed steps for deploying Coolify, a self-hosted container management platform, on your VPS. It includes configuration for remote HTTPS access and DNS setup with a custom domain.

## Prerequisites

- A secured VPS with basic hardening (as outlined in `[Initial Server Hardening](./10_12_Initial_Hardening_Setup.md)`)
- Essential utilities installed (as outlined in `[Essential Utilities Setup](./10_13_Initial_Utils_Setup.md)`)
- A registered domain name that you can configure DNS records for
- SSH access to the server with your non-root user
- Docker installed and running (will be installed as part of this guide if not present)

## 1. Preparing the Server Environment

### Update System Packages

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

**Details:**

- Docker is required for running Coolify containers
- Adding your user to the docker group allows running docker commands without sudo
- The installation uses the official Docker repository for the latest stable version

## 2. Configure DNS for Your Domain

Before installing Coolify, you should set up DNS records for your domain to point to your server.

**Action:** Configure DNS A record for your domain

Log in to your domain registrar or DNS management portal and create the following A record:

- Type: A
- Host: `coolify` (or your preferred subdomain, or `@` for the root domain)
- Value: Your server's public IP address
- TTL: 3600 (or as recommended by your provider)

**Details:**

- This points your domain (or subdomain) to your server's IP address
- DNS changes may take time to propagate (usually between a few minutes and 48 hours)
- You can verify propagation using `dig coolify.yourdomain.com` or online DNS lookup tools

## 3. Configure Firewall to Allow Web Traffic

**Action:** Open the necessary ports in your firewall

```bash
# Allow HTTP traffic
sudo ufw allow 80/tcp

# Allow HTTPS traffic
sudo ufw allow 443/tcp

# Realtime notifications
sudo ufw allow 6001/tcp

# Dashboard Terminal Control
sudo ufw allow 6002/tcp

# Reload firewall to apply changes
sudo ufw reload

# Verify firewall status
sudo ufw status
```

**Details:**

- Port 80 (HTTP) is needed for initial setup and Let's Encrypt verification
- Port 443 (HTTPS) is required for secure connections
- Coolify will handle the redirection from HTTP to HTTPS automatically
- The existing SSH port (2222) should remain open from previous configuration

## 4. Install Coolify

### Run the Coolify Installation Script

**Action:** Install Coolify using the official installation script

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

**Details:**

- This is the official quick installation method recommended by Coolify
- The script will:
  - Check system requirements
  - Install Docker if needed
  - Download and install Coolify containers
  - Set up initial configuration

### Complete the Installation Process

**Action:** Follow the terminal prompts to complete the installation:

1. When asked if you want to install Coolify as a service, enter `y`
2. When asked for your server's public IP or domain, enter your full domain (e.g., `coolify.yourdomain.com`)
3. For any other prompts, follow the on-screen instructions

**Details:**

- Installing as a service ensures Coolify starts automatically on system boot
- Providing your domain name allows Coolify to configure SSL certificates
- The installation script will guide you through the rest of the setup process

## 5. Configure Nginx Proxy Manager

### Update `docker-compose.yml`

- browse to NginX proxy manager directory `cd /data/nginx-proxy-manager`
- update it `docker-compose.yml` to network `coolify`

```yml
services:
  npm:
    image: "jc21/nginx-proxy-manager:latest"
    container_name: nginx-proxy-manager
    restart: unless-stopped
    ports:
      - "80:80"
      - "81:81"
      - "443:443"
    volumes:
      - npm-data:/data
      - npm-letsencrypt:/etc/letsencrypt
    networks:
      - coolify

networks:
  coolify:
    external: true

volumes:
  npm-data:
  npm-letsencrypt:
```

- than run `docker compose up -d` to restart the container

### Nginx Proxy Manager - create host proxy `coolify`

1. In the NPM dashboard, navigate to "Hosts" → "Proxy Hosts"
2. Click "Add Proxy Host" button
3. In the "Details" tab:
   - Domain Names: coolify.example.com`
   - Scheme: `http`
   - Forward Hostname/IP: `nginx-proxy-manager`
   - Forward Port: `8080`
   - ✔️ set "Block Common Exploits"
   - ✔️ set "Cache Assets"
   - ✔️ set "Block Common Exploits"
4. Go to the "SSL" tab:
   - Request a new SSL certificate with Let's Encrypt
   - ✔️ set "Force SSL"
   - ✔️ set "HTTP/2 Support"
   - ✔️ set HSTS
   - ✔️ set HSTS Subdomains
   - Add your email for Let's Encrypt notifications
5. Go to the advanced tab
   - Custom Nginx location configuration for terminal

```yml
location /terminal {
proxy_pass http://coolify:8080/terminal;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_read_timeout 86400;
}

location /terminal/ws {
proxy_pass http://coolify-realtime:6002/terminal/ws;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_read_timeout 86400;
}
```

1. Click "Save" to create the proxy host

## 5. Initial Coolify Setup

**Action:** Access the Coolify dashboard and complete initial setup

create temporary account
admin@example.com
Fryz@67Y

**Details:**

- This allows you to access the Coolify web interface.
- Registering an account is necessary to manage the platform.
- Skipping onboarding allows you to configure necessary items like SSH keys and servers first.

## 5.

## 6. Add Server and SSH Key

**Action:** Add your server's SSH private key to Coolify

1. In the Coolify menu, go to "Key & Token".
2. Add your login server's SSH private key.

**Action:** Add your login server details in Coolify

1. In the Coolify menu, go to "Servers".
2. Click "Add Server" and enter the following details:
   - IP: `<vps-server-ip>`
   - User: `name` (use the actual non-root username you created)
   - Port: `2222`
3. Click "Validate Server".

**Details:**

- Coolify needs SSH access to manage the server for deployments and other operations.
- Adding the private key allows Coolify to authenticate with your server.
- Configuring the server details tells Coolify how to connect.
- Validation checks if Coolify can successfully connect using the provided details.

## 7. Start Proxy and Troubleshoot Permissions

**Action:** Start the Coolify proxy

1. Still on the server page in Coolify, go to the "Proxy" section.
2. Click on "Start Proxy".

## 8. Start Coolify After Stop

```
docker compose --env-file .env \
    -f docker-compose.yml \
    -f docker-compose.prod.yml \
up -d  #'-d' for detached mode!
```

---

**[Up: Introduction](./get-started-with-a-new-linux-vps.md)** | **[Previous: Deploying Coolify](./get-started-with-a-new-linux-vps.md)** | **[Next: (Back to Introduction)](./get-started-with-a-new-linux-vps.md)**
