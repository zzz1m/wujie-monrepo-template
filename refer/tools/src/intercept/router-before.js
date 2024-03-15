/*
 * @Author: wangxiaolong wangxiaolong01@kanzhun.com
 * @Date: 2023-09-14 17:18:51
 * @LastEditors: wangxiaolong wangxiaolong01@kanzhun.com
 * @LastEditTime: 2023-09-14 17:26:58
 * @FilePath: /bzl-noah-web/packages/tools/src/intercept/router-before.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from '../store';
import Vue from 'vue';
import SessionStorage from '../utils/sessionstorage';
import storage from '../utils/localstorage';

function addOrRemoveClass(flag, query, className) {
  const el = document.querySelector(query);
  // const hasClass = el.classList.contains(className);
  if (flag) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
}
/**
 * @export
 * @param {any} router 路由
 */
const goNext = (to, from, next) => {
  let { meta } = to;
  addOrRemoveClass(meta.uiCover, 'body', 'bossui-new');
  const IS_EDITING = SessionStorage.get('IS_EDITING');

  // 考虑到hash的存在可能，所以  from.path !== to.path
  if (from.path !== to.path && from.meta && from.meta.stopGoNext && IS_EDITING == 1) {
    store.commit('updatePageIsLoading', false);
    new Vue().$dialog({
      title: '温馨提示',
      type: 'warning',
      content: '离开会丢失未保存的修改，确定离开吗？',
      onConfirm() {
        SessionStorage.set('IS_EDITING', 0);
        next();
      }
    });
  } else {
    next();
  }
};

export default function routerBefore(router) {
  // eslint-disable-line
  router.beforeEach(async (to, from, next) => {
    store.commit('updatePageTitle', '');
    store.commit('updateLoading', false);
    store.commit('updatePageIsLoading', true);
    // if (!store.state.token && Storage.get('token')) {
    //     store.commit('updateToken', Storage.get('token'));
    // }
    // if (to.meta.title) { // todo
    //     document.title = to.meta.title;
    // }
    if (to.meta.requireAuth && !store.state.token) {
      router.push({
        name: 'login'
      });
    } else {
      goNext(to, from, next);
    }
  });

  router.afterEach((to, from) => {
    store.commit('updatePageIsLoading', false);
    if (to.path !== from.path) {
      // 防止由于改变路由 query导致的接口触发
      const loadTime = storage.get('NOAH_RELOAD_TIME');
      // 系统版本发生变化 刷新页面 && 距离上次版本号修改变化刷新时间超过15分钟
      if (store.state.versionChange && (!loadTime || +new Date() - loadTime >= 15 * 60 * 1000)) {
        storage.set('NOAH_RELOAD_TIME', +new Date());
        location?.reload();
      } else {
        store.dispatch('getPostDialogType', to); // 显示更新信息提示弹窗方法
        store.dispatch('skin/getSkinDialogType', to); // 显示更新信息提示弹窗方法
      }
    }
  });
}
