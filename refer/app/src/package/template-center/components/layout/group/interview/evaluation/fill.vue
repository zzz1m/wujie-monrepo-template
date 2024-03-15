<template>
<div class="tmp-group-interview-evaluation">
    <!-- 套件 -->
    <div class="p-l-32">
        <span class="interview-item-title">评估建议：</span>
        <template v-if="isPreview">
            {不同访谈系统生成对应的评估建议选项}
        </template>
        <ui-radio-group v-else :value="valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_CODE]" @on-change="handleChange">
            <ui-radio
v-for="item in valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE]"
                :key="item.value" :disabled="readonly" :label="item.value"
            >
                {{ item.label }}
            </ui-radio>
        </ui-radio-group>
    </div>

    <div v-if="evaluateDateObj && this.isAssessment" class="p-l-32 m-t-25">
        <span class="interview-item-title">{{ timeLabel }}：</span>
        <ui-date-picker
:key="'evaluateDate'+valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_CODE]" align="left"
            clearable :disabled="readonly || evaluateDateObj.hasDefault" format="yyyy-MM-dd" :picker-options="pickerOption"
            placeholder="选择日期" type="date" :value="valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE]"
            value-format="yyyy-MM-dd"
            @input="handleDateChange"
        >
        </ui-date-picker>
    </div>
</div>
</template>
<script>
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';
import {
    PARAM_GROUP_INTERVIEW_ADVICE_CODE, PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE, PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE
} from '@/package/template-center/model/const.js';
import { commonConfig } from '@noah/tools';
const {  EVALUATE_DATE_LABEL_MAP }  = commonConfig.interview;

export default {
    name: 'InterviewEvaluation',
    mixins: [Mixin],
    components: {
    },
    data() {
        return {
            PARAM_GROUP_INTERVIEW_ADVICE_CODE: PARAM_GROUP_INTERVIEW_ADVICE_CODE,
            PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE: PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE,
            PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE: PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE,
            evaluateDateMap: EVALUATE_DATE_LABEL_MAP
        };
    },
    computed: {
        isPreview() {
            return this.$route.hash === '#preview';
        },
        evaluateDateObj() {
            const code = this.valueConfig[this.PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_CODE];
            return this.evaluateDateMap[code];
        },
        timeLabel() {
            const code = this.valueConfig[this.PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_CODE];
            // 见习转正的label要改成见习结束日期，其中 code=2被共用，需要根据访谈类型判断
            if(code === 2) {
                return [4,5].includes(this.pageData.interviewType)? '见习结束日期': '转正日期';
            }
            return this.evaluateDateObj.label;
        },
        isAssessment() {
            return this.viewConfig.parentId.startsWith('group-interview_assessment');
        },
        pickerOption() {
            return {
                disabledDate: time => {
                    let evaluateDate = this.pageData.businessData.interviewEvaluateDate?.evaluateDate;
                    let isBeforeToday = this.$dayjs(time).isBefore(this.$dayjs(), 'day');
                    if (['2'].includes(this.valueConfig[this.PARAM_COMMON_VALUE_CODE][this.PARAM_GROUP_INTERVIEW_ADVICE_CODE] + '') && evaluateDate) {
                        return this.$dayjs(time).isAfter(this.$dayjs(evaluateDate), 'day');
                    }

                    if  (['3', '7'].includes(this.valueConfig[this.PARAM_COMMON_VALUE_CODE][this.PARAM_GROUP_INTERVIEW_ADVICE_CODE] + '') && evaluateDate) {
                        return this.$dayjs(time).isBefore(this.$dayjs(evaluateDate).add(1, 'day'), 'day');
                    }
                    return false;
                }
            };
        }
    },
    watch: {
        'pageData.businessData.adviceList': {
            handler(val, oldVal) {
                if (!val || !val.length) { return; }
                let adviceList = val;
                if (adviceList && !this.valueConfig[this.PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE].length) {
                    this.valueConfig[this.PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE] = this.pageData.businessData.adviceList;
                    if (adviceList.length === 1) {
                        this.valueConfig[this.PARAM_COMMON_VALUE_CODE][[PARAM_GROUP_INTERVIEW_ADVICE_CODE]] = adviceList[0].value;
                    }
                }
            },
            immediate: true,
            deep: true
        }

    },
    created() {

    },
    mounted() {
    },
    methods: {
        /**
         * @description 组件值改变触发事件
         * @param {Array} value 修改的值
         */
        handleChange(value) {
            let evaluateDateObj = this.evaluateDateMap[value];
            let evaluateDate = '';
            if (evaluateDateObj?.hasDefault && this.isAssessment) {
                evaluateDate = this.pageData.businessData.interviewEvaluateDate?.evaluateDate || '';
            }
            let viewValue = {
                ...this.valueConfig[this.PARAM_COMMON_VALUE_CODE],
                [PARAM_GROUP_INTERVIEW_ADVICE_CODE]: value,
                [PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE]: evaluateDate
            };
            this.$emit('on-change', this.viewId, viewValue);
        },
        /**
         * @description 组件值改变触发时间改变事件
         * @param {Array} value 修改的值
         */
        handleDateChange(value) {
            let viewValue = {
                ...this.valueConfig[this.PARAM_COMMON_VALUE_CODE],
                [PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE]: value
            };
            this.$emit('on-change', this.viewId, viewValue);
        }
    }
};
</script>
