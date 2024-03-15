/*
 * @Author: wangxiaolong wangxiaolong01@kanzhun.com
 * @Date: 2023-09-13 18:52:12
 * @LastEditors: wangxiaolong wangxiaolong01@kanzhun.com
 * @LastEditTime: 2023-10-26 14:42:52
 * @FilePath: /bzl-noah-web/packages/tools/src/directives/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';

const directivesCtx = import.meta.globEager('./*.dir.js');

Object.values(directivesCtx).forEach((file) => {
  const dir = file.default;
  Vue.directive(dir.name, dir.handler);
});

export default function () {
  Object.values(directivesCtx).forEach((file) => {
    const dir = file.default;
    Vue.directive(dir.name, dir.handler);
  });
}
