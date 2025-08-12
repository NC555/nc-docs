# 🐧 File & Directory Management Guide

---

## 📚 Table of Contents

1. [[#🔨 Core Operations]]
2. [[#🔁 Advanced File Tools]]
3. [[#🗜️ Compression & Extraction]]
4. [[#🔐 Permissions & Security]]
5. [[#🤖 Scripting & Automation]]
6. [[#🧹 Cleanup & Recovery]]
7. [[#🧩 Aliases & Tips]]
8. [[#✂️ Copy & Paste, Cut & Paste Workflows]]

## 🔨 Core Operations

### 🆕 Create

| Command                   | Use Case           | Arguments        |
| ------------------------- | ------------------ | ---------------- |
| `touch file.txt`          | Creates empty file | `file.txt`       |
| `echo "text" > file.txt`  | Writes content     | `-` (overwrites) |
| `mkdir dir`               | Creates directory  | `-p` (nested)    |
| `mkdir -m 700 secure_dir` | Sets permissions   | `-m` (mode)      |

**Example:**

```bash
touch config.yaml
mkdir -p project/{src,tests,data}
```

---

### 🔄 Rename

| Command                          | Use Case        | Notes          |     |
| -------------------------------- | --------------- | -------------- | --- |
| `mv old new`                     | File/dir rename | -              |     |
| `rename -n 's/.bak/.log/' *.bak` | Batch rename    | `-n` = dry-run |     |

**Example:**

```bash
mv report.doc docs/2024_report.doc
rename 's/\ /_/' *.txt  # Replace spaces in file names
```

---

### 🔂 Copy

| Command                 | Use Case     | Flags              |
| ----------------------- | ------------ | ------------------ |
| `cp file dest/`         | Copy files   | `-r` (dir)         |
| `cp -a source/ backup/` | Archive copy | `-a` = `--archive` |
| `cp -i file1 file2`     | Interactive  | `-i` = prompt      |

**Example:**

```bash
cp -r website/ backup_website/
rsync -avz local/ remote_user@host:remote_dir/  # Secure sync
```

---

### 🗑️ Delete

| Command        | Use Case         | Flags           |
| -------------- | ---------------- | --------------- |
| `rm file.txt`  | File deletion    | `-i` (confirm)  |
| `rmdir dir`    | Remove empty dir | -               |
| `rm -rf path/` | Recursive delete | `**DANGEROUS**` |

**Example:**

```bash
rm -i *.bak
rm -rf temp/logs/
```

---

## 🔁 Advanced File Tools

### 🔍 find

```bash
find /var -type f -mtime +7 -exec rm -f {} \;  # Delete 7-day-old files
find . -name "*.tmp" -delete                 # Fast cleanup
```

### 🔄 rename

```bash
rename -n 's/-/./' *.jpeg     # Replace hyphens with dots
rename 'BEGIN{$c=1} s/\.csv$/.backup_$c.csv/' *.csv  # Add counter
```

### 🛠️ diff & patch

```bash
diff -r dir1 dir2          # Compare directories
patch < changes.patch      # Apply changes to source
```

---

## 🗜️ Compression & Extraction

### 📦 zip

```bash
zip -r archive.zip project/      # Compress directory
unzip -l archive.zip             # List contents
unzip -o legacy.zip -d modern/   # Convert file names (Windows→Linux)
```

### 📦 tar

```bash
tar cvzf backup.tar.gz dir/        # Compress with gzip
tar xvzf backup.tar.gz -C restore/ # Extract to specific directory
```

---

## 🔐 Permissions & Security

### 💾 chmod

```bash
chmod u+x script.sh           # User executable
chmod 600 private_key         # Owner read/write only
chmod 755 /var/www/html/      # Web server permissions
```

### 🧑‍🔧 chown

```bash
chown user:group file.txt
chown -R www-data:www-data web/  # Recursively change ownership
```

---

## 🤖 Scripting & Automation

### 🔄 Batch Processing

```bash
for f in *.md; do pandoc "$f" -o "${f%.md}.html"; done  # Convert MD to HTML
```

### 🧠 inotify (File Monitoring)

```bash
inotifywait -m -r -e create,modify /watched_dir  # Watch for changes
```

### 🕹️ rsync (Advanced Sync)

```bash
rsync -a --delete source/ user@host:/dest/  # Mirror source in destination
rsync -e "ssh -i key.pem" local/ remote/  # Custom SSH key
```

---

## 🧹 Cleanup & Recovery

### 🧹 Daily Maintenance

```bash
find /tmp -type f -name "*.tmp" -delete     # Clear temp files
tar cvzf logs_$(date +%F).tar.gz /var/log/  # Backup and compress logs
```

### 🧭 Log Rotation

```bash
logrotate -f /etc/logrotate.conf  # Forcibly rotate logs
```

---

## 🧩 Aliases & Tips

### 🧰 Add to `.bashrc`

```bash
alias ll='ls -la'
alias cp='cp -i'
alias mv='mv -i'
alias rm='rm -i'
```

### 🚨 Safety First

```bash
alias rm='rm -i'            # Always prompt for safety
alias diff='diff -u'        # Unified diffs by default
```

---

## ✂️ Copy & Paste, Cut & Paste Workflows

### 📁 **Copy & Paste (Content Transfer)**

| Task                                 | Command & Flags                      | Use Case                                |
| ------------------------------------ | ------------------------------------ | --------------------------------------- |
| Copy file content to new file        | `cat source > destination`           | `cat file1.txt > file2.txt` (overwrite) |
| Append content to file               | `cat >> file.txt`                    | `cat <<EOF >> file.txt` (multi-line)    |
| Paste from clipboard **(GUI tools)** | `xclip -o`                           | Only in GUI environments                |
| Paste via output redirection         | `echo "text" > file.txt`             | Single-line overwrites                  |
| Copy lines between files             | `sed -n '3,5 p' file.txt >> new.txt` | Extract and append lines 3–5            |

**Examples:**

```bash
cat config.txt > new_config.txt         # Overwrite new file with content
echo "New line" >> log.txt              # Append to log
cat <<EOF >> script.sh
echo "Hello from EOF"
EOF
```

---

### ✂️ **Cut & Paste (Move + Append)**

| Task                                | Command & Flags                                           | Use Case                 |
| ----------------------------------- | --------------------------------------------------------- | ------------------------ |
| Move file and append to destination | `mv file.txt && cat file.txt >> destination.txt`          | Combine move and paste   |
| Move directory and restructure      | `rsync -a --remove-source-files src/ dest/ && rmdir src/` | Cut + paste with cleanup |
| Cut text from line in file          | `sed -i '1d' file.txt && cat file.txt >> newfile.txt`     | Delete + append          |

**Examples:**

```bash
mv log2024.txt logs_dir/            # Cut to directory
cat logs_dir/log2024.txt >> combined_logs.txt  # Paste content
sed -i '2d' data.csv && cat data.csv >> cleaned_data.csv  # Remove line 2 + append
```

---

---

**[Up: Introduction](./get-started-with-a-new-linux-vps.md)** | **[Previous: Deploying Coolify](./get-started-with-a-new-linux-vps.md)** | **[Next: (Back to Introduction)](./get-started-with-a-new-linux-vps.md)**
