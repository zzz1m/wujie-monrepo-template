<template>
<div v-if="(hasValue && valueConfig[PARAM_COMMON_VALUE_CODE].valueList.length)" class="tmp-group-interview">
    <!-- <slot name="title"></slot> -->
    <!-- 套件 -->
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
                <div class="target-main-title" style="width: 20%">
                    <div><div class="target-title">目标：</div><div class="target-content">{{ item.target }}</div></div>
                </div>
                <div class="target-result" style="width: 80%">
                    <div v-for="(result, childrenIndex) in item.children" :key="childrenIndex" class="target-result-item">
                        <div class="target-result-content" style="width: 100%"><div class="target-title">关键成果{{ childrenIndex + 1 }}：</div><div class="target-content">{{ result.achievements }}</div></div>
                        <!-- <div class="target-result-content" style="width: 25%">{{ result.completionStatus }}</div>
                        <div class="target-result-content" style="width: 25%">{{ result.finalResultName }}</div> -->
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
                    <div><div class="target-title">关键任务：</div><div class="target-content"> {{ item.target }}</div></div>
                </div>
                <div class="target-result" style="width: 82%">
                    <div v-for="(result, childrenIndex) in item.children" :key="childrenIndex" class="target-result-item">
                        <div class="target-result-content" style="flex: 20"><div class="target-title">关键指标{{ childrenIndex + 1 }}：</div><div class="target-content">{{ result.indicators }}</div></div>
                        <div class="target-result-content" style="flex: 10"><div>{{ result.weight }}<span class="target-light-color">%</span></div> </div>
                        <div class="target-result-content" style="flex: 10">{{ result.assessmentCriteria }}</div>
                        <div class="target-result-content" style="flex: 10">{{ result.dataSource }}</div>
                        <!-- <div class="target-result-content" style="flex: 14">{{ result.completionStatus }}</div>
                        <div class="target-result-content" style="flex: 14">{{ result.finalScore }}</div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- todo 底部的评估建议呢 -->
</div>
</template>
<script>
import { debounce } from '@/utils/common';
import Mixin from '@/package/template-center/components/layout/mixins/preview.js';
import ParamModel from '@/package/template-center/model/param.js';
export default {
    name: 'TargetInfo',
    mixins: [Mixin],
    components: {
    },
    data() {
        return {
        };
    },
    created() {
    },
    mounted() {
        const { paramModel, vm } =  this.pageData;
        const { configList } = vm;
    },
    computed: {
        hasValue() {
            return this.pageData.paramModel[this.viewId];
        }
    },
    watch: {
    },
    methods: {
    }
};
</script>