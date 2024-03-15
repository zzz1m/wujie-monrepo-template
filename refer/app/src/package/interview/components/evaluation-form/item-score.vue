<template>
    <div class="item-score-wrap">
        <div class="com-title">
            <p>评分标准：</p>
            <p v-for="(item, index) in configData.gradeIntro" :key="index">{{index + 1}}、{{item}}</p>
        </div>
        <ul class="com-content">
            <li v-for="(item, index) in configData.children" :key="index">
                <div class="question">
                    <div class="ques-title">
                        <span class="num">{{index + 1}}</span>
                        <span>{{item.title}}</span>
                    </div>
                    <div class="ques-content">
                        <p v-for="(it,id) in item.options" :key="id">{{it.value}}.{{it.label}}</p>
                    </div>
                </div>
                <!-- <ul class="score">
                    <li v-for="(it,id) in gradeList" :key="id" :class="{'score-active': item.value==it}">
                        {{it}}
                    </li>
                </ul> -->
                <div class="score">
                    <p>评分：<strong class="active">{{ item.value || 0 }}分</strong></p>
                </div>
            </li>
        </ul>
    </div>
  
</template>

<script>
export default {
    props: {
        configData: {
            type: Object,
            default: null
        }
    },
    data(){
        return{
            gradeList:[0,1,2,3,4,5]
        };
    },
    created(){
        // console.log('---111111--score----', this.configData);
    },
    methods:{
        handleValue(item){
            if(item.children){
                let arr = [];
                item.children.forEach((i)=>{
                    arr.push(i.value);
                });
                return arr.join(';');
            }else{
                return item.value;
            }
        }
    }

};
</script>

<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';

</style>