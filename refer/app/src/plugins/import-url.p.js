/**
 * 路径插件
 */

export default {
    install: function(Vue, options = {}) {
        Vue.prototype.getImportUrl = function(url) {
            url = url.startsWith('/') ? url.slice(1) : url;
            return new URL(`../assets/images/${url}`, import.meta.url).href;
        };
    }
};