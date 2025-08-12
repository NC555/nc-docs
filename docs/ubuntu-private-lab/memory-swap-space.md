# Swap Space Tutorial

## 1. Understanding Swap Space

Swap space is a designated area on your hard drive that acts as an extension of your computer's Random Access Memory (RAM). Think of it as an overflow parking lot for your computer's memory:

- **Primary Function**: When RAM gets full, less-used memory pages are moved to swap space
- **Performance Impact**: Slower than RAM (disk vs memory speed)
- **System Stability**: Prevents crashes from memory exhaustion
- **Hibernation Support**: Enables system hibernation by storing RAM content

## 2. Recommended Swap Space Sizes

The recommended swap space depends on your system's RAM and use case:

| RAM Size | Recommended Swap (Regular Use) | With Hibernation |
| -------- | ------------------------------ | ---------------- |
| < 2GB    | 2× RAM size                    | 3× RAM size      |
| 2-8GB    | = RAM size                     | 2× RAM size      |
| 8-64GB   | At least 4GB                   | RAM size + 2GB   |
| > 64GB   | At least 4GB                   | RAM size + 4GB   |

## 3. Calculating and Setting Up Swap

Let's create a calculator to help determine optimal swap size:

```python
def calculate_swap(ram_gb, hibernation=False):
    if ram_gb < 2:
        swap = ram_gb * 2 if not hibernation else ram_gb * 3
    elif 2 <= ram_gb <= 8:
        swap = ram_gb if not hibernation else ram_gb * 2
    elif 8 < ram_gb <= 64:
        swap = max(4, ram_gb * 0.5) if not hibernation else ram_gb + 2
    else:
        swap = 4 if not hibernation else ram_gb + 4

    return round(swap, 1)

# Example calculations
ram_sizes = [1, 4, 16, 128]
print("RAM Size | Regular Swap | Hibernation Swap")
print("-" * 45)
for ram in ram_sizes:
    regular = calculate_swap(ram)
    hibernate = calculate_swap(ram, True)
    print(f"{ram:8d}GB | {regular:11.1f}GB | {hibernate:15.1f}GB")
```

### Setting Up Swap Space

Here's how to create and enable swap space:

1. **Check Current Swap**:

```bash
free -h
swapon --show
```

2. **Create Swap File**:

```bash
# Create swap file (replace 4G with your calculated size)
sudo fallocate -l 4G /swapfile

# Set correct permissions
sudo chmod 600 /swapfile

# Format as swap
sudo mkswap /swapfile

# Enable swap
sudo swapon /swapfile
```

3. **Make Swap Permanent**:

```bash
# Add to /etc/fstab
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

4. **Verify Setup**:

```bash
# Check swap is active
free -h
swapon --show
```

5. **Adjust Swappiness** (optional):

```bash
# Check current swappiness
cat /proc/sys/vm/swappiness

# Set new value (e.g., 10)
sudo sysctl vm.swappiness=10
```

### Additional Tips:

- Monitor swap usage: `htop` or `top`
- For SSDs, consider using `zswap` or `zram`
- Adjust swappiness based on system usage patterns
- Regular systems rarely need more than 8GB swap
- Server environments might need different configurations

Need help implementing any of these steps or calculating your specific swap requirements?

---

**[Up: Introduction](Get%20Started%20With%20a%20New%20Linux%20VPS.md)** | **[Previous: Install Code Server](Install%20Code%20Server.md)** | **[Next: (Back to Introduction)](Get%20Started%20With%20a%20New%20Linux%20VPS.md)**
