---
tags: [wsl2, wsl_ubuntu]
---

# Installing Ubuntu 24.04 LTS on WSL2

This guide provides step-by-step instructions for installing Ubuntu 24.04 LTS (Noble Numbed) on Windows Subsystem for Linux.

## Prerequisites

- Windows 10 version 2004 or higher (Build 19041 or higher) or Windows 11
- Administrator access to your Windows machine
- reference: [[Setup Windows Subsystem for Linux (WSL)]]

## Installation Methods

1. Open PowerShell or Command Prompt as Administrator
2. Run the following command:
   ```powershell
   wsl --install -d Ubuntu-24.04
   ```
3. Restart your computer if prompted
4. Ubuntu will complete installation after restart
5. Create a username and password when prompted

## Post-Installation Setup

### Update and Upgrade Packages

After installation, update and upgrade your Ubuntu packages:

```bash

# Run the ubuntu-24.04 distribution
wsl -d ubuntu-24.04

#set unix username and passowrd
username: username
password: password


################  essential tools for sysadmin & dev ###############
sudo apt update && sudo apt upgrade -y

# Install a set of essential tools for system management and development
sudo apt install -y nano zsh git curl jq tree zip unzip wget


################  Oh-My-Zsh shell ###############
# Install Oh-My-Zsh to enhance your Zsh shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Edit the .zshrc file
nano ~/.zshrc

# within .zshrc set the theme setting to
ZSH_THEME="mikeh"

# apply the changes and reloading the shell configuration
source ~/.zshrc

```

### Set Ubuntu 24.04 as Default WSL Distribution (Optional)

If you have multiple WSL distributions and want to set Ubuntu 24.04 as default:

```powershell
wsl --set-default Ubuntu-24.04
```

### Configure WSL Memory and CPU Limits (Optional)

Create a `.wslconfig` file in your Windows user profile directory to customize resource allocation:

1. Open PowerShell and run:
   ```powershell
   notepad "$env:USERPROFILE\.wslconfig"
   ```
2. Add the following configuration (adjust values as needed):
   ```
   [wsl2]
   memory=4GB
   processors=2
   ```
3. Save the file and restart WSL:
   ```powershell
   wsl --shutdown
   ```

## Accessing Windows Files from Ubuntu 24.04 WSL

1. **Basic Access via `/mnt`**:

   - Windows drives are automatically mounted under the `/mnt` directory
   - For example, your C: drive is accessible at `/mnt/c`

   ```bash
   # Navigate to your Windows C: drive
   cd /mnt/c

   # List files in your Windows user directory
   ls /mnt/c/Users/YourWindowsUsername
   ```

2. **Accessing other drives**:

   - All drives are mounted with their letter designations
   - Examples:
     - D: drive is at `/mnt/d`
     - E: drive is at `/mnt/e`

3. **Using Windows paths in commands**:

   ```bash
   # Copy a file from Windows to your Ubuntu home directory
   cp /mnt/c/Users/YourWindowsUsername/Documents/file.txt ~/
   ```

4. **Creating shortcuts** (optional):
   ```bash
   # Create a symlink to commonly used Windows locations
   ln -s /mnt/c/Users/YourWindowsUsername/Documents ~/win-documents
   ```

Remember that file permissions might work differently between Windows and Linux systems. WSL2 preserves Windows file permissions when accessing Windows files.

## Troubleshooting

### Installation Fails

- Ensure Windows is up to date
- Verify WSL is enabled correctly:
  ```powershell
  wsl --status
  ```
- Check for available WSL distributions:
  ```powershell
  wsl --list --online
  ```

### WSL Version Issues

If Ubuntu is running on WSL 1 instead of WSL 2:

```powershell
wsl --set-version Ubuntu-24.04 2
```

### Ubuntu Fails to Start

Reset the Ubuntu installation:

```powershell
wsl --unregister Ubuntu-24.04
wsl --install -d Ubuntu-24.04
```

## Useful WSL Commands

- List installed distributions:
  ```powershell
  wsl --list --verbose
  ```
- Start a specific distribution:
  ```powershell
  wsl -d Ubuntu-24.04
  ```
- Shut down all WSL instances:
  ```powershell
  wsl --shutdown
  ```

---

### Additional Resources

- [Official Microsoft WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [Ubuntu WSL Documentation](https://ubuntu.com/wsl)
