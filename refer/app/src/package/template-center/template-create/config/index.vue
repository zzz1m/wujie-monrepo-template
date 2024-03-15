<template>
<div class="comp-config-panel" :class="{ show: !!activeItem }">
    <div class="panel-title">
        <span>{{ activeCode? '选项': '更多' }}设置</span>
        <i class="ui-icon-close" style="cursor:pointer" @click="close"></i>
    </div>
    <ui-form 
        v-if="activeConfig && (isOption || activeConfig.role) && !isEvaluation"
        ref="form" class="item-config-form"
        :model="activeConfig" :label-width="0" :inline="false"
        @submit.native.prevent
    >   
        <OptionConfig v-if="isOption" :config="activeConfig" />
        <template v-else>
            <CommonConfig v-if="isBasicComp" :config="activeConfig" />
            <component :is="activeConfig.role.startsWith('basic-')? activeConfig.type: activeConfig.role" v-if="hasCustom" :config="activeConfig" v-bind="{ relationList, groupList, moduleList }" v-on="$listeners" />
            <ColSplitsConfig v-if="parentIsColumn" :config="activeConfig" />
            <InterviewCustomConfig v-if="isInteviewCustom" :config="activeConfig" />
        </template>
    </ui-form>
    <Empty v-else />
</div>
</template>

<script>
import {
    TYPE_BASIC_CHECKBOX, TYPE_BASIC_RADIO,
    TYPE_BASIC_COLUMNS, TYPE_GROUP_INTERVIEW_CUSTOM, TYPE_ELSE_EVALUATION
} from '@/package/template-center/model/const';

import CommonConfig from './basic/common.vue';
import ColSplitsConfig from './basic/col-splits.vue';
import OptionConfig from './basic/option.vue';
import Empty from './basic/empty.vue';
import InterviewCustomConfig from './group/interview-custom.vue';
import comps from './index.js';

export default {
    name: 'ConfigPannel',
    components: {
        Empty,
        CommonConfig, ColSplitsConfig, OptionConfig,
        InterviewCustomConfig,
        ...comps
    },
    inject: ['vm'],
    props: {
        relationList: { type: Array, default: () => []},
        groupList: { type: Array, default: () => []},
        moduleList: { type: Array, default: () => []},
        // 右侧面板选中的类型：控件comp | 组件选项option
        // 选中的控件id
        activeId: { type: String, default: null },
        // 选中的控件的选项code
        activeCode: { type: String, default: null }
    },
    computed: {
        hasCustom() {
            return Object.keys(comps).some(key => this.activeConfig?.type === key || this.activeConfig?.role === key);
        },
        isEvaluation() {
            return this.activeConfig && this.activeConfig.type === TYPE_ELSE_EVALUATION;
        },
        // 判断是否是基础控件
        isBasicComp() {
            return !this.activeCode && this.activeConfig.role && this.activeConfig.role.startsWith('basic-');
        },
        activeItem() {
            return this.activeId && this.vm.configList[this.activeId];
        },
        activeConfig() {
            if(!this.activeCode) return this.activeItem;
            if(!this.activeItem) return null;
            const options = this.activeItem.options;
            return this.activeCode && options.find(t => t.code === this.activeCode);
        },
        parentIsColumn() {
            if(this.activeCode) return false;
            const parent = this.activeConfig.parentId && this.vm.configList[this.activeConfig.parentId];
            return parent && parent.type === TYPE_BASIC_COLUMNS;
        },
        isOption() {
            return this.activeCode && [TYPE_BASIC_CHECKBOX, TYPE_BASIC_RADIO].includes(this.activeItem.type);
        },
        isInteviewCustom() {
            return this.activeConfig?.type === TYPE_GROUP_INTERVIEW_CUSTOM;
        }
    },
    methods: {
        close() {
            this.$emit('clearConfig');
        }
    }
};
</script>