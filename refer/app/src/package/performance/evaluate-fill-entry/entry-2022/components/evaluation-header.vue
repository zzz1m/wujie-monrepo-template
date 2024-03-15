<template>
<div class="block-evaluation-header">
    <div class="block-evaluation-main">
        <h2 class="block-evaluation-header_title">{{ label }}</h2>
        <div class="block-evaluation-header_user">
            <div class="user-attr">员工姓名：<span class="user-value">{{ userName }}</span></div>
            <div class="user-attr">部门名称：<span class="user-value">{{ deptName }}</span></div>
        </div>
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
export default {
    name: 'EvaluationHeader',
    props: {
        title: String
    },
    computed: {
        ...mapState(['userInfo']),
        label() {
            return this.$route.query.title || this.title;
        },
        userName() {
            return this.$route.query.userName || this.userInfo.name;
        },
        // @node 这里deplevel3后端不维护了 这里可能需要处理
        deptName() {
            return this.$route.query.deptName || this.userInfo.deplevel3;
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