<template>
  <ui-dialog
    v-model="show"
    lock
    :prevent-confirm="true"
    prevent-layer
    :show-footer="false"
    style="zindex: 1999"
    title="审批流程预览"
    wrap-class="ui-dialog-reset bossui-new audit-process-preview-dialog"
  >
    <template v-if="show" slot="content">
      <div class="audit-progress-wrap-preview dialog" :style="list.length ? '' : 'margin-top:0'">
        <ui-pagetip v-if="type === 'loading'" style="min-height: 260px; height: 260px" type="loading"> </ui-pagetip>
        <ui-pagetip v-else-if="!list.length || type === 'empty'" style="min-height: 260px; height: 260px" type="nodata">
          <template slot="text">暂无流程</template>
        </ui-pagetip>
        <VProgress v-else :list="list" />
      </div>
    </template>
  </ui-dialog>
</template>

<script>
import VProgress from './progress.vue';
export default {
  components: {
    VProgress
  },
  data() {
    return {
      show: false,
      type: 'loading',
      list: []
    };
  },
  methods: {
    open(list) {
      if (['empty', 'loading'].includes(list)) {
        this.type = list;
      } else {
        this.type = 'list';
        this.list = list;
      }

      this.show = true;
    }
  }
};
</script>

<style lang="less">
.audit-process-preview-dialog {
  .dialog-container {
    width: 40% !important;
    max-width: 900px;
  }
  .dialog-body {
    margin-right: -30px;
    padding-right: 30px;
  }
}
</style>
