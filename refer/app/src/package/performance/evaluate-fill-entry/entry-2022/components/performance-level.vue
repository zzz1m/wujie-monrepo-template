<template>
<div v-if="!(evaluationType === 1 && !showSelect)" class="page-work-summary performance-score-container">
    <h4>{{ evaluationType === 1 ? '绩效等级' : '绩效得分' }}</h4>
    <div v-if="evaluationType === 1" class="level-container p-t-20">
        <div class="block-evaluation-item">
            <template>
                <div class="performance-fill-content-item-wrapper">
                    <div v-for="item in standardListOne" :key="item.value" class="performance-fill-content-item">
                        <div class="performance-fill-content-item-title">{{ item.value }}</div>
                        <div class="performance-fill-content-item-value">{{ item.label }}</div>
                    </div>
                </div>
            </template>
            <ui-form ref="form" :label-width="0">
                <form-item>
                    <ul class="score-wrapper" :class="readonly && 'readonly'">
                        <li v-for="item in kpiClassList" :key="item" :class="kpiObj.calss === item && 'active'" @click="handleScore(item)">{{ item }}</li>
                    </ul>
                </form-item>
            </ui-form>
        </div>
    </div>
    <div v-else class="level-container">
        <div v-if="!(scoreList && scoreList.length)" class="level-no-score">暂无绩效评分</div>
        <div v-if="scoreList && scoreList.length" class="score-container">
            <div class="performance-score-wrapper light performance-equal">
                <div>绩效得分</div>
                <div><span class="score">{{ isNull(kpiObj.kpiScore) ? '' : kpiObj.kpiScore }}</span><span class="unit">分</span></div>
            </div>
            <div v-for="(item, index) in scoreList" :key="index" class="performance-score-wrapper performance-add">
                <div>{{ item.showName }}</div>
                <div><span class="score">{{ item.bigItemScore }}</span><span class="unit">分(*50%)</span></div>
            </div>
        </div>
        <template v-if="showSelect">
            <h4>绩效等级</h4>
            <div class="block-evaluation-item">
                <template>
                    <div class="performance-fill-content-item-wrapper">
                        <div v-for="item in standardListTwo" :key="item.value" class="performance-fill-content-item">
                            <div class="performance-fill-content-item-title">{{ item.value }}</div>
                            <div class="performance-fill-content-item-value">{{ item.label }}</div>
                        </div>
                    </div>
                </template>
                <ui-form ref="form" :label-width="0">
                    <form-item>
                        <ul class="score-wrapper" :class="readonly && 'readonly'">
                            <li v-for="item in kpiClassList" :key="item" :class="kpiResult.calss === item && 'active'" @click="handleScore(item)">{{ item }}</li>
                        </ul>
                    </form-item>
                </ui-form>
            </div>
        </template>
    </div>
</div>
</template>
    
<script>
import { isNull } from '@/utils/util.js';
import { STANDARD_LIST_ONE, STANDARD_LIST_TWO } from '@/package/performance/utils/config.js';

export default {
    name: 'PerformanceLevel',
    components: {
    },
    props: {
        allowEdit: {// 是否允许继续修改
            type: Boolean,
            default: true 
        },
        kpiResult: {
            type: Object,
            default: () => {
                return {
                    calss: ''
                };
            }
        },
        showSelect: Boolean,
        evaluationType: {
            type: Number,
            default: 1 
        },
        kpiInfo: {
            type: Object,
            default: () => {}
        },
        kpiClassList: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
        };
    },
    computed: {
        readonly() {
            return this.$route.query.readonly === 'true' || !this.allowEdit;
        },
        kpiObj() {
            return this.kpiInfo || {};
        },
        scoreList() {
            return this.kpiObj.bigItemResultList || [];
        },
        standardListOne() {
            return STANDARD_LIST_ONE;
        },
        standardListTwo() {
            return STANDARD_LIST_TWO;
        }
    },
    created () {
        this.isNull = isNull;
    },
    
    methods: {
        changeCommen() {
            this.$emit('change-val');
        },
        handleScore(val) {
            if (this.readonly) {
                return;
            }
            this.kpiResult.calss = val;
        }
    }
};
</script>