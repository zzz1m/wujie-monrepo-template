<template>
<div class="tmp-checkbox">
    <slot name="title"></slot>
    <!-- form主体 -->
    <div class="tmp-form-item-content">
        <ui-checkbox-group :value="checkboxValue" @on-change="handleChange">
            <div 
                v-for="item in viewConfig.options" 
                :key="item.code" class="radio-option-item"
            >
                <div class="option-item-content">
                    <ui-checkbox 
                        :label="item.code" :disabled="isDisabled(item) || readonly"
                        @click.native.stop="handleClickOption(item)"
                    >
                        {{ item.label }}
                    </ui-checkbox>
                    <!-- 其他项输入 -->
                    <ui-input v-if="item.hasExtra && checkboxValue.includes(item.code) " :value="extraValue(item.code)"
                        class="option-extra" :disabled="readonly"
                        type="text" placeholder="请输入内容"
                        clearable
                        @input="(value) => handleInputChange(value, item.code)"
                    ></ui-input>
                </div>
                <!-- 选项说明 -->
                <div v-if="item.hasExplain" class="option-description">{{ item.explain }}</div>
            </div>
        </ui-checkbox-group>
    </div>
</div>
</template>
<script>
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';

export default {
    name: 'Checkbox',
    mixins: [Mixin],
    components: {
    },
    data() {
        return {
        };
    },
    computed: {
        checkboxValue() {
            return (this.valueConfig[this.PARAM_COMMON_VALUE_CODE] || []).map(item => item[this.PARAM_SELECT_OPTION_CODE]).filter(item => item);
        }
    },
    mounted() {
    },
    methods: {
        /**
         * @description 判断是否是只读项
         * @param {Object} item 选项对象
         */
        isDisabled(item) {
            return this.viewConfig.selectedMax !== -1
                && !this.checkboxValue.includes(item.code) 
                && this.checkboxValue.length >= this.viewConfig.selectedMax;
        },
        /**
         * @description: 获取 输入框 的值
         * @param {String} optionId
         */
        extraValue(optionId) {
            let checkedOjb = this.valueConfig[this.PARAM_COMMON_VALUE_CODE].find(valueObj => valueObj[this.PARAM_SELECT_OPTION_CODE] === optionId);
            return checkedOjb[this.PARAM_SELECT_OPTION_INFORMATION_CODE] || '';
        },
        /**
         * @description 组件值改变触发事件
         * @param {Array} value 修改的值
         */
        handleChange(value) {
            let checkedList = value.map(optionId => {
                let checkedOjb = this.valueConfig[this.PARAM_COMMON_VALUE_CODE].find(valueObj => valueObj[this.PARAM_SELECT_OPTION_CODE] === optionId);
                if (checkedOjb) {
                    return checkedOjb;
                } else {
                    return {
                        [this.PARAM_SELECT_OPTION_CODE]: optionId,
                        [this.PARAM_SELECT_OPTION_INFORMATION_CODE]: ''
                    };
                }
            });
            this.$emit('on-change', this.viewId, checkedList);
            // this.$emit('on-change', this.viewConfig, value);
        },
        /**
         * @description 其他选项输入框改变事件
         * @param {String} value 修改项的值
         * @param {Number} index  修改项的下标
         */
        handleInputChange(value, optionId) {
            let checkedList = this.valueConfig[this.PARAM_COMMON_VALUE_CODE].map( currentValue => {
                if (currentValue[this.PARAM_SELECT_OPTION_CODE] === optionId) {
                    return {
                        [this.PARAM_SELECT_OPTION_CODE]: optionId,
                        [this.PARAM_SELECT_OPTION_INFORMATION_CODE]: value
                    };
                } else {
                    return currentValue;
                }
            });
            this.$emit('on-change', this.viewId, checkedList);
        },
        /**
         * @description 点击选项触发事件
         * @param {Object} item 选项对象
         */
        handleClickOption(item) {
            // 超过 最多值不允许选中
            if (this.isDisabled(item))  {
                this.$toast(`最多选择${this.viewConfig.selectedMax}项`, 'warning');
            }
            
        }
    }
};
</script>