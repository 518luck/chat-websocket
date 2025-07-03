<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Message {
  username: string
  value: string
}

let socket: WebSocket | null = null
const inputValue = ref<string>('') //新消息

const messageList = ref<Message[]>([])
// WEBSOCKETL连接
const connectWebSocket = () => {
  // 客户端就会与服务器进行连接
  socket = new WebSocket('ws://127.0.0.1:8080')

  socket.onopen = () => {
    alert('连接成功')
  }

  socket.onclose = () => {
    alert('websocket连接关闭')
  }

  socket.onmessage = (event) => {
    messageList.value.push(JSON.parse(event.data))
  }

  socket.onerror = () => {
    alert('websocket连接发生错误')
  }
}

onMounted(() => {
  connectWebSocket()
})

const handelSendMessageClick = () => {
  // 携带 名称,消息
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十']
  const message = {
    username: names[Math.floor(Math.random() * names.length)],
    value: inputValue.value,
  }
  socket?.send(JSON.stringify(message))
  inputValue.value = ''
}
</script>

<template>
  <div class="context">
    <div class="chat-main">
      <header class="header">
        <img src="./assets/icon.svg" alt="" class="icon" />
        <span>多云聊天室</span>
      </header>
      <article class="article">
        <div class="message" v-for="(item, index) in messageList" :key="index">
          <strong>{{ item.username }}：</strong>{{ item.value }}
        </div>
      </article>
      <footer class="footer">
        <el-input
          class="input"
          placeholder="Please input"
          v-model="inputValue" />
        <el-button type="primary" @click="handelSendMessageClick"
          >发送</el-button
        >
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.context {
  width: 100%;
  min-height: 100vh;
  color: #b0b4c7;
  background-color: #272932;
  display: flex;
  justify-content: center;
  align-items: center;
  .chat-main {
    width: 35%;
    min-height: 70vh;
    border-radius: 20px;
    background-color: #212226;
    position: relative;
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 10px 0;
      .icon {
        width: 50px;
        height: 50px;
      }
    }
    .article {
      width: 90%;
      height: 330px;
      background-color: #272932;
      position: absolute;
      top: 70px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 20px;
      .message {
        margin: 10px;
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 10px;
      margin-bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      .input {
        width: 290px;
        margin-right: 20px;
        :deep(.el-input__wrapper) {
          background-color: #272932;
        }
      }
      .button {
      }
    }
  }
}
</style>
