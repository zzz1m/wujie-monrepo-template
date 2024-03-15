<template>
    <div class="item-matrix-wrap">
        <div class="com-title">
            <span class="num" v-if="comIndex>0">{{comIndex}}</span>
            <span>{{configData.label}}</span>
        </div>
        <ul class="com-content">
            <li v-for="(item, index) in configData.options" :key="index">
                <div class="item-title">
                    <span class="item-num">{{comIndex}}.{{index+1}}</span>
                    <span>{{item.label}}</span>
                </div>
                <div class="item-content">{{item.value}}</div>
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
        },
        comIndex: {
            type: Number,
            default: null
        }
    },
    data(){
        return{
            
        };
    },
    created(){
        // console.log('---kamxass---005', this.configData);
    },
    method:{

    }

};
</script>

<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';

</style>