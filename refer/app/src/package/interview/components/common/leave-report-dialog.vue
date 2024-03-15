<template>
    <ui-dialog
        v-model="openDialog"
        preventClose
        preventLayer
        @on-close="onCancel"
        :showFooter="false"
        :lock="true"
        :title="dialogName"
        wrapClass="interview-template-dialog interview-small-padding-dialog"
    >
        <template slot="content">
            <div v-if="originConfig && originModel" class="dialog-content leave-report-content">
                <ul v-if="isRender">
                    <li v-for="(item,i) in renderModel" :key="i">
                        <components :is="componentName(item)" :configData="renderConfig[item.code]" :index="i"></components>

                        <div v-if="item.children && item.children.length">
                            <div v-for="(obj, j) in item.children" :key="j">
                                <components
                                    v-if="switchShow(obj)"
                                    :is="componentName(obj)"
                                    :configData="renderConfig[obj.code]"
                                    :index="numShow(item.children, obj)"
                                    :showMessage="showMessage"
                                    :isDetail="isDetail"
                                    :type="type"
                                ></components>

                                <div v-if="obj.children && obj.children.length">
                                    <div v-for="(sub, k) in obj.children" :key="k">
                                        <components
                                            v-if="switchShow(sub)"
                                            :is="componentName(sub)"
                                            :configData="renderConfig[sub.code]"
                                            :index="numShow(obj.children, sub)"
                                            :showMessage="showMessage"
                                            :isDetail="isDetail"
                                            :type="type"
                                        ></components>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <!-- 在报告底部新增字段【访谈附件】 -->
                        <div v-if="renderConfig[item.code].interviewUploadFile && renderConfig[item.code].interviewUploadFile.show" class="interview-template-form order-controls">
                            <div class="common-styl">
                                <div class="judge-box judge-upload">
                                    <span class="label">{{renderConfig[item.code].interviewUploadFile.label}}：</span>
                                    <interview-upload :upload-data="renderConfig[item.code].interviewUploadFile"></interview-upload>
                                </div>
                            </div>
                        </div>                        
                    </li>
                </ul>
            </div>
            <div v-else class="text-gray no-template">
                暂无模板~
            </div>
            <div class="footer-btns">
                <button type="button" :disabled="!!isDetail" class="btn btn-primary btn-outline" @click="onInitialize">同步访谈报告模板</button>
                <button type="button" class="mr-l-20 btn btn-primary btn-outline" @click="onCancel">取消</button>
                <button type="button" :disabled="!originConfig || !originModel" class="mr-l-20 btn btn-primary btn-outline" @click="onPre">预览生成评估单样式</button>
                <button type="button" :disabled="isDetail || !originConfig || !originModel" class="mr-l-20 btn btn-primary btn-outline" @click="onSave(0)">保存</button>
                <button v-if="orderInfo" type="button" :disabled="isDetail || !originConfig || !originModel" class="mr-l-20 btn btn-primary" @click="onSave(1)">
                    {{ isNewProcessData ? '完成报告' : '编辑邮件'}}
                </button>
            </div>

            <!-- 评估表 -->
            <report-preview-dialog ref="reportPreviewDialog" 
                @evaluate="getEvaluate" 
                @base64="getBase64"></report-preview-dialog>
        </template>
    </ui-dialog>
</template>

<script>
import AnswerInput from '@/package/interview/components/field-base/answer-input/index.vue';
// import DateSelect from '@/package/interview/components/field-base/date-select/temp.vue';
import CheckboxSelect from '@/package/interview/components/field-base/checkbox-select/index.vue';
import GradeSelect from '@/package/interview/components/field-base/grade-select/index.vue';
import ListInput from '@/package/interview/components/field-base/list-input/index.vue';
import MatrixInput from '@/package/interview/components/field-base/matrix-input/index.vue';
import RadioInput from '@/package/interview/components/field-base/radio-select/index.vue';
import SectionInput from '@/package/interview/components/field-base/section-input/index.vue';
import BaseInfo from '@/package/interview/components/field-base/base-info/index.vue';

import InterviewUpload from '@/package/interview/components//common/interview-upload';

import ReportPreviewDialog from '@/package/interview/components/common/report-preview-dialog.vue';

import {
    _syncInterviewReport,
    _interviewerRealation,
    _interviewerReportDetail,
    _interviewerReportValue,
    _interviewSaveEvaluate,
    _interviewHandleComplete
} from '@/services/dashboard/interview';

import { deepCopy, easyExtend } from '@/utils/object';

