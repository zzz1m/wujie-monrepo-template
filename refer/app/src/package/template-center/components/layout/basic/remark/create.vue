<template>
<div class="content">
    <slot name="card-header"></slot>
</div>
</template>
<script>
export default {
    name: 'Remark',
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