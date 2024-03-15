<template>
<div class="tmp-relation-multiple">
    <div v-if="viewConfig.printStyle === 1" class="tmp-form-item-wrapper">
        <slot name="title"></slot>
    </div>
    <div class="tmp-form-item-content">
        <ui-table-pro v-if="viewConfig.printStyle === 1" class="table-pro-reset-ui" border highlight-current-row tooltip-effect="dark" tooltip-max-width="264px" empty-text="暂无数据" :data="list">
            <ui-table-column v-for="(item, index) in viewConfig.fieldsList" :key="index" :prop="item.code" :label="item.label" :min-width="getColumnWidth(item)" show-overflow-tooltip>
            </ui-table-column>
        </ui-table-pro>
        <template v-else>
            <div v-for="(item, index) in rowList" :key="index" class="multiple-row-table">
                <h5 class="multiple-row-table-title">{{ viewConfig.title }} {{ ++index }}</h5>
                <ui-table class="multiple-row-table-content" :class="!list.length && 'multiple-no-data'" border>
                    <tbody v-if="viewConfig.fieldsList && viewConfig.fieldsList.length > 0 " slot="body">
                        <tr v-for="(row, idx) in viewConfig.fieldsList" :key="idx">
                            <td :width="rowWidth">{{ row.label }}</td>
                            <td v-if="list.length">{{ item[row.code] }}</td>
                            <template v-else>
                                <td v-if="idx === 1" :rowspan="viewConfig.fieldsList.length" class="ui-table-empty-text" style="text-align: center;">暂无数据</td>
                            </template>
                        </tr>
                    </tbody>
                </ui-table>
            </div>
        </template>
    </div>
</div>
</template>
<script>
import Mixin from '@/package/template-center/components/layout/mixins/fill.js';

export default {
    mixins: [Mixin],
    components: {
        
    },
    data() {
        return {

        };
    },
    computed: {
        rowWidth() { // 每行宽度 title
            let titleList = this.viewConfig.fieldsList.map(item => {
                return item.label?.length || 0;
            });
            let maxLength =  Math.max(...titleList);
            let titleWidth = maxLength * 14 + 30;
            
            const maxWidth = Math.max(titleWidth, 100);
            return  Math.min(maxWidth, 200);
        },
        list() {
            return this.valueConfig[this.PARAM_COMMON_VALUE_CODE] || [];
        },
        rowList() {
            if (this.valueConfig[this.PARAM_COMMON_VALUE_CODE] && this.valueConfig[this.PARAM_COMMON_VALUE_CODE].length > 0) {
                return this.valueConfig[this.PARAM_COMMON_VALUE_CODE];
            }
            return [{}];
        }
    },
    mounted() {
    },
    methods: {
        /**
         * @description 组件值改变触发事件
         * @param {Array} value 修改的值
         */
        handleChange(value) {
            this.$emit('on-change', this.viewConfig, value);
        },
        getColumnWidth (row) { // 每列宽度
            let computedWidth =  row.label.length * 14 + 28; // 计算的宽度 （14为字体大小）
            return Math.max(computedWidth, 100);
        }
    }
};
</script>
