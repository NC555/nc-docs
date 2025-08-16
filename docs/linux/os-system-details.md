---
tags: [ubuntu, linux, OS]
---

# Linux OS Overview

## Linux OS version and system details

There are several commands you can use in Linux to get information about the #linux #OS #version and system details:

1. `uname -a`

- Shows kernel version and basic system information
- Example output: Linux hostname 5.4.0-81-generic #ubuntu SMP Thu Jul 15 19:09:17 UTC 2021 x86_64 GNU/Linux

2. `cat /etc/os-release`

- Shows detailed OS information including version, name, ID
- More human-readable format

3. `lsb_release -a`

- Shows LSB (Linux Standard Base) information
- Distribution-specific information

4. `hostnamectl`

- Shows system hostname and operating system information
- Also displays virtualization details

5. `cat /proc/version`

- Shows Linux kernel version information

6. `neofetch`

- A command-line system information tool (needs to be installed)
- Shows OS, kernel, uptime, packages, shell, etc. in a visually appealing format

Example using multiple commands:

```bash
# Get basic system info
uname -a

# Get OS details
cat /etc/os-release

# Get distribution info
lsb_release -a

# Get system and OS info
hostnamectl
```

## Ubuntu system information

Here are several ways to check system information in Ubuntu:

1. System Overview:

```bash
# GUI Method: Open "Settings -> About"
# Command Line Methods:
neofetch            # Needs installation: sudo apt install neofetch
screenfetch         # Alternative to neofetch
```

2. Hardware Information:

```bash
# CPU Info
lscpu               # CPU architecture info
cat /proc/cpuinfo   # Detailed CPU info

# Memory Info
free -h             # RAM usage in human-readable format
cat /proc/meminfo   # Detailed memory info

# Disk Space
df -h               # Disk space usage
lsblk               # Block devices info

# Hardware Overview
sudo lshw           # Detailed hardware info
sudo lshw -short    # Shortened hardware info
```

3. System Monitoring:

```bash
top                 # Process activity in real-time
htop                # Enhanced version of top (needs installation)
```

4. Graphics Info:

```bash
lspci | grep -i vga  # Graphics card info
glxinfo | grep OpenGL # OpenGL info
```

5. Network Info:

```bash
ifconfig            # Network interfaces info
ip a               # Modern alternative to ifconfig
```

6. Package Information:

```bash
dpkg -l            # List installed packages
apt list --installed # Alternative way to list packages
```

7. System Logs:

```bash
dmesg              # Kernel ring buffer
journalctl        # System logs
```

8. Install System Information Tools:

```bash
sudo apt update
sudo apt install hardinfo    # GUI system info tool
sudo apt install htop
sudo apt install neofetch
```

9. Temperature Monitoring:

```bash
# Install sensors
sudo apt install lm-sensors
sudo sensors-detect
sensors            # Show temperature info
```

10. Device Information:

```bash
sudo dmidecode    # Hardware info from BIOS
```

These commands provide different aspects of system information. You can use them based on what specific information you need. Remember that some commands might require sudo privileges.
