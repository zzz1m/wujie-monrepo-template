import { get, post, postForm } from '../../intercept/http.js';
export function getApiMethod(apiMap) {
  let map = {};
  let methodMap = {
    get,
    post,
    postForm
  };
  Object.keys(apiMap).forEach((key) => {
    map[key] = {};
    let modulesApi = apiMap[key];
    Object.keys(modulesApi).forEach((apiMethod) => {
      Object.entries(modulesApi[apiMethod]).forEach(([apiKey, apiStrOrConfig]) => {
        let apiStrOrMethod = '';
        let apiConfig = {};
        if (typeof apiStrOrConfig === 'string' || typeof apiStrOrConfig === 'function') {
          apiStrOrMethod = apiStrOrConfig;
        } else {
          apiStrOrMethod = apiStrOrConfig.api;
          apiConfig = apiStrOrConfig.apiConfig ? apiStrOrConfig.apiConfig : {};
        }
        map[key][apiKey] = function (params = {}, ...res) {
          // api 支持方法和字符串
          if (typeof apiStrOrMethod === 'string') {
            return methodMap[apiMethod](apiStrOrMethod, params, apiConfig);
          } else {
            return apiStrOrMethod(params, ...res);
          }
        };
      });
    });
  });
  return map;
}
