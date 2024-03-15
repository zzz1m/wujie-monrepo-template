<template>
<div class="">
    <slot name="title"></slot>
</div>
</template>
<script>
export default {
    name: 'Remark',
    props: {
        viewConfig: {
            type: Object,
            default: () => {}
        },
        valueConfig: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        
    },
    data() {
        return {

        };
    },
    mounted() {
    },
    methods: {

    }
};
</script>