<template>
<div class="it-new-dialog-content">
    <div class="it-page-content">
        <ui-form ref="form"
            :inline="false"
            :label-width="88" :model="formData" :rules="ruleData" style="width: 100%"
        >
            <form-item class="time-wrapper m-b-20" label="使用期限：" prop="expireDate" required>
                <div style="display: flex; align-items:center;">
                    <ui-radio-group v-model="formData.expireType" @on-change="handleChangeDeadlineType">
                        <ui-radio label="0">永久</ui-radio>
                        <ui-radio label="1">选择时间</ui-radio>
                    </ui-radio-group>
                    <ui-date-picker
                        v-if="formData.expireType + '' === '1'"
                        v-model="formData.expireDate" class="date-pick-wrap"
                        format="yyyy-MM-dd"
                        :picker-options="{ disabledDate: time => { return $dayjs(time).isBefore($dayjs(), 'day'); } }"
                        placeholder="请选择结束日期"
                        style="margin-left: 16px;"
                        type="date"
                        value-format="yyyy-MM-dd"
                        @on-change="handleChangeDate"
                    >
                    </ui-date-picker>
                </div>
            </form-item>
            <form-item class="m-b-20" label="详细说明：" prop="remark" required>
                <ui-input v-model.trim="formData.remark"
                    clearable counter
                    :maxlength="200" placeholder="请输入详细说明（必填）"
                    resize="none"
                    :rows="4" style="width: 100%;margin-top: 4px" type="textarea"
                >
                </ui-input>
            </form-item>
            <form-item label="权限人员：" required style="margin-bottom:0">
                <button class="btn btn-primary btn-outline f-r" style="margin-left: 10px" type="button" @click="handleShowAddDialog()"><i class="ui-icon-plus"></i>新增</button>
                <button class="btn btn-primary btn-outline f-r btn-import" type="button"  @click="handleImportDialog()">导入名单</button>
            </form-item>
        </ui-form>
        <div class="data-content" style="margin-top: 18px">
            <ui-table-pro class="table-pro-reset-ui"
                :data="tableList" empty-text="暂无数据" height="100%"
                tooltip-effect="dark" tooltip-max-width="200px"
            >
                <template slot="empty">
                    <table-empty-tip style="height:300px" tip-type="noData"></table-empty-tip>
                </template>
                <ui-table-column label="姓名" min-width="80" prop="name" show-overflow-tooltip> </ui-table-column>
                <ui-table-column label="邮箱" min-width="120" prop="email" show-overflow-tooltip></ui-table-column>
                <ui-table-column label="申请期限" min-width="90" prop="expireDate" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{ row.expireType + '' === '0' ? '永久' : row.expireDate }}
                    </template>
                </ui-table-column>
                <ui-table-column label="专业序列" min-width="90" prop="seq" show-overflow-tooltip></ui-table-column>
                <ui-table-column label="末级部门" min-width="90" prop="deptName" show-overflow-tooltip></ui-table-column>
                <ui-table-column label="当前权限截止时间" min-width="110" prop="deadlineDate" show-overflow-tooltip></ui-table-column>
                <ui-table-column label="操作" prop="" width="60">
                    <template slot-scope="{row}">
                        <span
                            class="text-primary column-operate-btn"
                            @click="onDel(row)"
                        >
                            删除
                        </span>
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
    </div>

    <div v-if="tableList.length" class="content-footer">
        <button class="btn btn-primary btn-outline" type="button" @click="preview">审批流预览</button>
        <button class="btn btn-primary btn-outline" type="button" @click="onBack()">取消</button>
        <button class="btn btn-primary" :disabled="isLoading" type="button" @click="onSubmit()">提交</button>
    </div>

    <ui-dialog v-model="showAddDialog"
        lock :prevent-confirm="true" prevent-layer
        title="新增vpn申请人员" width="468" wrap-class="ui-dialog-reset it-dialog-send-email-add"
        @on-confirm="onConfirm"
    >
        <template v-if="showAddDialog" slot="content">
            <ui-select
                v-model="vpnUserList" clearable
                filterable multiple
                placeholder="请选择"
                transfer @on-query-change="queryUser"
            >
                <ui-option v-for="(item, key) in userList"
                    :key="key" :label="item.label" :value="item.id"
                >
                    {{ item.label }}
                </ui-option>
            </ui-select>
        </template>
    </ui-dialog>

    <AuditPreviewDialoig ref="auditPreviewDialoig" />
    <batch-import-dialog ref="batchImportDialog" title="导入名单" @on-success="handleImportSuccess"></batch-import-dialog>
</div>
</template>
<script>
import { util, API } from '@noah/tools';
const { debounce  } = util;
const { _previewProgressOpenVpn, _getDetailByProcessInstanceId } = API.AUDIT;
const { _commonUserSearch } = API.COMMON;
const { _submitOpenVpn, _getUserInfo } = API.IT;

import AuditPreviewDialoig from '../../audit-preview-dialog/index.vue';
import BatchImportDialog from '../../batch-import-dialog/index.vue';
import TableEmptyTip from '../../table-empty-tip/index.vue';


