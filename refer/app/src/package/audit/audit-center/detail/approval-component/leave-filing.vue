<template>
<div class="leave-approval__module">
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'userName')]">
                <span>姓名</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.userName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'deptName')]">
                <span>末级部门</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.deptName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'workplace')]">
                <span>工作地点</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.workplace" />
                </div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <h2 class="title"><svg-icon icon-class="icon-contract" class="icon" />离开驻地信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'destination')]">
                <span>目的地</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.destination" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'leaveReason')]">
                <span>离开驻地事由</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.leaveReason" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'leaveDate')]">
                <span>离开时间</span>
                <div>{{ progressInfo.leaveDate ? `${$dayjs(progressInfo.leaveDate).format('YYYY-MM-DD')} ${amPmMap[progressInfo.leaveHalf]}` : '-' }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'leaveTrafficStr')]">
                <span>离开交通方式</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.leaveTrafficStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'leaveTrafficInfo')]">
                <span>车次或航班号</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.leaveTrafficInfo" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'backDate')]">
                <span>返回时间</span>
                <div>{{ progressInfo.backDate ? `${$dayjs(progressInfo.backDate).format('YYYY-MM-DD')} ${amPmMap[progressInfo.backHalf]}` : '-' }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'backTrafficStr')]">
                <span>返回交通方式</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.backTrafficStr" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'backTrafficInfo')]">
                <span>车次或航班号</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.backTrafficInfo" />
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import { mapState } from 'vuex';
import { _getAuditNodeStatusByProcessInstanceId } from '@/services/dashboard/audit';
export default {
    name: 'LeaveApproval',
    mixins: [commonMixin],
    computed: {
        ...mapState(['userInfo']),
        processId() {
            return this.$route.query.processId;
        },
        // 基本信息
        userInfoVO() {
            return this.progressInfo['userInfoVO'] || {};
        }
    },
    data() {
        return {
            progressInfo: {},
            amPmMap: {
                am: '上午',
                pm: '下午'
            }
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
        }
    }
};
</script>