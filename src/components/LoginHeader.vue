<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <div class="flex-grow" />
    <el-menu-item index="1">退出登录</el-menu-item>
    <el-menu-item index="2">{{ username }}</el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useUser from '../store/user';

const user = useUser();
const username = ref(user.userInfo);
const router = useRouter();
const activeIndex = ref('0');
const handleSelect = (key) => {
  if (key === '1') {
    window.localStorage.removeItem('token');
    router.push({
      name: 'touristFileConvert',
    });
  }
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
