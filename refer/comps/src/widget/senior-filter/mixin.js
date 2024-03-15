/**
 * 处理过滤器相关
 */
import { commonServices } from '@noah/tools';
const { _getFieldList } = commonServices;
import { fieldRulesByType } from './data';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      rules: []
    };
  },
  computed: {
    ...mapState('common', ['fieldGroupList'])
  },
  created() {
    const { fieldType } = this.data.filedConfig;
    this.updateRules(fieldType);
  },
  methods: {
    // 加载字段
    async getFieldList() {
      let fieldList = [];
      const groupId = this.data.fieldGroupId;

      if (this.data.fieldVOList?.length) return this.data.fieldVOList;

      if (!groupId) return [];
      await _getFieldList({ groupId }).then((res) => {
        if (res.success && res.root && res.root.length > 0) {
          fieldList = res.root;
        }
      });
      return fieldList;
    },
    // 更新规则信息
    updateRules(fieldType) {
      this.rules = fieldRulesByType(fieldType);
    },
    // 初始化字段组信息
    initFieldGroupInfo() {
      this.data.fieldId = '';
      this.data.fieldName = '';
      this.data.filedConfig = {};
      this.data.fieldStatus = 0;
      this.data.ruleId = '';
      this.data.ruleName = '';
      this.data.ruleStatus = 0;
      this.clear();
    },
    initFieldInfo() {
      this.data.ruleId = '';
      this.data.ruleName = '';
      this.data.ruleStatus = 0;
      this.clear();
    },
    clear() {
      this.$refs.ctrl.$refs.comp.clear && this.$refs.ctrl.$refs.comp.clear();
    }
  }
};
