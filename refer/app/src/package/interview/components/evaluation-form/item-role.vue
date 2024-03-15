<template>
    <div class="item-role-wrap">
        <item-table :configData="tableData"></item-table>
        
        <item-text :configData="textData"></item-text>

        <item-radio v-if="configData.roleId != 1 && configData.evaluateInfo" :configData="radioData"></item-radio>
    </div>

  
</template>

<script>
import itemTable from '@/package/interview/components/evaluation-form/item-table.vue';
import itemText from '@/package/interview/components/evaluation-form/item-text.vue';
import itemRadio from '@/package/interview/components/evaluation-form/item-radio.vue';
export default {
    components: {
        itemTable,
        itemText,
        itemRadio
    },
    props:{
        interviewType: null,
        configData: {
            type: Object,
            default: {}
        }
    },
    data(){
        return{
            tableData: {
                options: []
            },
            textData: {
                level: 0,     // 1 一级提问  2 二级提问 
                options: [],
            },
            radioData: {
                options: []
            }
        };
    },
    created(){

        if(this.configData.staffInfo){
            this.$set(this.configData.staffInfo,'checked',true);
            this.tableData.options.push(this.configData.staffInfo);
        }
        if(this.configData.interviewDate){
            this.$set(this.configData.interviewDate,'checked',true);
            this.tableData.options.push(this.configData.interviewDate);
        }

        if(this.configData.questionList){
            this.textData.level = this.configData.level;
            this.textData.options = this.configData.questionList;
        }

        if(this.configData.evaluateInfo){
            this.radioData = this.configData.evaluateInfo;
        }
    },
    methods: {

        
    }

    

};
</script>

<style>

</style>