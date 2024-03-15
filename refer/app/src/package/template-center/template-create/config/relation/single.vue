<template>
<form-item class="col">
    <span class="label">关联数据源</span>
    <div class="label-text">{{ srcName }}</div>
</form-item>
</template>
<script>
export default {
    name: 'RelationSingleConfig',
    props: {
        config: { type: Object, default: null },
        relationList: { type: Array, default: () => []},
        groupList: { type: Array, default: () => []}
    },
    computed: {
        srcName() {
            const  relationType = this.relationList.find(t => t.role === this.config.role)?.name;
            return `${relationType}-${this.config.title}`;
        }
    }
};
</script>