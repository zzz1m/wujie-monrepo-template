
<template>
<!-- 离职类的表单 -->
    <div class="evaluation-form resign-wrap">
        <div class="evaluation-content">
            <div class="header-title">{{getTitle(title)}}</div>
            <ul class="main-ul">
                <li class="main-li" v-for="(item, index) in modelData" :key="index">
                    <div class="com-title" v-if="configData[item.code] && configData[item.code].type">
                        {{configData[item.code].type == 10001? configData[item.code].name: configData[item.code].label}}
                    </div>

                    <div v-for="(it, id) in item.children" :key="id">
                        <components  v-if="switchShow(it) && configData[it.code] && configData[it.code].type" 
                            :is="componentName[configData[it.code].type]" 
                            :configData="configData[it.code]"    
                            :comIndex="numShow(item.children, it)"
                            :type="+configData[it.code].type"
                        ></components>
                        <template v-if="it.children">
                            <div v-for="(i,d) in it.children" :key="d">
                                <components  v-if="switchShow(i) && configData[it.code] && configData[it.code].type" 
                                    :is="componentName[configData[i.code].type]" 
                                    :configData="configData[i.code]" 
                                    :comIndex="numShow(it.children, i)"
                                    :type="+configData[it.code].type"
                                ></components>
                            </div>
                        </template>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
// import mockData from '@/package/interview/template-page/mock-order-ym-1';

import itemTable from '@/package/interview/components/evaluation-form/item-table.vue';
import itemTextResign from '@/package/interview/components/evaluation-form/item-text-resign.vue';
import itemRadioSingle from '@/package/interview/components/evaluation-form/item-radio-single.vue';
import itemRadioMultiple from '@/package/interview/components/evaluation-form/item-radio-multiple.vue';
import itemMatrixProblem from '@/package/interview/components/evaluation-form/item-matrix-problem.vue';
import itemScore from '@/package/interview/components/evaluation-form/item-score.vue';
import itemTitleParagraph from '@/package/interview/components/evaluation-form/item-title-paragraph.vue';

export default {
    components: {
        itemTable,
        itemTextResign,
        itemRadioSingle,
        itemRadioMultiple,
        itemMatrixProblem,
        itemScore,
        itemTitleParagraph,
    },
    props: {
        title: {},
        modelData: {
            type: Array,
            default: []
        },
        configData: {
            type: Object,
            default: {}
        }
    },
    data(){
        return{
            componentName: {
                '20001': 'item-table',
                '001': 'item-text-resign',
                // '002': 'item-text-resign',    //日期
                '003': 'item-radio-single',    //单选
                '004': 'item-radio-multiple',         //多选
                '005': 'item-matrix-problem',    //矩阵问答
                '006': 'item-score',     //评分
                '007': 'item-title-paragraph',      //段落标题
                // 008: '',     //列表问题（直接遍历，不要组件）
            },
            interviewTypeList:[
                {label: '首月访谈',value: '1'},
                {label: '转正访谈(3月)',value: '2'},
                {label: '转正访谈(6月)',value: '3'},
                {label: '见习访谈(3月)',value: '4'},
                {label: '见习访谈(6月)',value: '5'},
                {label: '离职访谈',value: '6'},
                {label: '离职回访',value: '7'},
                {label: '晋升访谈',value: '8'},
            ],
        };
    },
    methods:{
        getTitle(val){
            if(!val){
                return;
            }
            for(var i=0; i<this.interviewTypeList.length; i++){
                if(this.interviewTypeList[i].value == val){
                    return `${this.interviewTypeList[i].label}评估表`;
                }
            }
        },
        switchShow(obj) { // 是否应该展示
            let config = this.configData[obj.code];
            if (!config.switch) {
                return true; // 无显示逻辑
            } else { // 有显示逻辑
                let switchArr = config.switchFields;
                if (switchArr.some(v => (this.configData[v.code].type === '003' && this.configData[v.code].value === v.value) 
                    || (this.configData[v.code].type === '004' && this.configData[v.code].value.indexOf(v.value) > -1))) { // 满足显示条件
                    return true;
                } else {
                    return false;
                }
            }
        },

        numShow(arr, cur) {
            let index = 0;
            let _arr = arr.filter(v => {
                let _config = this.configData[v.code];
                if (!_config.switch) {
                    return true;
                } else {
                    return _config.switchFields.some(sub => (this.configData[sub.code].type === '003' && this.configData[sub.code].value === sub.value) || (this.configData[sub.code].type === '004' && this.configData[sub.code].value.indexOf(sub.value) > -1));
                }
            });

            for(let i in _arr) {
                
                if (_arr[i].code === cur.code) {
                    return +i + 1;
                }
            }
        },
    }
};
</script>

<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';

</style>

