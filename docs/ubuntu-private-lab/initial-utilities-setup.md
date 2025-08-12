# Initial Utilities and Tools Setup

This document provides detailed steps for installing and configuring essential utilities and tools on your VPS. These tools enhance productivity, system monitoring, and overall server management capabilities.

## Prerequisites

- A secured VPS with basic hardening (as outlined in `[Initial Server Hardening](./10_12_Initial_Hardening_Setup.md)`)
- SSH access to the server with your non-root user
- Internet connectivity for package downloads

## 1. System Update and Package Installation

### Update Package Repositories and Upgrade Existing Packages

**Action:** Update package repositories and upgrade existing packages to ensure you have the latest versions

```bash
sudo apt update && sudo apt upgrade -y
```

**Details:**

- `apt update` refreshes the list of available packages and their versions
- `apt upgrade -y` installs newer versions of existing packages
- The `-y` flag automatically answers "yes" to prompts, making the upgrade non-interactive
- This ensures your system has the latest security patches and bug fixes

### Install Essential Utilities and Tools

**Action:** Install a set of essential utilities and tools for system management and development

```bash
sudo apt install -y zsh tmux neofetch htop git curl jq tree zip unzip 
```

**Details:**
Each package serves a specific purpose:

####  Nano (command-line text editor)

```bash
sudo apt install nano
```

- `sudo` — runs the command with administrative (root) privileges.
- `apt install` — tells the system to install the given package.
- `nano` — the package name.

If you want to automatically say "yes" to any prompts (non-interactive installation), use:

```bash
sudo apt install -y nano
```

#### Zsh (Z Shell)

- An extended version of the Bash shell with improved features
- Offers advanced command-line completion
- Provides spelling correction and approximate completion
- Supports powerful history sharing between sessions
- Enables more customizable prompt themes
- Usage: Set as your default shell with `chsh -s $(which zsh)`

#### Tmux (Terminal Multiplexer)

- Allows multiple terminal sessions within a single window
- Enables session persistence (sessions continue running when disconnected)
- Supports window splitting into panes for better workflow
- Provides session sharing capabilities for collaborative work
- Usage: Start with `tmux`, create new session with `tmux new -s session_name`
- Basic commands:
  - `Ctrl+b c` - Create new window
  - `Ctrl+b %` - Split vertically
  - `Ctrl+b "` - Split horizontally
  - `Ctrl+b d` - Detach from session

#### Neofetch

- System information tool that displays system specs in the terminal
- Shows OS, kernel version, uptime, package count
- Displays hardware info (CPU, memory, disk usage)
- Useful for quickly assessing system configuration
- Usage: Simply run `neofetch` in terminal

#### Htop

- Interactive process viewer and system monitor
- Provides real-time CPU, memory, and swap usage
- Allows process sorting, searching, and management
- More user-friendly alternative to the traditional `top` command
- Usage: Run `htop` in terminal
- Navigate with arrow keys, F9 to kill processes, F10 to quit

#### Git

- Distributed version control system
- Essential for code management and collaboration
- Enables tracking changes to files and directories
- Supports branching and merging for development workflows
- Usage: Initialize repository with `git init`, clone with `git clone [url]`

#### Curl

- Command-line tool for transferring data with URLs
- Supports numerous protocols (HTTP, HTTPS, FTP, etc.)
- Used for downloading files, API testing, and scripting
- Essential for many installation scripts and system tools
- Usage: Download file with `curl -O [url]`, make API requests with `curl [url]`

#### jq JSON processor
- command-line JSON processor.
- 

## 2. Oh-My-Zsh Installation and Configuration

### Install Oh-My-Zsh

**Action:** Install Oh-My-Zsh to enhance your Zsh shell experience

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**Details:**

- Oh-My-Zsh is a framework for managing Zsh configuration
- Provides hundreds of plugins and themes
- Simplifies Zsh configuration with pre-configured settings
- The installation script downloads and sets up the framework
- Creates a `.zshrc` configuration file in your home directory
- May prompt you to set Zsh as your default shell if not already set

### Configure the Agnoster Theme

**Action:** Set the Agnoster theme in Oh-My-Zsh

```bash
# Edit the .zshrc file
nano ~/.zshrc
```

**Action:** Find the line that starts with `ZSH_THEME=` and change it to:

```
ZSH_THEME="mikeh"
```

**Action:** Save the file and exit the editor (Ctrl+O, Enter, Ctrl+X in nano)

**Action:** Apply the changes by reloading the shell configuration

```bash
source ~/.zshrc
```

**Details:**

- The Agnoster theme provides a powerline-style prompt
- Shows git status information when in git repositories
- Displays current directory, user, and host information
- Uses color-coding to indicate command success/failure
- Requires a powerline-compatible font for proper display

### Install Powerline Fonts (Optional)

For the best experience with the Agnoster theme, you may need to install powerline fonts on your local machine (not the server).

**Note:** This step is for your local computer, not the server.

- For Windows with PuTTY: Configure PuTTY to use a powerline-compatible font
- For macOS/Linux terminals: Install powerline fonts locally

## 3. Additional Configuration Recommendations

### Customize Zsh with Plugins

**Action:** Edit your `.zshrc` file to enable useful plugins

```bash
nano ~/.zshrc
```

**Action:** Find the plugins line and modify it to include additional plugins:

```
plugins=(git docker sudo web-search history-substring-search)
```

**Details:**

- `git`: Provides git aliases and functions
- `docker`: Adds completion and aliases for Docker commands
- `sudo`: Press ESC twice to add sudo to the beginning of your command
- `web-search`: Enables searching the web from the terminal
- `history-substring-search`: Improves history search functionality

### Configure Tmux for Improved Usability

