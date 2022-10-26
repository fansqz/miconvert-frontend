<template>
  <el-menu
    :default-active="onRoutes"
    mode="horizontal"
    background-color="#242f42"
    text-color="#fff"
    active-text-color="#ffd04b"
    >
    <span class="title"> miconvert </span>
    <el-menu-item class="item-right" >
      注册
    </el-menu-item>
    <el-menu-item class="item-right">
      登录
    </el-menu-item>
  </el-menu>
</template>

<script setup>
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
