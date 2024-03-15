<template>
<div class="interview-template-form base-controls">
    <div class="system-field" v-if="configData">
        <h2>{{configData.name || '需展示的系统字段'}}</h2>
        <ul class="field-list" v-if="configData.options && configData.options.length">
            <li v-for="(item,i) in configData.options" :key="i" :class="{'disbled': isDetail}">
                <ui-checkbox v-model="item.checked" :disabled="!!isDetail">
                    <span class="txt">{{item.label}}</span>
                </ui-checkbox>
            </li>
        </ul>
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
        // isDetail: {
        //     type: Number,
        //     default: 0 // 1 查看 0 编辑
        // }
    },
    inject:['elRoot'],
    data() {
        return {

        };
    },
    computed: {
        isDetail() {
            return this.elRoot.isDetail; 
        },
    },
    watch: {},
    //方法集合
    methods: {

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