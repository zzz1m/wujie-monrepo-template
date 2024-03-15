<template>
<div id="create-preview-panel" class="create-preview-panel" :class="{ 'show-config': !!activeId }" @click="onEmpty">
    <DragViewlist 
        :list="viewerList" 
        @choose="onChoose"
        @clearConfig="onEmpty"
        @show-multiple="showMulti"
    >
        <!-- todo：作用域插槽的其它地方有类似场景的也都考虑一下 @振举 @小龙 -->
        <template v-if="item.id && configList[item.id]" slot-scope="{item}">
            <component
                :is="configList[item.id].role.startsWith('relation-') ? configList[item.id].role : configList[item.id].type"
                :config="configList[item.id]"
                v-on="$listeners"
            >
                <!-- todo 预览和填写阶段的头部渲染也都用slot统一提出来 @小龙 @瑞南 -->
                <template slot="card-header">
                    <div class="title-wrap">
                        <div class="seq-num">
                            <span v-show="configList[item.id].required" class="required">*</span>
                            <span v-show="configList[item.id].showSerial" class="q-seq">{{ item.serialNo }}</span>
                        </div>
                        <div class="title">
                            <div v-select="{limit: 1000}" class="rich-text-area" :contenteditable="true" @blur="(e) => onBlur(e, item.id, 'title')">{{ configList[item.id].title }}</div>
                        </div>
                    </div>
                    <div v-show="configList[item.id].hasInstructions" class="title-desc">
                        <div class="rich-text-edit">
                            <div v-select="{limit: 1000}" :contenteditable="true" class="rich-text-area" @blur="(e) => onBlur(e, item.id, 'instructions')">{{ configList[item.id].instructions }}</div>
                        </div>
                    </div>
                </template>
            </component>
        </template>
    </DragViewlist>
    <relation-transfer ref="relationTransfer" v-bind="{ moduleList }"></relation-transfer>
</div>
</template>
<script>
import DragViewlist from '@/package/template-center/template-create/components/drag-viewlist.vue';
import RelationTransfer from '@/package/template-center/components/layout/relation/interview/multiple/relation-transfer.vue';

import comps from './render-components-create';
import { throttle } from '@/utils/common';
export default {
    name: 'RenderCreateEntry',
    components: {
        DragViewlist,
        RelationTransfer,
        ...comps
    },
    props: {
        moduleList: { type: Array, default: () => []}
    },
    inject: ['vm', 'configInfo', 'status'],
    computed: {
        configList() {
            return this.vm.configList;
        },
        viewerList() {
            return this.vm.viewerList;
        },
        activeId() {
            return this.configInfo?.activeId;
        }
    },
    methods: {
       
        onEmpty() {
            this.$emit('clearConfig');
        },
        onChoose(options) {
            this.$emit('choose',options);
        },
        onBlur(e, id, item) {
            const innerText = e.target.innerText.replace(/(^\s*)|(\s*$)/g, '');
            if(!innerText) {
                let value = this.configList[id][item];
                e.target.innerText = value;
            } else {
                e.target.innerHTML = innerText;
                this.$set(this.configList[id], item, innerText);
            };
        },
        confirmCallback(id, data) {
            data = JSON.parse(data.fieldJson);
            const config = this.vm.configList[id];
            config.fieldsList = data.sort((a, b) => a.sort - b.sort).map(i => ({
                code: i.id,
                label: i.name
            }));
        },
        showMulti(id) {
            this.$refs.relationTransfer.show(id, data => this.confirmCallback(id, data));
        }
    }
};
</script>