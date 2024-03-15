<template>
<div class="interview-template-form base-controls">
    <div class="section-part" v-if="configData">
        <span class="num">{{index+1}}</span>
        <h2>{{configData.name || '-'}}</h2>
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
            default: 1
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