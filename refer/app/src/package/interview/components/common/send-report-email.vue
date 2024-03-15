<template>
    <ui-dialog
        v-model="openDialog"
        preventClose
        preventLayer
        @on-close="close"
        @on-layer="close"
        :showFooter="false"
        :lock="true"
        :title="'发送访谈报告邮件'"
        wrapClass="interview-template-dialog dialog-equipment-second send-tmeplate-email"
    >
        <template slot="content">
            <div class="dialog-content" v-if="isRender">
                <ui-form ref="emailTipForm" :model="emailData" :rules="emailRuleData" :inline="true" class="interviewer-set" :labelWidth="100" :showMessage="showMessage">
                     <div class="interviewer-show">
                         <h4>被访谈人：{{emailData.name || '-'}}</h4>
                         <p class="text-gray">{{emailData.email || '-'}}</p>
                     </div>
                     <div style="marginBottom:20px;">
                        <p>访谈类型：{{emailData.typeStr || '-'}}</p>
                     </div>
                    <form-item label="收件人：" prop="receiver" class="item-through">
                        <v-select
                            class="select-email"
                            placeholder="请输入"
                            multiple
                            label="name"
                            v-model="emailData.receiver"
                            :disabled="true"
                            :options="showUsersData"
                            :searchable="true"
                            :filterable="true"
                            :taggable="false"
                            @search="filterEmails"
                            @input="inputEmails"
                            >
                        </v-select>
                    </form-item>
                    <form-item label="抄送人：" prop="copyTo" class="item-through">
                        <v-select
                            class="select-email"
                            placeholder="请输入"
                            multiple
                            label="name"
                            v-model="emailData.copyTo"
                            :disabled="true"
                            :options="showUsersData"
                            :searchable="true"
                            :filterable="true"
                            :taggable="false"
                            @search="filterEmails"
                            @input="inputEmails"
                            >
                        </v-select>
                    </form-item>
                    <form-item label="邮件模板：" prop="templateId" class="item-through">
                        <ui-select v-model="emailData.templateId" placeholder="请选择" @on-change="onTempChange">
                            <ui-option
                                v-for="(item,i) in emailTemplateList"
                                :value="item.value"
                                :key="i"
                            >{{item.label}}</ui-option>
                        </ui-select>
                    </form-item>
                    <!-- 模板 -->
                    <div class="template-cont">
                        <form-item label="标题：" prop="templateTitle" class="item-through">
                            <ui-input v-model.trim="emailData.templateTitle" placeholder="请输入" :maxlength="100"></ui-input>
                        </form-item>
                        <form-item label="内容：" prop="templateContent" class="item-through">
                            <!-- <ui-input v-model.trim="emailData.templateContent" type="textarea" :rows="4" :counter="true" placeholder="请输入"></ui-input> -->
                            <div class="quill-editor-form">
                                <ui-editor v-model="emailData.templateContent" 
                                    @on-change="onEditorChange()"></ui-editor>
                            </div>
                        </form-item>
                        <form-item label="附件：" prop="templateAttachment" class="item-through">
                            <div class="upload-styl">
                                <div>
                                    <ul v-if="emailData.templateAttachment && emailData.templateAttachment.length" class="show">
                                        <li v-for="(item,i) in emailData.templateAttachment" :key="i">
                                            <a :href="item.reviewUrl" target="_blank" class="mr-l-10 ellipse">{{item.fileName}}</a>
                                            <span class="text-primary mr-l-10 pointer" @click="onDelUpload(i)">删除</span>
                                        </li>
                                    </ul>
                                    <button type="button" class="btn" @click="onMockClick"><i class="ti-plus text-primary"></i>上传附件</button>
                                    <span v-if="emailData.templateAttachment && emailData.templateAttachment.length" class="text-primary mr-l-10" style="fontSize: 12px;">已上传{{totalFileSize}}M</span>
                                    
                                </div>
                                <p class="text-gray tip">支持pdf、doc、docx、xls、xlsx、jpg、png、ppt、pptx格式文件</p>
                            </div>
                            <ui-upload
                                style="display:none;"
                                ref="upload"
                                exname=".doc.docx.pdf.xlsx.xls.jpg.png.ppt.pptx"
                                action="/api/common/interview/upload.json"
                                :filesize="10"
                                :customCheckTip="true"
                                @checktip="onChecktip"
                                @uploadStart="onStart"
                                @uploadProgress="onProgress"
                                @uploadEnd="onEnd"
                            />
                            <input style="display:none;" type="file" accept="" ref="selfUpload" @change="onUpload($event)"/>
                        </form-item>
                    </div>

                    <!-- 评估表 -->
                    <div class="evaluate-table">
                        <span class="intro-label text-gray">评估单：</span>
                        <div id="send-preview-table">
                            <interview-form v-if="formType==1" :modelData="modelData" :configData="configData" :title="emailData.type"></interview-form>
                            <resign-form v-else-if="formType==0" :modelData="modelData" :configData="configData" :title="emailData.type"></resign-form>
                        </div>
                    </div>
                 </ui-form>
            </div>
            <div class="footer-btns">
                <button type="button" class="btn btn-primary btn-outline" @click="onCancel">取消</button>
                <button type="button" class="mr-l-20 btn btn-primary btn-outline" @click="onSave(0)">保存</button>
                <button type="button" class="mr-l-20 btn btn-primary" @click="onSave(1)">确认发送</button>
            </div>
        </template>
    </ui-dialog>
