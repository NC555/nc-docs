---
title: "HTTP Protocol Evolution"
description: "HTTP Protocol Evolution"
slug: "/http-protocol-evolution"
tags: ["http", "protocol", "networking", "web"]
author: "Nati Cabti"
---

# HTTP Protocol Evolution

HTTP 1 started in 1996 followed by HTTP 1.1 the very next year. In 2015, HTTP 2 came about and in 2019 we got HTTP 3.

With each iteration, the protocol has evolved in new and interesting ways.

1. HTTP 1 (and its sub-versions) introduced features like persistent connections, pipelining, and the concept of headers. The protocol was built on top of TCP and provided a reliable way of communication over the World Wide Web. It is still used despite being over 25 years old.
2. HTTP 2 brought new features such as multiplexing, stream prioritization, server push, and HPACK compression. However, it still used TCP as the underlying protocol.
3. HTTP 3 uses Google’s QUIC, which is built on top of UDP. In other words, HTTP 3 has moved away from TCP.

## What makes HTTP2 faster than HTTP1?

The key features of HTTP2 play a big role in this. Let’s look at them:

1. Binary Framing Layer  
   HTTP2 encodes the messages into binary format.
   This allows the messages into smaller units called frames, which are then sent over the TCP connection, resulting in more efficient processing.
2. Multiplexing  
   The Binary Framing allows full request and response multiplexing.
   Clients and servers can interleave frames during transmissions and reassemble them on the other side.
3. Stream Prioritization  
   With stream prioritization, developers can customize the relative weight of requests or streams to make the server send more frames for higher-priority requests.
4. Server Push  
   Since HTTP2 allows multiple concurrent responses to a client’s request, a server can send additional resources along with the requested page to the client.
5. HPACK Header Compression  
   HTTP2 uses a special compression algorithm called HPACK to make the headers smaller for multiple requests, thereby saving bandwidth.

Of course, despite these features, HTTP2 can also be slow depending on the exact technical scenario. Therefore, developers need to test and optimize things to maximize the benefits of HTTP2.
