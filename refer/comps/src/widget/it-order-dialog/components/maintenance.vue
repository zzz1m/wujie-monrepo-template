<template>
<div class="it-new-dialog-content">
    <div class="it-page-content">
        <ui-form ref="form"
            :inline="false" :label-width="88" :model="formData" :rules="ruleData"
            @submit.native.prevent="handleSubmit('form')"
        >
            <form-item label="维修设备：" prop="deviceId">
                <ui-select v-model="formData.deviceId"
                    :class="!formData.deviceId && 'not-value'"
                    clearable
                    :disabled="!!deviceId"
                    placeholder="请选择更换或维修的设备" style="width:100%"
                    transfer
                >
                    <template slot="input">
                        <div v-if="!formData.deviceId" style="padding: 6px 18px;color: #7a8591">请选择更换或维修的设备</div>
                        <div v-else class="equipment-wrapper" style="width: 510px;">
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
                            <!--
                                        <div class="equipment-title">资产类别：{{ currentSelectObj.categoryName || '' }}</div>
                                        <div class="equipment-subtitle">型号规格：{{ currentSelectObj.typeSpecification || '' }}</div>
                                        <div class="equipment-subtitle">资产编号：{{ currentSelectObj.assetNo || '' }}</div> -->
                        </div>
                        <ui-icon type="arrow-down"></ui-icon>
                    </template>
                    <template v-if="equipmentList && equipmentList.length > 0 ">
                        <ui-option v-for="item in equipmentList"
                            :key="item.id" :value="item.id"
                        >
                            <div>资产类别：{{ item.categoryName || '' }}</div>
                            <div>型号规格：{{ item.typeSpecification || '' }}</div>
                            <div>资产编号：{{ item.assetNo || '' }}</div>
                        </ui-option>
                    </template>
                </ui-select>
            </form-item>
            <form-item label="详细说明：" prop="desc">
                <ui-input v-model.trim="formData.desc"
                    clearable counter
                    :maxlength="200" placeholder="请输入详细说明"
                    resize="none" :rows="4" style="width: 100%;min-width: 300px;"
                    type="textarea"
                >
                </ui-input>
            </form-item>
            <form-item class="upload-form-item" label="上传附件：" prop="fileKeys">
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
const { isNull } = util;
const { _getDetailByProcessInstanceId, _previewProgressRepairDevice } = API.AUDIT;
const { _submitRepairDevice, _assetInfo } = API.IT;
import AuditPreviewDialoig from '../../audit-preview-dialog/index.vue';
import Upload from './comps/upload.vue';

export default {
  components: {
    AuditPreviewDialoig,
    Upload
  },
  // mixins: [browerCtrl],
  data() {
    return {
      IS_EDITING: 0,
      equipmentList: [],
      formData: this.getInitFormData(),
      ruleData: {
        deviceId: [{ required: true, message: '请选择维修设备', trigger: 'change' }],
        desc: [{ required: true, message: '请输入详细说明', trigger: 'change' }]
      },
      isLoading: false,
      loadPercent: {},
      initValueStr: ''            // 初始化json数据
    };
  },
  props: {
    processInstanceId: { type: String, default: ''},
    deviceId: { type: String, default: ''}
  },
  computed: {
    currentSelectObj() {
      let selectObj = this.equipmentList.find(item => {
        return item.id === this.formData.deviceId;
      });
      return selectObj || {};
    }
    // deviceId() {
    //     return this.$route.query.deviceId || '';
    // }
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

  mounted() {
    this.init();
    this.getEquipmentList();
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
          this.formData.deviceId = root.detail.device.id;
          // this.equipmentList = root.detail?.device ? [root.detail.device] : [];
        } else if (this.deviceId) {
          this.formData.deviceId = this.deviceId;
        }
        this.initValueStr = JSON.stringify(this.formData);
        setTimeout(() => this.setEditing(0), 500);
      } catch (error) {
        console.log(error);
      }
    },

    getInitFormData() {
      return {
        deviceId: '',      // 设备名称
        desc: '',         // 详细说明
        fileKeys: []     // 附件
      };
    },
    async preview() {
      const valid = await this.$refs.form.validate();
      if(!valid) return;
      this.$refs.auditPreviewDialoig.open('loading');
      const { success, root } = await _previewProgressRepairDevice({
        processInstanceId: this.processInstanceId,
        ...this.formData,
        device: this.currentSelectObj
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
        content: '确定提交设备维修申请？',
        type: 'warning',
        onConfirm: async () => {
          try {
            if (this.isLoading) {return;};
            this.isLoading = true;
            const { success, root } = await _submitRepairDevice({
              processInstanceId: this.processInstanceId,
              ...this.formData,
              device: this.currentSelectObj
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
    async getEquipmentList() {
      try {
        const { success, root } = await _assetInfo();
        if(!success || !root) return;
        this.equipmentList = root;
      } catch (error) {
        console.log(error);
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
