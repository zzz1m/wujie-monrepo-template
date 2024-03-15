<template>
  <div class="ctrl-box-viewer dept-container" :class="multiple ? 'multiple' : 'single'">
    <ui-tree-new
      ref="tree"
      check-on-click-node
      :check-strictly="strict"
      :clearable="clearable"
      :data="departmentList"
      :default-checked-keys="dataSource.value"
      :default-expanded-keys="expandedKeys"
      :disabled="$attrs.disabled"
      :ellipsis-limit="ellipsisLimit"
      empty-text="暂无数据"
      :expand-on-click-node="false"
      :filter="filter"
      :filter-node-method="filterNode"
      highlight-current
      :label="label"
      node-key="id"
      :placeholder="placeholder"
      :props="treeProps"
      :show-checkbox="multiple"
      transfer
      @check-change="changeNode"
      @checked-value-change="checkedValueChange"
      @node-click="clickNode"
      @on-clear="handleClear"
      @on-show="handleShow"
    >
    </ui-tree-new>
  </div>
</template>

<script>
import { commonServices } from '@noah/tools';
const { _getDeptTreeByUser, _getSpecialDictTypes } = commonServices;
export default {
  name: 'Dept',
  inheritAttrs: false,
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    multiple: Boolean,
    filter: Boolean,
    clearable: Boolean,
    placeholder: String,
    treeProps: {
      type: Object,
      default: () => ({
        label: 'name',
        children: 'children'
      })
    },
    departmentListProps: {
      type: Array
    },
    checkStrict: {
      type: Boolean,
      default: null
    },
    expandedChecked: {
      // 是否默认展开选中项目
      type: Boolean,
      default: true
    },
    defaultCheckedList: {
      // 默认展开id List
      type: Array,
      default: () => []
    },
    ellipsisLimit: Number // 超过多少字隐藏
  },
  computed: {
    label() {
      const checked = this.dataSource.metaValue;
      return Array.isArray(checked) ? checked.join(',') : '';
    }
  },
  data() {
    return {
      strict: false,
      departmentList: [],
      showTree: false,
      expandedKeys: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getDepartmentList();
      // 如果没有传checkStrict 并且是单选  遵循父子不互相关联默认走ture
      if (this.checkStrict !== null) {
        this.strict = this.checkStrict;
      } else {
        this.strict = !this.multiple ? true : false;
      }
    },
    clear() {
      Object.assign(this.dataSource, {
        value: '',
        metaValue: ''
      });
    },
    // 获取所有部门节点
    async getDepartmentList() {
      const { url } = this.dataSource.filedConfig || {};
      if (this.departmentListProps) {
        this.departmentList = this.departmentListProps;
        return;
      }
      const { root } = url ? await _getSpecialDictTypes({ url }) : await _getDeptTreeByUser();
      this.departmentList = url ? root || [] : root ? [root] : [];
    },
    // 点击节点
    clickNode({ id, name }, node, nodeComp) {
      if (this.multiple) return;
      Object.assign(this.dataSource, {
        value: [id],
        metaValue: [name]
      });
      this.$refs.tree.show = false;
    },
    // 切换节点
    changeNode(nodeinfo, selfchecked, hasCheckedChildren) {
      if (!this.multiple || !this.strict) return;
      const $tree = this.$refs.tree;
      // $tree.removeCheckedChildren(nodeinfo);
      const checked = $tree.getCheckedNodes();
      Object.assign({
        value: checked.map((item) => item.id),
        metaValue: checked.map((item) => item.name)
      });
    },
    // 多选并且设置父子项关联模式取值逻辑特殊 只取父级选中项 子集全被选中的过滤掉
    checkedValueChange(data) {
      if (!this.multiple || this.strict) return;
      Object.assign({
        value: data.value,
        metaValue: data.name
      });
    },
    filterNode(value, data) {
      if (!value || !data.name) return true;
      return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },

    handleClear() {
      Object.assign({
        value: [],
        metaValue: []
      });
      this.$emit('on-clear');
    },
    // 选择树组件显示方法监听  设置默认展开节点列表
    handleShow(show) {
      this.showTree = show;
      let valueKeys = [];
      // const $tree = this.$refs.tree;
      if (!show) {
        return;
      }

      // 多选并且设置父子项关联模式  只取父级选中项 子集全被选中的过滤掉
      // if (!this.strict && this.multiple) {
      //     valueKeys = $tree.parentIds || [];
      // } else {
      //     valueKeys = this.dataSource.value || [];
      // }
      valueKeys = this.dataSource.value || [];

      // 如果设置了默认展开选中项 则赋值展开项为当前选中值
      if (this.expandedChecked === true) {
        this.expandedKeys = valueKeys;
      }
      // 如果当前没有选中值 则取取默认值
      if (!this.expandedKeys.length && this.defaultCheckedList.length) {
        this.expandedKeys = this.defaultCheckedList;
      }
    }
  }
};
</script>
