---
tags: -network
  -ip
---

# Linux Network Information

This document provides commands to retrieve your public IP address and detailed network information on Linux systems.

## One-Liner for Quick Public IP

If you just need a quick one-liner to get your public IP address:

```bash
curl -s https://api.ipify.org
# Alternative with ipinfo.io (returns JSON with additional data)
curl -s https://ipinfo.io/json | jq
```

## Getting Your Public IP Address

There are several ways to retrieve your public IP address using command-line tools:

### Method 1: Using an External Service

```bash
# Using ipify API
curl -s https://api.ipify.org

# Alternative with icanhazip
curl -s https://icanhazip.com

# Alternative with ipinfo.io (returns JSON with additional data)
curl -s https://ipinfo.io/json | jq
```

### Method 2: Using DNS Services

```bash
# Using OpenDNS
dig +short myip.opendns.com @resolver1.opendns.com

# Using Google DNS
dig TXT +short o-o.myaddr.l.google.com @ns1.google.com | tr -d \"
```

## Getting Detailed Network Information

### Basic Network Interface Information

```bash
# List all network interfaces
ip link show

# Show only active interfaces
ip link show up

# Display interface details with IP addresses
ip addr show
```

### IP Configuration (Similar to ifconfig)

```bash
# Get all IP configurations (ifconfig alternative)
ip addr

# Get only IPv4 addresses
ip -4 addr

# Traditional ifconfig (if installed)
ifconfig
```

### Routing Information

```bash
# Show routing table
ip route

# Traditional route command (if installed)
route -n
```

### Network Statistics

```bash
# Get network interface statistics
ip -s link

# Get TCP connection statistics
ss -s

# Get active connections
ss -tuln

# Traditional netstat (if installed)
netstat -tuln
```

### DNS Client Information

```bash
# View DNS resolver configuration
cat /etc/resolv.conf

# Test DNS resolution
dig google.com

# Trace DNS resolution
dig +trace google.com
```

### Wi-Fi Networks (If Applicable)

```bash
# Show available Wi-Fi networks
sudo iwlist scan | grep ESSID

# Show current Wi-Fi connection
iwconfig

# More detailed Wi-Fi information
nmcli dev wifi list
```

## Comprehensive Network Report

The following script creates a comprehensive network information report:

```bash
#!/bin/bash

# Create a network report
echo -e "\n\e[1;32mComprehensive Network Report\e[0m"
echo -e "\n\e[1;32mComputer Name:\e[0m"
hostname

echo -e "\n\e[1;32mPublic IP Address:\e[0m"
curl -s https://api.ipify.org || echo "Unable to retrieve (check internet connection)"

echo -e "\n\e[1;32mNetwork Interfaces:\e[0m"
ip link show up

echo -e "\n\e[1;32mIP Configuration:\e[0m"
ip -4 addr

echo -e "\n\e[1;32mDefault Gateway:\e[0m"
ip route | grep default

echo -e "\n\e[1;32mDNS Servers:\e[0m"
cat /etc/resolv.conf | grep nameserver

echo -e "\n\e[1;32mActive Connections:\e[0m"
ss -tuln

echo -e "\n\e[1;32mNetwork Interface Statistics:\e[0m"
ip -s link

echo -e "\n\e[1;32mInternet Connectivity:\e[0m"
ping -c 1 google.com > /dev/null && echo "Connected" || echo "Not connected"
```

Save this script as `network_report.sh`, make it executable with `chmod +x network_report.sh`, and run it whenever you need detailed network information.

## Network Performance Testing

```bash
# Install and use speedtest-cli
sudo apt install speedtest-cli  # Debian/Ubuntu
sudo dnf install speedtest-cli  # Fedora
speedtest-cli

# Test latency to a specific host
ping -c 5 google.com

# Test MTU
ping -c 5 -M do -s 1472 google.com
```

Save these commands to a bash script (`.sh` file) for easy access whenever you need network information.
