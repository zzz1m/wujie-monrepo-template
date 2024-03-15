<template>
<div class="tmp-score">
    <slot name="title"></slot>
    <div class="tmp-form-item-content">
        <ul class="score-list" :class="readonly && 'score-list-readonly'">
            <li 
                v-for="score in scoreList" :key="score"
                :class="valueConfig[PARAM_COMMON_VALUE_CODE] === score && 'acitve'"
                @click="handleChange(score)"
            >
                {{ score }}
            </li>
        </ul>
        <div v-if="viewConfig.scoreTipsLeft || viewConfig.scoreTipsCenter || viewConfig.scoreTipsRight" class="prompt-view">
            <span class="left">{{ viewConfig.scoreTipsLeft }}</span>
            <span class="middle">{{ viewConfig.scoreTipsCenter }}</span>
            <span class="right">{{ viewConfig.scoreTipsRight }}</span>
        </div>
    </div>
</div>
</template>
<script>
import { isNull } from '@/utils/util';
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';


export default {
    name: 'Score',
    mixins: [Mixin],
    components: {
        
    },
    data() {
        return {

        };
    },
    computed: {
        scoreList() {
            const { scoreMin, scoreMax } = this.viewConfig;
            if (!isNull(scoreMin) && !isNull(scoreMax)) {
                return Array.from(new Array(scoreMax - scoreMin + 1), (item, index) => {
                    return scoreMin + index;
                });
            }
            return [];
        }
    },
    mounted() {
    },
    methods: {
        /**
         * @description 组件值改变触发事件
         * @param {Array} value 修改的值
         */
        handleChange(value) {
            if (this.readonly) { return; };
            // 不修改值不触发相关逻辑
            if (this.valueConfig[this.PARAM_COMMON_VALUE_CODE] === value) { return; }
            this.$emit('on-change', this.viewId, value);
        }
    }
};
</script>