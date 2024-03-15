<template>
<div class="change-approval-container">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'name')]">
                <span>姓名</span>
                <div>
                    <talentIcon :id="progressInfo.encryptUserId" :name="progressInfo.name" :blank="true" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'number')]">
                <span>员工编号</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.number" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeDeptName')]">
                <span>部门</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeDeptName" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforePosition')]">
                <span>岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforePosition" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeReporterName')]">
                <span>汇报人</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeReporterName" />
                </div>
            </li>

            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeManageSeqStr')]">
                <span>管理序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeManageSeqStr" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeManageSeqLevelStr')]">
                <span>管理职级</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeManageSeqLevelStr" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeManageSeqSubStr')]">
                <span>管理子序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeManageSeqSubStr" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeManageStdPositionStr')]">
                <span>管理标准岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeManageStdPositionStr" />
                </div>
            </li>

            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeSeqStr')]">
                <span>专业序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeSeqStr" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeSeqLevelStr')]">
                <span>专业职级</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeSeqLevelStr" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeSeqSubStr')]">
                <span>专业子序列</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeSeqSubStr" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeStdPositionStr')]">
                <span>专业标准岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeStdPositionStr" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'beforeWorkplaceStr')]">
                <span>工作地点</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.beforeWorkplaceStr" />
                </div>
            </li>
            <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'isTl')]">
                <span>是否部门负责人</span>
                <div>{{ translateBoolLabel(progressInfo.isTl) }}</div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <h2 class="title">表单信息</h2>
        <!-- 异动信息 -->
        <div class="approval-component__inner">
            <h2 class="title">
                <svg-icon icon-class="icon-transaction" class="icon" />异动信息
            </h2>
            <ul class="approval-component__list">
                <li :class="[highlightClass(progressInfo, 'effectDateStr')]">
                    <span>异动生效日期</span>
                    <div>{{ progressInfo.effectDateStr ? $dayjs(progressInfo.effectDateStr).format('YYYY-MM-DD') : '-' }}</div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterDeptName')">
                    <span>异动后部门</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterDeptName" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterPosition')">
                    <span>异动后岗位</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterPosition" />
                    </div>
                </li>
                <li v-if="!['businessOD'].includes(operateNode)" :class="highlightClass(progressInfo, 'afterReporterName')">
                    <span>异动后汇报人</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterReporterName" />
                    </div>
                </li>
                <li v-if="!['businessOD'].includes(operateNode)" :class="highlightClass(progressInfo, 'afterReporterName2')">
                    <span>异动后汇报人2</span>
                    <div>
                        <nari-tooltip :value="progressInfo.afterReporterName2" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterManageSeqStr')">
                    <span>异动后管理序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterManageSeqStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterManageSeqLevelStr')">
                    <span>异动后管理职级</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterManageSeqLevelStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterManageSeqSubStr')">
                    <span>异动后管理子序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterManageSeqSubStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterManageStdPositionStr')">
                    <span>异动后管理标准岗位</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterManageStdPositionStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterSeqStr')">
                    <span>异动后专业序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterSeqStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterSeqLevelStr')">
                    <span>异动后专业职级</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterSeqLevelStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterSeqSubStr')">
                    <span>异动后专业子序列</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterSeqSubStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'afterStdPositionStr')">
                    <span>异动后专业标准岗位</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterStdPositionStr" />
                    </div>
                </li>
                <li v-if="!['businessOD'].includes(operateNode)" :class="highlightClass(progressInfo, 'afterWorkplaceStr')">
                    <span>异动后工作地点</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.afterWorkplaceStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'changeTypeStr')">
                    <span>异动类型</span>
                    <div v-if="canOperate && progressInfo.isBusiness && ['businessHR'].includes(operateNode)">
                        <ui-select v-model="changeType"
                            placeholder="请选择异动类型" collapse-tags multiple-tags-disabled
                            transfer multiple
                        >
                            <template>
                                <ui-option v-for="item in dictInfo.change_type" :key="item.dictCode" class="change-approval-option"
                                    :disabled="item.remark === 'notBusiness'" :value="item.dictCode"
                                >{{ item.dictName }}</ui-option>
                            </template>
                        </ui-select>
                    </div>
                    <div v-else>
                        <nari-tooltip :show-tip="false" :value="progressInfo.changeTypeStr" />
                    </div>
                </li>
                <li :class="highlightClass(progressInfo, 'changeForStr')">
                    <span>异动变化</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.changeForStr" />
                    </div>
                </li>
                <li v-if="!['businessOD'].includes(operateNode)" :class="['full-row', highlightClass(progressInfo, 'remark')]">
                    <span>异动说明</span>
                    <div>{{ progressInfo.remark || '-' }}</div>
                </li>
                <li v-if="!['businessOD'].includes(operateNode)" :class="[highlightClass(progressInfo, 'isProbation')]">
                    <span>是否设置见习期</span>
                    <div>{{ translateBoolLabel(progressInfo.isProbation) }}</div>
                </li>
                <template v-if="!['businessOD'].includes(operateNode) && [1, '1', true].indexOf(progressInfo.isProbation) > -1">
                    <li :class="[highlightClass(progressInfo, 'probationDuration')]">
                        <span>见习期限（月）</span>
                        <div>{{ progressInfo.probationDuration || '-' }}</div>
                    </li>
                    <li :class="[highlightClass(progressInfo, 'probationStartDateStr')]">
                        <span>见习开始日期</span>
                        <div>{{ progressInfo.probationStartDateStr ? $dayjs(progressInfo.probationStartDateStr).format('YYYY-MM-DD') : '-' }}</div>
                    </li>
                    <li :class="[highlightClass(progressInfo, 'probationEndDateStr')]">
                        <span>见习应结束日期</span>
                        <div>{{ progressInfo.probationEndDateStr ? $dayjs(progressInfo.probationEndDateStr).format('YYYY-MM-DD') : '-' }}</div>
                    </li>
                    <li :class="[highlightClass(progressInfo, 'probationPosition')]">
                        <span>见习岗位</span>
                        <div>
                            <nari-tooltip :show-tip="false" :value="progressInfo.probationPosition" />
                        </div>
                    </li>
                    <li :class="['full-row', highlightClass(progressInfo, 'probationRemark')]">
                        <span>特殊情况说明</span>
                        <div>{{ progressInfo.probationRemark || '-' }}</div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import { mapState } from 'vuex';
