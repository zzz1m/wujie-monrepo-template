<template>
<div class="block-evaluation-desc">
    <div class="block-evaluation-desc-title">{{ label }}</div>
    <dl v-if="list && list.length"
        class="block-evaluation-desc-content"
    >
        <template v-for="(cell, idx) in list">
            <dt v-if="className(cell.itemKey)" :key="`label_${idx}`" class="item-label" :class="className(cell.itemKey)">{{ cell.item }}</dt>
            <dd :key="`content_${idx}`" class="item-content">{{ cell.commen }}</dd>
        </template>
    </dl>
</div>
</template>

<script>
export default {
    name: 'EvaluationDesc',
    props: {
        label: {
            type: String,
            required: true
        },
        list: {
            type: Array,
            default: () => ([])
        },
        isOld: Boolean
    },
    methods: {
        className(name) {
            let iconName = '';
            switch(name) {
                case 'advantage':
                    iconName = 'evaluate-view-icon-1';
                    break;
                case 'shortage':
                    iconName = 'evaluate-view-icon-2';
                    break;
                case 'proposal':
                    iconName = 'evaluate-view-icon-3';
                    break;
            }
        
            return iconName ? `evaluate-view-icon ${iconName}` : '';
        }
    }
};
</script>