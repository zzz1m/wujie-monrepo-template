<template>
<div class="template-config-page page-wrap">
    <Toolsbar v-bind="{ relationList, groupList }" @show-multiple="showMult" @clearConfig="clearConfig" />
    <RenderCreateEntry ref="renderCreateEntry" v-bind="{ moduleList }" @choose="onChoose" @clearConfig="clearConfig" />
    <ConfigPanel v-bind="{
        relationList, groupList, moduleList,
        ...configInfo
    }" @show-multiple="showMult" @clearConfig="clearConfig"
    />
</div>
</template>

<script>
import Toolsbar from './toolsbar.vue';
import ConfigPanel from '../config/index.vue';
import RenderCreateEntry from '@/package/template-center/components/busines/render-create-entry.vue';
import { throttle } from '@/utils/common';

export default {
    components: {
        Toolsbar, ConfigPanel, RenderCreateEntry
    },
    inject: ['vm'],
    provide() {
        const {status, configInfo } = this;
        return {
            status: status,
            configInfo: configInfo
        };
    },
    props: {
        relationList: { type: Array, default: () => []},
        groupList: { type: Array, default: () => []}
    },
    computed: {
        moduleList() {
            return this.relationList.filter(t => t.isMulti).map(t => t.comps).reduce((val, cur) => val.concat(cur),[]);
        }
    },
    data() {
        return { 
            status: {
                isDragging: false,
                onItemId: null,
                // 处理控件插入分栏的阻断样式
                hoverColumnId: null,
                hoverColumnError: false
            },
            // 右侧配置面板
            configInfo: {
                activeId: null, // 选中的控件id
                activeCode: null // 选中的控件的选项code
            }
        };
    },
    methods: {
        // 点击选择控件或者控件选项
        onChoose(options) {
            const { activeId, activeCode } = options;
            this.configInfo.activeId = activeId || null;
            this.configInfo.activeCode  = activeCode || null;
        },
        clearConfig() {
            this.configInfo.activeId = null;
            this.configInfo.activeCode = null;
        },
        showMult(id) {
            this.$refs.renderCreateEntry.showMulti(id);
        }
    }
};
</script>