**Action:** Create a basic tmux configuration file

```bash

touch ~/.tmux.conf

cat > ~/.tmux.conf << EOF
# Enable mouse mode
set -g mouse on

# Start window numbering at 1
set -g base-index 1

# Set easier window split keys
bind-key v split-window -h
bind-key h split-window -v

# Set easier window movement keys
bind -n C-Left select-pane -L
bind -n C-Right select-pane -R
bind -n C-Up select-pane -U
bind -n C-Down select-pane -D

# Shift arrow to switch windows
bind -n S-Left  previous-window
bind -n S-Right next-window

# Easy config reload
bind-key r source-file ~/.tmux.conf \; display-message "tmux.conf reloaded."
EOF
```

**Action:** Apply the configuration

To apply the new tmux configuration:

1.  **If you are already inside a tmux session:**
    You can reload the configuration by pressing `Ctrl+b` then `r` (if you used the example configuration which binds `r` to reload), or by running the command:

    ```bash

    tmux

    tmux source-file ~/.tmux.conf
    ```

2.  **If you are not inside a tmux session:**
    Simply start a new tmux session. Tmux will automatically load the `~/.tmux.conf` file when it starts.

    ```bash

    ```

    Or, to start a named session:

    ```bash
    tmux new -s my_session_name
    ```

**Details:**

- The provided `~/.tmux.conf` content enables mouse support, sets easier keybindings for splitting windows and navigating panes, and binds `Ctrl+b` then `r` to reload the configuration from within tmux.
- Tmux automatically reads `~/.tmux.conf` when a new server (and its first session) starts.
- The `tmux source-file` command sends a command to an existing tmux server to reload the specified configuration file. If no server is running for the current user, this command will result in an error like "error connecting to /tmp/tmux-[UID]/default (No such file or directory)".

## 4. Verification and Testing

**Action:** Verify that all tools are installed and working correctly

```bash
# Test Zsh
echo $SHELL  # Should return /usr/bin/zsh or similar

# Test Oh-My-Zsh
ls -la ~ | grep .oh-my-zsh  # Should show the .oh-my-zsh directory

# Test Tmux
tmux -V  # Should display the installed version

# Test Neofetch
neofetch  # Should display system information

# Test Htop
htop --version  # Should display the installed version
# Press q to exit htop if it launches

# Test Git
git --version  # Should display the installed version

# Test Curl
curl --version  # Should display the installed version
```

## Troubleshooting

### Oh-My-Zsh Installation Issues

If you encounter issues with the Oh-My-Zsh installation:

1. Ensure you have curl installed: `sudo apt install -y curl`
2. Try the alternative installation method with wget:
   ```bash
   sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```
3. Check for errors in the installation output

### Theme Display Issues

If the Agnoster theme doesn't display correctly:

1. Ensure your terminal supports Unicode characters
2. Install a powerline-compatible font on your local machine
3. Configure your terminal emulator to use the powerline font
4. Try a different theme by changing `ZSH_THEME` in your `.zshrc`

### General Package Issues

If you encounter issues with any package installation:

1. Update your package lists again: `sudo apt update`
2. Check for specific error messages
3. Try installing packages one by one to identify problematic packages
4. Consult the package documentation or community forums for specific issues

### Customizing Agnoster Theme Colors

If you want to customize the colors of the Agnoster theme, you have several options:

#### Option 1: Modify the Theme File Directly

```bash
# Open the Agnoster theme file in an editor
nano ~/.oh-my-zsh/themes/agnoster.zsh-theme
```

Look for color definitions near the top of the file. They typically use variables like these:

```bash
# Colors
BLACK=0
RED=1
GREEN=2
YELLOW=3
BLUE=4
MAGENTA=5
CYAN=6
WHITE=7
```

And color setting functions like:

```bash
# Color setup
prompt_segment() {
  local bg fg
  [[ -n $1 ]] && bg="%K{$1}" || bg="%k"
  [[ -n $2 ]] && fg="%F{$2}" || fg="%f"
  echo -n "%{$bg%}%{$fg%} "
  [[ -n $3 ]] && echo -n $3
}
```

You can modify these values to change the colors of different segments.

#### Option 2: Override Theme Functions in .zshrc (Recommended)

Instead of modifying the theme file (which might be overwritten during updates), you can override specific functions in your `.zshrc` file:

```bash
# Edit your .zshrc file
nano ~/.zshrc
```

#### Option 3: Using Environment Variables

Some themes support environment variables for color configuration. Add these to your `.zshrc`:

```bash
# Add to your .zshrc
# Default username to hide in prompt (if you don't want to see username@host)
DEFAULT_USER="yourusername"

# Define custom colors for specific segments
AGNOSTER_DIR_BG="blue"       # Background color for directory segment
AGNOSTER_DIR_FG="white"      # Foreground color for directory segment
AGNOSTER_GIT_CLEAN_BG="green" # Background for clean git status
AGNOSTER_GIT_DIRTY_BG="yellow" # Background for dirty git status
```

#### Color Reference

You can use either color names or numbers:

- Names: black, red, green, yellow, blue, magenta, cyan, white
- Numbers: 0-7 for basic colors, 8-15 for bright variants
- 256 color codes: 16-255 for more color options

For 256 color support, you can use numbers like:

```bash
prompt_segment 202 0 # Orange background with black text
```

#### Testing Available Colors

You can install a tool to help visualize all available colors:

```bash
# Install colortest tool
curl -o ~/colortest.sh https://raw.githubusercontent.com/gawin/bash-colors-256/master/colors.sh
chmod +x ~/colortest.sh
~/colortest.sh
```

This will show you all available colors with their corresponding codes, making it easier to choose the colors you want.

---
