***
tags: #ssh_keys #create_ssh_keys #powershell
***

# PowerShell Creating SSH Keys 

This guide walks you through the process of generating an SSH key pair using Windows PowerShell.

## Prerequisites

- Windows 10 or newer
- PowerShell 5.1 or newer

## Steps to Create an SSH Key

1. Open PowerShell by searching for "PowerShell" in the Start menu.

2. Check if you already have SSH keys by running:
   ```
   dir ~/.ssh
   ```
   If you see files named `id_rsa` and `id_rsa.pub`, you already have SSH keys. Be careful not to overwrite them.

3. Generate a new SSH key pair by running:
   ```
   # replace with your actual user name
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f "C:\Users\YOUR-USER-NAME\.ssh\<ssh-file-name>"
   ```
   Replace "your_email@example.com" with your actual email address.

5. When prompted to "Enter a file in which to save the key," press Enter to accept the default location (`~/.ssh/id_rsa`).

6. When asked to enter a passphrase, you can either:
   - Enter a secure passphrase (recommended for better security)
   - Press Enter twice for no passphrase (less secure but more convenient)

6. Your SSH key pair is now created:
   - Private key: `~/.ssh/id_rsa` (keep this secure and do not share)
   - Public key: `~/.ssh/id_rsa.pub` (this is what you share with services)

## Viewing Your Public Key

To view your public key, run:
```
cat ~/.ssh/id_rsa.pub
```

The output will look something like:
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQ... your_email@example.com
```

## Using Your SSH Key

- For GitHub, GitLab, or other services: Copy the entire output of your public key to add to your account settings.
- For connecting to servers: Use the `ssh` command with your private key.

## Optional: Starting the SSH Agent

To add your key to the SSH agent (so you don't need to enter your passphrase each time):

1. Start the SSH agent:
   ```
   Start-Service ssh-agent
   ```

2. Add your private key to the agent:
   ```
   ssh-add ~/.ssh/id_rsa
   ```

## Troubleshooting

If you receive an error that ssh-keygen is not recognized:

1. Ensure OpenSSH is installed by running:
   ```
   Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
   ```

2. If needed, install OpenSSH Client:
   ```
   Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
   ```
```