<template>
<form-item class="col">
    <span class="label">日期类型</span>
    <ui-select v-model="config.format" style="width: 100%" size="small">
        <ui-option v-for="item in STRATEGY_DATE_FORMAT" :key="item.value" :value="item.value">
            {{ item.label }}
        </ui-option>
    </ui-select>
</form-item>
</template>

<script>
import { STRATEGY_DATE_FORMAT } from '@/package/template-center/model/const';
export default {
    name: 'DateConfig',
    props: {
        config: { type: Object, default: null }
    },
    data() {
        return {
            STRATEGY_DATE_FORMAT
        };
    }
};
</script>
