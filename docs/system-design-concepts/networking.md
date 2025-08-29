---
title: "Networking"
description: "An overview of fundamental networking concepts, including IP addressing (IPv4, IPv6), the Internet Protocol, transport layer protocols (TCP and UDP), the Domain Name System (DNS), and essential network infrastructure components like firewalls and ports."
tags:
  [
    "networking",
    "tcp",
    "udp",
    "ip_address",
    "dns",
    "internet_protocol",
    "packet_header",
    "firewall",
    "port",
    "ipv4",
    "ipv6",
    "network_infrastructure",
    "communication_protocols",
  ]
author: "Nati Cabti"
date: "2025-04-16"
---

# Networking

Networking basics revolve around how computers communicate with each other, sending and receiving data across various devices and systems. Understanding these foundational concepts is essential for anyone designing or operating modern applications and distributed systems.

<div class="aws__ImageStart">
<img style={{ maxWidth:'500px', width: '100%', overflowX: 'auto', marginTop:'0'  }} src="/img/system-desgin-concepts/networking/networking-concepts.png"/>
</div>

## IP Addresses

At the core of network communication is the **IP address**, a unique identifier for each device on a network.

- **IPv4 (Internet Protocol version 4):** Uses 32-bit addresses, allowing for approximately 4 billion unique addresses.
- **IPv6 (Internet Protocol version 6):** Uses 128-bit addresses, significantly increasing the number of available unique addresses to accommodate the growing number of connected devices.

<div class="aws__ImageStart">
<img style={{ maxWidth:'500px', width: '100%', overflowX: 'auto' , marginTop:'0' }} src="/img/system-desgin-concepts/networking/ip-address-concept.png"/>
</div>

- **Public vs. Private:**
  - **Public IP addresses:** Unique across the entire internet.
  - **Private IP addresses:** Unique only within a local network (e.g., your home or office network).
- **Static vs. Dynamic:**
  - **Static IP addresses:** Permanently assigned to a device.
  - **Dynamic IP addresses:** Change over time, commonly used for residential internet connections and devices in local area networks.

## Data Packets and IP Protocol

When computers communicate, they send and receive **packets of data**.

- Each packet contains an **IP header**, which carries essential information like the sender's and receiver's IP addresses. This ensures data reaches its correct destination.

<div class="aws__ImageStart">
<img style={{ maxWidth:'500px', width: '100%', overflowX: 'auto', marginTop:'0'  }} src="/img/system-desgin-concepts/networking/ip-header.png"/>
</div>

- The **Internet Protocol (IP)** is a set of rules that defines how data is sent and received over the internet, governing the routing of these packets.

Above the IP layer, the **application layer** is where data specific to the application protocol (e.g., HTTP for web browsing) is stored, ensuring the data is interpreted correctly by the receiving device.

<div class="aws__ImageStart">
<img style={{ maxWidth:'500px', width: '100%', overflowX: 'auto', marginTop:'0'  }} src="/img/system-desgin-concepts/networking/http-header.png"/>
</div>

## Transport Layer Protocols: TCP vs. UDP

The transport layer handles end-to-end communication, with two primary protocols:

### TCP (Transmission Control Protocol)

- **Reliability:** Ensures reliable communication by guaranteeing the complete and correct delivery of data packets. It's like a delivery service that confirms your package arrived intact.
- **Connection-Oriented:** Establishes a stable connection using a **three-way handshake** before sending data.
- **Features:**
  - Includes a **TCP header** with port numbers and control flags for managing connection and data flow.
  - Uses **sequence numbers** to keep track of packet order, retransmitting lost packets and reordering any that arrive out of sequence.
- **Use Cases:** Ideal for applications where data integrity and order are critical, such as web browsing (HTTP), email (SMTP), and file transfer (FTP).

<div class="aws__ImageStart">
  <img style={{ maxWidth:'500px', width: '100%', overflowX: 'auto', marginTop: '0'  }} src="/img/system-desgin-concepts/networking/tcp-concept.gif"/>
</div>

### UDP (User Datagram Protocol)

- **Speed over Reliability:** Faster but less reliable than TCP. It doesn't establish a connection before sending data and doesn't guarantee delivery or order of packets.
- **Connectionless:** Simply sends data without prior setup or acknowledgment.
- **Use Cases:** Preferable for time-sensitive communications where speed is crucial and some data loss is acceptable, such as video calls, online gaming, and live streaming.

## DNS (Domain Name System)

DNS acts like the **internet's phone book**, translating human-friendly domain names (e.g., `www.example.com`) into machine-readable IP addresses.

- When you enter a URL, your browser sends a DNS query to find the corresponding IP address, allowing it to establish a connection to the correct server.
- **ICANN (Internet Corporation for Assigned Names and Numbers):** Oversees the functioning of DNS, coordinating the global IP address space and domain name system.

- **Domain Name Registrars:** Companies like Namecheap or GoDaddy are accredited by ICANN to sell domain names to the public.

- **DNS Records:**
  - **A Records:** Map a domain name to its corresponding IPv4 address.
  - **AAAA Records:** Map a domain name to an IPv6 address.

## Networking Infrastructure & Security

- **Local Area Network (LAN):** Devices connected within a LAN can communicate directly with each other using private IP addresses.
- **Firewalls:** Essential for network security, firewalls monitor and control incoming and outgoing network traffic, protecting networks from unauthorized access and threats.
- **Ports:** Within a device, specific processes or services are identified by **ports**. When combined with an IP address, a port creates a unique identifier for a network service.
  - Some ports are reserved for specific protocols, such as:
    - **Port 80:** For HTTP (Hypertext Transfer Protocol).
    - **Port 443:** For HTTPS (HTTP Secure).
    - **Port 22:** For SSH (Secure Shell).

:::info
Networking forms the backbone of all digital communication. A solid understanding of IP addressing, transport protocols like TCP and UDP, and domain name resolution via DNS is fundamental for building reliable, performant, and secure distributed systems.
:::

**Use case:** Crucial for system administrators, network engineers, and software developers working on internet-connected applications, cloud infrastructure, or distributed services, enabling them to diagnose connectivity issues, optimize data transfer, and implement security measures.

## Additional Resources

- [TCP/IP Model Explained](https://www.cloudflare.com/learning/network-layer/what-is-tcp-ip-model/)
- [What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [Ports Explained](https://www.networkacademy.io/ccna/network-fundamentals/ports-and-protocols)
