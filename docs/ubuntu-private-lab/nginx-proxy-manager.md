# Nginx Proxy Manager

This document provides a step-by-step guide on deploying Nginx Proxy Manager (NPM) and configuring it to route traffic to different services, including a dashboard and a Coolify instance. This tutorial uses information found at https://nginxproxymanager.com/setup/ as a reference.

## Prerequisites

If you don't have Docker and Docker Compose installed, follow the official Docker documentation for your operating system:

- [Install docker dependencies](Install%20Docker%20Dependencies.md)
  follow the instructions in order to install the Docker dependencies

**Action:** Open the necessary ports in your firewall

```bash
# Allow HTTP traffic
sudo ufw allow 80/tcp  #Public HTTP Port

# Allow HTTPS traffic
sudo ufw allow 443/tcp #Public HTTPS Port

# Allow HTTPS traffic
sudo ufw allow 81/tcp #Admin Web Port

```

**Details:**

Create a directory for your NPM deployment and create a `docker-compose.yml` file inside it.

## Step 1: Create Docker Network with Custom Subnet

Create a Docker network with a specific subnet for better control over container IP addresses:

bash

```bash
# Create a new Docker network with a custom subnet
docker network create --subnet=10.0.1.0/24 --gateway=10.0.1.1 coolify
```

This creates a network with:

- Network name: docker-network-1
- Subnet: 10.0.1.0/24
- Gateway: 10.0.1.1

## Step 2: Deploy Nginx Proxy Manager Container with Fixed IP

Create a `docker-compose.yml` file:

```bash
mkdir data/nginx-proxy-manager
cd data/nginx-proxy-manager
nano docker-compose.yml
```

Paste the following content:
yaml

```yaml
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

Deploy with Docker Compose:

bash

```bash
docker-compose up -d
```

## Step 3: Verify NPM Container is Running and Check Its IP

bash

```bash
# Check if the container is running
docker ps | grep nginx-proxy-manager

# Check the assigned IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nginx-proxy-manager

# Should return 10.0.1.2

        "Containers": {
            "5ff8c8f9c9a9786fa9b7710c20fc9f5c90d30a874c0b393fd5f7b8607b0c89d6": {
                "Name": "npm-container",
                "EndpointID": "a1eea2eda21f91a0e748a9d20d32416f88cc97b24d28ce662555ab079ae61e00",
                "MacAddress": "42:9b:7b:1c:ee:98",
                "IPv4Address": "10.0.1.2/24",
                "IPv6Address": ""
            }
        }


```

Alternatively, inspect the network to see all container IPs:

bash

```bash
docker network inspect coolify
```

## Step 4: Initial Access to NPM Dashboard

1. Use SSH tunneling to access the NPM dashboard:

   bash

   ```bash
   # On your local machine, create an SSH tunnel
   ssh -L 8081:localhost:81 user@99.99.99.99
   ```

   Then open a web browser and navigate to: `http://localhost:8081` Note: If you didn't bind port 81 to localhost only, you can directly access: `http://99.99.99.99:81`

2. Log in with the default credentials
   ```
   Email: admin@example.com
   password: changeme
   ```

## Step 5: Configure NPM to Serve Dashboard over HTTPS

1. In the NPM dashboard, navigate to "Hosts" → "Proxy Hosts"
2. Click "Add Proxy Host" button
3. In the "Details" tab:
   - Domain Names: `nginx-proxy-manager.example.com`
   - Scheme: `http`
   - Forward Hostname/IP: `nginx-proxy-manager`
   - Forward Port: `81`
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
5. Go to the "Advanced" tab:

```bash
location / {
	proxy_pass http://nginx-proxy-manager:81;
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

## Step 6: Configure Cloudflare SSL/TLS Settings

Since you're using Cloudflare as your DNS provider, you need to adjust its SSL/TLS settings:

1. Log in to your Cloudflare dashboard
2. Navigate to your domain's settings
3. Go to the SSL/TLS section
4. Change the encryption mode from "Flexible" to "Full" or "Full (Strict)"
   - Use "Full" if you're using Let's Encrypt certificates
   - Use "Full (Strict)" if you're using custom verified certificates

This ensures proper end-to-end encryption from the client to Cloudflare and from Cloudflare to your server.

## Step 7: Testing Your Setup

1. Clear your browser cache and cookies for `subdomain1.example.com`
2. Access `https://subdomain1.example.com` in a private/incognito window
3. You should now be able to log in successfully and access the NPM dashboard

## Conclusion

/data/nginx/proxy_host
