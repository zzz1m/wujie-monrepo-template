<template>
<div class="it-new-dialog-content">
    <div class="it-page-content">
        <ui-form ref="form"
            class="it-form"
            :inline="false" :label-width="110" :model="formData" :rules="ruleData"
            @submit.native.prevent="handleSubmit('form')"
        >
            <form-item label="转移资产：">
                <div class="equipment-wrapper" style="width:100%">
                    <div class="item">
                        <div class="title">资产类别：</div>
                        <div class="val">{{ currentSelectObj.categoryName || '' }}</div>
                    </div>
                    <div class="item">
                        <div class="title">型号规格：</div>
                        <div class="val">{{ currentSelectObj.typeSpecification || '' }}</div>
                    </div>
                    <div class="item">
                        <div class="title">资产编号：</div>
                        <div class="val">{{ currentSelectObj.assetNo || '' }}</div>
                    </div>
                </div>
            </form-item>
            <form-item label="资产接收人：" prop="receiverEmail">
                <ui-select
                    v-model="formData.receiverEmail"
                    class="it-form-input"
                    clearable collapse-tags
                    filterable placeholder="请选择资产接收人"
                    style="width:100%"
                    transfer
                    @on-query-change="queryUser"
                >
                    <ui-option v-for="item in userList"
                        :key="item.email" :label="item.label" :value="item.email"
                    >{{ item.label }}</ui-option>
                </ui-select>
            </form-item>
            <form-item label="转移原因：" prop="transferReason">
                <ui-input v-model.trim="formData.transferReason"
                    clearable counter
                    :maxlength="200" placeholder="请输入转移原因"
                    resize="none" :rows="4" style="width: 100%;min-width: 300px;"
                    type="textarea"
                >
                </ui-input>
            </form-item>
        </ui-form>
    </div>
    <div class="content-footer">
        <button class="btn btn-primary btn-outline" type="button" @click="preview">审批流预览</button>
        <button class="btn btn-primary btn-outline" type="button" @click="onBack()">取消</button>
        <button class="btn btn-primary" :disabled="isLoading" type="button" @click="onSubmit()">提交</button>
    </div>
    <AuditPreviewDialoig ref="auditPreviewDialoig" />
</div>
</template>
<script>
import AuditPreviewDialoig from '../../audit-preview-dialog/index.vue';
import { getIconName } from './comps/utils.js';
import { util, API } from '@noah/tools';
const { isNull, debounce } = util;
const { _getDetailByProcessInstanceId, _previewProgressAsset } = API.AUDIT;
const { _commonUserSearch } = API.COMMON;
const { _applyTransfer, _assetTransferDetail } = API.IT;


export default {
  components: {
    AuditPreviewDialoig
  },
  data() {
    return {
      IS_EDITING: 0,
      currentSelectObj: {},
      formData: this.getInitFormData(),
      ruleData: {
        receiverEmail: [{ required: true, message: '请选择资产接收人', trigger: 'change' }],
        transferReason: [{ required: true, message: '请输入转移原因', trigger: 'change' }]
      },
      isLoading: false,
      userList: []

    };
  },
  props: {
    processInstanceId: { type: String, default: ''},
    deviceId: { type: String, default: ''}
  },
  watch: {
  },
  created() {
    this.getIconName = getIconName;
  },
  mounted() {
    this.init();
  },
  methods: {
    setEditing(val) {
      this.IS_EDITING = val;
    },
    async init() {
      try {
        if (this.processInstanceId) {
          const { success, root } = await _getDetailByProcessInstanceId({
            processInstanceId: this.processInstanceId
          });
          if(!success || !root) return;
          const { receiverName, receiverEmail } = root.detail || {};

          Object.keys(this.formData).forEach(key => {
            if (!isNull[root.detail[key]]) {
              this.formData[key] = root.detail[key];
            }
          });

          this.currentSelectObj = root.detail;
          this.userList = [{
            email: receiverEmail,
            label: receiverName + '-' + receiverEmail
          }];
        } else if (this.deviceId) {
          const { success, root } = await _assetTransferDetail({
            id: this.deviceId
          });
          if(!success || !root) return;
          this.currentSelectObj = root;
          Object.keys(this.formData).forEach(key => {
            if (!isNull[root[key]] && root[key] !== null) {
              this.formData[key] = root[key];
            }
          });
          this.formData.id = this.deviceId;
        }
      } catch (error) {
        console.log(error);
      }
    },
    queryUser: debounce(300, async function(key) {
      try {
        if (!key) return;
        const { success, root } = await _commonUserSearch({ key });
        if (success) {
          this.userList = (root || []).map(n => {
            return {
              ...n,
              label: `${[n.name, n.deptName, n.email].filter(item => item).join('-')}`
            };
          });
        }
      } catch {}
    }),
    getInitFormData() {
      return {
        assetNo: '',                    // 资产编号
        categoryName: '',
        typeSpecification: '',
        receiverEmail: '',
        transferReason: ''              // 转移原因
      };
    },
    async preview() {

      this.onSubmit(true);

    },
    async onSubmit(isPreview) {
      const valid = await this.$refs.form.validate();
      if(!valid) return;
      const submit = async () => {
        try {
          if (this.isLoading) {return;};
          this.isLoading = true;
          const params = {
            ...this.formData,
            processInstanceId: this.processInstanceId,
            id: this.deviceId
          };
          if(isPreview) {
            this.$refs.auditPreviewDialoig.open('loading');
            const { success, root } = await _previewProgressAsset(params);
            if(success && root) {
              this.$refs.auditPreviewDialoig.open(root);
            } else {
              this.$refs.auditPreviewDialoig.open('empty');
            }
          } else {
            const { success, root } = await _applyTransfer(params);
            if (!success) {
              return false;
            }
            this.$toast(`提交成功！`, 'success');
            this.setEditing(0);
            const timer = setTimeout(() => {
              this.$emit('success');
              clearTimeout(timer);
            }, 500);
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      };
      if(isPreview) {
        submit();
      } else {
        this.$dialog({
          title: '提示',
          content: '确定提交资产转移申请？',
          type: 'warning',
          onConfirm: async () => {
            submit();

          }
        });
      }
    },
    onBack(isClose = false) {
      if (this.IS_EDITING + '' === '1') {
        this.$dialog({
          title: isClose? '温馨提示': '取消',
          content: isClose?`是否确认关闭弹窗，关闭后当前内容将不会保存。`: `是否确认取消，取消后当前内容将不会保存。`,
          type: 'warning',
          onConfirm: () => {
            this.setEditing(0);
            this.$emit('close');
          }
        });
      } else {
        this.$emit('close');
      }
    }
  }
};
</script>
