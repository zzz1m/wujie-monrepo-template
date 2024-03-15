<template>
<div class="contract-renew__module">
    <!-- 基本信息 -->
    <base-info :data="userInfoVO" :show-talent="true" :has-age-birth="true" />
    <div class="approval-component__container">
        <h2 class="title">
            <img src="@/assets/images/audit/contract-icon.png" />合同续签
        </h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'contractSubjectName')]">
                <span>合同主体</span>
                <div>{{ progressInfo.contractSubjectName || '-' }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'contractTypeName')]">
                <span>合同类型</span>
                <div>{{ progressInfo.contractTypeName || '-' }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'startDate')]">
                <span>合同起始日期</span>
                <div>{{ progressInfo.startDate ? $dayjs(progressInfo.startDate).format('YYYY-MM-DD') : '-' }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'durationName')]">
                <span>合同期限</span>
                <div>{{ progressInfo.durationName || '-' }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'endDate')]">
                <span>合同截止日期</span>
                <div>{{ progressInfo.endDate ? $dayjs(progressInfo.endDate).format('YYYY-MM-DD') : '-' }}</div>
            </li>
            <li :class="['full-row', highlightClass(progressInfo, 'description')]">
                <span>合同签订说明</span>
                <div>{{ progressInfo.description || '-' }}</div>
            </li>
        </ul>
    </div>
    <div v-if="isRenewalMag" class="approval-component__container">
        <template v-if="!userInfoVO.noAttendanceFlag">
            <h2 class="title">参考信息 <span class="title-explain">（以下信息可供综合参考，不作为续签评判条件）</span></h2>
            <!-- 考勤信息 -->
            <div class="approval-component__inner">
                <h2 class="title">
                    <svg-icon icon-class="contract-attendance" class="icon"></svg-icon>考勤信息
                </h2>
                <ul class="approval-component__list">
                    <li :class="[highlightClass(progressInfo, 'attendance.startDate')]">
                        <span>考勤统计日期范围</span>
                        <div>
                            {{ !progressInfo.attendance || !progressInfo.attendance.startDate && !progressInfo.attendance.endDate ? '-' : [progressInfo.attendance.startDate, progressInfo.attendance.endDate].filter(item => item).join(' ~ ') }}
                        </div>
                    </li>
                    <li :class="highlightClass(progressInfo, 'attendance.qualifiedBLine')">
                        <span>勤奋度</span>
                        <div>
                            <nari-tooltip :show-tip="false" :value="attendanceInfo.qualifiedBLine" />
                        </div>
                    </li>
                    <li :class="highlightClass(progressInfo, 'attendance.orderly')">
                        <span>遵章守纪</span>
                        <div>
                            <nari-tooltip :show-tip="false" :value="attendanceInfo.orderly" />
                        </div>
                    </li>
                </ul>
            </div>
        </template>
        <!-- 绩效信息 -->
        <div class="approval-component__inner approval-no-border">
            <h2 class="title">
                绩效信息
            </h2>
            <ui-table-pro ref="dataTable" :data="kpiInfo" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px"
            >
                <ui-table-column label="类型" min-width="300">
                    <template slot-scope="{ row }">
                        {{ row.typeName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="获得日期" min-width="300">
                    <template slot-scope="{ row }">
                        {{ row.achieveDate ? $dayjs(row.achieveDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="绩效信息" min-width="300" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.content || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="绩效级别" min-width="300">
                    <template slot-scope="{ row }">
                        {{ row.level || '-' }}
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
        <!-- 奖惩信息 -->
        <div class="approval-component__inner approval-no-border">
            <h2 class="title">
                奖惩信息
            </h2>
            <ui-table-pro ref="dataTable" :data="awardInfo" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px"
            >
                <ui-table-column label="类型" min-width="300">
                    <template slot-scope="{ row }">
                        {{ row.typeName || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="获得日期" min-width="300">
                    <template slot-scope="{ row }">
                        {{ row.achieveDate ? $dayjs(row.achieveDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="奖惩信息" min-width="300" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.content || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="奖惩级别" min-width="300">
                    <template slot-scope="{ row }">
                        {{ row.level || '-' }}
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
        <!-- 评价 -->
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="contract-evaluate" class="icon"></svg-icon>评价信息
            </h2>
            <ul class="approval-component__list">
                <li :class="['full-row', highlightClass(progressInfo, 'bpAppraise')]">
                    <span>HRBP评价</span>
                    <div v-if="!isHRBP || auditStatus === 1">{{ bpAppraise || '-' }}</div>
                    <div v-else>
                        <ui-input v-model="bpAppraise"
                            type="textarea" :rows="4" placeholder="(选填）可从该员工过往日常表现、工作态度等维度给出评价"
                            clearable :maxlength="1000"
                        ></ui-input>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import BaseInfo from '../components/base-info';
import commonMixin from './mixins';
import { _getAuditNodeStatusByProcessInstanceId, _contractWarningSaveAppraise } from '@/services/dashboard/audit';
import { isNull } from '@/utils/util';
export default {
    name: 'ContractRenew',
    components: { BaseInfo },
    mixins: [commonMixin],
    computed: {
        userInfoVO() {
            return this.progressInfo['userInfoVO'] || {};
        },
        processId() {
            return this.$route.query.processId;
        },
        userInfoServiceVOList() {
            return this.progressInfo['userInfoServiceVOList'] || [];
        },
        // 绩效信息
        kpiInfo() {
            return this.progressInfo.kpiList || [];
        },
        awardInfo() {
            return this.progressInfo.awardList || [];
        },  
        attendanceInfo() {
            return this.progressInfo.attendance || {};
        },
        isHRBP() {
            return this.currentNodeName === '所属BP审批';
        },
        isRenewalMag() {
            return this.processTypeCode === 'SJT010005';
        }
    },
    data() {
        return {
            progressInfo: {},
            bpAppraise: '',
            currentNodeName: '',
            auditStatus: 0,
            processTypeCode: ''
        };
    },
    created() {
        this.getContractAuditDetail();
        this.getAuditNodeStatusByProcessInstanceId();
    },
    methods: {
        // 获取审批流程信息
        async getContractAuditDetail() {
            const params = {
                processInstanceId: this.processId
            };
            if(this.$route.query.module) {
                params.module = this.$route.query.module;
            }
            const { success, root } = await this.getDetailApi(params);
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.processTypeCode = root.processTypeCode;
            this.bpAppraise = this.progressInfo?.bpAppraise || '';
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        },
        async getAuditNodeStatusByProcessInstanceId() {
            const { success, root } = await _getAuditNodeStatusByProcessInstanceId({
                processInstanceId: this.processId
            });
            if(!(success && root && root.length)) return;
            const current = root.find(item => item.last === 1);
            this.currentNodeName = current ? current.nodeName : '';
            this.auditStatus = !isNull(current?.auditStatus) ? current?.auditStatus : 0;
        },
        async beforeAgree() {
            try {
                if (!this.isHRBP || !this.bpAppraise) {
                    return {
                        postData: {}
                    };
                }
                else {
                    const { success, root } = await _contractWarningSaveAppraise({
                        processInstanceId: this.processId,
                        bpAppraise: this.bpAppraise
                    });
                    if (success) {
                        return {
                            postData: {}
                        };
                    }
                    return false;
                }
            } catch(error) {
                console.log(error);
            }
        }
    }
};
</script>