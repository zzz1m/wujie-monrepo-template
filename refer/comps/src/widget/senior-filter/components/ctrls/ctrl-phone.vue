<template>
  <div class="ctrl-phone-viewer ctrl-box-viewer">
    <ui-select v-model="dataSource.addedValue" :disabled="$attrs.disabled" transfer @on-change="handleBlur">
      <ui-option value="86">+86</ui-option>
      <ui-option value="1">+1</ui-option>
    </ui-select>
    <ui-input
      placeholder="请输入"
      clearable
      v-model="dataSource.value"
      :maxlength="20"
      :disabled="$attrs.disabled"
      @on-change="handleInput"
      @on-blur="handleBlur"
    ></ui-input>

    <span v-if="dataSource.status > 1" class="ctrl-error">{{ errmsg }}</span>
  </div>
</template>

<script>
import error from '../../error';

const RULES = {
  onlyNumberInput: /[^\d]/g
};

const VALUES = {
  86: '+86',
  1: '+1'
};

export default {
  name: 'ctrl-phone',
  inheritAttrs: false,
  mixins: [error],
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    'dataSource.addedValue'(newval) {
      this.dataSource.metaAddedValue = VALUES[newval] || '';
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      if (this.dataSource.addedValue == '') {
        this.dataSource.addedValue = '86';
      }
    },
    clear() {
      this.dataSource.value = '';
      this.dataSource.metaValue = '';
      this.dataSource.status = 0;
      this.dataSource.addedValue = '';
      this.dataSource.metaAddedValue = '';
      this.dataSource.addedStatus = 0;
    },
    // 处理输入
    async handleInput() {
      let result = await this.dataSource.value.replace(RULES.onlyNumberInput, '');
      this.dataSource.value = result;
      this.dataSource.metaValue = result;
    },
    // 处理失焦
    handleBlur() {
      this.isOk();
      const { value, addedValue } = this.dataSource;
      if (value == '') {
        this.isEmpty();
      } else {
        switch (addedValue) {
          case '1': // 非中国区号
            this.isNotChinaPhone(value);
            break;
          case '86': // 中国区号
            this.isChinaPhone(value);
            break;
        }
      }
    }
  }
};
</script>
