<template>
<div class="interview-template-form base-controls">
    <div class="self-field system-field" v-if="configData">
        <h2>{{configData.name || '自定义字段'}}</h2>
        <ul v-if="curList" class="field-input-list">
            <li v-for="(item,i) in curList" :key="i">
                <span>字段名称：</span>
                <div class="temp-ui-input">
                    <ui-input v-model.trim="item.label" :maxlength="item.labelMaxLength" :placeholder="item.placeholder" :disabled="!!isDetail"></ui-input>
                    <div class="interview-temp-warning" v-if="showMessage && item.required && !item.label">
                        <i class="ui-icon-warning"></i>
                        <span>{{item.warningtip}}</span>
                    </div>
                </div>
                <i v-if="!isDetail" class="del-icon" @click="onDel(i)"></i>
            </li>
        </ul>
        <div v-if="!isDetail" class="add-btn-small" @click="addSelfField">
            <i class="ui-icon-circle-plus-outline"></i>
            <span>添加提问</span>
        </div>
    </div>
</div>
</template>

<script>

import { deepCopy } from '@/utils/object';

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
        selfFieldConfig() {
            return this.elRoot.selfFieldConfig;
        }
    },
    watch: {},
    //方法集合
    methods: {
        addSelfField() {
            let time = +new Date();
            let code = `${this.code}_${time}`;
            let json = Object.assign(deepCopy(this.selfFieldConfig), {code});
            this.curList.push(json);
        },
        onDel(i) {
            this.curList.splice(i,1);
        }

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