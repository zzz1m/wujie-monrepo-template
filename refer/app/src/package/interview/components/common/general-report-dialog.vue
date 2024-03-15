<template>
<ui-dialog
    v-model="openDialog"
    prevent-close
    prevent-layer
    :show-footer="false"
    :lock="true"
    :title="dialogName"
    wrap-class="interview-template-dialog interview-small-padding-dialog"
    @on-close="onCancel"
>
    <template slot="content">
        <template v-if="originConfig && originModel">
            <div v-if="isRender" class="dialog-content general-report-content">
                <ul>
                    <li v-for="(item, i) in renderModel" :key="i">
                        <components
                            :is="componentName(i)"
                            :ref="`sectionComp-${item.code}`"
                            :model="item"
                            :origin-model="originModel[i]"
                            :model-config="renderConfig"
                            :index="i"
                            :show-message="showMessage"
                            :is-detail="isDetail"
                            :type="type"
                            :order-info="orderInfo"
                            @del-module="onDelModule"
                            @add-module="onAddModule"
                        ></components>
                    </li>
                </ul>
            </div>
        </template>
        <div v-else class="text-gray no-template">暂无模板~</div>
        <div class="footer-btns">
            <!-- <button type="button" class="btn btn-primary btn-outline" @click="preview">审批流程预览</button> -->
            <button type="button" :disabled="!!isDetail" class="btn btn-primary btn-outline" @click="onInitialize">同步访谈报告模板</button>
            <button type="button" class="mr-l-20 btn btn-primary btn-outline" @click="onCancel">取消</button>
            <button type="button" :disabled="!originConfig || !originModel" class="mr-l-20 btn btn-primary btn-outline" @click="onPre">
                预览生成评估单样式
            </button>
            <button
                type="button"
                :disabled="isDetail || !originConfig || !originModel"
                class="mr-l-20 btn btn-primary btn-outline"
                @click="onSave(0)"
            >
                保存
            </button>
            <button
                v-if="orderInfo"
                type="button"
                :disabled="isDetail || !originConfig || !originModel"
                class="mr-l-20 btn btn-primary"
                @click="onSave(1)"
            >
                {{ isNewProcessData ? (orderInfo.reportStatus === 1 ? '提交审批' : '重新提交') : '编辑邮件' }}
            </button>
            <!-- <button type="button" class="mr-l-20 btn btn-primary" @click="onSave(1)">
                    {{ fromModule === 'audit_center' ? '重新提交' : '编辑邮件'}}
                </button> -->
        </div>
        <AuditPreviewDialoig ref="auditPreviewDialoig" />
        <!-- 评估表 -->
        <report-preview-dialog ref="reportPreviewDialog" @evaluate="getEvaluate" @base64="getBase64"></report-preview-dialog>
    </template>
</ui-dialog>
</template>

<script>
import StaffInfo from '@/package/interview/components/employees-group/staff-info/index.vue';
import InterviewLog from '@/package/interview/components/employees-group/interview-log/index.vue';
import EvaluateInfo from '@/package/interview/components/employees-group/evaluate-info/index.vue';

import ReportPreviewDialog from '@/package/interview/components/common/report-preview-dialog.vue';
import { _getValue } from '@/utils/util.js';

import {
    _syncInterviewReport,
    _interviewerRealation,
    _interviewerReportDetail,
    _interviewerReportValue,
    _interviewSaveEvaluate,
    _interviewHandleSubmit
} from '@/services/dashboard/interview';

import { _previewProgressInterview } from '@/services/dashboard/audit/preview.js';
import AuditPreviewDialoig from '@/components/audit-preview-dialog/index.vue';

import { deepCopy, easyExtend, extend } from '@/utils/object';

import { evaluationEmailStyle, evaluationStyle } from '@/package/interview/components/email-tpl/utils';
import browerCtrl from '@/mixins/brower-ctrl';

