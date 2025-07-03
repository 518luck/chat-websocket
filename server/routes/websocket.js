// node.js应该怎么写?
//使用第三方库 ws库来创建一个webSocket服务器
var express = require('express')
var router = express.Router()
const websocket = require('ws')

const socket = new websocket.Server({ port: 8080 })

// 连接用户 (客户端组)
const clients = []

// 连接用户
socket.on('connection', (ws) => {
  clients.push({ ws: ws })

  // 监听客户端消息
  ws.on('message', (message) => {
    console.log(message.toString())

    // 广播所所有连接用户
    clients.forEach((chient) => {
      chient.ws.send(message.toString())
    })
  })
})

console.log('WebSocket 服务器已启动，端口 8080')

module.exports = router
