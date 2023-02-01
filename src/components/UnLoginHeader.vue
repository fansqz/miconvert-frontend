<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <div class="logoimg">
      <img src="/public/logo.ico"/>
    </div>
    <div class="flex-grow" />
  </el-menu>
</template>

<script setup>
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