export default {
    name: 'GeneralReportDialog',
    mixins: [ browerCtrl ],
    components: {
        EvaluateInfo,
        StaffInfo,
        InterviewLog,
        AuditPreviewDialoig,
        ReportPreviewDialog
    },
    provide() {
        return {
            elRoot: this
        };
    },
    data() {
        return {
            ///////

            //// 报告角色
            originRempRole: {
                1: {
                    // 员工本人
                    label: '员工姓名',
                    tempCode: '', // 保存角色模块code
                    list: []
                },
                2: {
                    // 直属上级
                    label: '直属上级',
                    tempCode: '', // 保存角色模块code
                    list: []
                },
                3: {
                    // 协作方
                    label: '协作人员',
                    tempCode: '',
                    list: []
                },
                4: {
                    // 下级
                    label: '下级',
                    tempCode: '',
                    list: []
                }
            },
            tempRole: null,

            ////////
            evaluateInfoConfig: {
                // 评估意见
                value: null,
                required: true,
                warningtip: '请选择评估建议',
                options: []
            },
            staffInfoConfig: {
                // 员工信息配置
                label: '',
                value: '',
                id: '',
                email: '',
                deptLevel1Name: '',
                deptLevel2Name: '',
                deptLevel3Name: '',
                jobDeptName: '',
                required: true,
                warningtip: '请选择'
            },
            interviewDateConfig: {
                // 访谈时间配置
                label: '访谈时间',
                value: '',
                required: true,
                warningtip: '请选择访谈时间'
            },
            evaluateDateConfig: {
                // 评估日期（3.0新增）
                label: '转正日期',
                value: '',
                show: false,
                required: true,
                disabled: false,
                warningtip: '请选择日期'
            },

            uploadFileConfig: {
                // 上传附件（新增）
                label: '访谈附件',
                exname: '.jpg.png.pdf.doc.docx.xls.xlsx',
                filesize: 10, // 单个文件上传大小限制 单位: M
                totalFilesize: 10, // 文件总大小上限
                filenameLength: 40, // 文件名长度限制
                files: [],
                value: '',
                show: true,
                required: false,
                disabled: false,
                multiple: true, // 是否支持多个
                warningtip: '请点击上传访谈附件',
                formatWarningtip: '格式错误，仅支持JPG/PNG/PDF/Word/Excel'
            },
            uploadFileParentCode: 'field_10002_101', // 新增【访谈附件】字段对应父模块code

            suggestDescConfig: {
                label: '建议说明',
                value: '',
                show: true,
                required: false,
                valueMaxLength: 500,
                valuePlaceholder: '评估建议原因说明，选填，500字符'
            },

            /////////

            openDialog: false,
            showMessage: false,

            ///
            title: '',
            renderConfig: null,
            originConfig: null, // 原始配置
            originModel: [], // 原始模板
            renderModel: [],
            isDetail: 0,
            type: 0, // 访谈类型
            orderInfo: null,
            roleInfo: null,
            resultList: [],
            fieldInfo: [],
            formId: '',
            fromModule: '',
            ////

            submitting: false,
            isRender: true,
            evaluateDom: '',
            saveType: 0, // 保存类型 0 保存 1 发送
            initForbidStr: ''  // 用于判断内容是否发生修改
        };
    },
    computed: {
        noDynamicRenderRole() {
            // 禁止编辑 或 工单状态为 已完成
            return this.isDetail || (this.orderInfo && this.orderInfo.status === 3);
        },
        // 是否是新流程数据
        isNewProcessData() {
            let item = this.orderInfo;
            // 报告状态不是【待提审】且 无流程id则为旧数据，否则为新数据
            return !(item && +item.reportStatus !== 1 && !item.processInstanceId);
        },
        dialogName() {
            let userName =  _getValue(this.roleInfo, 'intervieweeUsers[0].name', '');
            return userName ? userName + '的访谈报告' : '访谈报告';
        }
    },
    watch: {
        evaluateDom: {
            handler(val) {
                // console.log('===evaluateDom==',val);
                if (val) {
                    setTimeout(() => {
                        this.updateReport(this.saveType);
                    }, 500);
                }
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        this.checkNotForbid = false;            // 返回拦截
    },
    //方法集合
    methods: {
        componentName(i) {
            switch (i) {
                case 0:
                    return 'StaffInfo';
                case 1:
                    return 'InterviewLog';
                case 2:
                    return 'EvaluateInfo';
                default:
                    return '';
            }
        },

        ///////
        getData(item, resultList, type, historyConfig, from) {
            this.$toast('正在加载，请稍等...', 'loading');
            if (historyConfig) {
                // 从详情页面点击列表里面的查看按钮进入
                Promise.all([
                    _interviewerRealation({ id: item.id }), // 获取被访谈人角色信息
                    _interviewerReportValue({ resultId: item.resultId }) // 获取报告系统字段值
                ]).then((resArr) => {
                    // console.log(resArr);

                    this.$toast.hide();
                    if (resArr.every((v) => v.success)) {
                        if (!resArr[0] || !resArr[0].root) {
                            this.$toast('请求工单角色信息失败', 'warning');
                            return;
                        }

                        let params = {
                            roleInfo: resArr[0].root, // 工单角色信息
                            fieldInfo: resArr[1].root, // 员工系统字段信息
                            modelData: historyConfig.formJson ? JSON.parse(historyConfig.formJson) : '',
                            modelConfig: historyConfig.formConfig ? JSON.parse(historyConfig.formConfig) : '',
                            formId: '',
                            title: '',
                            isDetail: 1,

                            type: +item.type, //  访谈类型
                            orderInfo: item, // 工单信息
                            resultList, // 评估意见选项
                            from // 来源
                        };

                        this.open(params);
                    } else {
                        let resErrror = resArr.find((v) => !v.success);
                    }
                });
            } else {
                Promise.all([
                    _interviewerRealation({ id: item.id }), // 获取被访谈人角色信息
                    _interviewerReportDetail({ interviewId: item.id }), // 获取报告详情
                    _interviewerReportValue({ resultId: item.resultId }) // 获取报告系统字段值
                ]).then((resArr) => {
                    // console.log('Promise.all',resArr);

                    this.$toast.hide();
                    if (resArr.every((v) => v.success)) {
                        if (!resArr[0] || !resArr[0].root) {
                            this.$toast('请求工单角色信息失败', 'warning');
                            return;
                        }

                        // if (!resArr[1] || !resArr[1].root || !resArr[1].root.formJson || !resArr[1].root.formConfig) {
                        //     this.$toast('请先编辑访谈模板','warning');
                        //     return;
                        // }

                        let params = {
                            roleInfo: resArr[0].root, // 工单角色信息
                            fieldInfo: resArr[2].root, // 员工系统字段信息
                            modelData: resArr[1].root.formJson ? JSON.parse(resArr[1].root.formJson) : '',
                            modelConfig: resArr[1].root.formConfig ? JSON.parse(resArr[1].root.formConfig) : '',
                            formId: resArr[1].root.formId,
                            title: '',
                            // 0 编辑 1 查看:报告状态为「审批中」「审批通过」 「已终止」;工单状态为「已终止」；或者 当前访谈负责人不是自己时
                            isDetail:
                                type === 'disabled' ||
                                item.status === 4 ||
                                item.reportStatus === 2 ||
                                item.reportStatus === 3 ||
                                item.reportStatus === 5 ||
                                item.currentUserId !== item.interviewerId
                                    ? 1
                                    : 0,

                            type: +item.type, //  访谈类型
                            orderInfo: item, // 工单信息
                            resultList, // 评估意见选项
                            from // 来源
                        };

                        this.open(params);
                    } else {
                        let resErrror = resArr.find((v) => !v.success);
                        this.$toast(resErrror.message || resErrror.msg || '请求失败', 'warning');
                    }
                });
            }
        },
        open(params) {
            // console.log('openconfg', params.modelConfig);
            // console.log('openmodelData', params.modelData);

            this.title = params.title || '';
            this.type = params.type || 0;
            this.isDetail = params.isDetail || 0;
            this.orderInfo = params.orderInfo || null;
            this.roleInfo = params.roleInfo || null;
            (this.renderModel = params.modelData || []), (this.originModel = deepCopy(params.modelData || []));
            this.resultList = params.resultList || [];
            this.fieldInfo = params.fieldInfo || [];
            this.formId = params.formId || '';

            this.tempRole = deepCopy(this.originRempRole);
            // console.log(this.tempRole,'===this.tempRole')

            /**
             * config初始化：员工信息，访谈时间，评估意见
             * 访谈3.0新增：评估日期
             */
            this.evaluateInfoConfig.options = this.resultList;
            this.fromModule = params.from || '';

            if (params.modelConfig) {
                // 有模板
                let _modelConfig = params.modelConfig;
                // console.log('===_modelConfig', _modelConfig);

                // console.log(_modelConfig.field_20001_001.options[4].value);
                let index;
        
                for (let i in _modelConfig) {
                    if (_modelConfig[i].type === 10002 && _modelConfig[i].roleId) {
                        // 角色模块 且 有角色
                        _modelConfig[i].staffInfo = easyExtend(this.staffInfoConfig, _modelConfig[i].staffInfo || {});
                        _modelConfig[i].interviewDate = easyExtend(this.interviewDateConfig, _modelConfig[i].interviewDate || {});
                    }

                    if (_modelConfig[i].type === 10002 && _modelConfig[i].roleId !== 1) {
                        // 角色模块 且 非本人
                        if (this.type !== 8 || (this.type === 8 && !_modelConfig[i].roleId)) {
                            // 晋升访谈只有评估意见添加
                            _modelConfig[i].evaluateInfo = easyExtend(this.evaluateInfoConfig, _modelConfig[i].evaluateInfo || {});
                        }
                    }

                    if (i === this.uploadFileParentCode && this.type !== 8) {
                        index = i;
                        // 评估意见 且 非晋升访谈 : 增加评估日期字段
                        _modelConfig[i].evaluateDate = easyExtend(this.evaluateDateConfig, _modelConfig[i].evaluateDate || {});
                    }

                    if (i === this.uploadFileParentCode) {
                        // 评估意见：增加建议说明
                        _modelConfig[i].suggestDesc = easyExtend(this.suggestDescConfig, _modelConfig[i].suggestDesc || {});
                    }

                    if (i === this.uploadFileParentCode) {
                        // 评估意见 : 增加访谈附件字段
                        _modelConfig[i].interviewUploadFile = easyExtend(this.uploadFileConfig, _modelConfig[i].interviewUploadFile || {});
                    }
                }

                ////////
                this.renderConfig = _modelConfig;
                this.originConfig = deepCopy(_modelConfig);

                ///// 添加系统字段
                let filedOpts = this.renderConfig['field_20001_001'].options;

                filedOpts.forEach((v) => {
                    let cur = null;
                    // 优先取ID为空的，取不到再取ID不为空的
                    cur = this.fieldInfo.find((sub) => !sub.id && sub.fieldCode === v.code);
                    if (!cur) {
                        cur = this.fieldInfo.find((sub) => sub.id && sub.fieldCode === v.code);
                    }
                    if (cur) v.value = cur.fieldVal;
                });

                this.formatRoleModule(); // 角色模块初始化

                //// 重新渲染
                this.isRender = false;
                this.showMessage = false;

                // 在此处才能正确读取未保存的数据的值
                // console.log(_modelConfig.field_20001_001.options[4].value);
                // 员工基本信息
                const basicInfo = _modelConfig['field_20001_001']?.options || [];
                // console.log(basicInfo, this.type)
                const startCode = [4,5].includes(this.type)? 'traineeStartDate':'joinDate';
                const timelength = [4,5].includes(this.type)? 'noviciate':'probationCode';
                // 入职时间 见习开始时间traineeStartDate
                const joinDate = basicInfo.find((e) => e.code === startCode);
                const joinDateValue = joinDate?.value;
                // 试用期限 见习期限noviciate
                const probationValue = basicInfo.find((e) => e.code === timelength)?.value;
                const probation = probationValue && Number(probationValue[0]);
                
                if (joinDateValue && probation && [3, 6].includes(probation)) {
                    const date = new Date(joinDateValue);
                    const day = date.getDate();
                    date.setDate(1);
                    date.setMonth(date.getMonth() + probation);
                    const newDate = new Date(date.getFullYear(),date.getMonth()+1,0);   //最后一个参数为0,意为一共多少天
                    const dayNum = newDate.getDate(); // 该月天数
                    if(day <= dayNum) {
                        date.setDate(day);
                    } else {
                        date.setDate(dayNum);
                    }
                    _modelConfig[index].evaluateDate.maxDate = date;
                }

                // 用户弹窗阻断判断是否修改
                this.initForbidStr = JSON.stringify(this.renderConfig);

                this.$nextTick(() => {
                    this.isRender = true;
                });
            }

            if (!this.openDialog) this.openDialog = true;
        },
        close() {
            this.openDialog = false;
            this.showMessage = false;
            this.title = '';
            this.renderModel = [];
            this.renderConfig = null;
            this.originModel = [];
            this.originConfig = null;
            this.type = 0;
            this.isDetail = 0;
            this.orderInfo = null;
            this.roleInfo = null;
            this.resultList = [];
            this.fieldInfo = [];
            this.formId = '';
            this.fromModule = '';

            this.notForbid = true;   // 用于弹窗阻断 在弹窗阻断混入中使用

            this.$emit('on-close', true);
        },
        onCancel() {
            if (!this.validateValueChange()) {
                this.close();
                return;
            }

            let _this = this;
            this.$dialog({
                title: '取消',
                content: '是否确认取消，取消后当前内容将不会保存。',
                type: 'warning',
                preventConfirm: true,
                onConfirm: function () {
                    this.hide();
                    _this.close();
                }
            });
        },
        onInitialize() {
            let _this = this;
            this.$dialog({
                title: '同步访谈模板',
                content: '是否确认同步，同步之后，当前所填信息全部清空，不可恢复。',
                type: 'warning',
                preventConfirm: true,
                onConfirm: function () {
                    _syncInterviewReport({ resultId: _this.orderInfo.resultId }).then((res) => {
                        // console.log('res',res);
                        if (res.success) {
                            _this.getData(_this.orderInfo, _this.resultList);
                            this.hide();
                        }
                    });
                }
            });
        },

        onPre() {
            this.$refs.reportPreviewDialog.open({
                renderModel: this.renderModel,
                renderConfig: this.renderConfig,
                title: this.orderInfo.type,
                formType: 1 //首月访谈表
            });
        },

        ////数组重复判断
        isRepeat(arr) {
            let hash = {};
            for (let i in arr) {
                // // console.log(i,hash);
                if (hash[arr[i]]) {
                    return true;
                }
                hash[arr[i]] = true;
            }
            return false;
        },

        async preview() {
            this.onSave(0, true);
        },
        async doPreview() {
            try {
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
            } catch (error) {
                
            }
        },

        ///保存
        onSave(type, isPreview) {
            console.log(type, isPreview);
            this.saveType = type;
            // 去掉角色信息为空的数据
            const newObj = {};
            Object.keys(this.renderConfig).forEach(key => {
                if(!(this.renderConfig[key].staffInfo && !this.renderConfig[key].staffInfo.value)) {
                    newObj[key] = this.renderConfig[key];
                } 
            });
            this.renderConfig = newObj;

            /////保存时： 角色信息为空校验
            if (!type && Object.keys(this.renderConfig).some((i) => this.renderConfig[i].staffInfo && !this.renderConfig[i].staffInfo.value)) {
                this.$toast('请添加角色信息后再保存', 'warning');
                ////// 定位到可视区域
                this.$nextTick(() => {
                    let warningDom = document.querySelector('.interview-template-dialog .general-report-content .role-part .empty-role-info');
                    // console.log('=====  warningDom',warningDom);
                    if (warningDom) {
                        warningDom.scrollIntoView({ block: 'center' });
                        warningDom.classList.add('warning-border');
                    }
                });
                /////
                return;
            }

            /////

            ///// 角色重复校验
            let obj = {
                1: [],
                2: [],
                3: [],
                4: []
            };
            for (let i in this.renderConfig) {
                if (this.renderConfig[i].staffInfo && this.renderConfig[i].staffInfo.id) {
                    obj[this.renderConfig[i].roleId].push(this.renderConfig[i].staffInfo.id);
                }
            }
           
            for (let i in obj) {
                if (this.isRepeat(obj[i])) {
                    this.$toast(`${this.tempRole[i].label}人员重复，请进行修改`, 'warning');
                    return;
                }
            }
            ///////

            if (type) {
                // 编辑邮件
                let isWarning = this.onValid();

                // console.log('====isWarning',isWarning);
                if (isWarning) {
                    this.showMessage = true;

                    ////// 定位到可视区域
                    this.$nextTick(() => {
                        let warningDom = document.querySelector('.interview-template-dialog .general-report-content .interview-temp-warning');
                        // console.log('=====  warningDom',warningDom);
                        warningDom && warningDom.scrollIntoView({ block: 'center' });
                    });
                    /////

                    return;
                }

                // console.log('======valid success');

                if(isPreview) {
                    this.doPreview();
                } else {
                    this.$toast('正在提交，请稍等...', 'loading');
                    this.findEvalate(); // 查找评估表
                }

               

                // this.updateReport(type);
            } else {
                // 保存
                // 用户弹窗阻断判断是否修改 保存之后更新表单值json串
                this.initForbidStr = JSON.stringify(this.renderConfig);
                if(isPreview) {
                    this.doPreview();
                } else {
                    this.$toast('正在提交，请稍等...', 'loading');
                    this.findEvalate(); // 查找评估表
                }
            }
        },
        // 校验
        onValid() {
            // console.log('======renderconfig',this.renderConfig);
            try {
                for (let i in this.renderConfig) {
                    if (this.renderConfig[i].questionList && !this.renderConfig[i].questionList.length) {
                        this.$toast('请设置访谈问题', 'warning');
                        throw new Error('yes');
                    }

                    // 员工姓名
                    if (this.renderConfig[i].staffInfo && this.renderConfig[i].roleId) {
                        // 有角色
                        let staffInfo = this.renderConfig[i].staffInfo;
                        if (staffInfo.required && !staffInfo.value) {
                            throw new Error('yes');
                        }
                    }

                    // 问题
                    if (this.renderConfig[i].questionList && this.renderConfig[i].questionList.length) {
                        // 一级问题
                        if (+this.renderConfig[i].level === 1 && this.renderConfig[i].questionList.some((v) => v.required && !v.value)) {
                            throw new Error('yes');
                        }

                        // 二级问题
                        if (+this.renderConfig[i].level === 2) {
                            this.renderConfig[i].questionList.forEach((v) => {
                                if (v.children && v.children.length) {
                                    if (v.children.some((item) => item.required && !item.value)) {
                                        throw new Error('yes');
                                    }
                                }
                            });
                        }
                    }

                    // 自定义字段
                    if (this.renderConfig[i].options && this.renderConfig[i].options.length) {
                        if (this.renderConfig[i].options.some((v) => v.required && !v.value)) {
                            throw new Error('yes');
                        }
                    }

                    // 评估建议
                    if (this.renderConfig[i].evaluateInfo && +this.renderConfig[i].roleId !== 1) {
                        // 非 本人角色
                        let evaluateInfo = this.renderConfig[i].evaluateInfo;
                        if (evaluateInfo.required && !evaluateInfo.value) {
                            throw new Error('yes');
                        }
                    }

                    // 评估日期
                    if (this.renderConfig[i].evaluateDate && !+this.renderConfig[i].roleId && this.type !== 8) {
                        // 评估意见 且 非晋升访谈
                        let evaluateDate = this.renderConfig[i].evaluateDate;
                        if (evaluateDate.show && evaluateDate.required && !evaluateDate.value) {
                            throw new Error('yes');
                        }
                    }

                    // 访谈附件
                    if (this.renderConfig[i].interviewUploadFile && !+this.renderConfig[i].roleId) {
                        // 评估意见
                        let interviewUploadFile = this.renderConfig[i].interviewUploadFile;
                        if (interviewUploadFile.show && interviewUploadFile.required && !interviewUploadFile.files.length) {
                            // 非空校验
                            throw new Error('yes');
                        }
                    }

                    // 访谈时间
                    if (this.renderConfig[i].interviewDate && this.renderConfig[i].roleId) {
                        // 有角色
                        let interviewDate = this.renderConfig[i].interviewDate;
                        if (interviewDate.required && !interviewDate.value) {
                            throw new Error('yes');
                        }
                    }
                }

                return '';
            } catch (e) {
                return e.message;
            }
        },
        async updateReport(type) {
            this.$toast.hide();

            ///// 添加模板
            let _model = deepCopy(this.renderModel || []);
            let _config = deepCopy(this.renderConfig || {});
            let interviewLog = _model.find((v) => v.code === 'field_10001_002'); // 访谈记录
            
            for (let i in this.tempRole) {
                if (interviewLog.children.every((v) => this.tempRole[i].tempCode && v.code !== this.tempRole[i].tempCode)) {
                    // 没有模板code 添加

                    ////
                    let _code = this.tempRole[i].tempCode;
                    let config = deepCopy(this.originConfig[_code] || {}); // 获取模板

                    if (config.staffInfo) {
                        extend(config.staffInfo, { label: this.tempRole[i].label });
                    }

                    //// 新增配置
                    _config[_code] = config;
                    _model.forEach((v) => {
                        if (v.code === 'field_10001_002') {
                            // 访谈记录
                            v.children.push({ code: _code, roleId: +i });
                        }
                    });
                    //////
                }
            }

            // console.log('=====renderMOdel',this.renderModel);
            // console.log('=====_model',_model);
            // console.log('=====renderConfig',this.renderConfig);

            const evaluationEmail = this.evaluationEmail;
            // ：当前被访谈人是：组长名单=组长/大组长 或 城主区总名单=城主/区总，或评估建议=提前/延期，或上一次有延期记录的，需要逐级审批时，弹窗增加一句红色加粗字提示：注意：当前被访谈人属于重要的人或事，审批流会逐级审批到CEO。
            let delayOrAdvance = false;
            Object.entries(_config).forEach(([key, value]) => {
                if (key === 'field_10002_101' && value.evaluateInfo && ['2', '3', '7'].includes(value.evaluateInfo.value + '')) {
                    delayOrAdvance = true;
                }
            });

            let params = {
                resultId: this.orderInfo.resultId,
                send: type ? 1 : 0, // 0 保存 1 发送
                formJson: JSON.stringify(_model),
                formConfig: JSON.stringify(_config),
                evaluate: this.evaluateDom,
                formFieldValDTOS: this.getFormFieldVal(),
                evaluationEmail,
                evaluationStyle,
                evaluationEmailStyle,
                uploadFileParentCode: this.uploadFileParentCode || '',
                version: 1
            };
            // console.log('====sucess params',params);

            this.evaluateDom = '';

            if (this.submitting) return;
            this.submitting = true;
            this.$toast('正在保存，请稍等...', 'loading');
            try {
                const res = await _interviewSaveEvaluate(params);
                this.submitting = false;
                this.$toast.hide();
                if (res.success) {
                    if (type) {
                        let params = {
                            orderInfo: this.orderInfo,
                            renderModel: this.renderModel,
                            renderConfig: this.renderConfig,
                            from: this.fromModule
                        };

                        if (this.isNewProcessData) {
                            // 新数据
                            let _this = this;
                            this.$dialog({
                                title: '提交审批',
                                content: `<div class="tip-text">是否确认提交审批？请检查好访谈报告内容，请确认在「访谈人设置」中填写了被访谈人的协作方、下级、实际访谈人。`,
                                type: 'warning',
                                userHtmlString: true,
                                preventConfirm: true,
                                onConfirm: function () {
                                    let that = this;
                                    _this.postAudit(params, that);
                                }
                            });
                        } else {
                            // 旧数据
                            this.$emit('on-confirm', params);
                            this.close();
                        }
                    } else {
                        this.$toast('保存成功！', 'success');
                    }
                    
                } else {
                    this.$toast(res.message || '请求失败', 'warning');
                }
            } catch(err) {
                this.submitting = false;
                this.$toast(err.message || '请求失败', 'warning');
            }
        },
        // 审批
        async postAudit(params, that) {
            try {
                let data = {
                    resultId: this.orderInfo.resultId,
                    processInstanceId: this.orderInfo.processInstanceId || ''
                };
                const res = await _interviewHandleSubmit(data);
                if (res.success) {
                    that.hide();
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
        getFormFieldVal() {
            let arr = [];
            for (let i in this.renderConfig) {
                let fieldVal = '';
                if (+this.renderConfig[i].type === 10002) {
                    // 角色模块

                    if (this.renderConfig[i].interviewUploadFile) {
                        // 上传附件处理
                        let files = this.renderConfig[i].interviewUploadFile.files;
                        this.renderConfig[i].interviewUploadFile.value = files && files.length ? JSON.stringify(files) : '';
                    }

                    let obj = {
                        staffInfo: this.renderConfig[i].staffInfo || null,
                        interviewDate: this.renderConfig[i].interviewDate || null,
                        questionList: this.renderConfig[i].questionList || [],
                        evaluateInfo: this.renderConfig[i].evaluateInfo || null,
                        evaluateDate: this.renderConfig[i].evaluateDate || null,
                        interviewUploadFile: this.renderConfig[i].interviewUploadFile || null,
                        suggestDesc: this.renderConfig[i].suggestDesc || null
                    };

                    if (obj.interviewUploadFile) console.log(obj.interviewUploadFile);

                    fieldVal = JSON.stringify(obj);
                } else {
                    // 其他模块
                    fieldVal = this.renderConfig[i].options
                        ? JSON.stringify(this.renderConfig[i].options)
                        : JSON.stringify(this.renderConfig[i].value);
                }

                let json = {
                    formId: this.formId,
                    resultId: this.orderInfo.resultId,
                    fieldCode: i,
                    fieldName: this.renderConfig[i].name || '',
                    fieldVal
                };
                arr.push(json);
            }

            return arr;
        },
        // 获取报告预览表
        findEvalate() {
            this.$refs.reportPreviewDialog.getDom({
                renderModel: this.renderModel,
                renderConfig: this.renderConfig,
                title: this.orderInfo.type,
                formType: 1 //首月访谈表
            });
        },
        getEvaluate(value) {
            this.evaluateDom = value;
        },
        getBase64(value) {
            this.evaluationEmail = value;
        },
        ///////

        // 添加模块
        onAddModule(params) {
            // console.log('=====params',params);
            let time = +new Date();
            let code = `field_10002_${time}`; // 角色code
            this.updateRoleData(1, {
                code,
                tempCode: this.tempRole[params.roleId].tempCode,
                roleId: params.roleId,
                roleName: this.tempRole[params.roleId].label
            });
        },
        // 删除角色
        onDelModule(code) {
            // console.log('====code',code);

            this.updateRoleData(0, { code });
        },
        // 问题变化监听
        onUpateQuestion(params) {
            // // console.log('=====params',params);
            // this.renderConfig[params.code].questionList = params.list;
        },

        // 更新角色list
        formatRoleModule() {
            const { intervieweeUsers, reporterInfo, subordinateInfo, cooperateInfo } = this.roleInfo;
            if (intervieweeUsers && intervieweeUsers.length) {
                // 本人
                this.tempRole[1].list = intervieweeUsers;
            }
            if (reporterInfo && reporterInfo.length) {
                // 直属上级
                this.tempRole[2].list = reporterInfo;
            }

            if (cooperateInfo && cooperateInfo.length) {
                // 协作人员
                this.tempRole[3].list = cooperateInfo;
            }
            if (subordinateInfo && subordinateInfo.length) {
                // 下级
                this.tempRole[4].list = subordinateInfo;
            }

            this.traverseRole(); // 动态更新角色模块
        },

        // 动态添加报告角色模块
        traverseRole() {
            let interviewLog = this.originModel.find((v) => v.code === 'field_10001_002'); // 访谈记录 :用originModel不用renderModel
            // console.log('=====roleArr',interviewLog);

            //
            interviewLog.children.forEach((v) => {
                //
                if (+v.roleId === 1) {
                    // 本人

                    this.tempRole[1].tempCode = v.code; // 保存模板code

                    let obj = this.tempRole[1].list[0];
                    let json = {
                        label: this.tempRole[1].label || '',
                        value: obj.name || '',
                        id: obj.id || '',
                        email: obj.email || '',
                        deptLevel1Name: obj.deptLevel1Name || '',
                        deptLevel2Name: obj.deptLevel2Name || '',
                        deptLevel3Name: obj.deptLevel3Name || '',
                        jobDeptName: obj.jobDeptName || ''
                    };
                    this.renderConfig[v.code]?.staffInfo && extend(this.renderConfig[v.code].staffInfo, json);
                } else {
                    // 其他角色模块
                    const configInfo = this.originConfig[v.code];

                    if (!configInfo) return; // 在配置里没有找到相应code

                    let _staffInfo = configInfo?.staffInfo;

                    if (!_staffInfo || !_staffInfo.id) {
                        // 模板

                        this.tempRole[+v.roleId].tempCode = v.code; // 保存模板code
                        this.updateRoleData(0, { code: v.code }); //  先清空

                        if (this.noDynamicRenderRole) return; // 禁止动态渲染角色模块

                        if (this.tempRole[+v.roleId].list && this.tempRole[+v.roleId].list.length) {
                            // 该模板有角色

                            this.tempRole[+v.roleId].list.forEach((item, k) => {
                                // 遍历角色

                                //
                                if (
                                    interviewLog.children.some(
                                        (sub) => this.originConfig[sub.code]?.staffInfo && this.originConfig[sub.code]?.staffInfo.id === item.id
                                    )
                                ) {
                                    // 该角色模块下已存在该角色id
                                    return;
                                }

                                let time = +new Date();
                                let code = `field_10002_${time}${v.roleId}${k}`; // 角色code 保证唯一性
                                this.updateRoleData(1, { code, tempCode: v.code, roleId: +v.roleId, staffInfo: item }); // 新增
                            });
                        }
                    }
                    // console.log(this.tempRole)
                }
            });
        },

        /// 更新角色数据
        updateRoleData(type, params) {
            // 1, info
            if (type) {
                // 新增
                let config = deepCopy(this.originConfig[params.tempCode]);
                // console.log(type, params, '阿卡卡卡看', this.originConfig);
                if (params.staffInfo) {
                    // 添加角色信息
                    let json = {
                        label: this.tempRole[+params.roleId].label || '',
                        // value: params.staffInfo.name || '',
                        // value: +params.roleId === 3 ? `${params.staffInfo.deptLevel1Name ? `${params.staffInfo.deptLevel1Name}-` : ''}${params.staffInfo.deptLevel2Name ? `${params.staffInfo.deptLevel2Name}-` : ''}${params.staffInfo.deptLevel3Name ? `${params.staffInfo.deptLevel3Name}-` : ''}${params.staffInfo.name}` : `${params.staffInfo.name}`,
                        value:
                            +params.roleId === 3
                                ? `${params.staffInfo.jobDeptName ? `${params.staffInfo.jobDeptName}-` : ''}${params.staffInfo.name}`
                                : `${params.staffInfo.name}`,
                        id: params.staffInfo.id || '',
                        email: params.staffInfo.email || '',
                        deptLevel1Name: params.staffInfo.deptLevel1Name || '',
                        deptLevel2Name: params.staffInfo.deptLevel2Name || '',
                        deptLevel3Name: params.staffInfo.deptLevel3Name || '',
                        jobDeptName: params.staffInfo.jobDeptName || ''
                    };

                    extend(config.staffInfo, json);
                }
                // else {
                //     config.staffInfo = {}; // lg
                // }

                if (params.roleName) {
                    // 手动增加角色
                    extend(config.staffInfo, { label: params.roleName });
                }

                //// 新增配置
                this.renderConfig[params.code] = config;
                this.renderModel.forEach((v) => {
                    if (v.code === 'field_10001_002') {
                        // 访谈记录
                        v.children.push({ code: params.code, roleId: +params.roleId });
                    }
                });
            } else {
                // 删除
                this.renderModel.forEach((v) => {
                    if (v.code === 'field_10001_002') {
                        // 访谈记录
                        v.children.forEach((item, i) => {
                            if (item.code === params.code) {
                                v.children.splice(i, 1);
                            }
                        });
                    }
                });
                delete this.renderConfig[params.code];
            }

            // 排序
            this.renderModel.forEach((v) => {
                if (v.code === 'field_10001_002') {
                    // 访谈记录
                    v.children.sort((pre, cur) => {
                        return +pre.roleId - +cur.roleId; // 按roleId从小到大
                    });
                }
            });
            // console.log('==11111111===renderModel',this.renderModel);

            // 访谈记录模块 渲染更新
            if (this.openDialog && this.$refs[`sectionComp-field_10001_002`]) {
                try {
                    this.$refs[`sectionComp-field_10001_002`][0].formatModelFn();
                } catch (e) {
                    // console.log('====e',e);
                }
            }
        },
        // 浏览器阻断成功后回调
        forbidCallback() {
            this.openDialog = false;
            // window.history.pushState(null, null, document.URL);
        },
        // 判断前后数据时候变化
        validateValueChange() {
            return !(this.isDetail || this.initForbidStr === JSON.stringify(this.renderConfig));
        }
    }
};
</script>

<style lang='less' scoped>
//@import url();
</style>