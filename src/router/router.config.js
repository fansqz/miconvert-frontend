export const defaltMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/UserLogin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/UserRegister.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../layout/Tourist.vue'),
  },
  {
    path: '/tourist/convert',
    name: 'touristFileConvert',
    component: () => import('../layout/Tourist.vue'),
  },
  {
    path: '/user/convert',
    name: 'userFileConvert',
    component: () => import('../layout/User.vue'),
  },
];

export default {};
