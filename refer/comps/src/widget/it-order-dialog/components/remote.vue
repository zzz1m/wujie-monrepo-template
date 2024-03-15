<template>
<div class="it-new-dialog-content">
    <div class="it-page-content">
        <ui-form ref="form"
            class="it-form"
            :inline="false" :label-width="88" :model="formData" :rules="ruleData"
            @submit.native.prevent="handleSubmit('form')"
        >
            <form-item label="详细说明：" prop="desc">
                <ui-input v-model.trim="formData.desc"
                    clearable counter
                    :maxlength="200" placeholder="请输入详细说明"
                    resize="none" :rows="4" style="width: 100%;min-width: 300px;"
                    type="textarea"
                >
                </ui-input>
            </form-item>
            <form-item label="使用期限：" prop="expireDate">
                <ui-date-picker v-model="formData.expireDate"
                    align="left" class="date-pick-wrap" clearable
                    format="yyyy年MM月dd日" :picker-options="{}" placeholder="请选择结束日期"
                    style="min-width: 100%;"
                    type="date"
                    value-format="yyyy-MM-dd"
                >
                </ui-date-picker>
            </form-item>
            <form-item label="上传附件：" prop="fileKeys">
                <Upload v-model="formData.fileKeys" />
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
import { util, API } from '@noah/tools';
const { isNull  } = util;
const { _submitOpenRemote } = API.IT;
const { _getDetailByProcessInstanceId, _previewProgressOpenRemote } = API.AUDIT;
import { getIconName } from './comps/utils.js';
import AuditPreviewDialoig from '../../audit-preview-dialog/index.vue';
import Upload from './comps/upload.vue';

export default {
  components: {
    AuditPreviewDialoig, Upload
  },
  // mixins: [browerCtrl],
  data() {
    return {
      IS_EDITING: 0,
      formData: this.getInitFormData(),
      ruleData: {
        desc: [{ required: true, message: '请输入详细说明', trigger: 'change' }],
        expireDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }]
      },
      isLoading: false,
      initValueStr: ''            // 初始化json数据
    };
  },
  props: {
    processInstanceId: { type: String, default: ''}
  },
  watch: {
    formData: {
      handler: function (val, oldVal) {
        let currentValueStr = JSON.stringify(this.formData);
        if (currentValueStr !== this.initValueStr) {
          this.setEditing(1);
        } else {
          this.setEditing(0);
        }
      },
      deep: true,
      immediate: true
    }
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
          Object.keys(this.formData).forEach(key => {
            if (!isNull[root.detail[key]]) {
              this.formData[key] = root.detail[key];
            }
          });
        }
        this.initValueStr = JSON.stringify(this.formData);
        setTimeout(() => this.setEditing(0), 500);
      } catch (error) {
        console.log(error);
      }
    },

    getInitFormData() {
      return {
        desc: '',
        expireDate: null,
        fileKeys: []
      };
    },

    async preview() {
      const valid = await this.$refs.form.validate();
      if(!valid) return;
      this.$refs.auditPreviewDialoig.open('loading');
      const { success, root } = await _previewProgressOpenRemote({
        processInstanceId: this.processInstanceId,
        ...this.formData
      });
      if(success && root) {
        this.$refs.auditPreviewDialoig.open(root);
      } else {
        this.$refs.auditPreviewDialoig.open('empty');
      }
    },
    async onSubmit() {
      const valid = await this.$refs.form.validate();
      if(!valid) return;
      this.$dialog({
        title: '提示',
        content: '确认提交开通远程权限申请？',
        type: 'warning',
        onConfirm: async () => {
          try {
            if (this.isLoading) {return;};
            this.isLoading = true;
            const { success, root } = await _submitOpenRemote({
              processInstanceId: this.processInstanceId,
              ...this.formData
            });
            if (!success) {
              return false;
            }
            this.$toast(`提交成功！`, 'success');
            this.setEditing(0);
            const timer = setTimeout(() => {
              this.$emit('success');
              clearTimeout(timer);
            }, 500);
          } catch (error) {
            console.log(error);
          } finally {
            this.isLoading = false;
          }
        }
      });
    },
    onBack(isClose = false) {
      // const IS_EDITING =  SessionStorage.get(EDITING_NAME);
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
