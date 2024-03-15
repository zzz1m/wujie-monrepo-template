<template>
<form-item class="col">
    <span class="label">可选范围</span>
    <div class="row-layout">
        <span class="label">最少</span>
        <ui-select v-model.number="config.selectedMin" type="number" style="width: 64px" size="small">
            <ui-option :value="RULE_NO_LIMIT">不限</ui-option>
            <ui-option v-for="item in selectedMinOptions" :key="item.value" :value="item.value">
                {{ item.label }}
            </ui-option>
        </ui-select>
        <span class="label">最多</span>
        <ui-select v-model.number="config.selectedMax" type="number" style="width: 64px" size="small">
            <ui-option :value="RULE_NO_LIMIT">不限</ui-option>
            <ui-option v-for="item in selectedMaxOptions" :key="item.value" :value="item.value">
                {{ item.label }}
            </ui-option>
        </ui-select>
    </div>
</form-item>
</template>

<script>
import {
    RULE_NO_LIMIT
} from '@/package/template-center/model/const';

export default {
    name: 'CheckboxRangeConfig',
    props: {
        config: { type: Object, default: null }
    },
    data() {
        return {
            RULE_NO_LIMIT
        };
    },
    computed: {
        // 多选项范围相关
        optionsCount() {
            return this.config && this.config.options && this.config.options.length || 0;
        },
        selectedMinOptions() {
            if(!this.optionsCount) return [];
            const maxNolimit = this.config.selectedMax === RULE_NO_LIMIT;
            return new Array(
                maxNolimit? this.optionsCount: this.config.selectedMax 
            ).fill(0).map((_, idx) => ({ value: idx + 1, label: idx + 1}));
        },
        selectedMaxOptions() {
            if(!this.optionsCount) return [];
            const minNoLimit = this.config.selectedMin === RULE_NO_LIMIT;
            const start = minNoLimit? 1: this.config.selectedMin;
            return new Array(
                minNoLimit ? this.optionsCount: (this.optionsCount - this.config.selectedMin + 1)
            ).fill(0).map((_, idx) => ({ value: idx + start, label: idx + start}));
        }
    }
};
</script>