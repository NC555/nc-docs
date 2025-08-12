# TCP & UDP Ports allocated

## 1. Main Command

```bash
sudo ss -tuln    # OR: sudo netstat -tuln   (if installed)
```

- Lists _all_ open TCP (-t) & UDP (-u) Listening sockets (-l, "servers only") with numeric display.
- Shows both docker-forwarded AND non-docker services!

You will see lines like:

```
Netid State   Recv-Q Send-Q Local Address:Port      Peer Address:Port
tcp   LISTEN  ...     127.0.0.1:5432               ...
tcp   LISTEN         *:80                          ...
udp          ...     [::]:68                       ...
...
```

If you need process names/pids add option (`ss` preferred now):

```bash
sudo ss -tplun        # Adds PID/program column!
# Or for full detail use 'p' (=processes):       ^^^^
```

---

## 2️⃣ Combine With Your Docker Allocation Table

The output of `docker ps --format "{{json .}}" | jq '.'` gives a structured version just for running container mappings—but these are already included as “bound” by dockerd proxying them onto real interfaces via NAT/br-net bridges/etc.

So everything shown in either tool is considered an active port binding.

---

#### Example Aggregate Steps:

##### Get ONLY used host-side TCP ports ("what's actually being held" no matter who holds it):

```sh
sudo lsof -iTCP -sTCP:LISTEN -P +c15 |
awk '{print $9}' |
grep ':' |
sort | uniq                    # shows e.g., localhost:*hostport*
```

For UDP listeners instead:

```sh
sudo lsof -iUDP    # or customize further per needs …
```

Or more simply get _(protocol/interface/address/IP/PORT)_ mapping at once using SS/netstat/lsof combinations seen here.

---
