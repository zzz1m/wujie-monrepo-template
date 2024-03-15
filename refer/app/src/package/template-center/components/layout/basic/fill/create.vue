<template>
<div class="content">
    <slot name="card-header"></slot>
    <div class="text-area" :class="config.size === 'L' && 'large'">{{ config.placeholder }}</div>
</div>
</template>
<script>
export default {
    name: 'Fill',
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
    methods: {
        
    }
};
</script>