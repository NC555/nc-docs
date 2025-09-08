# K3s Configuration Organization for Production-Ready Practices

This guide provides a comprehensive approach to organizing your K3s configuration using GitOps principles and industry best practices that will scale from lab to production environments.

## 1. Directory Structure and Organization

### Recommended Project Structure
**Action:** Create a standardized directory structure for your Kubernetes configurations
```bash
mkdir -p ~/k8s-lab
cd ~/k8s-lab

# Create the main directory structure
mkdir -p {clusters,apps,infrastructure,tools,scripts}
mkdir -p clusters/{dev,staging,prod}
mkdir -p apps/{base,overlays}
mkdir -p apps/overlays/{dev,staging,prod}
mkdir -p infrastructure/{monitoring,logging,ingress,storage,security}
mkdir -p tools/{helm-charts,operators}
mkdir -p scripts/{backup,maintenance,deployment}

# Create documentation structure
mkdir -p docs/{runbooks,architecture,troubleshooting}
```

**Resulting Structure:**
```
k8s-lab/
├── clusters/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── apps/
│   ├── base/
│   └── overlays/
│       ├── dev/
│       ├── staging/
│       └── prod/
├── infrastructure/
│   ├── monitoring/
│   ├── logging/
│   ├── ingress/
│   ├── storage/
│   └── security/
├── tools/
│   ├── helm-charts/
│   └── operators/
├── scripts/
│   ├── backup/
│   ├── maintenance/
│   └── deployment/
└── docs/
    ├── runbooks/
    ├── architecture/
    └── troubleshooting/
```

### Initialize Git Repository
**Action:** Initialize version control for configuration management
```bash
cd ~/k8s-lab
git init
echo "# Kubernetes Lab Configuration" > README.md

# Create initial .gitignore
cat > .gitignore << 'EOF'
# Sensitive files
**/secrets.yaml
**/secret-*.yaml
**/.env
**/kubeconfig
**/*.key
**/*.crt

# Temporary files
**/.DS_Store
**/Thumbs.db
**/*.tmp
**/*.swp
**/*.bak

# Tool-specific
.vscode/
.idea/
**/.terraform/
**/terraform.tfstate*
**/helm-dependencies/
**/charts/*.tgz
EOF

git add .
git commit -m "Initial repository structure"
```

## 2. Environment Configuration Management

### Create Environment-Specific Configurations
**Action:** Set up configuration management for different environments

#### Development Environment Configuration
```bash
# Create development cluster configuration
cat > clusters/dev/cluster-config.yaml << 'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-config
  namespace: kube-system
data:
  environment: "dev"
  cluster-name: "k3s-dev"
  log-level: "debug"
  resource-limits: "relaxed"
  backup-schedule: "0 2 * * *"
  monitoring-retention: "7d"
EOF

# Create development namespace configuration
cat > clusters/dev/namespaces.yaml << 'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: dev-apps
  labels:
    environment: dev
    managed-by: k3s-lab
---
apiVersion: v1
kind: Namespace
metadata:
  name: dev-monitoring
  labels:
    environment: dev
    managed-by: k3s-lab
---
apiVersion: v1
kind: Namespace
metadata:
  name: dev-ingress
  labels:
    environment: dev
    managed-by: k3s-lab
EOF
```

#### Production-Ready Configuration Template
```bash
# Create production cluster configuration template
cat > clusters/prod/cluster-config.yaml << 'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-config
  namespace: kube-system
data:
  environment: "prod"
  cluster-name: "k3s-prod"
  log-level: "info"
  resource-limits: "strict"
  backup-schedule: "0 1,13 * * *"
  monitoring-retention: "30d"
  high-availability: "true"
  security-policies: "enforced"
EOF

# Create production namespace configuration
cat > clusters/prod/namespaces.yaml << 'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    environment: prod
    managed-by: k3s-lab
    security.istio.io/tlsMode: istio
---
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring
  labels:
    environment: prod
    managed-by: k3s-lab
---
apiVersion: v1
kind: Namespace
metadata:
  name: ingress-system
  labels:
    environment: prod
    managed-by: k3s-lab
EOF
```

