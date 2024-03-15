<template>
<div class="content">
    <div class="title">{{ config.title  }}</div>
    <div class="sub-area">
        <div class="drag-wrap">
            <div class="create-dashed-box">
                目标信息：{获取对应目标详情}
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'TargetInfoCreate',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    }
};
</script>