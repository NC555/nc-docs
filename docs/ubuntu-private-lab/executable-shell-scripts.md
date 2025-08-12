# Executable Shell Scripts (.sh) - A Comprehensive Guide

## Basic Structure

### 1. Create the Script File

```bash
touch myscript.sh
```

### 2. Add Shebang Line

The first line should specify the interpreter:

```bash
#!/bin/bash
```

## Making Scripts Executable

### Method 1: Using chmod

```bash
chmod +x myscript.sh
```

### Method 2: Specific Permissions

```bash
chmod 755 myscript.sh
```

## Running Scripts

### Method 1: Direct Execution

```bash
./myscript.sh
```

### Method 2: Using bash

```bash
bash myscript.sh
```

## Script Writing Techniques

### Here Document (EOF) Example

```bash
cat << 'EOF' > myscript.sh
#!/bin/bash
echo "Hello World"
echo "This is a multi-line script"
EOF
```

### Basic Script Template

```bash
#!/bin/bash

# Script description
# Author: Your Name
# Date: YYYY-MM-DD

# Variables
VARIABLE_NAME="value"

# Main logic
echo "Starting script..."

# Your commands here

echo "Script completed."
```

## Best Practices

1. Always include shebang line
2. Add comments for documentation
3. Use meaningful variable names
4. Include error handling
5. Test for required dependencies
6. Use proper file permissions

## Common Permission Meanings

- `755`: Owner can read/write/execute, others can read/execute
- `700`: Only owner can read/write/execute
- `644`: Owner can read/write, others can read
- `600`: Only owner can read/write

## Script Execution Troubleshooting

If you encounter "Permission denied":

1. Check file permissions
2. Verify script location
3. Ensure correct shebang
4. Check file ownership

## Example Script with Error Handling

```bash
#!/bin/bash

# Exit on error
set -e

# Error handling function
handle_error() {
    echo "Error occurred in script at line: $1"
    exit 1
}

trap 'handle_error $LINENO' ERR

# Script logic here
echo "Script running..."
```

---
