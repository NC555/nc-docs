---
title: Network Access Control List (NACLs)
slug: /network-access-control-list-nacls
description: Network Access Control List (NACLs)
tags:
  - networking
  - network_control
  - NACLs
author: Nati Cabti
---

# Network Access Control List (NACLs)

A network access control list (NACL) is ==a security feature used in cloud environments like AWS to control inbound and outbound traffic at the subnet level==. It acts as a stateless firewall, filtering traffic based on rules you define, and is an optional layer of security for your VPC. NACLs are crucial for network security, helping to restrict access to resources and prevent unauthorized traffic from entering or leaving your network.

Here's a more detailed explanation:

- ### Stateless Firewall:
  Unlike [security groups](https://www.google.com/search?sca_esv=58e7983bf9f21fcd&rlz=1C1GCEA_enIL1131IL1132&cs=1&sxsrf=AE3TifO6EAd00VJ_vWibE9RNTYaImqTHA%3A1754816801213&q=security+groups&sa=X&ved=2ahUKEwjwl5aA8v-OAxWDFBAIHVLXB5wQxccNegQIFBAB&mstk=AUtExfAlrPej75aXCUuMuDECaMIA2B3X4is0qddyKlXUm3K36koDn6h2Tql3tYDP5oQZxQQAjI0yrPk-fQP2sPBiDQNd4p7Qzw4jh0RxTzCAi1-7Pl0AvueziIqIc7UY_pnuSz7BDx-yqYvBWJJLSm2Run7iJiC5RuqhHyfoBB8LMZfm_hb0mN3Sv_gCDyYUeHDv0Bfa5Ckmuw-r6IA0cbBdoWbYEE5umeI5GLCGk5Lv32mDaYoFUJ6gaRfLj3hBth5mGNb0_-v_A8VHNhsOe5TkAB4c&csui=3), which are stateful (remember previous traffic), NACLs are stateless. This means that if you allow inbound traffic on a specific port, you also need to explicitly allow the corresponding outbound traffic.
- ### Subnet Level Control:

  NACLs are associated with subnets, and they control the traffic entering and leaving that subnet.

- ### Rule-Based Access:
  NACLs operate based on rules you define. These rules specify which traffic is allowed or denied based on factors like IP addresses, ports, and protocols.
- **Example:**
  You might create a NACL rule to allow only specific IP addresses to access a particular subnet, or to block traffic from known malicious IP ranges, [according to AWS documentation](https://docs.aws.amazon.com/prescriptive-guidance/latest/robust-network-design-control-tower/nacl.html).
- ### Order of Evaluation:
  NACL rules are evaluated in order of their rule number, with lower numbers taking precedence, [according to AWS in Plain English](https://aws.plainenglish.io/security-groups-and-network-access-control-lists-nacls-in-aws-474e326208ce).
- ### Default vs. Custom NACLs:
  You can have a default NACL that allows all traffic or a custom NACL that denies all traffic by default and requires you to explicitly define rules for allowed traffic.
- **Importance:**
  NACLs are important for adding an extra layer of security to your VPC, especially when dealing with sensitive resources or when you need more granular control over network traffic than security groups provide, [says AWS documentation](https://docs.aws.amazon.com/managedservices/latest/userguide/restrict-nacl.html).
