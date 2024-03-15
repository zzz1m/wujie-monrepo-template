/**
 * 路径插件
 */

export default {
  install: function (Vue, options = {}) {
    Vue.prototype.getImportUrl = function (url) {
      url = url.startsWith('/') ? url.slice(1) : url;
      const name = import.meta.env.VITE_PROJECT_FOLDER_NAME;
      return new URL(`../../../../apps/${name}/src/assets/images/${url}`, import.meta.url).href;
    };
  }
};
