<template>
<div>
    <template>
        <form-item v-if="config.type !== TYPE_BASIC_REMARK">
            <span class="label">必填</span>
            <ui-switch 
                v-model="config.required" size="small"
                :true-value="true" :false-value="false"
            />
        </form-item>
        <form-item>
            <span class="label">显示序号</span>
            <ui-switch 
                v-model="config.showSerial" size="small"
                :true-value="true" :false-value="false"
                @on-change="changeSerial"
            />
        </form-item>
    </template>
    <form-item v-if="config.showSerial">
        <ui-select v-model.number="config.serialStrategy" style="width: 100%" size="small">
            <ui-option v-for="item in STRATEGY_SERIAL_LIST" :key="item.value" :value="item.value">
                {{ item.label }}
            </ui-option>
        </ui-select>
    </form-item>
    <form-item>
        <span class="label">题干说明</span>
        <ui-switch 
            v-model="config.hasInstructions" size="small"
            :true-value="true" :false-value="false"
        />
    </form-item>
</div>
</template>

<script>
// 基础组件的通用配置
import { STRATEGY_SERIAL_LIST, TYPE_BASIC_REMARK } from '@/package/template-center/model/const';
    

export default {
    name: 'BasicCommonConfig',
    inject: ['vm'],
    props: {
        config: { type: Object, default: null }
    },
    watch: {
        'config.serialStrategy' (newval, oldval) {
            if( newval != oldval ) {
                this.changeSerial();
            }
        }
    },
    data() {
        return {
            TYPE_BASIC_REMARK,
            STRATEGY_SERIAL_LIST
        };
    },
    methods: {
        changeSerial(){
            this.vm && this.vm.resetSort();
        }
    }
};
</script>
