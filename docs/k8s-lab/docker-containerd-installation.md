# Docker & Containerd on OpenSUSE 15.6

The Docker repository URL I provided earlier is incorrect for OpenSUSE. Let me guide you through the proper way to install Docker on OpenSUSE 15.6.

## Install Docker from OpenSUSE Repositories (Recommended)

OpenSUSE provides Docker packages in their official repositories, which is the simplest and most reliable approach.

### Install Docker from Official OpenSUSE Repos
**Action:** Install Docker using the packages already available in your configured repositories
```bash
# Search for available Docker packages
zypper search docker

# Install Docker and related tools
sudo zypper install -y docker docker-compose containerd runc
```

### Enable and Start Docker Service
**Action:** Configure Docker to start automatically
```bash
# Enable Docker service to start at boot
sudo systemctl enable docker

# Start Docker service now
sudo systemctl start docker

# Check Docker service status
sudo systemctl status docker
```

### Add User to Docker Group
**Action:** Allow your user to run Docker without sudo
```bash
# Add current user to docker group
sudo usermod -aG docker $USER

# Apply group changes (logout/login or use newgrp)
newgrp docker
```

### Verify Docker Installation
**Action:** Test that Docker is working correctly
```bash
# Check Docker version
docker --version

# Test Docker with hello-world container
docker run hello-world

# Check Docker system information
docker system info
```

## Verify Your Docker Installation

After installation using any method, verify everything is working:

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Check containerd version
containerd --version

# Test Docker functionality
docker run --rm hello-world

# Check Docker system status
docker system df
docker system info

# List Docker images
docker images

# List running containers
docker ps
```

## Configure Docker for Production Use

### Create Docker Configuration Directory
**Action:** Set up Docker daemon configuration
```bash
sudo mkdir -p /etc/docker
```

### Configure Docker Daemon
**Action:** Create Docker daemon configuration for better performance
```bash
sudo tee /etc/docker/daemon.json << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "exec-opts": ["native.cgroupdriver=systemd"],
  "live-restore": true,
  "userland-proxy": false,
  "experimental": false
}
EOF
```

### Restart Docker with New Configuration
**Action:** Apply the new configuration
```bash
# Restart Docker service
sudo systemctl restart docker

# Verify configuration is applied
docker system info | grep -A 10 "Server:"
```

## Troubleshooting Common Issues

### If Docker Service Fails to Start
```bash
# Check Docker service logs
sudo journalctl -u docker.service

# Check Docker daemon status
sudo systemctl status docker

# Try starting Docker manually for debugging
sudo dockerd --debug
```

### If User Cannot Access Docker
```bash
# Verify user is in docker group
groups $USER

# If not in docker group, add and restart session
sudo usermod -aG docker $USER
# Then logout and login again, or use:
newgrp docker
```

### If Docker Commands Hang
```bash
# Check if Docker socket is accessible
ls -la /var/run/docker.sock

# Restart Docker service
sudo systemctl restart docker
```

This approach will give you a properly configured Docker installation that integrates well with your OpenSUSE 15.6 system and is ready for your Kubernetes lab work with K3s.