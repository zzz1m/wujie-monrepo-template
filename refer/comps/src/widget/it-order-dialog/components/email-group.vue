<template>
<div class="it-new-dialog-content">
    <div class="search-wrapper">
        <h3 class="it-title">邮箱群组列表</h3>
        <button class="btn btn-primary btn-outline ml-auto" type="button" @click="handleShowAddDialog()"><i class="ti-plus"></i>新增</button>
    </div>
    <div class="it-page-content" style="margin-top: 20px;">
        <CommonTable
            ref="table"
            :column-list="fieldList"
            :hidden-pager="true"
            :operation-list="operationList"
            :operation-width="200"
            :search-query="getList"
            @op-click="handleOpClick"
        />
    </div>
    <div v-if="tableList.length" class="content-footer">
        <button class="btn btn-primary btn-outline" type="button" @click="preview">审批流预览</button>
        <button class="btn btn-primary btn-outline" type="button" @click="onBack()">取消</button>
        <button class="btn btn-primary" :disabled="isLoading" type="button" @click="onSubmit">提交</button>
    </div>
    <ui-dialog v-model="showAddDialog"
        lock :prevent-confirm="true" prevent-layer
        :title="`${this.addDialogType === 'add' ? '新增' : '编辑'}群组`" width="584" wrap-class="ui-dialog-reset email-group-add-dialog"
        @on-confirm="onConfirm"
    >
        <template v-if="showAddDialog" slot="content">
            <ui-form ref="form"
                :inline="false" :label-width="100" :model="formData" :rules="ruleData"
                @submit.native.prevent="handleSubmit('form')"
            >
                <form-item label="群组名称：" prop="displayName">
                    <ui-input v-model="formData.displayName"
                        class="it-form-input"
                        clearable :maxlength="30"
                        placeholder="请输入群组名称" type="text"
                    ></ui-input>
                </form-item>
                <form-item label="群组地址：" prop="mailNickname">
                    <ui-input v-model="formData.mailNickname"
                        class="it-input-wrap" clearable
                        :maxlength="64" placeholder="请输入群组地址" type="text"
                    >
                        <template slot="suffix">
                            <span class="group-addr-email">.g@kanzhun.com</span>
                        </template>
                    </ui-input>
                    <div class="mail-tip">前缀自动增加“.g”，完整的邮箱地址为：{{ formData.mailNickname }}.g@kanzhun.com</div>
                </form-item>
                <!-- <form-item label="接受外部邮件：" prop="allowExternalSenders">
                    <ui-radio-group v-model="formData.allowExternalSenders">
                        <ui-radio label="1">是</ui-radio>
                        <ui-radio label="0">否</ui-radio>
                    </ui-radio-group>
                </form-item> -->
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
    <ui-dialog v-model="showAddUserTableDialog"
        lock :prevent-confirm="true" prevent-layer
        title="新增群组成员" width="880" wrap-class="ui-dialog-reset email-group-user-list-dialog"
        @on-confirm="onAddUserListConfirm"
    >
        <template v-if="showAddUserTableDialog" slot="content">
            <div class="dialog-btn-container">
                <h5 class="title">成员列表</h5>
                <div class="btn-right">
                    <div class="operate-btn">
                        <span class="operate-btn" @click="handleShowAddUserDialog()"><i class="ti-plus"></i>新增</span>
                    </div>
                </div>
            </div>
            <ui-table-pro class="table-pro-reset-ui" :data="userTableList"
                empty-text="暂无数据" tooltip-effect="dark"
                tooltip-max-width="200px"
            >
                <template slot="empty">
                    <div class="no-data">
                        <img src="https://img.bosszhipin.com/static/file/2022/zi5h77617x1655869628754.png" />
                        <div class="no-data-title">暂无数据</div>
                    </div>
                </template>
                <ui-table-column label="邮箱地址" min-width="" prop="userPrincipalName" show-overflow-tooltip> </ui-table-column>
                <ui-table-column label="邮箱名称" min-width="" prop="displayName" show-overflow-tooltip></ui-table-column>
                <ui-table-column label="末级部门" min-width="" prop="department" show-overflow-tooltip></ui-table-column>
                <ui-table-column label="操作" prop="" width="120">
                    <template slot-scope="{row, $index}">
                        <span
                            class="text-primary column-operate-btn"
                            @click="onDelUser(row, $index)"
                        >
                            删除
                        </span>
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </template>
    </ui-dialog>
    <ui-dialog v-model="showAddUserDialog"
        lock :prevent-confirm="true" prevent-layer
        title="新增群组成员" width="400" wrap-class="ui-dialog-reset email-group-user-dialog"
        @on-confirm="onAddUserConfirm"
    >
        <template v-if="showAddUserDialog" slot="content">
            <ui-select
                v-model="receiverList" clearable
                filterable multiple
                placeholder="请选择"
                transfer @on-query-change="queryGroupUser"
            >
                <ui-option v-for="(item, key) in groupUserSelectList"
                    :key="key" :label="item.label" :value="item.id"
                >
                    {{ item.label }}
                </ui-option>
            </ui-select>
        </template>
    </ui-dialog>
    <AuditPreviewDialoig ref="auditPreviewDialoig" />
