<template>
  <div class="filter-value-box">
    <component :is="curComp" v-bind="$attrs" v-on="$listeners" ref="comp"></component>
  </div>
</template>

<script>
import CtrlDisabled from './ctrl-disabled';
import CtrlInput from './ctrl-input';
import CtrlPhone from './ctrl-phone';
import CtrlSwitch from './ctrl-switch';
import CtrlCascader from './ctrl-cascader';
import CtrlMember from './ctrl-member';
import CtrlDept from './ctrl-dept';
import CtrlAddress from './ctrl-address';
import CtrlDate from './ctrl-date';

const COMPSET = {
  CtrlInput: [1001, 1002, 1005, 1006, 1008, 1011],
  CtrlPhone: [1007],
  CtrlSwitch: [1012],
  CtrlCascader: [1003, 1004],
  CtrlDisabled: [1009, 1010],
  CtrlMember: [1015],
  CtrlDept: [1013],
  CtrlAddress: [1017],
  CtrlDate: [1018]
};

export default {
  name: 'ctrl-index',
  inheritAttrs: false,
  components: {
    CtrlDisabled,
    CtrlInput,
    CtrlPhone,
    CtrlSwitch,
    CtrlCascader,
    CtrlAddress,
    CtrlDate,
    CtrlMember,
    CtrlDept
  },
  computed: {
    curComp() {
      const { filedConfig, ruleId } = this.$attrs['data-source'];
      const { fieldType } = filedConfig;
      const blackRulesTypes = [12, 13];
      const result = Object.keys(COMPSET).find((key) => {
        return COMPSET[key].includes(fieldType * 1);
      });
      return blackRulesTypes.includes(ruleId * 1) || !result ? 'CtrlDisabled' : result;
    }
  }
};
</script>
