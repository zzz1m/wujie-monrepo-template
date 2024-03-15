<template>
<div class="it-approval-page it-password-approval">
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
        <h2 class="title">申请信息</h2>
        <ui-table-pro :data="tableData"
            class="table-pro-reset-ui"
            tooltip-effect="dark" tooltip-max-width="200px"
            :border="false" empty-text="暂无数据"
        >
            <ui-table-column show-overflow-tooltip prop="displayName" label="邮箱名称" min-width="220"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="userPrincipalName" label="邮箱地址" min-width="300"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="ownerName" label="负责人" min-width="200"></ui-table-column>
            <!-- <ui-table-column prop="password" label="重置后密码" min-width="240">
                    <template slot-scope="{row}">
                        <span>{{ row.showPassWord ? row.password : '********' }}</span>
                        <svg-icon class="eye-btn" :icon-class="row.showPassWord ? 'eye-open' : 'eye-close'" @click.native="totleShowPassword(row)"></svg-icon>
                    </template>
                </ui-table-column> -->
            <!-- <ui-table-column label="操作" width="120">
                    <template slot-scope="{row}">
                        <span
                            class="text-primary column-operate-btn"
                            @click="handleShowEditDialog(row)"
                        >重置密码</span>
                    </template>
                </ui-table-column> -->
        </ui-table-pro>
    </div>
    <ui-dialog v-model="showEditDialog"
        title="重置密码" width="360" wrap-class="ui-dialog-reset approval-it-reset-password-dialog"
        lock prevent-layer :prevent-confirm="true"
        @on-confirm="onEditDialogConfirm"
    >
        <template v-if="showEditDialog" slot="content">
            <ui-form ref="form"
                :model="formData" :rules="ruleData" :label-width="0" :inline="false"
            >
                <form-item label="" prop="passWord">
                    <ui-input v-model.trim="formData.passWord"
                        type="text" placeholder="请输入重置后密码"
                        clearable :maxlength="30"
                    ></ui-input>
                </form-item>
            </ui-form>
        </template>
    </ui-dialog>
</div>
</template>
<script>
import commonMixin from './mixins';
import { getNameByCode } from '@/utils/util.js';
import { _getSpecialDictTypes } from '@/services/dashboard/system/common';
export default {
    name: 'ChangeApproval',
    mixins: [commonMixin],
    data() {
        return {
            effectDateStr: '',
            isLoad: false,
            tableData: [],
            showEditDialog: false,
            currentRow: {},
            formData: {
                passWord: ''
            },
            ruleData: {
                passWord: [{ required: true, message: '请输入重置后密码', trigger: 'change' }]
            },
            progressInfo: {}
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
            this.tableData = ((root.detail || {}).mailList || []).map(item => {
                item.showPassWord = false;
                return item;
            });
        },
        // 确定之前 先保存密码
        async beforeSubmit() {
            // if (this.tableData.find(item => !item.password)) {
            //     this.$dialog({
            //         title: '温馨提示',
            //         content: '重置后密码未填写',
            //         type: 'warning'
            //     });
            //     return false;
            // }
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(success) return true;
            return false;
        },
        handleShowEditDialog(row) {
            this.currentRow = row;
            this.formData.passWord = row.passWord || '';
            this.showEditDialog = true;
        },
        async onEditDialogConfirm() {
            const valid = await this.$refs.form.validate();
            if(!valid) return;

            this.currentRow.password = this.formData.passWord;
            this.showEditDialog = false;
        },
        totleShowPassword(row) {
            row.showPassWord = !row.showPassWord ;
        }
    }
};
</script>