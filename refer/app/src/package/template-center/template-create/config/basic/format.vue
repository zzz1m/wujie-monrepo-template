<template>
<form-item>
    <span class="label">格式校验</span>
    <ui-select v-model.number="config[keyName]" 
        :style="selectWidth" 
        size="small" @on-change="onChange"
    >
        <ui-option v-for="item in RULE_FILL_LIST" :key="item.value" :value="item.value">
            {{ item.label }}
        </ui-option>
    </ui-select>
</form-item>
</template>

<script>
import { RULE_FILL_LIST } from '@/package/template-center/model/const';

export default {
    name: 'FormatConfig',
    props: {
        config: { type: Object, default: null },
        keyName: { type: String, default: 'fillRule'}
    },
    computed: {
        selectWidth() {
            return `width: ${this.keyName ==='fillRule'? 83: 96}px`;
        }
    },
    data() {
        return {
            RULE_FILL_LIST
        };
    },
    mounted() {
        this.onChange(this.config[this.keyName]);
    },
    methods: {
        //  同步规则名称中文
        onChange(val) {
            const item = RULE_FILL_LIST.find(t => t.value === val);
            item && (this.config.ruleName = item.label);
        }
    }
};
</script>
