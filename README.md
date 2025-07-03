# 前言

传统的 HTTP 协议是无状态的,每次请求 (request) 都要由客户端 (如浏览器) 主动发起,
服务端进行处理后返回 respones 结果, **而服务端很难主动向客户端发送数据** 这种客
户端是主动方,服务端是被动的,对涉及到实时信息的 Web 应用带来了很大的不便.

## 1 HTTP 工作原理

HTTP 协议定义 Web 客户端如何从 Web 服务器请求 Web 页面，以及服务器如何把 Web 页
面传送给客户端。HTTP 协议采用了请求/响应模型。

- 客户端向服务器发送一个请求报文，请求报文包含请求的方法 URL、协议版本、请求头部
  和请求数据。
- 服务器以一个状态行作为响应，响应的内容包括协议的版本.成功或者错误代码、服务器
  信息、响应头部和响应数据。

以下是 HTTP 请求/响应的步骤:

1. 客户端连接到 Web 服务器一个 HTTP 客户端,通常是浏览器,与 Web 服务器的 HTTP 端
   口 (默认为 80) 建立一个 TCP 套字连接,例如，http://www.abc.com
2. 发送 HTTP 请求通过 TCP 套接字，客户端向 Web 服务器发送一个文本的请求报文
   ，<span style="color:rgb(146, 208, 80)">一个请求报文由请求
   行</span>、<span style="color:rgb(146, 208, 80)">请求头
   部</span>、<span style="color:rgb(146, 208, 80)">空
   行</span>和<span style="color:rgb(146, 208, 80)">请求数据 4 部分组成</span>。
3. 服务器接受请求并返回 HTTP 响应 Web 服务器解析请求，定位请求资源。服务器将资源
   复本写到 TCP 套接字，由客户端读取。一个响应由状态行、响应头部、空行和响应数据
   4 部分组成。
4. 释放连接 TCP 连接若 connection 模式为 close，则服务器主动关闭 TCP 连接，客户
   端被动关闭连接，释放 TCP 连接; 若 connection 模式为 keepalive，则该连接会保持
   一段时间，在该时间内可以继续接收请求;
5. 客户端浏览器解析 HTML 内容 客户端浏览器首先解析状态行，查看表明请求是否成功的
   状态代码。然后解析每一个响应头，响应头告知以下为若干字节的 HTML 文档和文档的
   字符集。客户端浏览器读取响应数据 HTML，根据 HTML 的语法对其进行格式化，并在浏
   览器窗口中显示。

<span style="color:rgb(146, 208, 80)">例如: 在浏览器地址栏键入 URL，按下回车之后
会经历以下流程:</span>

1. 浏览器向 DNS 服务器请求解析该 URL 中的域名所对应的 IP 地址;
2. 解析出 IP 地址后，根据该 IP 地址和默认端口 80，和服务器建立 TCP 连接;
3. 浏览器发出读取文件 (URL 中域名后面部分对应的文件) 的 HTTP 请求，该请求报文作
   为 TCP 三次握手的第三个报文的数据发送给服务器;
4. 服务器对浏览器请求作出响应，并把对应的 html 文本发送给浏览器,
5. 释放 TCP 连接:
6. 浏览器将该 htm| 文本并显示内容;

HTTP 基于请求响应的模式

- 客户端发出服务端返回

无状态保存

- 对发送过的请求或响应都不做持久化处理

# Websocket 的优势

相对于传统 HTTP 每次请求 - 应答都需要客户端与服务端建立连接的模式，WebSocket 是
类似 Socket 的 TCP 长连接通讯模式。一旦 WebSocket 连接建立后，后续数据都以帧序列
的形式传输。在客户端断开 WebSocket 连接或 Server 端中断连接前,不需要客户端和服务
端重新发起连接请求

## 1 实现方式

WebSocket 需要像 TCP 一样，先建立连接，需要客户端和服务端进行握手连接，连接成功
后才能相互通信。

### 1.1 <span style="font-weight:bold; color:rgb(146, 208, 80)">Websocket 构造函数</span>

WebSocket 对象作为一个构造函数，用于新建 Websocket 实例。

`var ws = new websocket("ws://127.0.0.1:8090");`

执行上面语句之后，客户端就会与服务器进行连接，

<span style="color:rgb(146, 208, 80)">webSocket.readystate</span>

readystate 属性返回实例对象的当前状态，共有四种。
`CONNECTING: 值为 0，表示正在连接。` `OPEN: 值为 1，表示连接成功，可以通信了。`
`CLOSING: 值为 2，表示连接正在关闭。`
`CLOSED: 值为 3，表示连接已经关闭，或者打开连接失败。`

<span style="color:rgb(146, 208, 80)">websocket.onopen</span> 实例对象的 onopen
属性，用于指定连接成功后的回调函数。

```js title:
ws.onopen = function () {
  alert('websocket连接成功')
}
```

<span style="color:rgb(146, 208, 80)">webSocket.onerror</span> 连接发生错误的回
调方法

```jsx title:
socket.onerror = () => {
  alert('websocket连接发生错误')
}
```

<span style="color:rgb(146, 208, 80)">webSocket.onmessage </span> 实例对象的
onmessage 属性，用于指定收到服务器数据后的回调函数

```jsx title:
socket.onmessage = (event) => {
  console.log('websocket收到消息', event.data)
}
```
