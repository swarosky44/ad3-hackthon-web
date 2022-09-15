import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: './',
  hash: true,
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    "primary-color": "#49ecbd",
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: '@/pages/home', title: 'ad3' },
        { path: '/adventure3', component: '@/pages/adventure3', title: 'ad3' },
        { path: '/native', component: '@/pages/native', title: 'ad3' },
      ],
    },
  ],
  fastRefresh: {},
});
