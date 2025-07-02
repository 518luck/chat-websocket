// node.js应该怎么写?
//使用第三方库 ws库来创建一个webSocket服务器
var express = require('express')
var router = express.Router()
const websocket = require('ws')

const socket = new websocket.Server({ port: 8080 })

console.log('WebSocket 服务器已启动，端口 8080')

module.exports = router
