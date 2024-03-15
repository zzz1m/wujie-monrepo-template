<template>
<div class="content">
    <slot name="card-header"></slot>
    <div class="score-wrap">
        <ul class="score-list">
            <li v-for="item in scoreList.slice(scoreMin,scoreMax)" :key="item">{{ item }}</li>
        </ul>
        <div class="prompt-view">
            <span class="left">{{ config.scoreTipsLeft }}</span>
            <span class="middle">{{ config.scoreTipsCenter }}</span>
            <span class="right">{{ config.scoreTipsRight }}</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Score',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            scoreList: [0,1,2,3,4,5,6,7,8,9,10]
        };
    },
    computed: {
        scoreMin() {
            return this.config.scoreMin;
        },
        scoreMax() {
            return this.config.scoreMax + 1;
        }
    },
    methods: {
        
    }
};
</script>