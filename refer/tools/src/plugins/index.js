/*
 * @Author: wangxiaolong wangxiaolong01@kanzhun.com
 * @Date: 2023-09-13 18:52:30
 * @LastEditors: wangxiaolong wangxiaolong01@kanzhun.com
 * @LastEditTime: 2023-10-26 14:45:24
 * @FilePath: /bzl-noah-web/packages/tools/src/plugins/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';

import config from './tools/config';

const directivesCtx = import.meta.globEager('./*.p.js');

export default function () {
  Object.values(directivesCtx).forEach((file) => {
    const plugin = file.default;
    Vue.use(plugin, config[plugin.name] || {});
  });
}
