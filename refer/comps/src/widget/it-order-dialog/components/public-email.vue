<template>
<div class="it-new-dialog-content">
    <div class="search-wrapper">
        <h3 class="it-title">公共邮箱列表</h3>
        <button class="btn btn-primary btn-outline ml-auto" type="button" @click="handleShowAddDialog()">
            <i class="ui-icon-plus"></i>
            新增
        </button>
    </div>
    <div class="it-page-content" style="margin-top: 20px;">
        <CommonTable
            ref="table"
            :column-list="fieldList"
            :hidden-pager="true"
            :operation-list="operationList"
            :operation-width="100"
            :search-query="getList"
            @op-click="handleOpClick"
        />
    </div>
    <ui-dialog v-model="showAddDialog"
        lock :prevent-confirm="true" prevent-layer
        :title="`${addDialogType === 'add' ? '新增' : '编辑'}公共邮箱`" width="694" wrap-class="ui-dialog-reset email-group-add-dialog"
        @on-confirm="onConfirm"
    >
        <template v-if="showAddDialog" slot="content">
            <ui-form ref="form"
                :inline="false" :label-width="100" :model="formData" :rules="ruleData"
                @submit.native.prevent="handleSubmit('form')"
            >
                <form-item label="邮箱类型：" prop="publicMailType">
                    <div class="system-mail" :class="{'active': formData.publicMailType===1}" @click="setType(1)">
                        <div class="mail-title">系统类邮箱</div>
                        <div class="mail-text">一般配置在代码或工具中，使用SMTP协议自动发送邮件。只允许负责人登录该邮箱</div>
                    </div>
                    <div class="system-mail green-mail" :class="{'active': formData.publicMailType===0}" @click="setType(0)">
                        <div class="mail-title">项目类邮箱</div>
                        <div class="mail-text">需要通过邮箱客户端收发邮件，邮箱负责人和使用人都可以登录该邮箱</div>
                    </div>
                    <div style="clear:both"></div>
                </form-item>
                <form-item label="邮箱名称：" prop="displayName">
                    <ui-input v-model.trim="formData.displayName"
                        class="it-form-input"
                        clearable :maxlength="30"
                        placeholder="请输入邮箱名称" type="text"
                    ></ui-input>
                </form-item>
                <form-item label="邮箱地址：" prop="mailNickname">
                    <ui-input v-model.trim="formData.mailNickname"
                        class="it-input-wrap" clearable
                        :maxlength="64" placeholder="请输入邮箱地址" type="text"
                    >
                        <template slot="suffix">
                            <span class="group-addr-email">.p@kanzhun.com</span>
                        </template>
                    </ui-input>
                    <div class="mail-tip">前缀自动增加“.p”，完整的邮箱地址为：{{ formData.mailNickname }}.p@kanzhun.com</div>
                </form-item>
                <form-item label="负责人：" prop="ownerId">
                    <ui-select
                        v-model="formData.ownerId"
                        class="it-form-input"
                        clearable filterable
                        placeholder="请选择"
                        transfer
                        @on-change="handleChargePersonChange"
                        @on-query-change="queryUser"
                    >
                        <ui-option v-for="(item, key) in userList"
                            :key="key" :label="item.label" :value="item.id"
                        >
                            {{ item.label }}
                        </ui-option>
                    </ui-select>
                </form-item>
                <form-item v-if="formData.publicMailType==0" label="使用人：" prop="userNumberList">
                    <ui-select
                        v-model="formData.userNumberList"
                        class="it-form-input"
                        clearable
                        collapse-tags
                        filterable multiple
                        placeholder="请选择"
                        transfer
                        @on-query-change="queryUser1"
                    >
                        <ui-option v-for="(item, key) in userList1"
                            :key="key" :label="item.label" :value="item.number"
                        >
                            {{ item.label }}
                        </ui-option>
                    </ui-select>
                </form-item>
                <form-item label="详细说明：" prop="remark" required>
                    <ui-input v-model.trim="formData.remark"
                        class="it-form-input"
                        clearable counter
                        :maxlength="200" placeholder="请输入详细说明"
                        resize="none" :rows="3" type="textarea"
                    >
                    </ui-input>
                </form-item>
            </ui-form>
        </template>
    </ui-dialog>
    <div v-if="tableList.length" class="content-footer">
        <button class="btn btn-primary btn-outline" type="button" @click="preview">审批流预览</button>
        <button class="btn btn-primary btn-outline" type="button" @click="onBack()">取消</button>
        <button class="btn btn-primary" :disabled="isLoading" type="button" @click="onSubmit()">提交</button>
    </div>
    <AuditPreviewDialoig ref="auditPreviewDialoig" />
