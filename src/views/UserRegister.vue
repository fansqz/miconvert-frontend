<template>
  <div class="logo">
    <Logo></Logo>
  </div>
  <p class="slogan">让格式转换更简单</p>

  <div class="login-panel">
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="90px"
    class="login-form"
    status-icon
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="doSubmit">注册</el-button>
    </el-form-item>
  </el-form>
  </div>
  <!--底部蓝条-->
  <div class="footer"></div>
</template>

<!--组件引用不用声明-->
<!--无需通过setup返回，局部变量可页面使用-->
<script setup>
// 基本  内容多属性
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import userApi from '../service/api/user';
import Logo from '../components/Logo.vue';

// 一定要在方法内使用userUser
const router = useRouter();
// 单向数据输出，如果要双向数据绑定，还需要api方法调用
const ruleForm = reactive({
  username: 'hello',
  email: '123456@qq.com',
  password: '123456',
  passwordAgen: '',
});

// 设置表单输入时的校验
const rules = {
  username: [
    { required: true, message: '请输入用户名' },
  ],
  email: [
    { required: true, message: '请输入邮箱' },
  ],
  password: [
    { required: true, message: '请输入密码' },
  ],
};

// 进行注册
const ruleFormRef = ref();
const doSubmit = () => {
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      const res = await userApi.register({
        username: ruleForm.username,
        email: ruleForm.email,
        password: ruleForm.password,
      });
      // 注册成功,跳转到登录页面
      router.push({
        name: 'login',
      });
      ElMessage.success(res.message);
    } else {
      // eslint-disable-next-line no-console
      console.log('error submit', fields);
    }
  });
};

</script>

<style scoped>
.login-panel {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0, 0;
  box-sizing: border-box;
  padding-bottom: 40px;
  align-items: center;
  width: 450px;
  height: 300px;
  border-radius: 10px;
  background-color: #eaeced;
  border: solid 1px #e3e1e1;
}
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  transform: translate(-50%,-50%);
}

.logo {
  position: absolute;
  left:41%;
  top: 13%;
}

.slogan {
  position: absolute;
  left: 46%;
  top: 21%;
  color: rgb(114, 110, 110);
  font-size:smaller;
}

.footer {
  width: 100%;
  height: 8%;
  position: absolute;
  bottom: 0;
  background-color: #569df4;
}
</style>
