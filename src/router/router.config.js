export const defaltMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/UserLogin.vue'),
  },
  {
    path: '/tourist/convert',
    name: 'touristFileConvert',
    component: () => import('../layout/Tourist.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/UserRegister.vue'),
  },
];

export default {};
