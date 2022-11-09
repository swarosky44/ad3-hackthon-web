import { defineConfig } from 'umi';

export default defineConfig({
  // 编译
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  headScripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-06VG3J3659',
      async: true,
    },
    {
      content: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-06VG3J3659');
      `,
      charset: 'utf-8',
    },
  ],
  // UI
  theme: {
    'primary-color': '#49ecbd',
  },
  // 路由
  history: {
    type: 'hash',
  },
  routes: [
    {
      path: '/task',
      component: '@/layouts/designLayout',
      routes: [
        { path: '/:id', component: '@/pages/task' },
      ],
    },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: '@/pages/home', title: 'ad3' },
        { path: '/adventure3', component: '@/pages/adventure3', title: 'ad3' },
        { path: '/native', component: '@/pages/native', title: 'ad3' },
        { path: '/test', component: '@/pages/test', title: 'ad3' },
      ],
    },
  ],
  fastRefresh: {},
});
