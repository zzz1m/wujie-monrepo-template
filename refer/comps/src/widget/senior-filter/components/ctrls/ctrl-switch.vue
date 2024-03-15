<template>
  <div class="ctrl-box-viewer no-justify">
    <ui-radio-group v-model="dataSource.value">
      <ui-radio :label="1">是</ui-radio>
      <ui-radio :label="0">否</ui-radio>
    </ui-radio-group>
  </div>
</template>

<script>
export default {
  name: 'ctrl-switch',
  inheritAttrs: false,
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    'dataSource.value'(newval, oldval) {
      this.dataSource.metaValue = newval == 1 ? '是' : '否';
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.dataSource.value == '') {
        this.dataSource.value = 0;
      }
    },
    clear() {
      this.dataSource.value = '';
      this.dataSource.metaValue = '';
      this.dataSource.status = 0;
    }
  }
};
</script>
