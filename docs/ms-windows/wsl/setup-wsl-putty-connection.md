# Setup WSL PuTTY Connection

You can connect to your WSL Ubuntu distribution using PuTTY by setting up an SSH connection. Here's how to do it:

## Step 1: Install SSH Server in Your Ubuntu WSL

1. Open your Ubuntu 24.04 WSL distribution:
   ```
   wsl -d Ubuntu-24.04
   ```

2. Update package lists and install OpenSSH server:
   ```bash
   sudo apt update
   sudo apt install openssh-server -y
   ```

3. Edit the SSH configuration file:
   ```bash
   sudo nano /etc/ssh/sshd_config
   ```

4. Make these changes in the file:
   - Set `Port 2222` (or any unused port number)
   - Ensure `PasswordAuthentication yes` is uncommented
   - Ensure `PermitRootLogin no` is set
   - Add `AllowUsers yourusername` (replace with your actual username)

5. Save and exit (Ctrl+O, Enter, then Ctrl+X)

6. Create the required SSH directory if it doesn't exist:
   ```bash
   sudo mkdir -p /var/run/sshd
   ```

7. Start the SSH service:
   ```bash
   sudo service ssh start
   ```

## Step 2: Configure PuTTY

1. Open PuTTY

2. Configure the session:
   - Host Name (or IP address): `127.0.0.1` or `localhost`
   - Port: `2222` (the port you configured)
   - Connection type: SSH

3. Optional: In the left sidebar, navigate to "Connection > SSH > Auth > Credentials" and set up key-based authentication if preferred

4. Return to the "Session" category and save the session with a name like "WSL Ubuntu-24.04"

5. Click "Open" to connect

6. Log in with your WSL Ubuntu username and password

## Step 3: Make SSH Start Automatically (Optional)

To make the SSH server start automatically when you launch WSL, add this to your `~/.bashrc` file:

```bash
# Check if SSH service is running, if not start it
service ssh status > /dev/null || sudo service ssh start
```

Run this command to edit your `.bashrc`:
```bash
nano ~/.bashrc
```

Add the line above at the end of the file, save and exit.

## Alternative Methods

### Using WSL2 Networking Directly

Instead of using an SSH server, you can use Windows' built-in localhost forwarding:

1. In PuTTY, connect to:
   - Host: `localhost`
   - Port: `2222`
   - Connection type: SSH

2. In your WSL Ubuntu, run a simple SSH server on port 2222:
   ```bash
   sudo /usr/sbin/sshd -D -p 2222
   ```

### Using WSL.exe Directly

If you just want terminal access, you can create a batch file to launch WSL directly:

1. Create a file named `wsl-ubuntu.bat` with:
   ```batch
   wsl -d Ubuntu-24.04
   ```

2. Run this batch file instead of using PuTTY

## Troubleshooting

- If connection is refused, ensure SSH server is running: 
  ```bash
  sudo service ssh restart
  ```

- Check SSH server status: 
  ```bash
  sudo service ssh status
  ```

- Verify port is listening: 
  ```bash
  netstat -tuln | grep 2222
  ```

- If you get "Connection refused," make sure Windows Firewall allows connections on your chosen port