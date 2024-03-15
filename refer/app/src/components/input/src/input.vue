<template>
  <div class="ipt-wrap" :class="[{'ipt-readonly': inputReadonly}, {'ipt-disabled': inputDisabled}]" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <slot name="prepend"></slot>
    <template v-if="type !== 'textarea'">
        <input
            v-if="type !== 'textarea'"
            class="input"
            :class="validateMessage ? 'ipt-error': ''"
            v-bind="$attrs"
            :type="type"
            :tabindex="tabindex"
            :readonly="inputReadonly"
            :disabled="inputDisabled"
            :autocomplete="autoComplete"
            :value="currentValue"
            :prop="prop"
            ref="input"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :aria-label="label"
        >
    </template>
    <textarea
        v-else
        class="input input-area"
        :value="currentValue"
        :tabindex="tabindex"
        @input="handleInput"
        ref="textarea"
        v-bind="$attrs"
        :readonly="inputReadonly"
        :disabled="inputDisabled"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
    >
    </textarea>
    <span class="suffix-content" v-if="$slots.suffixContent"><slot name="suffixContent"></slot></span>
    <span class="suffix-close" @click="clear" v-if="showClear"><i class="ui-icon-circle-close"></i></span>
    <span class="counter" v-if="showCounter && rangeEnd"><em :class="rangeStart > rangeEnd ? 'red' : ''">{{rangeStart}}</em>/{{rangeEnd}}</span>

    <slot name="append"></slot>
    <p class="tip-error" v-if="validateMessage"><i class="ui-icon-warning"></i>{{validateMessage}}</p>
  </div>
</template>
<script>
import emitter from '@/mixins/emitter.js';
export default {
    name: 'uiInput',

    mixins: [emitter],

    //inheritAttrs: false,
    inject: {
        uiForm: {
            default: ''
        }
    },

    data() {
        return {
            currentValue: this.value === undefined || this.value === null ? '' : this.value,
            prefixOffset: null,
            suffixOffset: null,
            hovering: false,
            focused: false,
            isOnComposition: false,
            valueBeforeComposition: null,
            rangeStart: '',
            rangeEnd: '',
            validateState: '',
            validateMessage: '',
            validateDisabled: false
        };
    },

    props: {
        value: [String, Number],
        size: String,
        resize: String,
        prop: String,
        readonly: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            default: 'text'
        },
        autoComplete: {
            type: String,
            default: 'off'
        },
        validateEvent: {
            type: Boolean,
            default: true
        },
            
        suffixIcon: String,
        prefixIcon: String,
        label: String,
        clearable: {
            type: Boolean,
            default: false
        },
        hasCounter: {
            type: Boolean,
            default: false
        },
        tabindex: String,
        dataRange: String
    },
    computed: {
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        needStatusIcon() {
            return this.elForm ? this.elForm.statusIcon : false;
        },
        inputSize() {
            return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        },
        inputReadonly() {
            return this.readonly || (this.elForm || {}).readonly;
        },
        inputDisabled() {
            return this.disabled || (this.elForm || {}).disabled;
        },
        showClear() {
            return this.clearable && !this.disabled && !this.readonly && this.currentValue !== '' && (this.focused || this.hovering);
        },
        showCounter() {
            return this.hasCounter;
        }
    },

    watch: {
        'value'(val, oldValue) {
            this.setCurrentValue(val);
        }
    },

    updated: function () {
    },

    methods: {
        focus() {
            (this.$refs.input || this.$refs.textarea).focus();
        },
        blur() {
            (this.$refs.input || this.$refs.textarea).blur();
        },
        select() {
            (this.$refs.input || this.$refs.textarea).select();
        },
        resizeTextarea() {
            if (this.$isServer) return;
            const { type } = this;
            if (type !== 'textarea') return;
        },
        handleFocus(e) {
            this.focused = true;
            this.$emit('focus', e);
        },
        handleInput(e) {
            const value = e.target.value;
            //this.setCurrentValue(value);
            if (this.isOnComposition) return;
            this.$emit('input', value);
            if (this.isAttachEvent('input')) {
                this.check(e);
            }
        },
        handleBlur(e) {
            this.focused = false;
            this.$emit('blur', e);
            if (this.isAttachEvent('blur')) {
                this.validate();
            }
        },
        handleChange(e) {
            this.$emit('change', e.target.value);
        },
        setCurrentValue(value) {
            if (this.isOnComposition && value === this.valueBeforeComposition) return;
            this.currentValue = value;
            if (this.isOnComposition) return;
            this.setRange(value);
        },
        clear() {
            this.$emit('input', '');
            this.$emit('change', '');
            this.$emit('clear');
            this.setCurrentValue('');
            this.clearValidate();
            this.focus();
        },
        isAttachEvent(type) {
            let rules = this.uiForm && this.uiForm.rules[this.prop];
            let flag;
            if (!rules) {
                return;
            }
            if (!rules || !rules.length) {
                return;
            }
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].trigger && rules[i].trigger === type) {
                    flag = true;
                }
            }
            return flag;
        },
        validate(trigger) {
            return this.$validate.check(this, trigger);
        },
        setRange(value) {
            let rules = this.uiForm && this.uiForm.rules[this.prop];
            let obj = {};
            if (!rules || !rules.length) return;
            rules.map(function(item, index) {
                if (item.range) {
                    obj = item;
                }
            });

            this.rangeStart = (value ? this.$validate.getLength(value) : '0');
            this.rangeEnd = (obj.range ? obj.range.max : '0');
        },
           
        clearValidate() {
            this.validateState = '';
            this.validateMessage = '';
            this.validateDisabled = false;
        }
    },

    created() {
        this.$on('inputSelect', this.select);
    },

    mounted() {
        // 将组件添加进所属的form的fields数组
        if (this.prop) {
            this.dispatch('uiForm', 'form.addField', [this]);
        }
        this.setRange();
    },
    beforeDestroy() {
        if (this.prop) {
            this.dispatch('uiForm', 'form.removeField', [this]);
        }
    }
};
</script>
