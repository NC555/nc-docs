# HashiCorp Vault Secret Engines Guide

Here's a comprehensive breakdown of the main secret engines and their use cases:

## 1. Key/Value (KV)

### Version 1 vs Version 2
- **KV v1**: Simple key-value storage
- **KV v2**: Adds versioning, metadata, soft deletes

### Best For
- Application configurations
- API keys
- Simple credentials
- Static secrets

### Example Usage
```bash
# Enable KV v2
vault secrets enable -version=2 -path=secret kv

# Store secret
vault kv put secret/myapp/config api_key=123456 env=prod

# Read secret
vault kv get secret/myapp/config

# Get specific version
vault kv get -version=1 secret/myapp/config
```

## 2. Database
### Features
- Dynamic credentials
- Automatic credential rotation
- Support for multiple database types

### Best For
- Database access management
- Temporary database credentials
- Automated credential rotation

### Example Usage
```bash
# Enable database engine
vault secrets enable database

# Configure MySQL connection
vault write database/config/mysql \
    plugin_name=mysql-database-plugin \
    connection_url="{{username}}:{{password}}@tcp(localhost:3306)/" \
    allowed_roles="my-role" \
    username="root" \
    password="rootpassword"

# Create role
vault write database/roles/my-role \
    db_name=mysql \
    creation_statements="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}'" \
    default_ttl="1h" \
    max_ttl="24h"
```

## 3. PKI (Public Key Infrastructure)
### Features
- Certificate issuance
- Certificate management
- Certificate revocation

### Best For
- SSL/TLS certificates
- Internal PKI infrastructure
- Certificate automation

### Example Usage
```bash
# Enable PKI
vault secrets enable pki

# Configure CA
vault write pki/root/generate/internal \
    common_name=example.com \
    ttl=8760h

# Create role
vault write pki/roles/example-dot-com \
    allowed_domains=example.com \
    allow_subdomains=true \
    max_ttl=72h
```

## 4. Transit
### Features
- Encryption as a service
- Key rotation
- Secure key storage

### Best For
- Data encryption
- Key management
- Cryptographic operations

### Example Usage
```bash
# Enable transit
vault secrets enable transit

# Create encryption key
vault write -f transit/keys/my-key

# Encrypt data
vault write transit/encrypt/my-key \
    plaintext=$(echo "my secret data" | base64)
```

## 5. AWS/Azure/GCP
### Features
- Dynamic cloud credentials
- IAM management
- Role-based access

### Best For
- Cloud infrastructure access
- Temporary cloud credentials
- Multi-cloud environments

### Example Usage
```bash
# Enable AWS
vault secrets enable aws

# Configure AWS credentials
vault write aws/config/root \
    access_key=AKIAXXXXXXXX \
    secret_key=XXXXXXXXXX \
    region=us-east-1

# Create role
vault write aws/roles/my-role \
    credential_type=iam_user \
    policy_document=@policy.json
```

## Selection Guide

### Use KV When
- You need simple secret storage
- Secrets are static
- You want version control
- You need metadata tracking

### Use Database When
- You need dynamic credentials
- You want automated rotation
- You're managing database access
- You need temporary credentials

### Use PKI When
- You need certificate management
- You're building internal PKI
- You want automated certificate issuance
- You need certificate rotation

### Use Transit When
- You need encryption services
- You want centralized key management
- You need cryptographic operations
- You want key rotation capabilities

### Use Cloud (AWS/Azure/GCP) When
- You're managing cloud resources
- You need temporary cloud credentials
- You want automated IAM management
- You're implementing least privilege access
