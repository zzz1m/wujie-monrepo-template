<template>
  <ui-dialog
    id="post-dialog"
    lock
    pre-ka="post-dialog"
    prevent-hide
    :show-footer="false"
    :title="postDialogInfo.remark"
    :value="showPostDialog"
    width="560"
    wrap-class="ui-dialog-reset noah-post-dialog-warp"
    @on-close="onHideDialog"
  >
    <template v-if="showPostDialog" slot="content">
      <div ref="content" v-html="postDialogInfo.poster"></div>
    </template>
  </ui-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { commonServices } from '@noah/tools';
const _viewModulePoster = commonServices._viewModulePoster;
export default {
  data() {
    return {
      sendScrollRecord: false
    };
  },
  computed: {
    ...mapState(['showPostDialog', 'postDialogInfo'])
  },
  watch: {
    showPostDialog(value) {
      if (value) {
        // 触发打开弹窗埋点
        window.BossAnalytics &&
          window.BossAnalytics.track('PostDialog', {
            action: 'open'
          });
        document.querySelector('#post-dialog .dialog-body').addEventListener('scroll', this.onDialogScroll);
      } else {
        document.querySelector('#post-dialog .dialog-body').removeEventListener('scroll', this.onDialogScroll);
        // 关闭弹窗 将弹窗滚动恢复到顶部
        document.querySelector('#post-dialog .dialog-body').scrollTop = 0;
      }
    }
  },
  methods: {
    ...mapMutations(['updateShowPostDialog']),
    onHideDialog() {
      _viewModulePoster({
        posterId: this.postDialogInfo.id
      });
      window.BossAnalytics &&
        window.BossAnalytics.track('PostDialog', {
          action: 'close'
        });
      this.updateShowPostDialog(false);
    },
    /**
     * @description 弹窗body滚动方法 用于触发滚动到底部埋点
     * @param {Object} event  event对象
     */
    onDialogScroll(event) {
      try {
        const tolerance = 20; // 设置一个容错 滚动误差小于这个值 也相当于滚动到底

        if (event.target.scrollTop + event.target.offsetHeight > this.$refs.content.offsetHeight - tolerance) {
          this.sendScrollRecord = false;
          document.querySelector('#post-dialog .dialog-body').removeEventListener('scroll', this.onDialogScroll);
          // 触发滚动到底埋点
          window.BossAnalytics &&
            window.BossAnalytics.track('PostDialog', {
              action: 'scrollEnd'
            });
        }
      } catch (error) {}
    }
  }
};
</script>
