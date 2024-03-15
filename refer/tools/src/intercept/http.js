import qs from 'qs';
import interceptors from './http-interceptors';

/**
 * 默认的一些配置
 */
const DEFAULT_CONFIG = {
  isLoading: true,
  isApiHost: false,
  // 如果参数是空值是不传
  isRemoveField: false,
  // 和 isRemoveField 一起使用
  removeField: []
};

/**
 * 针对post的配置 在header中修改
 */
const POST_HEADER = {
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  }
};

/**
 * get 提交
 * @param {String} url 请求的url
 * @param {any} params  请求的参数
 * @param {Obejct} config  请求配置
 * @returns Promise
 */
export function get(url, params = {}, config = {}) {
  let opts = { ...DEFAULT_CONFIG, ...config };
  opts.params = getParams(params, opts);
  return interceptors.get(url, opts);
}
export const createGet =
  (url, preConf = {}) =>
  (params = {}, config = {}) =>
    get(url, params, { ...preConf, ...config });

/**
 *
 * post 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {Boolean} isApiHost 是否添加前缀 默认是true
 * @param {any} isApiHost 请求配置
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function post(url, params = {}, config = {}) {
  let opts = { ...DEFAULT_CONFIG, ...POST_HEADER, ...config };
  let formatParams = getParams(params, opts);

  if (opts.headers) {
    const key = Object.keys(opts.headers)
      .join('|')
      .match(/Content\-Type/i);
    if (key && opts.headers[`${key}`].match(/x\-www\-form\-urlencoded/i)) {
      formatParams = qs.stringify(formatParams);
    }
  }

  return interceptors.post(url, formatParams, opts);
}
export const createPost =
  (url, preConf = {}) =>
  (params = {}, config = {}) =>
    post(url, params, { ...preConf, ...config });

// 表单格式提交
export function postForm(url, params = {}, config = {}) {
  let opts = {
    ...DEFAULT_CONFIG,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...config
  };
  return interceptors.post(url, qs.stringify(params), opts);
}

// 表单格式文件提交
export function postFileForm(url, params = {}, config = {}) {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  let opts = {
    ...DEFAULT_CONFIG,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...config
  };
  return interceptors.post(url, formData, opts);
}

/**
 *
 * put 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {Boolean} isApiHost 是否添加前缀 默认是true
 * @param {any} isApiHost 请求配置
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function put(url, params = {}, config = {}) {
  let opts = { ...DEFAULT_CONFIG, ...POST_HEADER, ...config };
  return interceptors.put(url, getParams(params, opts), opts);
}

/**
 *
 * delete 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {Boolean} isApiHost 是否添加前缀 默认是true
 * @param {any} isApiHost 请求配置
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function Delete(url, params = {}, config = {}) {
  let opts = { ...DEFAULT_CONFIG, ...POST_HEADER, ...config };
  return interceptors.delete(url, getParams(params, opts), opts);
}

/**
 *
 * 处理参数 移除值是 空的 和加上一些用户信息等操作
 * @param {any} params 传入参数
 * @param {any} config 配置
 * @returns 返回新的参数
 */
function getParams(params, config) {
  if (!config.isRemoveField) {
    return params;
  }
  return removeEmptyField(params, config.removeField);
}

/**
 *
 * 移除提交请求中 列为空 null undefined 的值
 * @param {any} [params={}] 传入的参数
 * @param {any} [removeField=[]] 需要移除的列
 */
function removeEmptyField(params = {}, removeField = []) {
  let copyParams = JSON.parse(JSON.stringify(params));
  let arrField = removeField;
  if (removeField.length === 0) {
    arrField = Object.keys(params);
  }
  arrField.forEach((key) => {
    let val = copyParams[key];
    if (val === '' || val === undefined || val === null) {
      delete copyParams[key];
    }
  });
  return copyParams;
}
/**
 *
 * 将对象转换为&链接的字符串，当Content-Type设置为application/x-www-form-urlencoded时的post请求需要
 * @param {any} [params={}] 传入的参数对象
 */
export function paramsQuery(params = {}) {
  let result = [],
    key,
    value,
    i;
  for (key in params) {
    value = params[key];
    if (value instanceof Array) {
      for (i = value.length; i--; ) {
        result.push(key + '[]=' + encodeURIComponent(value[i]));
      }
    } else {
      result.push(key + '=' + encodeURIComponent('undefined' === typeof value ? '' : value));
    }
  }
  return result.join('&');
}
