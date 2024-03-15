<template>
<div class="it-approval-page it-send-email-approval">
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
    <div class="approval-component__container">
        <h2 class="title">申请信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(effectDateStr, 'effectDateStr', true)]">
                <span>群组名称</span>
                <div>{{ progressInfo.displayName || '-' }}</div>
            </li>
            <li :class="[highlightClass(effectDateStr, 'effectDateStr', true)]">
                <span>群组地址</span>
                <div>{{ progressInfo.mail || '-' }}</div>
            </li>
        </ul>
        <ui-tab v-model="activeName" class="ui-tab-new">
            <ui-tab-pane label="增加发件权限" name="addAuthority"></ui-tab-pane>
            <ui-tab-pane label="删除发件权限" name="delAuthority"></ui-tab-pane>
        </ui-tab>
        <ui-table-pro :key="activeName" :data="showTable"
            class="table-pro-reset-ui"
            tooltip-effect="dark" tooltip-max-width="200px"
            :border="false" empty-text="暂无数据"
        >
            <ui-table-column show-overflow-tooltip prop="displayName" label="姓名" min-width="120px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="userPrincipalName" label="邮箱" min-width="200px"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="department" label="末级部门" min-width="120"></ui-table-column>
        </ui-table-pro>
    </div>
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
            addTableData: [],
            delTableData: [],
            activeName: 'addAuthority',
            progressInfo: {}
        };
    },
    computed: {
        processId() {
            return this.$route.query.processId;
        },
        showTable() {
            return this.activeName === 'addAuthority' ? this.addTableData : this.delTableData;
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
            this.addTableData = this.progressInfo.addList || [];
            this.delTableData = this.progressInfo.removeList || [];
        }
    }
};
</script>