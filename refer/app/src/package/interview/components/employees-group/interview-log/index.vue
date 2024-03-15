<template>
<div class="section-two">
    <section-part :config-data="modelConfig[model.code]" :index="index"></section-part>
    <template v-if="model.children && model.children.length">
        <div v-for="(item,i) in formatModel" :key="i">
            <template v-if="item.list && item.list.length">
                <div
                    v-for="obj in item.list"
                    :key="obj.code"
                >
                    <components
                        :is="componentName(obj)"
                        v-if="componentName(obj)"
                        :config-data="modelConfig[obj.code]"
                        :code="obj.code"
                        v-bind="$attrs"
                        v-on="$listeners"
                    ></components>
                </div>
</template>
            <div v-if="item.roleId !== 1 && !$attrs.isDetail" class="add-role-box">
                <div class="add-btn-big" @click="addModule(item)">
                    <i class="ui-icon-circle-plus-outline"></i>
                    <span>添加{{ item.roleId === 2 ? '直属上级' : item.roleId === 3 ? '协作人员' : '下级' }}</span>
                </div>
            </div>
        </div>
    </template>
</div>
</template>

<script>
import SectionPart from '@/package/interview/components/employees-base/section-part/index.vue';
import RolePart from '@/package/interview/components/employees-base/role-part/index.vue';


export default {
    components: {
        SectionPart,
        RolePart
    },
    props: {
        model: {
            type: Object,
            default: null
        },
        originModel: {
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
            formatModel: [],
            allUserData: []
        };
    },
    computed: {
        
    },
    watch: {},
    //方法集合
    methods: {
        componentName(obj) {
            const configInfo = this.modelConfig[obj.code];
            let type = configInfo && configInfo.type;
            return type == 10002 ? 'RolePart' : '';
        },

        // 添加模块
        addModule(item){
            this.$emit('add-module',{roleId: item.roleId});
            ////
        },

        // 模板格式化
        formatModelFn() {
            let _arr = [];
            /////格式化数组
            const formatArr = (v) => {
                let json = {
                    roleId: v.roleId,
                    list: []
                };
                json.list.push(v);
                _arr.push(json);
            };
            this.model.children.forEach(v => {
                if (!_arr.length) {
                    formatArr(v);
                } else {
                    for(let i in _arr) {
                        if (+_arr[i].roleId === +v.roleId) { // 已存在
                            _arr[i].list.push(v);
                            return; // 跳出循环
                        } else if (i >= _arr.length - 1) { // 新的
                            formatArr(v);
                        }
                    }
                }
            });
            /////排序
            for(let i in _arr) {
                _arr[i].list.sort((pre,cur) => {
                    return pre.roleId - cur.roleId; // 按roleId从小到大排序
                });
            }

            //// 保留角色模块增加按钮
            this.originModel.children.forEach(v => {
                if (_arr.every(cur => +cur.roleId !== +v.roleId)) { // 有角色模板，工单无此角色
                    let json = {
                        roleId: +v.roleId,
                        list: []
                    };
                    _arr.push(json);
                }
            });
            _arr.sort((pre,cur) => {
                return pre.roleId - cur.roleId; // 按roleId从小到大排序
            });

            // console.log('=role====formatModelFn==',_arr);
            // console.log('==role===modelConfig',this.modelConfig);
            // console.log('==role=====model',this.model);
            this.formatModel = _arr;

        }


    },
    created() {
        // console.log('====attrs',this.$attrs);
        console.log(this.modelConfig);
        this.formatModelFn();
        
    },
    mounted() {

    }

};
</script>
<style lang='less' scoped>
//@import url();

</style>