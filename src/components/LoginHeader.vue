<template>
  <el-menu
    :default-active="onRoutes"
    mode="horizontal"
    background-color="#242f42"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleClick"
  >
    <!-- <span class="title">
        Anyview System
      </span> -->
    <span class="title"> miconvert </span>
    <el-menu-item class="item-right" index="logout">
      <el-icon>
        <switch-button />
      </el-icon>
      退出
    </el-menu-item>
    <el-menu-item class="item-right" index="modify-password">
      <el-icon>
        <lock />
      </el-icon>
      修改密码
    </el-menu-item>
    <el-menu-item class="item-right" index="none" disabled>
      <el-icon><user-filled /></el-icon>
      <strong>{{ username }}</strong>
    </el-menu-item>
    <!-- 暂时没有发现显示的用处，如果有用可重新启用 -->
    <!-- <el-menu-item class="header-tips item-right" index="none2" disabled>
      {{ headerMessage }}
    </el-menu-item> -->
  </el-menu>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useUser from '../store/user';

const router = useRouter();
// 获取用户名称
const user = useUser();
const username = ref(user.userInfo);
const handleClick = async (index) => {
  switch (index) {
    case 'logout':
      try {
        // 退出登录
        user.remove();
        window.localStorage.clear();
        await router.push({ name: 'login' });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      break;
    case 'modify-password':
      await router.push({ name: 'modify-password' });
      break;
    default:
  }
};
</script>

<style scoped>
</style>
