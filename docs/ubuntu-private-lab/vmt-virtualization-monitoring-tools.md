# VMT Monitoring Stack Setup Guide

## Overview

The VMT (Virtualization Monitoring Tools) setup is a comprehensive monitoring and logging solution built with Docker Compose. This stack combines Prometheus for metrics collection, Grafana for visualization, Loki for log aggregation, and several exporters to provide complete observability for containerized environments.

## Stack Components Review

### Core Monitoring Services

**Prometheus (vmt-prometheus)**

- **Objective**: Time-series database and metrics collection engine
- **Purpose**: Scrapes metrics from various targets, stores them efficiently, and provides a query interface
- **Configuration**: Configured with 30-day retention, 50GB storage limit, and optimized for high-volume queries
- **Key Features**: WAL compression enabled, lifecycle management, and custom alerting rules

**Grafana (vmt-grafana)**

- **Objective**: Visualization and dashboarding platform
- **Purpose**: Creates interactive dashboards and visualizations from Prometheus and Loki data
- **Configuration**: Pre-configured admin credentials, sign-up disabled for security
- **Integration**: Connected to both Prometheus (metrics) and Loki (logs) as data sources

**Loki (vmt-loki)**

- **Objective**: Log aggregation system inspired by Prometheus
- **Purpose**: Collects, indexes, and provides queryable access to application and system logs
- **Configuration**: 31-day retention (744h), optimized for high ingestion rates
- **Storage**: Uses filesystem storage with BoltDB for indexing

**Promtail (vmt-promtail)**

- **Objective**: Log shipping agent for Loki
- **Purpose**: Discovers, scrapes, and forwards logs from various sources to Loki
- **Scope**: Monitors Docker containers, system logs, and application-specific log files

### File Structure Setup

/data/vmt-setup/
├── .env
├── docker-compose.yml
├── loki/
│ └── loki-config.yaml
├── prometheus/
│ ├── prometheus.yml
│ └── rules/
│ └── alert_rules.yml
└── promtail/
└── promtail-config.yml

```
### Metrics Exporters

**cAdvisor (vmt-cadvisor)**
- **Objective**: Container resource usage and performance metrics
- **Purpose**: Provides detailed metrics about Docker containers including CPU, memory, network, and disk usage
- **Monitoring Scope**: All running containers on the host system

**Node Exporter (vmt-node-exporter)**
- **Objective**: System-level metrics collection
- **Purpose**: Exports hardware and OS metrics like CPU usage, memory, disk space, and network statistics
- **Configuration**: Configured to exclude virtual filesystems and focus on relevant mount points

## Network Architecture

The entire stack operates on a bridge network `vmt-network` that must be created externally, allowing for:
- Internal service communication
- Isolation from other Docker networks
- Consistent service discovery using container names

```

# Create Docker network

docker network create vmt-network

````

## Storage Configuration

**Persistent Volumes:**
- **Prometheus Data**: Bind mount to `/opt/prometheus/data` for metrics storage
- **Grafana Data**: Docker volume for dashboard configurations and user data
- **Loki Data**: Bind mount to `/opt/loki/data` for log storage

## Step-by-Step Setup Instructions

### Prerequisites

1. **System Requirements**
   - Docker and Docker Compose installed
   - Minimum 4GB RAM available for containers
   - At least 100GB free disk space for data storage
   - Root or sudo access for directory creation

2. **Create Required Directories**
   ```bash
   sudo mkdir -p /opt/prometheus/data
   sudo mkdir -p /opt/loki/data
   sudo chown -R 472:472 /opt/prometheus/data  # Prometheus user
   sudo chown -R 10001:10001 /opt/loki/data    # Loki user
````

3. **Create External Network**
   ```bash
   docker network create vmt-network
   ```

### Configuration Setup

1. **Clone or Create Project Structure**

   ```bash
   mkdir -p vmt-setup/{loki,prometheus/rules,promtail}
   cd vmt-setup
   ```

2. **Create Configuration Files**

   Copy the provided configuration files:

   - `docker-compose.yml` (main orchestration file)
   - `loki/loki-config.yaml` (Loki configuration)
   - `prometheus/prometheus.yml` (Prometheus scrape configs)
   - `prometheus/rules/alert_rules.yml` (alerting rules)
   - `promtail/promtail-config.yml` (log collection configuration)

3. Complete config files

```yml
#==============================================#
#====== VMT Monitoring file config Tree ===

.
├── docker-compose.yml
├── loki
│   └── loki-config.yaml
├── print_configs.sh
├── prometheus
│   ├── prometheus.yml
│   └── rules
│       └── alert_rules.yml
└── promtail
    └── promtail-config.yml


