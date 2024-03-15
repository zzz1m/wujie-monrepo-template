<template>
<!-- <div class="page-content it-form-page vpn-source flex-it-page"> -->
<div class="it-new-dialog-content">
    <div class="it-page-content">
        <ui-form ref="form"
            :inline="false" :label-width="88" :model="formData" :rules="ruleData"
            @submit.native.prevent="handleSubmit('form')"
        >
            <div class="vpn-form-wrapper">
                <div class="content">
                    <div v-for="(item, index) in formData.resourceList" :key="item.id" class="form-inline-service">
                        <div class="title">
                            <span>服务器{{ index+1 }}</span>
                            <div class="operation">
                                <span v-if="formData.resourceList.length !== 1" class="operate-btn" @click="delLine(index)">删除</span>
                            </div>
                        </div>
                        <div class="vpn-form-item">
                            <span class="required-red m-l-0">服务名称：</span>
                            <ui-input v-model.trim="item.name"
                                clearable :maxlength="30"
                                placeholder="请输入服务名称" style="width: 100%;"
                                type="text"
                            >
                            </ui-input>
                        </div>
                        <div class="vpn-form-item">
                            <span class="required-red">IP/域名：</span>
                            <ui-input v-model.trim="item.domain"
                                clearable :maxlength="30"
                                placeholder="请输入IP/域名" style="width: 100%;"
                                type="text"
                            >
                            </ui-input>
                        </div>
                        <div class="vpn-form-item">
                            <span class="required-red">端口范围：</span>
                            <div class="port-range-wrap">
                                <ui-input v-model.trim="item.minPort"
                                    class="port" placeholder=""
                                    type="number"
                                    @on-blur="checkRange(item)"
                                >
                                </ui-input>
                                <span class="seg">到</span>
                                <ui-input v-model.trim="item.maxPort"
                                    class="port" placeholder=""
                                    type="number"
                                    @on-blur="checkRange(item)"
                                >
                                </ui-input>
                                <span class="tip">填写示范：80 到 80 </span>
                                <span v-if="item.errorTip" class="error-tip">*{{ item.errorTip }}</span>
                            </div>
                        </div>
                        <!-- <div class="btn-inline-wrapper">
                                    <i v-if="index === formData.resourceList.length-1" class="ui-icon-circle-plus" @click="addLine(index)"></i>
                                    <i v-if="formData.resourceList.length !== 1" class="ui-icon-remove" @click="delLine(index)"></i>
                                </div> -->
                    </div>
                </div>
            </div>
            <form-item label="">
                <button class="btn btn-primary btn-outline" type="button" @click="addLine()"><i class="ti-plus"></i>新增</button>
            </form-item>

            <form-item class="form-item-required" label="详细说明：" prop="desc" :required="true">
                <ui-input v-model.trim="formData.desc"
                    clearable counter
                    :maxlength="200" placeholder="请输入详细说明"
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
import { util, API } from '@noah/tools';
const { isNull  } = util;
const { _getDetailByProcessInstanceId, _previewProgressVpnResource } = API.AUDIT;
const { _submitOpenVpnResource } = API.IT;
import AuditPreviewDialoig from '../../audit-preview-dialog/index.vue';

