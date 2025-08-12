---
title: MCP
slug: mcp
description: MCP
tags:
  - mcp
  - ai
  - protocol
  - anthropic
author: Nati Cabti
---

# MCP

Why is everyone talking about it? Let’s take a closer look.

[
![No alt text provided for this image](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F840e868d-2c83-4b1b-a881-df1da6c6e332_1309x1536.gif "No alt text provided for this image")
](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F840e868d-2c83-4b1b-a881-df1da6c6e332_1309x1536.gif)

`MCP` is a new system introduced by Anthropic to make AI models more powerful.

It is an open standard (also being run as an open-source project) that allows `AI models` (like `Claude`) to connect to `Modern Database Types`, `REST APIs`, file systems, and other tools without needing custom code for each new integration.

MCP follows a client-server model with 3 key components:

1. Host: AI applications like Claude that provide the environment for AI interactions so that different tools and data sources can be accessed. The host runs the MCP Client.
2. MCP Client: The MCP client is the component inside an AI model (like Claude) that allows it to communicate with MCP servers. For example, if the AI model wants data from PostgreSQL, the MCP client formats the request into a structured message to send to the MCP Server
3. MCP Server: This is the middleman that connects an AI model to an external system like PostgreSQL, Google Drive, or an API. For example, if Claude analyzes sales data from PostgreSQL, the MCP Server for PostgreSQL acts as the connector between Claude and the database.

MCP has five core building blocks (also known as primitives). They are divided between the client and server.

1. For the clients, the building blocks are Roots (secure file access) and Sampling (ask the AI for help with a task such as generating a DB query).
2. For the servers, there are Prompts (instructions to guide the AI), Resources (Data Objects that the AI can reference) and Tools (functions that the AI can call such as running a DB query).
