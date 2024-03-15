<template>
<div :class="['page-content', 'page-audit-detail', { 'has-operate': $route.query.type === 'operate' }]">
    <div class="page-audit-detail-inner-wrap">
        <div class="page-audit-detail-inner">
            <!-- 没有查看页面的权限 -->
            <template v-if="!dataPrivilege.viewPrivilege && privilegeLoaded && !isAdminDetail">
                <div class="not-permission__box">
                    <img src="@/assets/images/audit/not-permission.png" alt="">
                    <span>该流程因特殊原因已调整审批人，现无需您进行审批，请忽略</span>
                </div>
            </template>
            <template v-else-if="privilegeLoaded">
                <div class="audit-header">
                    <h2 class="audit-name">
                        {{ processName }}
                        <button v-if="showDownload" type="button" class="btn btn-primary btn-outline btn-small"
                            @click="downloadBill"
                        >
                            <i class="ui-icon-download"></i>下载交接单
                        </button>
                    </h2>
                    <!-- 审批进度 -->
                    <audit-progress v-if="showProgress || isAdminDetail" :list="currentAuditNode" />
                </div>
                <div class="audit-body">
                    <ui-pageloading v-if="isLoading"></ui-pageloading>
                    <!-- 动态展示组件内容 -->
                    <template v-if="!isLoading">
                        <component :is="currentComponent" ref="approvalDetail" 
                            :process-list="contractAuditProgress" :current-node="currentAuditNode" 
                            :data-privilege="dataPrivilege" :can-operate="canOperate" 
                            :current-operate-type="currentOperateType"
                            @showProgress="showProgress = true"
                        />
                        <!-- 审批流程 -->
                        <div v-if="showProgress|| isAdminDetail" class="audit-line__container">
                            <h2 class="title">审批流程</h2>
                            <approval-process :process-data="contractAuditProgress" />
                        </div>
                    </template>
                </div>
                <!-- 操作按钮区域 -->
                <div v-if="showOperateArea" class="operate-area__container">
                    <!-- 产检假按钮 -->
                    <template v-if="canOperate || showReturnBtn || showFetchBack">
                        <ul class="operate-area__list">
                            <li v-if="showFetchBack">
                                <button type="button" class="btn btn-primary" @click="fecthBackHandle">已{{ fecthBackTypeStr }}，取回（{{ gapTimeToFetchBackStr }}）</button>
                            </li>
                            <li v-if="showReturnBtn">
                                <button type="button" class="btn btn-primary" @click="requestAgain">重新发起</button>
                            </li>
                            <li v-if="nodePrivilege.showPass">
                                <button type="button" class="btn btn-primary" @click="handleAction('agree')">
                                    {{ isChanjianSender? '确认':'同意' }}
                                </button>
                            </li>
                            <li v-if="nodePrivilege.rejectBack">
                                <button type="button" class="btn btn-primary btn-outline" @click="handleAction('reject')">驳回</button>
                            </li>
                            <li v-if="nodePrivilege.returnPreReject">
                                <button type="button" class="btn btn-primary btn-outline" @click="handleAction('returnPreReject')">退回上一步</button>
                            </li>
                            <li v-if="nodePrivilege.returnReject">
                                <button type="button" class="btn btn-primary btn-outline" @click="handleAction('return')">退回到发起人</button>
                            </li>
                            <li v-if="nodePrivilege.consult">
                                <div v-if="askTip" class="ask-tip__container">
                                    <i class="ti-help-alt"></i>
                                    <span>对审批单有疑问？选择征询人，待征询人给出回复后，再做审批决定</span>
                                    <img class="ask-tip__close" src="@/assets/images/audit/close-icon.png" @click="closeAskTipAction" />
                                </div>
                                <button type="button" class="btn btn-primary btn-outline" @click="handleAction('ask')">征询</button>
                            </li>
                            <li v-if="nodePrivilege.canConsultReplyNode">
                                <button type="button" class="btn btn-primary" @click="handleAction('replyAsk')">回复征询</button>
                            </li>
                        </ul>
                    </template>
                    <div v-if="$route.query.type === 'operate'" class="operate-area-btn-warp">
                        <button v-show="showPreBtn" type="button" class="btn" @click="onNextProcess(-1, true)"><svg-icon class="arrow-left" icon-class="audit-arr-left"></svg-icon>上一页</button>
                        <button type="button" class="btn" @click="onNextProcess(1, true)">下一页<svg-icon class="arrow-right" icon-class="audit-arr-left"></svg-icon></button>
                    </div>
                </div>
            </template>
            <div>
                <!-- 意见内容弹窗 -->
                <ui-dialog v-model="suggestDialog" title="意见内容" prevent-layer
                    prevent-confirm class="reset-dialog audit-detail-dialog" @on-confirm="suggestConfirm"
                >
                    <template v-if="suggestDialog" slot="content">
                        <ui-form ref="suggestForm" :model="suggestForm">
                            <form-item prop="auditComment" :rules="[{ max: 200, validator: validateSuggest, trigger: 'change' }]" :required="['reject', 'return'].indexOf(currentOperateType) > -1">
                                <ui-input v-model.trim="suggestForm.auditComment" :rows="5" :counter="true"
                                    :maxlength="200" type="textarea" aria-placeholder="200字符以内"
                                ></ui-input>
                            </form-item>
                            <form-item v-if="suggestTips" class="audit-detail-suggest-tips">
                                <p>{{ suggestTips }}</p>
                            </form-item>
                        </ui-form>
                    </template>
                </ui-dialog>
                <!-- 征询弹窗 -->
                <ui-dialog v-model="askDialog" title="征询" prevent-layer
                    prevent-confirm class="reset-dialog audit-detail-dialog" @on-confirm="askConfirm"
                >
                    <template v-if="askDialog" slot="content">
                        <ui-form ref="askForm" :model="askForm" :rules="askRules">
                            <form-item prop="consultUserEmail">
                                <ui-select
                                    v-model="askForm.consultUserEmail"
                                    filterable clearable placeholder="请输入要征询的人"
                                    @on-query-change="queryUser"
                                >
                                    <ui-option v-for="(item, key) in userList" :key="key"
                                        :label="item.name" :value="item.value"
                                    >{{ item.label }}</ui-option>
                                </ui-select>
                            </form-item>
                            <form-item prop="auditComment">
                                <ui-input v-model.trim="askForm.auditComment" :rows="5" :counter="true"
                                    :maxlength="200" type="textarea" aria-placeholder="200字符以内"
                                ></ui-input>
                            </form-item>
                        </ui-form>
                    </template>
                </ui-dialog>
                <!-- 回复征询弹窗 -->
                <ui-dialog v-model="replyAskDialog" title="回复征询" prevent-layer
                    prevent-confirm class="reset-dialog audit-detail-dialog" @on-confirm="replyAskConfirm"
                >
                    <template v-if="replyAskDialog" slot="content">
                        <ui-form ref="replyAskForm" :model="replyAskForm" :rules="replyAskRules">
                            <form-item prop="auditComment">
                                <ui-input v-model.trim="replyAskForm.auditComment" :rows="5" :counter="true"
                                    :maxlength="200" type="textarea" aria-placeholder="200字符以内"
                                ></ui-input>
                            </form-item>
                        </ui-form>
                    </template>
                </ui-dialog>
                <!-- 续签弹窗 -->
                <renew-dialog ref="renewDialog" :audit-data="currentContract" @on-confirm="onRenewSubmit"></renew-dialog>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import AuditProgress from './components/audit-progress';