</template>

<script>

import { _commonUserSearch } from '@/services/dashboard/base';
import { upload } from '@/services/dashboard/phcc';
import {_interviewSendEvaluate, _interviewEmailTempList, _interviewEmailTempInfo, _getReceiverAndCopyUser, _interviewerReportDetail, _interviewReportEmail} from '@/services/dashboard/interview';
import vSelect from '@/components/vue-select/index';
import InterviewForm from '@/package/interview/components/evaluation-form/index-interview-form.vue';
import ResignForm from '@/package/interview/components/evaluation-form/index-resign-form.vue';
import { zhLength } from '@/utils/util';
import { debounce } from '@/utils/common';
import UiEditor from '@/components/tiny-editor/index.vue';
export default {
    components: {
        vSelect,
        InterviewForm,
        ResignForm,
        UiEditor
    },
    props: {},
    data() {
        return {

            interviewTypeList: ['首月访谈','转正访谈(3月)','转正访谈(6月)', '见习访谈(3月)', '见习访谈(6月)', '离职访谈', '离职回访', '晋升访谈'],

            ///////
            openDialog: false,
            showMessage: false,

            submitting: false,
            progressShow: false,

            // emailData: {
            //     id: '',
            //     reportId: '',
            //     interviewId: '',
            //     interviewType: '',
            //     name: '', // 被访谈人
            //     email: '',
            //     // intervieweeJson: {},
            //     receiver: [],
            //     copyTo: [],
            //     title: '',
            //     content: '',
            //     attachList: [],
            // },
            // emailRuleData: {
            //     title: [{required: true, message: '标题不能为空',trigger: 'change'}],
            //     content: [{required: true, message: '内容不能为空',trigger: 'change'}],
            //     receiver: [
            //         {type: 'array', required: true, message: '请填写收件人',trigger: 'change'},
            //     ],
            // },

            //邮件提醒
            emailData: {
                id: '', // 访谈工单id
                resultId: '', // 访谈结果id
                intervieweeId: '', // 被访谈人id
                reportEmailId: '', // 访谈邮件id
                name: '', // 被访谈人
                email: '',
                cooperateIds: '',
                cooperateEmails: '',
                cooperateNames: '',
                type: '', // 访谈类型
                typeStr: '', // 访谈类型描述
                receiver: [], // 收件人
                copyTo: [], // 抄送
                templateId: '', // 模板id
                templateName: '', // 模板名称
                templateTitle: '', // 模板标题
                templateContent: '', // 模板内容
                templateAttachment: [] // 模板附件
            },
            emailRuleData: {
                receiver: [
                    {type: 'array', required: true, message: '请填写收件人',trigger: 'change'},
                ],
                // copyTo: [
                //     {type: 'array', required: true, message: '请填写抄送人',trigger: 'change'},
                // ],
                templateId: [{required: true, message: '请选择邮件模板',trigger: 'change'}],
                templateTitle: [
                    {required: true, message: '请填写邮件标题',trigger: 'change'},
                    {min: 1, max: 100, message: '字数超出限制，100字以内', trigger: 'change'}
                ],
                templateContent: [{required: true, message: '请填写邮件内容',trigger: 'change'}],
                // templateAttachment:[
                //     {type: 'array', required: true, message: '请上传附件',trigger: 'change'}
                // ]
            },
            emailTemplateList:[],
            fileSize: '', // 附件大小

            showUsersData: [],
            allUserData: [],
            searchTimer: null,

            formType: null,     //评估表的类型   1 首月表 0离职表
            modelData: {},   //访谈表的模版数据
            configData: {},   //访谈表的参数

            emailCurrent: {
                model: 'image'
            },

            isRender: true
        };
    },
    computed: {
        /// 文件总大小
        totalFileSize() {
            let _size = 0;
            this.emailData.templateAttachment.length && this.emailData.templateAttachment.forEach(v => {
                _size += v.fileSize;
            });
            _size = Number((_size/(1024*1024)).toFixed(2));
            return _size;
        },
    },
    watch: {},
    //方法集合
    methods: {
        ///////
        open(params) {

            let item = params.orderInfo;
            
            this.emailData.id = item.id;
            this.emailData.resultId = item.resultId;
            /////被访谈人
            this.emailData.intervieweeId = item.intervieweeId,
            this.emailData.name = item.intervieweeName;
            this.emailData.email = item.intervieweeEmail;
            ////协作方
            this.emailData.cooperateIds = item.cooperateIds || '';
            this.emailData.cooperateEmails = item.cooperateEmails || '';
            this.emailData.cooperateNames = item.cooperateNames || '';
            
            this.emailData.type = item.type;
            // 1 2 3 4 5 8 '首月访谈','转正访谈(3月)','转正访谈(6月)', '见习访谈(3月)', '见习访谈(6月)'
            // 6 7 '离职访谈', '离职回访'
            this.emailData.typeStr = item.typeStr;
           

            this.getEmailTempList(); // 邮件模板列表
            this.getUserSearch(); // 员工信息
            this.getEmailDetail(); // 获取详情
            // this.getReceiverAndCopyUser();// 获取收件人 抄送人

            

            this.getReportDetail(params); // 获取访谈报告详情


            this.isRender = false;
            this.$nextTick(() => {
                this.isRender = true;
            });
            this.openDialog = true;


        },
        close() {
            this.openDialog = false;
            this.showMessage = false;

            Object.keys(this.emailData).forEach(v => {
                if (v === 'receiver' || v === 'copyTo' || v === 'templateAttachment') {
                    this.emailData[v] = [];
                } else {
                    this.emailData[v] = '';
                }
            });
        },
        onCancel() {
            this.close();
        },
        onSave(type) {
            this.showMessage = true;
            this.$refs.emailTipForm.validate(valid => {
                if (valid) {
                    this.postEmailSend(type);
                }
            });
            
        },
        async postEmailSend(type) {
            let previewCont = document.querySelector(`.send-tmeplate-email #send-preview-table`).innerHTML;

            let addressee = this.emailData.receiver.map(v => {
                return {
                    userName: v.name.split('<')[0],
                    userEmail: v.name.split('<')[1].split('>')[0]
                };
            });
            let cc = this.emailData.copyTo.length ? this.emailData.copyTo.map(v => {
                return {
                    userName: v.name.split('<')[0],
                    userEmail: v.name.split('<')[1].split('>')[0]
                };
            }) : '';
            let intervieweeJson = {
                userName: this.emailData.name,
                userEmail: this.emailData.email
            };

            let  contentText = this.emailData.templateContent.replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;'); // 匹配制表符
            contentText = contentText.replace(/\s\s/g,'&nbsp;&nbsp;'); // 匹配两个空格
            let params = {
                id: this.emailData.reportEmailId || '',
                reportId: this.emailData.resultId,
                interviewId: this.emailData.id,
                interviewType: this.emailData.type,
                send: type ? 1 : 0, // 0 保存 1 发送
                intervieweeJson: JSON.stringify(intervieweeJson),
                receiverJson: JSON.stringify(addressee),
                copyJson: cc ? JSON.stringify(cc) : '',
                // templateName: this.emailData.templateName,
                title: this.emailData.templateTitle,
                // content: this.emailData.templateContent,
                content: contentText,
                attach: this.emailData.templateAttachment.length ? JSON.stringify(this.emailData.templateAttachment) : '',
                emailTemplateId: this.emailData.templateId,
                evaluate: previewCont,
            };
            
            // console.log('======params',params);
            if (this.submitting) return;
            this.submitting = true;
            try {
                const res = await _interviewSendEvaluate(params);
                this.submitting = false;
                if (res.success) {

                    
                    this.$toast(`${type ? '保存并发送' : '保存'}成功！`,'success');

                    this.$emit('on-confirm', true);
                    this.close();
                   
                } 
            }catch(e) {
                this.submitting = false;
            }
        },
        onTempChange() {
            // // console.log('===template',this.emailData.templateId);
            if (!this.emailData.templateId) return;
            this.getEmailTempInfo();
        },

        /// 获取详情
        async getEmailDetail() {
            try {
                const res = await _interviewReportEmail({interviewId: this.emailData.id});
                // console.log(res);
                if (res.success) {
                    if (res.root) { // 有数据

                        const {attachFileList, content, copyEmailUserList, receiveEmailUserList, title, emailTemplateId, id  } = res.root;

                        ///// 去重
                        if (receiveEmailUserList && receiveEmailUserList.length) {
                            let arr = [];
                            receiveEmailUserList.forEach(v => {
                                let json = {
                                    id: v.userId,
                                    name: `${v.userName}<${v.userEmail}>`
                                };
                                arr.push(json);
                            });
                            this.emailData.receiver = arr;
                        }

                        if (copyEmailUserList && copyEmailUserList.length) {
                            let arr = [];
                            copyEmailUserList.forEach(v => {
                                let json = {
                                    id: v.userId,
                                    name: `${v.userName}<${v.userEmail}>`
                                };
                                arr.push(json);
                            });
                            this.emailData.copyTo = arr;
                            
                        }
                        //////


                        this.emailData.templateId = emailTemplateId || '';
                        this.emailData.templateTitle = title || '';
                        this.emailData.templateContent = content || '';
                        this.emailData.reportEmailId = id || '';

                        if (attachFileList) {
                            this.emailData.templateAttachment = attachFileList ? JSON.parse(attachFileList) : [];
                        }

                    } else {
                        this.getReceiverAndCopyUser(); // 获取收件人，抄送人
                    }
                } else {
                    this.getReceiverAndCopyUser(); // 获取收件人，抄送人
                }
            } catch(e) {}
        },
        async getReceiverAndCopyUser() {
            try {
                const res = await _getReceiverAndCopyUser({interviewId: this.emailData.id});
                if (res.success) {
                    if (res.root) {
                        let {receivers, copys, title, content, emailTemplateId, attach} = res.root;

                        ///// 去重
                        if (receivers && receivers.length) {
                            let arr = [];
                            receivers.forEach(v => {
                                if (arr.every(cur => cur.id !== v.id)) { // 未添加
                                    let json = {
                                        id: v.id,
                                        name: `${v.name}<${v.email}>`
                                    };
                                    arr.push(json);
                                }
                            });
                            this.emailData.receiver = arr;
                        }

                        if (copys && copys.length) {
                            let arr = [];
                            copys.forEach(v => {
                                if (arr.every(cur => cur.id !== v.id)) { // 未添加
                                    let json = {
                                        id: v.id,
                                        name: `${v.name}<${v.email}>`
                                    };
                                    arr.push(json);
                                }
                            });
                            // 若所有发送和抄送的角色中，出现重复人员，仅保留一个，优先保留收件人：
                            let arr_temp = [];
                            arr.forEach(v => {
                                if (this.emailData.receiver.every(cur => cur.id !== v.id)) {
                                    arr_temp.push(v);
                                }
                            });
                            this.emailData.copyTo = arr_temp;
                        }
                        //////


                        // this.emailData.templateId = emailTemplateId || '';
                        // this.emailData.templateTitle = title || '';
                        // this.emailData.templateContent = content || '';

                        if (attach) {
                            this.emailData.templateAttachment = JSON.parse(attach);
                        }
                    }
                }
            }catch(e) {}
        },
        async getEmailTempList() {
            this.emailData.templateId = '';
            this.emailData.templateName= '';
            this.emailData.templateTitle= '';
            this.emailData.templateContent= '';
            this.emailData.templateAttachment= [];
            this.emailTemplateList = [];
            this.showMessage = false;
            let params = {
                interviewType: this.emailData.type,
                templateType: 2 // 访谈报告
            };
            try {
                const res = await _interviewEmailTempList(params);
                if (res.success) {
                    if (res.root && res.root.length) {
                        this.emailTemplateList = res.root.map(v => {
                            return {
                                label: v.templateName,
                                value: v.id
                            };
                        });
                    }
                }
            }catch(e) {}
        },
        async getEmailTempInfo() {
            let params = {
                id: this.emailData.templateId
            };
            try {
                const res = await _interviewEmailTempInfo(params);
                if (res.success) {
                    if (res.root) {
                        this.emailData.templateName = res.root.templateName;
                        this.emailData.templateTitle = res.root.topic;
                        this.emailData.templateContent = res.root.content;
                        // this.emailData.templateContent = res.root.content.replace(/(&nbsp;)/g, ' ');
                        this.emailData.templateAttachment = res.root.file ? JSON.parse(res.root.file) : [];
                    }
                }
            }catch(e) {}
        },
        async getUserSearch(deptIds){
        },
        //////邮箱选择
        filterEmails: debounce(300, async function(key) {
            try {
                if (!key) return;
                const { success, root } = await _commonUserSearch({ key });
                if (success) {
                    this.showUsersData = (root || []).map(n => {
                        return {
                            ...n,
                            name: `${[n.name, n.deptName, n.email].filter(item => item).join('-')}`,
                            label: `${[n.name, n.deptName].filter(item => item).join('-')}`

                        };
                    });
                }
            } catch {}
        }),

        inputEmails(val) {
            // // console.log('======input val',val);
            this.$refs.emailTipForm.validate('receiver');
            this.showUsersData = [];
        },
        /**上传 */
        onMockClick(type) {
            if (this.progressShow) return;
            this.$refs.selfUpload.click();
        },
        // 自定义类型报错提示
        onChecktip() {
            this.$toast('格式错误，仅支持pdf、doc、docx、xls、xlsx、jpg、png、ppt、pptx格式文件','warning');
            return;
        },
        ////自定义上传
        onUpload(e) {
            // // console.log('==2222===file',e.target.files);
            
            /// 调用ui-upload的校验方法
            const hasError = ([]).some.call(e.target.files, item => !this.$refs.upload.checkFile(item));
            // // console.log('======hasError',hasError);
            if(hasError){
                this.$refs.selfUpload.value = '';
                return false;
            }
            if(this.$refs.selfUpload.value === '') return;

            // // console.log('==1111==size',this.totalFileSize);
            let files = e.target.files;
            // 校验文件名长度
            if (zhLength(files[0].name) > 40) {
                this.$refs.selfUpload.value = '';
                this.$toast('文件名长度不得超过40个字符','warning');
                return;
            }
            ////校验大小
            let _size = 0;
            _size += files[0].size;
            _size = Number((_size/(1024*1024)).toFixed(2));
            _size += this.totalFileSize;
            // // console.log('======_size',_size);
            if (_size > 10) {
                this.$refs.selfUpload.value = '';
                this.$toast('上传失败，文件总大小不可大于10M', 'error');
                return;
            }

            //////上传 调ui-upload的上传接口
            this.$refs.upload.suerUpload(files[0]);  
            this.fileSize = files[0].size;       
        },
        
        // 上传开始
        onStart(file) {
            // // console.log('===file',file);
            this.progressShow = true;
        },
        // 上传进度
        onProgress(progress) {
            this.$toast({
                content:`正在上传...`,
                type: 'loading'
            });
        },
        // 上传结束
        onEnd(res) {
            // // console.log('===res',res);
            this.$refs.selfUpload.value = '';
            this.$toast.hide();
            let nData = res.data;
            if(nData.success) {
                let json = {
                    fileName: nData.root.fileName || '',
                    reviewUrl: nData.root.reviewUrl || '',
                    relativePath: nData.root.relativePath || '',
                    downLoadUrl: nData.root.downLoadUrl || '',
                    fileSize: this.fileSize || 0
                };
                this.emailData.templateAttachment.push(json);
            }
            this.progressShow = false;
            this.fileSize = '';
        },
        onDelUpload(i) {
            this.emailData.templateAttachment.splice(i,1);
        },
        //////
        onEditorChange($el) {
            // // console.log('======content',$el);
            this.$refs.emailTipForm.validate('templateContent');
           
        },

        //首月访谈评估表/离职类的访谈表
        async getReportDetail(params) {
            // try {
            //     const res = await _interviewerReportDetail({interviewId: this.emailData.id}); // 获取报告详情
            //     if (res.success) {
            //         let _model = JSON.parse(res.root.formJson);
            //         let _config = JSON.parse(res.root.formConfig);
            //         this.modelData = _model;
            //         this.configData = _config;

            //         if(this.emailData.type === 6 || this.emailData.type === 7) { // 离职类
            //             this.formType = 0;   
            //         } else { // 首月访谈类
            //             this.formType = 1;
            //         }
            //     }
            // } catch(e) {

            // }



            let _model = params.renderModel;
            let _config = params.renderConfig;
            this.modelData = _model;
            this.configData = _config;

            if(this.emailData.type === 6 || this.emailData.type === 7) { // 离职类
                this.formType = 0;   
            } else { // 首月访谈类
                this.formType = 1;
            }
        }    
    },
    created() {
        
    },
    mounted() {

    },
};
</script>
<style lang='less' scoped>
@import '~@/styles/interview/order.less';
</style>