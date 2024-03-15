<template>
  <div v-if="show">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'page-container',
  data() {
    return {
      show: true
    };
  },
  created() {
    if (window.__POWERED_BY_WUJIE__) {
      window.$wujie?.bus.$on('sub-activated', this.onActive);
      window.$wujie?.bus.$on('sub-deactivated', this.onDeactive);
    } else {
      this.show = true;
    }
  },
  destroyed() {
    window.$wujie?.bus.$off('sub-activated', this.onActive);
    window.$wujie?.bus.$on('sub-deactivated', this.onDeactive);
  },
  methods: {
    onActive(id) {
      if (id !== window.__WUJIE.id) return;
      this.show = true;
    },
    onDeactive(id) {
      if (id !== window.__WUJIE.id) return;
      this.show = false;
    }
  }
};
</script>