</div>
</template>
<script>


import CommonTable from '../../common-table/index.vue';
import AuditPreviewDialoig from '../../audit-preview-dialog/index.vue';
import { util, API } from '@noah/tools';
const {debounce} = util;
const { _getDetailByProcessInstanceId, _previewProgressEmailGroup } = API.AUDIT;
const { _commonUserSearch } = API.COMMON;
const { _submitOpenEmailGroup, _emailUserList, _checkExist } = API.IT;


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
        { label: '邮箱地址', prop: 'mailNickname', render: row => `${ row.mailNickname }.g@kanzhun.com` },
        // { label: '接收外部邮件', prop: 'allowExternalSenders',  render: row => row.allowExternalSenders == 1? '是': '否'},
        { label: '负责人', prop: 'ownerName' }
      ],
      operationList: [
        { name: '新增群组成员', key: 'add'},
        { name: '编辑', key: 'edit' },
        { name: '删除', key: 'delete' }
      ],
      formData: this.getInitFormData(),
      ruleData: {
        displayName: [{ required: true, message: '请输入群组名称', trigger: 'change' }],
        mailNickname: [
          { required: true, message: '请输入群组地址', trigger: 'change' },
          { pattern: /^[A-Za-z0-9_\-\'\.]+$/, message: '群组地址格式不正确', trigger: 'blur' }
        ],
        ownerId: [{ required: true, message: '请输入负责人', trigger: 'change' }],
        remark: [{ required: true, message: '请输入详细说明', trigger: 'change' }]
      },
      isLoading: false,
      userList: [],
      receiverList: [],
      showAddDialog: false,
      tableList: [],
      userTableList: [],                  // 新增群组成员列表
      showAddUserTableDialog: false,      // 展示新增群组成员列表
      showAddUserDialog: false,           // 展示新增群组成员添加弹窗
      currentGroupRow: {},                // 当前选中行
      addDialogType: 'add',
      currentRowIndex: -1,
      groupUserSelectList: [],
      groupUserSelectListMap: {},
      initValueStr: ''                    // 初始化json数据
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    groupUserSelectList: {
      handler: function (val, oldVal) {
        if (val && val.length) {
          val.forEach(item => {
            if (!this.groupUserSelectListMap[item.id]) {
              this.groupUserSelectListMap[item.id] = item;
            }
          });
        }
      },
      deep: true,
      immediate: true
    },
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
  methods: {
    setEditing(val) {
      this.IS_EDITING = val;
    },
    handleOpClick(key, row, index) {
      switch (key) {
        case 'add':
          this.showAddGroupUser(row, index);
          break;
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
    async init() {
      try {
        if (this.processInstanceId) {
          const { success, root } = await _getDetailByProcessInstanceId({
            processInstanceId: this.processInstanceId
          });
          if(!success || !root) return;
          // Object.keys(this.formData).forEach(key => {
          //     if (!isNull[root.detail[key]]) {
          //         this.formData[key] = root.detail[key];
          //     }
          // });
          let data = root.detail || {};

          this.tableList = data.mailGroupList.map( item => {
            return {
              ...item,
              allowExternalSenders: item.allowExternalSenders + ''
            };
          });
          this.$refs.table?.onSearch();
        }
        this.initValueStr = JSON.stringify(this.tableList);
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
        displayName: '',          // 群组名称
        mailNickname: '',          // 群组地址
        allowExternalSenders: '0',           // 是否接受
        ownerId: '',       // 负责人
        ownerName: '',   // 负责人名称
        remark: ''
      };
    },
    async preview() {
      if (!this.tableList.length) {
        return;
      }
      this.$refs.auditPreviewDialoig.open('loading');
      const { success, root } = await _previewProgressEmailGroup({
        processInstanceId: this.processInstanceId,
        mailGroupList: this.tableList
      });
      if(success && root) {
        this.$refs.auditPreviewDialoig.open(root);
      } else {
        this.$refs.auditPreviewDialoig.open('empty');
      }
    },
    async onSubmit() {
      // const valid = await this.$refs.form.validate();
      // if(!valid) return;
      if (!this.tableList.length) {
        return;
      }
      this.$dialog({
        title: '提示',
        content: '确认提交邮箱群组申请？',
        type: 'warning',
        onConfirm: async () => {

          try {
            if (this.isLoading) {return;};
            this.isLoading = true;
            const { success, root } = await _submitOpenEmailGroup({
              processInstanceId: this.processInstanceId,
              mailGroupList: this.tableList
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
    queryGroupUser: debounce(300, async function(displayName) {
      try {
        if (!displayName) return;
        const { success, root } = await _emailUserList({ displayName, pageSize: 30 });
        if (success) {
          this.groupUserSelectList = (root?.list || []).map(n => {
            return {
              ...n,
              label: `${[n.displayName, n.department, n.userPrincipalName].filter(item => item).join('-')}`,
              name: n.displayName,
              id: n.userPrincipalName
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
          mailNickname: this.formData.mailNickname + '.g'
        });
        if (success && root.exist) {
          this.$toast('该群组地址已经存在，请重新输入', 'warning');
          return;
        }
        let repeatIndex = this.tableList.findIndex(item => {
          return item.mailNickname?.toLowerCase() === this.formData.mailNickname?.toLowerCase();
        });
        if (this.addDialogType === 'add') {
          // 判断已经添加的邮箱是否重复
          if (repeatIndex !== -1) {
            this.$toast('该群组地址已经存在，请重新输入', 'warning');
            return;
          }
          this.tableList.push({
            ...this.formData,
            receiverList: []
          });
        } else {
          if (repeatIndex !== -1 && repeatIndex !== this.currentRowIndex) {
            this.$toast('该群组地址已经存在，请重新输入', 'warning');
            return;
          }
          this.tableList.splice(this.currentRowIndex, 1, {
            ...this.formData,
            receiverList: this.tableList[this.currentRowIndex]?.receiverList || []
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
      this.showAddDialog = false;
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
    // 展示添加成员列表
    showAddGroupUser(row) {
      this.currentGroupRow = row;
      this.userTableList = [...(row.receiverList || [])];
      this.showAddUserTableDialog = true;
    },
    // 展示添加成员表单
    handleShowAddUserDialog() {
      this.receiverList = [];
      this.showAddUserDialog = true;
    },
    // 添加群组成员提交
    onAddUserConfirm() {
      if (!this.receiverList.length) {
        return;
      }
      let currentUserList = this.receiverList.map(userId => {
        return  this.groupUserSelectListMap[userId];
      });
      let userIdList = this.userTableList.map(item => item.id);
      // 去重 表格里面有的 不去新增
      let noRepeatList = currentUserList.filter(user => {
        return !userIdList.includes(user.id);
      });
      this.userTableList.push(...noRepeatList);
      this.showAddUserDialog = false;
      this.$toast('新增成功！');
    },
    onAddUserListConfirm() {
      this.currentGroupRow.receiverList = [...this.userTableList];
      this.showAddUserTableDialog = false;
    },
    onDelUser(row, index) {
      // let delIndex = this.tableList.findIndex(item => item.id === row.id);
      // if (delIndex === -1) { return; }
      this.userTableList.splice(index, 1);
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
