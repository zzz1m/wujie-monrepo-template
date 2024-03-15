/*
 * @Author: wangxiaolong wangxiaolong01@kanzhun.com
 * @Date: 2023-09-13 18:52:50
 * @LastEditors: wangxiaolong wangxiaolong01@kanzhun.com
 * @LastEditTime: 2023-09-25 16:22:31
 * @FilePath: /bzl-noah-web/packages/tools/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// import { _getUserInfo } from '../services';
// import SessionStorage from '../utils/sessionstorage';
// import { _getUserInfo, _getModulePoster, _getResouces } from '@noah/tools/src/intercept';
// export default {
// 	actions: {
// 		updateUserInfo(state, userInfo) {
//             state.userInfo = userInfo || {};
//             SessionStorage.set('roles', userInfo.roles || []);
//         },
// 	}
// };

import Vue from 'vue';
import Vuex from 'vuex';
import Storage from '../utils/localstorage';
import SessionStorage from '../utils/sessionstorage';
import API from '../meta/api';
const { _getUserInfo, _getModulePoster, _getResouces, _getAuditCount } = API.COMMON;
Vue.use(Vuex);

const files = import.meta.globEager('./module/*.m.js');
const moduleCfg = Object.values(files).reduce((cur, file) => {
  const cfg = file.default;
  cur[cfg.name] = cfg;
  return cur;
}, {});

const store = new Vuex.Store({
  namespaced: true,
  strict: process.env.NODE_ENV === 'development',
  modules: { ...moduleCfg },
  state: {
    token: '',
    companyId: '',
    pageIsLoading: false, // 异步路由加载中
    userInfo: {},
    pageTitle: '',
    lastDocumentTitle: '',
    showPostDialog: false,
    commerGuide: {
      showGuide: false,
      id: ''
    }, // 新手引导信息
    postDialogInfo: {
      remark: '更新说明',
      poster: ''
    },
    taskCount: 0, // offer审批 待办数量
    auditCount: 0,
    permissions: [], // 接口权限列表
    loading: false,
    versionChange: false, // 版本号改变
    version: null, // 系统版本号  用来控制页面刷不刷新
    menuExpand: true,
    showCheckedDialog: false,
    initPoster: false // 初始化海报
  },
  getters: {
    pageLastTitle(state) {
      return state.lastDocumentTitle || state.pageTitle;
    }
  },
  actions: {
    cleanToekn({ dispatch, commit }) {
      dispatch('cleanResources');
      commit('cleanToken');
    },
    async updateNewGuide({ commit }) {
      try {
        const { success, root } = await _getModulePoster({ module: 'new-guide' });
        if (success && root) {
          // 0 未查看  1 已查看
          commit('updateNewGuide', { showGuide: root.viewStatus == 0, id: root.id });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async updateUserInfo({ commit }) {
      try {
        const { root } = await _getUserInfo();
        commit('updateUserInfo', root);
      } catch (e) {
        console.log(e);
      }
    },
    async getAuditCount({ commit }) {
      try {
        const { success, root } = await _getAuditCount();
        if (success) {
          commit('updateAuditCount', root);
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 处理是否显示海报信息
    async getPostDialogType({ state, commit }, payload = {}) {
      try {
        let fullPathList = payload.fullPath ? payload.fullPath.match(/\/dashboard\/(\S*)\//) : [];
        let pathKey = fullPathList ? fullPathList[1] : '';
        pathKey = pathKey && pathKey.split('/')[0];
        const { success, root } = await _getModulePoster({
          module: pathKey
        });
        // if (state.versionChange) {
        //     location.reload();
        //     return;
        // }
        if (success && root && root.viewStatus === 0) {
          commit('updateShowPostDialog', true);
          commit('updatePostDialogInfo', root);
        }
        commit('updateInitPoster', true);
      } catch (e) {
        console.log(e);
      }
    },
    async getPermissions({ commit }) {
      try {
        const { success, root } = await _getResouces();
        if (success && root) {
          this.authorityList = root;
        }
        if (success && root) {
          commit('updatePermissions', root);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
      Storage.set('token', token);
    },
    updateNewGuide(state, commerGuide) {
      state.commerGuide = commerGuide;
    },
    updateCompayId(state, id) {
      state.companyId = id;
      Storage.set('companyId', id);
    },

    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo || {};
      SessionStorage.set('roles', userInfo.roles || []);
    },
    updatePageTitle(state, payload) {
      state.pageTitle = payload || '';
    },
    updateLastDocumentTitle(state, lastDocumentTitle) {
      state.lastDocumentTitle = lastDocumentTitle || '';
    },
    updateShowPostDialog(state, type) {
      state.showPostDialog = type;
    },
    updateShowCheckedDialog(state, type) {
      state.showCheckedDialog = type;
    },
    updatePostDialogInfo(state, info) {
      state.postDialogInfo = info;
    },
    updateTaskCount(state, payload) {
      state.taskCount = payload || 0;
    },
    updateAuditCount(state, payload) {
      state.auditCount = payload;
    },
    updatePermissions(state, payload) {
      state.permissions = payload || [];
    },
    updateLoading(state, payload) {
      state.loading = payload;
    },
    updateVersion(state, payload) {
      if (!payload) {
        return;
      }
      if (state.version && payload && state.version !== payload) {
        state.versionChange = true;
        state.version = payload;
      } else if (!state.version) {
        state.version = payload;
      }
    },
    updateMenuExpand(state, payload) {
      state.menuExpand = payload;
    },
    updatePageIsLoading(state, type) {
      state.pageIsLoading = type;
    },
    updateInitPoster(state, status) {
      state.initPoster = status;
    }
  }
});

export default store;
