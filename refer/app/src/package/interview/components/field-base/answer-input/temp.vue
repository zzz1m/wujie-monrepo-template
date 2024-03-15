<template>
<div class="interview-template-form base-controls">
    <table class="answer-input temp-table inner-item-width border-top-none" v-if="configData" border="0" cellpadding="0" cellspacing="0" rules="all" >
        <tr>
            <td rowspan="2" class="title"></td>
            <td rowspan="2" class="title align-top">{{configData.typeDesc || '问答'}}</td>
            <td class="cont inner-item-label">{{configData.label || '-'}}</td>
        </tr>
        <tr class="bg-gray">
            <td class="cont desc">

                <span>是否必填：</span>
                <span class="value">{{configData.required ? '是' : '否'}}</span>

                <span>字数限制：</span>
                <span class="value">{{configData.maxlength}}字符</span>

                <div v-if="configData.placeholder" class="desc-detail">
                    <span>提示文案：</span>
                    <span class="value">{{configData.placeholder}}</span>
                </div>
                <template v-else>
                    <span>提示文案：</span>
                    <span class="value">-</span>
                </template>

                <div v-if="configData.switch" class="desc-detail">
                    <span>显示逻辑：</span>
                    <span class="value">{{`开，${configData.switchCondition}`}}</span>
                </div>
                <template v-else>
                    <span>显示逻辑：</span>
                    <span class="value">关</span>
                </template>

            </td>
        </tr>
    </table>
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