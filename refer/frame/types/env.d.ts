/// <reference types="vite/client" />

/**
 * 子应用window上挂载的变量
 */
declare interface Window {
  __WUJIE: {
    id: string;
  };
  // 激活的子系统应用实例，方便基座调用子系统方法
  NOAH: {
    $toast: any;
  };
  NOAH_WUJIE_INJECTED: boolean;
  $wujie: any;
  noahApp: any;
  currPath: string;
  BossAnalytics: any;
}
