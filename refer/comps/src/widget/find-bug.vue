<template>
  <div v-if="!isOnline" class="bug-container">
    <ui-tooltip content="复制页面信息，并跳转到JIRA" effect="dark" :open-delay="400" placement="left">
      <span class="bug-text" @click="handleCopy">bug</span>
    </ui-tooltip>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {
    isOnline() {
      return location.host === 'noah.kanzhun-inc.com' ? true : false; // 判断是否是线上环境
    }
  },
  methods: {
    openUrl(url) {
      let a = document.createElement('a');
      a.target = '_blank';
      let event = new MouseEvent('click');
      a.href = url;
      a.dispatchEvent(event);
      a = null;
    },
    handleCopy() {
      const textarea = document.createElement('textarea');
      const addr = window.location.href;
      const ua = window.navigator.userAgent;
      const email = this.$store.state.userInfo?.email;
      textarea.value = `【测试地址】${addr}\n【登录邮箱】${email}\n【测试时间】${this.$dayjs().format(
        'YYYY-MM-DD'
      )}\n【测试步骤】\n【测试结果】\n【期望结果】\n【问题备注】\n【设备信息】${ua}`;
      textarea.setAttribute('readonly', 'readonly');
      document.body.appendChild(textarea);
      textarea.select();
      if (document.execCommand('copy')) {
        this.openUrl('https://jira.kanzhun-inc.com/secure/Dashboard.jspa');
      } else {
        this.$toast({
          content: '复制失败',
          type: 'warning'
        });
      }
      document.body.removeChild(textarea);
    }
  }
};
</script>
<style scoped>
.bug-container {
  position: fixed;
  right: 20px;
  bottom: 120px;
  display: inline-block;
  z-index: 999;
}
.bug-text {
  width: 42px;
  height: 42px;
  text-align: center;
  line-height: 42px;
  background: #f56c6c;
  color: #fff;
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
