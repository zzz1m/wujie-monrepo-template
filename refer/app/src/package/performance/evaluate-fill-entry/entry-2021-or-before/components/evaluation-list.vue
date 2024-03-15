<template>
<div class="block-evaluation-list">
    <div class="block-evaluation-list-label">{{ label }}</div>
    <div class="block-evaluation-list-content">
        <slot></slot>
    </div>
    <slot name="footer"></slot>
</div>
</template>

<script>
export default {
    name: 'EvaluationList',
    props: {
        label: {
            type: String,
            required: true
        }
    }
};
</script>