export default {
  components: {
    TableEmptyTip,
    BatchImportDialog,  AuditPreviewDialoig
  },
  // mixins: [browerCtrl],
  props: {
    processInstanceId: { type: String, default: ''}
  },
  data() {
    return {
      IS_EDITING: 0,
      formData: this.getInitFormData(),
      ruleData: {
        // remark: [{ required: true, message: '请输入详细说明', trigger: 'change' }]
      },
      isLoading: false,
      vpnUserList: [],
      userList: [],
      showAddDialog: false,
      tableList: [],
      userListMap: {},        // 人员扁平化数据处理
      initValueStr: ''                    // 初始化json数据
    };
  },
  // computed: {
  //     processInstanceId() {
  //         return this.$route.query.processInstanceId || '';
  //     }
  // },
  mounted() {
    this.init();
  },
  watch: {
    userList: {
      handler: function (val, oldVal) {
        if (val && val.length) {
          val.forEach(item => {
            if (!this.userListMap[item.id]) {
              this.userListMap[item.id] = item;
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
    async init() {
      try {
        if (this.processInstanceId) {
          const { success, root } = await _getDetailByProcessInstanceId({
            processInstanceId: this.processInstanceId
          });
          if(!success || !root) return;
          let data = root.detail || {};
          this.tableList = data.vpnUserList || [];
          this.formData.remark = data.remark || '';
        }
        console.log(this.formData);
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
        expireType: '1',
        expireDate: '',
        remark: ''
      };
    },
    removeImage(index) {
      this.formData.attachments.splice(index, 1);
    },
    mockClick() {
      this.$refs.upload.mockClick();
    },
    async preview() {
      let validate = this.tableList.some(item => {
        return item.expireType + '' !== '0' && !item.expireDate;
      });
      if (validate) {
        this.$toast('请选择结束日期', 'warning');
        return;
      }

      if (!this.formData.remark) {
        this.$toast('请选填写详细说明', 'warning');
        return;
      }
      this.$refs.auditPreviewDialoig.open('loading');
      const { success, root } = await _previewProgressOpenVpn({
        processInstanceId: this.processInstanceId,
        vpnUserList: this.tableList,
        remark: this.formData.remark
      });
      if(success && root) {
        this.$refs.auditPreviewDialoig.open(root);
      } else {
        this.$refs.auditPreviewDialoig.open('empty');
      }
    },
    async onSubmit() {
      let validate = this.tableList.some(item => {
        return item.expireType + '' !== '0' && !item.expireDate;
      });
      if (validate) {
        this.$toast('请选择结束日期', 'warning');
        return;
      }

      if (!this.formData.remark) {
        this.$toast('请选填写详细说明', 'warning');
        return;
      }

      const check = async () => {
        try {
          if (this.isLoading) {return;};
          this.isLoading = true;
          const { success, root } = await _submitOpenVpn({
            processInstanceId: this.processInstanceId,
            vpnUserList: this.tableList,
            remark: this.formData.remark
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
      };

      const list = this.tableList.filter(t => {
        if(t.expireType + '' !== '0') {
          return t.deadlineDate && (t.deadlineDate === '永久' || this.$dayjs(t.deadlineDate).isAfter(this.$dayjs(t.expireDate)) || this.$dayjs(t.deadlineDate).isSame(this.$dayjs(t.expireDate)));
        } else {
          return t.deadlineDate === '永久';
        }
      });
      if(list.length) {
        this.$dialog({
          title: '提示',
          content: `以下人员的当前权限截止时间大于等于申请期限，请确认是否继续申请：${list.map(t => t.name).join('、')}`,
          type: 'warning',
          onConfirm: async () => {
            check();
          }
        });
        return;
      }

      this.$dialog({
        title: '提示',
        content: '确认提交列表人员的权限申请？',
        type: 'warning',
        onConfirm: async () => {
          check();
        }
      });

    },
    handleChangeDeadlineType() {
      this.formData.expireDate = '';
      this.tableList = this.tableList.map(item => {
        return {
          ...item,
          expireType: this.formData.expireType,
          expireDate: ''
        };
      });
    },
    queryUser: debounce(300, async function(key) {
      try {
        if (!key) return;
        const { success, root } = await _commonUserSearch({ key });
        if (success && root) {
          this.userList = (root || []).map(n => {
            return {
              ...n,
              label: `${[n.name, n.deptName, n.email].filter(item => item).join('-')}`
            };
          });
        }
      } catch (error){
        console.log(error);
      }
    }),
    handleShowAddDialog() {
      this.vpnUserList = [];
      this.showAddDialog = true;
    },
    // 导入名单
    handleImportDialog() {
      this.$refs.batchImportDialog.open();
    },
    // 导入成功回调
    handleImportSuccess(data) {
      const paramData = data.map(item=>{
        return {
          ...item,
          name: item.userName,
          deptName: item.jobDeptName
        };
      });
      this.onConfirm(paramData);
    },
    async onConfirm(data) {
      try {
        this.showAddDialog = false;
        let ids = this.tableList.map(item => item.id);
        let newUsers = [];
        if(data) {
          newUsers = data.filter(item => !ids.includes(item.id));
        }else {
          let newUserIds = this.vpnUserList.filter(id => !ids.includes(id));
          newUsers = newUserIds.map(id => {
            return this.userListMap[id];
          });
        };
        if (newUsers.length === 0) {
          return;
        }
        const { success, root = [] } = await _getUserInfo({
          emailList: newUsers?.map(v=>v.email)
        });
        let userMap = {};
        root.forEach(item => {
          userMap[item.id] = item;
        });
        if (success) {
          newUsers = newUsers.map((item, index) => {
            let baseInfo = userMap[item.id] || {};
            return {
              ...baseInfo,
              ...item
            };
          });
        }
        this.tableList.push(...newUsers.map(item => {
          return {
            ...item,
            expireType: this.formData.expireType,
            expireDate: this.formData.expireDate
          };
        }));
        !data && this.$toast(`新增成功！`, 'success');
      } catch (error) {

      }
    },
    onDel(row) {
      let delIndex = this.tableList.findIndex(item => item.id === row.id);
      if (delIndex === -1) { return; }
      this.tableList.splice(delIndex, 1);
    },
    handleChangeDate() {
      this.tableList = this.tableList.map(item => {
        return {
          ...item,
          expireType: this.formData.expireType,
          expireDate: this.formData.expireDate
        };
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
