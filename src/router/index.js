import { createRouter, createWebHistory } from 'vue-router';
// 引入routes
import { defaltMap } from './router.config';

const router = createRouter(
  {
    history: createWebHistory(),
    routes: defaltMap,
  },
);

// 检验是否登录
function checkLogin() {
  // 验证token有效性,todo:后端验证
  return window.localStorage.getItem('token');
}

// 路由守卫
router.beforeEach((to, from, next) => {
  // next();放行
  // next(route对象 || stringPath); 重定向
  // next(false); 取消用户导航行为
  // 不调用 白屏卡住

  // 访问白名单，不需要验证
  if (to.path === '/login' || to.path === '/convert') {
    return next();
  }
  // 需要验证
  if (!checkLogin()) {
    // 去登陆
    return next({
      name: 'Login',
      query: {
        redirect: to.path,
      },
    });
  }
  // 如果登录了,判断是否已经生成了路由菜单等
  return next();
});

export default router;
