<template>
<div class="tmp-fill">
    <slot name="title"></slot>
    <div class="tmp-form-item-content">
        <ui-input 
            v-bind="{
                type: viewConfig.size === 'S' ? 'text' : 'textarea',
            }"
            :style="(viewConfig.size !== 'S' && (!viewItem.splits || viewItem.splits === 100)) && {'width': '100%'}"
            :rows="4" :disabled="readonly || viewConfig.readOnly"
            :value="valueConfig[PARAM_COMMON_VALUE_CODE]"
            :placeholder="viewConfig.placeholder"
            :clearable="!(readonly || viewConfig.readOnly)" resize="both"
            :maxlength="viewConfig.lengthMax || null" @input="handleChange"
            @on-blur="handleBlue"
        ></ui-input>
    </div>
</div>
</template>
<script>
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';
export default {
    name: 'Fill',
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
            const trimValue = this.viewConfig.size === 'S' ? value.trim() : value;
            this.$emit('on-change', this.viewId, trimValue);
        },
        /**
         * @description 组件值失焦触发事件
         * @param {Array} value 修改的值
         */
        handleBlue() {
            this.$emit('on-validate', this.viewId, this.valueConfig[this.PARAM_COMMON_VALUE_CODE]);
        }
    }
};
</script>