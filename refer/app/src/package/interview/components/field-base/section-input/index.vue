<template>
<div class="interview-template-form order-controls">
    <div class="section-input common-styl" v-if="configData">
       <b class="before"></b>
       <h2>{{configData.label || '-'}}</h2>
       <b class="after"></b>
    </div>
</div>
</template>

<script>

export default {
    components: {},
    props: {
        configData: {
            type: Object,
            default: null
        },
        index: {
            type: Number,
            default: 0
        },
        showMessage: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {

    },
    created() {

    },
    mounted() {

    },
};
</script>
<style lang='less' scoped>
//@import url();

</style>