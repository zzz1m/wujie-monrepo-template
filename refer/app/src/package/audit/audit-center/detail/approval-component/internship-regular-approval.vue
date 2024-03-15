<template>
<div class="leave-approval__module">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.userName')]">
                <span>姓名</span>
                <div>
                    <talentIcon :id="userInternshipDetailVO.userId" :name="userInternshipDetailVO.userName" :blank="true" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.userNumber')]">
                <span>员工编号</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.userNumber" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'internshipDeptName')]">
                <span>部门</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipDeptName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipPosition')]">
                <span>岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipPosition" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipReporterName')]">
                <span>汇报人</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipReporterName" />
                </div>
            </li>

            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipManageSeqStr')]">
                <span>管理序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipManageSeqStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipManageSeqLevelStr')]">
                <span>管理职级</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipManageSeqLevelStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipManageSeqSubStr')]">
                <span>管理子序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipManageSeqSubStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipManageStdPositionStr')]">
                <span>管理标准岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipManageStdPositionStr" />
                </div>
            </li>

            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipSeqStr')]">
                <span>专业序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipSeqStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipSeqLevelStr')]">
                <span>专业职级</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipSeqLevelStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipSeqSubStr')]">
                <span>专业子序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipSeqSubStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.internshipStdPositionStr')]">
                <span>专业标准岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.internshipStdPositionStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.workplaceStr')]">
                <span>工作地点</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.workplaceStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.isTl')]">
                <span>是否部门负责人</span>
                <div>{{ translateBoolLabel(userInternshipDetailVO.isTl) }}</div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <h2 class="title">表单信息</h2>
        <!-- 异动信息 -->
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="icon-transaction" class="icon" />实习转正式信息
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'userInternshipDetailVO.formalDate')]">
                    <span>转正式日期</span>
                    <div>{{ userInternshipDetailVO.formalDate ? $dayjs(userInternshipDetailVO.formalDate).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalDeptStr')">
                    <span>转正式部门</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalDeptStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalPosition')">
                    <span>转正式岗位</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalPosition" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalReporterName')">
                    <span>转正式汇报人</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalReporterName" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalReporterName2')">
                    <span>转正式汇报人2</span>
                    <div>
                        <nari-tooltip :value="userInternshipDetailVO.formalReporterName2" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalManageSeqStr')">
                    <span>转正式管理序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalManageSeqStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalManageSeqLevelStr')">
                    <span>转正式管理职级</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalManageSeqLevelStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalManageSeqSubStr')">
                    <span>转正式管理子序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalManageSeqSubStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalManageStdPositionStr')">
                    <span>转正式管理标准岗位</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalManageStdPositionStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalSeqStr')">
                    <span>转正式专业序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalSeqStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalSeqLevelStr')">
                    <span>转正式专业职级</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalSeqLevelStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalSeqSubStr')">
                    <span>转正式专业子序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalSeqSubStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.formalStdPositionStr')">
                    <span>转正式专业标准岗位</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.formalStdPositionStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.probationStr')">
                    <span>试用期限</span>
                    <div> 
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.probationStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInternshipDetailVO.shouldPositiveTime')">
                    <span>应转正日期</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInternshipDetailVO.shouldPositiveTime" />
                    </div>
                </li>
                <li :class="['full-row', highlightClass(progressInfo, 'offerInfoVO')]">
                    <span>关联正式offer</span>
                    <div>{{ offerInfoVO.processInstanceId ? `${offerInfoVO.processInstanceId}-${offerInfoVO.submitName}提交的${offerInfoVO.name}的offer审批` : '' }}</div>
                </li>
                <li :class="['full-row', highlightClass(progressInfo, 'userInternshipDetailVO.formalExplain')]">
                    <span>转正式说明</span>
                    <div>{{ userInternshipDetailVO.formalExplain || '-' }}</div>
                </li>
            </ul>
        </div>
        <!-- 合同信息 -->
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="icon-contract" class="icon" />合同信息
            </h2>
            <ul class="approval-component__list">
                <li :class="highlightClass(progressInfo, 'userInfoContractVO.signTypeStr')">
                    <span>签订类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoContractVO.signTypeStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInfoContractVO.contractTypeStr')">
                    <span>合同类型</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoContractVO.contractTypeStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInfoContractVO.contractSubjectStr')">
                    <span>合同主体</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoContractVO.contractSubjectStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInfoContractVO.durationStr')">
                    <span>合同期限</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoContractVO.durationStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInfoContractVO.startDate')">
                    <span>合同开始日期</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoContractVO.startDate" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'userInfoContractVO.endDate')">
                    <span>合同结束日期</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="userInfoContractVO.endDate" />
                    </div>
                </li>
                <li :class="['full-row', highlightClass(progressInfo, 'userInfoContractVO.description')]">
                    <span>合同续签说明</span>
                    <div>{{ userInfoContractVO.description || '-' }}</div>
                </li>
            </ul>
        </div>
        <!-- 其他信息 -->
        <div class="approval-component__inner">
            <h2 class="title">
                <img src="@/assets/images/offer/other.png" alt="" />其它信息
            </h2>
            <ul class="approval-component__list">
                <li :class="['full-row', highlightClass(progressInfo, 'other.eduAttachment')]">
                    <span>学历认证</span>
                    <div>
                        <ul v-if="educationAnnexeList.length" class="download-list">
                            <li v-for="(item, index) in educationAnnexeList" :key="index" :class="[{ 'can-download': true }]">
                                <em class="file-name" @click="previewAction(item)"><nari-tooltip :value="item.fileName" /></em>
                                <i class="ui-icon-view btn-look" @click="previewAction(item)"></i>
                                <i class="ui-icon-download btn-download"
                                    @click.stop="downloadAction(item)"
                                ></i>
                            </li>
                        </ul>
                        <span v-else></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import { mapState } from 'vuex';
import { _getAuditNodeStatusByProcessInstanceId } from '@/services/dashboard/audit';
import talentIcon from '@/components/talent-entry-icon/index.vue';
import { downLoad } from '@/utils/util.js';
// 处理附件信息
const dealFile = (listStr = '') => {
    return (listStr || '').split(',').filter(item => item).map(ele => {
        const infoArr = (ele || '').split('||');
        return {
            fileName: infoArr[0],
            url: infoArr[1] ? `${window.location.origin}/api/common/file/download${infoArr[1]}` : ''
        };
    });
};

export default {
    name: 'ChangeApproval',
    mixins: [commonMixin],
    components: {
        talentIcon
    },
    computed: {
        ...mapState(['userInfo']),
        processId() {
            return this.$route.query.processId;
        },
        userInternshipDetailVO() {
            return this.progressInfo.userInternshipDetailVO || {};
        },
        userInfoContractVO() {
            return this.progressInfo.userInfoContractVO || {};
        },
        otherVo() {
            return this.progressInfo.other || {};
        },
        offerInfoVO() {
            return this.progressInfo.offerInfoVO || {};
        },
        educationAnnexeList() {
            const { eduAttachment } = this.otherVo;
            return dealFile(eduAttachment || '');
        }
    },
    data() {
        return {
            progressInfo: {}
        };
    },
    created() {
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
        // 在线预览
        previewAction(info) {
            downLoad(`/api/common/file/preview.json?ossPath=${info.url.replace(/http.*(review|download)\//, '')}`, null, '_blank');
        },
        // 下载
        downloadAction(info) {
            downLoad(info.url);
        }
    }
};
</script>