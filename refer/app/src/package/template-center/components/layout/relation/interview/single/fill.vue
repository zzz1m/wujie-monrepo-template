<template>
<div class="temp-relation-interview-single">
    <slot name="title"></slot>
    <div class="tmp-form-item-content">
        <span>{{ valueConfig[PARAM_COMMON_VALUE_CODE] || '-' }}</span>
    </div>
</div>
</template>
<script>
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';

export default {
    mixins: [Mixin],
    components: {
        
    },
    data() {
        return {

        };
    },
    computed: {
        maxlength() {
            return this.viewConfig.lengthMax;
        }
    },
    mounted() {
    },
    methods: {
        /**
         * @description 组件值改变触发事件
         * @param {Array} value 修改的值
         */
        handleChange(value) {
            this.$emit('on-change', this.viewConfig, value);
        }
    }
};
</script>