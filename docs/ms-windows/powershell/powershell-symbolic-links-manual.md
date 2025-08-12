# PowerShell Symbolic Links Manual

## Table of Contents
1. [[#Introduction]]
2. [[#Prerequisites]]
3. [[#Understanding Link Types]]
4. [[#Creating Symbolic Links]]
5. [[#Managing Symbolic Links]]
6. [[#Advanced Operations]]
7. [[#Hidden Utilities and Tips]]
8. [[#Troubleshooting]]
9. [[#Best Practices]]
10. [[#Security Considerations]]

---

## Introduction

Symbolic links are powerful file system features that create references to other files or directories. They act as shortcuts that appear and behave like the original files/folders but point to different locations. This manual covers comprehensive PowerShell operations for symbolic links on Windows systems.

---

## Prerequisites

- Windows 10/11 or Windows Server 2016+
- PowerShell 5.1 or PowerShell Core 6+
- Administrator privileges (for most symbolic link operations)
- Developer Mode enabled (alternative to admin rights for symlinks)

### Enable Developer Mode (Windows 10/11)
```powershell
# Check current developer mode status
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

# Enable via Settings > Update & Security > For developers > Developer mode
# Or use Group Policy for enterprise environments
```

---

## Understanding Link Types

### 1. Symbolic Links (Symlinks)
- Work across different drives and file systems
- Can point to files or directories
- Require admin privileges (unless Developer Mode is enabled)
- Support relative and absolute paths

### 2. Hard Links
- Point to the same file data on disk
- Must be on the same volume
- Only work with files, not directories
- Don't require admin privileges

### 3. Junctions
- Directory-only symbolic links
- Work only on NTFS file systems
- Must be on the same volume
- Don't require admin privileges

---

## Creating Symbolic Links

### Basic Syntax
```powershell
New-Item -ItemType SymbolicLink -Path <LinkPath> -Target <TargetPath>
```

### File Symbolic Links
```powershell
# Create a symbolic link to a file
New-Item -ItemType SymbolicLink -Path "C:\MyLink.txt" -Target "D:\OriginalFile.txt"

# Create with custom name
New-Item -ItemType SymbolicLink -Path "C:\Documents\ImportantFile.txt" -Target "E:\Archive\document_v1.txt"
```

### Directory Symbolic Links
```powershell
# Create a symbolic link to a directory
New-Item -ItemType SymbolicLink -Path "C:\ProjectLink" -Target "D:\Development\MyProject"

# Create nested directory link
New-Item -ItemType SymbolicLink -Path "C:\Users\Public\SharedDocs" -Target "\\NetworkShare\Documents"
```

### Relative Path Links
```powershell
# Using relative paths
Set-Location "C:\Projects"
New-Item -ItemType SymbolicLink -Path "CurrentProject" -Target "..\Archive\Project2023"
```

### Batch Creation
```powershell
# Create multiple symbolic links
$links = @{
    "C:\Quick\Documents" = "D:\UserData\Documents"
    "C:\Quick\Downloads" = "D:\UserData\Downloads"
    "C:\Quick\Pictures" = "D:\UserData\Pictures"
}

foreach ($link in $links.GetEnumerator()) {
    New-Item -ItemType SymbolicLink -Path $link.Key -Target $link.Value -Force
}
```

---

## Managing Symbolic Links

### Listing Symbolic Links

#### Find All Symbolic Links in Directory
```powershell
# Get symbolic links in current directory
Get-ChildItem | Where-Object { $_.LinkType -eq "SymbolicLink" }

# Get symbolic links recursively
Get-ChildItem -Recurse | Where-Object { $_.LinkType -eq "SymbolicLink" }

# Detailed view with target information
Get-ChildItem | Where-Object { $_.LinkType -eq "SymbolicLink" } | Select-Object Name, Target, LinkType
```

#### Custom Function to List All Links
```powershell
function Get-SymbolicLinks {
    param(
        [string]$Path = ".",
        [switch]$Recurse
    )
    
    $params = @{
        Path = $Path
        Recurse = $Recurse
    }
    
    Get-ChildItem @params | Where-Object { 
        $_.LinkType -in @("SymbolicLink", "Junction", "HardLink") 
    } | Select-Object Name, FullName, Target, LinkType, @{
        Name = "TargetExists"
        Expression = { Test-Path $_.Target }
    }
}

# Usage
Get-SymbolicLinks -Path "C:\" -Recurse
```

### Removing Symbolic Links

#### Basic Removal
```powershell
# Remove a symbolic link
Remove-Item "C:\MyLink.txt"

# Remove directory symbolic link
Remove-Item "C:\ProjectLink"

# Force removal (ignore errors)
Remove-Item "C:\MyLink" -Force
```

#### Safe Removal Function
```powershell
function Remove-SymbolicLink {
    param(
        [string]$Path,
        [switch]$WhatIf
    )
    
    if (-not (Test-Path $Path)) {
        Write-Warning "Path does not exist: $Path"
        return
    }
    
    $item = Get-Item $Path
    if ($item.LinkType -ne "SymbolicLink") {
        Write-Warning "Item is not a symbolic link: $Path"
        return
    }
    
    if ($WhatIf) {
        Write-Host "Would remove symbolic link: $Path -> $($item.Target)"
    } else {
        Remove-Item $Path
        Write-Host "Removed symbolic link: $Path"
    }
}

# Usage
Remove-SymbolicLink -Path "C:\MyLink" -WhatIf
Remove-SymbolicLink -Path "C:\MyLink"
```

### Updating/Modifying Symbolic Links

#### Update Target
```powershell
# Remove and recreate with new target
Remove-Item "C:\MyLink"
New-Item -ItemType SymbolicLink -Path "C:\MyLink" -Target "D:\NewTarget"

# Function to update symbolic link
function Update-SymbolicLink {
    param(
        [string]$Path,
        [string]$NewTarget
    )
    
    if (Test-Path $Path) {
        $item = Get-Item $Path
        if ($item.LinkType -eq "SymbolicLink") {
            Remove-Item $Path
            New-Item -ItemType SymbolicLink -Path $Path -Target $NewTarget
            Write-Host "Updated symbolic link: $Path -> $NewTarget"
        }
    }
}
```

---

## Advanced Operations

### Working with Network Paths
```powershell
# Create symbolic link to network share
New-Item -ItemType SymbolicLink -Path "C:\NetworkDocs" -Target "\\Server\Share\Documents"

# UNC path symbolic links
New-Item -ItemType SymbolicLink -Path "C:\RemoteProject" -Target "\\192.168.1.100\Projects\CurrentWork"
```

### Cross-Drive Symbolic Links
```powershell
# Link from C: to E: drive
New-Item -ItemType SymbolicLink -Path "C:\DataLink" -Target "E:\LargeDataset"

# Multiple drive configuration
$drives = @("D:", "E:", "F:")
foreach ($drive in $drives) {
    New-Item -ItemType SymbolicLink -Path "C:\Drives\$($drive.TrimEnd(':'))" -Target "$drive\"
}
```

### Conditional Link Creation
```powershell
function New-ConditionalSymbolicLink {
    param(
        [string]$Path,
        [string]$Target,
        [switch]$OverwriteExisting
    )
    
    # Check if target exists
    if (-not (Test-Path $Target)) {
        Write-Error "Target does not exist: $Target"
        return
    }
    
    # Check if link path already exists
    if (Test-Path $Path) {
        if ($OverwriteExisting) {
            Remove-Item $Path -Force
        } else {
            Write-Warning "Path already exists: $Path"
            return
        }
    }
    
    # Create the symbolic link
    try {
        New-Item -ItemType SymbolicLink -Path $Path -Target $Target -ErrorAction Stop
        Write-Host "Created symbolic link: $Path -> $Target"
    }
    catch {
        Write-Error "Failed to create symbolic link: $($_.Exception.Message)"
    }
}
```

---

## Hidden Utilities and Tips

### Using fsutil (Advanced)
```powershell
# Create symbolic link using fsutil
cmd /c fsutil reparsepoint query "C:\MyLink"

# List reparse points (includes symlinks)
cmd /c fsutil reparsepoint query "C:\" /R

# Delete reparse point
cmd /c fsutil reparsepoint delete "C:\MyLink"
```

### PowerShell Core Differences
```powershell
# PowerShell Core 6+ has enhanced symbolic link support
if ($PSVersionTable.PSVersion.Major -ge 6) {
    # Better cross-platform support
    New-Item -ItemType SymbolicLink -Path "/mnt/c/link" -Target "/mnt/d/target"
}
```

### Registry Inspection
```powershell
# Check symbolic link policy in registry
$regPath = "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem"
Get-ItemProperty -Path $regPath -Name "SymlinkEvaluation" -ErrorAction SilentlyContinue
```

### Alternative Creation Methods
```powershell
# Using .NET Framework
[System.IO.Directory]::CreateSymbolicLink("C:\MyLink", "D:\Target")

# Using COM object (older method)
$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut("C:\MyLink.lnk")
$shortcut.TargetPath = "D:\Target"
$shortcut.Save()
```

### Bulk Operations
```powershell
# Create symbolic links from CSV file
$linkData = Import-Csv "links.csv"  # Columns: LinkPath, TargetPath
foreach ($link in $linkData) {
    New-Item -ItemType SymbolicLink -Path $link.LinkPath -Target $link.TargetPath
}

# Export current symbolic links to CSV
Get-ChildItem -Recurse | Where-Object { $_.LinkType -eq "SymbolicLink" } | 
    Select-Object FullName, Target | 
    Export-Csv "current_links.csv" -NoTypeInformation
```

---

## Troubleshooting

### Common Issues and Solutions

#### Permission Denied
```powershell
# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "Run PowerShell as Administrator to create symbolic links"
    # Restart as admin
    Start-Process powershell -Verb RunAs
    exit
}
```

#### Broken Symbolic Links
```powershell
# Find broken symbolic links
function Find-BrokenSymbolicLinks {
    param([string]$Path = ".")
    
    Get-ChildItem -Path $Path -Recurse | 
        Where-Object { $_.LinkType -eq "SymbolicLink" -and -not (Test-Path $_.Target) } |
        Select-Object FullName, Target
}

# Clean up broken links
Find-BrokenSymbolicLinks | ForEach-Object { 
    Write-Host "Removing broken link: $($_.FullName)"
    Remove-Item $_.FullName 
}
```

#### Path Length Issues
```powershell
# Enable long path support
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1

# Use short path names for long paths
$shortPath = (New-Object -ComObject Scripting.FileSystemObject).GetFolder($longPath).ShortPath
```

### Diagnostic Functions
```powershell
function Test-SymbolicLink {
    param([string]$Path)
    
    if (-not (Test-Path $Path)) {
        return @{ IsSymbolicLink = $false; Exists = $false }
    }
    
    $item = Get-Item $Path
    $result = @{
        IsSymbolicLink = ($item.LinkType -eq "SymbolicLink")
        Exists = $true
        Target = $item.Target
        TargetExists = if ($item.Target) { Test-Path $item.Target } else { $null }
        LinkType = $item.LinkType
    }
    
    return $result
}
```

---

## Best Practices

### Naming Conventions
```powershell
# Use descriptive names
New-Item -ItemType SymbolicLink -Path "C:\CurrentProject_Link" -Target "D:\Projects\Project2024"

# Avoid spaces in link names when possible
New-Item -ItemType SymbolicLink -Path "C:\ProjectData" -Target "D:\Project Data\Current"
```

### Documentation
```powershell
# Create a symbolic link inventory
function New-SymbolicLinkInventory {
    $inventory = @()
    Get-ChildItem -Recurse | Where-Object { $_.LinkType -eq "SymbolicLink" } | ForEach-Object {
        $inventory += [PSCustomObject]@{
            LinkPath = $_.FullName
            Target = $_.Target
            Created = $_.CreationTime
            Purpose = Read-Host "Purpose for $($_.Name)"
        }
    }
    $inventory | Export-Csv "SymbolicLink_Inventory.csv" -NoTypeInformation
}
```

### Backup Strategy
```powershell
# Backup symbolic link configuration
function Backup-SymbolicLinks {
    param([string]$BackupPath = ".\symlink_backup.json")
    
    $links = Get-ChildItem -Recurse | Where-Object { $_.LinkType -eq "SymbolicLink" } |
        Select-Object FullName, Target, CreationTime
    
    $links | ConvertTo-Json | Out-File $BackupPath
    Write-Host "Symbolic links backed up to: $BackupPath"
}

# Restore symbolic links from backup
function Restore-SymbolicLinks {
    param([string]$BackupPath)
    
    $links = Get-Content $BackupPath | ConvertFrom-Json
    foreach ($link in $links) {
        if (-not (Test-Path $link.FullName)) {
            New-Item -ItemType SymbolicLink -Path $link.FullName -Target $link.Target
        }
    }
}
```

---

## Security Considerations

### Permission Checks
```powershell
# Verify symbolic link security
function Test-SymbolicLinkSecurity {
    param([string]$Path)
    
    $acl = Get-Acl $Path
    $acl.Access | Where-Object { 
        $_.FileSystemRights -match "FullControl|Modify" -and 
        $_.IdentityReference -notmatch "SYSTEM|Administrators" 
    }
}
```

### Restricted Environments
```powershell
# Check group policy restrictions
$gpoSettings = Get-ItemProperty "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Explorer" -ErrorAction SilentlyContinue
if ($gpoSettings.NoResolveSearch -eq 1) {
    Write-Warning "Group Policy may restrict symbolic link resolution"
}
```

### Audit Trail
```powershell
# Log symbolic link operations
function Write-SymbolicLinkLog {
    param(
        [string]$Action,
        [string]$LinkPath,
        [string]$Target
    )
    
    $logEntry = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Action - Link: $LinkPath - Target: $Target - User: $env:USERNAME"
    Add-Content -Path "C:\Logs\SymbolicLinks.log" -Value $logEntry
}
```

---

This manual provides comprehensive coverage of PowerShell symbolic link operations. For additional help, use `Get-Help New-Item -Examples` and `Get-Help Remove-Item -Examples` in PowerShell.