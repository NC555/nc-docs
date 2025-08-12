---
title: "How does SSH work?"
description: "How does SSH work?"
slug: "/how-ssh-works"
tags: ["ssh", "security", "networking", "protocol"]
author: "Nati Cabti"
---

# SSH (Secure Shell)

SSH (Secure Shell) is a network protocol used to securely connect to remote machines over an unsecured network. It encrypts the connection and provides various mechanisms for authentication and data transfer.

SSH has two versions: SSH-1 and SSH-2. SSH-2 was standardized by the IETF.  
It has three main layers: Transport Layer, Authentication Layer, and Connection Layer.

1. Transport Layer  
   The Transport Layer provides encryption, integrity, and data protection to ensure secure communication between the client and server.
2. Authentication Layer  
   The Authentication Layer verifies the identity of the client to ensure that only authorized users can access the server.
3. Connection Layer  
   The Connection Layer multiplexes the encrypted and authenticated communication into multiple logical channels.
