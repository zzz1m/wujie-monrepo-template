<template>
<div class="content">
    <div class="title">{{ config.title }}</div>
</div>
</template>
<script>
export default {
    name: 'Estimate',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    }
};
</script>