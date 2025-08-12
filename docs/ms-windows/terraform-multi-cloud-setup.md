# Terraform Multi-Cloud Setup

This guide will help you set up Terraform to manage infrastructure across multiple cloud providers (Hetzner and AWS).

## 1. Start a Git Project

```bash
# Create project directory
mkdir -p multicloud/terraform
cd multicloud/terraform

# Initialize git repository
git init

# Create basic gitignore file for Terraform
cat > .gitignore << EOF
# Local .terraform directories
**/.terraform/*

# .tfstate files
*.tfstate
*.tfstate.*

# Crash log files
crash.log
crash.*.log

# Exclude all .tfvars files, which are likely to contain sensitive data
*.tfvars
*.tfvars.json

# Ignore override files as they're usually used for local dev
override.tf
override.tf.json
*_override.tf
*_override.tf.json

# Include tfplan files to ignore the plan output of command: terraform plan
*tfplan*

# Ignore CLI configuration files
.terraformrc
terraform.rc

# Ignore lock files
.terraform.lock.hcl
EOF

# Initial commit
git add .
git commit -m "Initial commit with gitignore"
```

## 2. Create Best Practice Project Directory Structure

```bash
# Create main project structure
mkdir -p environments/{dev,staging,prod, tst}
mkdir -p modules/{hetzner,aws,network,database}
mkdir -p scripts
mkdir -p docs

# Create README files
touch README.md
touch environments/README.md
touch modules/README.md

# Create shared configuration files
mkdir -p shared
touch shared/providers.tf
touch shared/variables.tf
touch shared/outputs.tf

# Create environment-specific configurations
for env in dev staging prod; do
  mkdir -p environments/$env/{hetzner,aws,}
  touch environments/$env/main.tf
  touch environments/$env/variables.tf
  touch environments/$env/outputs.tf
  touch environments/$env/terraform.tfvars.example
  touch environments/$env/backend.tf
done

# Initial commit for directory structure
git add .
git commit -m "Create project directory structure"
```

## 3. Install Terraform Prerequisites on Servers

### Set Local Development Machine  (WSL Ubuntu 24.04) 
[[Installing Ubuntu 24.04 LTS on WSL]]

1. Installing AWS CLI
```shell 
# 1. Navigate to your home directory
cd ~

# 2. Install necessary prerequisites
sudo apt update && sudo apt install -y unzip curl

# 3. Download the AWS CLI installation package
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

# 4. Extract the installer
sudo unzip awscliv2.zip

# 5. Run the installer
sudo ./aws/install

# 6. Verify the installation
aws --version

# 7. Clean up installation files (optional)
rm -rf aws awscliv2.zip

```

2. Installing Hetzner Cloud CLI
```shell 
cd /usr/local/bin

# Download Hetzner CLI
wget https://github.com/hetznercloud/cli/releases/latest/download/hcloud-linux-amd64.tar.gz

# Extract
tar -xzf hcloud-linux-amd64.tar.gz

# Move to PATH
mv hcloud /usr/local/bin/

# Make executable
chmod +x /usr/local/bin/hcloud

# Verify installation
hcloud version

# Clean up
rm hcloud-linux-amd64.tar.gz

```

3. Installing Terraform CLI
```shell 
cd /usr/local/bin

wget https://releases.hashicorp.com/terraform/1.12.2/terraform_1.12.2_linux_amd64.zip

# Unzip it
unzip terraform_1.8.0_linux_amd64.zip

# Move to a directory in PATH
mv terraform /usr/local/bin/

# Verify installation
terraform version

# Clean up
rm terraform_1.8.0_linux_amd64.zip

```

4. set AWS Variables with every new session

```shell
# set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env vars for the session
export AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"

#option2
source ./.aws_creds.sh


# create a terraform state bucket
aws s3api create-bucket --bucket your-unique-terraform-state-bucket-name --region your-aws-region --create-bucket-configuration LocationConstraint=your-aws-region



#enable versioning on it for state file protection
aws s3api put-bucket-versioning --bucket your-unique-terraform-state-bucket-name --versioning-configuration Status=Enabled

```

