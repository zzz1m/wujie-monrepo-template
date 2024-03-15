<template>
  <div class="ctrl-box-viewer">
    <ui-cascader-new
      v-if="dataSource.value"
      v-model="dataSource.value"
      :dict-type="dictType"
      :disabled="$attrs.disabled"
      lazy
      :load="loadData"
      :meta-data="dataSource.metaValue"
      node-key="dictCode"
      :props="{ children: 'children', label: 'dictName', isLeaf: 'isLeaf' }"
      @update-meta="updateMeta"
    ></ui-cascader-new>
    <span v-if="dataSource.status > 1" class="ctrl-error">{{ errmsg }}</span>
  </div>
</template>

<script>
import { commonServices } from '@noah/tools';
const { _getDictTypes, _getSpecialDictTypes } = commonServices;

import { deepCopy } from '@/utils/object';

import error from '../../error';

export default {
  name: 'CtrlCascader',
  inheritAttrs: false,
  mixins: [error],
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dictType: ''
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.dataSource.value === '') {
        this.dataSource.value = [];
        this.dataSource.metaValue = [];
      }
    },
    // 更新源数据
    updateMeta(data) {
      this.dataSource.metaValue = deepCopy(data || []);
    },
    clear() {
      this.dataSource.value = '';
      this.dataSource.metaValue = '';
      this.dataSource.status = 0;
    },
    async getDictTypes(parentCode = null, dictType = null) {
      const { url } = this.dataSource.filedConfig;
      dictType = dictType || this.dataSource.filedConfig.dictType;
      this.dictType = dictType;

      const { message, success, root } = url
        ? await _getSpecialDictTypes({
            url,
            dictType,
            parentCode
          })
        : await _getDictTypes({
            dictType,
            parentCode,
            canEnable: true
          });
      return (root || []).map((node) => {
        node.isLeaf = node.childCount == 0;
        return node;
      });
    },
    async loadData(node, resolve) {
      if (node.isLeaf) {
        return resolve([]);
      }
      const parentCode = node.level === 0 ? null : node.data.dictCode;
      const dictType = node.level === 0 ? null : node.data.dictType;
      const result = await this.getDictTypes(parentCode, dictType);
      return resolve(result);
    }
  }
};
</script>
