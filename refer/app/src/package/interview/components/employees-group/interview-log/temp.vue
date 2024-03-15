<template>
<div class="section-two">
    <section-part :configData="modelConfig[model.code]" :index="index"></section-part>
    <template v-if="model.children && model.children.length">
        <components 
            v-for="(obj, j) in model.children"
            :key="j"
            :is="componentName(obj)"
            :configData="modelConfig[obj.code]"
            :code="obj.code"
            v-on="$listeners"
            v-bind="$attrs"
        ></components>
    </template>
    <div v-if="!$attrs.isDetail" class="add-role-box">
        <div class="add-btn-big" @click="roleAdd">
            <i class="ui-icon-circle-plus-outline"></i>
            <span>添加角色</span>
        </div>
    </div>

    <!--  -->
    <choose-role-dialog ref="chooseRoleDialog" v-on="$listeners"></choose-role-dialog>
</div>
</template>

<script>
import SectionPart from '@/package/interview/components/employees-base/section-part/temp.vue';
import RolePart from '@/package/interview/components/employees-base/role-part/temp.vue';
import ChooseRoleDialog from '@/package/interview/components/common/choose-role-dialog.vue';

export default {
    components: {
        SectionPart,
        RolePart,
        ChooseRoleDialog
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
            if (!this.modelConfig[obj.code]) return '';
            let type = this.modelConfig[obj.code].type;
            switch(type) {
                case 10002:
                    return 'RolePart';
                default:
                    return '';
            }
        },
        // 打开选择角色弹窗
        roleAdd(){
            let roleIds = [];
            // 过滤已经存在的角色id
            this.model.children.forEach(v => {
                let item = this.modelConfig[v.code];
                roleIds.push(item.roleId);
            });
            /////
            this.$refs.chooseRoleDialog.open({roleIds});
        },
    },
    created() {
        // console.log('====attrs',this.$attrs);
    },
    mounted() {

    },
};
</script>
<style lang='less' scoped>
//@import url();

</style>