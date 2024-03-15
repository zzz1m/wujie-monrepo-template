import('es6-promise-always');
import 'virtual:svg-icons-register';

import { directiveInit, pluginsInit, magpieUtil, bossAnalytics, routerBefore } from '@noah/tools';
directiveInit(); // 引入指令
pluginsInit(); // 引入插件

// promise扩展的always
import Vue from 'vue';
import App from './App.vue';
import Cookie from './utils/cookie';
import store from './store';
import bossUI from 'boss-ui';
// import '@/comps';// 引入全局组件
import '@noah/components/global'; // 引入全局公共组件
import router from './router/index';
import core from './utils/core';

import axios from 'axios';
import Validate from './utils/validate.js';

// v-viewer 图片预览
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';

import * as filters from './utils/filters.js';

import uiSelect from './components/select/index.js';
import uiUpload1 from './components/upload1/index.js';
import uiCheckbox from './components/checkbox/index.js';


magpieUtil.magpieInit(); // 初始化埋点

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.component('UiUploadLast1', uiUpload1);
Vue.component('UiCheckboxLast', uiCheckbox);
Vue.component('UiSelectLast', uiSelect);

axios.defaults.baseURL = '';

Vue.prototype.$ajax = axios;


const getQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
};

// 处理iuc登录到本地 devserver，由JS自行设置cookie
if (import.meta.env.VITE_ENV === 'development' && window.location.host.indexOf('.kanzhun-inc.com') == -1 && window.location.host.indexOf('.weizhipin.com') == -1) {

  const cookieValue = getQueryString('t_uc');
  if (cookieValue) {
    Cookie.set('t_zhipinhr-v2', cookieValue, null, null, '/');
  }
}


Vue.prototype.trackEvent = function (action) {
  try {
    // eslint-disable-next-line
    _T && _T.sendEvent(action);
  } catch (e) { }
};

Vue.prototype.extend = function (destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }

  return destination;
};


if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}


// bossUI.uiInput.props.clearable.default = true;
bossUI.uiInput.props.placeholder.default = '请输入';

Vue.use(core);
Vue.use(Validate);
// Vue.use(uiDialog);
Vue.use(Viewer);
Vue.use(bossUI);
//Vue.use(uiVendor);
function initApp() {
  routerBefore(router);
  window.noahApp = new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
  });
}

// 启动应用
async function startApp() {
  try {
    await store.dispatch('updateUserInfo');
  } finally {
    initApp();
    bossAnalytics.analyticsInit({
      appVer: '4.1.6',
      userId: store.state.userInfo.userId
    });
  }
}

startApp();


// 滚动到表单有误的位置
Vue.prototype.scrollToError = (scrollSelector, errorClassName = 'form-error-tip') => {
  let scrollEle = document.querySelector(scrollSelector); // 滚动的父节点
  scrollEle.style.position = 'relative';

  setTimeout(() => {
    let errorEle = document.querySelector(`.${errorClassName}`); // error的节点
    if (!errorEle) return;

    let formItemEle = errorEle.parentElement.parentElement;

    // 滚动到相应form-item
    if (formItemEle.offsetTop + formItemEle.offsetHeight > scrollEle.offsetHeight) { // 超出可视区域时
      scrollEle.scrollTop = formItemEle.offsetTop + formItemEle.offsetHeight; // form-item距离滚动父容器的距离 + formitem内容高度
    } else {
      scrollEle.scrollTop = formItemEle.offsetTop;  // form-item距离滚动父容器的距离
    }

    // 动画
    errorEle.className = `${errorClassName} form-error--shake`;
    setTimeout(() => {
      errorEle.className = errorClassName;
      scrollEle.style.position = '';
    }, 300);
  }, 0);
};