- create `#!/bin/bash` to automate set AWS Variables
```shell
#!/bin/bash

# Get AWS credentials from terraform.tfvars file

AWS_ACCESS_KEY_ID=$(grep -E "aws_access_key\s*=" "$(dirname "$0")/terraform.tfvars" | cut -d'"' -f2)

AWS_SECRET_ACCESS_KEY=$(grep -E "aws_secret_key\s*=" "$(dirname "$0")/terraform.tfvars" | cut -d'"' -f2)


# Export the credentials as environment variables

export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY


echo "AWS credentials have been exported from terraform.tfvars"
echo "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID:0:5}..."
echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY:0:5}..."

```
  
  
  
### Troubleshooting
```bash
# delete the ./.terraform directory and the ./.terraform.lock.hcl
rm -rf .terraform .terraform.lock.hcl

terraform init -reconfigure

```
### Remote Servers (Optional for remote execution)

For each server (VPS1, VPS2, VPS3, VPS4):

```bash
# Install Terraform
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform

# Install required tools
sudo apt-get install -y git unzip jq

# Install cloud provider CLI tools (if needed)
# For AWS
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# For Hetzner (hcloud CLI)
wget -O hcloud.tar.gz https://github.com/hetznercloud/cli/releases/latest/download/hcloud-linux-amd64.tar.gz
tar -xf hcloud.tar.gz
sudo mv hcloud /usr/local/bin/
```

## 4. Create Terraform Environment

### Configure Provider Files

**shared/providers.tf**
```hcl
terraform {
  required_version = ">= 1.12.2"
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.51.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30.0"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

```

**shared/variables.tf**
```hcl
variable "hcloud_token" {
  description = "Hetzner Cloud API Token"
  type        = string
  sensitive   = true
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}

variable "aws_access_key" {
  description = "AWS access key"
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  description = "AWS secret key"
  type        = string
  sensitive   = true
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "multicloud"
}

variable "environment" {
  description = "Environment (dev,tst,stg,prd)"
  type        = string
}
```

### Create Reusable Modules

**modules/hetzner/server/main.tf**
```hcl
terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
    }
  }
}

variable "name" {
  description = "Name of the server"
  type        = string
}

variable "server_type" {
  description = "Hetzner server type"
  type        = string
  default     = "cx22"
}

variable "image" {
  description = "Server image"
  type        = string
  default     = "Ubuntu 24.04"
}

variable "location" {
  description = "Server location"
  type        = string
  default     = "nbg1"
}

variable "ipv4_address" {
  description = "Server IP V4 address"
  type        = string
  default     = ""
}


variable "ssh_keys" {
  description = "SSH key IDs or names"
  type        = list(string)
  default     = []
}

variable "labels" {
  description = "Labels to apply to the server"
  type        = map(string)
  default     = {}
}

resource "hcloud_server" "server" {
  name        = var.name
  server_type = var.server_type
  image       = var.image
  location    = var.location
  ssh_keys    = var.ssh_keys
  labels      = var.labels
}

output "server_id" {
  value = hcloud_server.server.id
}

output "ipv4_address" {
  value = hcloud_server.server.ipv4_address
}
```

**modules/aws/ec2/main.tf**
```hcl
variable "name" {
  description = "Name of the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "ami" {
  description = "AMI ID"
  type        = string
}

variable "subnet_id" {
  description = "Subnet ID"
  type        = string
}

variable "security_group_ids" {
  description = "Security group IDs"
  type        = list(string)
  default     = []
}

variable "key_name" {
  description = "SSH key name"
  type        = string
  default     = null
}

variable "tags" {
  description = "Tags to apply to the instance"
  type        = map(string)
  default     = {}
}

resource "aws_instance" "instance" {
  ami                    = var.ami
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = var.security_group_ids
  key_name               = var.key_name
  
  tags = merge({
    Name = var.name
  }, var.tags)
}

output "instance_id" {
  value = aws_instance.instance.id
}

output "public_ip" {
  value = aws_instance.instance.public_ip
}
```

### Environment-Specific Configuration

**environments/dev/main.tf**
```hcl
terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.51.0"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

resource "hcloud_ssh_key" "default" {
  name       = var.ssh_key_name
  public_key = var.ssh_public_key
}

module "shared" {
  source = "../../shared"
  environment    = "dev"
  hcloud_token   = var.hcloud_token
  aws_access_key = var.aws_access_key
  aws_secret_key = var.aws_secret_key
}

# Hetzner VPS1
module "hetzner_vps1" {
  source = "../../modules/hetzner/server"
  name        = "vps1-dev"
  server_type = "cx22"
  location    = "nbg1"
  image = "ubuntu-22.04"
  ssh_keys    = [hcloud_ssh_key.default.id]
  labels = {
    environment = "dev"
    purpose     = "web"
  }
}

```