## 3. Kustomize Integration for Configuration Management

### Install Kustomize
**Action:** Install Kustomize for advanced configuration management
```bash
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash
sudo mv kustomize /usr/local/bin/
```

### Create Base Application Templates
**Action:** Set up base configurations that can be customized per environment

#### Create Base Application Configuration
```bash
# Create base application structure
mkdir -p apps/base/sample-app

cat > apps/base/sample-app/deployment.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sample-app
  labels:
    app: sample-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: sample-app
  template:
    metadata:
      labels:
        app: sample-app
    spec:
      containers:
      - name: app
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "100m"
        env:
        - name: ENVIRONMENT
          value: "base"
EOF

cat > apps/base/sample-app/service.yaml << 'EOF'
apiVersion: v1
kind: Service
metadata:
  name: sample-app-service
spec:
  selector:
    app: sample-app
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
EOF

cat > apps/base/sample-app/kustomization.yaml << 'EOF'
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- deployment.yaml
- service.yaml

commonLabels:
  managed-by: kustomize
  
images:
- name: nginx
  newTag: "1.21"
EOF
```

#### Create Environment-Specific Overlays
```bash
# Development overlay
mkdir -p apps/overlays/dev/sample-app
cat > apps/overlays/dev/sample-app/kustomization.yaml << 'EOF'
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: dev-apps

resources:
- ../../../base/sample-app

patchesStrategicMerge:
- deployment-patch.yaml

commonLabels:
  environment: dev

images:
- name: nginx
  newTag: "1.21-alpine"
EOF

cat > apps/overlays/dev/sample-app/deployment-patch.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sample-app
spec:
  replicas: 1
  template:
    spec:
      containers:
      - name: app
        env:
        - name: ENVIRONMENT
          value: "development"
        - name: DEBUG
          value: "true"
        resources:
          requests:
            memory: "32Mi"
            cpu: "25m"
          limits:
            memory: "64Mi"
            cpu: "50m"
EOF

# Production overlay
mkdir -p apps/overlays/prod/sample-app
cat > apps/overlays/prod/sample-app/kustomization.yaml << 'EOF'
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: production

resources:
- ../../../base/sample-app

patchesStrategicMerge:
- deployment-patch.yaml

commonLabels:
  environment: prod

images:
- name: nginx
  newTag: "1.21"
EOF

cat > apps/overlays/prod/sample-app/deployment-patch.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sample-app
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        env:
        - name: ENVIRONMENT
          value: "production"
        - name: LOG_LEVEL
          value: "info"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - sample-app
              topologyKey: kubernetes.io/hostname
EOF
```

## 4. Helm Chart Organization

### Create Helm Chart Structure
**Action:** Organize Helm charts for complex applications

```bash
# Create Helm chart directory structure
mkdir -p tools/helm-charts/custom-apps

# Create a sample chart
helm create tools/helm-charts/custom-apps/web-application

# Create values files for different environments
cat > tools/helm-charts/custom-apps/web-application/values-dev.yaml << 'EOF'
replicaCount: 1

image:
  repository: nginx
  tag: "1.21-alpine"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 50m
    memory: 64Mi

nodeSelector: {}
tolerations: []
affinity: {}

environment: development
debug: true
EOF

cat > tools/helm-charts/custom-apps/web-application/values-prod.yaml << 'EOF'
replicaCount: 3

image:
  repository: nginx
  tag: "1.21"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: app.yourdomain.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: app-tls
      hosts:
        - app.yourdomain.com

resources:
  limits:
    cpu: 200m
    memory: 256Mi
  requests:
    cpu: 100m
    memory: 128Mi

nodeSelector: {}
tolerations: []
affinity:
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
      podAffinityTerm:
        labelSelector:
          matchExpressions:
          - key: app.kubernetes.io/name
            operator: In
            values:
            - web-application
        topologyKey: kubernetes.io/hostname

environment: production
debug: false
EOF
```

