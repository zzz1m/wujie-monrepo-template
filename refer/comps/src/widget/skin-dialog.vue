<!--
 * @Author: wangxiaolong wangxiaolong01@kanzhun.com
 * @Date: 2023-09-20 17:24:13
 * @LastEditors: wangxiaolong wangxiaolong01@kanzhun.com
 * @LastEditTime: 2023-09-21 15:39:37
 * @FilePath: /twl-oa-vue/packages/components/src/layout/skin-dialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ui-dialog
    id="post-dialog"
    lock
    pre-ka="post-dialog"
    prevent-hide
    :show-footer="false"
    :title="skinDialogInfo.remark"
    :value="showSkinDialog"
    width="800"
    wrap-class="ui-dialog-reset noah-skin-dialog-warp"
    @on-close="onHideDialog"
  >
    <template v-if="showSkinDialog" slot="content">
      <div class="skin-dialog-content">
        <div v-html="skinDialogInfo.poster"></div>
      </div>
      <button class="btn btn-primary close-skin-btn" type="button" @click="onHideDialog"></button>
      <!-- <div ref="content" v-html="skinDialogInfo.poster"></div> -->
    </template>
  </ui-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { commonServices } from '@noah/tools';
const { _viewModulePoster, _getModulePoster } = commonServices;
export default {
  name: 'SkinDialog',
  data() {
    return {};
  },
  computed: {
    ...mapState('skin', ['showSkinDialog', 'skinDialogInfo', 'envelopesNum'])
  },
  watch: {},
  methods: {
    ...mapMutations('skin', ['updateShowSkinDialog']),
    ...mapActions('skin', ['getSkinDialogType', 'showEnvelopeRain']),
    ...mapGetters('skin', ['isSkinDuration']),
    // 处理是否显示海报信息
    async getPostDialogType({ commit }, payload = {}) {
      try {
        // 不在活动期间 不请求接口
        if (this.isSkinDuration) {
          return;
        }
        const { success, root } = await _getModulePoster({
          module: 'changeSkin'
        });
        if (success && root && root.viewStatus === 0) {
          this.skinDialogInfo = root;
          this.updateShowSkinDialog(true);
        }
      } catch (e) {
        console.log(e);
      }
    },
    onHideDialog() {
      _viewModulePoster({
        posterId: this.skinDialogInfo.id
      });
      const num = this.envelopesNum + 1;
      this.updateShowSkinDialog(false);
      this.showEnvelopeRain();
    }
  }
};
</script>
