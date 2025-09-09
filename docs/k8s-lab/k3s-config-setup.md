# K3s single-node lab – what lives where  
openSUSE-Leap-15.6 – 23.88.126.224 (DNS wildcard `*.nc555.online` → 23.88.126.224)

---

## 1. Cluster landing page (bookmark this)
https://traefik.nc555.online – Traefik dashboard (OIDC-protected, Keycloak realm “traefik”)  
80 / 443 are exposed on the node via **svclb-traefik** DaemonSet (metallb not used).  
All public services are TLS-terminated by Traefik, certs via **letsencrypt-prod** cluster-issuer.

---

## 2. Public end-points (all DNS A → 23.88.126.224)

| FQDN | what | behind auth? | notes / backup |
|------|------|--------------|----------------|
| traefik.nc555.online | Traefik dash | Keycloak (fwd auth) | https only |
| rancher.nc555.online | Rancher 2.8.5 | Rancher local users | bootstrap: `RancherAdmin123!` |
| iam.nc555.online | Keycloak 26.0.8 | – | admin / admin123 (change!) |
| vault.nc555.online | Vault 1.15.2 (HA-raft) | OIDC (Keycloak) + emergency userpass | 2 replicas, Longhorn 10 Gi each |
| `*.nc555.online` | – | – | wildcard cert (SAN on same cert) |

---

## 3. Underlying infra

| namespace | purpose | storage | secrets worth knowing |
|-----------|---------|---------|-----------------------|
| kube-system | k3s core | local-path | – |
| traefik-system | edge proxy | none | acme.json stored in 128 Mi PVC |
| cert-manager | Let’s Encrypt ops | none | ClusterIssuer `letsencrypt-prod` |
| longhorn-system | block storage (CSI) | **longhorn** (SC) | UI via port-forward only (no ingress) |
| cattle-system | Rancher / Fleet | **longhorn** 5 Gi PVC | `bootstrapPassword` in deployment |
| keycloak | realm “traefik”, “master” | postgres (SC longhorn) | postgres creds in chart values |
| hashicorp-vault | secrets mgmt | 3 PVCs (10 Gi) | unseal keys in secret `vault-unseal-keys` |
| fleet-* | GitOps engine | – | – |

---

## 4. Storage snapshot

`kubectl get sc`
```
longhorn (default)     # rwo + rwx, snapshot enabled
local-path             # k3s fallback, hostPath
```

Longhorn UI (port-forward only):
```bash
kubectl -n longhorn-system port-forward svc/longhorn-frontend 8080:80
```
browser → http://localhost:8080

---

## 5. One-liner cheat-sheet

```bash
# top CPU/mem
k top node

# all public ingresses
k get ing -A

# certificates ready?
k get cert -A

# restart a workload
k rollout restart deploy/rancher -n cattle-system

# read vault root token (after init)
k -n hashicorp-vault get secret vault-unseal-keys -ojson | jq -r '.data."init-keys.json"' | base64 -d

# fetch k3s kubeconfig for external PC
cat /etc/rancher/k3s/k3s.yaml | sed "s/127.0.0.1/23.88.126.224/" > k3s-ext.yaml
```

---

## 6. GitOps structure (`/k8s` on node)

```
/k8s
├── cert-manager/  # ClusterIssuer + ACME-http01 solver for Vault
├── traefik/       # Helm values, dashboard IngressRoute + OIDC middleware
├── rancher/       # 1-replica deply, Longhorn PVC, root user 0 (home-lab)
├── longhorn/      # plain install (helmCharts kustomization)
├── vault/         # HA-raft 2-replica, init Job, Keycloak OIDC script
└── keycloak/      # bitnami chart, postgres, realm “traefik” pre-seeded
```

Apply any overlay:
```bash
cd /k8s/<app>/overlays/prod
kubectl apply -k .
```

---

## 7. Day-2 reminders

1. **Back-ups**  
   - Longhorn → recurring snapshots nightly (configure in UI).  
   - Rancher: backup operator (not installed yet) – do via “rancher-backup” Helm chart when needed.  

2. **Rotate all quick-start passwords**  
   Keycloak admin, Vault userpass admin, Rancher bootstrap.  

3. **Upgrade order**  
   k3s ➜ cert-manager ➜ traefik ➜ longhorn ➜ vault ➜ rancher ➜ keycloak  
   (check `/fleet` bundles – GitOps will apply automatically if repo is connected).

4. **Logs** are in `/var/log/pods` (containerd) – or simply  
   `kubectl logs -n <ns> <pod>` – k3s ships journald service `k3s`.

---

## 8. Need help?

- Rancher UI → Global Apps → scroll to bottom – links to every project log.  
- Traefik dashboard shows live routers / retry / latency.  
- Vault unseal:  
  ```bash
  k -n hashicorp-vault exec vault-0 -- vault operator unseal
  ```
  (you have 5 keys, threshold 3).

Enjoy your one-stop homelab!