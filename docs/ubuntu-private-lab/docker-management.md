# Docker Tutorial

## Table of Contents

1. [[#Docker Basics]]
2. [[#Docker Images]]
3. [[#Docker Containers]]
4. [[#Docker Volumes]]
5. [[#Docker Networks]]
6. [[#Docker Compose]]
7. [[#Logging and Debugging]]
8. [[#Cleanup and Maintenance]]
9. [[#Best Practices]]

## Docker Basics

### Installation

```bash
# Ubuntu
sudo apt update
sudo apt install docker.io

# CentOS
sudo yum install docker

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

### Basic Commands

```bash
# Check Docker version
docker --version

# Check Docker info
docker info

# Check Docker system status
docker system df
```

## Docker Images

### Managing Images

```bash
# List images
docker images

# Pull an image
docker pull ubuntu:latest

# Build an image from Dockerfile
docker build -t myapp:1.0 .

# Remove image
docker rmi image_name

# Remove dangling images
docker image prune

# Remove all unused images
docker image prune -a
```

### Sample Dockerfile

```dockerfile
FROM ubuntu:latest
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y python3
CMD ["python3", "app.py"]
```

## Docker Containers

### Container Management

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Start container
docker start container_name

# Stop container
docker stop container_name

# Remove container
docker rm container_name

# Run container
docker run -d --name myapp -p 8080:80 nginx

# Execute command in container
docker exec -it container_name bash
```

### Container Stats and Inspection

```bash
# View container stats
docker stats

# Inspect container
docker inspect container_name

# View container processes
docker top container_name
```

## Docker Volumes

### Volume Management

```bash
# Create volume
docker volume create myvolume

# List volumes
docker volume ls

# Inspect volume
docker volume inspect myvolume

# Remove volume
docker volume rm myvolume

# Remove all unused volumes
docker volume prune
```

### Using Volumes

```bash
# Run container with volume
docker run -d \
  --name myapp \
  -v myvolume:/app/data \
  nginx

# Using bind mounts
docker run -d \
  --name myapp \
  -v $(pwd):/app \
  nginx
```

## Docker Networks

### Network Management

```bash
# List networks
docker network ls

# Create network
docker network create mynetwork

# Connect container to network
docker network connect mynetwork container_name

# Disconnect container from network
docker network disconnect mynetwork container_name

# Remove network
docker network rm mynetwork

# Inspect network
docker network inspect mynetwork

```

## Docker Compose

### Basic docker-compose.yml

```yaml
version: "3"
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
    networks:
      - mynetwork

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - mynetwork

volumes:
  db_data:

networks:
  mynetwork:
```

### Compose Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs web

# Scale service
docker-compose up -d --scale web=3

# Remove volumes
docker-compose down -v

# List containers
docker-compose ps

# Execute command in service
docker-compose exec web bash
```

## Logging and Debugging

### Container Logs

```bash
# View container logs
docker logs container_name

# Follow log output
docker logs -f container_name

# Show last n lines
docker logs --tail 100 container_name

# Show logs since timestamp
docker logs --since 2023-01-01T00:00:00 container_name
```

### Debugging

```bash
# Check container events
docker events

# View container resource usage
docker stats

# Debug container networking
docker network inspect bridge

# Check container processes
docker top container_name

# Export container filesystem
docker export container_name > container.tar
```

## Cleanup and Maintenance

### System Cleanup

```bash
# Remove all stopped containers
docker container prune

# Remove unused networks
docker network prune

# Remove unused volumes
docker volume prune

# Remove unused images
docker image prune

# Remove everything unused
docker system prune -a --volumes

# Clean up Docker daemon
docker system prune
```

### System Monitoring

```bash
# View system-wide information
docker system df

# View detailed system info
docker system info

# Monitor events
docker system events
```

## Best Practices

### Security

```bash
# Run containers with limited privileges
docker run --user 1000:1000 nginx

# Use security options
docker run --security-opt no-new-privileges nginx

# Scan images for vulnerabilities
docker scan myapp:1.0
```

### Performance

```bash
# Limit container resources
docker run \
  --memory="512m" \
  --cpus="1.5" \
  nginx

# Use multi-stage builds
FROM node:14 AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

### Docker Compose Environment Variables

```bash
# Create .env file
DB_PASSWORD=secret
NGINX_PORT=8080

# Reference in docker-compose.yml
version: '3'
services:
  db:
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
  web:
    ports:
      - "${NGINX_PORT}:80"
```

Would you like me to explain or break down any specific part of this tutorial in more detail?
