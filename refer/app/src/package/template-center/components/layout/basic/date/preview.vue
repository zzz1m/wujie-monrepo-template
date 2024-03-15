<template>
<div class="tmp-fill">
    <slot name="title"></slot>
    <div class="tmp-form-item-content">
        <span>{{ showValue }}</span>
    </div>
</div>
</template>
<script>
import { TYPE_BASIC_DATE_RANGE } from '@/package/template-center/model/const';
import Mixin from '@/package/template-center/components/layout/mixins/preview.js';

export default {
    name: 'DateView',
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
        },
        showValue() {
            if (Array.isArray(this.valueConfig[this.PARAM_COMMON_VALUE_CODE])) {
                return this.valueConfig[this.PARAM_COMMON_VALUE_CODE].join(' - ');
            } else {
                return this.valueConfig[this.PARAM_COMMON_VALUE_CODE] || '-';
            }
        }
    },
    mounted() {
    },
    methods: {
       
    }
};
</script>