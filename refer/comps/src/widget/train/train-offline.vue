<template>
    <ui-dialog
v-model="showDialog"
        lock :prevent-confirm="true" prevent-layer
        title="下线" width="656" wrap-class="ui-dialog-reset dialog-safe-body dialog-train-offline"
        @on-confirm="onConfirm"
        >
        <template v-if="showDialog" slot="content">
            <div class="tips-title">
                <p>下线后，学习到一半的员工将不能再继续观看和学习。</p>
            </div>
            <div class="pane-detail-content">
                <p class="tips-inline">是否确定下线该培训？确定后培训将进入审批流程，审批通过后，培训将自动下线</p>
            </div>
            <ui-form
ref="form"
                :inline="false" :model="formData" :rules="ruleData"
>
                <form-item prop="offLineReason">
                    <label slot="label" class="label">下线原因说明：</label>
                    <div class="content">
                        <ui-input
v-model.trim="formData.offLineReason"
                            clearable counter
                            :maxlength="200" placeholder="请输入加入黑名单原因"
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
const { _learningTrainOffline } = API.TRAIN;

export default {
  props: {
    detailInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showDialog: false,
      formData: {
        offLineReason: ''
      },
      ruleData: {
        offLineReason: [
          { required: true, message: '请输入下线原因说明', trigger: 'blur' }
        ]
      },
      dataList: [
        {
          key: 'name',
          name: '证照名称',
          value: '',
          fieldType: 'text'
        },
        {
          key: 'licenseNumber',
          name: '证照文号',
          value: '',
          fieldType: 'text'
        },
        {
          key: 'licenseType',
          name: '证照分类',
          value: '',
          fieldType: 'text'
        },
        {
          key: 'companyName',
          name: '关联公司',
          value: '',
          fieldType: 'text'
        }
      ]
    };
  },
  mounted() {

  },
  methods: {
    openDialog() {
      this.showDialog = true;
      this.getDetailInfo();
    },

    async getDetailInfo() {

    },
    async onConfirm() {
      const validate = await this.$refs.form.validate();
      if (!validate) {
        return;
      }

      const { success } = await _learningTrainOffline({
        id: this.detailInfo.id,
        ...this.formData
      });
      if(!success) return;
      this.showDialog = false;
      this.$toast('下线成功', 'success');
      this.$emit('onconfim', {});
    }
  }
};
</script>
