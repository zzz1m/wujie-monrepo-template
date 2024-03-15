<template>
<div class="it-approval-page it-vpn-authority">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'launcher.name', true)]">
                <span>姓名</span>
                <div>{{ _getValue(progressInfo, 'launcher.name', '-') }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'launcher.deptName', true)]">
                <span>末级部门</span>
                <div>{{ _getValue(progressInfo, 'launcher.deptName', '-') }}</div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container approval-no-border">
        <button v-if="dataPrivilege.operatePrivilege && (currentNode[0].nodeName !== '填写表单')" type="button" class="btn btn-primary btn-outline btn-small float-right vpn-authority-btn" @click="handleEdit()">调整使用期限</button>
        <h2 class="title">申请信息</h2>
        <ui-table-pro :data="tableData"
            class="table-pro-reset-ui"

            tooltip-effect="dark" tooltip-max-width="200px"
            :border="false" empty-text="暂无数据"
        >
            <ui-table-column show-overflow-tooltip prop="name" fixed="left"  label="姓名" min-width="90px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="seq" label="序列" min-width="90px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="deptName" label="末级部门" min-width="120"></ui-table-column>
            <ui-table-column v-if="dataPrivilege.operatePrivilege && (currentNode[0].nodeName !== '填写表单')" show-overflow-tooltip prop="entryDays" label="在职天数" min-width="80px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="deadlineDate" label="当前权限截止时间" min-width="80px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="expireDate" label="申请期限" min-width="140px">
                <template slot-scope="{row}">
                    <span>{{ row.expireType + '' === '0' ? '永久' : row.expireDate }}</span>
                </template>
            </ui-table-column>
            <ui-table-column v-if="progressInfo.isItHeaderRole" show-overflow-tooltip prop="roleGroup" label="角色组" width="120px">
                <template slot-scope="{row}">
                    <span>{{ row.roleGroup }}</span>
                </template>
            </ui-table-column>
            <ui-table-column v-if="dataPrivilege.operatePrivilege && progressInfo.isItGroupApprove" label="操作" width="120">
                <template slot-scope="{row}">
                    <span
                        class="text-primary column-operate-btn"
                        @click="handleEdit(row)"
                    >
                        修改角色组
                    </span>
                </template>
            </ui-table-column>
        </ui-table-pro>
    </div>
    <div class="approval-component__container approval-no-border">
        <h2 class="title">详细说明</h2>
        <ul class="approval-component__list m-t-20">
            <li :class="['full-row', highlightClass(progressInfo, 'remark')]">
                <div>{{ remark || '-' }}</div>
            </li>
        </ul>
    </div>
    <ui-dialog v-model="showEditDialog"
        :title="dialogType === 'editRow' ? '编辑角色组' : '调整使用期限'" width="630" wrap-class="ui-dialog-reset change-service-life-dialog"
        lock prevent-layer :prevent-confirm="true"
        @on-confirm="onConfirm"
    >
        <template v-if="showEditDialog" slot="content">
            <ui-form ref="form" :model="formData" :rules="rules" :label-width="100">
                <template v-if="dialogType !== 'editRow'">
                    <form-item label="使用期限：" prop="expireDate" class="time-wrapper">
                        <ui-radio-group v-model="formData.expireType" @on-change="handleChangeDeadlineType">
                            <ui-radio label="0">永久</ui-radio>
                            <ui-radio label="1">选择时间</ui-radio>
                        </ui-radio-group>
                        <ui-date-picker
                            v-if="formData.expireType === '1'"
                            v-model="formData.expireDate" placeholder="选择日期"
                            type="date"
                            value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                            :picker-options="{ disabledDate: time => { return $dayjs(time).isBefore($dayjs(), 'day'); } }"
                        >
                        </ui-date-picker>
                    </form-item>
                </template>
                <form-item v-else label="角色组：" prop="roleGroupCode" class="time-wrapper">
                    <ui-select
                        v-model="formData.roleGroupCode"
                        filterable clearable
                        placeholder="请选择"
                        transfer
                    >
                        <ui-option v-for="(item, key) in groupList"
                            :key="key" :value="item.id" :label="item.name"
                        >{{ item.label }}</ui-option>
                    </ui-select>
                </form-item>
            </ui-form>
        </template>
    </ui-dialog>
