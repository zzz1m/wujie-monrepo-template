<template>
  <div class="ctrl-box-viewer ctrl-member">
    <ui-select
      ref="member"
      v-model="dataSource.value"
      clearable
      :collapse-tags="multiple"
      :disabled="$attrs.disabled"
      filterable
      :format-label-text="formatLabelText"
      :multiple="multiple"
      placeholder="请选择"
      transfer
      @on-change="handleChange"
      @on-query-change="queryMember"
    >
      <ui-option v-for="(item, key) in memberList" :key="key" :label="item.name" :value="item.value + ''">{{ item.label }}</ui-option>
    </ui-select>
    <span v-if="dataSource.status > 1" class="ctrl-error">{{ errmsg }}</span>
  </div>
</template>

<script>
import error from '../../error';
import { commonServices } from '@noah/tools';
const { _searchInfo } = commonServices;

let timeout = null;

export default {
  name: 'CtrlMember',
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
    }
  },
  // watch: {
  //     'dataSource.ruleId'(newval) {
  //         this.dataSource.value = this.multiple ? [] : '';
  //         this.dataSource.metaValue = '[]';
  //     }
  // },
  data() {
    return {
      memberList: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const multileRules = [3, 4]; // 属于 不属于
      const { ruleId, value } = this.dataSource;
      if (value == '') {
        this.dataSource.value = this.multiple ? [] : '';
      } else {
        if (multileRules.includes(ruleId * 1) && !Array.isArray(value)) {
          this.dataSource.value = [];
          this.dataSource.metaValue = '';
        }
        if (!multileRules.includes(ruleId * 1) && Array.isArray(value)) {
          this.dataSource.value = '';
          this.dataSource.metaValue = '';
        }
      }
      this.memberList = JSON.parse(this.dataSource.metaValue || '[]');
    },
    clear() {
      this.dataSource.value = '';
      this.dataSource.metaValue = '';
      this.dataSource.status = 0;
    },
    // 查找
    queryMember(key) {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        try {
          const res = await _searchInfo({ key });
          if (res.success && res.root && res.root.length > 0) {
            this.memberList = res.root.map((n) => {
              return {
                name: n.name,
                label: `${n.name}-${n.deptName}-${n.email}`,
                value: n.id + ''
              };
            });
          }
        } catch (err) {
          console.log(err);
        }
      }, 500);
    },
    // 选项改变
    handleChange() {
      const { values } = this.$refs.member;
      const checkedLength = values.length;

      checkedLength > 0 ? this.isOk() : this.isEmpty();
      this.dataSource.metaValue = JSON.stringify(values);
    },
    formatLabelText(text, item, label) {
      if (!text) {
        return '';
      }
      return text.split('-').slice(0, 2).join('-');
    }
  }
};
</script>
