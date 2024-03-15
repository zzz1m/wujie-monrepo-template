<template>
    <ui-dialog
v-model="showDialog"
        lock :prevent-confirm="true" prevent-layer
        title="下线" width="656" wrap-class="ui-dialog-reset dialog-safe-body dialog-course-offline"
        @on-cancel="onClose"
        @on-close="onClose"
        @on-confirm="onConfirm"
        >
        <template v-if="showDialog" slot="content">
            <div class="pane-detail-content">
                <div class="offline-title">下线后，学习到一半的员工将不能再继续观看和学习。<span v-if="relationList.length">关联该课程的培训/系列课，也将不能够正常观看学习，请及时作出调整。</span></div>
                <p class="offline-desc">是否确定下线该课程？确定后课程将进入审批流程，审批通过后，课程将自动下线。</p>
                <div v-if="relationList.length" class="offline-text">
                    <p>当前关联该课程的培训/系列课有：</p>
                    <p v-for="item in relationList" :key="item.id">《{{ item }}》</p>
                </div>
            </div>
            <ui-form
ref="form"
                :inline="false" :model="formData" :rules="ruleData"
                @submit.native.prevent="handleSubmit('form')"
>
                <form-item prop="offlineReason">
                    <label slot="label" class="label">下线原因说明：</label>
                    <div class="content">
                        <ui-input
v-model.trim="formData.offlineReason"
                            clearable counter
                            :maxlength="200" placeholder="请输入"
                            resize="none" :rows="4" type="textarea"
>
                        </ui-input>
                    </div>
                </form-item>
            </ui-form>
        </template>
    </ui-dialog>
</template>
<script>
import { API } from '@noah/tools';
const { _offlineCourse, _offlineRelation } = API.TRAIN;

export default {
  props: {
    detailInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {

  },
  data() {
    return {
      showDialog: false,
      formData: {
        offlineReason: ''
      },
      ruleData: {
        offlineReason: [
          { required: true, message: '请输入下线原因说明', trigger: 'blur' }
        ]
      },
      relationList: []
    };
  },
  mounted() {

  },
  methods: {
    openDialog(row) {
      this.showDialog = true;
      this.currentRow = row;
      this.getDetailInfo();
    },

    async getDetailInfo() {
      try {
        const { success, root } = await _offlineRelation({
          baseId: this.currentRow.id
        });
        if(success){
          this.relationList = root || [];
        }
      } catch(err){
        console.log(err);
      }
    },
    async onConfirm() {
      const validate = await this.$refs.form.validate();
      if (!validate) {
        return;
      }
      const { success } = await _offlineCourse({
        baseId: this.currentRow.id,
        ...this.formData
      });
      if(!success) return;
      this.showDialog = false;
      this.$toast('下线成功', 'success');
      this.$emit('onConfirm', {});
      this.formData.offlineReason = '';
    },
    onClose() {
      this.formData.offlineReason = '';
    }
  }
};
</script>
