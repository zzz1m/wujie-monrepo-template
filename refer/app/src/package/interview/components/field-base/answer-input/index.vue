<template>
<div class="interview-template-form order-controls">
    <div class="answer-input common-styl" v-if="configData">
        <div class="title">
            <span class="num">{{index+1}}</span>
            <h2>{{configData.label || '-'}}</h2>
        </div>
        <div class="interview-temp-warning-box content" :class="{'required': configData.required}">
            <ui-input v-model.trim="configData.value" :maxlength="configData.maxlength" :placeholder="configData.placeholder" :rows="4" type="textarea" :disabled="!!isDetail" ></ui-input>
            <div class="interview-temp-warning" v-if="showMessage && configData.required && !configData.value">
                <i class="ui-icon-warning"></i>
                <span>{{configData.warningtip}}</span>
            </div>
        </div>
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
        },
        isDetail: {
            type: Number,
            default: 0 // 0 编辑 1 查看
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