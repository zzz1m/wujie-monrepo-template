<template>
<div class="leave-approval__module">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'userInfoVO.name')]">
                <span>姓名</span>
                <div>
                    <talentIcon :id="userInfoVO.idStr" :name="userInfoVO.name" :blank="true" style="position: relative; top: 1px" />
                </div>
            </li>
            <li v-if="!(['systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.number')]">
                <span>员工编号</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.number" />
                </div>
            </li>
            <li v-if="!(['systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.joinDate')]">
                <span>入职日期</span>
                <div>{{ userInfoVO.joinDate ? $dayjs(userInfoVO.joinDate).format('YYYY-MM-DD') : '-' }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInfoVO.email')]">
                <span>邮箱</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.email" />
                </div>
            </li>
            <li v-if="!(['systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.mobile')]">
                <span>手机号码</span>
                <div>{{ userInfoVO.mobile || '-' }}</div>
            </li>
            <!-- 审批人、签批人不能查看证件号码 -->
            <li v-if="!(['approval', 'sign', 'qccClose', 'compete', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.idCardNumber')]">
                <span>证件号码</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.idCardNumber" />
                </div>
            </li>
            <li v-if="!(['read'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.deptName')]">
                <span>部门</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.deptName" />
                </div>
            </li>
            <li v-if="!(['read'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.positionName')]">
                <span>岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.positionName" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.manageSeq')]">
                <span>管理序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.manageSeq" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.manageSeqLevel')]">
                <span>管理职级</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.manageSeqLevel" />
                </div>
            </li>
                
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.manageSeqSub')]">
                <span>管理子序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.manageSeqSub" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.manageStdPosition')]">
                <span>管理标准岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.manageStdPosition" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.seq')]">
                <span>专业序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.seq" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.seqLevel')]">
                <span>专业职级</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.seqLevel" />
                </div>
            </li>
                
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.seqSub')]">
                <span>专业子序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.seqSub" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.stdPosition')]">
                <span>专业标准岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.stdPosition" />
                </div>
            </li>
            <!-- 签批人、期权/股票处理、传阅离职员工节点 不能查看是否是部门负责人 -->
            <li v-if="!(['sign', 'share', 'qccClose', 'read', 'compete', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.isTl')]">
                <span>是否部门负责人</span>
                <div>{{ translateBoolLabel(userInfoVO.isTl) }}</div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.reporterName')]">
                <span>汇报人</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.reporterName" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.reporterName2')]">
                <span>汇报人2</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.reporterName2" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.workplace')]">
                <span>工作地点</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.workplace" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.sourceName')]">
                <span>来源渠道</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.sourceName" />
                </div>
            </li>
            <li v-if="!(['read', 'systemHandover'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.inviteUserName')]">
                <span>推荐人</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.inviteUserName" />
                </div>
            </li>
            <li v-if="(['qccClose'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoVO.qccAccount')]">
                <span>企查查账号</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInfoVO.qccAccount" />
                </div>
            </li>
        </ul>
    </div>
    <div v-if="!(['read'].indexOf(operateRole) > -1)" class="approval-component__container">
        <h2 class="title">表单信息</h2>
        <!-- 离职信息 -->
        <div v-if="!(['systemHandover'].indexOf(operateRole) > -1)" class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="icon-departure" class="icon" />离职信息
            </h2>
            <ul class="approval-component__list">
                <li v-if="!(['share', 'sign', 'compete', 'qccClose',].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.leaveSituationName')]">
                    <span>离职情形</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoLeaveJobVO.leaveSituationName" />
                    </div>
                </li>
                <li v-if="!(['share', 'sign', 'compete', 'qccClose',].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.opTypeName')]">
                    <span>离职操作类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoLeaveJobVO.opTypeName" />
                    </div>
                </li>
                <li v-if="!(['share', 'sign', 'qccClose', 'compete'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.realTypeName')]">
                    <span>真实离职类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoLeaveJobVO.realTypeName" />
                    </div>
                </li>
                <li v-if="!(['share', 'sign', 'qccClose', 'compete'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.reasonTypeName')]">
                    <span>离职原因所属类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoLeaveJobVO.reasonTypeName" />
                    </div>
                </li>
                <li v-if="!(['share', 'sign', 'qccClose', 'compete'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.handoverUserName')]">
                    <span>工作交接人</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoLeaveJobVO.handoverUserName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.lastDay')]">
                    <span style="position: relative">
                        最后工作日期
                        <ui-tooltip placement="top" :open-delay="500" class="staff-apply-msg-wrapper" style="top: -1px;left: 84px" effect="dark">
                            <span><i class="ui-icon-warning"></i> </span>
                            <div slot="content">
                                <p>最后出勤日期，包含员工请休的年休假、调休假。</p>
                            </div>
                        </ui-tooltip>
                    </span>
                    <div>{{ userInfoLeaveJobVO.lastDay ? $dayjs(userInfoLeaveJobVO.lastDay).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li v-if="!(['share', 'sign', 'qccClose'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.convertVacation')]">
                    <span>安排年休假天数（天）</span>
                    <div>{{ userInfoLeaveJobVO.convertVacation }}</div>
                </li>
                <li v-if="!(['share', 'sign', 'qccClose', 'compete'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.remainLeaveInLieu')]">
                    <span>安排调休天数（天）</span>
                    <div>{{ userInfoLeaveJobVO.remainLeaveInLieu }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.releaseDate')]">
                    <span>结薪日期/解除日期</span>
                    <div>{{ userInfoLeaveJobVO.releaseDate ? $dayjs(userInfoLeaveJobVO.releaseDate).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li v-if="!(['share', 'qccClose', 'sign'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.restrictionTypeName')]">
                    <span>是否执行竞业限制</span>
                    <div>{{ userInfoLeaveJobVO.restrictionTypeName || '-' }}</div>
                </li>
                <template v-if="['01', '04'].indexOf(userInfoLeaveJobVO.restrictionType) > -1 && !(['share', 'sign', 'qccClose'].indexOf(operateRole) > -1)">
                    <li :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.competitivePayName')]">
                        <span>竞业限制标准</span>
                        <div>
                            <nari-tooltip :show-tip="false" :value="userInfoLeaveJobVO.competitivePayName" />
                        </div>
                    </li>
                    <li :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.restrictionStartDate')]">
                        <span>竞业开始日期</span>
                        <div>{{ userInfoLeaveJobVO.restrictionStartDate ? $dayjs(userInfoLeaveJobVO.restrictionStartDate).format('YYYY-MM-DD') : '-' }}</div>
                    </li>
                    <li :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.restrictionTerm')]">
                        <span>竞业限制期限（月）</span>
                        <div>{{ userInfoLeaveJobVO.restrictionTerm || '-' }}</div>
                    </li>
                    <li :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.restrictionExpiryDate')]">
                        <span>竞业结束日期</span>
                        <div>{{ userInfoLeaveJobVO.restrictionExpiryDate ? $dayjs(userInfoLeaveJobVO.restrictionExpiryDate).format('YYYY-MM-DD') : '-' }}</div>
                    </li>
                </template>
                <li v-if="!(['share', 'qccClose', 'sign'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.payEconomicCompensate')]">
                    <span>是否支付经济补偿</span>
                    <div>{{ translateBoolLabel(userInfoLeaveJobVO.payEconomicCompensate) }}</div>
                </li>
                <li v-if="[1, '1', true].indexOf(userInfoLeaveJobVO.payEconomicCompensate) > -1 && !(['share', 'sign', 'qccClose'].indexOf(operateRole) > -1)" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.economicPayName')]">
                    <span>经济补偿标准</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoLeaveJobVO.economicPayName" />
                    </div>
                </li>
                <li v-if="!(['share', 'qccClose', 'sign'].indexOf(operateRole) > -1)" class="full-row" :class="[highlightClass(progressInfo, 'userInfoLeaveJobVO.remark')]">
                    <span>离职详细说明</span>
                    <div>{{ userInfoLeaveJobVO.remark || '-' }}</div>
                </li>
            </ul>
        </div>
        <!-- 合同信息 -->
        <div v-if="!(['sign', 'qccClose', 'compete', 'systemHandover'].indexOf(operateRole) > -1)" class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="icon-contract" class="icon" />合同信息
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'userInfoContractVO.signType')]">
                    <span>签订类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoContractVO.signType" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userInfoContractVO.contractType')]">
                    <span>合同类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoContractVO.contractType" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userInfoContractVO.contractSubject')]">
                    <span>合同主体</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoContractVO.contractSubject" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userInfoContractVO.duration')]">
                    <span>合同期限</span>
                    <div>{{ userInfoContractVO.duration || '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userInfoContractVO.startDate')]">
                    <span>合同开始日期</span>
                    <div>{{ userInfoContractVO.startDate ? $dayjs(userInfoContractVO.startDate).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="[highlightClass(progressInfo, 'userInfoContractVO.endDate')]">
                    <span>合同结束日期</span>
                    <div>{{ userInfoContractVO.endDate ? $dayjs(userInfoContractVO.endDate).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="['full-row', highlightClass(progressInfo, 'userInfoContractVO.description')]">
                    <span>合同签订说明</span>
                    <div>{{ userInfoContractVO.description || '-' }}</div>
                </li>
            </ul>
        </div>
        <!-- 服务交接 -->
        <div v-if="projectHandoverList.length" class="approval-component__inner system-handover">
            <h2 class="title">
                <svg-icon icon-class="icon-approval-handover" class="icon" />系统交接
            </h2>
             <ui-table-pro
                :data="projectHandoverList" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px"
            >
                <ui-table-column label="交接内容" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                       <div :style="row.isDetail? 'margin-left: 16px':'font-weight:600'">{{ row.name }}</div>
                    </template>
                </ui-table-column>
                <ui-table-column label="工作交接人" :width="400">
                    <template slot-scope="{ row, $index }">
                        <ui-select
                            v-if="row.show && (progressInfo.isLeaveModuleEditUser && (row.canEditPrincipal || !row.isDetail))"
                            :key="$index"
                            v-model="row.principalUserId"
                            :class="isDirty && !row.principalUserId ? 'approval-error' : ''"
                            filterable clearable
                            placeholder="请选择工作交接人"
                            transfer
                            @on-query-change="(val) => queryUser(val, row)"
                            @on-change="(val) => handleUserChange(val, row)"
                        >
                            <ui-option v-for="item in row.principal"
                                :key="item.userId" :value="item.userId" :label="item.name"
                            >{{ item.label }}</ui-option>
                        </ui-select>
                        <template v-else>
                            {{ row.principal && row.principal.length ? row.principal[0].name : '' }}
                        </template>
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
        <!-- 服务期限 -->
        <div v-if="!(['sign', 'qccClose', 'share', 'compete', 'systemHandover'].indexOf(operateRole) > -1) && userInfoServiceVOList && userInfoServiceVOList.length" class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="icon-serve" class="icon" />服务期限
            </h2>
            <ui-table-pro ref="dataTable" :data="userInfoServiceVOList" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px"
            >
                <ui-table-column label="服务开始时间" width="300">
                    <template slot-scope="{ row }">
                        {{ row.startDate ? $dayjs(row.startDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="服务结束时间" width="300">
                    <template slot-scope="{ row }">
                        {{ row.endDate ? $dayjs(row.endDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="服务期说明" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        {{ row.description || '-' }}
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
        <!-- 工伤记录 -->
        <div v-if="!(['sign', 'qccClose', 'share', 'compete', 'systemHandover'].indexOf(operateRole) > -1) && userInfoInjuryVOList && userInfoInjuryVOList.length" class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="icon-gs" class="icon" />工伤记录
            </h2>
            <ui-table-pro ref="dataTable" :data="userInfoInjuryVOList" empty-text="暂无数据"
                class="table-pro-reset-ui" tooltip-effect="dark" tooltip-max-width="300px"
            >
                <ui-table-column label="发生时间" width="300">
                    <template slot-scope="{ row }">
                        {{ row.occurDate ? $dayjs(row.occurDate).format('YYYY-MM-DD') : '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="详情">
                    <template slot-scope="{ row }">
                        {{ row.detail || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="停工留薪期结束日期" width="300">
                    <template slot-scope="{ row }">
                        {{ row.endDate || '-' }}
                    </template>
                </ui-table-column>
                <ui-table-column label="工伤鉴定等级" width="300">
                    <template slot-scope="{ row }">
                        {{ row.level || '-' }}
                    </template>
                </ui-table-column>
            </ui-table-pro>
        </div>
    </div>
</div>
</template>
<script>
import commonMixin from '../mixins';
import { mapState } from 'vuex';
import { _getAuditNodeStatusByProcessInstanceId, _principalSave } from '@/services/dashboard/audit';
import { _searchInfo } from '@/services/dashboard/meeting';
import { debounce } from '@/utils/common';
import { scrollToFormError } from '@/utils/util.js';
import talentIcon from '@/components/talent-entry-icon/index.vue';
import { _commonUserSearch } from '@/services/dashboard/base';


// 需要获取的字典
const needTranslateCodeList = ['leave_type', 'actual_leave_type', 'competitive_pay', 'economic_pay', 'restriction_type'];
export default {
    name: 'LeaveApproval',
    components: {talentIcon},
    mixins: [commonMixin],
    props: {
        tdata: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        ...mapState(['userInfo']),
        processId() {
            return this.$route.query.processId;
        },
        // 基本信息
        userInfoVO() {
            return this.progressInfo['userInfoVO'] || {};
        },
        // 离职信息
        userInfoLeaveJobVO() {
            return this.progressInfo['userInfoLeaveJobVO'] || {};
        },
        // 合同信息
        userInfoContractVO() {
            return this.progressInfo['userInfoContractVO'] || {};
        },
        // 服务期限
        userInfoServiceVOList() {
            return this.progressInfo['userInfoServiceVOList'] || [];
        },
        // 工伤记录
        userInfoInjuryVOList() {
            return this.progressInfo['userInfoInjuryVOList'] || [];
        },
        // 据BPM传给Noah的审批节点名称判断当前人是什么角色，从而判断字段是否可见
        operateRole() {
            const processList = this.processList || [];
            let role = '';
            // 查找节点信息的函数
            const findNodeFn = node => {
                // 发起申请节点 接口也会返回填写表单 用填写表单判断
                let nodeName = node.nodeName === '发起申请' ? '填写表单' : node.nodeName;
                return nodeName === this.currentNodeName;
            };
            // 获取当前人操作的节点信息
            const currentUserNodeIndex = processList.findIndex(findNodeFn);
            // ER主管节点（之前的节点的审批人为审批角色，后面的为签批人角色）
            const isSigner = this.isSigner(currentUserNodeIndex, processList);
            
            if(['离职证明开具1', '离职证明开具', '逐级传阅HRBP'].indexOf(this.currentNodeName) > -1 || (this.progressInfo.viewUser && !this.progressInfo.leaveUser)) {  // viewUser 是否是传阅人员
                // 拥有这三个节点角色可以看到所有的字段
                role = 'leave';
            } else if(['期权/股票处理', '社会保险/公积金'].indexOf(this.currentNodeName) > -1) {
                role = 'share';
            } else if(['传阅离职员工'].indexOf(this.currentNodeName) > -1 || this.progressInfo.leaveUser) { // leaveUser 是否是传阅离职员工
                role = 'read';
            } else if(['竞业协议/补偿金'].indexOf(this.currentNodeName) > -1) {
                role = 'compete';
            } else if(['企查查账号关闭'].indexOf(this.currentNodeName) > -1) {
                role = 'qccClose';   // 企查查账号关闭节点  除了可以看企查查账号其他跟签批人一致
            } else if(['系统交接'].indexOf(this.currentNodeName) > -1) {
                role = 'systemHandover';   // 系统交接
            } else if (isSigner) {
                // ER节点之后的 视为签批人
                role = 'sign';
            } else {
                // ER节点之前包含【ER主管】节点 视为审批人
                role = 'approval';
            }
            return role;
        }
    },
    data() {
        return {
            progressInfo: {},
            currentNodeName: '',
            userList0: [],              // 人员列表
            userList1: [],              // 人员列表
            projectHandoverList: [],    // 系统交接列表
            isDirty: false              // 是否检验过
        };
    },
    async created() {
        await Promise.all([
            this.getProgressInfo(), 
            this.getAuditNodeStatusByProcessInstanceId()
        ]);
        this.$nextTick(() => {
            this.$emit('showProgress');
            // console.log('approval', this.operateRole);
            // if(this.operateRole === 'approval') {
            //     this.$emit('showProgress');
            // }
        });
    },
    methods: {
        /**
         * 判断是不是签批人 ER主管节点（之前的节点的审批人为审批角色，后面的为签批人角色）
         */
        isSigner(currentUserNodeIndex, progressList) {
            let isSigner = false;
            if (currentUserNodeIndex === -1) {return isSigner;}

            const currentProgressList = progressList.slice(currentUserNodeIndex);
           
            for (let i = 1; i < currentProgressList.length; i++) {
                let node = currentProgressList[i];
                // 退回之前算是一个链路
                if (node.approveResult === '退回') {
                    break;
                }
                if (node.nodeName === 'ER主管') {
                    isSigner = true;
                }
            }
            return isSigner;
        },
        // 获取访谈详情
        async getProgressInfo() {
            // const { success, root } = await this.getDetailApi({
            //     processInstanceId: this.processId
            // });
            // if(!success || !root) return;

            this.progressInfo = this.tdata.progressInfo|| {};
            this.highlightFieldList = this.tdata.highlightFieldList || [];

            const result = [];
            (this.progressInfo.leaveModule || []).forEach(t => {
                const { systemName, list } = t;
                result.push({
                    name: `${systemName} (${list?.length || 0})`,
                    systemName,
                    principalUserId: '',
                    show: true,
                    principal: []
                });
                list.forEach(l => {
                    result.push({
                        ...l,
                        name: l.description,
                        isDetail: true,
                        systemName,
                        show: true,
                        principal: (l.principal || []).map(n => {
                            return {
                                name: [n.name, n.deptName].join('-'),
                                userId: n.userId,
                                label: [n.name, n.deptName, n.email].join('-')
                            };
                        }),
                        principalUserId:  l?.principal?.length ? l.principal[0].userId : ''
                    });
                });
            });
            this.projectHandoverList = result;
        },
        async getAuditNodeStatusByProcessInstanceId() {
            const { success, root } = await _getAuditNodeStatusByProcessInstanceId({
                processInstanceId: this.processId
            });
            if(!(success && root && root.length)) return;
            const current = root.find(item => item.last === 1);
            this.currentNodeName = current ? current.nodeName : '';
            this.currentNodeCode = current ? current.node : '';
        },
        queryUser: debounce(300, async function(key, row) {
            try {
                if (!key) { return; }
                const { success, root } = await _commonUserSearch({ key });
                if (success) {
                    row.principal = (root || []).map(n => {
                        return {
                            name: [n.name, n.deptName].join('-'),
                            userId: n.id,
                            label: [n.name, n.deptName, n.email].join('-')
                        };
                    }).filter(item => item.userId !== this.userInfoVO.idStr);
                }
            } catch(error) {
                console.log(error);
            }
        }),
        async handleUserChange(val, row) {
            if(!row.isDetail) {
                if(val) {
                    const detailList = this.projectHandoverList.filter(t => t.isDetail && t.systemName === row.systemName);
                    detailList.forEach(t => {
                        t.principal = row.principal;
                        t.show = false;
                        this.$nextTick(() => {
                            t.principalUserId = val;
                            t.show = true;
                            this.handleUserChange(val, t);
                        });
                    });
                }
                return;
            }
            try {
                const { success, root } = await _principalSave({
                    userLeaveApproveDynamicConfigId: row.userLeaveApproveDynamicConfigId,
                    principalUserId: val
                });

                if (!success) {
                    row.principalUserId = '';
                }
            } catch (error) {
                console.log(error);
            }
        },
        // 提交前操作
        async beforeSubmit() {
            // 可以编辑 && 有可交接系统
            if (this.progressInfo.isLeaveModuleEditUser && this.projectHandoverList.length) {
                // 所有系统都选择的交接人
                let noUsers = this.projectHandoverList.filter(t => t.isDetail).some((item, index) => {
                    return !item.principalUserId;
                });

                // 第一个审批人，且节点是「逐级审批至CEO下一级」或「部门负责人」，才必填
                const secAudit = this.processList.length >= 2 && this.processList[this.processList.length - 2];
                if(!secAudit) return true;
                const isFirst = secAudit.approveName === this.$store.state.userInfo.name && ['逐级审批至CEO下一级', '部门负责人'].includes(this.currentNodeName);
                if (noUsers && isFirst) {
                    this.isDirty = true;
                    this.$toast('请为离职员工选择系统交接人', 'warning');
                    scrollToFormError(false,  '.system-handover');
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
    }
};
</script>