<template>
    <div class="item-text-wrap">
        <ul>
            <!-- 一级提问 -->
            <li v-if="configData.level==1">
                <div class="com-content" >
                    <div v-for="(item, index) in configData.options" :key="index">{{item.value}}</div>
                </div>
            </li>
            <!-- 二级提问 -->
            <template v-else>
                <li v-for="(item, index) in configData.options" :key="index">
                    <div class="com-title">{{item.label}}</div>
                    <div class="com-content">
                        <!-- 替换<br/> -->
                        <template v-if="item.children && item.children.length">
                            <div v-for="(i,d) in item.children" :key="d">{{i.value}}</div>
                        </template>
                        <div v-else>{{item.value}}</div>
                        
                    </div>
                    <!-- <div class="com-content" v-html="handleValue(item)"></div> -->
                </li>
            </template>
            
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        configData: {
            type: Object,
            default: null
        },
    },
    data(){
        return{
            count: 0,     //判断是否全部为一级，然后合并
            
        };
    },
    methods:{
        handleValue(item){
            if(item.children){
                let arr = [];
                item.children.forEach((i)=>{
                    arr.push(i.value);
                });
                return arr.join(';');
                // return arr.join('<br/>');
            }else{
                return item.value;
            }
        },
    }

};
</script>

<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';

</style>