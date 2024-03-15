<template>
<div class="interview-template-form base-controls">
    <table class="matrix-input temp-table inner-item-width border-top-none" v-if="configData" border="0" cellpadding="0" cellspacing="0" rules="all" >
        <tr>
            <td :rowspan="rowspanNum" class="title"></td>
            <td :rowspan="rowspanNum" class="title align-top">{{configData.typeDesc || '矩阵问答'}}</td>
            <td class="cont inner-item-label">{{configData.label || '-'}}</td>
        </tr>
        <tr class="bg-gray">
            <td class="cont desc">
                <span>显示逻辑：</span>
                <span class="value">{{configData.switch ? `开，${configData.switchCondition || '-'}` : '关'}}</span>
            </td>
        </tr>
        <tr v-for="(item,i) in configData.options" :key="i">
           <td>
                <table class="matrix-opts-table" border="0" cellpadding="0" cellspacing="0" rules="all">
                    <tr class="border-bottom">
                        <td class="cont inner-item-label">{{item.label || '-'}}</td>
                    </tr>
                    <tr class="bg-gray">
                        <td class="cont desc">
                            <span>是否必填：</span>
                            <span class="value">{{item.required ? '是' : '否'}}</span>

                            <span>字数限制：</span>
                            <span class="value">{{item.maxlength}}字符</span>

                            <span>提示文案：</span>
                            <span class="value">{{item.placeholder || '-'}}</span>
                        </td>
                    </tr>
                </table>
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
        }
    },
    data() {
        return {

        };
    },
    computed: {
        rowspanNum() {
            return 2 + this.configData.options.length * 1;
        }
    },
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