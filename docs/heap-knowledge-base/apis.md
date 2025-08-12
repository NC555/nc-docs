---
title: "APIs"
description: "APIs"
tags: [api, soap, rest, graphql, rpc, polling, webhooks]
author: "Nati Cabti"
---

# Different API Types

SOAP vs REST vs GraphQL vs RPC.

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F6b437484-1fd8-4b59-ba05-46bb3352b053_2904x2559.jpeg)

](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F6b437484-1fd8-4b59-ba05-46bb3352b053_2904x2559.jpeg)

The diagram below illustrates the API timeline and API styles comparison.

Over time, different API architectural styles are released. Each of them has its own patterns of standardizing data exchange.

## Polling Vs Webhooks

[

![No alt text provided for this image](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F375dc3ef-ccb8-4627-9b45-67150a0f83f0_1280x1664.gif "No alt text provided for this image")

](https://blog.bytebytego.com/subscribe)

- Polling  
   Polling involves repeatedly checking the external service or endpoint at fixed intervals to retrieve updated information.  
   It’s like constantly asking, “Do you have something new for me?” even where there might not be any update.
  This approach is resource-intensive and inefficient.
  Also, you get updates only when you ask for it, thereby missing any real-time information.
  However, developers have more control over when and how the data is fetched.

- Webhooks  
   Webhooks are like having a built-in notification system.
  You don’t continuously ask for information.
  Instead you create an endpoint in your application server and provide it as a callback to the external service (such as a payment processor or a shipping vendor)
  Every time something interesting happens, the external service calls the endpoint and provides the information.
  This makes webhooks ideal for dealing with real-time updates because data is pushed to your application as soon as it’s available.

So, when to use Polling or Webhook?  
Polling is a solid option when there is some infrastructural limitation that prevents the use of webhooks. Also, with webhooks there is a risk of missed notifications due to network issues, hence proper retry mechanisms are needed.

Webhooks are recommended for applications that need instant data delivery. Also, webhooks are efficient in terms of resource utilization especially in high throughput environments.
