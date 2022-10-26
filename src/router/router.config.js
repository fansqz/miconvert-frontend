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
];

export default {};
