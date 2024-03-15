<template>
    <div class="item-text-wrap">
        <ul>
            <li>
                <div class="com-title">
                    <span class="num" v-if="comIndex>0">{{comIndex}}</span>
                    <span>{{configData.label}}</span>
                </div>
                <div class="com-content">{{configData.value}}</div>
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
    creared() {
        // console.log('------item-text-resign', this.comIndex);
    },
    data(){
        return{
            
        };
    },
    created(){
    },
    methods:{}

};
</script>

<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';

</style>