**environments/dev/backend.tf**
```hcl
terraform {
  backend "s3" {
    bucket         = "terraform-state-bucket-nc555-test"
    key            = "test/terraform.tfstate"
    region         = "eu-central-1"
    encrypt        = true
    use_lockfile   = true
  }
}
```

**environments/dev/terraform.tfvars.example**
```hcl
hcloud_token   = "your_hetzner_token"
aws_access_key = "your_aws_access_key"
aws_secret_key = "your_aws_secret_key"
ssh_public_key = "your_public_ssh_key_content"
ssh_key_name = "your_public_ssh_key_name"
```

## 5. Implementation Steps

1. **Prepare Local Environment**
   ```bash
   # Copy and edit tfvars file
   cd environments/dev
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your actual credentials
   ```

2. **Initialize Terraform**
   ```bash
   terraform init
   
   # apply changes to settings
	rm -rf .terraform .terraform.lock.hcl

   terraform init -reconfigure

   ```

4. **Create Execution Plan**
   ```bash
   terraform plan -out=tfplan
   ```

5. **Apply Configuration**
   ```bash
   terraform apply tfplan
   ```

6. **Destroy Configuration**
   ```bash
   terraform destroy
   ```

7. **Set Up Remote State Backend**
   ```bash
   # Create S3 bucket and DynamoDB table for state locking (if using AWS)
   aws s3 mb s3://your-terraform-state-bucket --region us-west-2
   
   aws dynamodb create-table \
     --table-name terraform-locks \
     --attribute-definitions AttributeName=LockID,AttributeType=S \
     --key-schema AttributeName=LockID,KeyType=HASH \
     --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
     --region us-west-2
   ```

8. **Implement CI/CD Pipeline**
   - Create `.github/workflows/terraform.yml` for GitHub Actions or
   - Set up GitLab CI/CD with `.gitlab-ci.yml`

## 6. Open Source GUI Tools

1. **Terraform Cloud**: Free tier available for state management and collaboration
   - Web-based UI for managing Terraform runs
   - Integrated with version control systems

2. **Atlantis**: Open-source Terraform pull request automation
   - https://www.runatlantis.io/
   - Automates Terraform planning and applying on pull requests

3. **Terraboard**: Web dashboard to visualize and query Terraform states
   - https://github.com/camptocamp/terraboard
   - Provides a visual interface for state analysis

4. **Blast Radius**: Interactive visualization of Terraform dependency graphs
   - https://github.com/28mm/blast-radius
   - Visual representation of your infrastructure

5. **Terraform Visual**: Visualize Terraform plan outputs
   - https://github.com/hieven/terraform-visual
   - Creates diagrams from Terraform plans

6. **Infracost**: Cost estimates for Terraform
   - https://github.com/infracost/infracost
   - Shows cloud cost estimates for Terraform projects

## 7. Advanced Implementation Recommendations

1. **Implement Module Versioning**
   - Use Git tags for versioning modules
   - Reference specific versions in module sources

2. **Set Up Workspaces**
   ```bash
   terraform workspace new dev
   terraform workspace new staging
   terraform workspace new prod
   ```

3. **Create a Makefile for Common Operations**
   ```makefile
   .PHONY: init plan apply destroy

   init:
       terraform init

   plan:
       terraform plan -out=tfplan

   apply:
       terraform apply tfplan

   destroy:
       terraform destroy
   ```

4. **Implement Drift Detection**
   - Schedule regular terraform plan runs to detect drift
   - Alert if infrastructure doesn't match configuration

5. **Set Up Automated Testing**
   - Use Terratest for infrastructure testing
   - Implement policy-as-code with Open Policy Agent

6. **Implement Secrets Management**
   - Use AWS Secrets Manager, HashiCorp Vault, or similar
   - Never store credentials in your repository

This guide provides a comprehensive setup for managing multi-cloud infrastructure with Terraform. Customize it based on your specific requirements and infrastructure needs.