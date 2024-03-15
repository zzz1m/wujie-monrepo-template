import type { RouteLocationNormalized } from 'vue-router';
import WujieVue from 'wujie-vue3';
import { createRouter, toRouteMatcher } from 'radix3';

const SUB_SYSTEM: SubSystemSetting[] = [];

const router = createRouter();

export function setup() {
  const { setupApp } = WujieVue;
  const modules = import.meta.glob('./sub-system/*.ts', { eager: true });
  Object.entries(modules).forEach((t) => {
    const fileName = t[0].split('/').pop()?.split('.')[0] + '';
    const { name: _name, match, url } = t[1] as SubSystemSetting;
    const name = _name || fileName;
    if (!url) return;

    SUB_SYSTEM.push({
      name,
      match,
      url,
    });

    setupApp({
      name,
      url,
      exec: true,
      alive: true,
    });

    if (typeof match === 'object') {
      match.forEach((rule) => {
        router.insert(rule, {
          name,
          url,
        });
      });
    }
  });

  console.table(
    SUB_SYSTEM.reduce(
      (r, c) => ({
        ...r,
        [c.name]: c,
      }),
      {},
    ),
    ['url'],
  );
}

interface MatchConfig {
  callback: (subMatch: SubSystemMatch) => void;
  onError: (err: Error) => void;
}

export function matchSubSystemRoute(macthConfig: MatchConfig): any {
  const { callback, onError } = macthConfig;

  return (route: RouteLocationNormalized) => {
    const matcher = toRouteMatcher(router);
    try {
      const fullPath = route.fullPath;
      const matches = matcher.matchAll(fullPath);

      const common = SUB_SYSTEM.find((t) => t.name === 'common');

      if (!matches.length) {
        /**
         * 开发环境：如果没有匹配到路由，就设置为 common，也就是原项目
         * online：刷新改路由
         */
        // if (import.meta.env.DEV) {
        //   common &&
        //     callback({
        //       name: 'common',
        //       url: common.url + fullPath,
        //     });
        // } else {
        //   window.location.href = fullPath;
        // }

        // throw new Error('未匹配到子应用：' + fullPath);

        common &&
          callback({
            name: 'common',
            url: common.url + fullPath,
          });

        return;
      }
      const matchedName = [...new Set(matches.map((t) => t.name))];
      if (matchedName.length > 1) {
        throw new Error('匹配到多个子应用：' + matchedName.join('、'));
      }
      const { name, url } = matches[0];
      callback({
        name,
        url: url + fullPath,
      });
    } catch (error) {
      onError?.(error as Error);
    }
  };
}

function getSettings() {}