import { _getAuditNodeStatusByProcessInstanceId, _editChangeType } from '@/services/dashboard/audit';
import { _batchGetDictInfo } from '@/services/dashboard/common';
import talentIcon from '@/components/talent-entry-icon/index.vue';

export default {
    name: 'ChangeApproval',
    props: {
        canOperate: Boolean
    },
    mixins: [commonMixin],
    components: {
        talentIcon
    },
    computed: {
        ...mapState(['userInfo']),
        processId() {
            return this.$route.query.processId;
        },
        // 据BPM传给Noah的审批节点名称，判断字段是否可见
        operateNode() {
            let role = '';
            // 判断是不是商业OD节点  商业od字段权限 https://wiki.kanzhun-inc.com/pages/viewpage.action?pageId=133873608
            if (['商业OD', '非商业OD'].indexOf(this.currentNodeName) > -1) {   
                role = 'businessOD';
            } else if (['商业HR'].indexOf(this.currentNodeName) > -1) {   
                role = 'businessHR';
            } else {
                role = 'default';
            }

            return role;
        }
    },
    data() {
        return {
            progressInfo: {},
            currentNodeName: '',
            dictInfo: {
                change_type: []
            },
            changeType: []
        };
    },
    created() {
        this.getProgressInfo();
        this.getAuditNodeStatusByProcessInstanceId();
        this.getDictInfo();
    },
    methods: {
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.changeType = this.progressInfo.changeType || [];
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        },
        async getAuditNodeStatusByProcessInstanceId() {
            const { success, root } = await _getAuditNodeStatusByProcessInstanceId({
                processInstanceId: this.processId
            });
            if(!(success && root && root.length)) return;
            const current = root.find(item => item.last === 1);
            this.currentNodeName = current ? current.nodeName : '';
        },
        // 获取下拉列表数据
        async getDictInfo() {
            try {
                const { success, root } = await _batchGetDictInfo({
                    typeList: Object.keys(this.dictInfo)
                });
                if(!success) return;
                this.dictInfo = root || {};
            } catch (error) {
                console.log(error);
            }
        },
        async beforeAgree() {
            try {
                if (!(this.progressInfo.isBusiness && ['businessHR'].includes(this.operateNode))) {
                    return true;
                }
                if (!this.changeType.length) {
                    this.$toast('异动类型不能为空', 'warning');
                    return;
                }
                const { success, root } = await _editChangeType({
                    processInstanceId: this.processId,
                    changeType: this.changeType
                });
                if(success) {
                    return {
                        postData: {}
                    };
                };
                return false;
            } catch(error) {
                console.log(error);
            }
        }
    }
};
</script>