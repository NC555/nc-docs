# OpenSUSE 15 Initial Utilities and Tools Setup for Kubernetes

Lab

This document provides detailed steps for installing and configuring essential utilities and tools on your OpenSUSE 15 server. These tools enhance productivity, system monitoring, and overall server management capabilities for a Kubernetes laboratory environment.

## Prerequisites

- A fresh OpenSUSE 15 server installation
- SSH access to the server with your non-root user
- Internet connectivity for package downloads

## Understanding OpenSUSE Package Management

OpenSUSE uses **Zypper** as its primary package manager, which is different from other distributions. Zypper is powerful and user-friendly, providing clear output and excellent dependency resolution.

### Key Zypper Commands

- `zypper search [package]` - Search for packages
- `zypper install [package]` - Install packages
- `zypper remove [package]` - Remove packages
- `zypper update` - Update package repositories
- `zypper dup` - Distribution upgrade
- `zypper lr` - List repositories
- `zypper info [package]` - Show package information

### OpenSUSE Repository System

OpenSUSE uses a repository-based system where software is organized into different repositories. The main repositories include:

- **OSS (Open Source Software)** - Main open source packages
- **Non-OSS** - Proprietary packages
- **Update** - Security and bug fix updates

## 1. System Update and Repository Management

### Update Package Repositories and Upgrade System

**Action:** Update package repositories and upgrade existing packages

```bash
sudo zypper refresh && sudo zypper update -y
```

**Details:**

- `zypper refresh` updates the package repository metadata
- `zypper update -y` installs available updates for installed packages
- The `-y` flag automatically confirms prompts
- This ensures your system has the latest security patches and improvements

### Verify Repository Configuration

**Action:** Check available repositories

```bash
zypper lr -u
```

**Details:**

- Shows all configured repositories with their URLs
- Helps verify that standard repositories are enabled
- Essential repositories should include Main Repository (OSS), Main Update Repository, and Non-OSS Repository

## 2. Essential Utilities Installation

### Install Core Development and System Tools

**Action:** Install essential utilities for system management and development

```bash
sudo zypper install -y nano tree curl git zsh zip unzip jq yq nfs-client nfs-utils
```

**Details:**
Each package serves a specific purpose in your Kubernetes lab environment:

#### Nano (Command-line Text Editor)

- Simple, user-friendly text editor for configuration files
- Essential for editing YAML manifests and configuration files
- Usage: `nano filename.yaml`
- Basic commands:
  - `Ctrl+O` - Save file
  - `Ctrl+X` - Exit editor
  - `Ctrl+K` - Cut line
  - `Ctrl+U` - Paste line

#### Tree (Directory Structure Visualization)

- Displays directory structures in a tree format
- Useful for understanding project layouts and file organization
- Particularly helpful when working with Kubernetes manifest directories
- Usage: `tree /path/to/directory`
- Common options:
  - `tree -L 2` - Limit depth to 2 levels
  - `tree -a` - Show hidden files
  - `tree -I "*.log"` - Ignore specific file patterns

#### Curl (Data Transfer Tool)

- Command-line tool for transferring data with URLs
- Essential for API testing and downloading resources
- Critical for Kubernetes API interactions and troubleshooting
- Usage examples:
  - `curl -k https://kubernetes-api/api/v1/pods` - Test Kubernetes API
  - `curl -O https://example.com/file.yaml` - Download manifest files
  - `curl -H "Content-Type: application/json" -d '{}' URL` - POST requests

#### Git (Version Control System)

- Distributed version control system for managing code and configurations
- Essential for storing and versioning Kubernetes manifests
- Enables collaboration and change tracking
- Usage:
  - `git init` - Initialize repository
  - `git clone [url]` - Clone repository
  - `git add .` - Stage changes
  - `git commit -m "message"` - Commit changes

#### Zsh (Z Shell)

- Advanced shell with improved features over bash
- Provides better command completion and history management
- Excellent for managing complex Kubernetes commands
- Features include:
  - Smart tab completion
  - Command history sharing
  - Spelling correction
  - Customizable prompts

#### Zip/Unzip (Archive Management)

- Tools for creating and extracting compressed archives
- Useful for backing up configurations and transferring files
- Usage:
  - `zip -r backup.zip /path/to/directory` - Create archive
  - `unzip archive.zip` - Extract archive
  - `unzip -l archive.zip` - List contents without extracting

## 3. Zsh Configuration with Oh-My-Zsh

### Install Oh-My-Zsh Framework

**Action:** Install Oh-My-Zsh to enhance Zsh functionality

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**Details:**

- Oh-My-Zsh provides a framework for managing Zsh configuration
- Includes hundreds of plugins and themes
- Particularly useful for Kubernetes work with kubectl auto-completion
- Creates a `.zshrc` configuration file in your home directory

### Configure Zsh Theme

**Action:** Set an appropriate theme for your Kubernetes lab work

```bash
nano ~/.zshrc
```

**Action:** Find the line starting with `ZSH_THEME=` and change it to:

```bash
ZSH_THEME="robbyrussell"
```

### Enable Useful Plugins for Kubernetes Work

**Action:** Configure plugins that enhance Kubernetes productivity

```bash
nano ~/.zshrc
```

**Action:** Find the plugins line and modify it:

```bash
plugins=(git docker kubectl zsh-autosuggestions zsh-syntax-highlighting)
```

### Install Additional Zsh Plugins

**Action:** Install useful plugins for better terminal experience

