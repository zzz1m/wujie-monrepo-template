<template>
<div class="template-preview-page">
    <TemplateFillPage ref="templateFillPage" />
</div>
</template>
<script>
import TemplateFillPage from '@/package/template-center/template-preview/index.vue';
import { paramModel, viewerList, configList} from './mock.js';
export default {
    name: 'PreviewPage',
    components: {
        TemplateFillPage
    },
    data() {
        return {
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$refs.templateFillPage.initPage({
                viewerList,
                configList,
                paramModel,
                relationGroupList: [] 
            });
        }
    }
};
</script>