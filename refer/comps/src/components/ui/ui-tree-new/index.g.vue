<template>
  <div v-clickoutsider="hide" :class="['ui-tree-viewer', $attrs.clearable && !limited ? 'clearable' : '']">
    <div :class="['ctrl-input', label ? '' : 'blank', $attrs.disabled ? 'disabled' : '']">
      <template v-if="checkedName || label">
        <span ref="tree-label" class="tree-label">{{ checkedName || label }}</span>
      </template>
      <span v-else class="ui-tree-placeholder">{{ placeholder || '请选择' }}</span>
    </div>
    <ui-tooltip v-if="limited" :content="checkedName || label" effect="dark" placement="top">
      <ui-select
        v-model="placeVal"
        class="ctrl-select place-select"
        :clearable="$attrs.clearable"
        :disabled="$attrs.disabled"
        @click.native="toggle"
        @on-clear="placeClear"
      >
        <ui-option label="占位" value="占位">占位</ui-option>
      </ui-select>
    </ui-tooltip>

    <ui-select
      v-else
      ref="select"
      v-model="nodevalue"
      class="ctrl-select"
      :clearable="$attrs.clearable"
      :disabled="$attrs.disabled"
      :placeholder="$attrs.clearable ? placeholder : '请选择'"
      @click.native="toggle"
      @on-clear="clearSelect"
    >
      <ui-option v-for="item in droplist" :key="item.id" :label="item.name" :value="item.id">{{ item.name }}</ui-option>
    </ui-select>
    <div class="tree-box">
      <ui-input
        v-if="show && filter"
        ref="filterInput"
        v-model="filterValue"
        placeholder="请输入筛选条件"
        type="text"
        @click.native="handleInputClick"
      ></ui-input>
      <ui-tree v-if="show" ref="tree" class="ctrl-tree" v-bind="$attrs" v-on="$listeners" @check-change="onCheckChange" @node-click="treeNodeClick"></ui-tree>
    </div>
  </div>
</template>

<script>
const removeChecked = function (childNodes) {
  Array.prototype.forEach.call(childNodes, (node) => {
    node.setChecked(false, true);
    if (node.childNodes && node.childNodes.length > 0) removeChecked(node.childNodes);
  });
};

import { calcStrLength, debounce } from '@noah/tools/src/utils/util';

