<template>
<div>
    <RenderFillEntry 
        :viewer-list="pageData.vm.viewerList"
        :on-change="handleChange"
        :on-validate="validate"
    />
</div>
</template>
<script>
import RenderFillEntry from '@/package/template-center/components/busines/render-fill-entry.vue';
import { _setValue, _keyBy, scrollToFormError } from '@/utils/util';
import { PARAM_COMMON_VALUE_CODE } from '@/package/template-center/model/const';
import ValidatorModel from '@/package/template-center/model/validator.js';
import ParamModel from '@/package/template-center/model/param.js';
import WatchModel from '@/package/template-center/model/watcher.js';
import { ViewerModel } from '@/package/template-center/model/viewer';
import { ROLE_GROUP_INTERVIEW, TYPE_ELSE_EVALUATION } from '../model/const.js';
import {
    TYPE_BASIC_FILL
} from '@/package/template-center/model/const';

export default {
    name: 'TemplateFillPage',
    props: {},
    components: {
        RenderFillEntry
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
                watchModel: {},
                readonly: false,        // 是否只读
                businessData: {}        // 业务数据  用来外界注入一些业务相关的数据 供套件等业务组件使用
            }
        };
    },
    computed: {

    },
    mounted() {
    },
    methods: {
        initPage(config) {
            const {viewerList, configList, paramModel, relationGroupList, readonly = false, businessData = {}, createCopy = false, interviewType } = config;
            let paramList = paramModel || {};
            let init = Object.keys(paramList).length < 1;
            let copyViewerList = JSON.parse(JSON.stringify(viewerList));
            let copyConfigList = JSON.parse(JSON.stringify(configList));
            this.pageData.readonly = readonly;
            this.pageData.businessData = businessData;
            this.pageData.validateMap = {};
            const copyRelationGroupList = JSON.parse(JSON.stringify(relationGroupList));
            if ( init ) {
                new ParamModel({ paramList, configList: copyConfigList });
            }

            this.validatorModel = new ValidatorModel({
                configList: copyConfigList,
                paramList,
                interviewType
            });
            
            this.pageData.paramModel = paramList;
            this.pageData.vm = new ViewerModel({
                viewerList: copyViewerList,
                configList: copyConfigList
            });
            this.pageData.interviewType = interviewType;
            if ( createCopy ) {
                this.pageData.vm.createCopiedInterviewGroup(paramList);
            }
            // 初始化 事件模型
            this.pageData.watchModel = new WatchModel({
                relationGroupList: copyRelationGroupList,
                viewerList: copyViewerList,
                configList: copyConfigList,
                paramList,
                init
            });
            // 对拷贝套件 赋值关联逻辑
            this.copyRelation();
        },
        /**
         * @description 处理组件赋值操作
         * @param {Object} configId 组件配置对象id
         * @param {Any} value 组件的值
         * @param {Object} valueConfig 修改值一些特殊配置 例如：选项中输入框值修改
         */
        async handleChange(configId, value, valueConfig) {

            // 赋值处理
            const isChange = this.setValue(configId, value, valueConfig);
            if (!isChange) {return;}

            // 校验值是否合法  有些字段 不在值改变时校验 比如fill组件 在blur是校验 需要过滤掉
            const notValidateTypeList = [TYPE_BASIC_FILL];
            const type = this.pageData.vm.configList[configId].type;
            if (!notValidateTypeList.includes(type)) {
                const validate = await this.validate(configId);
                // if (!validate) {return;}
            }
            // 触发关联逻辑方法
            this.relation(configId);

            this.$emit('on-change', configId, value, valueConfig);
        },
        // 赋值处理
        async setValue(configId, value, valueConfig) {
            try {
                const valueCodes = valueConfig?.keyLink || [PARAM_COMMON_VALUE_CODE];
                _setValue(this.pageData.paramModel[configId], valueCodes, value);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        // 校验值是否合法
        async validate(configId) {
            const validate = await this.validatorModel.validate(configId);
            this.$set(this.pageData.validateMap, configId, validate);
            return validate.success === 0 ? false : true;
        },
        // 触发规则
        relation(configId) {
            this.pageData.watchModel.trigger(configId);
            this.pageData.vm.resetSort();
           
            // 清空校验信息
            const changeIdList = this.pageData.watchModel.$relation.getShowListByCondition(configId);
            // 获取隐藏的字段id
            const hiddenIdList = changeIdList.filter(id => {
                return this.pageData.vm.configList[id].hidden;
            });
            hiddenIdList.forEach(id => {
                if (this.pageData.validateMap[id]) {
                    this.$delete(this.pageData.validateMap, id);
                }  
            });
        },
        /**
         * @description: 校验方法
         */
        async validateAll() {
            let filterIds = this.pageData?.vm?.viewerList ? Object.keys(_keyBy(this.pageData.vm.viewerList, 'id', 'children')) : [];
            const validate = await this.validatorModel.validateAll(filterIds);
            this.pageData.validateMap = _keyBy(validate, 'id');
            scrollToFormError(false, '.tmp-form-has-error');
            return Object.values(this.pageData.validateMap).filter(item => item.success === 0);
        },
        // 获取Param对象
        getValue() {
            let filterIds = this.pageData?.vm?.viewerList ? Object.keys(_keyBy(this.pageData.vm.viewerList, 'id', 'children')) : [];
            this.pageData.watchModel.$param.refreshParam(filterIds);
            return this.pageData.paramModel;
        },
        // 对赋值的访谈套件 做关联逻辑赋值
        copyRelation() {
            // 获取访谈套件的copy信息
            const viewerList = this.pageData.vm.viewerList;
            if( viewerList.length < 1 ) return [];

            viewerList.forEach(viewer => {
                if (viewer.copyId) {
                    this.pageData.watchModel.$relation.copyRelationGroup(viewer);
                }
            });
        }
    }
};
</script>