<template>
<div>
    <div class="approval-component__container">
        <h2 class="title">基本信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'applyUserName')]">
                <span>姓名</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.applyUserName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'applyUserNumber')]">
                <span>员工编号</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.applyUserNumber" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'applyUserPosition')]">
                <span>岗位</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.applyUserPosition" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'applyUserDeptFullPath')]">
                <span>部门</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.applyUserDeptFullPath" />
                </div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <h2 class="title">申请信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'certifyTypeName', true)]">
                <span>证明类型</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.certifyTypeName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'templateTypeName', true)]">
                <span>模版类型</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.templateTypeName" />
                </div>
            </li>
            <!-- progressInfo.templateTypeName === '自定义模版' -->
            <li v-if="progressInfo.templateType === 1" :class="[highlightClass(progressInfo, 'templateAttachment', true)]">
                <span>模版附件</span>
                <div class="download-container">
                    <ul v-if="annexesList.length" class="download-list">
                        <li v-for="(item, index) in annexesList" :key="index">
                            <em class="file-name" @click="previewAction(item)"><nari-tooltip :value="item.fileName" /></em>
                            <i class="ui-icon-view btn-look" @click="previewAction(item)"></i>
                        </li>
                    </ul>
                    <span v-else>-</span>
                </div>
            </li>
            <!-- progressInfo.certifyTypeName === '收入证明' -->
            <template v-if="progressInfo.certifyType === 0">
                <li :class="[highlightClass(progressInfo, 'issueName', true)]">
                    <span>开具口径</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.issueName" />
                    </div>
                </li>
                <li v-if="progressInfo.issue === 4" :class="[highlightClass(progressInfo, 'issueRemark', true)]">
                    <span>其他口径说明</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.issueRemark" />
                    </div>
                </li>
            </template>
            <li :class="[highlightClass(progressInfo, 'fileTypeName', true)]">
                <span>文件类型</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.fileTypeName" />
                </div>
            </li>
            <!-- progressInfo.fileTypeName === '原件' -->
            <li v-if="progressInfo.fileType === 0" :class="[highlightClass(progressInfo, 'certifyCount', true)]">
                <span>开具份数</span>
                <div>
                    {{ progressInfo.certifyCount }}份
                </div>
            </li>
            <li v-if="progressInfo.fileType === 0" :class="[highlightClass(progressInfo, 'obtainMethodName', true)]">
                <span>获取方式</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.obtainMethodName" />
                </div>
            </li>
            <!-- progressInfo.fileTypeName === '原件' && progressInfo.obtainMethodName === '邮寄' -->
            <template v-if="progressInfo.fileType === 0 && progressInfo.obtainMethod === 0">
                <li :class="[highlightClass(progressInfo, 'receiverName', true)]">
                    <span>收件人姓名</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.receiverName" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'receiverContact', true)]">
                    <span>收件人联系方式</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="progressInfo.receiverContact" />
                    </div>
                </li>
                <li :class="[highlightClass(progressInfo, 'receiverRegionName', true)]">
                    <span>收件地址</span>
                    <div>
                        <nari-tooltip :show-tip="false" :value="`${progressInfo.receiverRegionName} ${progressInfo.receiverAddress}`" />
                    </div>
                </li>
            </template>
           
            <li :class="[highlightClass(progressInfo, 'certifyPurposeName', true)]">
                <span>证明开具用途</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.certifyPurposeName" />
                </div>
            </li>
            <!-- progressInfo.certifyPurposeName === '其他' -->
            <li v-if="progressInfo.certifyPurpose === 4" :class="[highlightClass(progressInfo, 'certifyPurposeRemark', true)]">
                <span>证明用途说明</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.certifyPurposeRemark" />
                </div>
            </li>
            <li class="full-row mt40"  :class="[highlightClass(progressInfo, 'specialInstructions', true)]">
                <span>特殊说明</span>
                <div>{{ progressInfo.specialInstructions }}</div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import commonMixin from './mixins';
export default {
    name: 'Certificate',
    mixins: [commonMixin],
    data() {
        return {
            progressInfo: {}
        };
    },
    computed: {
        processId() {
            return this.$route.query.processId;
        },
        // 附件
        annexesList() {
            const { templateAttachment } = this.progressInfo;
            const fileList = templateAttachment? [{
                fileName:  templateAttachment.split('||')[0],
                reviewUrl: templateAttachment.split('||')[1]
            }] : [];
            return fileList;
        }
    },
    created() {
        this.getProgressInfo();
    },
    methods: {
        // 在线预览
        previewAction(info) {
            window.open(`/api/common/file/preview.json?ossPath=${info.reviewUrl.replace(/http.*(review|download)\//, '')}`);
        },
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        }
    }
};
</script>