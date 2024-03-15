<template>
<div class="block-evaluation-header" :class="`block-evaluation-header-type${evaluationType}`">
    <div class="block-evaluation-main">
        <h2 class="block-evaluation-header_title">{{ label }}</h2>
        <div class="block-evaluation-header_user">
            <div class="user-attr">姓名：<span class="user-value">{{ userData.userName || '-' }}</span></div>
            <div class="user-attr">部门：<span class="user-value">{{ userData.deptName || '-' }}</span></div>
            <template v-if="showAll">
                <div class="user-attr">类型：<span class="user-value">{{ userData.roleName || '-' }}</span></div>
                <div class="user-attr">勤奋度：<span class="user-value">{{ userData.qualifiedBLine || '-' }}</span></div>
                <div class="user-attr">遵章守纪：<span class="user-value">{{ userData.orderly || '-' }}</span></div>
            </template>
        </div>
        <PerformanceScore v-if="kpiResult" :result="kpiResult" />
        <div v-else class="evaluation-type-icon"></div>
    </div>
    <div v-if="description" class="block-evaluation-header-description">
        {{ description }}
    </div>
    <slot></slot>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { HEADER_DESCRIPTION_MAP } from '@/package/performance/utils/config.js';
import PerformanceScore from '@/package/performance/components/entry-2022/performance-score.vue';

export default {
    name: 'EvaluationHeader',
    components: {
        PerformanceScore
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        evaluationType: {
            type: Number,
            default: 1
        },
        userData: {
            type: Object,
            default: () => {}
        },
        showAll: Boolean,
        kpiResult: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState(['userInfo']),
        label() {
            return this.$route.query.title || this.title || '-';
        },
        originTwType() {
            return this.$route.query.twType || '';
        },
        description() {
            return HEADER_DESCRIPTION_MAP[this.originTwType];
        }

    }
};
</script>