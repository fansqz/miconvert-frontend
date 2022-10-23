<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="doSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<!--组件引用不用声明-->
<!--无需通过setup返回，局部变量可页面使用-->
<script setup>
// 基本  内容多属性
import { ref, reactive } from 'vue';
// 单向数据输出，如果要双向数据绑定，还需要api方法调用
const ruleForm = reactive({
  username: 'hello',
  password: '123456',
});

// 设置表单输入时的校验
const rules = {
  username: [
    { required: true, mesagee: '必须输入用户名' },
  ],
  password: [
    { required: true, message: '必须输入密码' },
  ],
};

// 获取页面引用对象
const ruleFormRef = ref();
const doSubmit = function () {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit', fields);
    }
  });
};

</script>
