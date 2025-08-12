# HAProxy TCP/HTTP Load Balancer

## Table of Contents

1. [[#What is HAProxy?]]
2. [[#Load Balancer Concepts]]
3. [[#Round Robin Load Balancing]]
4. [[#HAProxy Pros and Cons]]
5. [[#Load Balancer Architecture with Reverse Proxy]]
6. [[#SSL Termination]]
7. [[#Access Control Lists (ACLs)]]
8. [[#HAProxy Setup Guide]]
9. [[#Example Configuration]]

## What is HAProxy?

HAProxy (High Availability Proxy) is a free, open-source load balancing and proxying solution for TCP and HTTP-based applications. It is particularly suited for high traffic websites and provides reliability, high performance, and protection against common overload scenarios.

HAProxy has become the standard for many large-scale infrastructures including GitHub, Twitter, Reddit, Stack Overflow, and many others due to its performance, reliability, and feature set.

## Load Balancer Concepts

A load balancer distributes network traffic across multiple servers to ensure no single server becomes overwhelmed, improving the reliability and capacity of applications.

### Key Load Balancing Concepts:

1. **Load Distribution**: Spreading requests across multiple servers
2. **Health Checks**: Monitoring backend servers to ensure they're responding properly
3. **Failover**: Automatically routing traffic away from failed servers
4. **Session Persistence**: Ensuring a client's requests go to the same server (also called sticky sessions)
5. **Layer 4 vs Layer 7 Load Balancing**:
   - **Layer 4** (Transport): Works at the TCP/UDP level, faster but less feature-rich
   - **Layer 7** (Application): Works at the HTTP level, more intelligent routing but more resource-intensive

### Load Balancing Algorithms:

1. **Round Robin**: Requests are distributed sequentially across servers
2. **Least Connections**: Routes to the server with the fewest active connections
3. **IP Hash**: Uses client IP address to determine which server receives the request
4. **URI Hash**: Routes based on the requested URI
5. **Weighted Algorithms**: Administrators can assign different weights to servers based on capacity

## Round Robin Load Balancing

Round Robin is one of the most common load balancing algorithms used in HAProxy and other load balancers.

### How Round Robin Works:

1. Requests are distributed to each server in sequence
2. After reaching the last server, the algorithm starts again from the first server
3. Each server receives roughly the same number of requests

```
Request 1 → Server 1
Request 2 → Server 2
Request 3 → Server 3
Request 4 → Server 1 (and the cycle continues)
```

### Weighted Round Robin:

HAProxy supports weighted round robin, allowing administrators to handle servers with different capacities:

```haproxy
backend web_servers
    balance roundrobin
    server web1 10.0.0.1:80 weight 3
    server web2 10.0.0.2:80 weight 1
```

In this example, web1 will receive 3 requests for every 1 request sent to web2.

### Round Robin Advantages:

- Simple to implement and understand
- Works well when servers have similar capabilities
- Good for stateless applications

### Round Robin Limitations:

- Doesn't account for varying request processing times
- Doesn't consider current server load
- May not be ideal for sessions requiring persistence

## HAProxy Pros and Cons

### Pros:

1. **Performance**:

   - Extremely fast and efficient
   - Can handle tens of thousands of connections with minimal resources
   - Low latency

2. **Reliability**:

   - Battle-tested in high-traffic environments
   - Stable across versions
   - Excellent in production environments

3. **Features**:

   - Advanced load balancing algorithms
   - Detailed health checking
   - Content switching and ACLs
   - SSL termination
   - Detailed statistics

4. **Security**:

   - DDoS mitigation
   - Rate limiting
   - Connection limiting
   - ACL-based security controls

5. **Monitoring**:
   - Built-in stats page
   - Extensive logging capabilities
   - Integration with monitoring tools

### Cons:

1. **Learning Curve**:

   - Configuration syntax can be complex for beginners
   - Advanced features require deeper understanding

2. **No Built-in Web GUI**:

   - Configuration is primarily text-based
   - Third-party GUIs exist but aren't part of the core project

3. **Limited HTTP Caching**:

   - Not designed as a full-featured caching proxy
   - NGINX may be better for caching static content

4. **No Traffic Scripting**:

   - Limited ability to modify requests/responses compared to some alternatives
   - No native scripting language (though there is Lua support in newer versions)

5. **No Native Service Discovery**:
   - Requires additional tools for dynamic scaling in cloud environments
   - Configuration changes require reload

## Load Balancer Architecture with Reverse Proxy

A common architecture pattern is to deploy HAProxy as a load balancer in front of a cluster of reverse proxies (like NGINX).

### Typical Flow:

```
[Clients] ↔ [HAProxy Load Balancer] ↔ [NGINX Reverse Proxies] ↔ [Application Servers]
```

### Advantages of This Architecture:

1. **Separation of Concerns**:

   - HAProxy focuses on load distribution and high availability
   - NGINX handles content caching, compression, and complex HTTP processing

2. **Defense in Depth**:

   - Multiple layers of security and protection
   - Can isolate different types of traffic

3. **Specialized Optimization**:

   - Configure HAProxy for optimal load balancing
   - Configure NGINX for optimal HTTP processing

4. **Scalability**:
   - Can scale reverse proxies and application servers independently
   - Can handle more concurrent connections

### Example Deployment Architecture:

```
Internet
   ↓
[Firewall]
   ↓
[HAProxy Load Balancer Cluster]
   ↓
[NGINX Reverse Proxy Pool]
   ↓
[Application Server Cluster]
   ↓
[Database Cluster]
```

### Configuration Considerations:

1. **X-Forwarded Headers**: Ensure proper headers are passed through the proxies to maintain client information
2. **Health Checks**: Configure health checks at each layer
3. **SSL**: Decide where SSL termination occurs (typically at the HAProxy layer)
4. **Session Persistence**: Ensure sticky sessions work through all layers if needed

## SSL Termination

SSL Termination is an important feature of HAProxy, allowing it to handle encrypted traffic efficiently.

### What is SSL Termination?

SSL termination is the process of decrypting incoming HTTPS traffic at the load balancer, allowing backend servers to receive unencrypted HTTP requests.

```
[Client] ←(HTTPS)→ [HAProxy] ←(HTTP)→ [Backend Servers]
```

### Benefits of SSL Termination:

1. **Performance**:

   - Reduces CPU load on backend servers
   - Centralizes encryption/decryption processing
   - Improves overall system throughput

2. **Certificate Management**:

   - SSL certificates managed in one place
   - Easier certificate renewals
   - Simplified TLS version and cipher management

3. **Security Features**:
   - Centralized TLS policy enforcement
   - Better monitoring of encrypted traffic
   - Can add security headers to all responses

### Implementation in HAProxy:

```haproxy
frontend https-in
    bind *:443 ssl crt /etc/ssl/certs/combined.pem
    mode http
    http-response set-header Strict-Transport-Security "max-age=31536000"
    default_backend app-servers

backend app-servers
    mode http
    server app1 10.0.0.1:80 check
    server app2 10.0.0.2:80 check
```

The `combined.pem` file contains both the certificate and private key.

## Access Control Lists (ACLs)

Access Control Lists (ACLs) in HAProxy are powerful tools for creating rules based on various conditions.

### ACL Syntax:

```haproxy
acl NAME CRITERION VALUE
```

### Common ACL Types:

```haproxy
# Path-based
acl is_api path_beg /api
acl is_static path_end .jpg .png .gif

# Host-based
acl is_example hdr(host) -i example.com

# Method-based
acl is_post method POST

# Source IP-based
acl internal_network src 10.0.0.0/8

# Custom header-based
acl auth_token hdr(Authorization) -m found
```

### Using ACLs:

```haproxy
frontend http-in
    bind *:80

    # Block specific IPs
    acl blocked_ips src 192.168.1.100
    http-request deny if blocked_ips

    # Route API requests to API servers
    acl is_api path_beg /api
    use_backend api_servers if is_api

    # Rate limiting
    acl too_many_requests sc0_gpc0_rate() gt 100
    http-request deny if too_many_requests

    # Default backend
    default_backend web_servers
```

### ACL Use Cases:

1. **Traffic Routing**: Direct traffic to different backends based on criteria
2. **Access Control**: Restrict access based on IP, headers, etc.
3. **Rate Limiting**: Prevent abuse by limiting request rates
4. **Request Filtering**: Block malicious requests
5. **Content Switching**: Route based on content type or URL patterns
6. **A/B Testing**: Direct percentage of traffic to different backends

## HAProxy Setup Guide

This guide covers basic HAProxy installation and configuration on a Linux system.

### Installation:

#### Debian/Ubuntu:

```bash
sudo apt update
sudo apt install haproxy
```

#### CentOS/RHEL:

```bash
sudo yum install haproxy
```

#### Verify Installation:

```bash
haproxy -v
```

### Basic Configuration:

1. **Edit the configuration file**:

   ```bash
   sudo vi /etc/haproxy/haproxy.cfg
   ```

2. **Basic configuration structure**:

   ```haproxy
   global
       log /dev/log local0
       log /dev/log local1 notice
       chroot /var/lib/haproxy
       stats socket /run/haproxy/admin.sock mode 660 level admin
       stats timeout 30s
       user haproxy
       group haproxy
       daemon

   defaults
       log     global
       mode    http
       option  httplog
       option  dontlognull
       timeout connect 5000
       timeout client  50000
       timeout server  50000

   frontend http-in
       bind *:80
       default_backend servers

   backend servers
       balance roundrobin
       server server1 192.168.1.10:80 check
       server server2 192.168.1.11:80 check
   ```

3. **Check configuration syntax**:

   ```bash
   sudo haproxy -c -f /etc/haproxy/haproxy.cfg
   ```

4. **Start/Restart HAProxy**:

   ```bash
   sudo systemctl restart haproxy
   ```

5. **Enable at boot**:
   ```bash
   sudo systemctl enable haproxy
   ```

### Setting Up SSL Termination:

1. **Prepare SSL certificate**:

   ```bash
   cat /path/to/your_cert.pem /path/to/your_key.pem > /etc/ssl/private/combined.pem
   chmod 600 /etc/ssl/private/combined.pem
   ```

2. **Configure HAProxy for SSL**:
   ```haproxy
   frontend https-in
       bind *:443 ssl crt /etc/ssl/private/combined.pem
       http-request set-header X-Forwarded-Proto https
       default_backend servers
   ```

### Setting Up Health Checks:

```haproxy
backend servers
    balance roundrobin
    option httpchk GET /health
    http-check expect status 200
    server server1 192.168.1.10:80 check inter 5s fall 3 rise 2
    server server2 192.168.1.11:80 check inter 5s fall 3 rise 2
```

This checks the `/health` endpoint every 5 seconds. The server is considered down after 3 consecutive failures and back up after 2 consecutive successful checks.

### Enabling Statistics Page:

```haproxy
listen stats
    bind *:8404
    stats enable
    stats uri /stats
    stats refresh 10s
    stats auth admin:your_password
```

Access the stats page at `http://your_server_ip:8404/stats`

## Example Configuration

Here's a comprehensive HAProxy configuration example with common features:

```haproxy
global
    log /dev/log local0
    log /dev/log local1 notice
    maxconn 50000
    user haproxy
    group haproxy
    daemon
    # SSL settings
    ssl-default-bind-ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384
    ssl-default-bind-options no-sslv3 no-tlsv10 no-tlsv11

defaults
    log     global
    mode    http
    option  httplog
    option  dontlognull
    timeout connect 5000
    timeout client  50000
    timeout server  50000
    errorfile 400 /etc/haproxy/errors/400.http
    errorfile 403 /etc/haproxy/errors/403.http
    errorfile 408 /etc/haproxy/errors/408.http
    errorfile 500 /etc/haproxy/errors/500.http
    errorfile 502 /etc/haproxy/errors/502.http
    errorfile 503 /etc/haproxy/errors/503.http
    errorfile 504 /etc/haproxy/errors/504.http

# HTTPS frontend with SSL termination
frontend www-https
    bind *:443 ssl crt /etc/ssl/certs/mydomain.pem
    mode http
    option forwardfor
    # HTTP security headers
    http-response set-header Strict-Transport-Security "max-age=31536000"
    http-response set-header X-Content-Type-Options nosniff
    http-response set-header X-Frame-Options DENY
    # ACLs for routing
    acl is_api path_beg /api
    acl is_webapp path_beg /app
    acl is_static path_end .jpg .png .css .js
    # Rate limiting
    stick-table type ip size 100k expire 30s store http_req_rate(10s)
    acl too_many_requests sc0_http_req_rate(www-https) gt 20
    http-request deny if too_many_requests
    # Route to different backends based on path
    use_backend api_servers if is_api
    use_backend webapp_servers if is_webapp
    use_backend static_servers if is_static
    default_backend web_servers

# HTTP frontend with redirect to HTTPS
frontend www-http
    bind *:80
    mode http
    option httplog
    # Redirect HTTP to HTTPS
    redirect scheme https code 301 if !{ ssl_fc }

# API Backend
backend api_servers
    mode http
    balance roundrobin
    option httpchk GET /health
    http-check expect status 200
    cookie SERVERID insert indirect nocache
    server api1 10.0.0.1:8080 check cookie s1
    server api2 10.0.0.2:8080 check cookie s2
    server api3 10.0.0.3:8080 check cookie s3 backup

# Web App Backend
backend webapp_servers
    mode http
    balance roundrobin
    option httpchk GET /health
    http-check expect status 200
    cookie SERVERID insert indirect nocache
    server web1 10.0.1.1:8080 check cookie s1 weight 3
    server web2 10.0.1.2:8080 check cookie s2 weight 2

# Static Content Backend
backend static_servers
    mode http
    balance roundrobin
    option httpchk HEAD /
    server static1 10.0.2.1:80 check
    server static2 10.0.2.2:80 check

# Default Web Backend
backend web_servers
    mode http
    balance roundrobin
    option httpchk GET /health
    http-check expect status 200
    cookie SERVERID insert indirect nocache
    server web1 10.0.3.1:8080 check cookie s1
    server web2 10.0.3.2:8080 check cookie s2

# Stats page
listen stats
    bind *:8404
    mode http
    stats enable
    stats uri /stats
    stats refresh 10s
    stats admin if LOCALHOST
    stats auth admin:secretpassword
```

This configuration includes:

- SSL termination
- Multiple backend definitions
- Path-based routing
- HTTP to HTTPS redirection
- Cookie-based sticky sessions
- Health checks
- Rate limiting
- Security headers
- Statistics page

---

**[Up: Introduction](./get-started-with-a-new-linux-vps.md)** | **[Previous: Deploying Coolify](./get-started-with-a-new-linux-vps.md)** | **[Next: (Back to Introduction)](./get-started-with-a-new-linux-vps.md)**
