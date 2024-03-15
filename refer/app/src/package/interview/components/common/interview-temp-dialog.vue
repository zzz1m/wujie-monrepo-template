<template>
<div>
    <ui-dialog
v-model="showDialog"
        lock :prevent-confirm="true" prevent-hide
        prevent-layer :title="dialogName" width="1000" wrap-class="ui-dialog-reset interview-temp-dialog" @on-close="onCancel('close')"
    >
        <template v-if="showDialog" slot="content">
            <TemplateFillPage ref="templateFillPage" @on-change="handleFormChange" />
        </template>
        <template slot="footer">
            <div class="footer-btns">
                <button class="btn btn-primary btn-outline" type="button" @click="preview">审批流程预览</button>
                <button class="btn btn-primary btn-outline" :disabled="!!isDetail" type="button" @click="onInitialize">同步访谈报告模板</button>
                <button class="btn btn-primary btn-outline" type="button" @click="onCancel">取消</button>
                <button class="btn btn-primary btn-outline" type="button" @click="onPre">
                    预览生成评估单样式
                </button>
                <button
                    class="btn btn-primary btn-outline"
                    :disabled="!!isDetail"
                    type="button"
                    @click="onSave(0)"
                >
                    保存
                </button>
                <button
                    v-if="orderInfo"
                    class="btn btn-primary"
                    :disabled="!!isDetail"
                    type="button"
                    @click="onSave(1)"
                >
                    {{ submitText }}
                </button>
            </div>
        </template>
    </ui-dialog>
    <div>
        <InterviewTempPreviewDialog ref="interviewTempPreviewDialog" />
    </div>
    <AuditPreviewDialoig ref="auditPreviewDialoig" />
</div>
</template>

<script>
import {
    _syncInterviewReport,
    _interviewerRealation,
    _interviewerReportDetail,
    _interviewerReportValue,
    _interviewSaveEvaluate,
    _interviewHandleSubmit,
    _getInterviewRelationData,
    _interviewEvaluateDate,
    _interviewUserKitData,
    _interviewHandleComplete
} from '@/services/dashboard/interview';
import TemplateFillPage from '@/package/template-center/template-fill/index.vue';
import ParamModel from '@/package/template-center/model/param.js';
import {
    TYPE_GROUP_INTERVIEW_ONESELF, TYPE_GROUP_INTERVIEW_SUPERIOR, TYPE_GROUP_INTERVIEW_CUSTOM,
    TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION, PARAM_GROUP_INTERVIEW_STAFF_CODE, TYPE_GROUP_INTERVIEW_TARGET
} from '@/package/template-center/model/const.js';
import InterviewTempPreviewDialog from '@/package/interview/components/common/interview-temp-preview-dialog.vue';
import { ViewerModel } from '@/package/template-center/model/viewer';
import { _keyBy } from '@/utils/util';
import { _getValue } from '@/utils/util.js';
import { evaluationStyleV2 } from '@/package/interview/components/email-tpl/utils';
import browerCtrl from '@/mixins/brower-ctrl';
import { _previewProgressInterview } from '@/services/dashboard/audit/preview.js';
import AuditPreviewDialoig from '@/components/audit-preview-dialog/index.vue';

import { commonConfig } from '@noah/tools';
const {  INTERVIEW_TYPE_LIST }  = commonConfig.interview;

