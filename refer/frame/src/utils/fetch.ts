/*
 * @Author: wangxiaolong wangxiaolong01@kanzhun.com
 * @Date: 2023-11-08 11:01:52
 * @LastEditors: wangxiaolong wangxiaolong01@kanzhun.com
 * @LastEditTime: 2023-11-08 19:51:16
 * @FilePath: /bzl-noah-web/apps/frame/src/utils/fetch.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { iucLogin } from '@boss/utils/iuc-login';
import { qs } from './util';
// @ts-ignore
import Storage from '@noah/tools/src/utils/localstorage';

iucLogin.init('zhipinhr-v2');

const token = qs('t_uc') || Storage.get('t_zhipinhr-v2') || '';
if (token) {
  Storage.set('t_zhipinhr-v2', token);
}

export async function fetch(
  url: RequestInfo,
  options?: RequestInit,
): Promise<NoahResponse> {
  const { path, config } = handleRequest(url, options);
  const response = await window.fetch(path, config);
  return handleResponse(response);
}

function handleRequest(url: RequestInfo, options?: RequestInit) {
  const defaultHeader = {};
  const config: RequestInit = {
    ...options,
    headers: Object.assign(
      iucLogin.addHeader(defaultHeader),
      options?.headers || {},
      {
        'zhipinhr-v2': token,
        'Content-Type': 'application/json',
      },
    ),
  };

  return {
    path: url,
    config,
  };
}

async function handleResponse(response: Response) {
  const { status } = response;
  const data: NoahResponse = await response.json();

  if (status !== 200) {
    return Promise.reject(data);
  }

  const { code, callback } = data;

  if (callback) {
    const urlPre = callback.split('callback=')[0];
    const callbackUrl =
      urlPre + 'callback=' + encodeURIComponent(location.href);
    setTimeout(() => {
      iucLogin.goLogin(callbackUrl);
    }, 500);
  }

  return data;
}

function handleError() {}