</div>
</template>
<script>
import commonMixin from './mixins';
import { getNameByCode } from '@/utils/util.js';
import { _searchInfo } from '@/services/dashboard/meeting';
import { debounce } from '@/utils/common';
import { _getSpecialDictTypes } from '@/services/dashboard/system/common';
import { _saveOpenVpn } from '@/services/dashboard/it-order';
import { _roleGroupList } from '@/services/dashboard/it-manage';
export default {
    name: 'ChangeApproval',
    mixins: [commonMixin],
    data() {
        // 校验时间
        const validatorTime = (rule, value, callback) => {
            const { expireType, expireDate } = this.formData;
            if (expireType === '1' && !expireDate) {
                callback(new Error('请填写时间段'));
            } else {
                callback();
            }
        };

        return {
            isLoad: false,
            tableData: [],
            formData: {
                expireType: '1',
                expireDate: '',
                roleGroupCode: ''
            },
            showEditDialog: false,
            rules: {
                expireDate: [
                    { required: true, validator: validatorTime, trigger: 'change' }
                ],
                roleGroupCode: [
                    { required: true, message: '请填写角色组', trigger: 'change' }
                ]
            },
            dialogType: 'add',
            currentRow: {},
            groupList: [],
            progressInfo: {},
            remark: '',
            cacheExpireType: '',
            cacheExpireDate: '',
            ExpireTypeWrap: '',
            expireDateWrap: ''
        };
    },
    computed: {
        processId() {
            return this.$route.query.processId;
        }
    },
    created() {
        this.getProgressInfo();
        this.getNameByCode = getNameByCode;
    },
    methods: {
        // 获取审批详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.tableData = (this.progressInfo.vpnUserList || []).map(item => {
                item.roleGroupCode = item.roleGroupCode || '';
                item.roleGroup = item.roleGroup || '';
                item.deadlineDate = item.deadlineDate || '';
                return {
                    ...item
                };
            });
            this.cacheExpireType = this.ExpireTypeWrap = this.tableData && this.tableData[0].expireType;
            this.cacheExpireDate = this.expireDateWrap = this.tableData && this.tableData[0].expireDate || '';
            this.remark = this.progressInfo.remark;
            if(this.dataPrivilege.operatePrivilege && this.progressInfo.isItGroupApprove) {
                this.queryGroup();
            };
        },  
        handleEdit(row) {
            if (row) {
                this.dialogType = 'editRow';
                this.currentRow = row;
            } else {
                this.dialogType = 'add';
            }
            
            this.formData.expireType = '1';
            this.formData.expireDate = '';
            this.formData.roleGroupCode = '';
            this.showEditDialog = true;
        },
        handleChangeDeadlineType() {
            this.formData.expireDate = '';
        },
        async onConfirm() {
            const valid = await this.$refs.form.validate();
            if(!valid) return;
            if (this.dialogType === 'editRow') {
                this.currentRow.roleGroupCode = this.formData.roleGroupCode;
                this.currentRow.roleGroup = this.groupList.find(item => item.id === this.formData.roleGroupCode)?.name;
            } else {
                this.tableData.forEach(item => {
                    item.expireType = this.formData.expireType;
                    item.expireDate = this.formData.expireDate;
                });
                this.ExpireTypeWrap = this.formData.expireType;
                this.expireDateWrap = this.formData.expireDate;
            };
            this.showEditDialog = false;
            
        },
        queryGroup: debounce(300, async function() {
            try {
                const { success, root } = await _roleGroupList();
                if (success) {
                    this.groupList = (root || []).map(n => {
                        return {
                            name: n.name,
                            id: n.code,
                            label: n.name
                        };
                    });
                }
            } catch(error) {
                console.log(error);
            }
        }),
        async beforeAgree() {
            try {
                const { success, root } = await _saveOpenVpn({
                    processInstanceId: this.processId,
                    vpnUserList: this.tableData,
                    remark: this.progressInfo.remark
                });
                if (success) {
                    return {
                        postData: {
                            remark: {
                                isChangeTime: !(this.cacheExpireType == this.ExpireTypeWrap && this.cacheExpireDate == this.expireDateWrap),
                                expireDate: this.ExpireTypeWrap == 1 ? this.expireDateWrap : '永久'
                            }
                        }
                    };
                }
                return false;
            } catch(error) {
                console.log(error);
            }
        }
    }
};
</script>