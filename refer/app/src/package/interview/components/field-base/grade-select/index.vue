<template>
<div class="interview-template-form order-controls">
    <div class="grade-select common-styl" v-if="configData">
        <!-- 评分标准 -->
        <div class="grade-intro">
            <p class="desc">评分标准：</p>
            <p v-for="(item, i) in configData.gradeIntro" :key="i">{{i+1}}、{{item}}</p>
        </div>
        <!--  -->
        <div class="grade-children">
            <div v-for="(item, i) in configData.children" :key="i">
                <div class="title">
                    <span class="num">{{i+1}}</span>
                    <h2>{{item.title || '-'}}</h2>
                </div>
                <ul class="options">
                    <li class="item" v-for="(sub, j) in item.options" :key="j">{{j+1}}、{{sub.label}}</li>
                    <div class="interview-temp-warning-box">
                        <div class="click-btns">
                            <span v-for="(sub, j) in gradeList" :key="j" @click="isDetail ? null : onGrade(item,sub)" :class="{'active': item.value === sub, 'no-disabled': !isDetail && item.value !== sub}">{{sub}}</span>
                        </div>
                        <div class="interview-temp-warning" v-if="showMessage && !String(item.value) && item.required">
                            <i class="ui-icon-warning"></i>
                            <span>{{item.warningtip}}</span>
                        </div>
                    </div>
                </ul>
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
            gradeList:[0,1,2,3,4,5]
        };
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {
        onGrade(item,sub) {
            item.value = sub;
        }
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