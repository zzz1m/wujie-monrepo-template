<template>
<div
    v-if="showView"
    class="tmp-form-item" 
    :class="`tmp-form-type-${viewConfig.role || ''} tmp-form-type-${viewConfig.type} ${errorMsg && 'tmp-form-has-error'}`"
    :style="{
        width: `${viewItem.splits}%`
    }"
>   
    <component 
        :is="viewConfig.role && viewConfig.role.startsWith('relation-') ? viewConfig.role :viewConfig.type"
        :view-item="viewItem"
        :view-config="viewConfig"
        :value-config="pageData.paramModel[viewItem.id] || {value: {}}"
    >
        <slot></slot>
        <template slot="title">
            <div class="tmp-form-item-wrapper">
                <!-- 标题 -->
                <h5 v-if="viewConfig.title" class="tmp-form-item-title"><span class="tmp-form-item-sort">{{ viewConfig.showSerial ? viewItem.serialNo : '' }}</span>{{ viewConfig.title }}</h5>
            </div>
        </template>
    </component>
    <div v-if="errorMsg" class="tmp-form-error">{{ errorMsg }}</div>
</div>
</template>
<script>
import FillCompoents from '@/package/template-center/components/busines/render-components-view.js';
import { 
    TYPE_GROUP_INTERVIEW_SUPERIOR,
    TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION
} from '@/package/template-center/model/const.js';
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
        },
        showView() {
            const interviewTypeList = [TYPE_GROUP_INTERVIEW_SUPERIOR, TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION];
            const isInterview = interviewTypeList.includes(this.viewConfig.type);
            return !this.viewConfig.hidden 
                && !(isInterview && !this.pageData.paramModel[this.viewItem.id]);  // !(访谈套件 && 并且没有值)
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

    }
};
</script>