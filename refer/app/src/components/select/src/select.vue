<template>
    <div
        class="dropdown-wrap"
        ref="wrap"
        @mouseenter="hovering = true"
        v-clickoutside="handleClose"
        @mouseleave="hovering = false"
        :class="openedClass"
    >
        <div class="dropdown-flip">
            <span class="dropdown-select" @click="toggle" v-if="type !== 'menu'">
                <slot name="selected-item">
                    <input
                        class="input"
                        :type="type"
                        v-model="search"
                        ref="input"
                        :readonly="!filterable"
                        :placeholder="placeholder"
                        :prop="prop"
                        @input="handleInput"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @keydown.delete="handleDeleteValue"
                    />
                </slot>
                <span class="suffix-close" @click="clear" v-if="showClear">
                    <i class="ui-icon-circle-close"></i>
                </span>
                <slot name="partment-tree-suffix-label"></slot>
                <input type="hidden" :value="currentValue" />
            </span>
            <!-- <span>&times;</span> -->
            <span class="dropdown-label" @click="toggle" v-if="type === 'menu'">
                <slot name="prefix-label"></slot>
                {{ currentLabel || placeholder }}
                <slot name="suffix-label"></slot>
            </span>
            <p class="tip-error" v-if="validateMessage">
                <i class="ui-icon-warning"></i>
                {{ validateMessage }}
            </p>
        </div>

        <transition :name="transition">
            <div class="dropdown-menu" v-if="isOpen" ref="dropdown">
                <slot name="options">
                    <ul class="options">
                        <li
                            v-for="(option, index) in filteredOptions"
                            :key="index"
                            v-if="filteredOptions.length"
                            :class="{ selected: option[selectValue] && option[selectValue] == currentValue }"
                            @click="handleSelect(option, $event)"
                        >
                            <slot name="option-item" v-bind="option">
                                <span :title="option[selectLabel]">{{ option[selectLabel] }}</span>
                            </slot>
                        </li>
                        <li v-if="optionsList && !filteredOptions.length" class="no-options">
                            <slot name="no-options">暂无数据</slot>
                        </li>
                    </ul>
                </slot>
            </div>
        </transition>
    </div>
</template>
<script>
import emitter from '@/mixins/emitter.js';
import clickoutside from '@/utils/clickoutside';

