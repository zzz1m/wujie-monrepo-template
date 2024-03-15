<template>
    <div class="attendance-approval__module">
        <div class="approval-component__container">
            <h2 class="title">基本信息</h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'userName')]">
                    <span>姓名</span>
                    <div>
                        <nari-tooltip :showTip="false"  :value="progressInfo.name" />
                    </div>
                </li>
                 <li :class="[highlightClass(progressInfo, 'deptName')]">
                    <span>末级部门</span>
                    <div>
                        <nari-tooltip :showTip="false"  :value="progressInfo.deptName" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="approval-component__container">
            <h2 class="title">
                <img src="@/assets/images/audit/contract-icon.png" />特殊考勤信息
            </h2>
            <ul class="approval-component__list">
                 <li :class="[highlightClass(progressInfo, 'typeName', true)]">
                    <span>特殊考勤类型</span>
                    <div>
                        <nari-tooltip :showTip="false"  :value="progressInfo.typeName" />
                    </div>
                </li>
                 <li v-if="progressInfo.shiftCode" :class="[highlightClass(progressInfo, 'shiftCode')]">
                    <span>考勤时间</span>
                    <div>
                        <nari-tooltip :showTip="false" :value="_getValue(progressInfo, 'shiftVO.name', '')" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'applyStartDate')]">
                    <span>时间范围</span>
                    <div>
                        <nari-tooltip :showTip="false"  :value="applyDate" />
                    </div>
                </li>
                <li :class="['full-row', 'mt40', highlightClass(progressInfo, 'remark')]">
                    <span>详细说明</span>
                    <div>{{ progressInfo.remark || '-' }}</div>
                </li>
                <li :class="['full-row', 'mt40', highlightClass(progressInfo, 'attachmentList')]">
                    <span>附件</span>
                    <div>
                        <ul v-if="(progressInfo.attachmentList || []).length" class="attachment-list" v-viewer="{ title: false, navbar: false, tooltip: false, }">
                            <li v-for="(item, index) in progressInfo.attachmentList || []" :key="index">
                                <img :src="item" class="preview-image" />
                            </li>
                        </ul>
                        <span v-else>-</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import commonMixin from './mixins';
import { _batchGetDictInfo } from '@/services/dashboard/common';
import { _getValue, getNameByCode } from '@/utils/util.js';
export default {
    name: 'SpecialAttendanceApproval',
    mixins: [commonMixin],
    components: {
    },
    computed: {
        processId() {
            return this.$route.query.processId;
        },
        isAppealReal() {
            return this.progressInfo.appealType === 3 || this.progressInfo.appealType === 4;
        },
        // 是否是公出
        isPublicOut() {
            const { leaveType } = this.progressInfo || {};
            return leaveType == 12 || leaveType == 13;
        },
        // 起止时间
        applyDate() {
            const { applyStartDate, applyEndDate } = this.progressInfo || {};
            // 请假按天请的显示上午，下午
            let startDate = this.$dayjs(applyStartDate).format('YYYY-MM-DD');
            let endDate = this.$dayjs(applyEndDate).format('YYYY-MM-DD');
            return [startDate, endDate].join(' ~ ')
        },
    },
    data() {
        return {
            progressInfo: {},
            typeList: []
        };
    },
    created() {
        this.getNameByCode = getNameByCode;
        this._getValue = _getValue;
        this.getCheckIng();
        this.getProgressInfo();
    },
    methods: {
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        },
        async getCheckIng() {
            const res = await _batchGetDictInfo(
                {typeList: ['attendance_special_type']}
            )
            if (res.success) {
                this.typeList = res.root.attendance_special_type;
            }
        },
    }
};
</script>