<template>
<div class="interview-template-form order-controls">
    <ul class="self-field" v-if="configData">
        <template v-if="curList && curList.length">
            <li v-for="(item,i) in curList" :key="i">
                <div class="label">{{item.label}}：</div>
                <div class="temp-ui-input">
                    <ui-input v-model.trim="item.value" :maxlength="item.valueMaxLength" :placeholder="item.valuePlaceholder" type="textarea" :rows="4" :disabled="!!isDetail" autosize @on-blur="onBlur(i)"></ui-input>
                    <div class="interview-temp-warning" v-if="showMessage && item.required && !item.value">
                        <i class="ui-icon-warning"></i>
                        <span>{{item.valueWarningtip}}</span>
                    </div>
                </div>
            </li>
        </template>
    </ul>
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
        code: {
            type: [Number, String],
            default: ''
        },
        // showMessage: {
        //     type: Boolean,
        //     default: false
        // },
        // isDetail: {
        //     type: Number,
        //     default: 0 // 1 查看 0 编辑
        // }
    },
    inject:['elRoot'],
    data() {
        return {
            curList:[]
        };
    },
    computed: {
        showMessage() {
            return this.elRoot.showMessage;
        },
        isDetail() {
            return this.elRoot.isDetail; 
        },
    },
    watch: {},
    //方法集合
    methods: {
        onBlur(i) {
            let value = '';
            value = this.curList[i].value.replace(/\s/g,'');
            if (!value) { // 纯空格 清空
                this.curList[i].value = '';
            } 
        },
    },
    created() {
        this.curList = this.configData.options || [];
    },
    mounted() {

    },
};
</script>
<style lang='less' scoped>
//@import url();

</style>