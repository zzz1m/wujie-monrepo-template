<template>
<div class="content">
    <slot name="card-header"></slot>
    <div class="date-input">
        <span>请选择日期</span>
        <i class="ui-icon-date"></i>
    </div>
</div>
</template>
<script>
export default {
    name: 'Date',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
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