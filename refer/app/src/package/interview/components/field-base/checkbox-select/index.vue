<template>
<div class="interview-template-form order-controls">
    <div class="checkbox-select common-styl" v-if="configData">
        <div class="title">
            <span class="num">{{index+1}}</span>
            <h2>{{configData.label || '-'}}</h2>
        </div>
        <div class="content-box">
            


            <div class="interview-temp-warning-box">
                <ui-checkbox-group v-model="configData.value" @on-change="onLevelChange">
                    <div v-for="(item,i) in configData.options" :key="i" class="options-item">
                        <ui-checkbox :label="item.value" :disabled="!!isDetail">{{item.label}}</ui-checkbox>
                        <!--  -->
                        <div class="interview-temp-warning-box" v-if="item.addinput && configData.value.indexOf(item.value) > -1" :class="{'required': item.required}">
                            <ui-input v-model.trim="item.inputvalue" :maxlength="item.maxlength" :placeholder="item.inputplaceholder" :rows="4" type="textarea" :disabled="!!isDetail"></ui-input>
                            <div class="interview-temp-warning" v-if="showMessage && configData.value.indexOf(item.value) > -1 && item.required && !item.inputvalue">
                                <i class="ui-icon-warning"></i>
                                <span>{{item.warningtip}}</span>
                            </div>
                        </div>
                        <!--  -->
                    </div>
                </ui-checkbox-group>

                <!-- 选项提示 -->
                <div class="interview-temp-warning select-warning" v-if="showMessage && configData.required && !configData.value.length">
                    <i class="ui-icon-warning"></i>
                    <span>{{configData.warningtip}}</span>
                </div>
            </div>
            
        </div>
    </div>
</div>
</template>

<script>

export default {
    components: {},
    props: {
        configData: {
            type: Object,
            default: null
        },
        index: {
            type: Number,
            default: 0
        },
        showMessage: {
            type: Boolean,
            default: false
        },
        isDetail: {
            type: Number,
            default: 0 // 0 编辑 1 查看
        }
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {
        onLevelChange(val) {
            // console.log('======checkbox',val);
            this.configData.options.forEach(v => {
                if (v.inputvalue && val.indexOf(v.value) === -1) v.inputvalue = '';
            });
        }
    },
    created() {

    },
    mounted() {

    },
};
</script>
<style lang='less' scoped>
//@import url();

</style>