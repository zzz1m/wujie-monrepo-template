<template>
<div class="progress-preview-list">
    <div v-for="(item, index) in list" :key="index" class="node-list-item">
        <svg-icon style="pointer-events:none;" class="process-icon" :class="iconType(item)" :icon-class="`audit-status-${iconType(item)}`"></svg-icon>
        <div class="node-name">{{ item.nodeName }}{{ item.userNames && ' · ' + item.userNames.join() }}</div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        list: { type: Array, default: () => []}
    },
    methods: {
        iconType(item) {
            const maps = {
                '填写表单': 'initiate'
            };
            return maps[item.nodeName] || 'wait';
        }
    }
};
</script>