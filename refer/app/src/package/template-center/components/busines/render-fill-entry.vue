<template>
<div class="tmp-form">
    <TmpFormItem 
        v-for="item in viewerList" :key="item.id" 
        :view-item="item"
        :view-config="getViewConfig(item)"
        @on-change="onChange"
        @on-validate="onValidate"
    >
        <RenderFillEntry
            v-if="item.children && item.children.length" 
            :viewer-list="item.children" :on-change="onChange" :on-validate="onValidate"
        />
    </TmpFormItem>
</div>
</template>
<script>
import TmpFormItem from '@/package/template-center/template-fill/components/template-form-item.vue';
// todo 提取到当前业务下的tools
import { _setValue } from '@/utils/util';
export default {
    name: 'RenderFillEntry',
    props: {
        /**
         * 视图列表
         */
        viewerList: { 
            type: Array, 
            default: () => []
        },
        /**
         * 值变化回调
         */
        onChange: {
            type: Function,
            required: true
        },
        /**
         * 校验回调
         */
        onValidate: {
            type: Function,
            required: true
        }
    },
    inject: ['pageData'],
    components: {
        TmpFormItem
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
        getViewConfig(item) {
            // todo 语法兼容
            return this.pageData.vm.configList[item.id];
        }
    }
};
</script>