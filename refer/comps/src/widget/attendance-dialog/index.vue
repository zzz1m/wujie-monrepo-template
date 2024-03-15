<template>
  <ui-dialog
    v-model="show"
    :lock="true"
    :prevent-confirm="true"
    prevent-layer
    :show-footer="false"
    :show-header="false"
    special-type="flyin-large"
    width="500"
    wrap-class="ui-dialog-reset bossui-new attendance-apply-dialog"
  >
    <template v-if="show && typeName" slot="content">
      <div class="dialog-header">
        <div class="dialog-title">{{ `填写${typeName}信息` }}</div>
        <i class="ui-icon-close close-icon" @click="closeDialog"></i>
      </div>
      <div class="dialog-content" :style="options.pageType === 'stay-home' ? `padding-left: 12px` : ''">
        <div class="dialog-content-inner">
          <Special v-if="options.pageType === 'special'" ref="special" :options="options" @close="closeDialog" @refresh="$emit('refresh')" />
          <Vacation v-else ref="vacation" :options="options" @close="closeDialog" @refresh="$emit('refresh')" />
        </div>
      </div>
      <div class="dialog-footer-area">
        <button class="btn" @click="closeDialog">取消</button>
        <button class="btn btn-primary" @click="submit">提交</button>
      </div>
    </template>
  </ui-dialog>
</template>

<script>
import { types } from './const';

import Special from './special.vue';
import Vacation from './vacation.vue';

export default {
  components: {
    Special,
    Vacation
  },
  data() {
    return {
      show: false,
      options: {}
    };
  },
  computed: {
    typeInfo() {
      return types[this.options.pageType] || {};
    },
    typeName() {
      const name = types[this.options.pageType]?.name;
      // https://wiki.kanzhun-inc.com/pages/viewpage.action?pageId=227117240
      if (name === '公出') {
        return this.options.dataType == '13' ? '出差' : '公出';
      }
      return name && name !== '补卡申请信息' ? name : '申诉';
    }
  },
  methods: {
    onSelectChange() {},
    open(options) {
      this.options = options;
      this.options.dataType = (this.options.dataType && this.options.dataType + '') || '';

      this.show = true;
    },
    closeDialog() {
      this.show = false;
    },
    submit() {
      if (this.options.pageType === 'special') {
        this.$refs.special?.confirm();
      } else {
        this.$refs.vacation?.confirm();
      }
    }
  }
};
</script>
