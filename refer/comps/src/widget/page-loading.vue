<template>
  <div v-if="loading" class="page-loading-container">
    <img src="https://img.bosszhipin.com/static/file/2022/72zk60i19y1647915897240.gif" />
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
    ...mapState(['loading'])
  },
  mounted() {
    // setTimeout(() => {
    //     this.$store.commit('updateLoading', true);
    // }, 5000);
  },
  methods: {}
};
</script>
