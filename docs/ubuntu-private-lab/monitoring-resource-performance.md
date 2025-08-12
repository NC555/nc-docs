# Linux Monitoring Resource & Performance

This guide covers various methods and tools for monitoring your VPS resources and performance, ensuring optimal operation of your hosting environment.

## Overview

Effective monitoring is essential for:

- Identifying performance bottlenecks
- Preventing resource exhaustion
- Early detection of potential issues
- Capacity planning
- Security monitoring

## 1. Built-in Command-Line Tools

### a. top

Real-time process monitoring:

```bash
top
```

- Displays CPU, memory usage, and running processes
- Press 'q' to exit

### b. htop (Enhanced System Monitor)

Installation and usage:

```bash
sudo apt update
sudo apt install htop
htop
```

- More user-friendly interface than top
- Interactive process viewing and management

### c. Memory Monitoring Tools

```bash
# View memory usage in human-readable format
free -h

# Virtual memory statistics (2-second intervals, 5 samples)
vmstat 2 5
```

### d. Disk I/O Monitoring

```bash
# Install I/O monitoring tools
sudo apt install sysstat

# Monitor I/O statistics
iostat -xz 1 10
```

### e. Storage Usage Tools

```bash
# Check filesystem disk space
df -h

# Directory size analysis
du -sh /path/to/dir
```

### f. Network Traffic Monitoring

```bash
# Install network monitoring tools
sudo apt install nload iftop

# Monitor bandwidth usage
nload

# Monitor network connections (requires sudo)
sudo iftop
```

## 2. Web-based Monitoring Solutions

### a. Netdata

Real-time performance monitoring with web interface:

```bash
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

- Access via: `http://your_server_ip:19999`
- Provides detailed real-time metrics
- Low system overhead

### b. Glances Web Interface

Cross-platform monitoring tool:

```bash
sudo apt install python3-pip
pip3 install glances[browser]
glances -w
```

- Access via: `http://your_server_ip:61208`
- Comprehensive system overview
- Supports remote monitoring

### c. Cockpit Dashboard

Web-based server administration:

```bash
sudo apt install cockpit
sudo systemctl enable --now cockpit.socket
```

- Access via: `https://your_server_ip:9090`
- Full system administration capabilities
- Secure by default with SSL

## 3. Logging and Alert Systems

### Essential Monitoring Tools

- **fail2ban**: Intrusion detection and prevention
- **logwatch**: Log analysis and reporting
- **Prometheus + Grafana**: Advanced monitoring stack
  - Detailed metrics collection
  - Customizable dashboards
  - Alert management

## 4. External Monitoring Services

### Recommended Services

- **UptimeRobot/StatusCake**

  - External uptime monitoring
  - Response time tracking
  - SSL certificate monitoring

- **Datadog/NewRelic**
  - Comprehensive performance monitoring
  - Application performance metrics
  - Infrastructure monitoring

## Quick Reference

| Tool        | Type    | Primary Use Case                |
| ----------- | ------- | ------------------------------- |
| top/htop    | CLI     | Process and resource monitoring |
| free/vmstat | CLI     | Memory analysis                 |
| nload/iftop | CLI     | Network traffic analysis        |
| Netdata     | Web     | Real-time system monitoring     |
| Glances     | CLI/Web | Cross-platform monitoring       |
| Cockpit     | Web     | System administration           |
| Grafana     | Web     | Advanced visualization          |

## Best Practices

1. **Command-Line Monitoring**

   - Use `htop` for quick system status checks
   - Combine with `iostat` and `iftop` for comprehensive monitoring

2. **Web-Based Monitoring**

   - Netdata for real-time metrics
   - Cockpit for full system management
   - Secure web interfaces behind reverse proxy

3. **Security Considerations**
   - Always secure web monitoring tools
   - Use SSL/TLS for web interfaces
   - Implement access controls
   - Monitor security logs regularly

## Security Note

When exposing monitoring interfaces to the internet:

1. Configure proper authentication
2. Use reverse proxy with SSL
3. Implement IP-based access restrictions
4. Regularly update monitoring tools

Remember to integrate these monitoring solutions with your existing security infrastructure and backup systems.

---
