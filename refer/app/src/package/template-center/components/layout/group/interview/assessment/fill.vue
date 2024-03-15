<template>
<div class="tmp-group-interview">
    <!-- 这是评估意见 -->
    <div class="tmp-group-interview-content">
        <slot></slot>
    </div>
</div>
</template>
<script>
import { 
    PARAM_GROUP_INTERVIEW_SUGGEST_CODE
} from '@/package/template-center/model/const.js';
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';
export default {
    name: 'InterviewAssessment',
    mixins: [Mixin],
    props: {
        viewConfig: {
            type: Object,
            default: () => {}
        },
        valueConfig: {
            type: Object,
            default: () => {}
        }
    },
    components: {
    },
    data() {
        return {
            PARAM_GROUP_INTERVIEW_SUGGEST_CODE: PARAM_GROUP_INTERVIEW_SUGGEST_CODE
        };
    },
    mounted() {
    },
    methods: {
        /**
         * @description 组件值改变触发事件
         * @param {Array} value 修改的值
         */
        handleChange(value) {
            let viewValue = {
                [PARAM_GROUP_INTERVIEW_SUGGEST_CODE]: value
            };
            this.$emit('on-change', this.viewId, viewValue);
        }
    }
};
</script>