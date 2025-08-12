# Directory Tree View in Linux

## Basic Command

To print a tree view of directories in Linux, use the `tree` command:

```bash
tree
```

## Installation

If `tree` is not installed, you can install it using:

### Ubuntu/Debian

```bash
sudo apt-get install tree
```

### CentOS/RHEL

```bash
sudo yum install tree
```

### Fedora

```bash
sudo dnf install tree
```

## Common Usage Options

### Basic Directory Tree

```bash
tree /path/to/directory
```

### Limit Directory Depth

Show only 2 levels deep:

```bash
tree -L 2
```

### Show Only Directories

```bash
tree -d
```

### Show Hidden Files

```bash
tree -a
```

### Show File Size

```bash
tree -h
```

### Exclude Certain Patterns

Exclude directories or files matching a pattern:

```bash
tree --exclude '*.txt'
```

### Output to File

```bash
tree > tree.txt
```

## Useful Combinations

### Common Project View

Show directories only, up to 2 levels, with size:

```bash
tree -L 2 -d -h
```

### Full Project Structure

Show all files including hidden ones, with size:

```bash
tree -a -h
```

## Tips

- Use `tree --help` to see all available options
- Combine options as needed (e.g., `tree -L 2 -d -h`)
- Large directories might take time to process
- Consider using patterns to exclude unnecessary files/directories

## Example Output

```
.
├── dir1
│   ├── file1.txt
│   └── file2.txt
├── dir2
│   └── subdir1
│       └── file3.txt
└── README.md

3 directories, 4 files
```
