<template>
<div class="interview-template-form base-controls">
    <div class="grade-select" v-if="configData">

        <!-- 评分说明 -->
        <table class="temp-table inner-item-width intro-table border-top-none" border="0" cellpadding="0" cellspacing="0" rules="all" >
            <tr>
                <td class="title"></td>
                <td>
                    <div class="font-bold">评分标准：</div>
                    <div v-for="(item, i) in configData.gradeIntro" :key="i" class="mr-t-8">{{i+1}}、{{item || '-'}}</div>
                </td>
            </tr>
        </table>

        <!-- 评分项 -->
        <table v-for="(item,i) in configData.children" :key="i" class="temp-table inner-item-width opts-table border-top-none" border="0" cellpadding="0" cellspacing="0" rules="all">
            <tr>
                <td rowspan="2" class="title"></td>
                <td rowspan="2" class="title align-top">{{'评分项'}}</td>
                <td colspan="2" class="cont inner-item-label">{{`${i+1}、${item.title || '-'}`}}</td>
            </tr>
            <tr>
                <td class="title align-top item-desc">释义</td>
                <td class="item-info">
                    <div v-for="(v,j) in item.options" :key="j" :class="{'mr-t-20': j}">
                        {{j+1}}.{{v.label || '-'}}
                    </div>
                </td>
            </tr>
        </table>

        <!-- 设置 -->
        <table class="temp-table inner-item-width set-table border-top-none" border="0" cellpadding="0" cellspacing="0" rules="all" >
            <tr class="bg-gray">
                <td class="title" style="background: #fff;"></td>
                <td class="cont desc">
                    
                    <span>是否必填：</span>
                    <span class="value">{{configData.required ? '是' : '否'}}</span>

                    <span>最低分：</span>
                    <span class="value">{{configData.minScore || 0}}</span>

                    <span>最高分：</span>
                    <span class="value">{{configData.maxScore || 0}}</span>

                    <span>分支精度：</span>
                    <span class="value">{{configData.scorePrecision || '-'}}</span>

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