<template>
<div class="template-preview">
    <RenderViewEntry 
        :viewer-list="pageData.vm.viewerList"
    />
</div>
</template>
<script>
import RenderViewEntry from '@/package/template-center/components/busines/render-preview-entry.vue';
import { _setValue, _keyBy, scrollToFormError } from '@/utils/util';
import ValidatorModel from '@/package/template-center/model/validator.js';
import ParamModel from '@/package/template-center/model/param.js';
import WatchModel from '@/package/template-center/model/watcher.js';
import { ViewerModel } from '@/package/template-center/model/viewer';

export default {
    name: 'TemplateViewPage',
    props: {},
    components: {
        RenderViewEntry
    },
    provide() {
        return {
            pageData: this.pageData
        };
    },
    data() {
        return {
            validatorModel: {},
            pageData: {
                validateMap: {},        // 校验结果对象
                paramModel: {},         // 参数对象 用于绑定 各组件的值
                vm: {},
                readonly: true,        // 是否只读
                businessData: {}        // 业务数据  用来外界注入一些业务相关的数据 供套件等业务组件使用
            },
            watchModel: {}
        };
    },
    computed: {

    },
    mounted() {
    },
    methods: {
        initPage(config) {
            try {
                const {viewerList, configList, paramModel, relationGroupList, interviewType} = config;
                let paramList =  JSON.parse(JSON.stringify(paramModel)) || {};
                let copyViewerList = JSON.parse(JSON.stringify(viewerList));
                let copyConfigList = JSON.parse(JSON.stringify(configList));


                // this.validatorModel = new ValidatorModel({
                //     configList: copyConfigList,
                //     paramList
                // });
                this.pageData.paramModel = paramList;
                this.pageData.vm = new ViewerModel({
                    viewerList: copyViewerList,
                    configList: copyConfigList
                });
                this.pageData.interviewType = interviewType;
                // this.pageData.vm.createCopiedInterviewGroup(paramList);
                // // 初始化 事件模型
                // this.watchModel = new WatchModel({
                //     relationGroupList,
                //     viewerList: copyViewerList,
                //     configList: copyConfigList,
                //     paramList,
                //     init
                // });
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>