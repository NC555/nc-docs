# Kube-Hetzner Architecture Diagram

```mermaid
graph TD
    subgraph Hetzner_Cloud[Hetzner Cloud]
        HC_LB[Hetzner Cloud Load Balancer]
        HC_PN[Hetzner Private Network]
        HC_CP_VM1[Control Plane Node 1]
        HC_CP_VM2[Control Plane Node 2]
        HC_CP_VM3[Control Plane Node 3]
        HC_WK_VM1[Worker Node 1]
        HC_WK_VM2[Worker Node 2]
        HC_VOL[Hetzner Cloud Volumes]
    end
    
    subgraph K8S_Cluster[Kubernetes Cluster]
        K8SAPI[API Server]
        K8S_ETCD[etcd]
        K8S_SCHED[Scheduler]
        K8S_CTRL[Controller Manager]
        K8S_KUBELET_CP[Kubelet CP]
        K8S_KUBELET_WK[Kubelet WK]
        K8S_PROXY[Kube-Proxy]
        K8S_CNI[CNI - Flannel/Calico/Cilium]
        K8S_STORAGE[Storage - Longhorn/Hetzner CSI]
        K8S_KLB[Klipper LoadBalancer]
    end
    
    User --> Terraform
    Terraform --> Hetzner_Cloud
    Terraform --> HC_LB
    Terraform --> HC_PN
    Terraform --> HC_CP_VM1
    Terraform --> HC_CP_VM2
    Terraform --> HC_CP_VM3
    Terraform --> HC_WK_VM1
    Terraform --> HC_WK_VM2
    Terraform --> HC_VOL
    
    HC_LB --> K8SAPI
    HC_CP_VM1 --> K8SAPI
    HC_CP_VM2 --> K8SAPI
    HC_CP_VM3 --> K8SAPI
    
    HC_CP_VM1 --> K8S_ETCD
    HC_CP_VM2 --> K8S_ETCD
    HC_CP_VM3 --> K8S_ETCD
    
    HC_CP_VM1 --> K8S_SCHED
    HC_CP_VM1 --> K8S_CTRL
    
    HC_CP_VM1 --> K8S_KUBELET_CP
    HC_CP_VM2 --> K8S_KUBELET_CP
    HC_CP_VM3 --> K8S_KUBELET_CP
    
    HC_WK_VM1 --> K8S_KUBELET_WK
    HC_WK_VM2 --> K8S_KUBELET_WK
    
    HC_PN --> HC_CP_VM1
    HC_PN --> HC_CP_VM2
    HC_PN --> HC_CP_VM3
    HC_PN --> HC_WK_VM1
    HC_PN --> HC_WK_VM2
    
    K8S_KUBELET_CP --> K8S_PROXY
    K8S_KUBELET_WK --> K8S_PROXY
    
    K8S_KUBELET_CP --> K8S_CNI
    K8S_KUBELET_WK --> K8S_CNI
    
    K8S_KUBELET_CP --> K8S_STORAGE
    K8S_KUBELET_WK --> K8S_STORAGE
    
    HC_VOL --> K8S_STORAGE
    
    K8SAPI --> K8S_KLB
    K8S_KLB --> K8S_KUBELET_WK
    K8S_KLB --> K8S_KUBELET_CP
    
    %% Control Plane Nodes - Purple background with dark text
    style HC_CP_VM1 fill:#d8b5ff,stroke:#333,stroke-width:2px,color:#000
    style HC_CP_VM2 fill:#d8b5ff,stroke:#333,stroke-width:2px,color:#000
    style HC_CP_VM3 fill:#d8b5ff,stroke:#333,stroke-width:2px,color:#000
    
    %% Worker Nodes - Blue background with dark text
    style HC_WK_VM1 fill:#b5d0ff,stroke:#333,stroke-width:2px,color:#000
    style HC_WK_VM2 fill:#b5d0ff,stroke:#333,stroke-width:2px,color:#000
    
    %% Kubernetes Components - Green background with dark text
    style K8SAPI fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    style K8S_ETCD fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    style K8S_SCHED fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    style K8S_CTRL fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    style K8S_KUBELET_CP fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    style K8S_KUBELET_WK fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    style K8S_PROXY fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    style K8S_CNI fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    style K8S_STORAGE fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    style K8S_KLB fill:#b5ffb5,stroke:#333,stroke-width:2px,color:#000
    
    %% Hetzner Infrastructure - Light pink background with dark text
    style HC_LB fill:#ffcce6,stroke:#333,stroke-width:2px,color:#000
    style HC_PN fill:#ffcce6,stroke:#333,stroke-width:2px,color:#000
    style HC_VOL fill:#ffcce6,stroke:#333,stroke-width:2px,color:#000
    
    %% Other nodes
    style User fill:#f9f9f9,stroke:#333,stroke-width:1px,color:#000
    style Terraform fill:#f9f9f9,stroke:#333,stroke-width:1px,color:#000
```

