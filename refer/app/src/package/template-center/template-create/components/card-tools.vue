<template>
<div class="handler-wrap" :class="{ 'pointer-events-none': status.isDragging }">
    <ui-tooltip v-if="!isEvalutation"
        placement="top"
        :open-delay="400"
        effect="dark"
        popper-class="drag-item"
        max-width="320"
    >
        <div class="svg-wrap"><svg-icon icon-class="tml-delete" @click.native.stop="$emit('del')" /></div>
        <div slot="content">删除</div>
    </ui-tooltip>
    <ui-tooltip v-if="canCopy" 
        placement="top"
        :open-delay="400"
        effect="dark"
        popper-class="drag-item"
        max-width="320"
    >
        <div class="svg-wrap"><svg-icon icon-class="tml-copy" @click.native.stop="$emit('copy')" /></div>
        <div slot="content">复制</div>
    </ui-tooltip>
    <ui-tooltip placement="top" 
        :open-delay="400"
        effect="dark"
        popper-class="drag-item"
        max-width="320"
    >
        <div class="svg-wrap"><svg-icon icon-class="tml-drag" :class="dragPoint" /></div>
        <div slot="content">长按拖动</div>
    </ui-tooltip>
</div>
</template>

<script>
import {  TYPE_ELSE_EVALUATION  } from '@/package/template-center/model/const';
import { TYPE_GROUP_INTERVIEW_ASSESSMENT } from '../../model/const';
export default {
    name: 'CardTools',
    inject: ['status', 'vm'],
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        dragPoint: {
            type: String,
            default: 'drag-handle'
        }
    },
    computed: {
        config() {
            const id = this.item?.id;
            return this.vm.configList[id];
        },
        isEvalutation() {
            return this.config?.type ===  TYPE_ELSE_EVALUATION || this.config?.type === TYPE_GROUP_INTERVIEW_ASSESSMENT;
        },
        canCopy() {
            return this.config?.role?.startsWith('basic-');
        }
    }
};
</script>