export default {
    name: 'uiSelect',
    mixins: [emitter],
    //inheritAttrs: false,
    inject: {
        uiForm: {
            default: ''
        }
    },
    directives: {
        clickoutside
    },

    data() {
        return {
            currentLabel: '',
            currentValue: '',
            hovering: false,
            isOpen: false,
            isBottomShow: true,
            mutableValue: null,
            mutableOptions: [],
            search: '',
            optionClicked: false, // 是否点击过选项
            directionClass: '',
            validateState: '',
            validateMessage: '',
            validateDisabled: false
        };
    },

    props: {
        disabled: Boolean,
        optionsList: [Object, Array],
        options: Array, //自定义dropdown内容
        remoteData: Array, // 父组件远程获取到的数据
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        selectLabel: {
            type: String, //自定义选中的对象属性，用于显示,比如也可以定义为name
            default: 'label'
        },
        selectValue: {
            //自定义选中的对象属性，用于标识value
            type: [String, Number],
            default: 'value'
        },
        prop: String,
        transition: {
            type: String,
            default: ''
        },
        filterable: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        initLabel: {
            type: String,
            default: ''
        },
        clearable: {
            type: Boolean,
            default: false
        },
        changeable: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        openedClass() {
            return [this.isOpen ? 'dropdown-menu-open' : '', this.directionClass ? this.directionClass : ''];
        },

        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('update:value', val);
            }
        },

        filteredOptions() {
            if (this.remoteData && this.remoteData.length) {
                return this.remoteData;
            }
            if (!this.filterable) {
                return this.mutableOptions.slice();
            }

            return this.search && this.search.length ? this.filter(this.mutableOptions, this.search) : this.mutableOptions;
        },
        searchPlaceholder() {
            if (this.isValueEmpty && this.placeholder) {
                return this.placeholder;
            }
        },
        isValueEmpty() {
            if (this.search) {
                return false;
            }

            return true;
        },
        showClear() {
            return this.clearable && !this.disabled && !this.readonly && this.optionClicked;
        }
    },

    watch: {
        value(val) {
            this.mutableValue = val;
        }
    },
    methods: {
        /**
         * 设置选中label
         */
        setCurrentLabel(label) {
            this.search = label;
            if (this.changeable) {
                this.currentLabel = label;
            }
            this.$emit('update:label', label);
        },

        /**
         * 设置选中value
         */
        setCurrentValue(value) {
            this.currentValue = value;
            //this.model = value;

            this.$emit('input', value); // 这里利用emit触发input事件，
        },

        validate(trigger) {
            return this.$validate.check(this, trigger);
        },
        toggle() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.$nextTick(() => {
                    this.getDirection();
                });
            }
        },

        show() {
            this.isOpen = true;
            this.$nextTick(() => {
                this.getDirection();
            });
        },

        /**
         * 检查是否有空间显示不同方向class
         */
        getDirection() {
            const pos = this.$refs.dropdown.getBoundingClientRect();
            let direction = '';
            if (pos.bottom > window['innerHeight']) {
                this.directionClass = 'direction-up';
            }
        },

        /**
         * 关闭
         */
        handleClose() {
            this.isOpen = false;
        },

        /**
         * 输入
         */
        handleInput(event) {
            const value = event.target.value;
            /*if (this.remote) {
                this._getSuggestionData(value);
            }*/
            if (this.filterable) {
                this.show();
                if (value) {
                    this.optionClicked = true;
                } else {
                    this.optionClicked = false;
                }
                //this._filterAction(value)
            }
            this.$emit('update:input', value);
        },

        /**
         * 获取焦点
         */
        handleFocus() {
            /*if(this.filterable) {
                this.search = '';
            }*/
        },

        /**
         * 失去焦点
         */
        handleBlur(event) {
            /*setTimeout(() => {
                this.search = event.target.dataset.label
            }, 300);*/
        },

        /**
         * 根据输入数据筛选出数据
         */
        filter(mutableOptions, search) {
            const filterOptions = mutableOptions.filter(item => {
                const label = item[this.selectLabel];

                return this.filterBy(label, search);
            });

            return filterOptions;
        },

        filterBy(label, search) {
            label = label.toString();
            return (label || '').toLowerCase().indexOf(search.toLowerCase()) > -1;
        },

        /**
         * 选中
         */
        handleSelect(item, event) {
            const el = $(event.target).closest('li');
            const container = el.closest('ul');
            container.find('li').removeClass('selected');

            if (!el.hasClass('nodata') && !el.hasClass('disabled')) {
                el.addClass('selected');
            }

            this.optionClicked = true;
            this.setCurrentLabel(item[this.selectLabel]);
            this.setCurrentValue(item[this.selectValue]);

            this.validateState = '';
            this.validateMessage = '';

            /*if (this.type !== 'menu') {
                el.closest('.dropdown-wrap').find('.tip-error').remove();
            }*/

            this.handleClose();
            this.$emit('update:selected', item);
        },

        /**
         * 删除搜索文本
         */

        clear() {
            /*this.$emit('input', '');
            this.$emit('change', '');
            this.$emit('clear');
            this.setCurrentValue('');
            this.focus();*/
            this.optionClicked = false;
            this.setCurrentLabel('');
            this.setCurrentValue('');
            this.$refs.input.focus();
            this.$emit('update:input', '');
            if (this.filterable && this.mutableOptions.length) {
                this.$nextTick(() => {
                    this.show();
                });
            }
        },
        /**
         * 整理对象为数组的参数  数组型对象会返回对象 否则会返回整理后的对象
         */
        getArrayOptions() {
            const newOptions = [];
            if (this.optionsList.length) {
                this.optionsList.forEach(item => {
                    if (typeof item !== 'object') {
                        const params = {
                            [this.selectValue]: item,
                            [this.selectLabel]: item
                        };
                        newOptions.push(params);
                    } else {
                        newOptions.push(item);
                    }
                });
            }

            return newOptions;
        },

        /**
         * 整理对象的参数
         */
        getObjectOptions() {
            const newOptions = [];
            if (this.optionsList instanceof Object) {
                for (let i in this.optionsList) {
                    const params = {
                        [this.selectValue]: i,
                        [this.selectLabel]: this.optionsList[i]
                    };

                    newOptions.push(params);
                }
            }

            return newOptions;
        },

        /**
         * 整理参数
         */
        getOptions() {
            const fromOption = Array.isArray(this.optionsList) ? this.getArrayOptions() : this.getObjectOptions();

            return fromOption;
        },

        /**
         * 初始时数据被选中
         */
        getOptionSelected() {
            const options = this.getOptions();
            const findOption = options.find(item => item[this.selectValue] == this.model) || {};
            /*通过v-model获得value，然后通过value到optionsList数组中去查找并显示对应的label，但是也会存在初始时显示的文案与optionsList中的label不对应的情况*/
            this.setCurrentLabel(this.initLabel || findOption[this.selectLabel]);
            this.setCurrentValue(findOption[this.selectValue] || this.model);
        },

        /**
         * 删除按钮
         */
        handleDeleteValue() {
            this.currentLabel = '';
            this.currentValue = '';
            this.model = '';
        },
        /**
         * 初始化选项
         */
        initOption() {
            this.mutableOptions = this.getOptions();
        }
    },

    mounted() {
        // 将组件添加进所属的form的fields数组
        if (this.prop) {
            this.dispatch('uiForm', 'form.addField', [this]);
        }
        this.mutableOptions = this.getOptions();
        this.getOptionSelected();
    },
    beforeDestroy() {
        if (this.prop) {
            this.dispatch('uiForm', 'form.removeField', [this]);
        }
    }
};
</script>
