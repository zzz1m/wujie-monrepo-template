<template>
  <div :class="['ctrl-date-viewer ctrl-box-viewer', isDateVar ? 'isDateVar' : '']">
    <ui-input v-show="isDateVar" :value="dataSource.metaValue" class="ctrl-input" readonly></ui-input>
    <ui-date-picker
      v-model="curDate"
      align="left"
      placeholder="请选择"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :type="dateType"
      :disabled="$attrs.disabled"
      :value-format="dataSource.filedConfig.regulation"
      :format="dataSource.filedConfig.regulation"
      :picker-options="pickerOptions"
      @on-change="handleChange"
    >
    </ui-date-picker>
    <span v-if="dataSource.status > 1" class="ctrl-error">{{ errmsg }}</span>
  </div>
</template>

<script>
import { DATEVAR } from '../../data';
import error from '../../error';
// 计算日期变量
const calcDateVar = function (regulation, ruleId) {
  return DATEVAR.filter((item) => {
    return item.rules.some((cell) => {
      const hasRule = cell.ruleids ? cell.ruleids.includes(ruleId) : true;
      const hasRegulation = cell.regulation.includes(regulation);
      return hasRule && hasRegulation;
    });
  });
};
// 日期控件类型
const calcDateType = function (regulation, ruleId) {
  let result = '';
  switch (true) {
    case regulation == 'yyyy':
      result = 'year';
      break;
    case regulation == 'yyyy-MM' && ruleId != 11:
      result = 'month';
      break;
    case regulation == 'yyyy-MM' && ruleId == 11:
      result = 'monthrange';
      break;
    case regulation == 'yyyy-MM-dd' && ruleId != 11:
      result = 'date';
      break;
    case regulation == 'yyyy-MM-dd' && ruleId == 11:
      result = 'daterange';
      break;
    case regulation == 'yyyy-MM-dd HH:mm' && ruleId != 11:
      result = 'datetime';
      break;
    case regulation == 'yyyy-MM-dd HH:mm' && ruleId == 11:
      result = 'datetimerange';
      break;
  }
  return result;
};

let isUpdatingDatevar = false;
let timer = null;

export default {
  name: 'CtrlDate',
  inheritAttrs: false,
  mixins: [error],
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isDateVar() {
      const { value } = this.dataSource;
      return typeof value === 'string' && value.startsWith('$');
    },
    isRange() {
      return this.dataSource.ruleId == 11; // 区间类型
    }
  },
  watch: {
    'dataSource.value'(newval) {
      let result;
      if (this.isRange) {
        result = newval == '' || this.isDateVar ? [] : newval;
      } else {
        result = this.isDateVar ? '' : newval;
      }
      this.curDate = result;
      const isEmpty = Array.isArray(newval) ? newval.length === 0 : newval === '';
      this.dataSource.status = isEmpty ? 1 : 0;
    }
  },
  data() {
    return {
      pickerOptions: {},
      dateType: 'date',
      curDate: ''
    };
  },
  created() {
    this.initDateType();
    this.initData();
  },
  methods: {
    initDateType() {
      // 初始化日期类型
      const self = this;
      const { filedConfig, ruleId } = this.dataSource;
      // 生成快捷选项
      const shortcuts = calcDateVar(filedConfig.regulation, ruleId * 1).map((item) => {
        const { value, name } = item;
        return {
          text: name,
          onClick(picker) {
            self.clickDateVar(item);
            picker.$emit('pick', null);
          }
        };
      });
      this.dateType = calcDateType(filedConfig.regulation, ruleId * 1);
      this.$set(this.pickerOptions, 'shortcuts', shortcuts.length > 0 ? shortcuts : null);
    },
    initData() {
      let value = this.dataSource.value;
      const ruleId = this.dataSource.ruleId * 1;
      if (value && !this.isDateVar) {
        this.dataSource.value = ruleId === 11 ? (Array.isArray(value) ? value : []) : Array.isArray(value) ? '' : value;
      }
      this.initDate();
      this.$nextTick(() => {
        this.dataSource.status = 0;
      });
    },
    initDate() {
      let result = this.dataSource.value;
      if (this.isDateVar) {
        result = this.isRange ? [] : '';
      }
      this.curDate = result;
    },
    clear() {
      this.dataSource.value = '';
      this.dataSource.metaValue = '';
      this.$nextTick(() => {
        this.dataSource.status = 0;
      });
    },
    // 改变日期
    handleChange(data) {
      if (isUpdatingDatevar) return;
      const checked = Array.isArray(data) ? data.join('至') : data;
      this.dataSource.value = data;
      this.dataSource.metaValue = checked;
      checked ? this.isOk() : this.isEmpty();
    },
    // 点击日期变量
    clickDateVar({ value, name }) {
      this.dataSource.value = value;
      this.dataSource.metaValue = name;
      isUpdatingDatevar = true;
      setTimeout(() => {
        isUpdatingDatevar = false;
      }, 300);
    }
  }
};
</script>
