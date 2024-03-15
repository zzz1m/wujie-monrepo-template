import type { cacheOptions } from 'wujie';
import router from '@/router';

import { lifecycles } from './config/lifecycles';
import { degrade, createLoading } from './config/helper';

export const plugins = [
  {
    // 子应用自己加载某些js文件（通过script标签），而非框架劫持加载（通常会导致跨域）
    jsIgnores: [
      'https://noah.kanzhun-inc.com/dashboard/resources/xlsx.full.min.js',
      'https://z.zhipin.com/H5/js/plugins/web-report.min-230113.js',
      'https://logapi.zhipin.com/dap/jssdk/warlockdata.min.1.0.6.js',
    ],
    // 隐藏子应用的导航栏
    cssBeforeLoaders: [
      { content: '#app-nav-bar, #app-sidebar-new{display:none;}' },
    ],
    jsAfterLoaders: [
      // { content: '', }, // 注入脚本 => 移到生命周期去完成
    ],
  },
];

export const WujieVueAttrs = {
  id: 'micro-container',
  width: 'audo',
  height: '100%',
  /**
   * 这个loading在生命周期 beforeload 加载资源之前
   * 另外一个 loading 为 appStore.isSystemLoading 加载资源到页面渲染之间
   */
  loading: createLoading(),
  degrade,
  props: {
    log: (...args: any[]) => console.log(...args),
    syncPath: (path: string) => {
      const p = path.match(/\/dashboard.*/g)?.[0];
      if (p && p !== router.currentRoute.value.fullPath) {
        console.log(`主应用同步路由 =>`, path);
        router.replace(path);
      }
    },
  },
  ...lifecycles,
  plugins,
} satisfies Omit<cacheOptions, 'name'> & {
  width: string;
  height: string;
  id: string;
};
