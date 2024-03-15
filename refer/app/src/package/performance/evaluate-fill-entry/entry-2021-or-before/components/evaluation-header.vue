<template>
<div class="block-evaluation-header">
    <h2 class="block-evaluation-header_title">{{ label }}</h2>
    <div class="block-evaluation-header_user">
        <span>员工姓名：{{ userName }}</span>
        <span class="dept-name">部门名称：{{ deptName }}</span>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

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
        }
    }
};
</script>