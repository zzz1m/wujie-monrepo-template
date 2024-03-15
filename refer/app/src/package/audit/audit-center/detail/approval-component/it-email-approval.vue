<template>
<div class="it-approval-page">
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
            <ui-table-column show-overflow-tooltip prop="displayName" label="邮箱姓名" min-width="100"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="mailNickname" label="邮箱地址" min-width="140">
                <template slot-scope="{row}">
                    <span>{{ row.mailNickname }}.p@kanzhun.com</span>
                </template>
            </ui-table-column>
            <ui-table-column show-overflow-tooltip prop="ownerName" label="负责人" min-width="80"></ui-table-column>
            <ui-table-column show-overflow-tooltip prop="remark" label="详细说明" min-width="260"></ui-table-column>
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
            tableData: [],
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
            this.tableData = (root.detail || {}).mailList || [];
        }
    }
};
</script>