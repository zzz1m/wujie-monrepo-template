<template>
<div v-if="(hasValue && valueConfig[PARAM_COMMON_VALUE_CODE].valueList.length) || (isChange && !readonly)" class="tmp-group-interview">
    <!-- <slot name="title"></slot> -->
    <!-- 套件 -->
    
    <div v-if="isChange && !readonly" class="interview-target-info">目标信息已更新，<span @click="syncInformation">点击同步</span></div>
    <div v-if="hasValue" class="tmp-group-interview-content">
        <!-- okr模式 -->
        <div v-if="valueConfig[PARAM_COMMON_VALUE_CODE].type === 1" class="tmp-group-interview-target-wrapper">
            <div class="tmp-group-interview-target-title">
                <div style="flex: 1">
                    目标
                </div>
                <div style="flex: 2">
                    关键成果
                </div>
                <!-- <div style="flex: 1">
                    完成情况
                </div>
                <div style="flex: 1">
                    最终结果
                </div> -->
            </div>
            <div v-if="!valueConfig[PARAM_COMMON_VALUE_CODE].valueList.length" style="min-height: 100px;" class="tmp-group-interview-target-content">
                <div class="target-info-no-data" style="text-align: center;">暂无数据</div>
            </div>
            <div v-for="(item, index) in valueConfig[PARAM_COMMON_VALUE_CODE].valueList" v-else :key="index" class="tmp-group-interview-target-content">
                <div class="target-main-title" style="width: 20%"><div><div class="target-title">目标：</div><div class="target-content">{{ item.target }}</div></div></div>
                <div class="target-result" style="width: 80%">
                    <div v-for="(result, childrenIndex) in item.children" :key="childrenIndex" class="target-result-item">
                        <div class="target-result-content" style="width: 100%">
                            <div class="target-title">关键成果{{ childrenIndex + 1 }}：</div><div class="target-content">{{ result.achievements }}</div>
                        </div>
                        <!-- <div class="target-result-content" style="width: 25%">
                            <ui-input v-model="result.completionStatus" type="textarea" :maxlength="200" :disabled="readonly" :rows="3" placeholder="请输入"></ui-input>
                        </div>
                        <div class="target-result-content" style="width: 25%">
                            <ui-select v-model="result.finalResult"
                                placeholder="请选择" transfer
                                clearable :disabled="readonly" 
                                @on-change="finalResultChange(result)"
                            >
                                <ui-option v-for="resultItem in dictInfo.objectives_result "
                                    :key="resultItem.dictCode" :value="resultItem.dictCode"
                                >{{ resultItem.dictName }}</ui-option>
                            </ui-select>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- kpi模式 -->
        <div v-else class="tmp-group-interview-target-wrapper">
            <div class="tmp-group-interview-target-title">
                <div style="flex: 18">
                    关键任务
                </div>
                <div style="flex: 20">
                    关键指标
                </div>
                <div style="flex: 10">
                    权重
                </div>
                <div style="flex: 10">
                    考核标准
                </div>
                <div style="flex: 10">
                    数据来源
                </div>
                <!-- <div style="flex: 14">
                    完成情况
                </div>
                <div style="flex: 14">
                    最终得分
                </div> -->
            </div>
            <div v-if="!valueConfig[PARAM_COMMON_VALUE_CODE].valueList.length" style="min-height: 100px;" class="tmp-group-interview-target-content">
                <div class="target-info-no-data" style="text-align: center;">暂无数据</div>
            </div>
            <div v-for="(item, index) in valueConfig[PARAM_COMMON_VALUE_CODE].valueList" v-else :key="index" class="tmp-group-interview-target-content">
                <div class="target-main-title" style="width: 18%">
                    <div><div class="target-title">关键任务：</div><div class="target-content">{{ item.target }}</div></div>
                </div>
                <div class="target-result" style="width: 82%">
                    <div v-for="(result, childrenIndex) in item.children" :key="childrenIndex" class="target-result-item">
                        <div class="target-result-content" style="flex: 20">
                            <div class="target-title">关键指标{{ childrenIndex + 1 }}：</div><div class="target-content">{{ result.indicators }}</div>
                        </div>
                        <div class="target-result-content" style="flex: 10">
                            <div>
                                {{ result.weight }}<span class="target-light-color">%</span>
                            </div>
                        </div>
                        <div class="target-result-content" style="flex: 10">
                            {{ result.assessmentCriteria }}
                        </div>
                        <div class="target-result-content" style="flex: 10">
                            {{ result.dataSource }}
                        </div>
                        <!-- <div class="target-result-content" style="flex: 14">
                            <ui-input v-model="result.completionStatus" type="textarea"  :maxlength="200" :disabled="readonly" :rows="3" placeholder="请输入"></ui-input>
                        </div>
                        <div class="target-result-content" style="flex: 14">
                            <ui-input-number v-model="result.finalScore" :disabled="readonly"
                                :min="0" :max="100" :step="1" :precision="0" 
                            ></ui-input-number>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';