</div>
</template>
<script>

import { util, API } from '@noah/tools';
const { debounce  } = util;
const { _submitOpenPublicEmail, _checkExist } = API.IT;
const { _getDetailByProcessInstanceId, _previewProgressEmail } = API.AUDIT;
const { _commonUserSearch } = API.COMMON;
import AuditPreviewDialoig from '../../audit-preview-dialog/index.vue';
import CommonTable from '../../common-table/index.vue';

export default {
  components: {
    CommonTable,
    AuditPreviewDialoig
  },
  // mixins: [browerCtrl],
  props: {
    processInstanceId: { type: String, default: ''}
  },
  data() {
    return {
      IS_EDITING: 0,
      fieldList: [
        { label: '邮箱名称', prop: 'displayName' },
        { label: '邮箱地址', prop: 'mailNickname', render: row => `${ row.mailNickname }.p@kanzhun.com` },
        { label: '负责人', prop: 'ownerName' }
      ],
      operationList: [
        { name: '编辑', key: 'edit' },
        { name: '删除', key: 'delete' }
      ],
      formData: this.getInitFormData(),
      ruleData: {
        publicMailType: [{ required: true, message: '请选择邮箱类型', trigger: 'blur', type: 'number' }],
        displayName: [{ required: true, message: '请输入邮箱名称', trigger: 'change' }],
        mailNickname: [
          { required: true, message: '请输入邮箱地址', trigger: 'change' },
          { pattern: /^[A-Za-z0-9_\-\'\.]+$/, message: '邮箱地址格式不正确', trigger: 'blur' }
        ],
        ownerId: [{ required: true, message: '请输入负责人', trigger: 'change' }],
        remark: [{ required: true, message: '请输入详细说明', trigger: 'change' }]
      },
      isLoading: false,
      userList: [],
      showAddDialog: false,
      tableList: [],
      addDialogType: 'add',       // 弹窗类型
      currentRowIndex: -1,
      initValueStr: '',            // 初始化json数据
      userList1: []
    };
  },
  watch: {
    tableList: {
      handler: function (val, oldVal) {
        let currentValueStr = JSON.stringify(this.tableList);
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
    async init() {
      try {
        if (this.processInstanceId) {
          const { success, root } = await _getDetailByProcessInstanceId({
            processInstanceId: this.processInstanceId
          });
          if(!success || !root) return;
          let data = root.detail || {};
          this.tableList = data.mailList;
          this.$refs.table?.onSearch();
        }
        this.initValueStr = JSON.stringify(this.tableList);
        setTimeout(() => this.setEditing(0), 500);
      } catch (error) {
        console.log(error);
      }
    },
    handleOpClick(key, row, index) {
      switch (key) {
        case 'edit':
          this.handleShowAddDialog(row, index);
          break;
        case 'delete':
          this.onDel(row, index);
          break;
      }
    },
    async getList() {
      return {
        success: true,
        data: {
          list: this.tableList,
          total: this.tableList.length
        }
      };
    },
    setType(type) {
      this.formData.publicMailType = type;
      this.$refs.form.validate('publicMailType');
    },
    getAttaName(attachment) {
      if (!attachment) { return '';}
      return attachment.split('||')[0];
    },
    getInitFormData() {
      return {
        publicMailType: '',
        displayName: '',          // 邮箱名称
        mailNickname: '',          // 邮箱地址
        ownerId: '',       // 负责人
        userNumberList: [],
        ownerName: '',   // 负责人名称
        remark: ''         // 详细说明
      };
    },
    async preview() {
      if (!this.tableList.length) {
        return;
      }
      this.$refs.auditPreviewDialoig.open('loading');
      const { success, root } = await _previewProgressEmail({
        processInstanceId: this.processInstanceId,
        mailList: this.tableList
      });
      if(success && root) {
        this.$refs.auditPreviewDialoig.open(root);
      } else {
        this.$refs.auditPreviewDialoig.open('empty');
      }
    },
    async onSubmit() {
      if (!this.tableList.length) {
        return;
      }
      this.$dialog({
        title: '提示',
        content: '确认提交公共邮箱申请？',
        type: 'warning',
        onConfirm: async () => {
          try {
            if (this.isLoading) {return;};
            this.isLoading = true;
            const { success, root } = await _submitOpenPublicEmail({
              processInstanceId: this.processInstanceId,
              mailList: this.tableList
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
    queryUser1: debounce(300, async function(key) {
      try {
        if (!key) return;
        const { success, root } = await _commonUserSearch({ key });
        if (success) {
          this.userList1 = (root || []).map(n => {
            return {
              ...n,
              label: `${[n.name, n.deptName, n.email].filter(item => item).join('-')}`
            };
          });
        }
      } catch {}
    }),
    handleShowAddDialog(isEditObj, index) {
      if (!isEditObj) {
        this.formData = this.getInitFormData();
        this.addDialogType = 'add';
      } else {
        this.formData = {
          ...isEditObj
        };
        this.userList = [{
          label: isEditObj.ownerName,
          id: isEditObj.ownerId,
          name: isEditObj.ownerName
        }];
        this.addDialogType = 'edit';
        this.currentRowIndex = index;
      }

      this.showAddDialog = true;
    },

    async onConfirm() {
      const valid = await this.$refs.form.validate();
      if(!valid) return;
      // 判断邮箱是否重复
      // const { success, root } = await _getDetailByProcessInstanceId({
      //     emailAddr: this.formData.emailAddr
      // });
      // if (!success) return;
      try {
        if(this.isLoading)return;
        this.isLoading = true;
        const { success, root } = await _checkExist({
          mailNickname: this.formData.mailNickname + '.p'
        });
        if (success && root.exist) {
          this.$toast('该邮箱地址已经存在，请重新输入', 'warning');
          return;
        }

        let repeatIndex = this.tableList.findIndex(item => {
          return item.mailNickname?.toLowerCase() === this.formData.mailNickname?.toLowerCase();
        });
        if (this.addDialogType === 'add') {
          // 判断已经添加的邮箱是否重复
          if (repeatIndex !== -1) {
            this.$toast('该邮箱地址已经存在，请重新输入', 'warning');
            return;
          }
          this.tableList.push({
            ...this.formData,
            userNumberList: this.formData.publicMailType == 1 ? [] : this.formData.userNumberList
          });
        } else {
          if (repeatIndex !== -1 && repeatIndex !== this.currentRowIndex) {
            this.$toast('该邮箱地址已经存在，请重新输入', 'warning');
            return;
          }
          this.tableList.splice(this.currentRowIndex, 1, {
            ...this.formData,
            userNumberList: this.formData.publicMailType == 1 ? [] : this.formData.userNumberList
          });
        }

        this.showAddDialog = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }


    },
    onDel(row, index) {
      // let delIndex = this.tableList.findIndex(item => item.id === row.id);
      // if (delIndex === -1) { return; }
      this.$dialog({
        title: '温馨提示',
        content: '是否删除该条数据？',
        type: 'warning',
        onConfirm: () => {
          this.tableList.splice(index, 1);
          this.$toast('删除成功', 'success');
        }
      });
    },
    handleChargePersonChange() {
      let currentUser = this.userList.find(item => item.id === this.formData.ownerId);
      this.formData.ownerName = currentUser.name;
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
<style lang="less" scoped>
.system-mail {
    width: 260px;
    height: 104px;
    background: linear-gradient(307deg, #F3F7FD 0%, #E9F0FD 100%);
    border-radius: 8px;
    padding: 8px 14px;
    float: left;
    border: 1px solid transparent;
    transition: all .2s;
    cursor: pointer;
    position: relative;
    &::after {
        content: '';
        width: 50px;
        height: 50px;
        background: url(https://img.bosszhipin.com/static/file/2023/88v7wge5mk1687748243814.png);
        background-size: contain;
        position: absolute;
        bottom: 1px;
        right: 1px;
    }
    &:hover {
        border: 1px solid #7C92F9;
    }
    &.active {
        border: 1px solid #7C92F9;
    }
    .mail-title {
        font-size: 15px;
        font-weight: 600;
        color: #1D2129;
        line-height: 24px;
    }
    .mail-text {
        font-size: 12px;
        font-weight: 400;
        width: 168px;
        color: #4E5969;
        line-height: 20px;
        margin-top: 4px;
    }
}
.green-mail {
    background: linear-gradient(132deg, #E5F8F8 0%, #F0FCFC 100%);
    margin-left: 14px;
    &::after {
        background: url(https://img.bosszhipin.com/static/file/2023/h637q8lxll1687748243873.png);
        background-size: contain;
    }
    &:hover {
        border: 1px solid #00BEBD;
    }
    &.active {
        border: 1px solid #00BEBD;
    }
}
</style>
