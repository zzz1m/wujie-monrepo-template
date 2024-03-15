<template>
    <div class="item-radio-resign">
        <div class="com-title">
            <span class="num" v-if="comIndex>0">{{comIndex}}</span>
            <span>{{configData.label}}</span>
        </div>
        <ul class="com-content">
            <li v-for="(item, index) in configData.options" :key="index">
                <label class="input-opts radio">
                    <div class="ico" :class="{'active': configData.value==item.value}"><i></i></div>
                    <span>{{item.label}}</span>
                    <!-- <input disabled type="radio" name="" onclick="" :class="{'radio-active': configData.value==item.value}" :checked="configData.value==item.value" />{{item.label}} -->
                </label>
                <div class="check-input" v-if="item.inputvalue">{{item.inputvalue}}</div>
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
        
    },
    methods:{
    }

};
</script>

<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';

</style>