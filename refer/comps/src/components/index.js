/*
 * @Author: wangxiaolong wangxiaolong01@kanzhun.com
 * @Date: 2023-09-13 18:57:21
 * @LastEditors: wangxiaolong wangxiaolong01@kanzhun.com
 * @LastEditTime: 2023-09-13 19:08:06
 * @FilePath: /bzl-noah-web/packages/components/src/comps/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';

const compsCtx = import.meta.globEager('./**/*.g.vue');
Object.values(compsCtx).forEach((filename) => {
  const comp = filename.default;
  Vue.component(comp.name, comp);
});
