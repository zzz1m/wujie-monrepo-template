import 'custom-event-polyfill';

/**
 * 浏览器不支持 webcomponent 和 proxy，是否需要降级处理
 * https://wujie-micro.github.io/doc/guide/degrade.html
 */
export const degrade =
  window.localStorage.getItem('degrade') === 'true' ||
  !window.Proxy ||
  !window.CustomElementRegistry;

/**
 * 子系统加载时的占位元素
 */
export function createLoading() {
  const CustomLoading = document.createElement('div');
  CustomLoading.setAttribute('class', 'page-tip');
  CustomLoading.innerHTML = `<i class="ui-icon-loading"></i>正在加载中...`;
  return CustomLoading;
}
