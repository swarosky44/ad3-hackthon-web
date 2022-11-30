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
    // 运营页面
    {
      path: '/internal',
      component: '@/layouts/internalLayout',
      routes: [
        { path: ':id', component: '@/pages/internal', title: 'ad3' },
      ],
    },
    // 广告主工作台
    {
      path: '/backend',
      component: '@/layouts/backendLayout',
      routes: [
        { path: 'list', component: '@/pages/backend/list', title: 'ad3' },
        { path: 'create', component: '@/pages/backend/create', title: 'ad3' },
        { path: 'detail/:id', component: '@/pages/backend/detail', title: 'ad3' },
      ],
    },
    // 任务详情页
    {
      path: '/task',
      component: '@/layouts/designLayout',
      routes: [
        { path: ':id', component: '@/pages/task', title: 'ad3' },
      ],
    },
    // 授权中转页
    {
      path: '/auth',
      component: '@/layouts/blankLayout',
      routes: [
        { path: 'twitter', component: '@/pages/auth/twitter', title: 'ad3' },
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
  // 代理
  proxy: {
    '/api': {
      "target": 'https://www.adventure3.tk/',
      'changeOrigin': true,
    },
  },
  fastRefresh: {},
});
