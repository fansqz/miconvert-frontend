// 定义一个store
// 一如定义store的函数
import { defineStore } from 'pinia';
// 按约定成 返回usexxx
export const useUser = defineStore({
  id: 'user',
  state() {
    return {
      userInfo: {},
      userMenu: [],
    };
  },
  // 修改方式
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    // { userMenu:值 }这样传，上下两种方式都可以
    setUserMenu(path) {
      this.$path(path);
    },
  },
});

export default {};
