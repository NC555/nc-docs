***
tags: #linux  #tree #commands
***
# Linux `tree` Command Manual

## Overview
`tree` is a recursive directory listing command that produces a depth-indented listing of files and directories in a tree-like format.

## Installation

On Debian/Ubuntu:
```bash
sudo apt install tree
```

On Red Hat/Fedora/CentOS:
```bash
sudo dnf install tree
```

On Arch Linux:
```bash
sudo pacman -S tree
```

## Basic Usage

```bash
tree [options] [directory]
```

If no directory is specified, the current directory is used.

## Common Options

| Option | Description |
|--------|-------------|
| `-a` | All files are listed (including hidden files) |
| `-d` | List directories only |
| `-L n` | Limit display to n levels deep |
| `-f` | Print full path prefix for each file |
| `-i` | Don't print indentation lines |
| `-p` | Print file type and permissions |
| `-s` | Print size of each file |
| `-h` | Print size in human-readable format |
| `-u` | Print file owner |
| `-g` | Print file group |
| `-D` | Print last modification date |
| `--dirsfirst` | List directories before files |
| `-C` | Add color to output |
| `-J` | Output in JSON format |
| `-X` | Output in XML format |
| `-H TITLE` | Output in HTML format with TITLE |
| `--noreport` | Don't print file/directory report at end |
| `-o FILE` | Output to FILE instead of stdout |

## Examples

### Basic directory listing
```bash
tree
```

### List directories only, 2 levels deep
```bash
tree -d -L 2
```

### List with full path names
```bash
tree -f
```

### List with permissions and size
```bash
tree -p -s -h
```

### List with color and show directories first
```bash
tree -C --dirsfirst
```

### Generate HTML output
```bash
tree -H "My Directory Listing" -o listing.html
```

## Exit Status

| Value | Meaning |
|-------|---------|
| 0 | Success |
| 1 | Minor problem (e.g., cannot stat a file) |
| 2 | Major problem (e.g., cannot open directory) |

## Environment Variables

- `LS_COLORS`: Determines colors used for coloring output when `-C` is used

## Files

- `/etc/DIR_COLORS`: Configuration for default color scheme

## Author
The original `tree` command was written by Steve Baker.

## See Also
- `find(1)`
- `ls(1)`
- `du(1)`