<template>
  <div class="ctrl-box-viewer dept-container">
    <ui-tree-new
      ref="tree"
      check-on-click-node
      :disabled="$attrs.disabled"
      empty-text="暂无数据"
      :expand-on-click-node="false"
      :data="departmentList"
      filter
      :default-expanded-keys="expandedKeys"
      highlight-current
      :default-checked-keys="dataSource.value"
      :label="label"
      node-key="id"
      :props="{ label: 'name', children: 'children' }"
      :filter-node-method="filterNode"
      :show-checkbox="multiple"
      @check-change="changeNode"
      @checked-value-change="checkedValueChange"
      @node-click="clickNode"
      @on-show="handleShow"
    >
    </ui-tree-new>
    <span v-if="dataSource.status > 1" class="ctrl-error">{{ errmsg }}</span>
  </div>
</template>

<script>
import error from '../../error';
import { commonServices } from '@noah/tools';
const { _getDeptTreeByUser, _getSpecialDictTypes } = commonServices;

export default {
  name: 'ctrl-dept',
  inheritAttrs: false,
  mixins: [error],
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    multiple() {
      const multileRules = [3, 4]; // 属于 不属于
      const ruleId = this.dataSource.ruleId * 1;
      return multileRules.includes(ruleId);
    },
    label() {
      const checked = this.dataSource.metaValue;
      return Array.isArray(checked) ? checked.join(',') : '';
    }
  },
  data() {
    return {
      departmentList: [],
      expandedKeys: [] // 默认展开keyid list
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const { value, ruleId } = this.dataSource;
      const whiteRuleList = [5, 6]; // =  ≠
      if (this.dataSource.value === '' || (whiteRuleList.includes(ruleId * 1) && value.length > 1)) {
        this.dataSource.value = [];
        this.dataSource.metaValue = [];
      }

      this.getDepartmentList();
    },
    clear() {
      this.dataSource.value = '';
      this.dataSource.metaValue = '';
      this.dataSource.status = 0;
    },
    // 获取所有部门节点
    async getDepartmentList() {
      const { url } = this.dataSource.filedConfig;
      const { root } = url ? await _getSpecialDictTypes({ url }) : await _getDeptTreeByUser();
      this.departmentList = url ? root || [] : root ? [root] : [];
    },
    // 点击节点
    clickNode({ id, name }, node, nodeComp) {
      if (this.multiple) return;
      this.dataSource.value = [id];
      this.dataSource.metaValue = [name];
      this.$refs.tree.show = false;
    },
    // 切换节点
    changeNode(nodeinfo, selfchecked, hasCheckedChildren) {
      // if(!this.multiple) return;
      // const $tree = this.$refs.tree;
      // const checked = $tree.getCheckedNodes();
      // this.dataSource.value = checked.map(item => item.id);
      // this.dataSource.metaValue = checked.map(item => item.name);
      // checked.length > 0 ? (this.isOk()) : (this.isEmpty());
    },
    // 多选并且设置父子项关联模式取值逻辑特殊 只取父级选中项 子集全被选中的过滤掉
    checkedValueChange(data) {
      if (!this.multiple) return;
      this.dataSource.value = data.value;
      this.dataSource.metaValue = data.name;
    },
    // 筛选
    filterNode(value, data) {
      if (!value || !data.name) return true;
      return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },

    // 选择树组件显示方法监听  设置默认展开节点列表
    handleShow(show) {
      this.showTree = show;
      let valueKeys = this.dataSource.value || [];
      let defaultChecked = this.departmentList[0]?.id ? [this.departmentList[0]?.id] : [];
      if (!show) {
        return;
      }

      this.expandedKeys = valueKeys.length ? valueKeys : defaultChecked;
    }
  }
};
</script>
