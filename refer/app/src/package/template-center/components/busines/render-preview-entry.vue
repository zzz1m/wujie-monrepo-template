<template>
<div class="tmp-form">
    <TmpViewItem 
        v-for="item in viewerList" :key="item.id" 
        :view-item="item"
        :view-config="getViewConfig(item)"
    >
        <RenderViewEntry
            v-if="item.children && item.children.length" 
            :viewer-list="item.children"
        />
    </TmpViewItem>
</div>
</template>
<script>
import TmpViewItem from '@/package/template-center/template-preview/components/template-form-item.vue';
// todo 提取到当前业务下的tools
import { _setValue } from '@/utils/util';
export default {
    name: 'RenderViewEntry',
    props: {
        /**
         * 视图列表
         */
        viewerList: { 
            type: Array, 
            default: () => []
        }
    },
    inject: ['pageData'],
    components: {
        TmpViewItem
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