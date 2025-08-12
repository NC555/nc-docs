***
tags: #wsl #wsl2 
***

# Windows Subsystem for Linux (WSL)

Windows Subsystem for Linux is a compatibility layer that allows running Linux binary executables natively on Windows. It bridges the gap between Windows and Linux ecosystems.
## Overview
### Key Features

- Run Linux commands and applications directly on Windows
- Access Windows files from Linux environment
- Access Linux files from Windows
- Integrated terminal experience

### Versions

- **WSL 1**: Uses a translation layer to convert Linux system calls to Windows system calls
- **WSL 2**: Uses a lightweight virtual machine with a real Linux kernel

### Benefits

- Development environment for Linux-first tools
- Cross-platform development
- Learning Linux while using Windows
- Eliminates need for dual-boot setups

### Common Use Cases

- Web development with Linux-native tools
- Running containerized applications
- Database management
- Server testing

### Supported Distributions

Multiple Linux distributions available including:
- Ubuntu
- Debian
- Kali Linux
- openSUSE
- Fedora

### Integration

WSL integrates with Windows tools like:
- Visual Studio Code
- Windows Terminal
- Docker Desktop
- PowerShell

### Resources

- [Microsoft Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [GitHub Repository](https://github.com/microsoft/WSL)

## Prerequisites

Before beginning installation, check if WSL is already installed:
- Open PowerShell or Command Prompt and run: `wsl --list`
- Check for WSL components that might have been installed with other applications like Docker Desktop


## System Requirements

- Windows 10 version 2004 or higher (Build 19041 or higher) or Windows 11
- 64-bit processor with virtualization capabilities
- At least 4GB of RAM (8GB+ recommended)

## Installation Methods

### Method 1: Simple Installation (Windows 10 version 2004+ or Windows 11)

1. Open PowerShell or Command Prompt as Administrator
2. Run the command:
   ```
   wsl --install
   ```
3. Restart your computer
4. On first boot, Ubuntu will be installed as the default Linux distribution
5. Create a username and password when prompted

### Method 2: Manual Installation

#### Step 1: Enable the WSL feature

1. Open PowerShell as Administrator
2. Run:
   ```
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   ```

#### Step 2: Enable Virtual Machine Platform

1. In the same PowerShell window, run:
   ```
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
2. Restart your computer

#### Step 3: Download and install the Linux kernel update package

1. Download the WSL2 Linux kernel update package from [Microsoft's website](https://aka.ms/wsl2kernel)
2. Run the downloaded installer

#### Step 4: Set WSL2 as default

1. Open PowerShell as Administrator
2. Run:
   ```
   wsl --set-default-version 2
   ```

#### Step 5: Install a Linux distribution

1. Open Microsoft Store
2. Search for your preferred Linux distribution (Ubuntu, Debian, Kali, etc.)
3. Click "Get" or "Install"
4. Launch the distribution after installation
5. Create a username and password when prompted

## Verifying WSL2 Installation

To verify your installation:

1. Open PowerShell
2. Run:
	```
	wsl --list --verbose
	```
3. Check that your distribution shows "2" under the VERSION column

## Troubleshooting

### Common Issues:

1. **Virtualization not enabled in BIOS/UEFI**
   - Restart computer and enter BIOS/UEFI settings
   - Enable virtualization (may be labeled as VT-x, AMD-V, SVM, or Virtualization Technology)

2. **Error 0x80370102**
   - Ensure Virtual Machine Platform is enabled
   - Check that virtualization is enabled in BIOS

3. **WSL2 not starting**
   - Run `wsl --shutdown` in PowerShell
   - Restart the distribution

4. **Memory issues**
   - Create a `.wslconfig` file in your user directory with memory limits:
     ```
     [wsl2]
     memory=4GB
     processors=2
     ```

## Converting WSL1 to WSL2

If you have an existing WSL1 distribution:

1. Check current version:
   ```
   wsl --list --verbose
   ```
2. Convert to WSL2:
   ```
   wsl --set-version <distribution-name> 2
   ```
   Example: `wsl --set-version Ubuntu 2`

## Advanced Configuration

### Installing Additional Distributions

1. View available distributions:
   ```
   wsl --list --online
   ```
2. Install a specific distribution:
   ```
   wsl --install -d <Distribution Name>
   ```

### Setting a Default Distribution

```
wsl --set-default <Distribution Name>
```

### Accessing Linux Files from Windows

Access your Linux files through Windows Explorer at:
`\\wsl$\<DistributionName>\`

### Accessing Windows Files from Linux

Windows drives are mounted in the `/mnt/` directory:
- C: drive is at `/mnt/c/`
- D: drive is at `/mnt/d/`

## Resources

- [Official Microsoft WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [WSL GitHub repository](https://github.com/microsoft/WSL)

