<template>
  <li class="filter-item">
    <div v-if="deletable" class="icon-remove">
      <svg-icon icon-class="remove-circle-fill" class="svg-active" @click.native="deleteFilter"></svg-icon>
      <svg-icon icon-class="remove-circle-fill-disabled" class="svg-disabled"></svg-icon>
    </div>

    <!-- 对象 -->
    <ui-select
      v-model="data.fieldGroupId"
      label-in-value
      filterable
      transfer
      :disabled="Boolean(sceneId)"
      :class="[data.fieldGroupStatus > 0 ? 'ui-select-error' : '']"
      @on-change="changeFieldGroup"
    >
      <template v-if="fieldGroupList.length > 0">
        <!-- eslint-disable-next-line -->
        <ui-option v-for="item in fieldGroupList" :key="item.id" :value="item.id">{{ item.name }}</ui-option>
      </template>
    </ui-select>

    <!-- 字段 -->
    <ui-select-new
      label-in-value
      remote
      filterable
      transfer
      :class="[data.fieldStatus > 0 ? 'ui-select-error' : '']"
      :disabled="!data.fieldGroupId"
      :remote-method="getFieldList"
      :label="data.fieldName"
      @option-selected="changeField"
    ></ui-select-new>

    <!-- 规则 -->
    <ui-select
      v-model="data.ruleId"
      label-in-value
      filterable
      transfer
      :class="['ui-select-mini', data.ruleStatus > 0 ? 'ui-select-error' : '']"
      :disabled="!data.fieldId"
      @on-change="changeRule"
    >
      <template v-if="rules.length > 0">
        <!-- eslint-disable-next-line -->
        <ui-option v-for="item in rules" :key="item.value" :value="item.value">{{ item.label }}</ui-option>
      </template>
    </ui-select>
    <!-- 对象值 -->
    <ctrls ref="ctrl" :data-source="data" :class="[data.status > 0 ? 'ui-select-error' : '']" :disabled="!data.ruleId"></ctrls>
  </li>
</template>

<script>
import Ctrls from './ctrls/index';
import UiSelectNew from './ui-select-new';
import mixin from '../mixin';

export default {
  name: 'FilterItem',
  mixins: [mixin],
  components: { Ctrls, UiSelectNew },
  props: {
    deletable: Boolean,
    data: {
      type: Object,
      default: () => ({})
    },
    sceneId: String
  },
  watch: {
    fieldGroupList: {
      deep: true,
      handler(newval) {
        if (newval.length > 0) {
          this.limitSceneId();
        }
      }
    }
  },
  methods: {
    limitSceneId() {
      const { sceneId, fieldGroupList } = this;
      const result = fieldGroupList.find((item) => item.id === sceneId);
      if (!sceneId || !result) return;
      this.data.fieldGroupId = sceneId;
      const obj = {
        value: sceneId,
        label: result.name
      };
      this.changeFieldGroup(obj);
    },
    deleteFilter() {
      this.$emit('on-delete');
    },
    // 改变字段组
    changeFieldGroup(item) {
      if (!item || this.sceneId) return;
      const { value, label } = item;
      this.data.fieldGroupName = label;
      this.data.fieldGroupStatus = 0;
      this.initFieldGroupInfo();
    },
    // 改变字段
    changeField(item) {
      if (!item) return;
      const { id, name, config } = item;
      this.data.fieldId = id;
      this.data.fieldName = name;
      this.data.filedConfig = config || {};
      this.data.fieldStatus = 0;
      this.initFieldInfo();
      this.updateRules(config.fieldType);
    },
    // 改变字段规则
    changeRule(item) {
      if (!item) return;
      this.data.ruleName = item ? item.label : '';
      this.data.ruleId = item ? item.value : '';
      this.data.ruleStatus = 0;
      const whiteRulelist = [12, 13]; // 规则为【为空，不为空】
      if (whiteRulelist.includes(item.value * 1)) {
        this.clear();
        this.data.status = 0;
      }
    }
  }
};
</script>
