<template>
    <div class="item-title-wrap">
        {{configData.label}}
        <!-- {{configData.typeDesc+ '-' + configData.label}} -->
    </div>
</template>

<script>
export default {
    props: {
        configData: {
            type: Object,
            default: null
        }
    },
    data(){
        return{   
        };
    },
    methods:{
    }

};
</script>

<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';
</style>