# Overview
![demo](https://github.com/user-attachments/assets/9a3597c2-3633-4c14-85d3-8b4d41613598)

## Client-Server Architecture
Client-server architecture is a design pattern that splits a system into two components:

- **Client**: The client is typically the user-facing part of an application, such as a web browser or mobile app. It sends requests to the server and displays the responses (e.g., a webpage or data).
  
- **Server**: The server is responsible for processing requests from the client, performing any necessary computations or database operations, and sending back the requested data or response.

This architecture enables clients and servers to communicate over a network, allowing for applications that are scalable, distributed, and maintainable.

When building real-time applications where updates are continuously pushed from the server to the client, traditional HTTP request-response cycles fall short. 

To address this, several communication patterns can be used:
1. Long Polling
2. WebSockets
3. Server-Sent Events (SSE)

Let’s delve into each of these patterns before demonstrating a real-time stock price update using SSE.

## Long Polling

### What is Long Polling?
Long Polling is a technique that allows the client to receive updates from the server without the need to constantly send requests. Here’s how it works:

1. The client sends a request to the server.
2. If the server has new data, it responds immediately.
3. If the server does not have new data, it holds the request open until new data is available.
4. Once the server responds, the client immediately sends a new request, repeating the cycle.

### Advantages
- Simple to implement on both the client and server.
- Works well when WebSockets or SSE are not supported by the server.

### Disadvantages
- **High server load**: The server must keep many open connections, which can consume resources.
- **Latency**: Each new connection incurs some latency.
- **Scalability**: Not suitable for applications with a large number of concurrent users.

### Example Use Case
- Chat applications that need to work in environments where WebSockets are unavailable.
- Systems where updates are infrequent and SSE or WebSockets are not an option.

## WebSockets

### What are WebSockets?
WebSockets provide a full-duplex communication channel over a single, long-lived connection. Unlike the HTTP protocol, which follows a request-response pattern, WebSockets enable two-way communication between the client and server.

### How It Works
1. The client and server establish a WebSocket connection through an HTTP request.
2. Once established, both the client and server can send messages to each other at any time.
3. The connection remains open, allowing for real-time, low-latency interactions.

### Advantages
- **Low Latency**: Ideal for real-time applications due to continuous, low-latency communication.
- **Bidirectional**: Allows the server to push data to the client and vice versa.

### Disadvantages
- **Complexity**: Requires a WebSocket server and more intricate handling compared to HTTP-based communication.
- **Scalability**: Maintaining numerous persistent connections can require more server resources.

### Example Use Case
- Online multiplayer games.
- Real-time collaborative applications like document editing.

## Server-Sent Events (SSE)

### What are Server-Sent Events (SSE)?
Server-Sent Events (SSE) is a technology that allows a server to push real-time updates to the client over a single HTTP connection. Unlike WebSockets, which are bidirectional, SSE is unidirectional, meaning updates flow only from the server to the client.

### How It Works
1. The client creates an EventSource object that opens a persistent connection to the server.
2. The server sends updates to the client as new events, using a special text-based format.
3. The connection remains open until closed by the client or server.

### Advantages
- **Simpler than WebSockets**: SSE is easier to implement, as it uses a standard HTTP connection.
- **Automatic Reconnection**: SSE automatically attempts to reconnect if the connection drops.
- **Reduced Overhead**: Suitable for streaming server-to-client updates without needing the complexity of WebSockets.

### Disadvantages
- **Unidirectional**: Can only push data from the server to the client, not vice versa.
- **Limited Browser Support**: While supported in most modern browsers, it is not supported by Internet Explorer.
- **Scalability**: Similar to long polling, it can be challenging to manage large numbers of concurrent connections.

### Example Use Case
- Real-time stock price updates.
- Cricket score updates.
