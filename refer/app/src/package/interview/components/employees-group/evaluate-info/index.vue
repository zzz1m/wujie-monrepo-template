<template>
<div class="section-three">
    <section-part :configData="modelConfig[model.code]" :index="index"></section-part>
    <components
        v-for="(obj, j) in model.children"
        :key="j"
        :is="componentName(obj)"
        :configData="modelConfig[obj.code]"
        :code="obj.code"
        v-on="$listeners"
        v-bind="$attrs"
    ></components>
</div>
</template>

<script>
import SectionPart from '@/package/interview/components/employees-base/section-part/temp.vue';
import RolePart from '@/package/interview/components/employees-base/role-part/index.vue';

export default {
    components: {
        SectionPart,
        RolePart,
    },
    props: {
        model: {
            type: Object,
            default: null
        },
        modelConfig: {
            type: Object,
            default: null
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {

        };
    },
    computed: {
        
    },
    watch: {},
    //方法集合
    methods: {
        componentName(obj) {
            let type = this.modelConfig[obj.code].type;
            switch(type) {
                case 10002:
                    return 'RolePart';
                default:
                    return '';
            }
        },
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