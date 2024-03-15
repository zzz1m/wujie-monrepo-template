<template>
<div class="interview-template-form base-controls">
    <table class="section-input temp-table border-top-none" v-if="configData" border="0" cellpadding="0" cellspacing="0" rules="all" >
        <tr>
            <td rowspan="2" class="title">{{configData.typeDesc || '段落标题'}}</td>
            <td class="cont label">{{configData.label || '-'}}</td>
        </tr>
        <tr class="bg-gray">
            <td class="cont desc">
                <span>显示逻辑：</span>
                <span class="value">{{configData.switch ? `开，${configData.switchCondition || '-'}` : '关'}}</span>
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