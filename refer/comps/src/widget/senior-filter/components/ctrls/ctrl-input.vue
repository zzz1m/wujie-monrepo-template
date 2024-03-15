<template>
  <div class="ctrl-box-viewer">
    <ui-input v-bind="formItem.config" v-model.trim="dataSource.value" :disabled="$attrs.disabled" @on-blur="handleBlur" @on-change="handleInput"></ui-input>
    <span v-if="dataSource.status > 1" class="ctrl-error">{{ errmsg }}</span>
  </div>
</template>

<script>
const TYPESET = {
  1001: { type: 'text', maxLength: 40 },
  1002: { type: 'textarea', rows: 4, maxLength: 500 },
  1005: { type: 'text', maxLength: 10 },
  1006: { type: 'text', maxLength: 100 },
  1008: { type: 'text', maxLength: 18 },
  1011: { type: 'email', maxLength: 100 }
};
const createFormConfig = function (config) {
  const obj = {
    placeholder: '请输入',
    clearable: true
  };
  const { fieldType, maxLength, defaultValue } = config;
  const typeConfig = TYPESET[fieldType];
  obj.type = typeConfig.type;
  obj.maxlength = maxLength * 1 || typeConfig.maxLength;
  obj.rows = typeConfig.rows || 1;
  obj.value = defaultValue || '';
  return obj;
};

const RULES = {
  idCardInput: /[^\dxX]/g,
  numberInput: /[^-\d\.]/g
};

import error from '../../error';

export default {
  name: 'ctrl-input',
  inheritAttrs: false,
  mixins: [error],
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    'dataSource.filedConfig': {
      immediate: true,
      deep: true,
      handler(newval, oldval) {
        this.initCtrl(newval);
      }
    }
  },
  data() {
    return {
      // 表单信息 配置
      formItem: {}
    };
  },
  methods: {
    initCtrl(newval) {
      const config = createFormConfig(newval);
      this.$set(this.formItem, 'config', config);
    },
    clear() {
      this.dataSource.value = '';
      this.dataSource.metaValue = '';
      this.dataSource.status = 0;
    },
    // 处理失焦
    handleBlur() {
      this.isOk();
      const { value, filedConfig } = this.dataSource;
      if (value == '') {
        this.isEmpty();
      } else {
        switch (filedConfig.fieldType * 1) {
          case 1005: // 数字
            this.isNumber(value);
            break;
          case 1006: // 金额
            this.isNumber(value);
            break;
          case 1008: // 身份证
            this.isIdCard(value);
            break;
          case 1011: // 邮箱
            this.isEmail(value);
            break;
        }
      }
    },
    // 处理输入
    async handleInput() {
      let result = this.dataSource.value;
      const { filedConfig } = this.dataSource;
      if (filedConfig.fieldType * 1 === 1008) {
        // 身份证
        result = await result.replace(RULES.idCardInput, '');
      } else if ([1005, 1006].includes(filedConfig.fieldType * 1)) {
        // 数字，金额
        result = await result.replace(RULES.numberInput, '');
      }
      this.dataSource.value = result;
      this.dataSource.metaValue = result;
    }
  }
};
</script>
