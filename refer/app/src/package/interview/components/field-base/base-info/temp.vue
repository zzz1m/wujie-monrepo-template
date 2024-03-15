<template>
<div class="interview-template-form base-controls">
    <div class="base-info" v-if="configData">
        <h2>员工基本情况</h2>
        <ul class="opts-list" v-if="configData.options && configData.options.length">
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

    },
    created() {
        // console.log('=====base info', this.type);
    },
    mounted() {

    },
};
</script>
<style lang='less' scoped>

</style>