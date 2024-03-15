<template>
<div>
    <form-item>
        <span class="label">输入框大小</span>
        <div class="select-tab-wrap">
            <div v-for="item in SIZE_LIST" :key="item.value" class="select-tab-item" 
                :class="{ active: config.size === item.value, disabled: isFormatNumber }"
                @click="changeSize(item.value)"
            >
                {{ item.label }}
            </div>
        </div>
    </form-item>
    <FormatConfig :config="config" key-name="fillRule" />
    <template v-if="isFormatNumber">
        <form-item>
            <span class="label">数字格式</span>
            <ui-radio-group v-model="numberFormat" @on-change="onBlur('numberFormat')">
                <ui-radio label="integer">整数</ui-radio>
                <ui-radio label="decimal">小数</ui-radio>
            </ui-radio-group>
        </form-item>
        <form-item v-if="numberFormat === 'decimal'">
            <span class="label">小数点后</span>
            <ui-input-number 
                v-model="decimal"
                size="small" style="width: 60px;margin-right: 10px"
                :min="1" :max="3" :step="1"
                :precision="0"
                @on-blur="onBlur('decimal')"
            ></ui-input-number>
            <span class="label end">位</span>
        </form-item>
        <form-item>
            <span class="label">最大值</span>
            <ui-input-number 
                v-model="n_max"
                size="small" style="width: 83px;margin-right: 0px"
                :step="1"
                :precision="0"
                @on-blur="onBlur('numberMax')"
            ></ui-input-number>
        </form-item>
        <form-item>
            <span class="label">最小值</span>
            <ui-input-number 
                v-model="n_min"
                size="small" style="width: 83px;margin-right: 0px"
                :step="1"
                :precision="0"
                @on-blur="onBlur('numberMin')"
            ></ui-input-number>
        </form-item>
    </template>
    <template v-else>
        <form-item>
            <span class="label">最少填写</span>
            <ui-input-number 
                v-model="min"
                size="small" style="width: 60px;margin-right: 10px"
                :min="1" :max="9999" :step="1"
                :precision="0"
                @on-blur="onBlur('lengthMin')"
            ></ui-input-number>
            <span class="label end">字</span>
        </form-item>
        <form-item>
            <span class="label">最多填写</span>
            <ui-input-number 
                v-model="max"
                size="small" style="width: 60px;margin-right: 10px"
                :min="1" :max="9999" :step="1"
                :precision="0"
                @on-blur="onBlur('lengthMax')"
            ></ui-input-number>
            <span class="label end">字</span>
        </form-item>
        <form-item>
            <span class="label">默认文本</span>
            <ui-input v-model.trim="placeholder" 
                style="width: 83px;" placeholder=""
                size="small" :maxlength="config.placeholderLimit"
                type="text" @on-blur="onBlur('placeholder')"
            ></ui-input>
        </form-item>
    </template>
</div>
</template>

<script>
import FormatConfig from './format.vue';
import { SIZE_LIST, SIZE_SMALL } from '@/package/template-center/model/const';
export default {
    name: 'FillConfig',
    components: {
        FormatConfig
    },
    props: {
        config: { type: Object, default: null }
    },
    computed: {
        isFormatNumber() {
            return this.config.ruleName === '数字';
        }
    },
    watch: {
        'config.id': {
            immediate: true,
            handler: function() {
                this.placeholder = this.config.placeholder;
                this.min = this.config.lengthMin;
                this.max = this.config.lengthMax;
                this.n_min = this.config.numberMin;
                this.n_max = this.config.numberMax;
                this.decimal = this.config.decimal;
                this.numberFormat = this.config.numberFormat;
            }
        },
        numberFormat: {
            handler: function(e) {
                if(e === 'integer') {
                    this.decimal = this.config.decimal = 2;
                }
            }
        },
        isFormatNumber: {
            handler: function(e) {
                if(e) {
                    this.config.size = SIZE_SMALL;
                    this.numberFormat = this.config.numberFormat = 'decimal',
                    this.n_min = this.config.numberMin = null;
                    this.n_max = this.config.numberMax = null;
                    this.decimal = this.config.decimal = 2;
                } else {
                    this.numberFormat = this.config.numberFormat = '',
                    this.n_min = this.config.numberMin = null;
                    this.n_max = this.config.numberMax = null;
                    this.decimal = this.config.decimal = 2;
                }
            }
        }
    },
    data() {
        return {
            placeholder: this.config.placeholder,
            min: this.config.lengthMin,
            max: this.config.lengthMax,
            numberFormat: this.config.numberFormat,
            n_min: this.config.numberMin,
            n_max: this.config.numberMax,
            decimal: this.config.decimal,
            SIZE_LIST
        };
    },
    methods: {
        changeSize(size) {
            if(this.isFormatNumber) return;
            this.config.size = size;
        },
        onBlur(type) {
            const handler = {
                lengthMax: () => {
                    if(this.min && this.max < this.min) {
                        this.$toast('最多填写字数不可小于最少填写字数', 'warning');
                        this.max = null;
                        this.config.lengthMax = null;
                    } else {
                        this.config.lengthMax = this.max;
                    }
                },
                lengthMin: () => {
                    if(this.max && this.max < this.min) {
                        this.$toast('最少填写字数不可大于最多填写字数', 'warning');
                        this.min = null;
                        this.config.lengthMin = null;
                    } else {
                        this.config.lengthMin = this.min;
                    }
                },
                numberMax: () => {
                    if(this.n_min && this.n_max < this.n_min) {
                        this.$toast('最大值不可小于最小值', 'warning');
                        this.n_max = null;
                        this.config.numberhMax = null;
                    } else {
                        this.config.numberMax = this.n_max;
                    }
                },
                numberMin: () => {
                    if(this.n_max && this.n_max < this.n_min) {
                        this.$toast('最小值不可大于最大值', 'warning');
                        this.n_min = null;
                        this.config.numberMin = null;
                    } else {
                        this.config.numberMin = this.n_min;
                    }
                }
            };
            if(handler[type]) {
                handler[type]();
            } else {
                this.config[type] = this[type];
                if(type === 'decimal' && !this.decimal) {
                    this.config.decimal = this.decimal = 0;
                }
            }
        }
    }
};
</script>