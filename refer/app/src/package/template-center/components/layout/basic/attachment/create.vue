<template>
<div class="content">
    <slot name="card-header"></slot>
    <slot>
        <div class="upload">
            <div class="btn">
                <svg-icon icon-class="it-upload"></svg-icon>上传附件
            </div>
        </div>
        <div class="prompt-view">
            支持格式：{{ config.suffix.join('、') }}；单个文件不超过{{ config.singleSizeLimit }}M；最多上传{{ config.totalLimit }}个文件
        </div>
    </slot>
</div>
</template>
<script>
export default {
    name: 'Attachment',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    directives: {
        
    },
    data() {
        return {
            
        };
    },
    created() {
        
    },
    computed: {
        
    },
    methods: {

    }
};
</script>