#==============================================#
#==============================================#
#       vmt-setup/.env
GF_SECURITY_ADMIN_USER=you-username
GF_SECURITY_ADMIN_PASSWORD=your-password
GF_USERS_ALLOW_SIGN_UP=false

#==============================================#
#==============================================#
#       vmt-setup/docker-compose.yml

services:
  vmt-prometheus:
    image: prom/prometheus:latest
    container_name: vmt-prometheus
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus/rules:/etc/prometheus/rules
      - prometheus_data:/prometheus
      - /var/run/docker.sock:/var/run/docker.sock:ro
    environment:
      - GOMAXPROCS=4
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=30d'
      - '--storage.tsdb.retention.size=50GB'
      - '--web.enable-lifecycle'
      - '--storage.tsdb.wal-compression'
      - '--query.max-samples=50000000'
    ports:
      - "9090:9090"
    networks:
      - vmt-network
    restart: unless-stopped

  vmt-grafana:
    image: grafana/grafana:latest
    container_name: vmt-grafana
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_USER=${GF_SECURITY_ADMIN_USER}
      - GF_SECURITY_ADMIN_PASSWORD=${GF_SECURITY_ADMIN_PASSWORD}
      - GF_USERS_ALLOW_SIGN_UP=${GF_USERS_ALLOW_SIGN_UP}
    ports:
      - "3005:3000"
    networks:
      - vmt-network
    depends_on:
      - vmt-prometheus
    restart: unless-stopped

  vmt-cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: vmt-cadvisor
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro
    ports:
      - "8084:8080"
    networks:
      - vmt-network
    restart: unless-stopped

  vmt-node-exporter:
    image: prom/node-exporter:latest
    container_name: vmt-node-exporter
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    ports:
      - "9100:9100"
    networks:
      - vmt-network
    restart: unless-stopped

  vmt-loki:
    image: grafana/loki:latest
    container_name: vmt-loki
    ports:
      - "3100:3100"
      - "9096:9096"
    volumes:
      - loki_data:/loki
      - ./loki/loki-config.yaml:/etc/loki/local-config.yaml
    command: -config.file=/etc/loki/local-config.yaml -config.expand-env=true
    environment:
      - GOMAXPROCS=4
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 1G
    networks:
      - vmt-network
    restart: unless-stopped

  vmt-promtail:
    image: grafana/promtail:latest
    container_name: vmt-promtail
    volumes:
      - /var/log:/var/log
      - /var/lib/docker/containers:/var/lib/docker/containers
      - ./promtail/promtail-config.yml:/etc/promtail/config.yml
      - /var/run/docker.sock:/var/run/docker.sock
    command: -config.file=/etc/promtail/config.yml
    networks:
      - vmt-network
    restart: unless-stopped

volumes:
  prometheus_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/prometheus/data
  grafana_data:
  loki_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/loki/data

networks:
  vmt-network:
    driver: bridge
    external: true

#       vmt-setup/docker-compose.yml
#______________________________________________#
#______________________________________________#
#______________________________________________#



#==============================================#
#==============================================#
#       vmt-setup/loki/loki-config.yaml:

auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  ring:
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb-shipper
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

storage_config:
  boltdb_shipper:
    active_index_directory: /loki/index
    cache_location: /loki/cache
  filesystem:
    directory: /loki/chunks

limits_config:
  retention_period: 744h
  reject_old_samples: true
  reject_old_samples_max_age: 168h
  ingestion_rate_mb: 32
  ingestion_burst_size_mb: 64
  max_global_streams_per_user: 5000
  max_query_parallelism: 32
  allow_structured_metadata: false

query_range:
  align_queries_with_step: true
  max_retries: 5
  cache_results: true

frontend:
  compress_responses: true
  log_queries_longer_than: 10s
  max_outstanding_per_tenant: 2048

compactor:
  working_directory: /loki/compactor
  delete_request_store: filesystem
  compaction_interval: 10m
  retention_enabled: true
  retention_delete_delay: 2h
  retention_delete_worker_count: 150

ruler:
  storage:
    type: local
    local:
      directory: /loki/rules


#       vmt-setup/loki/loki-config.yaml:
#______________________________________________#
#______________________________________________#
#______________________________________________#




#==============================================#
#==============================================#
#  vmt-setup/ prometheus/prometheus.yml