## 5. Infrastructure as Code Organization

### Monitoring Stack Configuration
**Action:** Create monitoring infrastructure configurations

```bash
# Create monitoring stack using Prometheus and Grafana
cat > infrastructure/monitoring/prometheus-values.yaml << 'EOF'
prometheus:
  prometheusSpec:
    retention: 30d
    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: local-path
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 10Gi
    resources:
      limits:
        cpu: 500m
        memory: 2Gi
      requests:
        cpu: 200m
        memory: 1Gi

grafana:
  persistence:
    enabled: true
    storageClassName: local-path
    size: 5Gi
  adminPassword: admin123
  sidecar:
    dashboards:
      enabled: true
      searchNamespace: ALL
  resources:
    limits:
      cpu: 200m
      memory: 512Mi
    requests:
      cpu: 100m
      memory: 256Mi

alertmanager:
  alertmanagerSpec:
    retention: 120h
    storage:
      volumeClaimTemplate:
        spec:
          storageClassName: local-path
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 2Gi
EOF

cat > infrastructure/monitoring/install-monitoring.sh << 'EOF'
#!/bin/bash
set -e

echo "Installing Prometheus Operator..."
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -

helm upgrade --install prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --values prometheus-values.yaml \
  --wait

echo "Monitoring stack installed successfully!"
echo "Access Grafana at: kubectl port-forward -n monitoring svc/prometheus-stack-grafana 3000:80"
echo "Default credentials: admin/admin123"
EOF

chmod +x infrastructure/monitoring/install-monitoring.sh
```

### Ingress Controller Configuration
**Action:** Set up ingress controller for production-ready traffic management

```bash
# Create ingress configuration
cat > infrastructure/ingress/nginx-ingress-values.yaml << 'EOF'
controller:
  replicaCount: 2
  
  service:
    type: LoadBalancer
    
  resources:
    limits:
      cpu: 200m
      memory: 256Mi
    requests:
      cpu: 100m
      memory: 128Mi
      
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchLabels:
              app.kubernetes.io/name: ingress-nginx
              app.kubernetes.io/component: controller
          topologyKey: kubernetes.io/hostname
          
  config:
    use-forwarded-headers: "true"
    compute-full-forwarded-for: "true"
    
  metrics:
    enabled: true
    serviceMonitor:
      enabled: true
EOF

cat > infrastructure/ingress/install-ingress.sh << 'EOF'
#!/bin/bash
set -e

echo "Installing NGINX Ingress Controller..."
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

kubectl create namespace ingress-nginx --dry-run=client -o yaml | kubectl apply -f -

helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --values nginx-ingress-values.yaml \
  --wait

echo "NGINX Ingress Controller installed successfully!"
echo "Check status: kubectl get pods -n ingress-nginx"
EOF

chmod +x infrastructure/ingress/install-ingress.sh
```

## 6. Deployment Scripts and Automation

### Create Deployment Scripts
**Action:** Develop automation scripts for consistent deployments

