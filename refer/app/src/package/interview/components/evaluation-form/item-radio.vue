<template>
    <div class="item-radio-wrap">
        <div class="com-title">评估建议</div>
        <div class="com-content">
            <label v-for="(item, index) in configData.options" :key="index" class="input-opts radio">
                <div class="ico" :class="{'active': configData.value==item.value}"><i></i></div>
                <span>{{item.label}}</span>
                <!-- <input disabled type="radio" name="" onclick="" :class="{'radio-active': configData.value==item.value}" :checked="configData.value==item.value" />{{item.label}} -->
            </label>
        </div>
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
            
        };
    },
    created(){
    }

};
</script>

<style lang='less' scoped>
@import '~@/styles/interview/test-ym.css';

</style>