global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # alertmanager:9093
rule_files:
  - "/etc/prometheus/rules/alert_rules.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node_exporter'
    static_configs:
      - targets: ['vmt-node-exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['vmt-cadvisor:8080']

  - job_name: 'portainer'
    static_configs:
      - targets: ['portainer-server:9000']

  - job_name: 'nginx-proxy-manager'
    static_configs:
      - targets: ['nginx-proxy-manager:81']

  - job_name: 'searxng'
    static_configs:
      - targets: ['searxng-b08k0wg80w0cw4wkkcwkcs4s:8080']

  - job_name: 'coolify'
    static_configs:
      - targets: ['coolify:8080']

  - job_name: 'coolify-db'
    static_configs:
      - targets: ['coolify-db:5432']

  - job_name: 'coolify-redis'
    static_configs:
      - targets: ['coolify-redis:6379']

  - job_name: 'mariadb'
    static_configs:
      - targets: ['maria-db-server-kgws4w40k48ogswo80gsoos0:3306']

  - job_name: 'wordpress'
    static_configs:
      - targets: [
          'wp-logisoft-kgws4w40k48ogswo80gsoos0:80',
          'wp-win-assist-kgws4w40k48ogswo80gsoos0:80'
        ]

  - job_name: 'homarr'
    static_configs:
      - targets: ['homarr:7575']

  - job_name: 'trilium'
    static_configs:
      - targets: ['trilium-skk04sk0wgo4cg4gs8ggow4c:8080']

  - job_name: 'n8n'
    static_configs:
      - targets: ['n8n-xswk04ckw0c80scws4gk0wc4:5678']

  - job_name: 'open-webui'
    static_configs:
      - targets: ['open-webui-psswwcsw8sk8ws8s844os08o:8080']

  - job_name: 'mcpo'
    static_configs:
      - targets: ['mcpo-fwos0wk8ok0okocok4o0gswc:8083']

  - job_name: 'loki'
    static_configs:
      - targets: ['vmt-loki:3100']  # Updated

  - job_name: 'docker'
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 15s
    relabel_configs:
      - source_labels: [__meta_docker_container_name]
        regex: '/(.*)'
        target_label: container_name
        replacement: '$1'
      - source_labels: [__meta_docker_container_label_com_docker_compose_service]
        target_label: service_name

#  vmt-setup/ prometheus/prometheus.yml
#______________________________________________#
#______________________________________________#
#______________________________________________#


#==============================================#
#==============================================#
#  vmt-setup/prometheus/rules/alert_rules.yml


groups:
  - name: storage_alerts
    rules:
    - alert: PrometheusStorageAlmostFull
      expr: (prometheus_tsdb_storage_blocks_bytes / prometheus_tsdb_storage_blocks_bytes_total) * 100 > 85
      for: 10m
      labels:
        severity: warning
      annotations:
        description: "Prometheus storage is {{ $value }}% full"

    - alert: LokiStorageAlmostFull
      expr: (node_filesystem_size_bytes{mountpoint="/loki"} - node_filesystem_free_bytes{mountpoint="/loki"}) / node_filesystem_size_bytes{mountpoint="/loki"} * 100 > 85
      for: 10m
      labels:
        severity: warning
      annotations:
        description: "Loki storage is {{ $value }}% full"


#  vmt-setup/prometheus/rules/alert_rules.yml
#______________________________________________#
#______________________________________________#
#______________________________________________#


#==============================================#
#==============================================#
#   vmt-setup/promtail/promtail-config.yml

server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
        filters:
          - name: label
            values: ["logging=promtail"]
    relabel_configs:
      - source_labels: ['__meta_docker_container_name']
        regex: '/(.*)'
        target_label: 'container'
        replacement: '$1'
      - source_labels: ['__meta_docker_container_label_com_docker_compose_service']
        target_label: 'service'
      - source_labels: ['__meta_docker_container_label_com_docker_compose_project']
        target_label: 'project'

  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: syslog
          __path__: /var/log/*.log

  - job_name: containers
    static_configs:
      - targets:
          - localhost
        labels:
          job: containers
          __path__: /var/lib/docker/containers/*/*.log
    pipeline_stages:
      - json:
          expressions:
            timestamp: time
            level: level
            message: msg
            caller: caller
      - timestamp:
          source: timestamp
          format: RFC3339Nano
      - labels:
          level:
      - output:
          source: message

  - job_name: nginx-proxy-manager
    static_configs:
      - targets:
          - localhost
        labels:
          job: nginx
          service: proxy-manager
          __path__: /var/log/nginx-proxy-manager/*.log

  - job_name: wordpress
    static_configs:
      - targets:
          - localhost
        labels:
          job: wordpress
          __path__: /var/log/wordpress/*.log

  - job_name: mariadb
    static_configs:
      - targets:
          - localhost
        labels:
          job: mariadb
          service: database
          __path__: /var/log/mysql/*.log

  - job_name: coolify
    static_configs:
      - targets:
          - localhost
        labels:
          job: coolify
          __path__: /var/log/coolify/*.log

  - job_name: portainer
    static_configs:
      - targets:
          - localhost
        labels:
          job: portainer
          __path__: /var/log/portainer/*.log

  - job_name: custom_apps
    static_configs:
      - targets:
          - localhost
        labels:
          job: apps
          __path__: /var/log/apps/*.log



#   vmt-setup/promtail/promtail-config.yml
#______________________________________________#
#______________________________________________#
#______________________________________________#

```

3. **Security Configuration**

   **Important**: Change the default Grafana password in `docker-compose.yml`:

   ```yaml
   environment:
     - GF_SECURITY_ADMIN_USER=your-admin-email
     - GF_SECURITY_ADMIN_PASSWORD=your-secure-password
   ```

4. **Customize Scrape Targets**

   Edit `prometheus/prometheus.yml` to match your actual container names and services:

   ```yaml
   scrape_configs:
     - job_name: "your-application"
       static_configs:
         - targets: ["your-container-name:port"]
   ```

### Deployment Instructions

1. **Validate Configuration**

   ```bash
   docker-compose config
   ```

2. **Start the Stack**

   ```bash
   docker-compose up -d
   ```

3. **Verify Services**

   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

4. **Check Service Health**
   - Prometheus: `http://your-host:9090`
   - Grafana: `http://your-host:3005`
   - cAdvisor: `http://your-host:8084`
   - Node Exporter: `http://your-host:9100`
   - Loki: `http://your-host:3100`

### Initial Configuration

1. **Grafana Setup**

   - Access Grafana at `http://your-host:3005`
   - Login with configured credentials
   - Add Prometheus data source: `http://vmt-prometheus:9090`
   - Add Loki data source: `http://vmt-loki:3100`
   - Import or create dashboards for your metrics

2. **Prometheus Verification**
   - Access Prometheus at `http://your-host:9090`
   - Check targets in Status → Targets
   - Verify metrics are being collected
   - Test alert rules in Alerts section

## Maintenance Instructions

### Regular Maintenance Tasks

1. **Monitor Storage Usage**

   ```bash
   # Check Prometheus storage
   du -sh /opt/prometheus/data

   # Check Loki storage
   du -sh /opt/loki/data

   # Monitor container resource usage
   docker stats
   ```

2. **Log Rotation and Cleanup**

   ```bash
   # View container logs
   docker-compose logs --tail=100 service-name

   # Clean up old Docker logs
   docker system prune -f
   ```

3. **Backup Configuration**

   ```bash
   # Backup entire configuration
   tar -czf vmt-setup-backup-$(date +%Y%m%d).tar.gz vmt-setup/

   # Backup Grafana dashboards
   docker exec vmt-grafana grafana-cli admin export-dashboard
   ```

### Updating the Stack

1. **Update Container Images**

   ```bash
   docker-compose pull
   docker-compose up -d
   ```

2. **Configuration Updates**

   ```bash
   # After modifying configuration files
   docker-compose down
   docker-compose up -d
   ```

3. **Scaling Services**
   ```bash
   # Increase Prometheus resources if needed
   docker-compose up -d --scale vmt-prometheus=1
   ```

### Troubleshooting

1. **Service Discovery Issues**

   - Verify network connectivity: `docker network ls`
   - Check container names: `docker ps --format "table {{.Names}}"`
   - Test internal connectivity: `docker exec vmt-prometheus nslookup vmt-loki`

2. **Storage Issues**

   - Check disk space: `df -h`
   - Verify permissions: `ls -la /opt/prometheus/data /opt/loki/data`
   - Monitor retention policies in Prometheus and Loki configs

3. **Performance Optimization**
   - Adjust `GOMAXPROCS` based on CPU cores
   - Modify retention periods based on storage capacity
   - Tune scrape intervals for high-cardinality metrics

### Monitoring Best Practices

1. **Alert Configuration**

   - Set up notification channels in Grafana
   - Configure Prometheus Alertmanager for critical alerts
   - Monitor storage usage alerts already configured

2. **Dashboard Creation**

   - Create dashboards for business metrics
   - Set up log analysis dashboards in Grafana
   - Monitor container and host resource utilization

3. **Security Considerations**
   - Regularly update container images
   - Use strong passwords and consider OAuth integration
   - Restrict network access to monitoring ports
   - Enable HTTPS with reverse proxy if internet-facing

This comprehensive monitoring stack provides enterprise-grade observability for containerized environments with proper configuration, deployment, and maintenance procedures.

---

**[Up: Introduction](./get-started-with-a-new-linux-vps.md)** | **[Previous: Deploying Coolify](./get-started-with-a-new-linux-vps.md)** | **[Next: (Back to Introduction)](./get-started-with-a-new-linux-vps.md)**