import ApprovalProcess from '../../components/approval-process';
import { _searchInfo } from '@/services/dashboard/meeting';
import {
    _nodePrivilege,
    _contractConsult,
    _contractReplyConsult,
    _progressApprove,
    _progressConsult,
    _changeConsult,
    _leaveConsult,
    _replyConsultOffer,
    _progressReplyConsult,
    _interviewConsult,
    _consultOffer,
    _entryConsult,
    _contractAuditProgress,
    _contractCurrentAudit,
    _dataPrivilege,
    _getPageTurnList,
    _batchSeqconsult,
    _batchUserconsult,
    _getProcessInstanceInfo,
    _approveTips,
    _auditFetchBack
} from '@/services/dashboard/audit';
import storage from '@/utils/localstorage';
import * as RenewComps from './approval-component/index.js';
import { COMP_MAP, APPROVE_RESULT_MAP } from '../model/data';
import { mapActions } from 'vuex';
import RenewDialog from '../renew-component/renew-dialog';
import { getNodeType } from './approval-component/leave-approval/config';


let timeout = null;
const currentOperateTypeMap = {
    agree: 1,   // 同意
    reject: 2,  // 驳回
    return: 4,   // 退回到发起人
    returnPreReject: 5
};
export default {
    name: 'PageAuditDetail',
    components: {
        AuditProgress,
        ApprovalProcess,
        RenewDialog,
        ...RenewComps
    },
    computed: {
        // 是否是产检假-发起人节点，显示同意按钮上传附件
        isChanjianSender() {
            // 目前只有产检假有 “发起人” 节点
            return /** this.progressInfo.leaveType === 6 && **/ this.currentAuditNode?.[0]?.nodeName === '发起人' && this.$route.query.type === 'operate';
        },
        showOperateArea() {
            const typeKeys = [
                'showPass', 'rejectBack', 'returnReject', 'consult', 'canConsultReplyNode', 'returnPreReject', 'fetchBack'
            ];
            const hasType = typeKeys.map(t => this.nodePrivilege[t]).some(Boolean);
            return this.showFetchBack || this.showReturnBtn || (this.canOperate && hasType) || this.$route.query.type === 'operate';
        },
        // 是否显示操作区域
        canOperate() {
            // 重新发起
            // 从审批入口点击进入
            // 当前登录用户有操作权限
            // 当前节点具有操作权限
            const { type } = this.$route.query;
            const { operatePrivilege } = this.dataPrivilege;
            return type === 'operate' && operatePrivilege && Object.values(this.nodePrivilege).some(ele => !!ele);
        },
        showReturnBtn() {
            return this.$route.query.tabType === 'myApproval' 
                && this.$route.query.type === 'look' 
                && APPROVE_RESULT_MAP.returnOriginator.indexOf(this.currentAuditNode?.[0]?.nodeName) > -1 
                && COMP_MAP[this.processTypeCode] 
                && COMP_MAP[this.processTypeCode].listRenew;
        },
        showFetchBack() {
            return this.$route.query.tabType === 'approved' && !!this.nodePrivilege.fetchBack && this.gapTimeToFetchBack > 0;
        },
        fecthBackTypeStr() {
            const refecthMap = {
                1: '通过',
                2: '驳回',
                5: '退回'
            };
            return refecthMap[this.nodePrivilege?.backOperateRecordVO?.opType];
        },
        gapTimeToFetchBackStr() {
            if(this.gapTimeToFetchBack === 0) return 0;
            if(this.gapTimeToFetchBack > 60) return `${Math.floor(this.gapTimeToFetchBack/60)}分${this.gapTimeToFetchBack%60}秒`;
            return `${this.gapTimeToFetchBack}秒`;
        },
        // 当前组件
        currentComponent() {
            // 根据组件类型加载组件
            const componentType = this.processTypeCode ? (COMP_MAP[this.processTypeCode] || {}).detailRenew : '';
            // const componentType = 'employ-approval';
            return componentType;
        },
        processId() {
            return this.$route.query.processId || '';
        },
        tabType() {
            return this.$route.query.tabType || '';
        },
        searchQuery() {
            return this.$route.query.searchQuery || '';
        },
        startTime() {
            return this.$route.query.startTime || '';
        },
        endTime() {
            return this.$route.query.endTime || '';
        },
        processType() {
            return this.$route.query.processType || '';
        },
        emailType() {
            return this.$route.query.emailType || '';
        },
        processTypeCode() {
            return this.processId ? this.processId.substr(0, 9) : '';
        },
        processTypeName() {
            return this.$route.query.processTypeName || '';
        },
        // 是否显示下载交接单
        showDownload() {
            if(this.processTypeCode !== 'SJT010009') return false;
            const list = this.contractAuditProgress || [];
            const myName = this.$store.state.userInfo.name;
            const curr = list.filter(t => t.currentAudit!==2 && (t.approveName === myName || t.approveUserVOList?.find(t => t.approveName === myName)));
            return curr.some(node => ['离职证明开具', '证明开具'].includes(node.nodeName));
        },
        isAdminDetail() {
            return this.$route.path.match('process-detail-admin');
        }
    },
    data() {
        return {
            showProgress: false,
            // 存放详情信息
            applyDetail: {},
            currentOperateType: '',
            suggestDialog: false,
            suggestForm: {
                auditComment: ''
            },
            askDialog: false,
            askForm: {
                consultUserEmail: '', // 被征询人的邮箱
                auditComment: '' // 征询意见
            },
            replyAskDialog: false,
            replyAskForm: {
                auditComment: '' // 征询意见
            },
            askRules: {
                consultUserEmail: [{ required: true, message: '请选择需要向谁征询', trigger: 'change' }],
                auditComment: [
                    { required: true, message: '请填写征询内容', trigger: 'change' },
                    { required: true, message: '请填写征询内容', trigger: 'blur' },
                    { max: 200, trigger: 'change' }
                ]
            },
            replyAskRules: {
                auditComment: [
                    { required: true, message: '请填写回复内容', trigger: 'change' },
                    { required: true, message: '请填写回复内容', trigger: 'blur' },
                    { max: 200, trigger: 'change' }
                ]
            },
            // 征询提示语
            askTip: true,
            // 页面权限
            dataPrivilege: {
                userEmail: '', //操作人（点击查看详情页的人）
                viewPrivilege: false, //是否有查看权限
                operatePrivilege: false //是否有操作权限
            },
            privilegeLoaded: true,
            // 征询人员列表
            userList: [],
            // 审批节点权限
            nodePrivilege: {},
            // 审批流程
            contractAuditProgress: [],
            // 当前审批节点进度信息
            currentAuditNode: [],
            // 是否提交中
            submitting: false,
            // 弹窗出现时 所选中的合同对象
            currentContract: {},                
            isLoading: false,
            processInfo: {},
            showPreBtn: true,
            processName: '',    // 当前流程名称
            suggestTips: '',     // 建议提示文案
            gapTimeToFetchBack: 0 // 取回倒计时
        };
    },
    watch: {
        '$route.query'() {
            this.pageInit();
        }
    },
    created() {
        this.pageInit();
    },
    methods: {
        // 重新发起
        requestAgain() {
            this.currentContract = {
                processInstanceId: this.processId,
                processTypeCode: this.processTypeCode
            };
            // this.$refs.approvalDetail?.progressInfo || {};
            this.$nextTick(() => {
                this.$refs.renewDialog.open();
            });
        },
        /**
         * @description 续签弹窗提交方法 如果需要跟弹窗通信 则在子组件中调用此方法
         * @param {Object} data 续签弹窗返回的数据
         */
        onRenewSubmit(data) {
            // 每种弹窗 可以根据 data里的参数 或者renewCompInfo.listRenew 做组件区分
            // if (this.renewCompInfo.listRenew === 'CommonRenew') {}
            // this.onSearch(this.pageData.current);
            this.pageInit();
        },
        pageInit() {
            this.makeBackFn();
            // 判断是否已经点击关闭过征询提示语
            const closeAskTip = storage.get('noah__closeAskTip');
            this.askTip = !closeAskTip;
            this.initData();
            this.getProcessName();
        },
        async getProcessName() {
            try {
                const params = {
                    processInstanceId: this.processId
                };
                if(this.$route.query.module) {
                    params.module = this.$route.query.module;
                }
                const { success, root } = await _getProcessInstanceInfo(params);
                if(!success && !root) return;
                this.processName = root.processName;
            } catch (error) {
                console.log(error);
            }
        },
        // 从邮件点击查看审批的自定义返回按钮的操作
        makeBackFn() {
            const { emailType } = this.$route.query;
            emailType && (this.$route.meta.backFn = () => {
                switch(emailType) {
                    case 'auditIng': // 待审批
                        this.$router.replace({ path: '/dashboard/audit/audit-center/list?tabType=pending' });
                        break;
                    case 'auditReturn': // 审批退回到发起人
                        this.$router.replace({ path: '/dashboard/audit/audit-center/list?tabType=myApproval' });
                        break;
                    case 'consult': // 征询
                        this.$router.replace({ path: '/dashboard/audit/audit-center/list?tabType=pending' });
                        break;
                    case 'auditPass': // 审批通过
                        this.$router.replace({ path: '/dashboard/audit/audit-center/list?tabType=myApproval' });
                        break;
                    case 'view':      // 查阅人打开
                        this.$router.replace({ path: '/dashboard/audit/audit-center/list?tabType=refer' });
                        break;
                    case 'approved': // 已审批
                        this.$router.replace({ path: '/dashboard/audit/audit-center/list?tabType=approved' });
                        break;
                    default:
                        this.$router.replace({ path: '/dashboard/audit/audit-center/list' });
                }
            });
        },
        // 下载交接单
        downloadBill() {
            window.open(`/api/user/leave/handoverOrder/download.json?processInstanceId=${this.processId}`);
        },
        // 初始化页面数据
        async initData() {
            this.isLoading = true;
            !this.isAdminDetail && await this.getDataPrivilege();

            // 没有查看页面的权限
            if(!this.dataPrivilege.viewPrivilege && !this.isAdminDetail) return;
            this.getContractAuditProgress();
            this.getCurrentAuditNode();
            // 获取审批节点权限
            const isOperate = this.$route.query.type === 'operate';
            /**
             * 取回按钮、CEO才有、在已审批
             */
            const isApproved = this.$route.query.tabType === 'approved';
            if((isOperate && this.dataPrivilege.operatePrivilege || isApproved) ) {
                await this.getNodePrivilege();

                if(isApproved && this.nodePrivilege.fetchBack && this.nodePrivilege.gapTimeToFetchBack) {
                    this.gapTimeToFetchBack = this.nodePrivilege.gapTimeToFetchBack - 5;
                    if( this.gapTimeToFetchBack > 5) {
                        const interval = setInterval(() => {
                            this.gapTimeToFetchBack--;
                            if(!this.gapTimeToFetchBack) {
                                clearInterval(interval);
                            }
                        }, 1 * 1000);
                    }
                    
                }
            }
        },
        // 获取页面操作权限
        async getDataPrivilege () {
            this.privilegeLoaded = false;
            try {
                const params = {
                    processInstanceId: this.processId
                };
                if(this.$route.query.module) {
                    params.module = this.$route.query.module;
                }
                const { root } = await _dataPrivilege(params);
                this.dataPrivilege = root || {};
            } finally {
                this.privilegeLoaded = true;
            }
        },
        // 获取审批流程信息
        async getCurrentAuditNode() {
            try {
                const { success, root } = await _contractCurrentAudit({
                    processInstanceId: this.processId
                });
                this.isLoading = false;
                if(!success) return;
                this.currentAuditNode = root && root.data ? root.data : [];
            } catch (error) {
                console.log(error);
            }
            
        },
        // 获取审批流程信息
        async getContractAuditProgress() {
            try {
                const { success, root } = await _contractAuditProgress({
                    processInstanceId: this.processId,
                    tabType: this.tabType,
                    containOverViewNode: true
                });
                if(!success) return;
                this.contractAuditProgress = root || [];
                // this.showProgress = true;

                if(!['SJT010009'].includes(this.processTypeCode)) {
                    this.showProgress = true;
                }

            } catch (error) {
                console.log(error);
            }
            
        },
        // 获取审批节点权限
        async getNodePrivilege() {
            try {
                const params = {
                    processInstanceId: this.processId
                };
                if(this.$route.query.module) {
                    params.module = this.$route.query.module;
                }
                const { success, root } = await _nodePrivilege(params);
                if(!success) return;
                this.nodePrivilege = root || {};
                // Object.assign(this.nodePrivilege, root || {});
            } catch (error) {
                console.log(error);
            }
           
        },
        async handleAction(operateType) {
            this.currentOperateType = operateType;
            this.suggestTips = '';
            switch(operateType) {
                case 'agree':
                    Object.keys(this.suggestForm).forEach(k => {
                        this.suggestForm[k] = '';
                    });
                    const comp = this.$refs.approvalDetail;
                    if (comp && comp.beforeSubmit) {
                        let valid = await comp.beforeSubmit();
                        if (!valid) { return; }
                    }
                    await this.beforeAgreeDialogShow();
                    // TODO 确认按钮需不需要
                    if(this.isChanjianSender) {
                        this.suggestConfirm(false);
                    } else {
                        this.suggestDialog = true;
                    }
                    break;
                case 'reject':
                    Object.keys(this.suggestForm).forEach(k => {
                        this.suggestForm[k] = '';
                    });
                    this.suggestDialog = true;
                    break;
                case 'return':
                    Object.keys(this.suggestForm).forEach(k => {
                        this.suggestForm[k] = '';
                    });
                    this.suggestDialog = true;
                    break;
                case 'ask':
                    Object.keys(this.askForm).forEach(k => {
                        this.askForm[k] = '';
                    });
                    this.askDialog = true;
                    break;
                case 'replyAsk':
                    Object.keys(this.replyAskForm).forEach(k => {
                        this.replyAskForm[k] = '';
                    });
                    this.replyAskDialog = true;
                    break;
                case 'returnPreReject':
                    Object.keys(this.suggestForm).forEach(k => {
                        this.suggestForm[k] = '';
                    });
                    this.suggestDialog = true;
                    break;
            }
        },
        async beforeAgreeDialogShow() {
            // 考勤审批流需要添加提示
            try {
                if (this.isLoading) return;
                // this.isLoading = true;
                let billType = (COMP_MAP[this.processTypeCode] || {}).billType;
                if (billType !== 'apply') return;
                const {success, root} = await _approveTips({
                    billType,
                    processInstanceId: this.processId
                });
                if (!success) return;
                this.suggestTips = root?.tips || '';
            } catch (error) {
                console.log(error);
            } finally {
                // this.isLoading = false;
            }
            
        },
        async fecthBackHandle() {
            this.$dialog({
                title: '温馨提示',
                type: 'warning',
                content: '请确认是否执行取回操作？',
                wrapClass: 'dialog-primary-default',
                onConfirm: async _ => {
                    handle.call(this);
                }
            });

            async function handle() {
                const query = this.$route.query;
                try {
                    const { success, root } = await _auditFetchBack({
                        processInstanceId: this.processId
                    });
                    if(success) {
                        this.$toast('操作成功','success');
                        setTimeout(() => {
                            const params = Object.assign(query, {
                                tabType: 'pending',
                                type: 'operate'
                            });
                            const path = '/dashboard/audit/audit-center/detail?' + Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
                            this.$router.replace(path);
                            window.history.replaceState(null, null, path);
                            this.pageInit();
                        }, 1500);
                    }
                } catch (error) {
                    
                }
            };
            
            

        },
        // 关闭征询提示框
        closeAskTipAction() {
            this.askTip = false;
            // 记录已关闭状态
            storage.set('noah__closeAskTip', true);
        },
        // 意见内容校验规则
        validateSuggest(rule, value, callback) {
            // 退回到发起人、驳回时意见内容为必填
            if(['reject', 'return', 'returnPreReject'].indexOf(this.currentOperateType) > -1 && !value) {
                callback(new Error('请填写意见'));
            } else {
                callback();
            }
        },
        // 确认同意、驳回、退回到发起人
        async suggestConfirm(needValidate = true) {
            const handle = async () => {
                if(this.submitting) return;
                this.submitting = true;
                try {
                    const params = {
                        ...this.suggestForm,
                        processInstanceId: this.processId,
                        billType: (COMP_MAP[this.processTypeCode] || {}).billType,
                        approveAction: currentOperateTypeMap[this.currentOperateType]
                    };
                    const comp = this.$refs.approvalDetail;
                    // vpn审批需要追加是否调整使用期限的字段
                    if (this.currentOperateType === 'agree' && comp && comp.beforeAgree) {
                        let result = await comp.beforeAgree();
                        if (result) { 
                            params.remark = result?.postData?.remark || {};
                        }else {
                            return;
                        }
                    };
    
                    let result = null;
                    await this.getNextProcessInfo();
                    result = await _progressApprove(params);
                    const { success } = result || {};
                    if(!success) return;
                    this.$toast('审批成功，自动跳转下一条审批', 'success');
                    // this.initData();
                    this.suggestDialog = false;
                    this.suggestTips = '';
                    this.onNextProcess(1);
                } finally {
                    this.submitting = false;
                }
            };
            if(needValidate) {
                this.$refs.suggestForm.validate(async valid => {
                    if(!valid) return;
                    handle();
                });
            } else {
                handle();
            }

            
        },
        async getNextProcessInfo() {
            try {
                const {endTime, processId, processType, searchQuery, startTime, emailType, tabType} = this;
                const {success, root} = await _getPageTurnList({
                    endTime,
                    processInstanceId: processId,
                    processType,
                    searchQuery,
                    startTime
                });
                if (success && root) {
                    this.processInfo = root;
                } else {
                    this.processInfo = {};
                };
            } catch (error) {
                this.processInfo = {};
                console.log(error);
            }
        },
        async onNextProcess(type, init) {
            try {
                const {endTime, processType, searchQuery, startTime, emailType, tabType} = this;
                if (init) {
                    await this.getNextProcessInfo();
                }

                if (type === -1 && !this.processInfo.previousProcessInstanceId) {
                    this.$toast('当前已是第一个审批', 'success');
                    !init && this.initData();
                    return;
                } else if (type === 1 && !this.processInfo.nextProcessInstanceId) {
                    if (this.canOperate) {
                        this.$toast('当前已是最后一个审批', 'success');
                    } else {
                        this.$toast('已全部审批完', 'success');
                    }

                    if (!init) {
                        this.initData();
                        this.showPreBtn = false;
                    }
                    return;
                }
                
                let processId = type === -1 ? this.processInfo.previousProcessInstanceId : this.processInfo.nextProcessInstanceId;
                let processTypeCode = type === -1 ? this.processInfo.previousProcessTypeCode : this.processInfo.nextProcessTypeCode;
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        type: 'operate',
                        processId,
                        processTypeCode,
                        tabType,
                        processType,
                        searchQuery,
                        startTime,
                        endTime,
                        emailType
                    }
                });
                this.showPreBtn = true;
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
        // 确认征询
        askConfirm() {
            this.$refs.askForm.validate(async valid => {
                if(!valid) return;
                if(this.submitting) return;
                this.submitting = true;
                try {
                    const params = {
                        ...this.askForm,
                        processInstanceId: this.processId
                    };
                    // let result = null;
                    await this.getNextProcessInfo();
                    let result = await _progressConsult(params);
                    const { success } = result || {};
                    if(!success) return;
                    this.$toast('征询成功，自动跳转下一条审批', 'success');
                    // this.initData();
                    this.askDialog = false;
                    this.onNextProcess(1);
                } finally {
                    this.submitting = false;
                }
            });
        },
        // 确认回复征询
        replyAskConfirm() {
            this.$refs.replyAskForm.validate(async valid => {
                if(!valid) return;
                if(this.submitting) return;
                this.submitting = true;
                try {
                    const params = {
                        ...this.replyAskForm,
                        processInstanceId: this.processId
                    };
                   
                    await this.getNextProcessInfo();
                    let result = await _progressReplyConsult(params);
                    // switch(this.processTypeCode) {
                    //     case 'SJT010005':
                    //         // 合同续签
                    //         params.approveStatus = 1; // 审批通过
                    //         result = await _contractReplyConsult(params);
                    //         break;
                    //     case 'SJT010001':
                    //         // offer审批流
                    //         const offerParams = {
                    //             processInstanceId: this.processId,
                    //             comment: this.replyAskForm.auditComment
                    //         };
                    //         result = await _replyConsultOffer(offerParams);
                    //         break;
                    //     default:
                    //         result = await _progressReplyConsult(params);
                    //         break;
                    // }
                    const { success } = result || {};
                    if(!success) return;
                    this.$toast('回复成功，自动跳转下一条审批', 'success');
                    // this.initData();
                    this.replyAskDialog = false;
                    this.onNextProcess(1);
                } finally {
                    this.submitting = false;
                }
            });
        },
        // 查询征询人
        queryUser(key) {
            clearTimeout( timeout );
            timeout = setTimeout(async () => {
                try {
                    const { root } = await _searchInfo({ key });
                    this.userList = (root || []).map(n => {
                        return {
                            name: n.name,
                            label: `${n.name || '-'}<${n.email || '-'}>`,
                            value: n.email
                        };
                    });
                } catch {}
            }, 500);
        }
    }
};
</script>