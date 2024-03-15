<template>
<div class="tmp-columns">
    <!-- 这是分栏 -->
    <slot></slot>
</div>
</template>
<script>
export default {
    name: 'ColumnsView',
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