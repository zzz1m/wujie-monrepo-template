/**
 * 所有涉及到级联的字典接口
 */
import API from '../meta/api/index';
const { _getDictTypes } = API.COMMON;
export default {
  data() {
    return {
      cascaderConfig: {
        value: 'dictCode',
        label: 'dictName',
        children: 'children',
        isLeaf: 'isLeaf'
      },
      checkedDict: {
        // 合同期限相关
        contractDeadline: []
      }
    };
  },
  methods: {
    // 显示拖底
    calcCascaderPlaceholder(obj, key, placeholder = '--') {
      if (!obj || obj[key] === '' || obj[key] === null || obj[key] === undefined) return placeholder;
      const value = obj[key];
      if (value.startsWith('[') && value.endsWith(']')) {
        const data = JSON.parse(obj[key])[0];
        return data && data.label;
      } else {
        return value;
      }
    },
    // 渲染函数
    renderContractDeadline(arr) {
      if (arr.length === 0) return '';
      const [first, last] = arr[0].label.split('/');
      return first && last ? last + first : '';
    },
    // 加载下一级数据
    async loadSubData(node, resolve, dictType) {
      if (node.isLeaf) {
        return resolve([]);
      }
      const parentCode = node.level === 0 ? null : node.data.dictCode;

      const { success, root } = await _getDictTypes({ parentCode, dictType });
      if (success && root && root.length) {
        root.forEach((i) => {
          i.isLeaf = i.childCount == 0;
        });
        resolve(root);
      } else {
        resolve([]);
      }
    }
  }
};
