<template>
<div class="tmp-score">
    <slot name="title"></slot>
    <div class="tmp-form-item-content">
        <ul class="score-list">
            <li 
                v-for="score in scoreList" :key="score"
                :class="valueConfig[PARAM_COMMON_VALUE_CODE] === score && 'acitve'"
            >
                {{ score }}
            </li>
        </ul>
        <!-- <div class="prompt-view">
            <span class="left">{{ viewConfig.scoreTipsLeft }}</span>
            <span class="middle">{{ viewConfig.scoreTipsCenter }}</span>
            <span class="right">{{ viewConfig.scoreTipsRight }}</span>
        </div> -->
    </div>
</div>
</template>
<script>
import { isNull } from '@/utils/util';
import Mixin from '@/package/template-center/components/layout/mixins/preview.js';

export default {
    name: 'ScoreView',
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
        
    }
};
</script>