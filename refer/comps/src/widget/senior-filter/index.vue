<template>
  <div class="filter-viewer">
    <filter-list v-for="(list, key) in value" :key="key" :sort="key" :total="value.length" @on-add="addFilterItem(list)" @on-delete="deleteScope(key)">
      <template slot="list">
        <filter-item
          v-for="(item, idx) in list"
          :key="item.fieldGroupId + item.fieldId + item.ruleId + idx"
          :deletable="list.length > 1"
          :data="formatRelation(item)"
          :scene-id="sceneId"
          @on-delete="deleteFilter(list, idx)"
        ></filter-item>
      </template>
    </filter-list>
    <div class="add-filter" @click="addScope">
      <svg-icon icon-class="add-circle-fill"></svg-icon>
      <span class="label">添加范围</span>
    </div>
  </div>
</template>

<script>
import FilterList from './components/filter-list';
import FilterItem from './components/filter-item';

import { createFilterByAnd, createGroupFilterByOr } from './data';
import { mapActions } from 'vuex';

export default {
  name: 'SeniorFilter',
  components: { FilterList, FilterItem },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    //
    fieldGroupList: {
      type: Array,
      default: () => []
    },
    sceneId: {
      type: String,
      default: ''
    }
  },
  created() {
    if (this.sceneId && this.fieldGroupList?.length) {
      this.$store.commit('common/M_getFieldGroupList', this.fieldGroupList);
      return;
    }
    this.A_getFieldGroupList();
  },
  methods: {
    ...mapActions('common', ['A_getFieldGroupList']),
    formatRelation(item) {
      const sceneId = this.sceneId;
      if (sceneId) item.fieldGroupId = sceneId;
      if (this.fieldGroupList?.length) item.fieldVOList = this.fieldGroupList[0].fieldVOList;
      return item;
    },
    reset() {
      const arr = [createGroupFilterByOr()];
      this.$emit('input', arr);
    },
    addScope() {
      this.value.push(createGroupFilterByOr());
    },
    deleteScope(key) {
      this.value.splice(key, 1);
    },
    addFilterItem(list) {
      list.push(createFilterByAnd());
    },
    deleteFilter(list, idx) {
      list.splice(idx, 1);
    },
    getData() {
      return this.value;
    },
    valid() {
      this.value.forEach((arr) => {
        arr.forEach((item) => {
          const whiteRuleList = [12, 13]; // 规则为【为空，不为空】
          const whiteTypeList = [1012]; // 布尔值
          const ruleId = item.ruleId * 1;
          const fieldType = item.filedConfig.fieldType * 1;
          const isOk = whiteTypeList.includes(fieldType) || whiteRuleList.includes(ruleId) || item.value.length;
          item.fieldGroupStatus = item.fieldGroupId ? 0 : 1;
          item.fieldStatus = item.fieldId ? 0 : 1;
          item.ruleStatus = item.ruleId ? 0 : 1;
          item.status = item.status > 1 ? item.status : isOk ? 0 : 1;
          // 计算新的叶子节点数据 1003 / 1004 / 1017
          if (item.filedConfig && [1003, 1004, 1017].includes(item.filedConfig.fieldType * 1)) {
            item.leafValue = (item.metaValue || []).map((cell) => {
              const leafkeyArr = cell.value.split('/');
              return leafkeyArr.pop();
            });
          } else {
            item.leafValue = [];
          }
        });
      });
      return this.value.some((arr) => {
        return arr.some((item) => {
          const { fieldGroupStatus, fieldStatus, ruleStatus, status } = item;
          return fieldGroupStatus + fieldStatus + ruleStatus + status > 0;
        });
      });
    }
  }
};
</script>