## Explanation of Components:

- **User:** Interacts with the system, primarily through Terraform.
- **Terraform:** Infrastructure as Code tool responsible for provisioning and managing all Hetzner Cloud resources.
- **Hetzner Cloud:** The underlying cloud provider.
  - **Hetzner Cloud Load Balancer (HC_LB):** Used to expose the Kubernetes API server and potentially other services to external traffic.
  - **Hetzner Private Network (HC_PN):** Provides isolated and secure communication between all cluster nodes.
  - **Control Plane Nodes (HC_CP_VM1, HC_CP_VM2, HC_CP_VM3):** Virtual Machines hosting the Kubernetes control plane components. An odd number is used for High Availability.
  - **Worker Nodes (HC_WK_VM1, HC_WK_VM2):** Virtual Machines running user workloads.
  - **Hetzner Cloud Volumes (HC_VOL):** Block storage volumes used for persistent data.
- **Kubernetes Cluster (k3s):** The lightweight Kubernetes distribution.
  - **Kubernetes API Server (K8S_API):** The front-end for the Kubernetes control plane, exposing the Kubernetes API.
  - **etcd (K8S_ETCD):** Distributed key-value store used as Kubernetes' backing store for all cluster data.
  - **Scheduler (K8S_SCHED):** Watches for newly created Pods that have no assigned node, and selects a node for them to run on.
  - **Controller Manager (K8S_CTRL):** Runs controller processes that regulate the state of the cluster.
  - **Kubelet (K8S_KUBELET_CP, K8S_KUBELET_WK):** An agent that runs on each node in the cluster, ensuring that containers are running in a Pod.
  - **Kube-Proxy (K8S_PROXY):** Network proxy that runs on each node, implementing part of the Kubernetes Service concept.
  - **CNI (K8S_CNI):** Container Network Interface, responsible for pod networking (e.g., Flannel, Calico, Cilium).
  - **Storage (K8S_STORAGE):** Handles persistent storage for the cluster (e.g., Longhorn, Hetzner CSI Driver).
  - **Klipper LoadBalancer (K8S_KLB):** k3s's embedded on-metal load balancer for services of type `LoadBalancer`.

## Flow of Operations:

1.  **User Interaction:** The user defines the desired infrastructure using Terraform configuration files.
2.  **Terraform Provisioning:** Terraform interacts with the Hetzner Cloud API to provision all necessary resources: Load Balancers, Private Networks, Control Plane VMs, Worker VMs, and Cloud Volumes.
3.  **Network Connectivity:** All Control Plane and Worker Nodes are connected to the Hetzner Private Network for secure internal communication.
4.  **Kubernetes API Access:** The Hetzner Cloud Load Balancer exposes the Kubernetes API Server, providing a stable endpoint for `kubectl` access.
5.  **Control Plane Components:** Control Plane Nodes host the Kubernetes API Server, etcd, Scheduler, and Controller Manager, forming the brain of the cluster.
6.  **Node Agents:** Kubelet and Kube-Proxy run on both Control Plane and Worker Nodes to manage pods and network traffic.
7.  **Pod Networking:** The chosen CNI (Flannel, Calico, or Cilium) enables communication between pods across the cluster.
8.  **Persistent Storage:** Hetzner Cloud Volumes are integrated via the CSI driver or managed by Longhorn to provide persistent storage for stateful applications.
9.  **Internal Load Balancing:** Klipper LoadBalancer handles internal service exposure within the cluster.
