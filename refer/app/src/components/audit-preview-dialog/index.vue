<template>
<ui-dialog 
    v-model="show" wrap-class="ui-dialog-reset bossui-new audit-process-preview-dialog"
    style="zIndex: 1999"
    :show-footer="false"
    lock prevent-layer :prevent-confirm="true"
    title="审批流程预览"
>
    <template v-if="show" slot="content">
        <div class="audit-progress-wrap-preview dialog" :style="list.length?'':'margin-top:0'">
            <ui-pagetip v-if="type === 'loading'" style="min-height:260px;height:260px;" type="loading">
            </ui-pagetip>
            <ui-pagetip v-else-if="!list.length || type === 'empty'" style="min-height:260px;height:260px;" type="nodata">
                <template slot="text">暂无流程</template>
            </ui-pagetip>
            <Progress v-else :list="list" />
        </div>
    </template>
</ui-dialog>
</template>

<script>
import Progress from './progress.vue';
export default {   
    components: {
        Progress
    },
    data() {
        return {
            show: false,
            type: 'loading',
            list: []
        };
    },
    methods: {
        open(list) {
            if(['empty', 'loading'].includes(list)) {
                this.type = list;
            } else {
                this.type = 'list';
                this.list = list;
            }
            
            this.show = true;
        }
    }
};
</script>

<style lang="less">
.audit-process-preview-dialog {
    .dialog-container {
        width: 40%!important;
        max-width: 900px;
    }
    .dialog-body {
        margin-right: -30px;
        padding-right: 30px;
    }
}
</style>