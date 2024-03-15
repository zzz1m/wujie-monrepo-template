import type { Router } from 'vue-router';
import { useAppStore } from '@/store/app';

import WujieVue from 'wujie-vue3';

const { bus } = WujieVue;

/**
 * 主应用路由跳转 => 加载/激活 => 子应用
 * 加载 => 子应用内部更新路由 => 主应用同步子应用路由
 * 激活 => 子应用同步主应用路由
 * => 主子应用路由相同参数不同 => 主应用同步子应用路由
 * => 主子应用路由不相同 => 子应用同步主应用路由
 */
export default function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const { handleMatchSubSystem } = useAppStore();
    handleMatchSubSystem(to);
    next();
  });

  router.afterEach((to) => {
    const { matchActived, matchSubSystem } = useAppStore();
    if (matchActived) {
      // 主应用 => 子应用，路由同步发起
      bus.$emit('base-route-change', to.fullPath, matchSubSystem?.name);
    }
  });
}