import {
    _interviewUserKitData
} from '@/services/dashboard/interview';
import { 
    TYPE_GROUP_INTERVIEW_TARGET
} from '@/package/template-center/model/const.js';
import { _setValue, _keyBy } from '@/utils/util';
import { _batchGetDictInfo } from '@/services/dashboard/common';
export default {
    name: 'TargetInfo',
    mixins: [Mixin],
    components: {
    },
    data() {
        return {
            dictInfo: {                            // 批量字典
                objectives_result: []
            },
            currentTarget: {

            }
        };
    },
    created() {
        this.getDictInfo();
    },
    mounted() {
        this.getSyncInformation();
    },
    computed: {
        hasValue() {
            return this.pageData.paramModel[this.viewId];
        },
        isChange() {
            if (!this.currentTarget?.valueList) {
                return false;
            }
            let oldTargetStr =  this.valueConfig[this.PARAM_COMMON_VALUE_CODE] ? this.getTargetCleanStr(this.valueConfig[this.PARAM_COMMON_VALUE_CODE].valueList) : '';
            let currentTargetStr = this.getTargetCleanStr(this.currentTarget.valueList);
            console.log(oldTargetStr, currentTargetStr, oldTargetStr !== currentTargetStr)
            return oldTargetStr !== currentTargetStr;
        }
    },
    watch: {
    },
    methods: {
        // 获取下拉列表数据
        async getDictInfo() {
            try {
                const { success, root } = await _batchGetDictInfo({
                    typeList: Object.keys(this.dictInfo)
                });
                if(!success) return;
                this.dictInfo = root || {};
            } catch (error) {
                console.log(error);
            }
        },
        getTargetCleanStr(data) {
            let targetList = JSON.parse(JSON.stringify(data));
            targetList.forEach(item => {
                if (item.children?.length) {
                    item.children.forEach(children => {
                        delete children.completionStatus;
                        delete children.finalResult;
                        delete children.finalResultName;
                        delete children.finalScore;
                    });
                }
            });
            return JSON.stringify(targetList);
        },
        /**
         * @description 组件值改变触发事件
         * @param {Array} value 修改的值
         */
        handleChange(value) {
            this.$emit('on-change', this.viewId, value);
        },
        finalResultChange(result) {
            if (!result.finalResult) {
                result.finalResultName = '';
            } else {
                result.finalResultName = this.dictInfo.objectives_result .find(item => {
                    return item.dictCode === result.finalResult;
                })?.dictName || '';
            }
        },
        // 同步数据
        syncInformation() {
            this.handleChange(this.currentTarget); 
        },
        // 获取同步数据
        async getSyncInformation() {
            if (this.readonly || !this.pageData.businessData.interviewId) {
                return;
            };
            const { success, root } = await _interviewUserKitData({
                interviewId: this.pageData.businessData.interviewId,
                codes: TYPE_GROUP_INTERVIEW_TARGET
            });
            if (!success) {
                return;
            }
            const targetObj = root.find(item => {
                return item.code === TYPE_GROUP_INTERVIEW_TARGET;
            },{});

            this.currentTarget = targetObj && targetObj.data ? JSON.parse(targetObj.data) : null;
        }
    }
};
</script>