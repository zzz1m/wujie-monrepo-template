/**
 * 深拷贝(也可以使用JSON.parse 和 JSON.stringify)
 */
export const deepCopy = (obj) => {
  let result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      // const type = toString.call(val); // 直接使用toString在360上会报错
      const type = Object.prototype.toString.call(val);
      if (type === '[object Object]' || type === '[object Array]') {
        result[key] = deepCopy(val);
      } else {
        result[key] = val;
      }
    }
  }
  return result;
};

// 目前只支持两个参数
export const easyExtend = (obj1, obj2) => {
  let newObj1 = deepCopy(obj1);
  let newObj2 = deepCopy(obj2);

  return Object.assign({}, newObj1, newObj2);
};

/**
 * 深拷贝 + 深合并
 */
export const extend = function () {
  let options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    // Skip the boolean and the target
    target = arguments[i] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && toString.call(target) !== '[object Function]') {
    target = {};
  }

  // Extend  itself if only one argument is passed
  if (i === length) {
    target = this;
    i--;
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        copy = options[name];
        // Prevent Object.prototype pollution
        // Prevent never-ending loop
        if (name === '__proto__' || target === copy) {
          continue;
        }
        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (Object.prototype.toString.call(copy) === '[object Object]' || (copyIsArray = Array.isArray(copy)))) {
          src = target[name];
          // Ensure proper type for the source value
          if (copyIsArray && !Array.isArray(src)) {
            clone = [];
          } else if (!copyIsArray && Object.prototype.toString.call(src) !== '[object Object]') {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;

          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

/** 是否是空对象 */
export const isEmptyObject = (obj) => {
  const keys = Object.keys(obj);
  const type = Object.prototype.toString.call(obj);
  return type.includes('Object') && keys.length === 0;
};

/**
 * 获取地址栏信息
 */

export const getUrlParams = (blacklist = []) => {
  const result = location.search.slice(1).split('&');
  const params = {};
  result.forEach((item) => {
    const rel = item.split('=');
    if (!blacklist.includes(rel[0])) {
      params[rel[0]] = rel[1];
    }
  });
  return params;
};
