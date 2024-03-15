<template>
<div class="interview-template-form base-controls">
    <div class="role-part" v-if="configData">
        <div class="role-txt" v-if="configData.roleId">
            <span class="label">角色：{{configData.roleName || '-'}}</span>
            <div class="add-btn-small" v-if="configData.roleId !== 1 && !isDetail" @click="onDelRole">
                <i class="icon"></i>
                <span>删除角色</span>
            </div>
        </div>

        <div class="radio-box">
            <span class="label">访谈格式：</span>
            <ui-radio-group v-model="configData.level" @on-change="onLevelChange">
                <ui-radio :label="2" :disabled="!!isDetail">二级提问</ui-radio>
                <ui-radio :label="1" :disabled="!!isDetail">一级提问</ui-radio>
            </ui-radio-group>
        </div>

        <div class="quest-box">
            <!-- 二级提问 -->
            <ul v-if="configData.level === 2" class="parent-list">
                <template v-if="curList && curList.length">
                    <li v-for="(item,i) in curList" :key="i">
                        <!-- 父问题 -->
                        <div class="item">
                                <span class="label">{{i+1}}</span>
                                <div class="temp-ui-input">
                                    <ui-input v-model.trim="item.label" :maxlength="item.labelMaxLength" :placeholder="item.placeholder" @on-focus="onFocus" :disabled="!!isDetail"></ui-input>
                                    <div class="interview-temp-warning" v-if="showMessage && item.required && !item.label">
                                        <i class="ui-icon-warning"></i>
                                        <span>{{item.warningtip}}</span>
                                    </div>
                                </div>
                                <i v-if="!isDetail" class="del-icon" @click="onDel(i,-1)"></i>
                        </div>
                        <!-- 子问题 -->
                        <ul class="children-list">
                                <template v-if="item.children && item.children.length">
                                    <li class="item" v-for="(obj,j) in item.children" :key="j">
                                        <span class="label small">{{`${i+1}.${j+1}`}}</span>
                                        <div class="temp-ui-input">
                                            <ui-input v-model.trim="obj.label" :maxlength="obj.labelMaxLength" :placeholder="obj.placeholder" @on-focus="onFocus" :disabled="!!isDetail"></ui-input>
                                            <div class="interview-temp-warning" v-if="showMessage && obj.required && !obj.label">
                                                <i class="ui-icon-warning"></i>
                                                <span>{{item.warningtip}}</span>
                                            </div>
                                        </div>
                                        <i v-if="!isDetail" class="del-icon" @click="onDel(i,j)"></i>
                                    </li>
                                </template>
                                <div v-if="!isDetail" class="add-btn-small" @click="addQuest(i)">
                                    <i class="ui-icon-circle-plus-outline"></i>
                                    <span>添加子问题</span>
                                </div>
                        </ul>
                    </li>
                </template>
            </ul>

            <!-- 一级提问 -->
            <ul v-else>
                <template v-if="curList && curList.length">
                    <li class="item" v-for="(item,i) in curList" :key="i">
                        <span class="label">{{i+1}}</span>
                        <div class="temp-ui-input">
                            <ui-input v-model.trim="item.label" :maxlength="item.labelMaxLength" :placeholder="item.placeholder" @on-focus="onFocus" :disabled="!!isDetail"></ui-input>
                            <div class="interview-temp-warning" v-if="showMessage && item.required && !item.label">
                                <i class="ui-icon-warning"></i>
                                <span>{{item.warningtip}}</span>
                            </div>
                        </div>
                        <i v-if="!isDetail" class="del-icon" @click="onDel(i,-1)"></i>
                    </li>
                </template>
            </ul>

            <div v-if="!isDetail" class="quest-btn">
                <div class="add-btn-big outline" @click="addQuest(-1)">
                    <i class="ui-icon-circle-plus-outline"></i>
                    <span>添加问题</span>
                </div>
                <!-- <div class="add-btn-big outline">
                    <i class="ti-trash"></i>
                    <span>删除模块</span>
                </div> -->
            </div>
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
            curList: [],
            // configObj: {
            //     code: '',
            //     label: '',
            //     value: '',
            //     placeholder: '请填写访谈问题，100字符以内',
            //     warningtip: '请设置访谈问题',
            //     labelMaxLength: 100,
            //     valuePlaceholder: '请填写内容，2000字符以内',
            //     valueWarningtip: '请填写访谈问题',
            //     valueMaxLength: 2000,
            //     required: true
            // },
        };
    },
    computed: {
        showMessage() {
            return this.elRoot.showMessage;
        },
        isDetail() {
            return this.elRoot.isDetail; 
        },
        configObj() {
            return this.elRoot.configBaseObj;
        }
    },
    watch: {
    },
    //方法集合
    methods: {
        onLevelChange() {
            // console.log('=====',this.configData.level);
            let json = {};
            let list = [];
            let time = +new Date();
            if (this.configData.level === 2) { // 二级提问
                let sonjson = Object.assign(deepCopy(this.configObj), {code: `item_level2_${time}`});
                json = Object.assign(deepCopy(this.configObj),{code: `list_level2_${time}`,children: [sonjson]});
            } else {
                json = Object.assign(deepCopy(this.configObj),{code: `list_level1_${time}`,children: null});
            }
            list.push(json);
            this.curList = list;

            // console.log('====curList',this.curList);
            this.$emit('update-question', {list: this.curList, code: this.code});            
        },
        onDelRole() {
            let _this = this;
            this.$dialog({
                title: '删除角色',
                content: '删除角色后，角色下配置的问题将全部删除，是否确认删除此角色？',
                type: 'warning',
                preventConfirm: true,
                onConfirm: function() {
                    
                    _this.$emit('del-role', _this.code);
                    this.hide();

                }
            });
        },
        onDel(index,sonindex) {
            // console.log(index,sonindex);
            if (sonindex > -1) { // 删除子问题
                this.curList[index].children.splice(sonindex,1);
            } else {
                this.curList.splice(index,1);
            }
            this.$emit('update-question', {list: this.curList, code: this.code});
            
        },
        addQuest(type) {
            let json = {};
            let time = +new Date();
            if (type > -1) { // 添加子问题
                json = Object.assign(deepCopy(this.configObj),{code: `item_level2_${time}`});
                this.curList[type].children.push(json);
                this.$emit('update-question', {list: this.curList, code: this.code});
                return;
            }

            ///// 添加父问题
            if (this.configData.level === 2) { // 二级提问
                let sonjson = Object.assign(deepCopy(this.configObj), {code: `item_level2_${time}`});
                json = Object.assign(deepCopy(this.configObj),{code: `list_level2_${time}`,children: [sonjson]});
            } else {
                json = Object.assign(deepCopy(this.configObj),{code: `list_level1_${time}`,children: null});
            }

            this.curList.push(json);
            // console.log('=====curLsit',this.curList);
            this.$emit('update-question', {list: this.curList, code: this.code});
        },

        onBlur() {

        },
        onFocus() {
            // console.log('=====on focus');
        }
    },
    created() {
        this.curList = this.configData.questionList;

        // // console.log('====3333 attr',this.$attrs);
    },
    mounted() {

    },
};
</script>
<style lang='less' scoped>
//@import url();

</style>