<template>
<div>
    <ui-dialog v-model="showDialog"
        :title="title" :width="410" wrap-class="ui-dialog-reset batch-import-dialog"
        lock prevent-layer :prevent-confirm="true"
        :confirm-text="isLoading? '上传中...': `选择文件`"
        :confirm-loading="isLoading"
        @on-confirm="handleUpload"
    >
        <template v-if="showDialog" slot="content">
            <div>
                {{ descriptionMsg }}
                <a v-if="!templateDownload" class="active-color" :href="templateUrl" target="_blank">点此下载导入模板</a>
                <span v-else class="active-color" @click="handleTemplateDownload">点此下载导入模板</span>
            </div>
            <ui-upload
                v-if="!useSheet"
                v-show="false"
                ref="upload"
                exname=".xls,.xlsx"
                :action="uploadUrl"
                :upload-fieled="uploadFieled"
                :cropper="false"
                @uploadStart="uploadStart"
                @uploadEnd="uploadEnd"
            >
            </ui-upload>
            <salary-upload
                v-else
                v-show="false"
                ref="upload"
                exname=".xls,.xlsx"
                :action="uploadUrl"
                :upload-fieled="uploadFieled"
                :cropper="false"
                @uploadStart="uploadStart"
                @uploadEnd="uploadEnd"
            ></salary-upload>
        </template>
    </ui-dialog>
    <ui-dialog v-model="showMessageDialog"
        title="导入失败" width="410" wrap-class="ui-dialog-reset"
        lock prevent-layer :prevent-confirm="true"
        confirm-text="导出失败信息"
        @on-confirm="handleExportMsg"
    >
        <template v-if="showMessageDialog" slot="content">
            <div v-if="errorMessageType === '2'">导入失败，当前有{{ exportMsgObj.failNum }}条数据错误，请全部修正后再导入。</div>
            <div v-if="errorMessageType === '3'">成功{{ exportMsgObj.successNum }}条，失败{{ exportMsgObj.failNum }}条。</div>
            <div v-else>共{{ exportMsgObj.total }}条，成功{{ exportMsgObj.successNum }}条，失败{{ exportMsgObj.failNum }}条，导出查看失败信息</div>
        </template>
    </ui-dialog>
</div>
</template>
<script>
import { downLoad } from '@/utils/util.js';
import { decrypt } from '@/utils/crypto';
// import SalaryUpload from '@/package/salary/components/salary-upload.vue';
export default {
    props: {
        errorMessageType: {
            type: String,
            default: '1'
        },
        descriptionMsg: {
            type: String,
            default: '通过员工邮箱进行批量导入。'
        },
        title: {
            type: String,
            default: '批量导入'
        },
        templateUrl:  {
            type: String,
            default: '/api/common/import/template.json'
        },
        uploadUrl: {
            type: String,
            default: '/api/common/import/in.json'
        },
        templateDownload: {
            type: Function,
            default: null
        },
        uploadFieled: {
            type: Object,
            default: () => {}
        },
        useSheet: {
            type: Boolean,
            default: false
        }
    },
    // components: {
    //     SalaryUpload
    // },
    data() {
        return {
            isLoading: false,
            showDialog: false,
            showMessageDialog: false,
            exportMsgObj: {
                failUrl: '',
                total: '',
                successNum: '',
                failNum: ''
            },
            loadList: []
        };
    },
    mounted() {

    },
    methods: {
        // 打开导入弹窗
        open() {
            this.loadList = [];
            this.showDialog = true;
        },
        // 上传方法
        handleUpload() {
            if(this.isLoading) return;
            this.$refs.upload.mockClick();
        },
        uploadStart() {
            this.isLoading = true;
        },
        // 上传结束
        uploadEnd(res) {
            this.isLoading = false;
            // 如果code === 50005 需要做解密处理
            let resData = res.data || {};
            let nData = resData.code === 50005 ? decrypt(resData.root) : resData;
            // 需要验证码校验
            if (nData.code === 50001) {
                this.$store.commit('updateShowCheckedDialog', true);
                return;
            }
            if (nData.success) {
                this.loadList = nData.root.successList;
                // this.loadList = nData.data;
                if (nData.root.code === 0) {
                    this.$dialog({
                        title: '提示',
                        content: '导入成功',
                        type: 'success'
                    });
                    this.showDialog = false;
                    this.$emit('on-success', this.loadList);
                } else {
                    const {failUrl, successNum, failNum} = nData.root;
                    this.showDialog = false;
                    this.showMessageDialog = true;
                    this.exportMsgObj = {
                        failUrl,
                        total: successNum + failNum,
                        successNum,
                        failNum
                    };
                    this.$emit('on-success', this.loadList);

                }
            } else {
                const content = nData.message || nData.msg;
                // this.exportMsgObj = res.data;
                this.$toast(content || '导入失败', 'error');
            }
        },
        // 下载失败信息
        handleExportMsg() {
            downLoad(this.exportMsgObj.failUrl);
            this.showMessageDialog = false;
        },
        handleTemplateDownload() {
            this.templateDownload();
        }
    }
};
</script>
