<template>
<div class="tmp-radio">
    <slot name="title"></slot>
    <!-- form主体 -->
    <div class="tmp-form-item-content">
        <ui-radio-group :value="valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_SELECT_OPTION_CODE]" @on-change="handleChange">
            <div 
                v-for="(item, index) in viewConfig.options" 
                :key="item.code" class="radio-option-item"
            >
                <div class="option-item-content">
                    <ui-radio :label="item.code" :disabled="readonly">{{ item.label }}</ui-radio>
                    <!-- 其他项输入 -->
                    <!-- :maxlength="item.extraLimit" -->
                    <div v-if="item.hasExtra && (valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_SELECT_OPTION_CODE] === item.code)"  class="option-extra">{{ valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_SELECT_OPTION_INFORMATION_CODE] }}</div>
                </div>
            </div>
        </ui-radio-group>
    </div>
</div>
</template>
<script>
import Mixin from '@/package/template-center/components/layout/mixins/preview.js';
export default {
    name: 'Radio',
    mixins: [Mixin],
    components: {
    },
    mounted() {
    },
    methods: {
        /**
         * @description 组件值改变触发事件
         * @param {String} value 修改的值
         */
        handleChange(value) {
            this.$emit('on-change', this.viewId, {
                [this.PARAM_SELECT_OPTION_CODE]: value,
                [this.PARAM_SELECT_OPTION_INFORMATION_CODE]: ''
            });
        },
        /**
         * @description 其他选项输入框改变事件
         * @param {String} value 修改项的值
         * @param {Number} index 修改项的下标
         */
        handleInputChange(value, index) {
            this.$emit('on-change', this.viewId, value.trim(), {
                keyLink: [this.PARAM_COMMON_VALUE_CODE, this.PARAM_SELECT_OPTION_INFORMATION_CODE]
                // type: 'radio-option',
                // optionIndex: index
            });
        }
    }
};
</script>