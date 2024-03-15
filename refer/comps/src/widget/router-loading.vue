<template>
  <div v-if="pageIsLoading" class="page-container-loading">
    <p class="gray"><i class="ui-icon-loading"></i>正在加载中...</p>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(['pageIsLoading'])
  },
  mounted() {},
  methods: {}
};
</script>
