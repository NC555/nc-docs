---
title: Network Security Components in Cloud Infrastructure
slug: /network-security-components-in-cloud-infrastructure
description: Network Security Components in Cloud Infrastructure
tags:
  - network_security_componenets
author: Nati Cabti
---

# Network Security Components in Cloud Infrastructure

## Virtual Private Clouds (VPCs)

are isolated virtual networks within a cloud environment. They allow you to define your own network topology, including IP address ranges, subnets, and routing tables. VPCs provide logical isolation for your resources from other customers on the same physical infrastructure.

## Subnets

are subdivisions of a VPC's IP address range. They help organize resources within a VPC and can be configured as public (with internet access) or private (internal only). Subnets typically map to different availability zones for high availability.

## Security Groups

function as virtual firewalls at the instance level. They control inbound and outbound traffic using allow rules only (no explicit deny rules). Security groups are stateful - if you allow incoming traffic, the corresponding outbound response is automatically permitted.

## Network Access Control Lists (NACLs)

operate at the subnet level as another layer of security. Unlike security groups, NACLs are stateless and require explicit rules for both inbound and outbound traffic. They support both allow and deny rules, offering more granular control over network traffic.
