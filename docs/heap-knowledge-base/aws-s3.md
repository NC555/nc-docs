---
title: "AWS S3 an Object Storage System"
description: "AWS S3"
tags: [aws, s3, object_storage, storage, cloud]
author: "Nati Cabti"
---

# AWS S3 an Object Storage System

Amazon S3 is classified as object storage because of these key characteristics:

**Flat Structure Instead of Hierarchical**

- Stores data as objects within buckets (no true folders or directories)
- No nested file system like in block or file storage
- "Folders" in S3 are actually prefix patterns in object keys

**Objects as Complete Units**

- Each object includes the data, metadata, and a unique identifier (key)
- Objects are stored and retrieved as complete, independent units
- Cannot mount S3 as a drive or modify just parts of objects

**Rich Metadata**

- Each object has system metadata (size, date, content type)
- Supports custom metadata as key-value pairs
- Metadata is stored with the object and retrieved together

**HTTP/HTTPS Interface**

- Accessed via REST API over standard web protocols
- Objects have unique URLs for direct access
- Not accessed through file system commands

**Scalability**

- Virtually unlimited storage capacity
- Flat namespace allows for massive horizontal scaling
- No volume or partition size limits to manage

**Immutability**

- Objects are generally immutable (whole-object updates)
- You replace rather than modify objects
- Versioning preserves previous states of objects

These characteristics distinguish S3 from block storage (like EBS) which allows partial updates to storage volumes, and file storage (like EFS) which maintains a hierarchical structure with standard file system operations.
