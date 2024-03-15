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
        <h2 class="title"><svg-icon icon-class="approval-info"></svg-icon>申请信息</h2>
        <div class="approval-component__inner">
            <ui-table-pro :data="tableData"
                class="table-pro-reset-ui"
                tooltip-effect="dark" tooltip-max-width="200px"
                stripe :border="false" empty-text="暂无数据"
            >
                <ui-table-column show-overflow-tooltip prop="name" label="服务名称" min-width="120px"></ui-table-column>
                <ui-table-column show-overflow-tooltip prop="domain" label="IP/域名" min-width="200px"></ui-table-column>
                <ui-table-column v-if="tableData && tableData[0] && tableData[0].minPort" show-overflow-tooltip prop="port" label="端口范围" min-width="120">
                    <template slot-scope="{row}">{{ `${row.minPort || '-'} - ${row.maxPort || '-'}` }}</template>
                </ui-table-column>
                <ui-table-column v-else show-overflow-tooltip prop="port" label="端口号" min-width="120"></ui-table-column>
            </ui-table-pro>
            <ul class="approval-component__list">
                <li :class="['full-row', 'margin-top-40', 'margin-bottom-20', highlightClass(progressInfo, 'description')]">
                    <span>详细说明</span>
                    <div>{{ progressInfo.desc || '-' }}</div>
                </li>
            </ul>
        </div>
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
            this.tableData = this.progressInfo.resourceList || [];
        }
    }
};
</script>