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
    <el-menu-item index="2">{{ user.username }}</el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import userApi from '../service/api/user';

const user = ref({});
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

const getUserInof = async () => {
  const res = await userApi.getUserInfo();
  user.value = res.data;
};

getUserInof();
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
