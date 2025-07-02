<script setup lang="ts">
import { ref, onMounted } from 'vue'

let socket: WebSocket | null = null
const inputValue = ref<string>('') //新消息

onMounted(() => {
  connectWebSocket()
})

// WEBSOCKETL连接
const connectWebSocket = () => {
  // 客户端就会与服务器进行连接
  socket = new WebSocket('ws://127.0.0.1:8080')

  socket.onopen = () => {
    alert('连接成功')
  }

  socket.onerror = () => {
    alert('websocket连接发生错误')
  }

  socket.onclose = () => {
    alert('websocket连接关闭')
  }

  socket.onmessage = (event) => {
    console.log('websocket收到消息', event.data)
  }
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
        <div class="message"><strong>张三</strong>666</div>
        <div class="message"><strong>李四</strong>666</div>
        <div class="message"><strong>王五</strong>666</div>
      </article>
      <footer class="footer">
        <el-input class="input" placeholder="Please input" />
        <el-button type="primary">发送</el-button>
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
