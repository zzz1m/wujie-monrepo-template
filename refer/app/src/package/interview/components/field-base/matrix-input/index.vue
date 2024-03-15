<template>
<div class="interview-template-form order-controls">
    <div class="matrix-input common-styl" v-if="configData">
        <div class="title">
            <span class="num">{{index+1}}</span>
            <h2>{{configData.label || '-'}}</h2>
        </div>
        <ul class="children" v-if="configData.options && configData.options.length">
            <li v-for="(item, i) in configData.options" :key="i">
                <div class="sub-title">{{`${index+1}.${i+1}`}}、{{item.label || '-'}}</div>
                <div class="interview-temp-warning-box content" :class="{'required': item.required}">
                    <ui-input v-model.trim="item.value" 
                        :maxlength="item.maxlength" :placeholder="item.placeholder" 
                        :rows="4" type="textarea" :disabled="!!isDetail"></ui-input>
                    <div class="interview-temp-warning" v-if="showMessage && item.required && !item.value">
                        <i class="ui-icon-warning"></i>
                        <span>{{item.warningtip}}</span>
                    </div>
                </div>
            </li>
        </ul>

        <!-- 评估建议 -->
        <div class="judge-box" v-if="configData.evaluateInfo">
            <span class="label">评估建议：</span>
            <div class="judge-radio">
                <ui-radio-group v-model="configData.evaluateInfo.value">
                    <ui-radio v-for="(item,i) in configData.evaluateInfo.options" :key="i" :label="item.value" :disabled="!!isDetail">{{item.label}}</ui-radio>
                </ui-radio-group>
                <div class="interview-temp-warning" v-if="showMessage && configData.evaluateInfo.required && !configData.evaluateInfo.value">
                    <i class="ui-icon-warning"></i>
                    <span>{{configData.evaluateInfo.warningtip}}</span>
                </div>
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