<template>
    <label class="checkbox" :class="{'checked':checkboxValue,'disabled':disabled}" @click="handleClick"><span class="checkbox-shape"><input type="checkbox" class="checkbox-input" :disabled="disabled" v-model="checkboxValue" :name="name" :prop="prop"><i></i></span><span class="checkbox-text"><slot></slot></span>
        <p class="tip-error" v-if="validateMessage"><i class="ui-icon-warning"></i>{{validateMessage}}</p>
    </label>
</template>
<script>
import emitter from '@/mixins/emitter.js';
export default {
    name: 'uiCheckbox',
    mixins: [emitter],
    //inheritAttrs: false,
    inject: {
        uiForm: {
            default: ''
        }
    },
    data () {
        return {
            checkboxValue: this.modelValue,
            validateState: '',
            validateMessage: '',
            validateDisabled: false
        };
    },
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        prop: String,
        modelValue: {},
        value: [String, Boolean, Number],
        name: String,
        change: Function
    },
    watch: {
        checkboxValue(val){
            let newValue;
            if (val) {
                newValue = this.value ? this.value : true;
            } else {
                newValue = this.value ? '' : false;
            }

            this.$emit('change', newValue);
            //回调时同时返回一个value时，不管有没选中，主要用在组里
            this.change ? this.change(newValue, this.value) : '';

            //console.log(this)
            if (newValue) {
                this.validateState = '';
                this.validateMessage = '';
            }
        }
    },
    methods: {
        validate(trigger) {
            return this.$validate.check(this, trigger);
        },
        handleClick() {
            this.$emit('click', this.checkboxValue);
        }
    },
    mounted(){
        // 将组件添加进所属的form的fields数组
        if (this.prop) {
            this.dispatch('uiForm', 'form.addField', [this]);
        }
            
    },
    beforeDestroy() {
        if (this.prop) {
            this.dispatch('uiForm', 'form.removeField', [this]);
        }
    }
};
</script>