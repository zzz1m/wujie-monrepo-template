<template>
<div class="interview-template-form base-controls">
    <table class="radio-select temp-table inner-item-width border-top-none" v-if="configData" border="0" cellpadding="0" cellspacing="0" rules="all">
        <tr>
            <td rowspan="3" class="title"></td>
            <td rowspan="3" class="title align-top">{{configData.typeDesc || '单选'}}</td>
            <td class="cont inner-item-label">{{configData.label || '-'}}</td>
        </tr>
        <tr class="bg-gray">
            <td class="cont desc">

                <span>是否必填：</span>
                <span class="value">{{configData.required ? '是' : '否'}}</span>

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
        <tr>
            <td class="opts-box">
                <table border="0" cellpadding="0" cellspacing="0" rules="all" class="opt-table">
                    <tr v-for="(item,i) in configData.options" :key="i">
                        <td class="align-top opt-label">选项{{i+1}}：{{item.label || '-'}}</td>
                        <td class="bg-gray">
                            <div>
                                <span class="opt-desc">选择后是否添加输入框：</span>
                                <span class="opt-label">{{item.addinput ? '是' : '否'}}</span>
                            </div>

                            <template v-if="item.addinput">
                                <div class="mr-t-8">
                                    <span class="opt-desc">提示文案：</span>
                                    <span class="opt-label">{{item.inputplaceholder || '-'}}</span>
                                </div>

                                <div class="mr-t-8">
                                    <span class="opt-desc">输入框是否必填：</span>
                                    <span class="opt-label">{{item.required ? '是' : '否'}}</span>
                                </div>
                            </template>
                            
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