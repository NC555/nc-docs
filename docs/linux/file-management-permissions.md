---
tags:
  - linux
  - permissions
  - security
---

# Linux File Management & Permissions Manual

## Overview

In Linux/Unix systems, every file and directory is assigned ownership and a set of permissions. This security model controls which users can read, write to, or execute files, forming a core part of the system's security architecture. This manual covers how to view, understand, and modify these permissions.

Basic commands covered: `ls`, `chmod`, `chown`, `chgrp`, `umask`.

## Viewing Permissions

The `ls -l` command provides a long format listing that includes detailed permission information for files and directories.

```bash
ls -l
```

**Example Output:**

```
-rwxr-xr-x 1 Nati developers 4520 Oct 26 15:30 my_script.sh
drwxr-xr-- 1 Nati developers 4096 Oct 25 11:12 project_files
```

### Breakdown of `ls -l` Output

| Component       | Example        | Description                                                                                   |
| :-------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| **File Type**   | `-` or `d`     | The first character indicates the type (`-` for file, `d` for directory, `l` for link, etc.). |
| **Permissions** | `rwxr-xr-x`    | A 9-character string representing permissions for the owner, group, and others.               |
| **Links**       | `1`            | Number of hard links to the file.                                                             |
| **Owner**       | `Nati`         | The user who owns the file.                                                                   |
| **Group**       | `developers`   | The group that owns the file.                                                                 |
| **Size**        | `4520`         | File size in bytes. Use `ls -lh` for human-readable sizes.                                    |
| **Timestamp**   | `Oct 26 15:30` | Last modification time.                                                                       |
| **Filename**    | `my_script.sh` | The name of the file or directory.                                                            |

## Understanding Permissions

Permissions are managed in three sets for three types of users:

- **Owner (u):** The user who created or owns the file.
- **Group (g):** The group associated with the file. Users in this group share permissions.
- **Other (o):** All other users on the system.

Each set can have three basic permissions:

- **Read (r):** View the contents of a file or list the contents of a directory.
- **Write (w):** Modify or delete a file, or create/delete files within a directory.
- **Execute (x):** Run a file as a program or script, or enter (`cd` into) a directory.

<img style={{ overflowX: 'scroll' }} src="/img/linux/linux-file-permissions.png" alt="Linux File Management & Permissions" />

### Permission Representation

Permissions can be represented symbolically (`rwx`) or numerically (octal). The numerical values are:

- **Read (r)** = 4
- **Write (w)** = 2
- **Execute (x)** = 1

These values are added together for each user set (Owner, Group, Other).

| Binary | Octal     | String Representation | Permissions            |
| :----- | :-------- | :-------------------- | :--------------------- |
| `000`  | 0 (0+0+0) | `---`                 | No Permission          |
| `001`  | 1 (0+0+1) | `--x`                 | Execute                |
| `010`  | 2 (0+2+0) | `-w-`                 | Write                  |
| `011`  | 3 (0+2+1) | `-wx`                 | Write + Execute        |
| `100`  | 4 (4+0+0) | `r--`                 | Read                   |
| `101`  | 5 (4+0+1) | `r-x`                 | Read + Execute         |
| `110`  | 6 (4+2+0) | `rw-`                 | Read + Write           |
| `111`  | 7 (4+2+1) | `rwx`                 | Read + Write + Execute |

**Example from Image:** `rwxr-xr-x`

- **Owner**: `rwx` -> 4 + 2 + 1 = **7**
- **Group**: `r-x` -> 4 + 0 + 1 = **5**
- **Other**: `r-x` -> 4 + 0 + 1 = **5**
- **Octal Representation:** `755`

## Modifying Permissions: `chmod`

The `chmod` (change mode) command is used to change the permissions of a file or directory. It can be used in two modes: symbolic and octal.
Basic syntax:

```
chmod [MODE] [FILE]...
```

### Symbolic Mode

Symbolic mode is more readable, as you specify which user to change (`u, g, o, a`), what operation to perform (`+, -, =`), and which permission to apply (`r, w, x`).

- **Users:** `u` (user/owner), `g` (group), `o` (other), `a` (all)
- **Operators:** `+` (add), `-` (remove), `=` (set exactly)

```bash
# Add execute permission for the owner (user)
chmod u+x my_script.sh

# Remove write permission for the group and others
chmod go-w sensitive_data.log

# Set permissions for others to be read-only
chmod o=r public_info.txt

# Give all users read permission
chmod a+r shared_file.txt
```

### Octal (Numeric) Mode

Octal mode is faster for setting all permissions at once using a 3-digit number representing owner, group, and other.

```bash
# Set rwxr-xr-x permissions (common for directories and scripts)
chmod 755 my_script.sh

# Set rw-r--r-- permissions (common for regular files)
chmod 644 config.txt

# Set rwx------ permissions (owner has full access, nobody else has any)
chmod 700 private_key
```

## Modifying Ownership: `chown` & `chgrp`

### Change Owner: `chown`

The `chown` (change owner) command changes the user and/or group ownership of a file or directory.

```bash
# Change the owner of a file to 'newuser'
chown newuser somefile.txt

# Change both the owner to 'newuser' and group to 'newgroup'
chown newuser:newgroup somefile.txt

# Recursively change ownership of a directory and its contents
chown -R newuser:newgroup /path/to/directory
```

### Change Group: `chgrp`

The `chgrp` (change group) command changes only the group ownership.

```bash
# Change the group of a file to 'newgroup'
chgrp newgroup somefile.txt

# Recursively change the group of a directory
chgrp -R newgroup /path/to/directory
```

## Other Utilities for Best Practice

### Default Permissions: `umask`

The `umask` command controls the default permissions for newly created files and directories. It specifies which permissions to _remove_ from the base permissions (`666` for files, `777` for directories). A common `umask` is `022`.

- For files: `666 - 022 = 644` (`rw-r--r--`)
- For directories: `777 - 022 = 755` (`rwxr-xr-x`)

### Special Permissions

- **SUID (Set User ID):** When an executable with SUID is run, it runs with the permissions of the file _owner_, not the user who ran it. Represented by an `s` in the owner's execute permission field (`-rwsr-xr-x`).
  `chmod u+s executable` or `chmod 4755 executable`
- **SGID (Set Group ID):** Similar to SUID, but the process runs with the permissions of the file's _group_. For directories, new files created inside it inherit the directory's group. Represented by an `s` in the group's execute field (`-rwxr-sr-x`).
  `chmod g+s executable` or `chmod 2755 directory`
- **Sticky Bit:** When set on a directory, only the file's owner (or root) can delete or rename files within that directory, even if others have write permissions. Common on `/tmp`. Represented by a `t` in the other's execute field (`drwxrwxrwt`).
  `chmod +t directory` or `chmod 1777 directory`

### Security Considerations

- **Principle of Least Privilege:** Only grant the permissions that are absolutely necessary. `644` for files and `755` for directories is a secure default for most cases.
- **Private Files:** For sensitive files like SSH keys or password files, use strict permissions: `chmod 600 ~/.ssh/id_rsa`.
- **Audit Regularly:** Use `ls -lR` or `find` to periodically review permissions on your system, especially in web roots and user home directories.
