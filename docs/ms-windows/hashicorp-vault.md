*** 
tags: #vault #secrets #hashicorp
***
# HashiCorp Vault Installation and Configuration Guide

## Table of Contents
1. [[#Prerequisites]]
2. [[#Installation]]
3. [[#Configuration]]
4. [[#SSL/TLS Setup]]
5. [[#Initialization and Unsealing]]
6. [[#Secret Engines]]
7. [[#Troubleshooting]]

## Prerequisites
- Ubuntu 24.04 LTS
- Root or sudo privileges
- Open port 8200

## Reference 
[[HashiCorp Vault Secret]]

## Initial Vault Setup
### Installation

```bash
# For Ubuntu 24.04 LTS

# Switch to root
sudo su

# Add HashiCorp GPG key
wget -O - https://apt.releases.hashicorp.com/gpg | \
    gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg

# Add HashiCorp repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
    tee /etc/apt/sources.list.d/hashicorp.list

# Update and install Vault
apt update && apt install vault

```

### Configuration

```bash
# Create necessary directories
mkdir -p /opt/vault/{data,tls}

# Set correct permissions
chown -R vault:vault /opt/vault
chmod 750 /opt/vault/data

# Create basic configuration
cat << EOF > /etc/vault.d/vault.hcl
ui = true
storage "file" {
  path = "/opt/vault/data"
}
listener "tcp" {
  address = "0.0.0.0:8200"
  tls_cert_file = "/opt/vault/tls/vault.crt"
  tls_key_file = "/opt/vault/tls/vault.key"
}
api_addr = "https://127.0.0.1:8200"
EOF

# Set correct permissions for config
chown vault:vault /etc/vault.d/vault.hcl
chmod 640 /etc/vault.d/vault.hcl
```

### SSL/TLS Setup
```bash
# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /opt/vault/tls/vault.key \
  -out /opt/vault/tls/vault.crt \
  -subj "/CN=localhost"

# Set permissions
chown vault:vault /opt/vault/tls/vault.{key,crt}
chmod 600 /opt/vault/tls/vault.key
chmod 644 /opt/vault/tls/vault.crt
```

### First time Initialize Vault
```bash
# Start Vault service
sudo systemctl start vault
sudo systemctl enable vault

# Set environment variable
export VAULT_ADDR='https://127.0.0.1:8200'
export VAULT_SKIP_VERIFY=true  # For self-signed certificates

# Initialize Vault
vault operator init

# ❗❗❗ Save the output! It contains:
# - 5 Unseal Keys (need 3 for unsealing)
# - Initial Root Token
```


## Start Vault 

### Start Vault Services
```bash

# Check service status
systemctl status vault

# Start Vault service
sudo systemctl start vault
sudo systemctl enable vault

# Set environment variable
export VAULT_ADDR='https://127.0.0.1:8200'
export VAULT_SKIP_VERIFY=true  # For self-signed certificates





```

### Unseal & Login Vault

```bash
# step1
# reapeat 3 times, each time provide key[i]
vault operator unseal 

# login using root-token
vault login <root-token>
```

## Secret Engines

### KV Version 2 (Key-Value)
```bash
# Enable KV version 2
vault secrets enable -version=2 kv

# Store a secret
vault kv put kv/my-secret username=myuser password=mypass

# Retrieve a secret
vault kv get kv/my-secret

# change the value of the username from "myuser" to "John Kirby"
vault kv patch kv/my-secret username="John Kirby"

# update both fields at once
vault kv put kv/my-secret username="John Kirby" password="Jhon-Password"


```



### Database Secrets Engine
```bash
# Enable database secrets engine
vault secrets enable database

# Configure MySQL connection
vault write database/config/mysql \
    plugin_name=mysql-database-plugin \
    connection_url="{{username}}:{{password}}@tcp(localhost:3306)/" \
    allowed_roles="my-role" \
    username="root" \
    password="root-password"
```

### PKI Secrets Engine
```bash
# Enable PKI secrets engine
vault secrets enable pki

# Configure PKI settings
vault write pki/root/generate/internal \
    common_name=example.com \
    ttl=8760h
```

## Troubleshooting

### Common Issues and Solutions

1. **Service Won't Start**
```bash
# Check service status
systemctl status vault

# Check logs
journalctl -xeu vault.service

# Verify permissions
ls -la /opt/vault/
ls -la /opt/vault/tls/
```

2. **TLS Certificate Issues**
```bash
# Verify certificate
openssl x509 -in /opt/vault/tls/vault.crt -text -noout

# Test TLS connection
curl -k https://127.0.0.1:8200/v1/sys/health
```

3. **Sealed Vault**
```bash
# Check seal status
vault status

# Unseal vault (needs 3 keys)
vault operator unseal
```

### Health Check
```bash
# Check Vault status
vault status

# Check server health
curl -k https://127.0.0.1:8200/v1/sys/health
```

## Best Practices

1. **Security**
   - Rotate root tokens regularly
   - Use appropriate policies
   - Enable audit logging
   - Use TLS certificates from trusted CA in production

2. **Backup**
   - Regular backup of Vault data
   - Secure storage of unseal keys
   - Document recovery procedures

3. **Monitoring**
   - Set up monitoring for seal status
   - Monitor certificate expiration
   - Track usage metrics

## Common Commands
```bash
# Login
vault login

# List mounted secret engines
vault secrets list

# Create policy
vault policy write my-policy policy.hcl

# Create token
vault token create -policy=my-policy
```


