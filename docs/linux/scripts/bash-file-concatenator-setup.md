***
tags: #copy #contantnator #files_concatenater
***

# Linux  File Concatenator Setup

This document explains how to set up and use a bash script that concatenates the contents of all files in a directory into a single output file.

## Setup Instructions

1. Create the script file:

```bash
#!/bin/bash
# Check if directory path is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <directory_path>"
    echo "Example: $0 /mnt/e/data/terraform-hcloud-kube-hetzner"
    exit 1
fi
  
# Get the directory path from command line argument
START_DIR="$1"
  
# Check if the directory exists
if [ ! -d "$START_DIR" ]; then
    echo "Error: Directory '$START_DIR' does not exist"
    exit 1
fi
  
# Output file
OUTPUT_FILE="result.txt"
  
# Clear the output file if it exists
> "$OUTPUT_FILE"
  
# Find all files recursively from the specified directory and process them
find "$START_DIR" -type f | while read -r FILE_PATH; do
    # Skip the output file itself to avoid infinite growth
    if [[ "$FILE_PATH" == "$OUTPUT_FILE" ]]; then
        continue
    fi
    # Add a comment with the filename at the top
    echo "# FILE: $FILE_PATH" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    # Print the file content
    cat "$FILE_PATH" >> "$OUTPUT_FILE"
    # Add the separator
    echo "" >> "$OUTPUT_FILE"
    echo "=======================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done
  
echo "All files from '$START_DIR' have been processed and saved to $OUTPUT_FILE"
```

2. Save this as `copy.sh` in your desired location (for example, in your Obsidian vault's scripts folder).

3. Make the script executable:
```bash
chmod +x copy.sh
```

## Usage

Run the script by providing a directory path as an argument:

```bash
./copy.sh /path/to/directory
```

The script will:
1. Recursively find all files in the specified directory
2. Create a file named `result.txt` in the current directory
3. Write the contents of each file to `result.txt`, with file names as headers
4. Add separators between files

## Example

```bash
./copy.sh ~/projects/my-code-project
```

This will create a `result.txt` file containing all the files from the `my-code-project` directory.

## Customization Options

To change the output file name or location, modify the `OUTPUT_FILE` variable in the script:

```bash
# Output file
OUTPUT_FILE="/path/to/your/obsidian/vault/project_files.md"
```

You can also customize the separator between files by changing the separator line:

```bash
echo "---" >> "$OUTPUT_FILE"  # Using markdown horizontal rule instead
```