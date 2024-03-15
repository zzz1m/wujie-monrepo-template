<template>
<div class="content">
    <slot name="card-header"></slot>
    <div class="option-list">
        <draggable :list="options" v-bind="renderDragOptions">
            <div v-for="(option,index) in options" :key="option.code" class="option-item">
                <div class="option-choose-wrap">
                    <div class="option-choose" 
                        :class="{'option-focus': 0, 'option-click': option.chooseClick}"
                        @click="onClick(option)"
                    >
                        <div :class="isCheckBox ? 'check-square' : 'radio-circle'"></div>
                        <div :ref="'optionChoose' + index" v-select="{limit: 1000}" class="rich-text-area" :class="option.hasExtra && 'rich-fill'" :contenteditable="true" @blur="onBlur($event, index,'label')">{{ option.label }}</div>
                    </div>
                    <div class="choose-operate" :class="{'operate-click': option.chooseClick}">
                        <ui-tooltip
                            placement="top"
                            :open-delay="400"
                            effect="dark"
                            class="option-drag"
                            popper-class="drag-item"
                            max-width="320"
                        >
                            <div class="svg-wrap"><svg-icon icon-class="drag-sort" /></div>
                            <div slot="content">长按拖动</div>
                        </ui-tooltip>
                        <ui-tooltip
                            placement="top"
                            :open-delay="400"
                            effect="dark"
                            class=""
                            popper-class="drag-item"
                            max-width="320"
                        >
                            <div class="svg-wrap" @click.stop="onChoose(option)"><svg-icon icon-class="drag-setting" /></div>
                            <div slot="content">设置</div>
                        </ui-tooltip>
                        <ui-tooltip
                            placement="top"
                            :open-delay="400"
                            effect="dark"
                            class=""
                            popper-class="drag-item"
                            max-width="320"
                        >
                            <div class="svg-wrap" @click.stop="optionDelete(option, index)"><svg-icon icon-class="drag-delete" /></div>
                            <div slot="content">删除</div>
                        </ui-tooltip>
                    </div>
                </div>
                <div v-if="option.hasExplain" class="option-desc">
                    <div class="rich-text-edit">
                        <div v-select="{limit: 1000}" :contenteditable="true" class="rich-text-area" @blur="onBlur($event, index,'explain')">{{ option.explain }}</div>
                    </div>
                </div>
            </div>
        </draggable>
    </div>
    <div class="option-operate">
        <span class="add-option" @click.stop="addOptions('add')"><svg-icon icon-class="add-option" />添加选项</span>
        <span class="add-option" @click.stop="addOptions('addExtra')"><svg-icon icon-class="add-extra" />添加其他选项</span>
    </div>
</div>
</template>
<script>
import draggable from 'vuedraggable';
import { guid } from '@/package/template-center/model/tools.js';
import { TYPE_BASIC_CHECKBOX } from '@/package/template-center/model/const';
export default {
    name: 'CheckBox',
    components: {
        draggable
    },
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    inject: ['relation'],
    data() {
        return {
            addType: '',
            renderDragOptions: {
                sort: true,
                animation: 200,
                group: {
                    name: this.config.id,
                    pull: 'clone'
                },
                ghostClass: 'sortable-ghost', // 设置拖动元素的class的占位符的类名。
                handle: '.option-drag' // 拖动元素
            }
            
        };
    },
    created() {
        
    },
    computed: {
        options: {
            get() {
                return this.config.options;
            },
            set(v) {}
        },
        isCheckBox() {
            return this.config.type === TYPE_BASIC_CHECKBOX;
        }
    },
    methods: {
        addOptions(addType) {
            this.addType = addType;
            this.options.push({
                code: this.isCheckBox ? guid('options_checkbox_') : guid('options_radio_'),
                label: this.addType === 'add' ? '选项' : '其他',
                hasExplain: false,
                explain: '请输入选项说明',
                explainLimit: 1000,
                hasExtra: this.addType === 'addExtra',
                extra: '',
                hasExtraLimit: false,
                extraRequired: true,
                extraLimit: 9999,
                extraRule: -1,
                ruleName: ''
            });
            const _length = 'optionChoose'+(this.options.length - 1);
            setTimeout(()=>{
                this.$refs[_length] && this.$refs[_length][0].focus();
            },0);
        },
        // 点击选项设置
        onChoose(item) {
            this.options.forEach(item => {
                this.$set(item, 'chooseClick' , false);
            });
            item.chooseClick = true;
            this.$emit('choose', {
                activeType: 'option', // 右侧面板选中的类型：控件comp | 组件选项option
                activeId: this.config.id, // 选中的控件id
                activeCode: item.code // 选中的控件的选项code
            });
        },
        // 点击输入框
        onClick(item) {
            this.options.forEach(item => {
                this.$set(item, 'chooseClick' , false);
            });
        },
        // 输入框失焦
        onBlur(e, key, val) {
            const innerText = e.target.innerText.replace(/(^\s*)|(\s*$)/g, '');
            if(!innerText) {
                let value = this.options[key][val];
                e.target.innerText = value;
            }else {
                e.target.innerHTML = innerText;
                this.$set(this.options[key], val , innerText);
            }
        },
        // 选项删除
        async optionDelete(option, index) {
            const { success, message } = await this.relation.checkOption({optionId: option.code});
            if( success === 0 ) {
                this.$dialog({
                    content: message || '该选项已参与逻辑设置，不能删除！',
                    cancelText: ''
                });
            } else {
                this.options.splice(index, 1);
            }
        }
    }
};
</script>