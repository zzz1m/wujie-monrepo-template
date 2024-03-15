export const NODE_KEY = '$cascaderNodeId';

export const markNodeData = function (node, data) {
  if (!data || data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};

export const objectAssign = function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

export const getNodeKey = function (key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};

// 把树形数组扁平化为一维数组
export const createTreeMap = function (arr, config = { value: 'id', label: 'name', children: 'children' }) {
  let obj = {};
  const traverse = function (data, parent) {
    data.forEach((item) => {
      const value = item[config.value];
      const label = item[config.label];
      const children = item[config.children];
      const isLeaf = !children || children.length === 0;
      if (!obj.hasOwnProperty(value)) {
        obj[value] = {
          value,
          label,
          parent,
          isLeaf
        };
      }
      if (children && children.length > 0) {
        traverse(children, value);
      }
    });
  };
  traverse(arr, null);
  return obj;
};

// 生成选择链
export const createTreeLink = function (arr, config = { value: 'id', label: 'name', children: 'children' }) {
  const result = [];
  const treeMap = createTreeMap(arr, config);
  const findPrototype = function (data, obj) {
    const { value, label, parent } = data;
    obj.value = `${value}/${obj.value}`;
    obj.label = `${label}/${obj.label}`;
    if (parent) {
      findPrototype(treeMap[parent], obj);
    }
  };

  Object.values(treeMap)
    .filter((item) => item.isLeaf)
    .forEach((item) => {
      const { value, label, parent } = item;
      let obj = { value, label };
      if (parent) {
        findPrototype(treeMap[parent], obj);
      }
      result.push(obj);
    });
  return result;
};
