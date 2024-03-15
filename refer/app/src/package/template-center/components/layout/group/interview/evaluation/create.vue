<template>
<div>
    <div class="content">
        评估建议：{不同访谈系统生成对应的评估建议选项}
    </div>
</div>
</template>
<script>
export default {
    name: 'EvaluationCreate',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    }
};
</script>