export default {
    name: 'InterviewTempDialog',
    mixins: [browerCtrl],
    components: {
        TemplateFillPage,
        InterviewTempPreviewDialog,
        AuditPreviewDialoig
    },
    data () {
        return {
            isLoading: false,               // 加载中
            isChange: false,                // 是否改变过

            type: 0,                        // 访谈类型
            paramModel: {},
            paramModelVo: {},
            viewerList: [],
            configList: {},

            showDialog: false,
            fromModule: '',                 // 页面来源
            roleInfo: {},                   // 角色详情对象
            isDetail: 0,                    // 0 编辑 1 查看
            orderInfo: {},                  // 工单信息
            resultList: [],                 // 审批建议list
            interviewEvaluateDate: {},      // 访谈评估时间对象
            version: 2                     // 版本
        };
    },

    computed: {
        viewItemsMap() {
            return  _keyBy(this.viewerList, 'id', 'children');
        },
        interviewTypeStr(){
            if(!this.type){
                return '';
            }
            const typeName = INTERVIEW_TYPE_LIST.find(item => item.value  === this.type + '');

            return typeName?.label || '';
        },
        dialogName() {
            let userName =  _getValue(this.roleInfo, 'name', '');
            let namePre = userName ? userName + '的' : '';

            return this.interviewTypeStr ? namePre + this.interviewTypeStr + '报告' : '访谈报告';
        },
        // 可以复制多个访谈套件配置map
        interviewCanCopyConfigMap() {
            const interviewTypeList = [TYPE_GROUP_INTERVIEW_CUSTOM, TYPE_GROUP_INTERVIEW_SUPERIOR, TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION];
            const idConfigMap = {};
            Object.values(this.configList).filter(config => interviewTypeList.includes(config.type)).forEach(config => {
                return idConfigMap[config.id] = config;
            });
            return idConfigMap;
        },
        interviewType() {
            if (!this.orderInfo.type) return '';
            if (+this.orderInfo.type === 6 || +this.orderInfo.type === 7) {
                // 离职访谈、离职回访
                return 'LeaveReport';
            } else {
                // 首月访谈、转正、见习、晋升
                return 'GeneralReport';
            }
        },
        submitText() {
            if (this.interviewType === 'LeaveReport') {
                return '完成报告';
            } else {
                return this.orderInfo.reportStatus === 1 ? '提交审批' : '重新提交';
            }
        },
        canInitRelationData() {
            // 如果不是审批中和审批通过 支持默认赋值逻辑
            return ![2, 3].includes(this.orderInfo.reportStatus);
        }
    },

    mounted() {
        this.checkNotForbid = false;  // 弹窗拦截需要 误删
    },

    methods: {
        /**
         *
         * @param {*} param0
         * @param {Boolean} init 是不是新增表单  如果是新增执行默认赋值逻辑
         */
        async initForm({viewerList, configList, relationGroupList}, init) {
            this.configList = JSON.parse(JSON.stringify(configList));
            this.viewerList = JSON.parse(JSON.stringify(viewerList));
            // 如果不是审批中和审批通过 支持默认赋值逻辑
            if (this.canInitRelationData) {
                await this.getInitFieldData();
            }
            await this.getInterviewData(init);
            this.showDialog = false;
            this.$nextTick(() => {
                this.showDialog = true;
                this.$nextTick(() => {
                    // 初始化表单组件
                    this.$refs.templateFillPage.initPage({
                        viewerList: viewerList,
                        configList: configList,
                        paramModel: this.paramModel,
                        relationGroupList: relationGroupList,
                        readonly: !!this.isDetail,
                        createCopy: init,
                        interviewType: +this.type,
                        businessData: {
                            interviewEvaluateDate: this.interviewEvaluateDate,
                            adviceList: this.resultList,
                            interviewRoleList: this.interviewRoleList,
                            interviewId: this.orderInfo.id
                        }
                    });
                });
            });
        },
        validateAll() {
            return this.$refs.templateFillPage.validateAll();
        },
        getValue() {
            return this.$refs.templateFillPage.getValue();
        },
        /**
         * @description: 对关联数据进行赋值
         */
        async getInitFieldData() {
            const { success, root } =  await  _getInterviewRelationData({ resultId: this.orderInfo.resultId  });    // 关联数据-动态解析-V4.31
            if (!success) { return; }
            const relationData = root;

            let paramList = {};
            let init = Object.keys(paramList).length < 1;
            if ( init ) {
                this.paramModelVo = new ParamModel({ paramList, configList: this.configList });
            }
            // 筛选出单子集 多子集 字段
            const singleOrMultipleFieldKeys = Object.keys(paramList).filter(key => {
                return key.indexOf('|') !== -1;
            });
            // 将表名作为key 生成map数据
            const fieldMap = {};
            relationData.forEach(param => {
                fieldMap[param.tableName] = param;
            });
            // 对单子集和多子集 进行赋值处理
            singleOrMultipleFieldKeys.forEach( fieldKey => {
                let filedKeyArr = fieldKey.split('|').slice(1)[0].split('-');
                // 多子集
                if (filedKeyArr.length === 1) {
                    let value = fieldMap[filedKeyArr[0]]?.fieldCodeValueMap;
                    if (!value) {return;}
                    paramList[fieldKey].value = value;
                }
                // 单子集
                else if (filedKeyArr.length === 3) {
                    let value = fieldMap[filedKeyArr[1]]?.fieldCodeValueMap[0]?.[filedKeyArr[2]];
                    if (!value) {return;}
                    paramList[fieldKey].value = value;
                }
            });
            if (Object.keys(this.paramModel).length) {
                singleOrMultipleFieldKeys.forEach(key => {
                    this.paramModel[key] = paramList[key];
                });
            } else {
                this.paramModel = paramList;
            }
        },
        /**
         * @description: 对访谈对象进行赋值
         */
        async getInterviewData(init) {
            try {
                let codes = this.getCodes(this.configList);
                let interviewData = await _interviewUserKitData({
                    interviewId: this.orderInfo.id,
                    codes: codes.join(',')
                });
                if (!interviewData.success) {
                    return;
                }
                const interviewRoleList = interviewData.root || [];
                this.interviewRoleList = interviewRoleList;
                if (!interviewRoleList.length) { return; }
                const oneSelfConf = interviewRoleList.find(item => item.code === TYPE_GROUP_INTERVIEW_ONESELF);
                this.roleInfo = oneSelfConf?.data || {};
                if (!this.canInitRelationData) {return;}
                const roleMap = interviewRoleList.reduce((pre, next) => {
                    // 需要JSON转化的数据 进行转化
                    if ([TYPE_GROUP_INTERVIEW_TARGET].includes(next.code)) {
                        pre[next.code] = next.data ? JSON.parse(next.data) : null;
                    } else {
                        pre[next.code] = next.data;
                    }
                    return pre;
                },{});

                const interviewTypeList = [TYPE_GROUP_INTERVIEW_ONESELF, TYPE_GROUP_INTERVIEW_SUPERIOR, TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION];
                // 不支持拷贝的访谈套件
                const interviewTypeListNoCopy = [TYPE_GROUP_INTERVIEW_TARGET];

                // 有默认值的类型 List
                const hasValueTypeList = [];
                Object.values(this.configList).forEach(item => {
                    if (interviewTypeList.includes(item.type)) {
                        if (this.paramModel[item.id]) {
                            let paramValue = this.paramModel[item.id].value;
                            if (paramValue && paramValue[PARAM_GROUP_INTERVIEW_STAFF_CODE] && !hasValueTypeList.includes(item.type)) {
                                hasValueTypeList.push(item.type);
                            }
                        }
                    }
                });

                // 不支持拷贝的访谈套件 赋值
                Object.values(this.configList).forEach(item => {
                    if (interviewTypeListNoCopy.includes(item.type)) {
                        if (this.paramModel[item.id] && init && roleMap[TYPE_GROUP_INTERVIEW_TARGET]) {
                            this.paramModel[item.id].value = roleMap[TYPE_GROUP_INTERVIEW_TARGET];
                        }
                    }
                });
                // 获取复制视图的 数量
                const copyTypeConfigMap = {};
                Object.values(this.configList).filter(config => {
                    // 类型对应 并且是复制的视图
                    return interviewTypeList.includes(config.type) && config.id.includes('copy');
                }).forEach(config => {
                    if (copyTypeConfigMap[config.type]) {
                        copyTypeConfigMap[config.type].push(config);
                    } else {
                        copyTypeConfigMap[config.type] = [config];
                    }
                });

                // 获取type类型和整体配置的config对象
                const typeConfigMap = {};
                Object.values(this.configList).filter(config => {
                    // 类型对应 并且不是复制的视图
                    return interviewTypeList.includes(config.type) && !config.id.includes('copy');
                }).forEach(config => {
                    return typeConfigMap[config.type] = config;
                });

                // 对套件进行赋值
                interviewTypeList.forEach(type => {
                    if (roleMap[type] && typeConfigMap[type]) {
                        if (type === TYPE_GROUP_INTERVIEW_ONESELF) {
                            // 本人评估
                            const selfConfig = typeConfigMap[type];
                            // 如果没值 赋默认值
                            if(!hasValueTypeList.includes(type)) {
                                this.setInterviewValue(this.paramModel, selfConfig, {
                                    userId: roleMap[type].id,
                                    userName: roleMap[type].name
                                });
                            };
                        }
                        else {
                            // 如果没值 执行赋默认值逻辑
                            if(!hasValueTypeList.includes(type)) {
                                // 模板配置 如果没有值（被删除了） 并且有默认值 对已有的配置  进行初始化param处理
                                if (roleMap[type].length >= 1 && !this.paramModel[typeConfigMap[type]?.id]) {
                                    const { configList, viewerList } =  this;
                                    const id = typeConfigMap[type].id;
                                    const viewItem = this.viewItemsMap[id];
                                    const currentViewItemsMap = _keyBy([viewItem], 'id', 'children');
                                    const paramVo = new ParamModel({ paramList: this.paramModel, configList: configList, init: false });
                                    Object.values(currentViewItemsMap).forEach((item) => {
                                        paramVo.addParam({
                                            ...item
                                        });
                                    });
                                }
                                // 其他评估  多个的创建视图
                                if (roleMap[type].length >= 2 && typeConfigMap[type]?.multiple) {
                                    const selfConfig = typeConfigMap[type];

                                    // 已有复制视图的数量
                                    let copyViewLength = copyTypeConfigMap[type] ? copyTypeConfigMap[type].length : 0;

                                    let len = roleMap[type].length - 1 - copyViewLength;
                                    for (let i = 0; i < len; i++) {
                                        this.handleCopyVo(selfConfig, i);
                                    }
                                }
                                // 对已有视图进行赋值
                                let configList = Object.values(this.configList).filter(config => config.type === type);
                                configList.forEach((item, index) => {
                                    if (roleMap[type][index]) {
                                        this.setInterviewValue(this.paramModel, item, {
                                            userId: roleMap[type][index].id,
                                            userName: roleMap[type][index].name
                                        });
                                    }
                                });
                            }
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * @description: 访谈套件赋值操作
         * @param {Object} paramModel 值对象
         * @param {Object} config 当前的配置对象
         * @param {Object} userData 值对象
         */
        setInterviewValue(paramModel, config, userData = {}) {
            paramModel[config.id].value = {
                ...paramModel[config.id].value,
                userName: userData.userName,
                userDeptName: userData.deptName,
                [PARAM_GROUP_INTERVIEW_STAFF_CODE]: userData.userId
            };
        },
        /**
         * @description: 拷贝视图方法
         * @param {Object} currentViewConfig 配置对象
         * @param {Number} index 下标 用来生成访谈的 sort
         */
        handleCopyVo(currentViewConfig, index) {
            const { id, parentId, children } = currentViewConfig;
            const { configList, viewerList } =  this;

            const vm = new ViewerModel({
                viewerList: viewerList,
                configList: configList
            });

            const viewItem = this.viewItemsMap[id];

            const paramVo = new ParamModel({ paramList: this.paramModel, configList: configList, init: false });

            vm.copy(viewItem, viewerList, (res) => {
                paramVo.addParam({
                    ...res,
                    sort: +new Date() + index
                });
            });
        },
        /**
         * @description: 获取初始值
         * @param {Object} item
         */
        async getData(item, resultList, type, historyConfig, fromModule) {
            try {
                this.$toast('正在加载，请稍等...', 'loading');
                let interviewerReportDetail = {}, interviewEvaluateDate = { root: '' };
                // 通过 访谈工单 延长试用/见习记录 进入 直接有数据 不请求接口
                if (historyConfig && historyConfig.formConfig) {
                    interviewerReportDetail.root = historyConfig;
                } else {
                    let resArr = await Promise.all([
                        _interviewerReportDetail({ interviewId: item.id }),         // 获取报告详情
                        _interviewEvaluateDate({ interviewId: item.id })            // 访谈评估单信息
                    ]);

                    if (!resArr.every((v) => v.success)) return;
                    interviewerReportDetail = resArr[0];
                    interviewEvaluateDate = resArr[1];
                }


                if (!interviewerReportDetail.root.formConfig || !interviewerReportDetail.root.formJson) {
                    this.$toast.hide();
                    this.$toast('请求工单角色信息失败', 'warning');
                    return;
                }

                this.resultList = resultList;           // 审批建议list
                this.type = item.type || 0;
                this.fromModule = fromModule;
                if (interviewerReportDetail.root.formVal) {
                    this.paramModel = JSON.parse(interviewerReportDetail.root.formVal);
                } else {
                    this.paramModel = {};
                }
                this.interviewEvaluateDate = interviewEvaluateDate.root;   // 访谈评估单信息

                // 0 编辑 1 查看:报告状态为「审批中」「审批通过」 「已终止」;工单状态为「已终止」；或者 当前访谈负责人不是自己时
                this.isDetail =
                    type === 'disabled' ||
                    item.status === 4 ||
                    item.reportStatus === 2 ||
                    item.reportStatus === 3 ||
                    item.reportStatus === 5 ||
                    item.currentUserId !== item.interviewerId
                        ? 1
                        : 0,

                this.orderInfo = item; // 工单信息
                const { formConfig, formJson, templateLogic } = interviewerReportDetail.root;
                this.templateLogic = templateLogic;
                this.initForm({
                    viewerList: JSON.parse(formJson),
                    configList: JSON.parse(formConfig),
                    relationGroupList: JSON.parse(templateLogic)
                }, !interviewerReportDetail.root.formVal);
                this.$toast.hide();
            } catch (error) {
                this.$toast.hide();
                console.log(error);
            } finally {
                // this.$toast.hide();
            }
        },
        // 获取套件code
        getCodes(configList) {
            const interviewTypeList = [TYPE_GROUP_INTERVIEW_ONESELF, TYPE_GROUP_INTERVIEW_SUPERIOR, TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION, TYPE_GROUP_INTERVIEW_TARGET];
            // 获取type类型和整体配置的config对象
            const typeConfigSet = new Set();
            Object.values(configList).forEach(config => {
                if (interviewTypeList.includes(config.type)) {
                    typeConfigSet.add(config.type);
                }
            });
            return [...typeConfigSet];
        },
        /**
         * @description: 同步访谈模板
         */
        onInitialize() {
            let _this = this;
            this.$dialog({
                title: '同步访谈模板',
                content: '是否确认同步，同步之后，当前所填信息全部清空，不可恢复。',
                type: 'warning',
                onConfirm: async () => {
                    const { success, root } = await _syncInterviewReport({ resultId: this.orderInfo.resultId });
                    if (!success) { return; }

                    this.getData(this.orderInfo, this.resultList, this.type, null, this.fromModule);
                }
            });
        },
        /**
         * @description: 预览访谈评估表
         */
        onPre() {
            const { viewerList, configList } = this.$refs.templateFillPage.pageData.vm;
            const formValue = this.$refs.templateFillPage.getValue();
            this.$refs.interviewTempPreviewDialog.open({
                viewerList,
                configList,
                paramModel: formValue,
                type: this.orderInfo.type
            });
        },
        /**
         *  @description: 取消
         */
        onCancel(type) {
            const text = type === 'close' ? '关闭' : '取消';
            if (this.isDetail || !this.isChange) { this.close(); return;};

            this.$dialog({
                title: text,
                content: `是否确认${text}，${text}后当前内容将不会保存。`,
                type: 'warning',
                onConfirm: () => {
                    this.close();
                }
            });
        },
        async preview() {
            this.onSave(1, true);
        },
        /**
         *  @description: 保存 OR 提交
         */
        async onSave(type, isPreview = false) {
            const value = this.$refs.templateFillPage.getValue();
            if (type) {     // 提交
                const validate = await this.$refs.templateFillPage.validateAll();
                // 如果校验不通过 校验不通过
                if (validate.length) { return; }
                // 如果访谈套件人员有重复 校验不通过
                const hasRepeat = this.hasRepeatPerson(value);


                if (hasRepeat) { return; }
            }

            if (this.isLoading) return;
            this.isLoading = true;
            this.$toast('正在提交，请稍等...', 'loading');


            let delayOrAdvance = false;
            const evaluateValueEntry = Object.entries(value).find(([key, value]) => {
                return key.match('group-interview_assessment') && key.match('evaluation');
            });
            if (['2', '3', '7'].includes(evaluateValueEntry[1].value.advice + '')) {
                delayOrAdvance = true;
            }
            const { viewerList, configList } = this.$refs.templateFillPage.pageData.vm;
            const formValue = this.$refs.templateFillPage.getValue();
            const evaluateDom = await this.$refs.interviewTempPreviewDialog.getDom({
                viewerList,
                configList,
                paramModel: formValue,
                type: this.orderInfo.type,
                isHide: true
            });

            let params = {
                resultId: this.orderInfo.resultId,
                formJson: JSON.stringify(viewerList),
                formConfig: JSON.stringify(configList),
                templateLogic: this.templateLogic,
                evaluate: `<!DOCTYPE html><html><style>${evaluationStyleV2}</style><body class="interview-pdf">${evaluateDom}</body></html>`,
                formVal: JSON.stringify(formValue),
                version: this.version
            };
            try {
                const { success, root } = await _interviewSaveEvaluate(params);
                if (!success) { return; }
                this.$toast.hide();
                if (type) {
                    if(isPreview) {
                        console.log('xxx');
                        this.$refs.auditPreviewDialoig.open('loading');
                        const { success, root } = await _previewProgressInterview({
                            resultId: this.orderInfo.resultId,
                            processInstanceId: this.orderInfo.processInstanceId || ''
                        });
                        if(success && root) {
                            this.$refs.auditPreviewDialoig.open(root);
                        } else {
                            this.$refs.auditPreviewDialoig.open('empty');
                        }

                    } else {
                        let params = {
                            orderInfo: this.orderInfo,
                            renderModel: this.renderModel,
                            renderConfig: this.renderConfig,
                            from: this.fromModule
                        };

                        if (this.interviewType === 'LeaveReport') {
                            this.$dialog({
                                title: '完成报告',
                                content: '是否确认完成报告？点击确定后不可撤销',
                                type: 'warning',
                                onConfirm: () => {
                                    this.postComplete(params);
                                }
                            });
                        } else {
                            this.$dialog({
                                title: '提交审批',
                                content: `<div class="tip-text">是否确认提交审批？请检查好访谈报告内容，请确认在「访谈人设置」中填写了被访谈人的协作方、下级、实际访谈人。`,
                                type: 'warning',
                                userHtmlString: true,
                                onConfirm: () => {
                                    this.postAudit(params);
                                }
                            });
                        }
                    }

                } else {
                    this.$toast('保存成功！', 'success');
                }
                this.isChange = false;
            } catch(err) {
                console.log(err);
            } finally {
                this.isLoading = false;
            }
        },

        // 审批
        async postAudit(params) {
            try {
                let data = {
                    resultId: this.orderInfo.resultId,
                    processInstanceId: this.orderInfo.processInstanceId || ''
                };
                const res = await _interviewHandleSubmit(data);
                if (res.success) {
                    this.$toast('已提交审批，审批详情请在审批中心进行查看', 'success');
                    this.isDetail = 1;
                    this.$emit('on-confirm', params);
                    this.close();
                } else {
                    this.$toast(res.message || '请求失败', 'warning');
                }
            } catch (err) {
                this.$toast(err.message || '请求失败', 'error');
            }
        },

        // 离职审批
        async postComplete(params) {
            let data = {
                interviewId: this.orderInfo.id,
                interviewerId: this.orderInfo.interviewerId,
                result: 10
            };
            try {
                const res  = await _interviewHandleComplete(data);
                if (res.success) {
                    this.$toast('工单已完成', 'success');
                    this.isDetail = 1;
                    this.$emit('on-confirm', params);
                    this.close();

                } else {
                    this.$toast(res.message || '请求失败', 'warning');
                }
            } catch(err) {
                this.$toast(err.message || '请求失败', 'error');
            }
        },

        close() {
            this.showDialog = false;
            this.isDetail = 0;
            this.orderInfo = null;
            this.roleInfo = null;
            this.isChange = false;
            this.paramModel = {};
            this.paramModelVo = {};
            this.setEditing(0);
            this.$emit('on-close', true);
        },
        // 判断有没有重复人员
        hasRepeatPerson(formData) {
            // 可以添加多个值的访谈套件
            const configIdList = Object.values(this.interviewCanCopyConfigMap).map(item => item.id);
            if (!configIdList.length) {
                return false;
            }
            let interviewCanCopyValueMap = {};
            configIdList.forEach(configId => {
                interviewCanCopyValueMap[configId] = [];
            });
            const repeatFormData = Object.entries(formData).find(([key, valueObj]) => {
                if (configIdList.includes(key) || configIdList.includes(valueObj.copyId)) {
                    if (interviewCanCopyValueMap[valueObj.copyId || key].includes(valueObj.value.userId)) {
                        return true;
                    } else {
                        interviewCanCopyValueMap[valueObj.copyId || key].push(valueObj.value.userId);
                    }
                }
            });

            if (!repeatFormData) {return false; }

            const config = this.interviewCanCopyConfigMap[repeatFormData[1].copyId || repeatFormData[0]];
            this.$toast(`${config?.title || ''}人员重复，请进行修改`, 'warning');
            return true;
        },
        handleFormChange() {
            this.isChange = true;
            this.setEditing(1);
        },
        // 浏览器阻断成功后回调
        forbidCallback() {
            this.openDialog = false;
        }
    }
};
</script>
