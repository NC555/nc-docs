# Installing NVM and Node.js on Ubuntu

## Install NVM (Node Version Manager)

1. Update your package index:

   ```bash
   sudo apt update
   ```

2. Install prerequisites:

   ```bash
   sudo apt install curl build-essential -y
   ```

3. Download and run the NVM installation script:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
   ```

4. Close and reopen your terminal, or run this to apply changes immediately:

   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
   ```

5. Verify NVM installation:
   ```bash
   nvm --version
   ```

## Install Node.js using NVM

1. To install the latest LTS (Long Term Support) version:

   ```bash
   nvm install --lts
   ```

   Or install a specific version:

   ```bash
   nvm install 18.18.0
   ```

2. Set your default Node.js version:

   ```bash
   nvm alias default 'lts/*'
   ```

   Or specify a version:

   ```bash
   nvm alias default 18.18.0
   ```

3. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

## Managing Node.js Versions with NVM

- List installed versions:

  ```bash
  nvm ls
  ```

- List available versions to install:

  ```bash
  nvm ls-remote
  ```

- Switch between versions:
  ```bash
  nvm use 16.20.0
  ```

NVM makes it easy to switch between different Node.js versions for different projects.

---
