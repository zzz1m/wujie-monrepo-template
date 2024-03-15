<template>
<div class="tmp-group-interview">
    <!-- <slot name="title"></slot> -->
    <!-- 套件 -->
    <div v-if="hasValue" class="tmp-group-interview-content">
        <div v-if="showeDel && !readonly" class="interview-delete" @click="handleRemove()">
            <svg-icon icon-class="tml-delete"></svg-icon>
        </div>
        <div class="tmp-form-item">
            <div class="interview-item p-l-32">
                <div class="interview-item-title">{{ viewConfig.labelName }}：</div>
                <div class="interview-item-content">
                    <ui-select
                        v-model="valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_STAFF_CODE]"
                        filterable clearable :disabled="viewConfig.type === typeMap.oneSelf || readonly"
                        placeholder="请选择"
                        transfer 
                        @on-query-change="queryUser"
                        @input="handleUserChange"
                    >
                        <ui-option v-for="(item, key) in userList"
                            :key="key" :value="item.id" :label="[item.name, item.deptName].filter(item => item).join('-')"
                        >{{ item.label }}</ui-option>
                    </ui-select>
                </div>
            </div>
            <div class="interview-item">
                <div class="interview-item-title">{{ viewConfig.labelTime }}：</div>
                <div class="interview-item-content">
                    <ui-date-picker v-model="valueConfig[PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_TIME_CODE]"
                        type="date" placeholder="请选择日期" align="left"
                        clearable value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                        :disabled="readonly" @input="handleDateChange"
                    >
                    </ui-date-picker>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
    <div v-if="showAdd && !readonly" class="tmp-group-interview-footer">
        <button type="button" class="btn btn-primary btn-outline " @click="handleAdd()"><i class="ui-icon-plus"></i> 添加{{ viewConfig.title }}</button>
    </div>
    <!-- todo 底部的评估建议呢 -->
</div>
</template>
<script>
import { debounce } from '@/utils/common';
import { _commonUserSearch } from '@/services/dashboard/base';
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';
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
        hasValue() {
            return this.pageData.paramModel[this.viewId];
        },
        showAdd() {
            const { viewerList } =  this.pageData.vm;
            const  { copyId, id } = this.viewItem;
            const { type, multiple } = this.viewConfig;
            // 如果全被删除了 直接显示添加按钮 
            if (!this.hasValue) {
                return true;
            }
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
        },
        viewItemsMap() {
            return _keyBy([this.viewItem], 'id', 'children');   
        }
    },
    watch: {
        'valueConfig.value': {
            immediate: true,
            deep: true,
            handler(newval, oldval) {
                if (newval && newval[PARAM_GROUP_INTERVIEW_STAFF_CODE] && newval.userName && !this.userList.length) {
                    this.userList = [{
                        label: [newval.userName, newval.userDeptName].filter(item => item).join('-'),
                        name: newval.userName,
                        deptName: newval.userDeptName,
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
                userName: currentUser?.name || '',
                userDeptName: currentUser?.deptName
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
            // 如果是模板模块 检测是不是被添加值被移除了 如果被移除了 直接重新生成值
            if (!this.valueConfig.copyId && !this.hasValue) {
                Object.values(this.viewItemsMap).forEach((item) => {
                    this.paramVo.addParam({
                        ...item
                    });
                });
                // 如果是本人角色 添加默认赋值逻辑
                if (this.viewConfig.type === TYPE_GROUP_INTERVIEW_ONESELF) {
                    let valueList = (this.pageData.businessData.interviewRoleList || []).filter(item => item.code === TYPE_GROUP_INTERVIEW_ONESELF);
                    let selfValueObj = valueList ? valueList[0] : {};
                    if (selfValueObj?.data?.id) {
                        this.$nextTick(() => {
                            this.valueConfig[this.PARAM_COMMON_VALUE_CODE][PARAM_GROUP_INTERVIEW_STAFF_CODE] = selfValueObj.data.id;
                            this.userList = [{
                                label: selfValueObj.data.name,
                                name: selfValueObj.data.name,
                                deptName: '',
                                id: selfValueObj.data.id
                            }];
                        });
                    }
                }
            }
            // 复制模板 生成新的配置
            else {
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
                    // 如果是模板模块 不真删除 值删除valueConfig
                    if (!this.valueConfig.copyId) {
                        this.paramVo.removeParam(this.viewId);
                        Object.keys(this.viewItemsMap).forEach((id) => {
                            this.$emit('on-validate', id);
                        });
                    }
                    else {
                        vm.remove(this.viewItem, viewerList, true);
                        this.paramVo.removeParam(this.viewId);
                    }
                   
                }
            });
        }
    }
};
</script>