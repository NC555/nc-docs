---
title: "Virtual Private Network"
description: "Virtual Private Network is the overall technology/method for creating secure connections over the internet"
tags: ["aws", "infrastructure", "networking", "vpn"]
author: "Nati Cabti"
date: "2025-08-11"
---

# Virtual Private Network (VPN)

AWS Virtual Private Network (AWS VPN) establishes a secure and private tunnel from your network or device to the AWS Cloud.

- It essentially creates a private `"tunnel"` through which your data travels safely.
- You can extend your existing on-premises network into an AWS VPC

<div class="aws__DoubleLogosWrapper">
    <div class="aws__ImageAligned">
      <img style={{ width: '96px', overflowX: 'auto' }} src="/img/aws/aws-logo-virtual-private-network-gatweway.png" alt="Public Subnet" />
      <span>[Virtual Private Network Gateway](./virtual-private-network-gateway.md)<br/></span>
    </div>
</div>

## Key purposes of VPNs

- **Security and Privacy :** VPNs encrypt your data, protecting it from hackers.

- **Remote Access :** Employees can securely access their company's internal network and resources from anywhere.

- **Bypassing Geographic Restrictions:** : Allowing access to region-locked content or services.

- **Circumventing Censorship:** VPNs can help access blocked websites and services.

## Types of VPNs:

- **Consumer VPNs -** Services like NordVPN, ExpressVPN for personal privacy
- **Corporate VPNs -** Company-provided access for remote workers
- **Site-to-Site VPNs -** Connecting entire networks (like branch offices to headquarters)

<div class="aws__ImageCentered" >
<img style={{ background: '#f6f9fd', width: '500px', overflowX: 'auto' }} src="/img/aws/aws-networking-vpn-connection.png" alt="VPN Connection" />
</div>
