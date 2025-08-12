***
tags: #powershell #network
***
# PowerShell Network Information 

This document provides PowerShell commands to retrieve your public IP address and detailed network information.

## One-Liner for Quick Public IP

If you just need a quick one-liner to get your public IP address:

```powershell
(Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing).Content

# Alternative with ipinfo.io (returns JSON with additional data)
(Invoke-WebRequest -Uri "https://ipinfo.io/json").Content | ConvertFrom-Json

```

## Getting Your Public IP Address

There are several ways to retrieve your public IP address using PowerShell:

### Method 1: Using an External Service

```powershell
# Using ipify API
(Invoke-WebRequest -Uri "https://api.ipify.org").Content

# Alternative with icanhazip
(Invoke-WebRequest -Uri "https://icanhazip.com").Content

# Alternative with ipinfo.io (returns JSON with additional data)
(Invoke-WebRequest -Uri "https://ipinfo.io/json").Content | ConvertFrom-Json
```

### Method 2: Using DNS Services

```powershell
# Using OpenDNS
(Resolve-DnsName -Name myip.opendns.com -Server resolver1.opendns.com).IPAddress
```

## Getting Detailed Network Information

### Basic Network Adapter Information

```powershell
# List all network adapters
Get-NetAdapter | Format-Table Name, InterfaceDescription, Status, LinkSpeed -AutoSize

# Show only connected adapters
Get-NetAdapter | Where-Object Status -eq "Up" | Format-Table Name, InterfaceDescription, LinkSpeed -AutoSize
```

### IP Configuration (Similar to ipconfig)

```powershell
# Get all IP configurations
Get-NetIPConfiguration | Format-Table InterfaceAlias, InterfaceDescription, IPv4Address, IPv4DefaultGateway -AutoSize

# Get only IPv4 addresses of connected adapters
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch "Loopback" } | Format-Table InterfaceAlias, IPAddress, PrefixLength -AutoSize
```

### Network Statistics

```powershell
# Get TCP connection statistics
Get-NetTCPConnection | Group-Object State, RemoteAddress | Sort-Object Count -Descending | Format-Table Name, Count -AutoSize

# Get network interface statistics
Get-NetAdapterStatistics | Format-Table Name, ReceivedBytes, SentBytes -AutoSize
```

### DNS Client Information

```powershell
# Get DNS client server addresses
Get-DnsClientServerAddress | Where-Object AddressFamily -eq 2 | Format-Table InterfaceAlias, ServerAddresses -AutoSize

# Get DNS client cache
Get-DnsClientCache | Format-Table Name, Data -AutoSize
```

### Wi-Fi Networks (If Applicable)

```powershell
# Show available Wi-Fi networks
Get-NetAdapter | Where-Object { $_.InterfaceDescription -match 'Wireless' -or $_.InterfaceDescription -match 'Wi-Fi' } | ForEach-Object {
    netsh wlan show networks interface="$($_.Name)" mode=Bssid
}

# Show Wi-Fi connection profiles
netsh wlan show profiles
```

## Comprehensive Network Report

The following script creates a comprehensive network information report:

```powershell
# Create a comprehensive network report
$report = [ordered]@{}

# Public IP
try {
    $report["Public IP"] = (Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing).Content
} catch {
    $report["Public IP"] = "Unable to retrieve (check internet connection)"
}

# Computer Name and Domain
$report["Computer Name"] = $env:COMPUTERNAME
$report["Domain"] = $env:USERDOMAIN

# Network Adapters
$report["Network Adapters"] = Get-NetAdapter | Where-Object Status -eq "Up" | 
    Select-Object Name, InterfaceDescription, Status, LinkSpeed

# IP Configuration
$report["IP Configuration"] = Get-NetIPConfiguration | 
    Select-Object InterfaceAlias, IPv4Address, IPv4DefaultGateway

# DNS Servers
$report["DNS Servers"] = Get-DnsClientServerAddress -AddressFamily IPv4 | 
    Where-Object {$_.ServerAddresses -ne $null} | 
    Select-Object InterfaceAlias, ServerAddresses

# Network Connectivity
$report["Internet Connectivity"] = Test-NetConnection -CommonTCPPort HTTP -InformationLevel Quiet

# Output the report
$report.GetEnumerator() | ForEach-Object {
    Write-Host "`n$($_.Key):" -ForegroundColor Green
    $_.Value | Format-List
}
```

## One-Liner for Quick Public IP

If you just need a quick one-liner to get your public IP address:

```powershell
(Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing).Content
```

Save these commands to a PowerShell script (`.ps1` file) for easy access whenever you need network information.