export const defaltMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/UserLogin.vue'),
  },
  {
    path: '/convert',
    name: 'convert',
    component: () => import('../views/TouristConvert.vue'),
  },
];

export default {};
