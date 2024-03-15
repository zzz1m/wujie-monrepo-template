<template>
  <div class="history-back-card">
    <slot>
      <div class="history-back-content">
        <span class="btn-back" @click="handleGoBack">返回</span>
        <h2 class="page-history-title">{{ pageTitle }}</h2>
      </div>
    </slot>
  </div>
</template>

<script>
import { magpie, magpieUtil } from '@noah/tools';
import { mapState } from 'vuex';
let magpieConfig = magpieUtil.magpieConfig;
let { wdCustomSend } = magpie;
export default {
  name: 'HistoryBackCard',
  computed: {
    ...mapState(['userInfo']),
    ...mapState({
      pageStoreTitle: 'pageTitle'
    }),
    pageTitle() {
      return this.pageStoreTitle || this.$route.meta.title || this.$route.name || '';
    }
  },
  methods: {
    handleGoBack() {
      const { backFn } = this.$route.meta;

      try {
        if (magpieConfig.isOnline) {
          let parmas = {
            isCallBack: !!backFn,
            callBackUrl: backFn && typeof backFn === 'function' ? (backFn() || {}).url : '',
            currentUrl: location.href,
            historyLength: window.history.length
          };
          wdCustomSend({
            platform: magpieConfig.platform,
            appKey: magpieConfig.appKey,
            openId: this.userInfo.id,
            userId: this.userInfo.userId,
            sceneType: '返回按钮',
            errorType: magpieConfig.type.collectData,
            json: JSON.stringify(parmas)
            // errorCode: `Error: ${err.toString()},Info: ${info}`,
          });
        }
      } catch (error) {
        console.log(error);
      }

      if (backFn && typeof backFn === 'function') {
        const { url } = backFn() || {};
        if (url) {
          this.$router.push(url);
        } else {
          backFn();
        }
      } else {
        this.$router.back();
      }
    }
  }
};
</script>
