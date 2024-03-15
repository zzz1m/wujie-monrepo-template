<template>
    <table width="800" border="1" cellspacing="0" cellpadding="0" class="interview-table" align="center">
        <tbody v-html="htmlStr" ref="tbody"></tbody>
    </table>
</template>

<script>
const interviewTypeList = [
    {label: '首月访谈',value: '1'},
    {label: '转正访谈(3月)',value: '2'},
    {label: '转正访谈(6月)',value: '3'},
    {label: '见习访谈(3月)',value: '4'},
    {label: '见习访谈(6月)',value: '5'},
    {label: '离职访谈',value: '6'},
    {label: '离职回访',value: '7'},
    {label: '晋升访谈',value: '8'},
]; 

import { createTbodyHtmlStr } from './tpl'; 

export default {
    name: 'email-tpl',
    computed: {
        titleHtmlStr () {
            const item = interviewTypeList.find(item => item.value == this.title);
            const title = item ? `${item.label}评估表` : '评估表';
            return `<tr>
                <td colspan="4" class="interview-title">${title}</td>
            </tr>`;
        },
        htmlStr() {
            const { titleHtmlStr, modelData, configData, formType } = this;
            return titleHtmlStr + this.createTbodyHtmlStr(modelData, configData, formType);
        }
    },
    props: {
        title: [String, Number],
        formType: [String, Number],
        modelData: {
            type: Array,
            default: () => ([])
        },
        configData: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        createTbodyHtmlStr
    }
};
</script>
