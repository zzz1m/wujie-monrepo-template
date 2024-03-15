<template>
<div
    v-if="!viewConfig.hidden"
    class="tmp-form-item" 
    :class="`tmp-form-type-${viewConfig.type} ${errorMsg && 'tmp-form-has-error'}`"
    :style="{
        width: `${viewItem.splits}%`
    }"
>   
    <component 
        :is="viewConfig.role && viewConfig.role.startsWith('relation-') ? viewConfig.role :viewConfig.type"
        :view-item="viewItem"
        :view-config="viewConfig"
        :value-config="pageData.paramModel[viewItem.id] || {value: {}}"
        @on-change="handleChange"
        @on-validate="onValidate"
    >
        <slot></slot>
        <template slot="title">
            <div class="tmp-form-item-wrapper">
                <!-- 标题 -->
                <h5 v-if="viewConfig.title" class="tmp-form-item-title"><span class="tmp-form-item-sort" :class="viewConfig.required && 'required'">{{ viewConfig.showSerial ? viewItem.serialNo : '' }}</span>{{ viewConfig.title }}</h5>
                <!-- 标题说明 -->
                <p v-if="viewConfig.hasInstructions && viewConfig.instructions" class="title-description">{{ viewConfig.instructions }}</p>
            </div>
        </template>
    </component>
    <div v-if="errorMsg" class="tmp-form-error">{{ errorMsg }}</div>
</div>
</template>
<script>
import FillCompoents from '@/package/template-center/components/busines/render-components-fill.js';
export default {
    name: 'TmpFormItem',
    props: {
        viewConfig: {
            type: Object,
            default: () => ({})
        },
        viewItem: {               // 视图对象
            type: Object,
            default: () => ({})
        }
    },
    inject: ['pageData'],
    computed: {
        errorMsg() {
            if (this.pageData.validateMap[this.viewItem.id]?.success === 0) {
                return this.pageData.validateMap[this.viewItem.id]?.message || '';
            } else {
                return '';
            }
        }
    },
    components: {
        ...FillCompoents
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
        /**
         * @description 处理组件赋值操作 向上层传递 在最上层处理
         * @param {Object}  config 组件配置对象
         * @param {Any} value 组件的值
         * @param {Object} changeConfig 修改值一些特殊配置 例如：选项中输入框值修改
         */
        handleChange(config, value, changeConfig = {}) {
            this.$emit('on-change', config, value, changeConfig);
        },
        /**
         * @description 处理组件赋值操作 向上层传递 在最上层处理
         * @param {Object}  config 组件配置对象
         * @param {Any} value 组件的值
         */
        onValidate(config, value) {
            this.$emit('on-validate', config, value);
        }
    }
};
</script>