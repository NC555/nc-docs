# Linux SSH Key Generation

## Prerequisites

Install OpenSSH if not already present:

```bash
sudo apt update
sudo apt install openssh-client
```

## Creating SSH Directory

1. Create .ssh directory if it doesn't exist:

```bash
mkdir -p /home/$USER/.ssh
```

2. Set correct directory permissions:

```bash
chmod 700 /home/$USER/.ssh
```

## Generating SSH Keys

1. Generate the key pair:

```bash
# Using default location
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# using custom name in .ssh directory
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/my-key

```

- Press Enter to save in default location (~/.ssh/id_ed25519)
- Enter a secure passphrase (recommended) or press Enter twice for no passphrase

2. Start SSH agent:

```bash
eval "$(ssh-agent -s)"
```

3. Add key to SSH agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

4. View your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

## Key Location

- Private key: `~/.ssh/id_ed25519`
- Public key: `~/.ssh/id_ed25519.pub`

## Alternative Key Types

For legacy systems, use RSA:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

## Key Permissions

Set correct permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

## Direct Path Creation

If you need to specify the exact path:

```bash
# Create directory
mkdir -p /home/$USER/.ssh

# Generate key with specific path
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f /home/$USER/.ssh/id_rsa

# Set permissions
chmod 700 /home/$USER/.ssh
chmod 600 /home/$USER/.ssh/id_rsa
chmod 644 /home/$USER/.ssh/id_rsa.pub
```

---