export default {
  name: 'UiTreeNew',
  inheritAttrs: false,
  props: {
    label: String,
    filter: Boolean,
    placeholder: String,
    ellipsisLimit: {
      type: Number,
      default: 30
    }
  },
  computed: {
    limited() {
      const length = calcStrLength(this.checkedName || this.label || '');
      return length > this.ellipsisLimit;
    }
  },
  data() {
    return {
      show: false,
      filterValue: '',
      placeVal: '占位',
      // 以下2项为处理单选逻辑使用
      nodevalue: '',
      droplist: [],
      parentIdListMap: {}, // 根据id 查找父级id
      idMap: {}, // 以id为key 做数据扁平化处理
      checkedName: '', // 多选的name展示
      parentIds: [] // 去掉子集全备选中的子集id  生效全被选中的父级id或者末级
    };
  },
  watch: {
    filterValue(val) {
      this.$refs.tree.filter(val);
    },
    show(val) {
      if (!val && this.filterValue) {
        this.filterValue = '';
      }
      if (!val) {
        this.hideSelect();
      }
      this.$emit('on-show', val);
    },
    label: {
      handler(data) {
        this.initSelectData();
      },
      immediate: true,
      deep: true
    },
    checkedids: {
      handler(val) {},
      // immediate: true,
      deep: true
    },
    '$attrs.data': {
      handler(val) {
        if (val.length && Object.keys(this.idMap).length === 0) {
          const { props = {}, 'node-key': nodeKey, data } = this.$attrs;
          const { parentIdListMap, idMap } = this.getMap(data, {
            children: props.children || 'children',
            nodeKey: nodeKey || 'id'
          });
          this.idMap = idMap;
          this.parentIdListMap = parentIdListMap;
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    toggle() {
      if (this.$attrs.disabled) return;
      this.show = !this.show;
    },
    placeClear() {
      this.$nextTick(() => {
        this.placeVal = '占位';
        this.clearSelect();
      });
    },
    hide() {
      this.show = false;
    },
    removeCheckedChildren(data) {
      const childNodes = this.$refs.tree.getNode(data).childNodes;
      removeChecked(childNodes);
    },
    getCheckedNodes(flag = false) {
      return this.$refs.tree.getCheckedNodes(flag);
    },
    // 处理兼容问题
    handleInputClick() {
      this.$refs.filterInput.focus();
    },
    hideSelect() {
      this.$refs.select && this.$refs.select.hideMenu();
    },
    // 处理单选clearable逻辑使用
    treeNodeClick({ id, name }, node, nodeComp) {
      // if( !this.$attrs.clearable ) return;
      // if( id && name) {
      //     this.droplist = [ {id, name} ];
      //     this.$nextTick(() => {
      //         this.nodevalue = id;
      //     });
      // }
    },
    // 处理单选clearable逻辑使用
    clearSelect() {
      // this.$refs['tree-label'].innerText =  this.placeholder || '请选择';
      this.$emit('on-clear');
      this.hide();
    },
    // 处理单选clearable逻辑使用 用于初始化和点击节点选择后回显
    initSelectData() {
      if (!this.$attrs.clearable) return;
      let label = this.label;
      let value = this.$attrs['default-checked-keys'] ? this.$attrs['default-checked-keys'][0] : '';
      this.nodevalue = value;
      if (!(value && label)) return;
      this.droplist = [
        {
          id: value,
          name: label
        }
      ];
    },
    /**
     * @description 生成最底层id 和 其父级id的对应关系
     * @param {Array} list 树数据
     * @param {Array} config 配置项
     */
    getMap(list = [], config) {
      let parentIdListMap = {};
      let idMap = {};
      // list树结构数据  父级id列表idArr
      function getList(list, idArr = []) {
        for (let i = 0; i < list.length; i++) {
          // 如果有子集继续遍历
          if (list[i][config.children] && list[i][config.children].length) {
            // 防止应用类型问题 重新生成新数组
            let newArr = [...idArr, list[i][config.nodeKey]];
            getList(list[i][config.children], newArr);
          }
          // 生成对应关系 子集映射所有父级id
          parentIdListMap[list[i][config.nodeKey]] = idArr;
          // 数据扁平化处理
          idMap[list[i][config.nodeKey]] = list[i];
        }
      }
      getList(list);
      return {
        parentIdListMap,
        idMap
      };
    },
    checkChange() {
      const { props = {}, 'check-strictly': checkStrictly } = this.$attrs;
      // 父子项不关联 则不做任何处理
      if (checkStrictly) {
        return;
      }
      const $tree = this.$refs.tree;
      if (!$tree) return;
      const checkedIdList = $tree.getCheckedKeys();
      const parentIds = [];
      checkedIdList.forEach((item) => {
        // 只有父级id 没被选中 才将id推到数组中  判断逻辑:  (当前所有选中的id + 循环当前项的父idList).length === 这个两个list合并去重.length 如果相等 证明没有重复项
        if (checkedIdList.length + this.parentIdListMap[item].length === [...new Set([...checkedIdList, ...this.parentIdListMap[item]])].length) {
          parentIds.push(item);
        }
      });
      this.parentIds = parentIds;
      // 提取name 进行显示
      let nameList = parentIds.map((item) => {
        return this.idMap[item][props.label];
      });
      this.checkedName = nameList.join(',');
      this.$emit('checked-value-change', {
        value: this.parentIds,
        name: nameList
      });
    },
    onCheckChange: debounce(100, function () {
      this.checkChange();
    })
  }
};
</script>

<style lang="less" scoped>
.place-select ::v-deep.ui-select-selected-value {
  opacity: 0;
}
</style>
