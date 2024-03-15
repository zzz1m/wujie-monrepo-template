<template>
<div class="interview-template-form order-controls">
    <div class="radio-select common-styl" v-if="configData">
        <div class="title">
            <span class="num">{{index+1}}</span>
            <h2>{{configData.label || '-'}}</h2>
        </div>
        <div class="content-box">
            <div class="interview-temp-warning-box">
                <ui-radio-group v-model="configData.value" @on-change="onLevelChange">
                    <div v-for="(item,i) in configData.options" :key="i" class="options-item">
                        <ui-radio :label="item.value" :disabled="!!isDetail">{{item.label}}</ui-radio>
                        <!--  -->
                        <div class="interview-temp-warning-box" v-if="item.addinput && configData.value === item.value" :class="{'required': item.required}">
                            <ui-input v-model.trim="item.inputvalue" :maxlength="item.maxlength" :placeholder="item.inputplaceholder" :rows="4" type="textarea" :disabled="!!isDetail"></ui-input>
                            <div class="interview-temp-warning" v-if="showMessage && configData.value === item.value && item.required && !item.inputvalue">
                                <i class="ui-icon-warning"></i>
                                <span>{{item.warningtip}}</span>
                            </div>
                        </div>
                        <!--  -->
                    </div>
                </ui-radio-group>
                <!-- 选项提示 -->
                <div class="interview-temp-warning select-warning" v-if="showMessage && configData.required && !configData.value">
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
            this.configData.options.forEach(v => {
                if (v.inputvalue && v.value !== +val) v.inputvalue = '';
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