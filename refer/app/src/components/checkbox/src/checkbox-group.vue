<template>
    <div class="checkbox-group">
        <ui-checkbox-last v-for="(item,index) in data" :key="index" :value="item.value" :disabled="item.disabled" :name="name" :modelValue="_selectValue(item)" :change="_change">{{item.label}}</ui-checkbox-last>
        <p class="tip-error" v-if="validateMessage"><i class="ui-icon-warning"></i>{{validateMessage}}</p>
    </div>
</template>

<script>
import emitter from '@/mixins/emitter.js';
export default {
    name: 'uiCheckboxGroup',
    mixins: [emitter],
    inject: {
        uiForm: {
            default: ''
        }
    },
    data () {
        return {
            groupValue: this.value,//初始选中值
            validateState: '',
            validateMessage: '',
            validateDisabled: false
        };
    },
    props: {
        data: Array,
        value: Array,
        name: String,
        prop: String,
        change: Function
    },
    methods: {
        _selectValue(item){
            if (this.value.indexOf(item.value) != -1) {
                return item.value;
            } else {
                return '';
            }
        },
        _change(checked, value){
            //选中时checked=value，没选中时checked为空
            if (checked) {
                //选中时往数组里添加当前选中的值
                this.groupValue.push(checked);
            } else {
                //没选中时，在数组里移除当前值
                const index = this.groupValue.indexOf(value);
                this.groupValue.splice(index, 1);
            }
            //这里不用emit也可以，同一个数组
            this.$emit('input', this.groupValue);

            console.log(this.groupValue);
            this.change ? this.change(this.groupValue) : '';
        },
        validate(trigger) {
            return this.$validate.check(this, trigger);
        }
    },
    computed: {},
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