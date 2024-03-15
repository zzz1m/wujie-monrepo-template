<template>
<div class="tmp-date">
    <slot name="title"></slot>
    <div class="tmp-form-item-content">
        <ui-date-picker :value="valueConfig[PARAM_COMMON_VALUE_CODE]"
            :type="dataType" placeholder="选择日期" align="left" :disabled="readonly"
            start-placeholder="开始日期" end-placeholder="结束日期"
            clearable :value-format="viewConfig.format" :format="viewConfig.format"
            :picker-options="{}" @input="handleChange"
        >
        </ui-date-picker>
    </div>
</div>
</template>
<script>
import { 
    TYPE_BASIC_DATE, TYPE_BASIC_DATE_RANGE } from '@/package/template-center/model/const';
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';

export default {
    name: 'Date',
    mixins: [Mixin],
    components: {
        
    },
    data() {
        return {
        };
    },
    computed: {
        // 处理time格式
        dataType() {
            let range = this.viewConfig.type === TYPE_BASIC_DATE_RANGE ? 'range' : '';
            return this.viewConfig.format.length > 10 ? 'datetime' + range : 'date' + range;
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
            this.$emit('on-change', this.viewId, value);
        }
    }
};
</script>