export default {
  components: {
    AuditPreviewDialoig
  },
  // mixins: [browerCtrl],
  data() {
    return {
      IS_EDITING: 0,
      formData: this.getInitFormData(),
      ruleData: {

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
  mounted() {
    this.init();
  },
  methods: {
    setEditing(val) {
      this.IS_EDITING = val;
    },
    checkRange(item) {
      const check = (key) => {
        const val = item[key];
        let isNumber = /^[0-9]*$/.test(val);
        if(!isNumber) {
          item[key] = '';
        }
        if(!isNumber ||  val <= 0 || val >= 65536) {
          item.errorTip = '合法的端口号为大于0且小于65536的整数';
          return true;
        }
        return false;
      };

      if(check('minPort') || check('maxPort')) {
        return false;
      }
      if(Number(item.minPort) > Number(item.maxPort)) {
        item.errorTip = '端口号范围应从小到大';
        return false;
      }
      item.errorTip = '';
      return true;
    },
    async init() {
      try {
        if (this.processInstanceId) {
          const { success, root } = await _getDetailByProcessInstanceId({
            processInstanceId: this.processInstanceId
          });
          if(!success || !root) return;
          Object.keys(this.formData).forEach(key => {
            if (key === 'resourceList') {
              this.formData[key] = (root.detail[key] || []).map((item, index) => {
                return {
                  errorTip: '',
                  ...item,
                  id: item.id || index + (+new Date() + '')
                };
              });
            }
            else if (!isNull[root.detail[key]]) {
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
    getAttaName(attachment) {
      if (!attachment) { return '';}
      return attachment.split('||')[0];
    },
    getInitFormData() {
      return {
        desc: '',
        resourceList: [
          {
            id: +new Date(),    // id
            name: '',           //服务名称
            domain: '',             // ip
            minPort: '',            // 端口号
            maxPort: '',
            errorTip: ''
          }
        ]
      };
    },
    uploadEnd({ data }) {
      const res = data;
      if (res.success) {
        this.formData.attachments.push(res.root.relativePath);
        this.$toast({ content: '上传成功', type: 'success' });
      } else {
        this.$toast({ content: '上传失败', type: 'error' });
      }
    },
    removeImage(index) {
      this.formData.attachments.splice(index, 1);
    },
    mockClick() {
      this.$refs.upload.mockClick();
    },
    async preview() {
      const valid = await this.$refs.form.validate();
      if(!valid) return;

      let validFalse = this.formData.resourceList.some(item => {
        return !this.checkoutService(item);
      });
      if (validFalse) {return;}
      this.$refs.auditPreviewDialoig.open('loading');
      const { success, root } = await _previewProgressVpnResource({
        processInstanceId: this.processInstanceId,
        ...this.formData,
        resourceList: this.formData.resourceList
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



      let validFalse = this.formData.resourceList.some(item => {
        return !this.checkoutService(item);
      });
      if (validFalse) {return;}
      if (!this.formData.desc) {
        this.$toast('请填写详细说明', 'warning');
        return false;
      }
      this.$dialog({
        title: '提示',
        content: '确认提交VPN访问资源申请？',
        type: 'warning',
        onConfirm: async () => {

          try {
            if (this.isLoading) {return;};
            this.isLoading = true;
            // console.log(this.formData.resourceList);
            const { success, root } = await _submitOpenVpnResource({
              processInstanceId: this.processInstanceId,
              ...this.formData,
              resourceList: this.formData.resourceList.map(t => {
                const { errorTip, minPort, maxPort, ...rest } = t;
                return {
                  ...rest,
                  minPort: +minPort,
                  maxPort: +maxPort
                };
              })
            });
            if (!success) {
              return false;
            }
            this.setEditing(0);
            this.$toast(`提交成功！`, 'success');
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
    checkoutService(service) {
      if (!service.name) {
        this.$toast('请填写服务名称', 'warning');
        return false;
      } else if (!service.domain) {
        this.$toast('请填写ip/域名', 'warning');
        return false;
      } else if (!service.minPort || !service.maxPort) {
        this.$toast('请检查端口号范围', 'warning');
        return false;
      }
      else if (service.minPort && service.maxPort) {
        const c = (port) => {
          let isNumber = /^[0-9]*$/.test(port);
          if (!isNumber || +port >= 65536 || +port <= 0) {
            this.$toast('合法的端口号为大于0且小于65536的整数', 'warning');
            return false;
          }
          return true;
        };

        if(!c(service.minPort) || !c(service.maxPort)) {
          return false;
        }

        if(+service.minPort > +service.maxPort) {
          this.$toast('端口号范围应从小到大', 'warning');
          return false;
        }
      }
      this.checkRange(service);
      return true;
    },
    addLine(index) {
      if (index !== undefined) {
        let currentRow = this.formData.resourceList[index];
        if (!this.checkoutService(currentRow)) return;
      }

      this.formData.resourceList.push({
        id: +new Date(),    // id
        name: '',           //服务名称
        domain: '',         // 域名
        minPort: '',            // 端口号
        maxPort: '',
        errorTip: ''
        // port: ''            // 端口号
      });
    },
    delLine(index) {
      this.formData.resourceList.splice(index, 1);
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