```bash
# Create main deployment script
cat > scripts/deployment/deploy.sh << 'EOF'
#!/bin/bash
set -e

ENVIRONMENT=${1:-dev}
APPLICATION=${2:-""}
DRY_RUN=${3:-false}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

validate_environment() {
    case $ENVIRONMENT in
        dev|staging|prod)
            print_info "Deploying to environment: $ENVIRONMENT"
            ;;
        *)
            print_error "Invalid environment: $ENVIRONMENT"
            print_error "Valid environments: dev, staging, prod"
            exit 1
            ;;
    esac
}

deploy_infrastructure() {
    print_info "Deploying infrastructure components..."
    
    # Deploy namespaces
    kubectl apply -f "$ROOT_DIR/clusters/$ENVIRONMENT/namespaces.yaml"
    
    # Deploy cluster configuration
    kubectl apply -f "$ROOT_DIR/clusters/$ENVIRONMENT/cluster-config.yaml"
}

deploy_application() {
    local app_name=$1
    local app_path="$ROOT_DIR/apps/overlays/$ENVIRONMENT/$app_name"
    
    if [ ! -d "$app_path" ]; then
        print_error "Application overlay not found: $app_path"
        return 1
    fi
    
    print_info "Deploying application: $app_name to $ENVIRONMENT"
    
    if [ "$DRY_RUN" = "true" ]; then
        print_warning "DRY RUN MODE - No changes will be applied"
        kustomize build "$app_path"
    else
        kustomize build "$app_path" | kubectl apply -f -
        
        # Wait for deployment to be ready
        deployment_name=$(kustomize build "$app_path" | grep "kind: Deployment" -A 5 | grep "name:" | awk '{print $2}' | head -1)
        if [ ! -z "$deployment_name" ]; then
            namespace=$(kustomize build "$app_path" | grep "namespace:" | awk '{print $2}' | head -1)
            print_info "Waiting for deployment $deployment_name to be ready..."
            kubectl rollout status deployment/$deployment_name -n $namespace --timeout=300s
        fi
    fi
}

deploy_helm_chart() {
    local chart_name=$1
    local chart_path="$ROOT_DIR/tools/helm-charts/custom-apps/$chart_name"
    local values_file="$chart_path/values-$ENVIRONMENT.yaml"
    
    if [ ! -f "$values_file" ]; then
        print_error "Values file not found: $values_file"
        return 1
    fi
    
    print_info "Deploying Helm chart: $chart_name to $ENVIRONMENT"
    
    if [ "$DRY_RUN" = "true" ]; then
        print_warning "DRY RUN MODE - No changes will be applied"
        helm template "$chart_name" "$chart_path" -f "$values_file"
    else
        helm upgrade --install "$chart_name-$ENVIRONMENT" "$chart_path" \
            -f "$values_file" \
            --namespace "${ENVIRONMENT}-apps" \
            --create-namespace \
            --wait
    fi
}

main() {
    validate_environment
    
    # Change to project root directory
    cd "$ROOT_DIR"
    
    # Deploy infrastructure first
    deploy_infrastructure
    
    # Deploy specific application if provided
    if [ ! -z "$APPLICATION" ]; then
        if [ -d "$ROOT_DIR/apps/overlays/$ENVIRONMENT/$APPLICATION" ]; then
            deploy_application "$APPLICATION"
        elif [ -d "$ROOT_DIR/tools/helm-charts/custom-apps/$APPLICATION" ]; then
            deploy_helm_chart "$APPLICATION"
        else
            print_error "Application not found: $APPLICATION"
            exit 1
        fi
    else
        print_info "No specific application provided. Deploy infrastructure only."
        print_info "To deploy an application, use: $0 $ENVIRONMENT <app-name>"
    fi
    
    print_info "Deployment completed successfully!"
}

# Show help
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    echo "Usage: $0 <environment> [application] [dry-run]"
    echo ""
    echo "Parameters:"
    echo "  environment  - Target environment (dev, staging, prod)"
    echo "  application  - Optional: specific application to deploy"
    echo "  dry-run      - Optional: set to 'true' for dry run mode"
    echo ""
    echo "Examples:"
    echo "  $0 dev                    # Deploy infrastructure to dev"
    echo "  $0 dev sample-app         # Deploy sample-app to dev"
    echo "  $0 prod web-application   # Deploy web-application to prod"
    echo "  $0 dev sample-app true    # Dry run sample-app deployment"
    exit 0
fi

main
EOF

chmod +x scripts/deployment/deploy.sh
```

### Create Backup and Maintenance Scripts
**Action:** Set up automated backup and maintenance procedures