import { evaluationEmailStyle, evaluationStyle } from '../email-tpl/utils';
import { _getValue } from '@/utils/util.js';
import browerCtrl from '@/mixins/brower-ctrl';

export default {
    name: 'leave-report-dialog',
    mixins: [ browerCtrl ],
    components: {
        AnswerInput,
        // DateSelect,
        CheckboxSelect,
        GradeSelect,
        ListInput,
        MatrixInput,
        RadioInput,
        SectionInput,
        BaseInfo,
        ReportPreviewDialog,
        InterviewUpload
    },
    data() {
        return {
            ///////
            openDialog: false,
            showMessage: false,

            ///
            title: '',
            renderConfig: null,
            originConfig: null, // 原始配置
            originModel: [], // 原始模板
            renderModel: [],
            isDetail: 0, 
            type: 0,
            orderInfo: null,
            fieldInfo: [],
            formId: '',
            fromModule: '',
            resultList: [],
            roleInfo: {},
            ////

            evaluateInfoConfig: { // 评估建议
                value: null,
                required: true,
                warningtip: '请选择评估建议',
                options: [],
            },

            uploadFileConfig: { // 上传附件（新增）
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
                formatWarningtip: '格式错误，仅支持JPG/PNG/PDF/Word/Excel',
            },
            uploadFileParentCode: '', // 新增【访谈附件】字段对应父模块code


            submitting: false,
            isRender: true,
            evaluateDom: '',
            saveType: 0, // 保存类型 0 保存 1 发送
            initForbidStr: '',  // 用于判断内容是否发生修改
        };
    },
    provide() {
        return {
            elRoot: this,
        };
    },
    computed: {
        // 是否是新流程数据
        isNewProcessData() {
            let item = this.orderInfo;
            // 报告状态不是【待提审】且 无流程id则为旧数据，否则为新数据
            return !(item && +item.reportStatus !== 1 && !item.processInstanceId);
        },
        dialogName() {
            let userName =  _getValue(this.roleInfo, 'intervieweeUsers[0].name', '');
            return userName ? userName + '的访谈报告' : '访谈报告';
        },
        // 用于弹窗阻断 在弹窗阻断混入中使用
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
    //方法集合
    methods: {
        
        componentName(obj) {
            let type = this.renderConfig[obj.code].type;
            switch(type) {
                case '001':
                    return 'AnswerInput';
                // case '002':
                //     return 'DateSelect';
                case '003':
                    return 'RadioInput';
                case '004':
                    return 'CheckboxSelect';
                case '005':
                    return 'MatrixInput';
                case '006':
                    return 'GradeSelect';
                case '007':
                    return 'SectionInput';
                case '008':
                    return 'ListInput';
                case 20001:
                    return 'BaseInfo';
                default:
                    return '';
            }
        },
        switchShow(obj) { // 是否应该展示
            let config = this.renderConfig[obj.code];
            if (!config.switch) {
                return true; // 无显示逻辑
            } else { // 有显示逻辑
                let switchArr = config.switchFields;
                if (switchArr.some(v => (this.renderConfig[v.code] && this.renderConfig[v.code].type === '003' && this.renderConfig[v.code].value === v.value) || (this.renderConfig[v.code] && this.renderConfig[v.code].type === '004' && this.renderConfig[v.code].value.indexOf(v.value) > -1))) { // 满足显示条件
                    return true;
                } else {
                    return false;
                }
                    
            }
        },
        numShow(arr, cur) {
            let index = 0;
            let _arr = arr.filter(v => {

                let _config = this.renderConfig[v.code];
                if (!_config.switch) {
                    return true;
                } else {
                    return _config.switchFields.some(sub => (this.renderConfig[sub.code] && this.renderConfig[sub.code].type === '003' && this.renderConfig[sub.code].value === sub.value) || (this.renderConfig[sub.code] && this.renderConfig[sub.code].type === '004' && this.renderConfig[sub.code].value.indexOf(sub.value) > -1));
                }
            });

            for(let i in _arr) {
                
                if (_arr[i].code === cur.code) {
                    return +i;
                }
            }
        },

        ///////
        getData(item, resultList, type, historyConfig, from) {
            this.$toast('正在加载，请稍等...','loading');

            if (historyConfig) {
                Promise.all([
                    _interviewerRealation({id: item.id}), // 获取被访谈人角色信息
                    _interviewerReportValue({resultId:item.resultId}) // 获取报告系统字段值
                ])
                    .then(resArr => {
                        // console.log(resArr);
                        this.$toast.hide();
                        if (resArr.every(v => v.success)) {

                            if (!resArr[0] || !resArr[0].root) {
                                this.$toast('请求工单角色信息失败','warning');
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
                                from
                            };

                            this.open(params);

                        } else {
                            let resErrror = resArr.find(v => !v.success);
                            this.$toast(resErrror.message || resErrror.msg || '请求失败','warning');
                        }
                    });
            } else {
                Promise.all([
                    _interviewerRealation({id: item.id}), // 获取被访谈人角色信息
                    _interviewerReportDetail({interviewId: item.id}), // 获取报告详情
                    _interviewerReportValue({resultId:item.resultId}) // 获取报告系统字段值
                ])
                    .then(resArr => {
                        // console.log(resArr);
                        this.$toast.hide();
                        if (resArr.every(v => v.success)) {

                            if (!resArr[0] || !resArr[0].root) {
                                this.$toast('请求工单角色信息失败','warning');
                                return;
                            }

                            // if (!resArr[1] || !resArr[1].root || !resArr[1].root.formJson || !resArr[1].root.formConfig) {
                            //     this.$toast('请先编辑访谈模板','warning');
                            //     return;
                            // }

                            let params = {
                                roleInfo: resArr[0].root, // 工单角色信息
                                fieldInfo: resArr[2].root, // 员工系统字段信息
                                modelData: resArr[1].root && resArr[1].root.formJson ? JSON.parse(resArr[1].root.formJson) : '',
                                modelConfig: resArr[1].root && resArr[1].root.formConfig ? JSON.parse(resArr[1].root.formConfig) : '',
                                formId: resArr[1].root.formId,
                                title: '',
                                // 0 编辑 1 查看:报告状态为「审核中」「已发送」 「已终止」;工单状态为终止；且 当前访谈负责人不是自己时
                                isDetail: type === 'disabled' || item.status === 4 || item.reportStatus === 2 || item.reportStatus === 3 || item.reportStatus === 5 || item.currentUserId !== item.interviewerId ? 1 : 0,

                                type: +item.type, // 1 访谈类型
                                orderInfo: item, // 工单信息
                                resultList, // 评估意见选项
                                from
                            };

                            this.open(params);

                        } else {

                            let resErr = resArr.find(v => !v.success);
                            this.$toast(resErr.message || '请求失败','warning');
                        }
                    });
            }
           
        },
        open(params) {
            this.title = params.title || '';
            this.type = params.type || 0;
            this.isDetail = params.isDetail || 0;
            this.orderInfo = params.orderInfo || null;
            this.renderModel = params.modelData || [],
            this.originModel = deepCopy(params.modelData || []);
            this.fieldInfo = params.fieldInfo || [];
            this.formId = params.formId || '';
            // this.renderConfig = params.modelConfig;
            this.fromModule = params.from || '';
            this.resultList = params.resultList || [];
            this.evaluateInfoConfig.options = this.resultList;
            this.roleInfo = params.roleInfo || {};

            const getUploadFileParentCode = (config) => {
                if (+this.type === 7) return 'field_008_001';
                return config['field_008_003'] ? 'field_008_003' : 'field_008_002';
            };
            this.uploadFileParentCode = getUploadFileParentCode(params.modelConfig); // 获取uploadFileParentCode

            if (params.modelConfig) {

                /**
                 * 新增字段
                 */
                let _modelConfig = params.modelConfig;
                for(let i in _modelConfig) {

                    // 统一新增【访谈附件】字段
                    if (i === this.uploadFileParentCode) {
                        _modelConfig[i].interviewUploadFile = easyExtend(this.uploadFileConfig, _modelConfig[i].interviewUploadFile || {}); // 新增【访谈附件】
                    }

                    // 离职回访：在【意见建议】模块下新增【评估建议】字段
                    if (+this.type === 7 && i === 'field_005_10011') {
                        _modelConfig[i].evaluateInfo = easyExtend(this.evaluateInfoConfig, _modelConfig[i].evaluateInfo || {}); // 新增【评估建议】
                    }
                    
                }
                this.renderConfig = _modelConfig;
                ////////


                this.originConfig = deepCopy(params.modelConfig);
                ///// 添加系统字段
                let filedOpts = this.renderConfig['field_20001_001'].options;
                filedOpts.forEach(v => {
                    let cur = null;
                    // 优先取ID为空的，取不到再取ID不为空的
                    cur = this.fieldInfo.find(sub => !sub.id && sub.fieldCode === v.code);
                    if (!cur) {
                        cur = this.fieldInfo.find(sub => sub.id && sub.fieldCode === v.code);
                    }
                    if (cur) v.value = cur.fieldVal;
                });

                // 用户弹窗阻断判断是否修改
                this.initForbidStr = JSON.stringify(this.renderConfig);

            
                //// 重新渲染
                this.isRender = false;
                this.showMessage = false;
                this.$nextTick(() => {
                    this.isRender = true;
                });
            /////
            };
            

            



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
            this.fieldInfo = [];
            this.formId = '';
            this.fromModule = '';
            this.resultList = [];

            this.notForbid = true;

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
                onConfirm: function() {
                    
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
                onConfirm: function() {
                    _syncInterviewReport({resultId: _this.orderInfo.resultId}).then(res => {
                        // console.log('res',res);
                        if (res.success) {
                            _this.getData(_this.orderInfo,_this.resultList);
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
                formType: 0     //离职表
            });  
        },


        onSave(type) {

            this.saveType = type;


            if (type) { // 编辑邮件
                let isWarning = this.onValid();

                // console.log('====isWarning',isWarning);
                if (isWarning) {
                    this.showMessage = true;

                    ////// 定位到可视区域
                    this.$nextTick(() => {
                        let warningDom = document.querySelector('.interview-template-dialog .leave-report-content .interview-temp-warning');
                        // console.log('=====  warningDom',warningDom);
                        warningDom && warningDom.scrollIntoView({ block: 'center' });
                    });
                    /////


                    return;
                }

                // console.log('======valid success');

                this.$toast('正在提交，请稍等...','loading');

                this.findEvalate(); // 查找评估表

                // this.updateReport(type);
            } else { // 保存
                // this.updateReport(type);
                this.$toast('正在提交，请稍等...','loading');
                // 用户弹窗阻断判断是否修改 保存之后更新表单值json串
                this.initForbidStr = JSON.stringify(this.renderConfig);
                this.findEvalate(); // 查找评估表
            }
        },


        // 校验
        onValid() {
            // console.log('======renderconfig',this.renderConfig);
            try {
                for (let i in this.renderConfig) {

                    let obj = this.renderConfig[i];

                    if (obj.type === '001') { // 问答

                        if (!obj.switch || (obj.switch && obj.switchFields.some(v => +v.value === +this.renderConfig[v.code].value))) { // 必现，或 满足展示条件
                            if (obj.required && !obj.value) { // 未填
                                throw new Error('yes');
                            }
                        }
                       
                    }

                    if (obj.type === '003') { // 单选
                        if (
                            !obj.switch || (obj.switch && obj.switchFields.some(v => (this.renderConfig[v.code].type === '003' && +v.value === +this.renderConfig[v.code].value) || (this.renderConfig[v.code].type === '004' && +this.renderConfig[v.code].value.indexOf(+v.value) > -1)))) { // 必现，或 满足展示条件
                            if (obj.required && !obj.value) { // 未选
                                throw new Error('yes');
                            }

                            if (obj.options.some(v => +obj.value === v.value  && v.required && !v.inputvalue)) { // 选中项有备注未填
                                throw new Error('yes');
                            }
                        }
                    }

                   


                    if (obj.type === '004') { // 多选
                        
                        if (!obj.switch || (obj.switch && obj.switchFields.some(v => (this.renderConfig[v.code].type === '003' && +v.value === +this.renderConfig[v.code].value) || (this.renderConfig[v.code].type === '004' && +this.renderConfig[v.code].value.indexOf(+v.value) > -1)))) { // 必现，或 满足展示条件
                            if (obj.required && !obj.value.length) {
                                throw new Error('yes');
                            }

                            if (obj.options.some(v => obj.value.indexOf(v.value) > -1 && v.required && !v.inputvalue)) { // 选中项有备注未填
                                throw new Error('yes');
                            }


                        }
                    }


                    if (obj.type === '005') { // 矩阵

                        if (!obj.switch || (obj.switch && obj.switchFields.some(v => +v.value === +this.renderConfig[v.code].value))) { // 必现，或 满足展示条件
                            if (obj.options.some(v => v.required && !v.value)) { // 未填
                                throw new Error('yes');
                            }

                            // 评估建议
                            if(obj.evaluateInfo && this.type === 7) { // 有评估建议 且 是离职回访
                                let evaluateInfo = obj.evaluateInfo;
                                if (evaluateInfo.required && !evaluateInfo.value) {
                                    throw new Error('yes');
                                }
                            }

                            // 上传附件
                            if(obj.interviewUploadFile) { // 有访谈附件
                                let interviewUploadFile = obj.interviewUploadFile;
                                if (interviewUploadFile.required && !interviewUploadFile.files.length) {
                                    throw new Error('yes');
                                }
                            }
                        }

                        

                    }

                    if (obj.type === '006') { // 评分
                        if (!obj.switch || (obj.switch && obj.switchFields.some(v => +v.value === +this.renderConfig[v.code].value))) { // 必现，或 满足展示条件
                            if (obj.children.some(v => v.required && !String(v.value))) {
                                throw new Error('yes');
                            }
                        }
                        
                    }
                }

                return '';
            } catch(e) {
                return e.message;
            }
            
            
        },
        async updateReport(type) {
            this.$toast.hide();


            ////// 清除隐藏选项值
            for(let i in this.renderConfig) {
                let config = this.renderConfig[i];
                if (config.switch) {
                    let switchArr = config.switchFields;
                    if (switchArr.every(v => {

                        if (this.renderConfig[v.code].type === '003') { // 单选
                            return this.renderConfig[v.code].value !== v.value;
                        }

                        if (this.renderConfig[v.code].type === '004') { // 多选
                            return this.renderConfig[v.code].value.indexOf(v.value) === -1;
                        }


                    })) { // 不满足显示条件

                        if (config.type === '003') { // 单选
                            this.renderConfig[i].value = '';
                            this.renderConfig[i].options.forEach(v => v.inputvalue = '');
                        } else if (config.type === '004') { // 多选
                            this.renderConfig[i].value = [];
                            this.renderConfig[i].options.forEach(v => v.inputvalue = '');
                        } else { // 其他
                            this.renderConfig[i].value = '';
                        }
                    }   
                }
            }
            //////

            // console.log('=====renderMOdel',this.renderModel);
            // console.log('=====renderConfig',this.renderConfig);

            const evaluationEmail = this.evaluationEmail;

            let params = {
                resultId: this.orderInfo.resultId,
                send: type ? 1 : 0, // 0 保存 1 发送
                formJson: JSON.stringify(this.renderModel),
                formConfig: JSON.stringify(this.renderConfig),
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
            this.$toast('正在保存，请稍等...','loading');
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

                        if (this.isNewProcessData) { // 新数据
                            let _this = this;
                            this.$dialog({
                                title: '完成报告',
                                content: '是否确认完成报告？点击确定后不可撤销',
                                type: 'warning',
                                preventConfirm: true,
                                onConfirm: function() {
                                    let that = this;
                                    _this.postComplete(params, that);
                                }
                            });
                        } else { // 旧数据
                            this.$emit('on-confirm', params);
                            this.close();
                        }
                        
                    } else {
                        this.$toast('保存成功！','success');
                    }
                    
                }
            } catch(e) {
                this.submitting = false;
            }
        },
        // 审批
        async postComplete(params, that) {
            let data = {
                interviewId: this.orderInfo.id,
                interviewerId: this.orderInfo.interviewerId,
                result: 10
            };
            try {
                const res  = await _interviewHandleComplete(data);
                if (res.success) {
                    that.hide();
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
        getFormFieldVal() {
            let arr = [];
            for(let i in this.renderConfig) {

                if (this.renderConfig[i].interviewUploadFile) { // 上传附件处理
                    let files = this.renderConfig[i].interviewUploadFile.files;
                    this.renderConfig[i].interviewUploadFile.value = files && files.length ? JSON.stringify(files) : '';
                }


                let obj = {
                    value: this.renderConfig[i].value || '',
                    options: this.renderConfig[i].options || null,
                    children: this.renderConfig[i].children || null,
                    evaluateInfo: this.renderConfig[i].evaluateInfo || null,
                    interviewUploadFile: this.renderConfig[i].interviewUploadFile || null
                };
                obj.interviewUploadFile && console.log('====obj',obj.interviewUploadFile);
                let json = {
                    formId: this.formId,
                    resultId: this.orderInfo.resultId,
                    fieldCode: i,
                    fieldName: this.renderConfig[i].typeDesc || this.renderConfig[i].name || '',
                    fieldVal: JSON.stringify(obj)
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
                formType: 0,     //离职访谈表
            });
        },
        getEvaluate(value) {
            this.evaluateDom = value;
        },
        getBase64(value) {
            this.evaluationEmail = value;
        },
        ///////
        // 浏览器阻断成功后回调
        forbidCallback() {
            this.openDialog = false;
            // window.history.pushState(null, null, document.URL);
        },
        // 判断前后数据时候变化
        validateValueChange() {
            return !(this.isDetail || this.initForbidStr === JSON.stringify(this.renderConfig));
        }
    },
    created() {
        // // console.log('=====mock',mock.ACTIVE_LEAVE_TEMP);
        
    },
    mounted() {
        this.checkNotForbid = false;
    },
};
</script>
<style lang='less' scoped>
//@import url();

</style>

