<template>
  <li
    :class="{
      expand: treeData.id === currentId || isShow,
      selected: treeData.id === currentId
    }"
    @click.stop="select(treeData)"
  >
    <i
      v-if="treeData.children && treeData.children.length"
      :class="treeData.children && treeData.children.length ? 'icon-expand' : ''"
      @click.stop="expand($event)"
    ></i>
    <span class="item" :title="treeData.name">{{ treeData.name }}</span>
    <ul v-if="treeData.children && treeData.children.length">
      <partment-tree
        v-for="(item, index) in treeData.children"
        :key="index"
        :current-id="currentId"
        :tree-data="item"
        @update:select="emitToggle"
      ></partment-tree>
    </ul>
  </li>
</template>

<script type="text/javascript">
export default {
  name: 'PartmentTree',
  props: {
    currentId: {
      type: String,
      default: ''
    },
    treeData: {
      type: Object,
      default: () => ({})
    }
  },
  components: {},
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    if (this.currentId && this.treeData.children && this.treeData.children.length) {
      this.findSeletItem(this.treeData);
    }
  },
  methods: {
    expand(e) {
      let el = e.target;
      $(el).closest('li').toggleClass('expand'); // eslint-disable-line
    },
    select(item) {
      this.emitToggle(item);
    },
    emitToggle(data) {
      this.$emit('update:select', data);
    },
    findSeletItem(arr) {
      arr.children.forEach((item) => {
        if (item.id === this.currentId) {
          this.isShow = true;
        } else {
          if (item.children && item.children.length) this.findSeletItem(item);
        }
      });
    }
  }
};
</script>
