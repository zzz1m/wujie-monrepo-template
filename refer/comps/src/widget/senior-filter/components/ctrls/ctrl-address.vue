<template>
  <div class="ctrl-address-viewer ctrl-box-viewer">
    <ui-cascader-new
      v-if="dataSource.value"
      v-model="dataSource.value"
      allow-cross-level
      dict-type="region"
      :disabled="$attrs.disabled"
      lazy
      :load="loadData"
      :meta-data="dataSource.metaValue"
      :multiple="false"
      node-key="dictCode"
      :props="{ children: 'children', label: 'dictName', isLeaf: 'isLeaf' }"
      @update-meta="updateMeta"
    ></ui-cascader-new>
    <span v-if="dataSource.status > 1" class="ctrl-error">{{ errmsg }}</span>
  </div>
</template>

<script>
import error from '../../error';
import { commonServices } from '@noah/tools';
const { _getDictTypes } = commonServices;
import { deepCopy } from '@/utils/object';

export default {
  name: 'CtrlAddress',
  inheritAttrs: false,
  mixins: [error],
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    regulation() {
      const regulation = this.dataSource.filedConfig.regulation;
      const length = regulation === '' ? [] : regulation.split('/');
      return length > 0 ? length : 3; // 默认省市区
    }
  },
  watch: {
    'dataSource.value'(newval) {
      this.dataSource.status = newval.length > 0 ? 0 : 1;
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      if (this.dataSource.value === '') {
        this.dataSource.value = [];
        this.dataSource.metaValue = [];
      }
      this.$nextTick(() => {
        this.dataSource.status = 0;
      });
    },
    clear() {
      this.dataSource.value = '';
      this.dataSource.metaValue = '';
      this.dataSource.status = 0;
    },
    // 更新源数据
    updateMeta(data) {
      this.dataSource.metaValue = deepCopy(data || []);
    },
    async getDictTypes(parentCode = null) {
      const dictType = 'region';
      const { message, success, root } = await _getDictTypes({
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
      if (node.isLeaf || this.regulation == node.level) {
        return resolve([]);
      }
      const parentCode = node.level === 0 ? null : node.data.dictCode;
      const result = await this.getDictTypes(parentCode);
      return resolve(result);
    }
  }
};
</script>
