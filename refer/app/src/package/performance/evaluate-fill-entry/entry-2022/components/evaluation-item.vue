<template>
<div class="block-evaluation-item">
    <div v-if="!hiddenTitle" class="block-evaluation-item-label">{{ data.item }}</div>
    <template v-if="standardList && standardList.length">
        <div class="performance-fill-content-item-wrapper">
            <div v-for="item in standardList" :key="item.value" class="performance-fill-content-item">
                <div class="performance-fill-content-item-title">{{ item.value }}</div>
                <div class="performance-fill-content-item-value" v-html="item.label"></div>
            </div>
        </div>
    </template>
    <ui-form ref="form" :label-width="0">
        <form-item v-if="evaluationType === 2">
            <ul class="score-wrapper" :class="readonly && 'readonly'">
                <li v-for="item in 11" :key="item" :class="!isNull(data.itemScore) && +data.itemScore === 11-item && 'active'" @click="handleScore(data, 11-item)">{{ 11-item }}</li>
            </ul>
        </form-item>
        <form-item v-else>
            <p class="required form-item-score-label">评分</p>
            <ui-select v-model="data.itemScore"
                :disabled="readonly"
                @on-query-change="selectScore"
            >
                <ui-option v-for="item in getList(standardList.length)" 
                    :key="item.value" :value="item.value"
                >{{ item.label }}</ui-option>
            </ui-select>
        </form-item>
    </ui-form>
</div>
</template>

<script>
import { SCORE_LIST } from '@/package/performance/utils/config.js';
import { isNull } from '@/utils/util.js';
const calcStandard = function(str) {
    str = str.replace(/#end#<br\/>/g, 'brbrbr');
    const result = str.split('brbrbr').map(item => {
        const [value, label] = item.split('|');
        return {
            value, label
        };
    });
    return result;
};
const scoreList = SCORE_LIST;
export default {
    name: 'EvaluationItem',
    props: {
        data: {
            type: Object,
            required: true
        },
        allowEdit: {// 是否允许继续修改
            type: Boolean,
            default: true 
        },
        evaluationType: {
            type: Number,
            default: 1
        },
        hiddenTitle: Boolean
    },
    computed: {
        standardList() {
            return calcStandard( this.data.standard ).filter(item => item.value || item.label);
        },
        scoreList() {
            return scoreList;
        },
        readonly() {
            return this.$route.query.readonly === 'true' || !this.allowEdit;
        },
        moreThanLimit() {
            const limit = 1000;
            let str = this.data.commen || '';
            return this.$validate.getLength(str) > limit;
        }
    },
    created() {
        this.init();
        this.isNull = isNull;
    },
    methods: {
        init() {
            this.$set(this.data, 'scoreStatus', 0);
            this.$set(this.data, 'commenStatus', 0);
        },
        selectScore() {
            this.data.scoreStatus = 0;
            this.$emit('change-score');
            this.$emit('change-val');
        },
        changeCommen() {
            this.data.commenStatus = (this.data.commen && !this.moreThanLimit) ? 0 : 1;
            this.$emit('change-val');
        },
        handleScore(data, score) {
            if (this.readonly) {return;}
            this.$set(data, 'itemScore', score);
            this.changeCommen();
            this.$emit('change-score');
            this.$emit('change-val');
        },
        getList(len) {
            if (!this.scoreList.length) {
                return [];
            }
            return this.scoreList.slice(5-len);
        }
    }
};
</script>