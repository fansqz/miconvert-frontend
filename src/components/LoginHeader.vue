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

<style lang="scss" scoped>
$headerBgc: #373d41;

.el-menu {
  background-color: $headerBgc !important;
  padding: 0 20px;
  display: block;

  // 设置header高度
  .el-menu-item {
    height: 70px;
    line-height: 70px;
    background-color: $headerBgc !important;

    &:hover {
      background-color: #2a2f32 !important;
    }
  }
}

// 大标题
.title {
  font-size: 22px;
  font-family: PingFang-SC, sans-serif;
  font-weight: 500;
  line-height: 70px;
  text-align: center;
  color: #fff;
}

// 右边的导航项
:deep(.item-right) {
  float: right;
  font-size: 14px;
  padding: 0 7px !important;

  i {
    font-size: 20px;
    color: #fff;
    margin-right: 0;
  }
}

//重写不能按的样式
.el-menu-item.is-disabled {
  color: #fff !important;
  cursor: pointer;
  opacity: 1;
  border: none !important;
}

.header-tips {
  color: white;
}
</style>
