/*
 * @Author: wangxiaolong wangxiaolong01@kanzhun.com
 * @Date: 2023-11-29 10:48:27
 * @LastEditors: wangxiaolong wangxiaolong01@kanzhun.com
 * @LastEditTime: 2023-11-29 10:48:53
 * @FilePath: /bzl-noah-web/apps/frame/src/wujie/sub-system/salary.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const url = import.meta.env.DEV
  ? '//localhost:5132'
  : 'https://noah-web-qa.weizhipin.com/apps/system';

export const match = [
  '/dashboard/salary/**'
];
