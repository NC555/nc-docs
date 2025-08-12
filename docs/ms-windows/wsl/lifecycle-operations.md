# Managing WSL Lifecycle Operations

## Shutting Down and Rebooting WSL

Here are the essential commands to manage the Windows Subsystem for Linux (WSL) lifecycle:

### Shutting Down WSL

To completely shut down a specific WSL distribution:

```
wsl --terminate <distro-name>
```

To shut down all running WSL distributions:

```
wsl --shutdown
```

### Restarting WSL

There is no direct "restart" command for WSL. Instead, you need to shut it down first, then start it again:

1. Shut down WSL:

   ```
   wsl --shutdown
   ```

2. Start your distribution again:
   ```
   wsl -d <distro-name>
   ```

### Viewing Running Distributions

To see which WSL distributions are currently running:

```
wsl --list --running
```

To see all installed distributions:

```
wsl --list --verbose
```

### Stopping Services Within WSL

To properly stop services inside your WSL distribution before shutting down:

```bash
# Stop a specific service
sudo service <service-name> stop

# Examples for common services
sudo service apache2 stop
sudo service nginx stop
sudo service mysql stop
sudo service postgresql stop
sudo service ssh stop
```

This ensures your services are cleanly terminated before shutting down the WSL instance.
