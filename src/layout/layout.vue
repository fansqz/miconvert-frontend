<template>
  <div class="wrapper">
    <Header class="header" />
    <div class="content-box">
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/header.vue';
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: -1px;
}

.content-box {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  transition: left 0.3s ease-in-out;
  //background: #f3f3f4;
}

.content {
  position: relative;
  height: calc(100vh - 110px);
  width: calc(100%);
  padding: 20px;
  overflow-y: scroll;
}

// 跳转动画
.move-enter-active,
.move-leave-active {
  transition: opacity 0.5s;
}

.move-enter,
.move-leave {
  opacity: 0;
}
</style>