```bash
# Create backup script
cat > scripts/backup/backup-cluster.sh << 'EOF'
#!/bin/bash
set -e

BACKUP_DIR="/var/backups/k3s"
DATE=$(date +%Y%m%d_%H%M%S)
ENVIRONMENT=${1:-dev}

print_info() {
    echo "[INFO] $1"
}

create_backup_directory() {
    sudo mkdir -p "$BACKUP_DIR/$ENVIRONMENT/$DATE"
    print_info "Created backup directory: $BACKUP_DIR/$ENVIRONMENT/$DATE"
}

backup_etcd() {
    print_info "Backing up etcd data..."
    sudo cp -r /var/lib/rancher/k3s/server/db "$BACKUP_DIR/$ENVIRONMENT/$DATE/"
}

backup_configs() {
    print_info "Backing up configurations..."
    
    # Backup all configmaps
    kubectl get configmaps --all-namespaces -o yaml > "$BACKUP_DIR/$ENVIRONMENT/$DATE/configmaps.yaml"
    
    # Backup all secrets (excluding service account tokens)
    kubectl get secrets --all-namespaces -o yaml | \
        grep -v "kubernetes.io/service-account-token" > "$BACKUP_DIR/$ENVIRONMENT/$DATE/secrets.yaml"
    
    # Backup persistent volume claims
    kubectl get pvc --all-namespaces -o yaml > "$BACKUP_DIR/$ENVIRONMENT/$DATE/pvcs.yaml"
    
    # Backup custom resources
    kubectl get crd -o yaml > "$BACKUP_DIR/$ENVIRONMENT/$DATE/crds.yaml"
}

cleanup_old_backups() {
    print_info "Cleaning up backups older than 7 days..."
    find "$BACKUP_DIR/$ENVIRONMENT" -name "*" -type d -mtime +7 -exec rm -rf {} + 2>/dev/null || true
}

main() {
    print_info "Starting backup for environment: $ENVIRONMENT"
    
    create_backup_directory
    backup_etcd
    backup_configs
    cleanup_old_backups
    
    print_info "Backup completed successfully!"
    print_info "Backup location: $BACKUP_DIR/$ENVIRONMENT/$DATE"
}

main
EOF

chmod +x scripts/backup/backup-cluster.sh

# Create maintenance script
cat > scripts/maintenance/cluster-health-check.sh << 'EOF'
#!/bin/bash
set -e

print_info() {
    echo -e "\033[0;32m[INFO]\033[0m $1"
}

print_warning() {
    echo -e "\033[1;33m[WARN]\033[0m $1"
}

print_error() {
    echo -e "\033[0;31m[ERROR]\033[0m $1"
}

check_node_status() {
    print_info "Checking node status..."
    kubectl get nodes
    
    NOT_READY=$(kubectl get nodes --no-headers | grep -c "NotReady" || true)
    if [ "$NOT_READY" -gt 0 ]; then
        print_error "Found $NOT_READY nodes in NotReady state"
        return 1
    fi
    
    print_info "All nodes are Ready"
}

check_pod_status() {
    print_info "Checking pod status..."
    
    # Check for pods in system namespaces
    FAILED_PODS=$(kubectl get pods --all-namespaces --no-headers | grep -E "(Error|CrashLoopBackOff|ImagePullBackOff)" | wc -l)
    
    if [ "$FAILED_PODS" -gt 0 ]; then
        print_warning "Found $FAILED_PODS pods in failed state:"
        kubectl get pods --all-namespaces | grep -E "(Error|CrashLoopBackOff|ImagePullBackOff)"
    else
        print_info "All pods are running normally"
    fi
}

check_resource_usage() {
    print_info "Checking resource usage..."
    kubectl top nodes 2>/dev/null || print_warning "Metrics server not available"
    kubectl top pods --all-namespaces 2>/dev/null || print_warning "Pod metrics not available"
}

check_persistent_volumes() {
    print_info "Checking persistent volumes..."
    kubectl get pv
    kubectl get pvc --all-namespaces
}

check_ingress_status() {
    print_info "Checking ingress status..."
    kubectl get ingress --all-namespaces
}

main() {
    print_info "Starting cluster health check..."
    
    check_node_status
    check_pod_status
    check_resource_usage
    check_persistent_volumes
    check_ingress_status
    
    print_info "Health check completed!"
}

main
EOF

chmod +x scripts/maintenance/cluster-health-check.sh
```

