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
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
