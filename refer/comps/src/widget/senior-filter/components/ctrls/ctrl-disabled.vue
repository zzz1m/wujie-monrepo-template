<template>
  <div class="ctrl-box-viewer">
    <ui-input readonly></ui-input>
    <span v-if="dataSource.status > 1" class="ctrl-error">{{ errmsg }}</span>
  </div>
</template>

<script>
import error from '../../error';
export default {
  name: 'ctrl-disabled',
  inheritAttrs: false,
  mixins: [error],
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
