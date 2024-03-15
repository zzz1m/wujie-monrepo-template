<template>
<div>
    <div v-if="progressInfo.intervieweeVO" class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'userName')]">
                <span>姓名</span>
                <div>
                    <talentIcon :id="progressInfo.intervieweeVO.id" :name="progressInfo.intervieweeVO.name" :blank="true" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'number')]">
                <span>员工编号</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.intervieweeVO.number" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'deptName')]">
                <span>部门</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.intervieweeVO.deptName" />
                </div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <h2 class="title">访谈意见</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'interviewResultStr')]">
                <span>评估建议</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.interviewResultStr" />
                </div>
            </li>
            <li v-if="evaluateDateInfo" :class="[highlightClass(progressInfo, 'evaluateDate')]">
                <span>{{ evaluateDateInfo.label }}</span>
                <div>{{ evaluateDateInfo.value }}</div>
            </li>
            <li v-if="progressInfo.specialInstructions" :class="[highlightClass(progressInfo, 'specialInstructions')]">
                <span>特殊说明</span>
                <div>{{ progressInfo.specialInstructions }}</div>
            </li>
            <li v-if="progressInfo.delayDetail">
                <span>延期详情</span>
                <div class="download-container">
                    <ul class="download-list">
                        <li>
                            <em class="file-name" @click="previewAction(JSON.parse(progressInfo.delayDetail))"><nari-tooltip :value="JSON.parse(progressInfo.delayDetail).fileName" /></em>
                            <i class="ui-icon-view btn-look" @click="previewAction(JSON.parse(progressInfo.delayDetail))"></i>
                        </li>
                    </ul>
                </div>
            </li>
            <li :class="['mt0', highlightClass(annexesList, 'file', true)]">
                <span>附件</span>
                <div class="download-container">
                    <ul v-if="annexesList.length" class="download-list">
                        <li v-for="(item, index) in annexesList" :key="index">
                            <em class="file-name" @click="previewAction(item)"><nari-tooltip :value="item.fileName" /></em>
                            <i class="ui-icon-view btn-look" @click="previewAction(item)"></i>
                        </li>
                    </ul>
                    <span v-else>-</span>
                </div>
            </li>
            <li v-if="suggestDesc" :class="['full-row', 'm-t-36', highlightClass(progressInfo, 'suggestDesc')]">
                <span>建议说明</span>
                <div>{{ suggestDesc }}</div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <li class="full-row"></li>

        <h2 class="title">访谈评估表</h2>
        <div class="interview-form__container">
            <div class="interview-form__body" v-html="progressInfo.evaluateEmail || progressInfo.evaluation"></div>
        </div>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
import talentIcon from '@/components/talent-entry-icon/index.vue';

// 访谈结果枚举
// [
//     {label: '继续试用',value: 1},
//     {label: '提前转正',value: 2},
//     {label: '延长试用',value: 3},
//     {label: '结束试用，办理离职',value: 4},
//     {label: '同意转正',value: 5},
//     {label: '继续见习',value: 6},
//     {label: '延长见习',value: 7},
//     {label: '同意见习转正', value: 8},
//     {label: '结束见习', value: 9},
//     {label: '完成', value: 10},
//     {label: '有回归意愿', value: 11},
//     {label: '无回归意愿', value: 12},
//     {label: '同意晋升', value: 13},
//     {label: '不予晋升', value: 14},
//     {label: '终止', value: 15}
// ];
export default {
    name: 'InterviewReport',
    mixins: [commonMixin],
    components: {
        talentIcon
    },
    computed: {
        processId() {
            return this.$route.query.processId;
        },
        suggestDesc(){
            const {suggestDesc} = this.progressInfo;
            if(suggestDesc) {
                const sg = JSON.parse(suggestDesc);
                // console.log(sg)
                return sg?.value || '';
                // return sg
            }
            return '';
        },
        evaluateDateInfo() {
            const { interviewResult, evaluateDate } = this.progressInfo;
            let label = '';
            if ([2, 5, 8].indexOf(Number(interviewResult)) > -1) {
                if(this.$route.query.processTypeCode === 'SJT010007') {
                    label = '见习结束日期';
                } else {
                    label = '转正日期';
                }
                
            } else if ([3, 7].indexOf(Number(interviewResult)) > -1) {
                label = '延期至';
            }
            if (label) {
                return {
                    label,
                    value: evaluateDate ? this.$dayjs(evaluateDate).format('YYYY-MM-DD') : '-'
                };
            }
            return null;
        },
        // 访谈附近
        annexesList() {
            const { file } = this.progressInfo;
            const fileList = JSON.parse(file || '[]');
            return fileList;
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
        // 在线预览
        previewAction(info) {
            window.open(`/api/common/file/preview.json?ossPath=${info.reviewUrl.replace(/http.*(review|download)\//, '')}`);
        },
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
<style lang='less'>
@import '@/styles/interview/email-tpl.less';
</style>