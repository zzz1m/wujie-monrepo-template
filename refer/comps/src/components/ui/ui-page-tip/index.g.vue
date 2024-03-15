<template>
  <div class="data-tips">
    <div class="tip-inner">
      <slot v-if="type == 'loading'">
        <p class="gray"><i :class="classesData[type]"></i>{{ textData[type] }}</p>
      </slot>
      <slot v-else>
        <slot name="icon"><i :class="classesData[type]"></i></slot>
        <slot name="text">
          <p class="gray">{{ showText || textData[type] }}</p>
        </slot>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UiTableTip',
  props: {
    type: {
      type: String,
      default() {
        return 'nodata';
      }
    },
    showText: String
  },
  data() {
    return {
      textData: {
        error: '数据加载出错',
        nodata: '没有相关数据',
        lock: '已锁定',
        loading: '正在加载中...',
        notodo: '暂无待办',
        nosearch: '暂无搜索结果'
      },
      classesData: {
        notodo: 'no-todo-data',
        error: 'tip-errordata',
        nodata: 'tip-nodata',
        lock: 'tip-lockdata',
        loading: 'ui-icon-loading',
        nosearch: 'tip-ui-icon-no-search'
      }
    };
  },
  computed: {},
  methods: {}
};
</script>
