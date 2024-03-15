<template>
  <div class="filter-list-viewer">
    <!-- 分割区域 -->
    <div v-if="sort > 0" class="filter-split">
      <div class="filter-split-label">或(OR)</div>
    </div>
    <div class="filter-content">
      <!-- 左侧提示 -->
      <div class="filter-tip">
        <svg-icon icon-class="remove-circle-fill" class="svg-active" @click.native="deleteList"></svg-icon>
        <svg-icon icon-class="remove-circle-fill-disabled" class="svg-disabled"></svg-icon>
        <span class="filter-tip-label">且(AND)</span>
      </div>
      <!-- 条件群组区域 -->
      <div class="filter-list">
        <ul>
          <slot name="list"></slot>
          <li class="filter-item last">
            <svg-icon icon-class="add-circle-fill" @click.native="addList"></svg-icon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterList',
  props: {
    sort: Number,
    total: Number
  },
  methods: {
    addList() {
      this.$emit('on-add');
    },
    deleteList() {
      // if( this.total < 2 )return;
      this.$emit('on-delete');
    }
  }
};
</script>
