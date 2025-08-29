---
title: "Computer Architecture"
description: "An overview of the fundamental components of a computer system including Disk Storage, RAM, Cache, and CPU, detailing their roles, characteristics, and how they interact to execute code and process data."
tags:
  [
    "computer_architecture",
    "hardware",
    "cpu",
    "ram",
    "cache",
    "disk_storage",
    "ssd",
    "hdd",
    "memory_hierarchy",
    "operating_system",
    "binary",
    "bits_bytes",
  ]
author: "Nati Cabti"
date: "2025-04-16"
---

# Computer Architecture

<div class="aws__ImageCentered">
<img style={{ width: '100%', overflowX: 'auto' }} src="/img/system-desgin-concepts/computer-architecture/computer-architecture-concepts.png"/>
</div>

Computer architecture outlines the fundamental components of a computer system and how they are organized to function as a cohesive unit, executing code and processing data efficiently. Understanding this high-level architecture is crucial for designing and optimizing software, especially when building large-scale distributed systems. Computers function through a layered system, with each component optimized for varying tasks.

## Core Concepts

At its core, computers understand only binary zeros and ones, which are represented as bits.

- **Bit:** The smallest data unit in computing. A bit can be either 0 or 1.
- **Byte:** Consists of eight bits and is typically used to represent a single character (like 'a') or a number (like '1').
- **Data Units:** Expanding from here, data is measured in Kilobytes (KB), Megabytes (MB), Gigabytes (GB), and Terabytes (TB) to store progressively larger amounts of information.

<div class="aws__ImageStart">
<img style={{ width: '100%', overflowX: 'auto' }} src="/img/system-desgin-concepts/computer-architecture/bits-bytes-data-units.png"/>
</div>

## Key Components and Their Roles

The efficient functioning of a computer relies on the synergistic interaction of several key hardware components, each playing a distinct role in data storage, retrieval, and processing.

### Disk Storage (HDD/SSD)

- **Role:** Holds the primary, long-term data for the computer. This includes the operating system (OS), applications, and all user files.
- **Characteristics:**
  - **Non-volatile:** It maintains data without power, meaning if you turn off or restart the computer, the data will still be there.
  - **Types:** Can be either Hard Disk Drives (HDD) or Solid State Drives (SSD). SSDs are generally more expensive but offer significantly faster data retrieval.
- **Performance:**
  - **Size:** Disks typically range from hundreds of gigabytes to multiple terabytes.
  - **Speed:** An HDD might offer 80 to 160 MB per second read/write speed, while an SSD may have a read speed of 500 MB per second to 3,500 MB per second.

<div class="aws__ImageStart">
<img style={{ width: '100%', overflowX: 'auto' }} src="/img/system-desgin-concepts/computer-architecture/hdd-ssd-read-speed.png"/>
</div>

### RAM (Random Access Memory)

- **Role:** Serves as the primary active data holder. It holds data structures, variables, and application data that are currently in use or being processed by the CPU. When a program runs, its variables, intermediate computations, and runtime stack are stored in RAM.
- **Characteristics:**
  - **Volatile:** Requires power to retain its contents. Data stored in RAM is generally lost when the computer is restarted or powered off.
  - **Access:** Allows for very quick read and write access, essential for active program execution.
- **Performance:**
  - **Size:** RAM typically ranges from a few gigabytes in consumer devices to hundreds of gigabytes in high-end servers.
  - **Speed:** Read/write speeds often surpass 5,000 megabytes per second, making it much faster than even the fastest SSDs.

<div class="aws__ImageStart">
<img style={{ width: '100%', overflowX: 'auto' }} src="/img/system-desgin-concepts/computer-architecture/ram-volume.png"/>
</div>

### Cache (L1, L2, L3)

- **Role:** A smaller, extremely fast memory designed to reduce the average time to access data by storing frequently used data very close to the CPU. This optimizes CPU performance.
- **Characteristics:**
  - **Location:** Built directly into or very close to the CPU, arranged in a hierarchy (L1, L2, L3). L1 cache is the fastest and smallest, followed by L2 and L3.
  - **Access Pattern:** The CPU first checks the L1 cache for data. If not found, it checks L2, then L3. If the data is still not found, it finally checks RAM.
- **Performance:**
  - **Size:** Typically measured in megabytes (e.g., L1 cache in kilobytes, L2/L3 in megabytes).
  - **Speed:** Access times are exceptionally fast, offering just a few nanoseconds for the L1 cache.

<div class="aws__ImageStart">
<img style={{ width: '100%', overflowX: 'auto' }} src="/img/system-desgin-concepts/computer-architecture/cpu-read-cache-ram.gif"/>
</div>

### CPU (Central Processing Unit)

- **Role:** The "brain" of the computer. It fetches, decodes, and executes instructions, processing the operations defined in our programs.
- **Process:**
  1.  Our code, written in high-level languages (like Java, C++, Python), first needs to be compiled into machine code by a compiler.
  2.  Once compiled, the CPU can execute this machine code.
  3.  During execution, the CPU can read from and write to our RAM, disk, and cache data as necessary.

### Motherboard (Main Board)

- **Role:** The central component that connects everything else in the computer. It provides the pathways and interfaces necessary for all other components (CPU, RAM, disk, etc.) to communicate and work together.

## System Interplay

The computer functions as a sophisticated layered system, with a carefully designed memory hierarchy (Disk Storage -> RAM -> Cache) that prioritizes speed and access time. Data is strategically moved between these layers based on its access frequency and volatility requirements. This intricate system ensures that the CPU always has the fastest possible access to the data it needs, which is fundamental to the efficient execution of software and the overall performance of the computer.

:::info
Understanding computer architecture is fundamental to comprehending how software interacts with hardware, influencing performance, efficiency, and overall system design. The interplay between storage, memory, and processing units forms the backbone of all computing.
:::

**Relevance:** Essential knowledge for software developers, system architects, and anyone involved in optimizing application performance and understanding system bottlenecks, especially when designing distributed systems.

## Additional Resources

- [Computer Architecture (Wikipedia)](https://en.wikipedia.org/wiki/Computer_architecture)
- [How CPUs Work (Intel)](https://www.intel.com/content/www/us/en/products/processors/how-processors-work.html)
- [Memory Hierarchy](https://en.wikipedia.org/wiki/Memory_hierarchy)
