# Installing and Maintaining Code-Server on Ubuntu VPS

This guide covers the installation and configuration of code-server with nginx-proxy-manager on Ubuntu VPS, including Docker network setup and troubleshooting.

## Table of Contents

- [Prerequisites](#prerequisites)
- [1. Installing Code-Server](#1.%20Installing%20Code-server)
- [2. Docker Daemon Configuration](#2-docker-daemon-configuration)
- [3. Nginx Proxy Manager Setup](#3-nginx-proxy-manager-setup)
- [4. Code-Server Network Configuration](#4-code-server-network-configuration)
- [5. Nginx Proxy Host Configuration](#5-nginx-proxy-host-configuration)
- [6. Troubleshooting](#6-troubleshooting)
- [7. References](#7-references)

## Prerequisites

- Ubuntu VPS
- Docker and Docker Compose installed
- Domain name configured with DNS
- Basic understanding of Docker networking

## 1. Installing Code-Server

Install code-server using the package manager:

```bash
# Install code-server
sudo apt update
sudo apt install code-server

# Enable and start the service
sudo systemctl enable --now code-server@$USER

# Verify installation
curl http://127.0.0.1:8080
```

## 2. Docker Daemon Configuration

Configure Docker to support host.docker.internal:

```bash
# Create or edit daemon.json
sudo nano /etc/docker/daemon.json

# Add the following content
{
    "extra_hosts": [
        "host.docker.internal:host-gateway"
    ]
}

# Restart Docker
sudo systemctl restart docker

# Verify Docker status
sudo systemctl status docker
```

## 3. Nginx Proxy Manager Setup

Update your docker-compose.yml for nginx-proxy-manager:

```yaml
services:
  npm:
    image: "jc21/nginx-proxy-manager:latest"
    container_name: tom3-npm
    restart: unless-stopped
    ports:
      - "80:80"
      - "81:81"
      - "443:443"
    volumes:
      - npm-data:/data
      - npm-letsencrypt:/etc/letsencrypt
      - ./nginx/html:/etc/nginx/nginx/html
    networks:
      - tom3-npm-network
    extra_hosts:
      - "host.docker.internal:host-gateway"

networks:
  tom3-npm-network:
    external: true

volumes:
  npm-data:
  npm-letsencrypt:
```

Apply the configuration:

```bash
docker-compose down
docker-compose up -d
```

## 4. Code-Server Network Configuration

Configure code-server to listen on all interfaces:

```bash
# Edit code-server config
nano ~/.config/code-server/config.yaml

# Add these settings
bind-addr: 0.0.0.0:8080
auth: password
password: your_password
cert: false

# Edit systemd service file
sudo nano /usr/lib/systemd/system/code-server@.service

# Modify ExecStart line
ExecStart=/usr/bin/code-server --bind-addr=0.0.0.0:8080

# Reload and restart
sudo systemctl daemon-reload
sudo systemctl restart code-server@$USER

# Verify listening status
ss -tulpn | grep 8080
```

## 5. Nginx Proxy Host Configuration

Add a proxy host in nginx-proxy-manager with the following settings:

Basic Settings:

- Domain Names: your-domain.com
- Scheme: http
- Forward Hostname: 172.17.0.1
- Forward Port: 8080

Advanced Configuration:

```nginx
# Allow service worker registration
location /stable-bd34cd510f44b25d40b3e30ec9a706a949428c16/ {
    proxy_pass http://172.17.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection upgrade;
    proxy_set_header Accept-Encoding gzip;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;

    auth_request off;
    proxy_pass_request_headers on;
}

# WebSocket support
location ~ ^/([a-zA-Z0-9\-\_]+)/ws$ {
    proxy_pass http://172.17.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 6. Troubleshooting

### Service Worker Errors

If you encounter service worker registration errors:

```
Error loading webview: Error: Could not register service worker
```

Verify the nginx configuration includes the service worker location block and auth_request is disabled.

### File Permission Issues

For "Failed to save" errors:

```bash
# Set correct permissions
sudo chown -R $USER:$USER /your/workspace/path
sudo chmod -R 755 /your/workspace/path
```

### Connection Issues

Debug connection to code-server:

```bash
# Test from host
curl -v localhost:8080

# Test from container
docker exec -it tom3-npm curl -v host.docker.internal:8080

# Check logs
docker exec -it tom3-npm cat /data/logs/proxy-host-[number]_error.log
```

### Stopping Code-Server

To stop the service:

```bash
sudo systemctl stop code-server@$USER
sudo systemctl status code-server@$USER
```

## 7. References

- [Code-Server GitHub Repository](https://github.com/coder/code-server)
- [Code-Server Documentation](https://coder.com/docs/code-server/latest)
- [Nginx Proxy Manager Documentation](https://nginxproxymanager.com/)

<!-- Navigation -->
<hr/>
**[Up: Introduction](Get%20Started%20With%20a%20New%20Linux%20VPS.md)** |  **[Previous: Deploying Coolify](Deploy%20Coolify%20PAAS.md)** | **[Next: (Back to Introduction)](Get%20Started%20With%20a%20New%20Linux%20VPS.md)**
