<template>
<div class="it-approval__module">
    <div class="approval-component__container">
        <h2 class="title">
            基本信息
        </h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'launcher.name', true)]">
                <span>姓名</span>
                <div>{{ _getValue(progressInfo, 'launcher.name', '-') }}</div>
            </li>
            <li :class="[highlightClass(progressInfo, 'launcher.deptName', true)]">
                <span>末级部门</span>
                <div>{{ _getValue(progressInfo, 'launcher.deptName', '-') }}</div>
            </li>
        </ul>
    </div>
    <div class="approval-component__container">
        <h2 class="title">申请信息</h2>
        <ul class="approval-component__list">
            <li :class="['full-row', highlightClass(progressInfo, 'desc')]">
                <span>详细说明</span>
                <div>{{ progressInfo.desc || '-' }}</div>
            </li>
            <li :class="['margin-top-20', highlightClass(progressInfo, 'expireDate')]">
                <span>使用期限</span>
                <div>
                    <nari-tooltip :show-tip="false"  :value="progressInfo.expireDate" />
                </div>
            </li>
            <li :class="['full-row', 'margin-top-20', highlightClass(progressInfo, 'fileKeys')]">
                <span>附件</span>
                <div>
                    <ul v-if="annexesList.length" class="approval-attachment-list">
                        <li v-for="(attachment, index) in annexesList" :key="index" class="attachment-list-content">
                            <div class="attachment-name">
                                <svg-icon :icon-class="getIconName(attachment.fileName)"></svg-icon>
                                <div class="attachment-title">
                                    <nari-tooltip :value="attachment.fileName" />
                                </div>
                            </div>
                            <div class="attachment-operation">
                                <router-link target="_blank" :to="`/api/common/file/preview.json?ossPath=${attachment.url.replace(/http.*(review|download)\//, '')}`" class="text-primary check-resume">
                                    <div class="icon-wrapper">
                                        <svg-icon icon-class="file-view"></svg-icon>
                                    </div>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                    <div v-else>-</div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import commonMixin from './mixins';
// 处理附件信息
const dealFile = (listStr = []) => {
    return listStr.map(ele => {
        const infoArr = (ele || '').split('||');
        return {
            fileName: infoArr[0],
            url: infoArr[1] ? `${window.location.origin}/api/common/file/download${infoArr[1]}` : ''
        };
    });
};
import { mapState } from 'vuex';
export default {
    name: 'OfferApproval',
    mixins: [commonMixin],
    computed: {
        ...mapState(['userInfo']),
        processId() {
            return this.$route.query.processId;
        },
        annexesList() {
            const { fileKeys } = this.progressInfo;
            return dealFile(fileKeys);
        }
    },
    data() {
        return {
            progressInfo: {}
        };
    },
    created() {
        this.getProgressInfo();
    },
    methods: {
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        },
        // 在线预览
        previewAction(info) {
            window.open(`/api/common/file/preview.json?ossPath=${info.url.replace(/http.*(review|download)\//, '')}`);
        },
        // 下载
        downloadAction(info) {
            window.open(info.url);
        }
    }
};
</script>