```bash
# Install zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Install zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### Apply Zsh Configuration

**Action:** Reload the shell configuration

```bash
source ~/.zshrc
```

**Details:**

- `git` plugin provides git aliases and functions
- `docker` plugin adds Docker command completion
- `kubectl` plugin provides Kubernetes command completion and aliases
- `zsh-autosuggestions` shows command suggestions based on history
- `zsh-syntax-highlighting` provides syntax highlighting for commands

## 5. K3s Installation and Configuration

### Install K3s

**Action:** Install K3s lightweight Kubernetes distribution

```bash
curl -sfL https://get.k3s.io | sh -
```

**Details:**

- K3s is a lightweight Kubernetes distribution perfect for lab environments
- Automatically installs kubectl and other necessary components
- Uses containerd as the default container runtime
- Creates a single-node cluster by default

### Configure kubectl Access

**Action:** Set up kubectl configuration for your user

```bash
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $USER:$USER ~/.kube/config
```

### Verify K3s Installation

**Action:** Test the Kubernetes cluster

```bash
kubectl get nodes
kubectl get pods -A
```

**Details:**

- The first command should show your node in "Ready" status
- The second command shows all system pods running in all namespaces
- This confirms your Kubernetes cluster is operational

### Install Helm Package Manager

**Action:** Install Helm for managing Kubernetes applications

```bash
curl https://get.helm.sh | bash
```

**Action:** Verify Helm installation

```bash
helm version
```

## 6. Rancher Installation

### Install Rancher using Helm

**Action:** Add Rancher Helm repository and install Rancher

```bash
# Add Rancher repository
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest

# Create rancher-system namespace
kubectl create namespace rancher-system

# Install cert-manager for TLS certificates
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.5.1/cert-manager.crds.yaml
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.5.1

# Install Rancher
helm install rancher rancher-latest/rancher \
  --namespace rancher-system \
  --set hostname=rancher.local \
  --set replicas=1
```

### Access Rancher UI

**Action:** Get the Rancher URL and initial password

```bash
# Check if Rancher is running
kubectl -n rancher-system get pods

# Get the initial admin password
kubectl get secret --namespace rancher-system bootstrap-secret -o go-template='{{.data.bootstrapPassword|base64decode}}{{ "\n" }}'

# Port forward to access Rancher UI
kubectl -n rancher-system port-forward svc/rancher 8080:80
```

**Details:**

- Access Rancher at `http://localhost:8080` (when port-forwarding)
- Use the bootstrap password retrieved above for initial login
- Rancher provides a web UI for managing your Kubernetes cluster

## 7. Additional Kubernetes Tools

### Install Additional kubectl Utilities

**Action:** Install useful Kubernetes tools

```bash
# Install kubectx and kubens for context switching
curl -L https://github.com/ahmetb/kubectx/releases/latest/download/kubectx -o kubectx
curl -L https://github.com/ahmetb/kubectx/releases/latest/download/kubens -o kubens
chmod +x kubectx kubens
sudo mv kubectx kubens /usr/local/bin/
```

### Install k9s Terminal UI

**Action:** Install k9s for terminal-based cluster management

```bash
curl -L https://github.com/derailed/k9s/releases/latest/download/k9s_Linux_x86_64.tar.gz | tar xz
sudo mv k9s /usr/local/bin/
```

**Details:**

- `kubectx` helps switch between different Kubernetes contexts
- `kubens` helps switch between different namespaces
- `k9s` provides a terminal-based UI for managing Kubernetes clusters

## 8. System Verification and Testing

### Verify All Installations

**Action:** Test that all tools are properly installed and configured

```bash
# Test shell
echo $SHELL

# Test text editor
nano --version

# Test directory listing
tree --version

# Test curl
curl --version

# Test git
git --version

# Test compression tools
zip -v
unzip -v

# Test Docker
docker --version
docker ps

# Test Kubernetes
kubectl version --client
kubectl get nodes

# Test additional tools
kubectx --help
kubens --help
k9s version

# Test Helm
helm version
```

## 9. Useful Aliases and Functions

### Add Kubernetes Aliases to Zsh

**Action:** Add useful aliases to your `.zshrc` file

```bash
nano ~/.zshrc
```

**Action:** Add these aliases at the end of the file:

```bash
# Kubernetes aliases
alias k='kubectl'
alias kgp='kubectl get pods'
alias kgs='kubectl get services'
alias kgn='kubectl get nodes'
alias kdp='kubectl describe pod'
alias kds='kubectl describe service'
alias kaf='kubectl apply -f'
alias kdf='kubectl delete -f'

# Docker aliases
alias d='docker'
alias dps='docker ps'
alias dpa='docker ps -a'
alias di='docker images'
alias dsp='docker system prune'

# System aliases
alias ll='ls -la'
alias la='ls -la'
alias l='ls -l'
alias ..='cd ..'
alias ...='cd ../..'
```

**Action:** Apply the changes

```bash
source ~/.zshrc
```

## 10. Troubleshooting Common Issues

### K3s Service Issues

If K3s is not starting properly:

```bash
# Check service status
sudo systemctl status k3s

# View logs
sudo journalctl -u k3s

# Restart service
sudo systemctl restart k3s
```

### Docker Permission Issues

If you get permission errors with Docker:

```bash
# Ensure user is in docker group
groups $USER

# If not in docker group, add and restart session
sudo usermod -aG docker $USER
newgrp docker
```

### kubectl Configuration Issues

If kubectl commands fail:

```bash
# Check if config file exists and has correct permissions
ls -la ~/.kube/config

# Verify cluster connectivity
kubectl cluster-info

# Check if K3s is running
sudo systemctl status k3s
```

### Zsh Plugin Issues

If Oh-My-Zsh plugins are not working:

```bash
# Verify plugin installation
ls -la ~/.oh-my-zsh/custom/plugins/

# Check .zshrc syntax
zsh -n ~/.zshrc

# Reload configuration
source ~/.zshrc
```

This setup provides a solid foundation for your OpenSUSE 15 Kubernetes lab environment with all essential tools and configurations needed for effective cluster management and development work.
