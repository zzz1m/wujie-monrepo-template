<template>
<div class="tmp-group-interview-evaluation">
    <!-- 套件 -->
    <div class="p-l-32">
        <span class="interview-item-title">评估建议：</span>
        <template v-if="isPreview">
            {不同访谈系统生成对应的评估建议选项}
        </template>
        <ui-radio-group v-else :value="valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_CODE]">
            <ui-radio
v-for="item in valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_LIST_CODE]"
                :key="item.value" :disabled="readonly" :label="item.value"
            >
                {{ item.label }}
            </ui-radio>
        </ui-radio-group>
    </div>
    <div v-if="evaluateDateObj && viewConfig.parentId.startsWith('group-interview_assessment')" class="p-l-32 b-t">
        <span class="interview-item-title">{{ timeLabel }}：</span>
        <span>{{ valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_EVALUATE_DATE_CODE] }}</span>
    </div>
</div>
</template>
<script>
import Mixin from '@/package/template-center/components/layout/mixins/preview.js';
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
        timeLabel() {
            const code = this.valueConfig[this.PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_CODE];
            // 见习转正的label要改成见习结束日期，其中 code=2被共用，需要根据访谈类型判断
            if(code === 2) {
                return [4,5].includes(this.pageData.interviewType)? '见习结束日期': '转正日期';
            }
            return this.evaluateDateObj.label;
        },
        isPreview() {
            return this.$route.hash === '#preview';
        },
        evaluateDateObj() {
            return this.evaluateDateMap[this.valueConfig[this.PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_ADVICE_CODE]];
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
};
</script>
