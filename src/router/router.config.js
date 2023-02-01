export const defaltMap = [
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
];

export default {};
