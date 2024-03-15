<template>
<div class="template-preview-page">
    <TemplateFillPage ref="templateFillPage" />
</div>
</template>
<script>
import TemplateFillPage from '@/package/template-center/template-fill/index.vue';

export default {
    name: 'PreviewPage',
    components: {
        TemplateFillPage
    },
    data() {
        return {
        };
    },
    inject: ['vm', 'relation'],
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.showDialog = true;
            const { configList, viewerList } = this.vm;
            const { relationGroupList } = this.relation;
            this.$refs.templateFillPage.initPage({
                viewerList,
                configList,
                relationGroupList
            });
        },
        validateAll() {
            return this.$refs.templateFillPage.validateAll();
        },
        getValue() {
            return this.$refs.templateFillPage.getValue();
        }
    }
};
</script>