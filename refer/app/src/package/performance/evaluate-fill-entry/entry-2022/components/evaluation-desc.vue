<template>
<div class="block-evaluation-desc">
    <div class="block-evaluation-desc-title">{{ label }}</div>
    <dl v-if="list && list.length"
        class="block-evaluation-desc-content"
    >
        <dd v-if="isOld"
            :key="idx" class="item-content"
        >
            {{ list[0].commen }}
        </dd>

        <template v-for="(cell, idx) in list" v-else>
            <dt :key="`label_${idx}`" class="item-label">{{ cell.item }}:</dt>
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
    }
};
</script>