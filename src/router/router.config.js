export const defaltMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/UserLogin.vue'),
  },
  {
    path: '/fileconvert',
    name: 'fileconvert',
    component: () => import('../layout/UnLoginLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/TouristConvert.vue'),
      },
    ],
  },
];

export default {};
