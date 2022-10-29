<template>
  <!--顶部字条-->
  <div class="logo">
    <Logo></Logo><br/>
  </div>
  <p class="slogan">让格式转换更简单</p>
  <div class="login-panel">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="55px"
      class="login-form"
    >
      <el-form-item label="名称" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

    <!--底部蓝条-->
  <div class="footer">
  </div>
</template>

<!--组件引用不用声明-->
<!--无需通过setup返回，局部变量可页面使用-->
<script setup>
// 基本  内容多属性
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import userApi from '../service/api/user';
import useUser from '../store/user';
import Logo from '../components/Logo.vue';

// 一定要在方法内使用userUser
const user = useUser();
const route = useRoute();
const router = useRouter();
// 单向数据输出，如果要双向数据绑定，还需要api方法调用
const ruleForm = reactive({
  username: 'hello',
  password: '123456',
});

// 设置表单输入时的校验
const rules = {
  username: [
    { required: true, message: '请输入用户名' },
  ],
  password: [
    { required: true, message: '请输入密码' },
  ],
};

// 获取页面引用对象
const ruleFormRef = ref();
const doSubmit = () => {
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      const res = await userApi.login(ruleForm);
      // 登录成功,设置状态
      user.setUserInfo(ruleForm.username);
      // 添加token
      window.localStorage.setItem('token', res.data);
      // 跳转用户原来页面或用户首页
      router.push(route.query.redirec || { name: 'userFileConvert' });
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
  width: 400px;
  height: 250px;
  border-radius: 10px;
  background-color: #eceef0;
  border: solid 1px #635757;
}
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.footer {
  width: 100%;
  height: 8%;
  position: absolute;
  bottom: 0;
  background-color: #569df4;
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
</style>
