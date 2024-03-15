<template>
<components :is="componentName" ref="reportDialog" v-bind="$attrs" v-on="$listeners"></components>
</template>

<script>
import LeaveReportDialog from '@/package/interview/components/common/leave-report-dialog.vue';
import GeneralReportDialog from '@/package/interview/components/common/general-report-dialog.vue';
import InterviewTempDialog from '@/package/interview/components/common/interview-temp-dialog.vue';
import { _interviewerDetail, _getInterviewProcessInfo } from '@/services/dashboard/interview';
import { commonConfig } from '@noah/tools';
const { INTERVIEW_RESULT_LIST }  = commonConfig.interview;
export default {
    components: {
        LeaveReportDialog,
        GeneralReportDialog,
        InterviewTempDialog
    },
    data() {
        return {
            type: null,
            interviewResultList: INTERVIEW_RESULT_LIST,
            version: 2
        };
    },
    computed: {
        componentName() {
            if (this.version === 2) {
                return 'InterviewTempDialog';
            } else {
                if (!this.type) return '';
                if (+this.type === 6 || +this.type === 7) {
                    // 离职访谈、离职回访
                    return 'LeaveReportDialog';
                } else {
                    // 首月访谈、转正、见习、晋升
                    return 'GeneralReportDialog';
                }
            }
        }
    },
    watch: {},
    //方法集合
    methods: {
        open(params, from = '') {
            if (from && from === 'audit_center') {
                // 审批中心
                _getInterviewProcessInfo({ processInstanceId: params.id })
                    .then((res) => {
                        if (res.success) {
                            let data = res.root;
                            let obj = {
                                type: data.interviewType,
                                id: data.interviewId,
                                resultId: data.resultId,
                                processInstanceId: data.processInstanceId,
                                status: data.status,
                                reportStatus: data.reportStatus,
                                currentUserId: data.currentUserId,
                                interviewerId: data.interviewerId
                            };
                            this.version = data.version;
                            this.render(obj, from);
                        } else {
                            this.$toast(res.message || '请求访谈报告详情失败', 'warning');
                        }
                    })
                    .catch((err) => {
                        this.$toast(err.message || '请求访谈报告详情失败', 'error');
                    });
            } else {
                if (!params.reportStatus) {
                    this.$toast('该工单无访谈报告，部分历史工单未在线上维护访谈报告。', 'warning');
                    return;
                }
                this.version = params.version;
                this.render(params, from);
            }
        },
        render(params, from) {
            this.type = params.type;
            this.$nextTick(() => {
                this.$refs.reportDialog.getData(params, this.getReportResultList(params), null, null, from);
            });
        },
        getReportResultList(data) {
            if (+data.type === 2) {
                // 转正3月
                if (data.probationCode === '01') {
                    // 试用期3个月
                    return this.interviewResultList[+data.type].filter((v) => v.value !== 1); // 无继续试用,终止
                } else if (data.probationCode === '05') {
                    // 试用期6个月
                    return this.interviewResultList[+data.type].filter((v) => v.value !== 3 && v.value !== 5); // 无延长试用,同意转正,终止
                }
            }
            if (+data.type === 4) {
                // 转正3月
                if (data.noviciate + '' === '3') {
                    // 试用期3个月
                    return this.interviewResultList[+data.type].filter((v) => v.value !== 6); // 无继续见习
                }
                if (data.noviciate + '' === '6') {
                    return this.interviewResultList[+data.type].filter((v) => v.value !== 7); // 无延长见习
                }
            }
            return this.interviewResultList[+data.type]; // 无终止
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang='less' scoped>
//@import url();
</style>