## 7. GitOps Workflow Setup

### Create GitOps Documentation
**Action:** Document GitOps practices and workflows

```bash
cat > docs/architecture/gitops-workflow.md << 'EOF'
# GitOps Workflow for K3s Lab

## Overview
This document outlines the GitOps workflow used for managing Kubernetes configurations across different environments.

## Workflow Process

### 1. Development Workflow
1. Create feature branch: `git checkout -b feature/new-application`
2. Develop and test changes locally
3. Apply changes to dev environment: `./scripts/deployment/deploy.sh dev new-application true`
4. Commit changes: `git commit -m "Add new application configuration"`
5. Push branch: `git push origin feature/new-application`
6. Create pull request for review

### 2. Environment Promotion
1. **Development → Staging**
   - Merge feature branch to `develop` branch
   - Automated deployment to staging environment
   - Run integration tests

2. **Staging → Production**
   - Merge `develop` to `main` branch
   - Manual approval required for production deployment
   - Deploy using: `./scripts/deployment/deploy.sh prod application-name`

### 3. Configuration Management Rules
- All changes must be version controlled
- Environment-specific configurations use overlays or values files
- Secrets are never committed to repository
- Use external secret management (sealed-secrets, external-secrets-operator)

### 4. Rollback Procedures
- Use Git revert for configuration rollbacks
- Helm rollback for application rollbacks: `helm rollback release-name revision`
- Document rollback procedures in runbooks

## Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch for staging
- `feature/*`: Feature development branches
- `hotfix/*`: Emergency production fixes

## Security Considerations
- Use RBAC for environment access
- Implement admission controllers
- Regular security scanning of images
- Network policies for micro-segmentation
EOF

# Create operational runbooks
cat > docs/runbooks/deployment-runbook.md << 'EOF'
# Deployment Runbook

## Pre-deployment Checklist
- [ ] Code reviewed and approved
- [ ] Tests passing in CI/CD
- [ ] Resource requirements validated
- [ ] Backup completed
- [ ] Rollback plan prepared

## Deployment Steps
1. Verify cluster health: `./scripts/maintenance/cluster-health-check.sh`
2. Create backup: `./scripts/backup/backup-cluster.sh prod`
3. Deploy application: `./scripts/deployment/deploy.sh prod app-name`
4. Verify deployment: `kubectl get pods -n production`
5. Run smoke tests
6. Update monitoring dashboards

## Post-deployment
- [ ] Application responding correctly
- [ ] Metrics and logs flowing
- [ ] Alerts configured
- [ ] Documentation updated

## Rollback Procedure
1. Identify issue and decision to rollback
2. Execute rollback: `helm rollback app-name-prod previous-version`
3. Verify rollback successful
4. Investigate root cause
5. Plan remediation
EOF
```

## 8. Validation and Testing

### Test the Complete Setup
**Action:** Validate that all configurations work together

```bash
# Apply development environment
kubectl apply -f clusters/dev/namespaces.yaml
kubectl apply -f clusters/dev/cluster-config.yaml

# Test Kustomize deployment
kustomize build apps/overlays/dev/sample-app | kubectl apply -f -

# Verify deployment
kubectl get pods -n dev-apps
kubectl get services -n dev-apps

# Test deployment script
./scripts/deployment/deploy.sh dev sample-app true

# Run health check
./scripts/maintenance/cluster-health-check.sh

# Test backup script
sudo ./scripts/backup/backup-cluster.sh dev
```

This comprehensive organization provides a production-ready foundation that scales from your K3s lab to enterprise Kubernetes deployments. The structure supports GitOps principles, environment consistency, and operational best practices that are essential for production environments.