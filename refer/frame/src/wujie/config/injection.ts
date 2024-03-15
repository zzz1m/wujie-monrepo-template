/**
 * 注入到子应用appWindow的逻辑
 */
import type { Router } from 'vue-router';
import { useAppStore } from '@/store/app';

type CommonWindow = typeof window & Window;

export function injection(appWindow: Window) {
  if (appWindow.NOAH_WUJIE_INJECTED) return;
  const t = Date.now();
  const interval = setInterval(() => {
    if (Date.now() - t > 3 * 1000) clearInterval(interval);
    if (appWindow.noahApp) {
      clearInterval(interval);
      try {
        appWindow.$wujie?.props.log(`子系统实例化 => `, appWindow.noahApp);
        window.NOAH = appWindow.noahApp;

        runInjection(appWindow);
        appWindow.NOAH_WUJIE_INJECTED = true;
        appWindow.$wujie?.props.log(`注入脚本完成`);
      } catch (error) {
        console.error(error);
      }
    }
  }, 100);
}

function runInjection(_appWindow: Window) {
  const appWindow = _appWindow as CommonWindow;

  // @ts-ignore
  appWindow.main = appWindow;
  appWindow.console = window.console;

  RouterInjection(appWindow);
  StoreInjection(appWindow);
  StyleOveride(appWindow);
}

function StyleOveride(appWindow: CommonWindow) {
  appWindow.document.body.classList.remove('min-w-1400');
}

function RouterInjection(appWindow: CommonWindow) {
  const wujie = appWindow.$wujie;

  const router = appWindow.noahApp.$router as Router & { currentRoute: any };
  appWindow.currPath = '';

  // 主应用路由改变，触发
  wujie.bus.$on('base-route-change', function (path: string, name: string) {
    // 只处理最新激活的应用
    if (appWindow.name !== name) {
      wujie.props.log('end 1');
      return;
    }
    // 子应用：目标路由和当前一致，取消同步
    if (path === router.currentRoute.fullPath) {
      wujie.props.log('end 2');
      return;
    }
    // 子应用：目标路由和当前一致，取消同步
    if (path === router.currentRoute.path) {
      // 但父应用和子应用参数不同，父应用向子应用同步
      if (path !== router.currentRoute.fullPath) {
        wujie.props.syncPath(router.currentRoute.fullPath);
        wujie.props.log('end 3');
      }
      wujie.props.log('end 4');
      return;
    }
    wujie.props.log(`子应用同步路由 =>`, path);

    // 如果子应用能匹配到主应用提供的路由
    const localRouteMatched = appWindow.noahApp?.$router.matcher.match(path);
    if (localRouteMatched) {
      appWindow.currPath = path;
      appWindow.noahApp?.$router.push(path);
    } else {
      wujie.props.log(`子应用路由同步失败`);
    }
  });

  // 子应用路由守卫
  router.afterEach((to) => {
    if (!appWindow.currPath || to.fullPath !== appWindow.currPath) {
      wujie.props.syncPath(to.fullPath);
    }
  });
}

function StoreInjection(appWindow: CommonWindow) {
  const { updateAuditCount, updatePageTitle } = useAppStore();

  const store = appWindow.noahApp.$store;
  const rawCommit = store.commit;
  store.commit = (...args: any[]) => {
    // 审批红点
    switch (args?.[0]) {
      case 'updatePageTitle':
        updatePageTitle(args[1]);
        break;
      case 'updateAuditCount':
        updateAuditCount(args[1]);
        break;
      default:
        break;
    }
    rawCommit.call(store, ...args);
  };

  const wujie = appWindow.$wujie;
  wujie.bus.$on('updateSideState', function (isOpen: boolean) {
    const app = appWindow.noahApp?.$children?.[0];
    if (app) {
      app.menuExpand = isOpen;
    }
    rawCommit.call(store, 'updateMenuExpand', isOpen);
  });
}
