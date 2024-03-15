<template>
    <div class="item-table-wrap">
        <!-- <ul>
            <template v-for="(item, index) in showList">
                <li  v-if="item.checked" :key="index">
                    <div class="com-title">{{item.label}}</div>
                    <div class="com-content line-overflow">{{item.value}}</div>
                </li>
            </template>
        </ul> -->
        <table class="table-viewer">
            <tr v-for="(item, index) in showList" :key="index">
                <template v-if="item.length === 1">
                    <td colspan="4">
                        <p class="center title">{{ item[0].label }}</p>
                        <p class="content">{{ item[0].value }}</p>
                    </td>
                </template>
                <template v-else>
                    <template  v-for="(td, idx) in item">
                        <td class="label" width="134">{{td.label}}</td>
                        <td :class="['value', {'last': idx == item.length -1 }]">{{td.value}}</td>
                    </template>
                </template>
               
            </tr> 
        </table>

    </div>
  
</template>
<style lang="less" scoped>
.table-viewer{
    width: 100%;
    border-collapse:collapse;
    td{
        height: 44px;
        border-right: 1px solid #D7D7D7;
        border-bottom: 1px solid #D7D7D7;
        &.last {
            border-right: none;
        }
    }
    .label{
        color: #646f79;
        text-align: center;
    }
    .value{
        padding: 0 30px;
        font-weight: 500;
    }
}
</style>
<script>
export default {
    props: {
        configData: {
            type: Object,
            default: null
        },
        type: {
            type: Number,
            default: 0
        }
    },
    data(){
        return{
        };
    },
    computed: {
        showList() {
            let tableData = [];
            if (this.type === 20001) { // 系统字段
                let filterList = this.configData.options.filter(v => v.checked);
                let textAreaIndex = filterList.findIndex(item => {
                    return item.fieldType === 'textArea';
                });

                let inputArr =  textAreaIndex === -1 ? filterList  : filterList.slice(0, textAreaIndex);
                let textareaArr = textAreaIndex === -1 ? [] : filterList.slice(textAreaIndex);
                
                if (inputArr.length % 2) { // 奇数
                    let json = {
                        label: '',
                        value: '',
                        checked: true
                    };

                    inputArr.push(json);
                }
                // input 类型两个一行
                for(var i=0;i<inputArr.length;i+=2){
                    tableData.push(inputArr.slice(i,i+2));
                }
                // textarea 类型独占一行
                for(var i=0; i<textareaArr.length; i++){
                    tableData.push([textareaArr[i]]);
                }
               
            } else {
                let data = this.configData.options;
                for(var i=0;i<data.length;i+=2){
                    tableData.push(data.slice(i,i+2));
                }
                // return this.configData.options;
            }
            // console.log(tableData,'----tableData');
            return tableData;
        }
    },
    created(){
        // // console.log('---kamxass---table-2222', this.configData);
        // // console.log('======type',this.type);
    },
    mounted() {
        
    }

};
</script>
<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';

</style>
