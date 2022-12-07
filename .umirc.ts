import { defineConfig } from 'umi';

export default defineConfig({
  // 编译
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
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
    type: 'browser',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/internal', component: '@/pages/internal', title: 'ad3' },
        { path: '/task', component: '@/pages/task', title: 'ad3' },
        { path: '/auth', component: '@/pages/auth', title: 'ad3' },
      ],
    },
  ],
  // 代理
  proxy: {
    '/api': {
      target: 'https://www.adventure3.tk/',
      changeOrigin: true,
    },
  },
  fastRefresh: {},
});
