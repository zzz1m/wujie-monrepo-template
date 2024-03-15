
<template>
<!-- 首月访谈类的表单 -->
    <div class="evaluation-form">
        <div class="evaluation-content">
            <div class="header-title">{{getTitle(title)}}</div>
            <ul class="main-ul">
                <li class="main-li" v-for="(item, index) in modelData" :key="index">
                    <div class="com-title">{{configData[item.code].name}}</div>

                    <div v-for="(it, id) in item.children" :key="id">
                        <components
                            v-if="configData[it.code] && configData[it.code].type"
                            :is="componentName[configData[it.code].type]"
                            :configData="configData[it.code]"
                            :type="+configData[it.code].type"
                            :interviewType="title"
                        ></components>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
// import mockData from '@/package/interview/template-page/mock-temp-ym';
import itemRole from '@/package/interview/components/evaluation-form/item-role.vue';
import itemTable from '@/package/interview/components/evaluation-form/item-table.vue';
import itemText from '@/package/interview/components/evaluation-form/item-text.vue';
export default {
    components: {
        itemRole,
        itemTable,
        itemText,
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
                10002: 'item-role',
                20001: 'item-table',
                20002: 'item-text',
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


    }
};
</script>

<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';
</style>

