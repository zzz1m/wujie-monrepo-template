<template>
<div class="tmp-group-interview">
    <!-- <slot name="title"></slot> -->
    <!-- 套件 -->
    <div class="tmp-group-interview-content">
        <div v-if="showeDel && !readonly" class="interview-delete" @click="handleRemove()">
            <svg-icon icon-class="tml-delete"></svg-icon>
        </div>
        <div>
            <div class="interview-item b-r p-l-32">
                <div class="interview-item-title">{{ viewConfig.labelName }}：</div>
                <div class="interview-item-content">
                    {{ [valueConfig[PARAM_COMMON_VALUE_CODE].userName, valueConfig[PARAM_COMMON_VALUE_CODE].userDeptName].filter(item => item).join('-') || '-' }}
                </div>
            </div>
            <div class="interview-item p-l-32">
                <div class="interview-item-title">{{ viewConfig.labelTime }}：</div>
                <div class="interview-item-content">
                    {{ valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_TIME_CODE] || '-' }}
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
    <div v-if="showAdd && !readonly" class="tmp-group-interview-footer">
        <button type="button" class="btn btn-primary btn-outline " @click="handleAdd()"><i class="ui-icon-plus"></i> 添加{{ btnNameMap[viewConfig.type] }}</button>
    </div>
    <!-- todo 底部的评估建议呢 -->
</div>
</template>
<script>
import { debounce } from '@/utils/common';
import { _commonUserSearch } from '@/services/dashboard/base';
import Mixin from '@/package/template-center/components/layout/mixins/preview.js';
import { _setValue, _keyBy } from '@/utils/util';
import ParamModel from '@/package/template-center/model/param.js';
import { 
    PARAM_GROUP_INTERVIEW_STAFF_CODE, PARAM_GROUP_INTERVIEW_TIME_CODE,
    TYPE_GROUP_INTERVIEW_ONESELF, TYPE_GROUP_INTERVIEW_SUPERIOR,
    TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION,
    TYPE_GROUP_INTERVIEW_CUSTOM
} from '@/package/template-center/model/const.js';
export default {
    name: 'InterviewRole',
    mixins: [Mixin],
    components: {
    },
    data() {
        return {
            ruleData: {},
            userList: [],
            PARAM_GROUP_INTERVIEW_STAFF_CODE: PARAM_GROUP_INTERVIEW_STAFF_CODE,
            PARAM_GROUP_INTERVIEW_TIME_CODE: PARAM_GROUP_INTERVIEW_TIME_CODE,
            btnNameMap: {
                [TYPE_GROUP_INTERVIEW_SUPERIOR]: '直属上级',
                [TYPE_GROUP_INTERVIEW_JUNIOR]: '下级角色',
                [TYPE_GROUP_INTERVIEW_COLLABORATION]: '协作方角色',
                [TYPE_GROUP_INTERVIEW_CUSTOM]: '自定义角色名'
            },
            paramVo: {},
            typeMap: {
                oneSelf: TYPE_GROUP_INTERVIEW_ONESELF       // 本人角色
            }
        };
    },
    created() {
    },
    mounted() {
        const { paramModel, vm } =  this.pageData;
        const { configList } = vm;
        this.paramVo = new ParamModel({ paramList: paramModel, configList, init: false });
    },
    computed: {
        showAdd() {
            const { viewerList } =  this.pageData.vm;
            const  { copyId, id } = this.viewItem;
            const { type, multiple } = this.viewConfig;
            if (type === TYPE_GROUP_INTERVIEW_ONESELF || !multiple) {
                return false;
            }
            if (copyId) {
                const copyLastRow = viewerList.filter(item => {
                    return item.copyId === copyId;
                }).reverse()[0]; 
                return copyLastRow.id === id;
            } else {
                const hasCopy = viewerList.some(item => {
                    return item.copyId === id;
                }); 
                return !hasCopy;
            }
        },
        showeDel() {
            const { viewerList } =  this.pageData.vm;
            const  { id } = this.viewItem;
            const hasCopy = viewerList.some(item => {
                return item.copyId === id;
            }); 

            // 如果是 原型 && 非必填 && 没有拷贝对象 || 是拷贝对象 
            if (!this.valueConfig.copyId && !this.viewConfig.required && !hasCopy || this.valueConfig.copyId) {
                return true;
            }
            return false;
        }
    },
    watch: {
        'valueConfig.value': {
            immediate: true,
            deep: true,
            handler(newval, oldval) {
                if (newval && newval[PARAM_GROUP_INTERVIEW_STAFF_CODE] && newval.userName && !this.userList.length) {
                    this.userList = [{
                        label: newval.userName,
                        id: newval[PARAM_GROUP_INTERVIEW_STAFF_CODE]
                    }];
                }
            }
        }
    },
    methods: {
        queryUser: debounce(300, async function(key) {
            try {
                if (!key) return;
                const { success, root } = await _commonUserSearch({ key });
                if (success) {
                    this.userList = (root || []).map(user => {
                        return {
                            ...user,
                            label: `${[user.name, user.deptName, user.email].filter(item => item).join('-')}`
                        };
                    });
                }
            } catch {}
        }),
        /**
         * @description: 修改人员
         * @param {String} value  人员id
         */
        handleUserChange(value) {
            let currentUser = this.userList.find(item => item.id === value);
            let viewValue = {
                ...this.valueConfig[this.PARAM_COMMON_VALUE_CODE],
                [PARAM_GROUP_INTERVIEW_STAFF_CODE]: value,
                userName: currentUser?.name || ''
            };
            this.handleChange(viewValue);
        },
        /**
         * @description: 修改日期
         * @param {String} value  日期
         */
        handleDateChange(value) {
            let viewValue = {
                ...this.valueConfig[this.PARAM_COMMON_VALUE_CODE],
                [PARAM_GROUP_INTERVIEW_TIME_CODE]: value
            };
            this.handleChange(viewValue);
        },
        /**
         * @description 组件值改变触发事件
         * @param {Array} value 修改的值
         */
        handleChange(value) {
            this.$emit('on-change', this.viewId, value);
        },
        // 新增视图
        async handleAdd() {
            const { vm, watchModel } =  this.pageData;
            const { viewerList } = vm;
            vm.copy(this.viewItem, viewerList, (res) => {
                this.paramVo.addParam({
                    ...res,
                    sort: +new Date()
                });
            });
            // 找到copy源视图id
            const copyId = this.viewItem.copyId || this.viewItem.id;
            // 复制出来的视图
            const copyItem = viewerList.filter(viewer => viewer.copyId == copyId).slice(-1)[0];
            if(copyItem) {
                // 复制关联逻辑配置
                watchModel.$relation.copyRelationGroup(copyItem);
            }
        },
        // 删除视图
        handleRemove() {
            this.$dialog({
                title: '删除模块',
                content: '是否确认删除，删除后不可恢复',
                type: 'warning',
                onConfirm: () => {
                    const { vm } =  this.pageData;
                    const { viewerList } = vm;
                    vm.remove(this.viewItem, viewerList, true);
                    this.paramVo.removeParam(this.viewId);
                }
            });
        }
    }
};
</script>