<template>
    <div class="interview-template-form order-controls">
        <div v-if="configData" class="role-part" :class="{ 'section-three': !configData.roleId }">
            <!-- 角色 -->
            <div v-if="configData.roleId" class="role-box">
                <div v-if="configData.staffInfo" class="item">
                    <span class="label">{{ configData.staffInfo.label }}：</span>
                    <div class="temp-picker-ui">
                        <!-- 本人 -->
                        <ui-input v-if="configData.roleId === 1" v-model.trim="configData.staffInfo.value" disabled></ui-input>
                        <!-- 其他角色 -->
                        <v-select
                            v-else
                            v-model="configData.staffInfo.value"
                            class="select-email"
                            :class="{ 'is-ie': isIE, 'empty-role-info': !configData.staffInfo.value }"
                            :disabled="!!isDetail"
                            :filterable="true"
                            label="name"
                            :options="showUsersData"
                            placeholder="请输入"
                            :searchable="true"
                            :taggable="false"
                            @input="inputEmails"
                            @search="filterEmails"
                        >
                        </v-select>

                        <div v-if="showMessage && configData.staffInfo.required && !configData.staffInfo.value" class="interview-temp-warning">
                            <i class="ui-icon-warning"></i>
                            <span>{{ configData.staffInfo.warningtip }}</span>
                        </div>
                    </div>
                </div>
                <!-- 访谈时间 -->
                <div v-if="configData.interviewDate && isRender" class="item">
                    <span class="label">{{ configData.interviewDate.label }}：</span>
                    <div class="temp-picker-ui" :class="{dateDisabled: !!isDetail}">
                        <ui-date-picker
                            v-model="configData.interviewDate.value"
                            :disabled="!!isDetail"
                            placeholder="请选择日期"
                            value-format="yyyy-MM-dd"
                            @on-blur="dateBlur"
                            @on-change="dateChange"
                        />
                        <div
                            v-if="showMessage && configData.interviewDate.required && !configData.interviewDate.value"
                            class="interview-temp-warning"
                        >
                            <i class="ui-icon-warning"></i>
                            <span>{{ configData.interviewDate.warningtip }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="configData.roleId !== 1 && !isDetail" class="del-btn">
                    <div class="add-btn-small" @click="onDel">
                        <i></i>
                        <span>删除</span>
                    </div>
                </div>
            </div>

            <!-- 问题 -->
            <div class="quest-box">
                <!-- 二级提问 -->
                <ul v-if="configData.level === 2" class="parent-list">
                    <template v-if="curList && curList.length">
                        <li v-for="(item, i) in curList" :key="i">
                            <!-- 父问题 -->
                            <div class="item">
                                <span class="label">{{ i + 1 }}</span>
                                <h2>{{ item.label }}</h2>
                            </div>
                            <!-- 子问题 -->
                            <ul class="children-list">
                                <template v-if="item.children && item.children.length">
                                    <li v-for="(obj, j) in item.children" :key="j">
                                        <div class="item">
                                            <span class="label small">{{ `${i + 1}.${j + 1}` }}</span>
                                            <h2 class="small">{{ obj.label }}</h2>
                                        </div>

                                        <div class="temp-ui-input">
                                            <ui-input
                                                v-model="obj.value"
                                                autosize
                                                :disabled="!!isDetail"
                                                :maxlength="obj.valueMaxLength"
                                                :placeholder="obj.valuePlaceholder"
                                                :rows="4"
                                                type="textarea"
                                                @on-blur="onBlur(i, j)"
                                            ></ui-input>
                                            <div v-if="showMessage && obj.required && !obj.value" class="interview-temp-warning">
                                                <i class="ui-icon-warning"></i>
                                                <span>{{ obj.valueWarningtip }}</span>
                                            </div>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </li>
                    </template>
                </ul>

                <!-- 一级提问 -->
                <ul v-else>
                    <template v-if="curList && curList.length">
                        <li v-for="(item, i) in curList" :key="i">
                            <div class="item">
                                <span class="label">{{ i + 1 }}</span>
                                <h2>{{ item.label }}</h2>
                            </div>
                            <div class="children-list">
                                <div class="temp-ui-input">
                                    <ui-input
                                        v-model="item.value"
                                        autosize
                                        :disabled="!!isDetail"
                                        :maxlength="item.valueMaxLength"
                                        :placeholder="item.valuePlaceholder"
                                        :rows="4"
                                        type="textarea"
                                        @on-blur="onBlur(i, -1)"
                                    ></ui-input>
                                    <div v-if="showMessage && item.required && !item.value" class="interview-temp-warning">
                                        <i class="ui-icon-warning"></i>
                                        <span>{{ item.valueWarningtip }}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>

            <!-- 评估建议-->
            <div v-if="configData.evaluateInfo && configData.roleId !== 1 && isRender" class="judge-box">
                <span class="label">评估建议：</span>
                <div class="judge-radio">
                    <ui-radio-group v-model="configData.evaluateInfo.value" @on-change="onLevelChange">
                        <ui-radio v-for="(item, i) in configData.evaluateInfo.options" :key="i" :disabled="!!isDetail" :label="item.value">
                        {{ item.label }}
                    </ui-radio>
                    </ui-radio-group>
                    <div v-if="showMessage && configData.evaluateInfo.required && !configData.evaluateInfo.value" class="interview-temp-warning">
                        <i class="ui-icon-warning"></i>
                        <span>{{ configData.evaluateInfo.warningtip }}</span>
                    </div>
                </div>
            </div>

            <!-- 访谈3.0新增：评估日期 晋升访谈无 -->
            <div v-if="configData.evaluateDate && configData.evaluateDate.show && type !== 8 && isRender" class="judge-box">
                <span v-if="[4,5].includes(+type) && configData.evaluateDate.label === '转正日期'" class="label">见习结束日期：</span>
                <span v-else class="label">{{ configData.evaluateDate.label }}：</span>
                <div class="judge-date" :class="{dateDisabled: !!isDetail || configData.evaluateDate.disabled}">
                    <ui-date-picker
                        v-model="configData.evaluateDate.value"
                        :disabled="!!isDetail || configData.evaluateDate.disabled"
                        :editable="false"
                        :picker-options="pickerOptions(configData.evaluateDate)"
                        placeholder="请选择日期"
                        value-format="yyyy-MM-dd"
                        @on-blur="dateBlur"
                        @on-change="dateChange"
                    />
                    <div v-if="showMessage && configData.evaluateDate.required && !configData.evaluateDate.value" class="interview-temp-warning">
                        <i class="ui-icon-warning"></i>
                        <span>{{ configData.evaluateDate.warningtip }}</span>
                    </div>
                </div>
            </div>

            <div
                v-if="configData.suggestDesc && configData.suggestDesc.show && !(!!isDetail && !configData.suggestDesc.value)"
                class="judge-box judge-suggestDesc"
            >
                <span class="label">{{ configData.suggestDesc.label }}：</span>
                <ui-input
                    v-model="configData.suggestDesc.value"
                    autosize
                    :disabled="!!isDetail"
                    :maxlength="configData.suggestDesc.valueMaxLength"
                    :placeholder="configData.suggestDesc.valuePlaceholder"
                    :rows="4"
                    type="textarea"
                ></ui-input>
            </div>

            <!-- 新增：访谈附件 -->
            <div v-if="configData.interviewUploadFile && configData.interviewUploadFile.show" class="judge-box judge-upload">
                <span class="label">{{ configData.interviewUploadFile.label }}：</span>
                <interview-upload :upload-data="configData.interviewUploadFile"></interview-upload>
            </div>
        </div>
    </div>
</template>

<script>
import vSelect from '@/components/vue-select/index';
import InterviewUpload from '@/package/interview/components//common/interview-upload';

import { IEVersion } from '@/utils/ua.js';
import { _interviewEvaluateDate } from '@/services/dashboard/interview';
import { _commonUserSearch } from '@/services/dashboard/base';
import { debounce } from '@/utils/common';

import { commonConfig } from '@noah/tools';
const {  EVALUATE_DATE_MAP }  = commonConfig.interview;



export default {
    name: 'RolePart',
    components: { vSelect, InterviewUpload },
    props: {
        configData: {
            type: Object,
            default: null
        },
        code: {
            type: [Number, String],
            default: ''
        },
        allUserData: {
            type: Array,
            default: () => {
                return [];
            }
        }
        // showMessage: {
        //     type: Boolean,
        //     default: false
        // },
        // isDetail: {
        //     type: Number,
        //     default: 0 // 1 查看 0 编辑
        // },
        // type: {
        //     type: Number,
        //     default: 0
        // }
    },
    inject: ['elRoot'],
    data() {
        return {
            interviewDate: '',

            curList: [],

            showUsersData: [],
            // allUserData: [],
            searchTimer: null,

            isRender: true,

            /////
            evaluateDateMap: EVALUATE_DATE_MAP
        };
    },
    computed: {
        showMessage() {
            return this.elRoot.showMessage;
        },
        isDetail() {
            return this.elRoot.isDetail;
        },
        type() {
            return this.elRoot.type;
        },
        orderInfo() {
            return this.elRoot.orderInfo;
        },
        roleStr() {
            return ['员工姓名', '直属上级', '协作人员', '下级'][this.configData.roleId - 1] || '-';
        },
        isIE() {
            // console.log('=====IEVersion',IEVersion());
            return IEVersion() !== -1;
        },
        timeLabel() {
            return this.configData?.evaluateDate?.label;
        }
    },
    watch: {
        configData: {
            handler(newVal) {
                // console.log('=====new',newVal);
            },
            immediate: true,
            deep: true
        }
    },
    //方法集合
    methods: {
        onBlur(i, j) {
            // console.log('=====i ====j',i,j);
            let value = '';
            j === -1 ? (value = this.curList[i].value.replace(/\s/g, '')) : (value = this.curList[i].children[j].value.replace(/\s/g, ''));
            if (!value) {
                // 纯空格 清空
                j === -1 ? (this.curList[i].value = '') : (this.curList[i].children[j].value = '');
            }
        },
        // 时间选择器设置最大值
        pickerOptions(options) {
            // console.log('===maxdate', options.maxDate,this.timeLabel);
            if (options.maxDate) {
                return {
                    disabledDate: (time) => {
                        const maxTime = options.maxDate.getTime();
                        const current = time.getTime();
                        if(this.timeLabel === '延期至') {
                            return current < maxTime;
                        }
                        return current > maxTime - 8.64e7;
                    }
                };
            }
            return null;
        },
        onLevelChange(val) {
            console.log('=====onLevelChange', val,this.configData.evaluateDate);

            ////评估日期联动
            if (this.configData.evaluateDate) {
                this.configData.evaluateDate.value = '';
                this.configData.evaluateDate.disabled = false;
                let arr = this.evaluateDateMap[+this.type];

                if (arr) {
                    let cur = arr.find((v) => v.code === +val);
                    if (cur) {
                        this.configData.evaluateDate.show = true;
                        this.configData.evaluateDate.label = cur.label;
                        if (cur.hasDefault) {
                            // 需获取默认值

                            _interviewEvaluateDate({ interviewId: this.orderInfo.id })
                                .then((res) => {
                                    console.log('====res', res);
                                    if (res.success) {
                                        let root = res.root;
                                        this.configData.evaluateDate.value = root.evaluateDate || '';
                                        this.configData.evaluateDate.disabled = !root.editable;
                                    } else {
                                        this.$toast(res.message || '请求失败', 'warning');
                                    }
                                })
                                .catch((err) => {
                                    this.$toast(err.message || '请求失败', 'warning');
                                });
                        }
                        // 同意转正日期不可编辑
                        if(cur.code === 5 || cur.code === 8) {
                            this.configData.evaluateDate.disabled = true;
                        }
                    } else {
                        this.configData.evaluateDate.show = false;
                    }
                }
            }
            ////

            this.isRender = false;
            this.$nextTick(() => {
                this.isRender = true;
            });
        },
        onDel() {
            let _this = this;
            this.$dialog({
                title: '删除模块',
                content: '是否确认删除，删除后不可恢复。',
                type: 'warning',
                preventConfirm: true,
                onConfirm: function () {
                    _this.$emit('del-module', _this.code);
                    this.hide();
                }
            });
        },

        //////
        filterEmails: debounce(300, async function(keyWords) {
            // console.log('======keyWords',keyWords);
            try {
                if (!keyWords) return;
                const { success, root } = await _commonUserSearch({ key: keyWords });
                if (success) {
                    this.showUsersData = (root || []).map(item => {
                        let newUser = {...item};
                        newUser.name = `${[newUser.name, newUser.jobDeptName,  newUser.email].filter(item => item).join('-')}`;
                        return newUser;
                    }).slice(0, 20);
                }
            } catch {}
        }),
        //////邮箱选择
        // filterEmails(query) {
        //     // // console.log('======query',query);
        //     if (query !== '') {
        //         if (this.searchTimer) {
        //             clearTimeout(this.searchTimer);
        //         }
        //         this.searchTimer = setTimeout(() => {
        //             this.showUsersData = this.allUserData
        //                 .filter((item, index) => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
        //                 .map(item => {
        //                     let newUser = {...item};
        //                     newUser.name = `${[newUser.name.split('<')[0], newUser.jobDeptName,  newUser.email].filter(item => item).join('-')}`;
        //                     return newUser;
        //                 })
        //                 .slice(0, 20);
        //         }, 200);
        //         // // console.log('======showUsersData',this.showUsersData);
        //     } else {
        //         this.showUsersData = [];
        //     }
        // },
        inputEmails(obj) {
            // console.log('======input val',obj);
            if (obj) {
                // 选中值
                let json = {
                    id: obj.id,
                    email: obj.email,
                    deptLevel1Name: obj.deptLevel1Name,
                    deptLevel2Name: obj.deptLevel2Name,
                    deptLevel3Name: obj.deptLevel3Name,
                    jobDeptName: obj.jobDeptName,
                    // value: this.configData.roleId === 3 ? `${obj.deptLevel1Name ? `${obj.deptLevel1Name}-` : ''}${obj.deptLevel2Name ? `${obj.deptLevel2Name}-` : ''}${obj.deptLevel3Name ? `${obj.deptLevel3Name}-` : ''}${obj.name.split('<')[0]}` : obj.name.split('<')[0],
                    value:
                        this.configData.roleId === 3
                            ? `${obj.jobDeptName ? `${obj.jobDeptName}-` : ''}${obj.name.split('-')[0]}`
                            : `${obj.name.split('-')[0]}`
                };
                Object.assign(this.configData.staffInfo, json);
            } else {
                // 清空
                let json = {
                    id: '',
                    email: '',
                    deptLevel1Name: '',
                    deptLevel2Name: '',
                    deptLevel3Name: '',
                    jobDeptName: '',
                    value: ''
                };
                Object.assign(this.configData.staffInfo, json);
            }

            this.showUsersData = [];
        },

        dateChange(date) {
            // console.log('===date',date);

            this.isRender = false;
            this.$nextTick(() => {
                this.isRender = true;
            });
        },
        dateBlur(date) {
            // console.log('====blur',date,this.configData.interviewDate);

            this.isRender = false;
            this.$nextTick(() => {
                this.isRender = true;
            });
        }
    },
    created() {
        this.curList = this.configData.questionList;

        // // console.log('====3333 attr',this.$attrs);
    },
    mounted() {}
};
</script>
<style lang='less' scoped>
//@import url();
/deep/ .dateDisabled {
    .suffix {
        display: none;
    }
}
</style>
