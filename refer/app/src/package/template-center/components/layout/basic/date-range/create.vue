<template>
<div class="content">
    <slot name="card-header"></slot>
    <div class="date-input date-range">
        <div class="placeholder">开始日期</div>
        <i>-</i>
        <div class="placeholder">结束日期</div>
        <i class="ui-icon-date"></i>
    </div>
</div>
</template>
<script>
export default {
    name: 'DateRange',
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