<template>
<div class="tmp-columns">
    <!-- 这是评委评估 -->
    <slot></slot>
</div>
</template>
<script>
export default {
    name: 'Estimate',
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