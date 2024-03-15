import Sandbox from 'wujie/esm/sandbox';

import { useAppStore } from '@/store/app';
import { injection } from './injection';

import WujieVue from 'wujie-vue3';

const { bus } = WujieVue;

export const lifecycles = {
  /**
   * 子应用开始加载静态资源前触发
   */
  beforeLoad: (appWindow) => {
    const { setMatchActived, setMatchErrMsg } = useAppStore();
    setMatchErrMsg('');
    setMatchActived(false);
    console.log(`【${appWindow.__WUJIE.id}】生命周期 => beforeLoad`);
  },
  /**
   * 子应用保活模式下，进入时触发
   */
  activated: (appWindow) => {
    const { setMatchActived } = useAppStore();

    try {
      injection(appWindow);
      setMatchActived(true);
      console.log(`【${appWindow.__WUJIE.id}】生命周期 => activated`);
      bus.$emit('sub-activated', appWindow.__WUJIE.id);
    } catch (error) {
      console.error(error);
    }
  },
  /**
   * 子应用保活模式下，离开时触发
   */
  deactivated: (appWindow) => {
    console.log(`【${appWindow.__WUJIE.id}】生命周期 => deactivated`);
    bus.$emit('sub-deactivated', appWindow.__WUJIE.id);
  },
  /**
   * 子应用加载资源失败后触发
   */
  loadError: (url: string, e: Error) => {
    const { setMatchErrMsg } = useAppStore();
    setMatchErrMsg(e.message);
  },

  //=============以下生命周期在单例模式（需要改造子应用的渲染入口）下再用到，暂不用到===============
  /**
   * 子应用渲染（调用window.__WUJIE_MOUNT）前触发
   */
  beforeMount: (appWindow) => {
    console.log(`生命周期 => beforeMount`);
  },
  /**
   * 子应用渲染（调用window.__WUJIE_MOUNT）后触发
   */
  afterMount: (appWindow) => {
    console.log(`生命周期 =>  afterMount`);
  },
  /**
   * 子应用卸载（调用window.__WUJIE_UNMOUNT）前触发
   */
  beforeUnmount: (appWindow) => {
    console.log(`生命周期 => beforeUnmount`);
  },
  /**
   * 子应用卸载（调用window.__WUJIE_UNMOUNT）后触发
   */
  afterUnmount: (appWindow) => {
    console.log(`生命周期 => afterUnmount`);
  },
} satisfies Sandbox['lifecycles'];
