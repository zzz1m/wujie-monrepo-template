<template>
<div class="tmp-columns">
    <!-- <slot name="title"></slot> -->
    <!-- 这是分栏 -->
    <slot></slot>
</div>
</template>
<script>
export default {
    name: 'Columns',
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