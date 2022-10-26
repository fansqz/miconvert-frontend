<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <div class="flex-grow" />
    <el-menu-item index="1">登录</el-menu-item>
    <el-menu-item index="2">注册</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const activeIndex = ref('0');
const handleSelect = (key) => {
  if (key === '1') {
    router.push({
      name: 'login',
    });
  }
  if (key === '2') {
    router.push({
      name: 'register',
    });
  }
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
