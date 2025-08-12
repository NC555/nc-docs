# User Account Management Guide

## Checking User Logins

There are several commands available to monitor user login activity on Ubuntu Server:

### View Recent Logins

```bash
last
```

Shows detailed list of all logins including username, terminal, IP address, and login/logout times.

### View Latest Login per User

```bash
lastlog
```

Displays the most recent login for each system user.

### Check Currently Logged In Users

```bash
who
```

or for more detailed information including user activity:

```bash
w
```

### View Failed Login Attempts

```bash
lastb
```

Requires root privileges to view failed login attempts.

### Check Specific User's Login History

```bash
last username
```

Note: Login logs are stored in:

- Successful logins: `/var/log/wtmp`
- Failed login attempts: `/var/log/btmp`

## Disabling User Accounts

There are multiple methods to disable a user account on Ubuntu Server:

### 1. Lock the User Account

```bash
sudo passwd -l username
```

This method locks the password while preserving the account and its files.

### 2. Change Login Shell

```bash
sudo usermod -s /usr/sbin/nologin username
```

Prevents interactive login while allowing user processes to continue running.

### 3. Expire the Account

```bash
sudo chage -E 0 username
```

Immediately expires the account.

## Re-Enabling User Accounts

To re-enable a disabled account:

### 1. Unlock the Account

```bash
sudo passwd -u username
```

### 2. Restore Login Shell

```bash
sudo usermod -s /bin/bash username
```

### 3. Remove Account Expiration

```bash
sudo chage -E -1 username
```

## Checking Account Status

### View Account Status

```bash
passwd -S username
```

or

```bash
chage -l username

response:
Last password change                                    : Jul 11, 2023
Password expires                                        : never
Password inactive                                       : never
Account expires                                         : Jan 01, 1970
Minimum number of days between password change          : 0
Maximum number of days between password change          : 99999
Number of days of warning before password expires       : 7



```

### Understanding Account Status Output

Example output:

```
bedev L 07/24/2023 0 99999 7 -1
  |   |     |      |   |   |  |
  |   |     |      |   |   |  └── Password expiration warning days (-1 means no warning)
  |   |     |      |   |   └──── Minimum days between password changes
  |   |     |      |   └──────── Maximum days until password change is required
  |   |     |      └─────────── Days since password was last changed
  |   |     └──────────────── Date of last password change
  |   └─────────────────────── Account status (L = locked)
  └───────────────────────── Username

```

Field breakdown:

1. Username (`bedev`)
2. Account status (`L` = locked)
3. Date of last password change (`07/24/2023`)
4. Days since password was last changed (`0`)
5. Maximum days until password change required (`99999`)
6. Minimum days between password changes (`7`)
7. Password expiration warning days (`-1` means no warning)

Account status indicators:

- `L`: Account is locked
- `P`: Account has valid password
- `NP`: No password set

## Best Practices

1. Always verify account status after making changes
2. Keep documentation of account modifications
3. Use appropriate method based on requirement:
   - Temporary disable: Use account locking
   - Permanent disable: Consider account expiration
   - Process-only access: Use shell modification
