<template>
  <div class="page-content error-page"></div>
</template>

<script>
import { store, magpie, magpieUtil } from '@noah/tools';
let magpieConfig = magpieUtil.magpieConfig;
let { wdCustomSend } = magpie;

export default {
  components: {},
  data() {
    return {
      title: this.$route.query && this.$route.query.title
    };
  },
  beforeRouteEnter(to, from, next) {
    if (magpieConfig.isOnline) {
      const referrer = document.referrer;
      wdCustomSend({
        appKey: magpieConfig.appKey,
        platform: magpieConfig.platform,
        openId: store.state.userInfo.id,
        userId: store.state.userInfo.userId,
        referrer,
        errorType: magpieConfig.type.router404,
        errorCode: `页面404 ${referrer}`
      });
    }
    next();
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {},
  created() {
    console.log('===404', this.$route);
    if (this.title) {
      this.$set(this.$route.meta, 'title', this.title);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.error-page {
  background: url('~@/assets/images/404.png') no-repeat center;
  background-size: 200px 200px;
}
//@import url();
</style>
