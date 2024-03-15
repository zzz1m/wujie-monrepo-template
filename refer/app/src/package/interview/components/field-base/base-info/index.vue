<template>
<div class="interview-template-form order-controls">
    <ul class="system-field" v-if="configData">
        <template v-if="showOptons && showOptons.length">
            <template v-for="(item, i) in showOptons">
                <li v-if="item.fieldType === 'textArea'" :key="i" class="row-12">
                    <div class="label">{{item.label}}：</div>
                    <!-- <ui-input v-model.trim="item.value" disabled></ui-input> -->
                    <div class="item" :title="item.value">{{item.value}}</div>
                </li>
                <li v-else :key="i" :class="{'mr-r-30': (i+1) % 3}">
                    <div class="label">{{item.label}}：</div>
                    <!-- <ui-input v-model.trim="item.value" disabled></ui-input> -->
                    <div class="item ellipse" :title="item.value">{{item.value}}</div>
                </li>
            </template>
        </template>
    </ul>
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
    computed: {
        showOptons() {
            if (this.configData.options && this.configData.options.length) {
                return this.configData.options.filter(v => v.checked);
            } else {
                return [];
            }
        }
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